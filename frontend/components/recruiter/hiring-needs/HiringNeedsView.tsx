'use client';

import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import type { RecruiterNeedsFormData } from '@/schemas/recruiter.schema';
import type { HiringNeed } from '@/types/recruiter-hiring-need';
import { describeHiringNeed } from '@/utils/hiring-need';
import { Briefcase, Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { AccountSettingsLayout } from '../company/AccountSettingsLayout';
import HiringNeedFormModal from './HiringNeedFormModal';
import HiringNeedsList from './HiringNeedsList';

type HiringNeedsViewProps = {
  initialNeeds: HiringNeed[];
};

type FormTarget = { need: HiringNeed | null };

const toHiringNeed = (id: string, values: RecruiterNeedsFormData): HiringNeed => ({
  id,
  position: values.position,
  level: values.level,
  hireBy: values.continuous ? '' : values.hireBy,
  continuous: values.continuous,
  headcount: values.headcount,
  budgetFrom: values.budgetFrom,
  budgetTo: values.budgetTo,
  budgetSource: values.budgetSource,
});

export default function HiringNeedsView({ initialNeeds }: HiringNeedsViewProps) {
  const [needs, setNeeds] = useState(initialNeeds);
  const [formTarget, setFormTarget] = useState<FormTarget | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<HiringNeed | null>(null);

  const openAddForm = () => setFormTarget({ need: null });

  const handleSave = (values: RecruiterNeedsFormData) => {
    const editing = formTarget?.need;
    if (editing) {
      setNeeds((current) => current.map((need) => (need.id === editing.id ? toHiringNeed(editing.id, values) : need)));
      toast.success('Hiring need updated.');
    } else {
      setNeeds((current) => [toHiringNeed(crypto.randomUUID(), values), ...current]);
      toast.success('Hiring need added.');
    }
    setFormTarget(null);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setNeeds((current) => current.filter((need) => need.id !== deleteTarget.id));
    setDeleteTarget(null);
    toast.success('Hiring need deleted.');
  };

  return (
    <AccountSettingsLayout activeTab="needs" pageTitle="Hiring Needs">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900 sm:text-lg">Hiring Needs</h2>
            </div>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Plan the IT roles your company needs to fill and the budget for each one.
            </p>
          </div>

          <Button
            size="sm"
            variant="primary"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={openAddForm}
            className="shrink-0"
          >
            Add hiring need
          </Button>
        </div>

        <HiringNeedsList
          needs={needs}
          onAdd={openAddForm}
          onEdit={(need) => setFormTarget({ need })}
          onDelete={setDeleteTarget}
        />

        {formTarget && (
          <HiringNeedFormModal
            key={formTarget.need?.id ?? 'new'}
            initialValues={formTarget.need ? { ...formTarget.need, consultation: '' } : undefined}
            onClose={() => setFormTarget(null)}
            onSave={handleSave}
          />
        )}

        <Modal
          isOpen={deleteTarget !== null}
          onClose={() => setDeleteTarget(null)}
          title="Delete hiring need?"
          footer={
            <>
              <Button type="button" variant="ghost" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button type="button" variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </>
          }
        >
          {deleteTarget && (
            <p className="text-on-surface-variant text-sm leading-relaxed">
              <strong className="text-on-surface">{describeHiringNeed(deleteTarget).role}</strong> (
              {describeHiringNeed(deleteTarget).level}) will be removed from your hiring needs. You can add it again
              later.
            </p>
          )}
        </Modal>
      </div>
    </AccountSettingsLayout>
  );
}
