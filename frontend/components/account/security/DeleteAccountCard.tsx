'use client';

import Button from '@/components/ui/Button';
import type { AuthPortal } from '@/lib/auth-portal';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import DeleteAccountDialog from './DeleteAccountDialog';

type DeleteAccountCardProps = { portal: AuthPortal; className?: string };

export default function DeleteAccountCard({ portal, className }: DeleteAccountCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('border-error/30 rounded-2xl border bg-white p-6 shadow-xs', className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-error text-base font-bold">Delete account</h2>
          <p className="text-on-surface-variant mt-1 text-xs">
            Deleting your account starts a 7-day grace period. Signing in again during that time cancels the deletion;
            after that, the account is removed permanently.
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          radius="md"
          onClick={() => setIsOpen(true)}
          leftIcon={<Trash2 className="h-3.5 w-3.5 text-rose-600" />}
          className="shrink-0 border border-rose-300 bg-white text-xs font-semibold text-rose-600 shadow-2xs hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700 active:bg-rose-100"
        >
          Delete account
        </Button>
      </div>

      <DeleteAccountDialog isOpen={isOpen} onClose={() => setIsOpen(false)} portal={portal} />
    </div>
  );
}
