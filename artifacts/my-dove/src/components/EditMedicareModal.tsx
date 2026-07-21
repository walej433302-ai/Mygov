import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MedicareCardData } from '../hooks/useMedicareData';
import { X, Plus, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const schema = z.object({
  number: z.string().regex(/^\d{4} \d{5} \d$/, "Must be XXXX XXXXX X format"),
  expiry: z.string().regex(/^\d{2}\/\d{4}$/, "Must be MM/YYYY format"),
  members: z.array(z.object({
    name: z.string().min(1, "Name is required"),
    irn: z.string().regex(/^[1-9]$/, "IRN must be 1-9")
  })).min(1).max(5)
});

type FormValues = z.infer<typeof schema>;

interface Props {
  data: MedicareCardData;
  onSave: (data: MedicareCardData) => void;
  onCancel: () => void;
}

export function EditMedicareModal({ data, onSave, onCancel }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: data
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members"
  });

  const onSubmit = (values: FormValues) => {
    // Upper case all names
    const transformed = {
      ...values,
      members: values.members.map(m => ({ ...m, name: m.name.toUpperCase() }))
    };
    onSave(transformed);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-sm border border-border p-4 mt-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-primary">Edit Medicare Details</h3>
        <button onClick={onCancel} className="text-muted-foreground p-1" aria-label="Cancel">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase">Medicare Number</label>
            <input 
              {...form.register("number")} 
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="XXXX XXXXX X"
              data-testid="input-medicare-number"
            />
            {form.formState.errors.number && <p className="text-destructive text-xs mt-1">{form.formState.errors.number.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted-foreground mb-1 uppercase">Valid To (Expiry)</label>
            <input 
              {...form.register("expiry")} 
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="MM/YYYY"
              data-testid="input-medicare-expiry"
            />
            {form.formState.errors.expiry && <p className="text-destructive text-xs mt-1">{form.formState.errors.expiry.message}</p>}
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase">Card Members</label>
          
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-start">
                <div className="flex-1">
                  <input 
                    {...form.register(`members.${index}.name`)} 
                    className="w-full border border-border rounded-md px-3 py-2 text-sm uppercase focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="Full Name"
                  />
                  {form.formState.errors.members?.[index]?.name && 
                    <p className="text-destructive text-xs mt-1">{form.formState.errors.members[index]?.name?.message}</p>}
                </div>
                <div className="w-16">
                  <input 
                    {...form.register(`members.${index}.irn`)} 
                    className="w-full border border-border rounded-md px-3 py-2 text-sm text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    placeholder="IRN"
                  />
                  {form.formState.errors.members?.[index]?.irn && 
                    <p className="text-destructive text-xs mt-1">{form.formState.errors.members[index]?.irn?.message}</p>}
                </div>
                {index > 0 && (
                  <button 
                    type="button" 
                    onClick={() => remove(index)}
                    className="text-muted-foreground hover:text-destructive p-2 mt-0.5"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {fields.length < 5 && (
            <button 
              type="button"
              onClick={() => append({ name: '', irn: String(fields.length + 1) })}
              className="mt-3 flex items-center text-sm font-semibold text-primary"
            >
              <Plus size={16} className="mr-1" />
              Add another person
            </button>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button 
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-border text-foreground font-semibold rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-md flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <Save size={18} className="mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
}
