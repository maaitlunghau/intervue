import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { RECRUITER_CITY_OPTIONS } from '@/constants/recruiter-onboarding';
import type { RecruiterProfileFormData } from '@/schemas/recruiter.schema';
import { Building, Building2, MapPin, Phone, User } from 'lucide-react';
import type { FieldErrors, Path, UseFormRegister } from 'react-hook-form';

type RecruiterProfileFieldsProps<T extends RecruiterProfileFormData> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<RecruiterProfileFormData>;
};

export default function RecruiterProfileFields<T extends RecruiterProfileFormData>({
  register,
  errors,
}: RecruiterProfileFieldsProps<T>) {
  const field = (name: keyof RecruiterProfileFormData) => register(name as Path<T>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="md:col-span-8">
          <Input
            id="name"
            label="Full name *"
            type="text"
            placeholder="Full name"
            autoComplete="name"
            radius="md"
            inputSize="compact"
            leftIcon={<User className="h-4.5 w-4.5 text-[#00b14f]" />}
            error={errors.name?.message}
            {...field('name')}
          />
        </div>

        <div className="md:col-span-4">
          <span id="gender-label" className="mb-2 block text-sm font-semibold text-slate-800">
            Gender: *
          </span>
          <div role="radiogroup" aria-labelledby="gender-label" className="flex h-[42px] items-center gap-6">
            <label
              htmlFor="gender-male"
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 select-none"
            >
              <input
                id="gender-male"
                type="radio"
                value="MALE"
                {...field('gender')}
                className="h-4 w-4 cursor-pointer accent-[#00b14f]"
              />
              <span>Male</span>
            </label>
            <label
              htmlFor="gender-female"
              className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700 select-none"
            >
              <input
                id="gender-female"
                type="radio"
                value="FEMALE"
                {...field('gender')}
                className="h-4 w-4 cursor-pointer accent-[#00b14f]"
              />
              <span>Female</span>
            </label>
          </div>
          {errors.gender && <p className="mt-1 text-xs font-medium text-rose-500">{errors.gender.message}</p>}
        </div>
      </div>

      <Input
        id="phone"
        label="Personal phone number *"
        type="tel"
        placeholder="Personal phone number"
        autoComplete="tel"
        radius="md"
        inputSize="compact"
        leftIcon={<Phone className="h-4.5 w-4.5 text-[#00b14f]" />}
        error={errors.phone?.message}
        {...field('phone')}
      />

      <Input
        id="companyName"
        label="Company *"
        type="text"
        placeholder="Company name"
        radius="md"
        inputSize="compact"
        leftIcon={<Building2 className="h-4.5 w-4.5 text-[#00b14f]" />}
        error={errors.companyName?.message}
        {...field('companyName')}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Select
          id="city"
          label="Workplace location *"
          placeholder="Select city / province"
          options={RECRUITER_CITY_OPTIONS}
          radius="md"
          inputSize="compact"
          leftIcon={<MapPin className="h-4.5 w-4.5 text-[#00b14f]" />}
          error={errors.city?.message}
          {...field('city')}
        />

        <Input
          id="districtWard"
          label="District / ward"
          type="text"
          placeholder="District, ward"
          radius="md"
          inputSize="compact"
          leftIcon={<Building className="h-4.5 w-4.5 text-[#00b14f]" />}
          error={errors.districtWard?.message}
          {...field('districtWard')}
        />
      </div>
    </div>
  );
}
