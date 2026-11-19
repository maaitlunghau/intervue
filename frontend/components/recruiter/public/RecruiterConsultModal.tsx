'use client';

import { Modal } from '@/components/ui/Modal';
import { CheckCircle2, PhoneCall, Send } from 'lucide-react';
import React, { useState } from 'react';

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  company: '',
  needs: 'Job Posting & AI Matching Solutions',
};

interface RecruiterConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterConsultModal({ isOpen, onClose }: RecruiterConsultModalProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState('');

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm(INITIAL_FORM);
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedPhone(form.phone);
    setSubmitted(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Enterprise Recruitment Consultation"
      description="An InterVue recruitment solutions specialist will reach out to assist you within 15 working minutes."
      maxWidth="md"
    >
      {submitted ? (
        <div className="py-6 text-center">
          <div className="bg-primary-container text-primary mx-auto flex h-14 w-14 items-center justify-center rounded-full">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-navy mt-4 text-lg font-bold">Request Submitted Successfully!</h3>
          <p className="text-on-surface-variant mt-2 text-xs">
            Thank you for trusting InterVue. Our recruitment specialist will call directly to{' '}
            <strong className="text-navy">{submittedPhone}</strong> to assist you.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="tel:0812665001"
              className="bg-navy inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
              <span>Hotline: (+84) 812.665.001</span>
            </a>
            <button
              type="button"
              onClick={handleClose}
              className="border-outline text-navy hover:bg-surface-container-high rounded-xl border px-5 py-2.5 text-xs font-bold transition"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label htmlFor="modal-fullName" className="text-navy block text-xs font-bold">
              Full Name *
            </label>
            <input
              id="modal-fullName"
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="e.g. Alex Johnson (HR Manager)"
              className="border-outline-variant text-navy focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium transition focus:ring-2 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="modal-phone" className="text-navy block text-xs font-bold">
                Phone Number *
              </label>
              <input
                id="modal-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+84 987 654 321"
                className="border-outline-variant text-navy focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium transition focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="modal-email" className="text-navy block text-xs font-bold">
                Work Email *
              </label>
              <input
                id="modal-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="hr@company.com"
                className="border-outline-variant text-navy focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium transition focus:ring-2 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="modal-company" className="text-navy block text-xs font-bold">
              Company / Enterprise Name *
            </label>
            <input
              id="modal-company"
              type="text"
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Your company name"
              className="border-outline-variant text-navy focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium transition focus:ring-2 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="modal-needs" className="text-navy block text-xs font-bold">
              Consultation Needs
            </label>
            <select
              id="modal-needs"
              value={form.needs}
              onChange={(e) => setForm({ ...form, needs: e.target.value })}
              className="border-outline-variant text-navy focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium transition focus:ring-2 focus:outline-none"
            >
              <option value="Job Posting & AI Matching Solutions">Job Posting &amp; AI Matching Solutions</option>
              <option value="Large Enterprise Custom Package">Large Enterprise Custom Package</option>
              <option value="Banner Placement & Tech Branding">Banner Placement &amp; Tech Branding</option>
              <option value="Academic & Education Code Partnership">Academic &amp; Education Code Partnership</option>
              <option value="Internal ATS API Integration">Internal ATS API Integration</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="border-outline-variant text-on-surface-variant hover:bg-surface-container-low rounded-xl border px-4 py-2.5 text-xs font-bold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Consultation Request</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
