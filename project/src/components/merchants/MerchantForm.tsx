import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '../common/FormField';
import Input from '../common/Input';
import Select from '../common/Select';
import type { Merchant } from '../../types/merchant';

const merchantSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string()
    .email('Invalid email address'),
  store: z.string()
    .min(2, 'Store name must be at least 2 characters')
    .max(100, 'Store name must be less than 100 characters'),
  status: z.enum(['active', 'inactive'])
});

type MerchantFormData = z.infer<typeof merchantSchema>;

interface MerchantFormProps {
  merchant?: Merchant;
  onSubmit: (data: MerchantFormData) => void;
  onCancel: () => void;
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

const MerchantForm: React.FC<MerchantFormProps> = ({
  merchant,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<MerchantFormData>({
    resolver: zodResolver(merchantSchema),
    defaultValues: merchant ? {
      name: merchant.name,
      email: merchant.email,
      store: merchant.store,
      status: merchant.status,
    } : {
      status: 'active'
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-6">
            <FormField
              id="name"
              label="Merchant Name"
              error={errors.name?.message}
              required
              helpText="Enter the full name of the merchant"
            >
              <Input
                id="name"
                type="text"
                placeholder="John Smith"
                error={!!errors.name}
                {...register('name')}
              />
            </FormField>

            <FormField
              id="email"
              label="Email Address"
              error={errors.email?.message}
              required
              helpText="This email will be used for account notifications"
            >
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                error={!!errors.email}
                {...register('email')}
              />
            </FormField>

            <FormField
              id="store"
              label="Store Name"
              error={errors.store?.message}
              required
              helpText="The name of the merchant's store"
            >
              <Input
                id="store"
                type="text"
                placeholder="Smith's Electronics"
                error={!!errors.store}
                {...register('store')}
              />
            </FormField>

            <FormField
              id="status"
              label="Account Status"
              error={errors.status?.message}
              required
              helpText="Active accounts can process transactions"
            >
              <Select
                id="status"
                options={statusOptions}
                error={!!errors.status}
                {...register('status')}
              />
            </FormField>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : merchant ? 'Save Changes' : 'Create Merchant'}
        </button>
      </div>
    </form>
  );
};

export default MerchantForm;