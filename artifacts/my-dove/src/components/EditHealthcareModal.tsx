import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { HealthcareCardData } from '../hooks/useMedicareData';
import { X, Plus, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const schema = z.object({
  crn: z.string().min(1, "CRN is required"),
  validFrom: z.string().min(1, "Required"),
  validTo: z.string().min(1, "Required"),
  paymentType: z.string().min(1, "Payment type is required"),
  members: z.array(z.object({
    name: z.string().min(1, "Name is required")
  })).min(1).max(5)
});

type FormValues = z.infer<typeof schema>;

interface Props {
  data: HealthcareCardData;
  onSave: (data: HealthcareCardData) => void;
  onCancel: () => void;
}

export function EditHealthcareModal({ data, onSave, onCancel }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      crn: data.crn,
      validFrom: data.validFrom,
      validTo: data.validTo,
      paymentType: data.paymentType || 'JSP',
      members: data.members
    }
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: "members" });

  const onSubmit = (values: FormValues) => {
    onSave({
      ...values,
      members: values.members.map(m => ({ ...m, name: m.name.toUpperCase() }))
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow border border-gray-200 p-4 mt-2"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-base text-[#1A1A1A]">Edit Health Care Card</h3>
        <button onClick={onCancel} className="text-gray-400 p-1 hover:text-gray-600" aria-label="Cancel">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Payment Type</label>
          <input
            {...form.register("paymentType")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3EC6D4] focus:ring-1 focus:ring-[#3EC6D4]"
            placeholder="e.g. JSP"
            data-testid="input-payment-type"
          />
          {form.formState.errors.paymentType && <p className="text-red-500 text-xs mt-1">{form.formState.errors.paymentType.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">CRN</label>
          <input
            {...form.register("crn")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm uppercase focus:outline-none focus:border-[#3EC6D4] focus:ring-1 focus:ring-[#3EC6D4]"
            placeholder="XXX XXX XXX X"
            data-testid="input-crn"
          />
          {form.formState.errors.crn && <p className="text-red-500 text-xs mt-1">{form.formState.errors.crn.message}</p>}
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Valid From</label>
            <input
              {...form.register("validFrom")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3EC6D4] focus:ring-1 focus:ring-[#3EC6D4]"
              placeholder="DD Mon YYYY"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Valid To</label>
            <input
              {...form.register("validTo")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#3EC6D4] focus:ring-1 focus:ring-[#3EC6D4]"
              placeholder="DD Mon YYYY"
            />
          </div>
        </div>

        <div className="pt-1 border-t border-gray-100">
          <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Card Members</label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <input
                  {...form.register(`members.${index}.name`)}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm uppercase focus:outline-none focus:border-[#3EC6D4] focus:ring-1 focus:ring-[#3EC6D4]"
                  placeholder="Full Name"
                />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)} className="text-gray-400 hover:text-red-500 p-2 mt-0.5">
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {fields.length < 5 && (
            <button type="button" onClick={() => append({ name: '' })} className="mt-2.5 flex items-center text-sm font-semibold text-[#1B4F8A]">
              <Plus size={15} className="mr-1" /> Add family member
            </button>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onCancel} className="flex-1 px-4 py-2.5 border border-gray-200 text-[#1A1A1A] font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm">
            Cancel
          </button>
          <button type="submit" className="flex-1 px-4 py-2.5 bg-[#1B4F8A] text-white font-semibold rounded-lg flex items-center justify-center hover:bg-[#1B4F8A]/90 transition-colors text-sm">
            <Save size={15} className="mr-1.5" /> Save
          </button>
        </div>
      </form>
    </motion.div>
  );
}
