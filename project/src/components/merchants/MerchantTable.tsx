import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { SortButton } from './SortButton';
import type { Merchant, SortConfig, SortField } from '../../types/merchant';

interface MerchantTableProps {
  merchants: Merchant[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  onEdit: (merchant: Merchant) => void;
  onDelete: (merchant: Merchant) => void;
}

const MerchantTable: React.FC<MerchantTableProps> = ({
  merchants,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200" role="grid">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton
                field="name"
                label="Merchant"
                currentSort={sortConfig}
                onSort={onSort}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton
                field="store"
                label="Store"
                currentSort={sortConfig}
                onSort={onSort}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton
                field="status"
                label="Status"
                currentSort={sortConfig}
                onSort={onSort}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <SortButton
                field="joinDate"
                label="Join Date"
                currentSort={sortConfig}
                onSort={onSort}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {merchants.map((merchant) => (
            <tr key={merchant.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{merchant.name}</div>
                    <div className="text-sm text-gray-500">{merchant.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{merchant.store}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  merchant.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
                role="status"
                >
                  {merchant.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {merchant.joinDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(merchant)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                  aria-label={`Edit ${merchant.name}`}
                >
                  <Pencil className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => onDelete(merchant)}
                  className="text-red-600 hover:text-red-900"
                  aria-label={`Delete ${merchant.name}`}
                >
                  <Trash2 className="h-5 w-5" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MerchantTable;