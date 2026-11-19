'use client';

import { Modal } from '@/components/ui/Modal';
import { CheckCircle2, PhoneCall, Send } from 'lucide-react';
import React, { useState } from 'react';

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  company: '',
  needs: 'Gói đăng tin tuyển dụng & AI matching',
};

interface RecruiterConsultModalV2Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterConsultModalV2({ isOpen, onClose }: RecruiterConsultModalV2Props) {
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
      title="Đăng ký tư vấn Tuyển dụng Doanh nghiệp"
      description="Chuyên viên giải pháp tuyển dụng của InterVue sẽ liên hệ hỗ trợ bạn trong vòng 15 phút làm việc."
      maxWidth="md"
    >
      {submitted ? (
        <div className="py-6 text-center">
          <div className="bg-primary-container text-primary mx-auto flex h-14 w-14 items-center justify-center rounded-full">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-navy mt-4 text-lg font-bold">Gửi yêu cầu thành công!</h3>
          <p className="text-on-surface-variant mt-2 text-xs">
            Cảm ơn bạn đã tin tưởng InterVue. Chuyên viên tư vấn tuyển dụng sẽ gọi điện trực tiếp tới số điện thoại{' '}
            <strong className="text-navy">{submittedPhone}</strong> để hỗ trợ.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="tel:0812665001"
              className="bg-navy inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              <PhoneCall className="h-3.5 w-3.5 text-emerald-400" />
              <span>Hotline: 0812.665.001</span>
            </a>
            <button
              type="button"
              onClick={handleClose}
              className="border-outline text-navy hover:bg-surface-container-high rounded-xl border px-5 py-2.5 text-xs font-bold transition"
            >
              Đóng
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div>
            <label htmlFor="modal-v2-fullName" className="text-navy block text-xs font-bold">
              Họ và tên người liên hệ *
            </label>
            <input
              id="modal-v2-fullName"
              type="text"
              required
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="VD: Nguyễn Văn An (HR Manager)"
              className="border-outline-variant text-navy focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium transition focus:ring-2 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="modal-v2-phone" className="text-navy block text-xs font-bold">
                Số điện thoại liên hệ *
              </label>
              <input
                id="modal-v2-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="0987654321"
                className="border-outline-variant text-navy focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium transition focus:ring-2 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="modal-v2-email" className="text-navy block text-xs font-bold">
                Email doanh nghiệp *
              </label>
              <input
                id="modal-v2-email"
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
            <label htmlFor="modal-v2-company" className="text-navy block text-xs font-bold">
              Tên công ty / Doanh nghiệp *
            </label>
            <input
              id="modal-v2-company"
              type="text"
              required
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Tên doanh nghiệp của bạn"
              className="border-outline-variant text-navy focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium transition focus:ring-2 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="modal-v2-needs" className="text-navy block text-xs font-bold">
              Nhu cầu tư vấn
            </label>
            <select
              id="modal-v2-needs"
              value={form.needs}
              onChange={(e) => setForm({ ...form, needs: e.target.value })}
              className="border-outline-variant text-navy focus:border-primary focus:ring-primary/20 mt-1 w-full rounded-xl border px-3.5 py-2.5 text-xs font-medium transition focus:ring-2 focus:outline-none"
            >
              <option value="Gói đăng tin tuyển dụng & AI matching">Gói đăng tin tuyển dụng &amp; AI matching</option>
              <option value="Gói Doanh nghiệp quy mô lớn (Enterprise Custom)">
                Gói Doanh nghiệp quy mô lớn (Enterprise Custom)
              </option>
              <option value="Vị trí Banner & Quảng bá tuyển dụng đa kênh">
                Vị trí Banner &amp; Quảng bá tuyển dụng đa kênh
              </option>
              <option value="Hợp tác nguồn nhân lực Đại học & Education Code">
                Hợp tác nguồn nhân lực Đại học &amp; Education Code
              </option>
              <option value="Tích hợp API hệ thống ATS nội bộ">Tích hợp API hệ thống ATS nội bộ</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="border-outline-variant text-on-surface-variant hover:bg-surface-container-low rounded-xl border px-4 py-2.5 text-xs font-bold transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Gửi yêu cầu tư vấn</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
