'use client';

import { authApiFor } from '@/apiRequest/auth-portal';
import { OAUTH_REDIRECT_STORAGE_KEY } from '@/constants/auth';
import { REDIRECT_PARAM, ROUTES } from '@/constants/routes';
import type { OAuthPortal } from '@/lib/auth-portal';
import { cn } from '@/lib/utils';
import { getErrorMessage } from '@/utils/error';
import { sanitizeRedirect } from '@/utils/redirect';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { FacebookIcon, GoogleIcon, LinkedinIcon } from './SocialIcons';

type SocialAuthButtonsProps = {
  portal?: OAuthPortal;
  mode: 'login' | 'register';
  acceptTerms?: boolean;
};

const BUTTON_BASE =
  'text-[#1E2837] flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-sm font-semibold transition hover:bg-slate-50 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed';

export default function SocialAuthButtons({ portal = 'candidate', mode, acceptTerms = false }: SocialAuthButtonsProps) {
  const isRegister = mode === 'register';
  const termsPending = isRegister && !acceptTerms;

  const authorize = useMutation({
    mutationFn: () =>
      authApiFor(portal).oauthAuthorize('google', { intent: isRegister ? 'REGISTER' : 'LOGIN', acceptTerms }),
    onSuccess: ({ authorizationUrl }) => {
      const target = new URLSearchParams(window.location.search).get(REDIRECT_PARAM);
      const redirect = sanitizeRedirect(target, ROUTES.HOME);
      if (target && redirect !== ROUTES.HOME) sessionStorage.setItem(OAUTH_REDIRECT_STORAGE_KEY, redirect);
      else sessionStorage.removeItem(OAUTH_REDIRECT_STORAGE_KEY);
      window.location.assign(authorizationUrl);
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  const handleComingSoon = (providerName: string) => {
    toast.info(`Sign in with ${providerName} is coming soon!`);
  };

  if (portal === 'candidate') {
    return (
      <div className="space-y-2.5">
        {/* Google button full width */}
        <button
          type="button"
          disabled={termsPending || authorize.isPending || authorize.isSuccess}
          onClick={() => authorize.mutate()}
          className={cn(BUTTON_BASE, 'h-11 w-full cursor-pointer gap-2.5')}
        >
          <GoogleIcon />
          <span>
            {authorize.isPending || authorize.isSuccess
              ? 'Redirecting...'
              : isRegister
                ? 'Sign up with Google'
                : 'Sign in with Google'}
          </span>
        </button>

        {/* Facebook and LinkedIn row */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleComingSoon('Facebook')}
            className={cn(BUTTON_BASE, 'h-11 w-full cursor-pointer gap-2')}
          >
            <FacebookIcon />
            <span>Facebook</span>
          </button>

          <button
            type="button"
            onClick={() => handleComingSoon('LinkedIn')}
            className={cn(BUTTON_BASE, 'h-11 w-full cursor-pointer gap-2')}
          >
            <LinkedinIcon />
            <span>LinkedIn</span>
          </button>
        </div>

        {termsPending && (
          <p className="text-center text-xs text-slate-500">Please accept the terms before continuing with Google</p>
        )}
      </div>
    );
  }

  // Recruiter Portal format matching TopCV
  return (
    <div className="space-y-2.5">
      <button
        type="button"
        disabled={termsPending || authorize.isPending || authorize.isSuccess}
        onClick={() => authorize.mutate()}
        className="flex h-[42px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-md bg-[#4285f4] text-sm font-semibold text-white shadow-xs transition hover:bg-[#3367d6] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white p-0.5">
          <GoogleIcon />
        </span>
        <span>
          {authorize.isPending || authorize.isSuccess
            ? 'Redirecting...'
            : isRegister
              ? 'Sign up with Google'
              : 'Sign in with Google'}
        </span>
      </button>

      {termsPending && (
        <p className="text-center text-xs text-slate-500">Please accept the terms above to continue with Google</p>
      )}
    </div>
  );
}
