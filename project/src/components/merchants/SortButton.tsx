import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import type { SortField, SortConfig } from '../../types/merchant';

interface SortButtonProps {
  field: SortField;
  label: string;
  currentSort: SortConfig;
  onSort: (field: SortField) => void;
}

export const SortButton = React.memo<SortButtonProps>(({
  field,
  label,
  currentSort,
  onSort
}) => (
  <button
    onClick={() => onSort(field)}
    className="group inline-flex items-center space-x-1"
    aria-label={`Sort by ${label} ${currentSort.field === field ? `(${currentSort.order === 'asc' ? 'ascending' : 'descending'})` : ''}`}
  >
    <span>{label}</span>
    <ArrowUpDown className={`h-4 w-4 transition-colors ${
      currentSort.field === field ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-500'
    }`} aria-hidden="true" />
  </button>
));

SortButton.displayName = 'SortButton';