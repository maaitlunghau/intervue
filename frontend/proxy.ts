import { ADMIN_REFRESH_COOKIE_NAME, RECRUITER_REFRESH_COOKIE_NAME, REFRESH_COOKIE_NAME } from '@/constants/auth';
import { RECRUITER_AREA_PREFIX, REDIRECT_PARAM, ROUTES } from '@/constants/routes';
import type { MaintenanceStatus } from '@/types/platform';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS: readonly string[] = [
  ROUTES.RECRUITER_LANDING,
  ROUTES.RECRUITER_LOGIN,
  ROUTES.RECRUITER_REGISTER,
  ROUTES.RECRUITER_ONBOARDING,
  ROUTES.RECRUITER_FORGOT_PASSWORD,
  ROUTES.RECRUITER_RESET_PASSWORD,
  ROUTES.RECRUITER_VERIFY_EMAIL,
  ROUTES.RECRUITER_CONFIRM_EMAIL_CHANGE,
  ROUTES.ADMIN_LOGIN,
  ROUTES.ADMIN_TWO_FACTOR_SETUP,
];

// Without this the widened matcher would send guests on /, /jobs or /blog to the login page.
const PROTECTED_PREFIXES: readonly string[] = ['/candidate', '/account', '/notifications', '/recruiter', '/admin'];

const STATIC_FILE_REGEX = /\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|css|js)$/i;

const ADMIN_AREA_PREFIX = '/admin';
const MAINTENANCE_STATUS_TTL_MS = 10_000;
const MAINTENANCE_FALLBACK_RETRY_SECONDS = 600;
const MAINTENANCE_MIN_RETRY_SECONDS = 60;
const MAINTENANCE_OFF: MaintenanceStatus = { enabled: false, message: null, estimatedResumeAt: null };

let cachedStatus: { value: MaintenanceStatus; expiresAt: number } | null = null;

// Fails open on purpose: a transient backend problem must never be what closes the site.
async function readMaintenanceStatus(): Promise<MaintenanceStatus> {
  if (cachedStatus && cachedStatus.expiresAt > Date.now()) return cachedStatus.value;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/platform/maintenance`, { cache: 'no-store' });
    if (!response.ok) return MAINTENANCE_OFF;
    const payload = await response.json();
    const value = (payload?.data as MaintenanceStatus) ?? MAINTENANCE_OFF;
    cachedStatus = { value, expiresAt: Date.now() + MAINTENANCE_STATUS_TTL_MS };
    return value;
  } catch {
    return MAINTENANCE_OFF;
  }
}

function retryAfterSeconds(status: MaintenanceStatus): string {
  if (!status.estimatedResumeAt) return String(MAINTENANCE_FALLBACK_RETRY_SECONDS);
  const resumeAt = new Date(status.estimatedResumeAt).getTime();
  if (Number.isNaN(resumeAt)) return String(MAINTENANCE_FALLBACK_RETRY_SECONDS);
  const seconds = Math.ceil((resumeAt - Date.now()) / 1000);
  return String(Math.max(MAINTENANCE_MIN_RETRY_SECONDS, seconds));
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Never intercept static files
  if (STATIC_FILE_REGEX.test(pathname)) {
    return NextResponse.next();
  }

  const normalizedPath = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const isAdminArea = pathname.startsWith(ADMIN_AREA_PREFIX);

  // The admin area stays reachable during maintenance, otherwise nobody could switch it off.
  if (!isAdminArea) {
    const status = await readMaintenanceStatus();
    if (status.enabled) {
      return pathname === ROUTES.HOME
        ? NextResponse.rewrite(new URL(ROUTES.MAINTENANCE, request.url), {
            status: 503,
            headers: { 'Retry-After': retryAfterSeconds(status) },
          })
        : NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    }
  }

  if (PUBLIC_PATHS.includes(normalizedPath) || normalizedPath.startsWith(`${ROUTES.RECRUITER_OAUTH_CALLBACK}/`)) {
    return NextResponse.next();
  }

  // Admin Area
  if (isAdminArea) {
    if (request.cookies.has(ADMIN_REFRESH_COOKIE_NAME)) {
      return NextResponse.next();
    }
    const loginUrl = new URL(ROUTES.ADMIN_LOGIN, request.url);
    loginUrl.searchParams.set(REDIRECT_PARAM, pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // Recruiter Area
  const isRecruiterArea = pathname.startsWith(RECRUITER_AREA_PREFIX);
  if (isRecruiterArea) {
    if (request.cookies.has(RECRUITER_REFRESH_COOKIE_NAME)) {
      return NextResponse.next();
    }
    const loginUrl = new URL(ROUTES.RECRUITER_LOGIN, request.url);
    loginUrl.searchParams.set(REDIRECT_PARAM, pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (!PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Candidate / Default Protected Area
  if (request.cookies.has(REFRESH_COOKIE_NAME)) {
    return NextResponse.next();
  }
  const loginUrl = new URL(ROUTES.LOGIN, request.url);
  loginUrl.searchParams.set(REDIRECT_PARAM, pathname + search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
