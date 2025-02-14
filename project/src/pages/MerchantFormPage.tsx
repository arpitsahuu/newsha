import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import MerchantForm from '../components/merchants/MerchantForm';
import type { Merchant } from '../types/merchant';

interface MerchantFormPageProps {
  merchant?: Merchant;
  onSubmit: (merchantData: Omit<Merchant, 'id' | 'joinDate'>) => void;
  onCancel: () => void;
}

const MerchantFormPage: React.FC<MerchantFormPageProps> = ({
  merchant,
  onSubmit,
  onCancel,
}) => {
  return (
    <>
      <Helmet>
        <title>{merchant ? 'Edit Merchant' : 'Add New Merchant'} - Admin Panel</title>
        <meta name="description" content={`${merchant ? 'Edit' : 'Add new'} merchant details and information.`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center">
            <button
              onClick={onCancel}
              className="mr-4 p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {merchant ? 'Edit Merchant' : 'Add New Merchant'}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {merchant 
                  ? 'Update the merchant information below'
                  : 'Fill in the information below to create a new merchant account'
                }
              </p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <MerchantForm
                merchant={merchant}
                onSubmit={onSubmit}
                onCancel={onCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantFormPage;