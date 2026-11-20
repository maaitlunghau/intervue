'use client';

import Button from '@/components/ui/Button';
import { useAccountSessions, useRevokeOtherSessions, useRevokeSession } from '@/hooks/useAccountSecurity';
import type { AuthPortal } from '@/lib/auth-portal';
import { cn } from '@/lib/utils';
import { getErrorMessage } from '@/utils/error';
import { LogOut } from 'lucide-react';
import SessionRow from './SessionRow';

type ActiveSessionsCardProps = { portal: AuthPortal; className?: string };

export default function ActiveSessionsCard({ portal, className }: ActiveSessionsCardProps) {
  const sessions = useAccountSessions(portal);
  const revokeSession = useRevokeSession(portal);
  const revokeOthers = useRevokeOtherSessions(portal);

  const items = sessions.data ?? [];
  const hasOthers = items.some((session) => !session.current);

  return (
    <div className={cn('border-outline-variant rounded-2xl border bg-white p-6 shadow-xs', className)}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-on-surface text-base font-bold">Sessions & active devices</h2>
          <p className="text-on-surface-variant text-xs">Review and revoke access from devices you do not recognise.</p>
        </div>

        <Button
          type="button"
          size="sm"
          radius="md"
          disabled={!hasOthers}
          isLoading={revokeOthers.isPending}
          onClick={() => revokeOthers.mutate()}
          leftIcon={<LogOut className="h-3.5 w-3.5 text-rose-600" />}
          className="shrink-0 border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 shadow-2xs hover:border-rose-300 hover:bg-rose-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-70"
        >
          Sign out of all other devices
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {sessions.isPending && (
          <div className="space-y-3" aria-busy="true">
            <div className="bg-surface-container-high h-18 animate-pulse rounded-xl" />
            <div className="bg-surface-container-high h-18 animate-pulse rounded-xl" />
          </div>
        )}

        {sessions.isError && (
          <div role="alert" className="border-error/30 bg-error/10 text-error rounded-xl border p-4 text-sm">
            <p className="font-semibold">{getErrorMessage(sessions.error)}</p>
            <button
              type="button"
              onClick={() => sessions.refetch()}
              className="mt-1 cursor-pointer text-xs font-bold underline"
            >
              Try again
            </button>
          </div>
        )}

        {sessions.isSuccess && items.length === 0 && (
          <p className="border-outline-variant bg-surface-container-low text-on-surface-variant rounded-xl border p-4 text-sm">
            No active sessions found.
          </p>
        )}

        {items.map((session) => (
          <SessionRow
            key={session.id}
            session={session}
            isRevoking={revokeSession.isPending && revokeSession.variables === session.id}
            onRevoke={() => revokeSession.mutate(session.id)}
          />
        ))}
      </div>
    </div>
  );
}
