# Maintenance Mode — Architecture & Roadmap

**Status:** design, awaiting approval · **Date:** 2026-11-18 · **Author:** maaitlunghau

A platform-wide switch that lets an admin close InterVue to candidates and recruiters during an
upgrade, show them a maintenance notice instead of the app, and reopen it when the work is done.

---

## 1. Intent and why

Today an upgrade means either taking the whole stack down (users get connection errors, Google sees
a dead site) or letting people keep using a system mid-migration. Neither is acceptable for a
platform holding applications and payments.

Maintenance mode gives the admin one deliberate, reversible action: close the front door, tell
people when to come back, keep working inside.

The reference is TopCV's maintenance page, which the product docs already treat as the model for
InterVue's posting/applying flow.

## 2. Goals

- An admin can turn maintenance on and off from the admin area, with an optional custom message and
  an optional estimated resume time.
- While it is on, **every** candidate, recruiter and guest page shows the maintenance notice. Any
  URL they type lands them on `/`.
- While it is on, the API rejects every non-admin request with a stable error code, so the block
  cannot be bypassed by calling the API directly or from the mobile app.
- `/admin/**` stays fully reachable, **including login**, so an admin can always get back in and
  switch it off.
- The admin dashboard carries an unmissable, non-dismissible reminder while it is on, with a direct
  link to the off switch.
- Search engines are told this is temporary and must not index the notice.

## 3. Non-goals

- Flutter UI for the maintenance state. The mobile app will start receiving
  `503 MAINTENANCE_MODE_ACTIVE` and handle it as a generic error; a dedicated mobile screen is a
  follow-up.
- Scheduled / auto-expiring maintenance windows. The switch is manual both ways.
- Partial maintenance (e.g. close candidates but not recruiters).
- An IP or token allowlist that lets named non-admins through.

## 4. Anti-goals — things that would make this a failure even if it "works"

- **Locking the admin out.** If the off switch can ever become unreachable, the feature is a
  liability, not a tool.
- **Closing the site by accident.** A transient network or Redis error must never be read as
  "maintenance is on".
- **Leaving it on by mistake.** Hours of silent downtime because nobody was reminded is the most
  likely real-world failure, which is why the dashboard banner is part of the feature, not a nicety.

## 5. Constraints

- Existing conventions in `docs/ai/architecture.md` and `docs/ai/conventions.md` apply: Flyway-only
  schema, `ApiResource` envelope, `AppException` + `ErrorCode`, interfaces as types, no comments by
  default, no tests unless asked.
- `frontend/proxy.ts` currently matches only `/candidate`, `/account`, `/notifications`,
  `/recruiter`, `/admin` and decides purely on cookie presence — it never calls the backend. Gating
  the public pages means widening that matcher, which touches every page view on the site.
- A Next.js App Router `page.tsx` cannot set its own HTTP status, so a 503 has to come from
  `proxy.ts`. Verified against `node_modules/next/dist/server/web/spec-extension/response.d.ts`:
  `NextResponse.rewrite(destination, init)` takes a `MiddlewareResponseInit extends ResponseInit`,
  so `status` and `headers` are settable there.
- Admin accounts live in `users` with `RoleType.ADMIN`; recruiters are a separate table. The filter
  must key off the resolved role, not the account table.

## 6. Approaches considered

How the **frontend** learns that maintenance is on was the real decision; the backend block was
never in question.

| | Approach | Trade-off |
|---|---|---|
| A | `proxy.ts` calls the status endpoint on **every** page request | Perfectly accurate and blocks at the URL layer, but adds a backend round-trip to every page view on an SEO-driven job board — a permanent cost for a rare state |
| B | Backend-only. API returns `503`; `apiRequest/http.ts` sees the code and redirects to `/` | Zero added cost and covers mobile for free, but the user sees the page shell flash before being bounced, which fails the "any URL redirects straight to `/`" requirement |
| **C** | **Hybrid (chosen).** Backend filter is the authority; `proxy.ts` also checks, reading a short-TTL cached status | One backend call per ~10s per instance instead of per request. Keeps URL-layer redirects and keeps the backend authoritative for API and mobile callers |

**Chosen: C.** Approved by the owner on 2026-11-18, together with:

- **Fail-open.** If the status check fails for any reason, traffic is treated as *not* in
  maintenance. A check failure must never close the site by itself (see anti-goals).
- **`503` + `Retry-After`** for the notice, not `200`, so Google treats it as a temporary outage,
  keeps existing rankings and does not index the notice as homepage content.

### Module placement — needs owner authorization

There is no `modules/admin` in the backend today; the 16 existing modules are all domain features
and none is a natural home for platform-wide operational config.

**Proposal: a new `modules/platform/` module.** Maintenance mode is the first of a family
(feature flags, global announcements, read-only mode) that is about operating the platform rather
than any domain.

Per *Architecture governance* in the root `CLAUDE.md`, adding a module is a **major architectural
change** and only an owner may authorize it. `gh api user --jq .login` was run and returned
`maaitlunghau`, an owner. **Approving this document is that authorization**, and
`docs/ai/architecture.md` will be updated in the same task to list the new module, as the
self-documentation rule requires.

## 7. Design

### 7.1 Data

New table, one row, seeded by the migration so the service never has to handle "no row yet" — the
same shape `billing_settings` already uses.

`V20261118001__create_maintenance_settings_table.sql` (latest existing migration is
`V20261113012`):

| Column | Type | Notes |
|---|---|---|
| `id` | BIGINT PK AI | |
| `enabled` | BOOLEAN NOT NULL DEFAULT FALSE | the switch |
| `message` | VARCHAR(500) NULL | optional custom line; falls back to default copy |
| `estimated_resume_at` | DATETIME(6) NULL | optional, UTC |
| `enabled_at` | DATETIME(6) NULL | set when switched on; drives the "on for 2h 14m" counter |
| `enabled_by` | BIGINT NULL FK → `users(id)` | audit: who closed the site |
| `created_at` / `updated_at` | DATETIME(6) NOT NULL | from `BaseEntity` |

### 7.2 Backend — `modules/platform/`

```
modules/platform/
├─ controllers/   PublicMaintenanceController, AdminMaintenanceController
├─ entities/      MaintenanceSettings
├─ repositories/  MaintenanceSettingsRepository
├─ requests/      SaveMaintenanceRequest
├─ resources/     MaintenanceStatusResource, MaintenanceSettingsResource
├─ mappers/       MaintenanceMapper
└─ services/
   ├─ interfaces/ MaintenanceServiceInterface
   └─ impl/       MaintenanceService, MaintenanceSettingsCache
```

**Endpoints**

| Method | Path | Access | Body / Returns |
|---|---|---|---|
| `GET` | `/api/v1/platform/maintenance` | permitAll | `MaintenanceStatusResource { enabled, message, estimatedResumeAt }` — only what the notice needs |
| `GET` | `/api/v1/admin/platform/maintenance` | `ROLE_ADMIN` | `MaintenanceSettingsResource` — adds `enabledAt`, `enabledBy` |
| `PUT` | `/api/v1/admin/platform/maintenance` | `ROLE_ADMIN` | `SaveMaintenanceRequest { enabled, message?, estimatedResumeAt? }` |

`enabled_at` is stamped by the service on the **false → true** transition only, so re-saving the
message while maintenance is already on does not reset the counter. `enabled_by` records the acting
admin, read from the authenticated principal, never from the request body.

**Cache** — `MaintenanceSettingsCache`, modelled on the existing `SkillCatalogCache`:
`StringRedisTemplate` + `ObjectMapper`, key `cache:platform:maintenance`, TTL 30s, explicitly
evicted on every write. MySQL stays the source of truth; an unreadable or missing cache entry falls
through to a DB read.

**`MaintenanceFilter`** — new filter in `com.techx.intervue.filters`, registered after
`JwtAuthFilter` so the role is already resolved. Decision order:

1. Request method is `OPTIONS` → let through, always.
2. Authenticated **and** holds `ROLE_ADMIN` → let through, always.
3. Path is on the always-allow list → let through:
   `/api/v1/platform/maintenance`, `/api/v1/admin/**`, `/api/v1/auth/**`, `/ping`.
4. Maintenance off → let through.
5. Otherwise → write the standard error envelope with
   `503 MAINTENANCE_MODE_ACTIVE` and a `Retry-After` header (seconds).

Rule 2 is deliberately role-based rather than path-based: an admin is unblocked everywhere, not just
under `/api/v1/admin/**`.

> **Rule 1 is not optional.** A CORS preflight carries no `Authorization` header, so without it an
> admin's own `OPTIONS` requests would be answered with `503`. The browser would then fail the
> preflight and the admin UI could not call the API at all — locking the admin out through the
> front door the rest of this design works hard to keep open.

`/api/v1/admin/**` has to be on the list, not just covered by rule 2: the admin **login** and
**refresh** calls arrive with no token, so there is no role to recognise yet. Admin auth lives at
`/api/v1/admin/auth/**`, which is *not* under `/api/v1/auth/**` — allowing only the latter locks
the admin out, the exact anti-goal this design exists to prevent. Letting the whole admin prefix
past costs nothing: `SecurityConfig` and `@PreAuthorize("hasRole('ADMIN')")` still guard every
route behind it, so the maintenance filter was never the security boundary there.

Allowing `/api/v1/auth/**` means a candidate can still *log in* during maintenance and will then hit
`503` on everything else. That is intentional and harmless: the alternative is a separate
admin-only login path, which is more surface area for no benefit. Do not "fix" it.

New `ErrorCode`: `MAINTENANCE_MODE_ACTIVE(HttpStatus.SERVICE_UNAVAILABLE, "InterVue is under
maintenance. Please try again later!")`.

### 7.3 Frontend

**`proxy.ts`** — matcher widens to the whole site, excluding `/admin`, `/_next`, static files and
the Next internals. Logic:

```
if path starts with /admin      → next()          // admin must never be gated here
status = cached status (TTL 10s, module-level; on any error → { enabled: false })
if status.enabled:
    if path !== '/'             → redirect('/')   // 307
    else                        → rewrite('/maintenance', { status: 503, headers: { 'Retry-After': … } })
// maintenance off — the pre-existing behaviour, unchanged:
if path is NOT under a protected prefix → next()  // see note below
…existing cookie checks, untouched…
```

The rewrite is what lets the URL stay `/` while the response carries 503 and the React page still
renders. `Retry-After` is expressed in seconds, computed from `estimatedResumeAt` when set,
otherwise a fixed fallback.

> **Required, easy to get wrong.** The current `proxy.ts` ends with a catch-all: no refresh cookie
> → redirect to `/login` (`proxy.ts:59-61`). That is safe today only because the matcher covers
> protected areas exclusively. Widening the matcher without guarding this would make `/`, `/jobs`,
> `/companies` and `/blog` demand a login — the entire public site would break the moment this
> ships, *even with maintenance off*. The cookie logic must therefore stay scoped to the original
> protected prefixes (`/candidate`, `/account`, `/notifications`, `/recruiter`, `/admin`); every
> other path falls straight through to `next()`.

The status is fetched from `NEXT_PUBLIC_API_URL`, the same base the browser client uses.

**New files**

| File | Purpose |
|---|---|
| `types/platform.ts` | `MaintenanceStatus`, `MaintenanceSettings` |
| `apiRequest/platform.ts` | `platformApi.getStatus()`, `adminPlatformApi.get/update()` |
| `schemas/maintenance.schema.ts` | Zod schema + form ↔ payload mappers, mirroring `payment-settings.schema.ts` |
| `hooks/useMaintenance.ts` | React Query hook shared by the banner and the settings form |
| `app/maintenance/page.tsx` | the notice page (rewrite target); redirects to `/` if hit directly while maintenance is off, so it is never an orphan URL |
| `components/maintenance/MaintenanceNotice.tsx` | logo → headline → 2 lines → sign-off → illustration → rule |
| `components/maintenance/MaintenanceCablePlugs.tsx` | the TopCV-benchmark two cable plugs illustration as an inline SVG |
| `components/admin/platform/AdminMaintenanceSettingsView.tsx` | the admin form |
| `app/(admin)/admin/platform/settings/page.tsx` | admin route, mirroring `admin/finance/settings` |
| `components/admin/dashboard/AdminMaintenanceBanner.tsx` | the dashboard reminder |

**Edited (backend):** `SecurityConfig` — `permitAll` for `/api/v1/platform/maintenance` and
registration of `MaintenanceFilter` after `JwtAuthFilter`; `ErrorCode` — the new constant.

**Edited (frontend):** `proxy.ts`, `constants/routes.ts` (`ADMIN_PLATFORM_SETTINGS`),
`constants/admin-nav.ts` (nav entry), `components/admin/dashboard/AdminDashboardView.tsx` (render the
banner above `AdminBannerCarousel`), `apiRequest/http.ts` (treat `MAINTENANCE_MODE_ACTIVE` as
"send the user to `/`"), `docs/ai/api-contract.md`, `docs/ai/architecture.md`.

### 7.4 The two screens

**Maintenance notice** — *work-zone barrier*, chosen 2026-11-18 from six candidates. Hazard-striped
tape across the full width with a cone centred, in brand green `#00b14f` and navy `#212f3f`.

Picked because it shows a **state** (blocked, work happening) rather than an activity. The rejected
candidates — gear, rocket, progress bar, mascot bot, cloud — read as Settings, product launch,
loading, the AI chatbot and storage respectively, and three of those collide with features InterVue
actually ships.

Scale matches the TopCV reference, which the first attempt missed by roughly 4x:

| | Value |
|---|---|
| Container | `max-width: 1180px` |
| Headline | `clamp(30px, 4.6vw, 52px)`, weight 800 |
| Body | `clamp(15px, 1.45vw, 19px)` |
| Illustration | `min(700px, 88vw)` |

Order mirrors TopCV exactly: logo → headline → estimated-return line → apology line → `— InterVue`
→ illustration → hairline rule. Copy is English. When the admin set a custom `message` it replaces
the apology line; when `estimatedResumeAt` is null the return line is dropped rather than faked.

**Admin dashboard banner** — *amber attention bar*, chosen 2026-11-18. Horizontal strip directly
under the greeting line and above `AdminBannerCarousel`: amber icon tile, pulsing dot, "Maintenance
mode is ON", an elapsed-time pill computed from `enabledAt`, one line of consequence copy, and a
"Turn it off →" CTA linking to the settings page.

Amber because it is already the warning tone in `AdminHighlightRow`
(`bg-amber-50 / text-amber-600`). Red was rejected: maintenance is a state the admin chose on
purpose, so red reads as a false alarm, and hours of red teaches people to ignore red. Light and
dark variants are both required, as the admin area supports both. **Not dismissible** — the whole
point is that it persists until the site actually reopens.

Turning maintenance **on** goes through a confirmation dialog; turning it **off** does not. Closing
the site is the irreversible-feeling direction, reopening it is the safe one.

## 8. Risks

| Risk | Mitigation |
|---|---|
| Admin locked out | `/admin/**` is never gated in `proxy.ts`; the filter unblocks `ROLE_ADMIN` everywhere and always allows `/api/v1/auth/**`. Escape hatch, documented in the runbook section: `UPDATE maintenance_settings SET enabled = 0;` then `DEL cache:platform:maintenance` |
| Redis down → site closes by accident | Cache miss falls through to MySQL; `proxy.ts` fails open. No failure path results in "closed" |
| Widened `proxy.ts` matcher slows every page | Status is read from a 10s module-level cache, not fetched per request. Static assets and `/_next` stay excluded |
| Left on by mistake | The dashboard banner with its elapsed-time counter exists for exactly this |
| Stale page after reopening | TTL is 10s at the proxy and 30s at the backend cache, so the site reopens on its own within seconds without a deploy or restart |

## 9. Left to the builder

- Exact Tailwind class lists, as long as they match the surrounding admin components.
- Whether `MaintenanceSettingsCache` stores JSON or a flat flag, provided the custom message and
  estimated time survive a round-trip.
- Fallback `Retry-After` value when `estimatedResumeAt` is null (something in the 5–15 minute range).
- Where the elapsed-time formatter lives, reusing an existing helper in `utils/` if one fits.

## 10. Verification

No unit tests — project rule, tests only on explicit request. Before calling it done:

- `cd backend && ./mvnw spotless:apply && ./mvnw -q compile`
- `cd frontend && npm run lint && npm run build`
- Manual: switch on → candidate, recruiter and guest URLs all land on `/` showing the notice with a
  `503`; `/admin/**` still works; log out and log back in as admin while it is on; switch off →
  everything is reachable again within seconds.
- `docs/ai/api-contract.md` updated with the three endpoints.
