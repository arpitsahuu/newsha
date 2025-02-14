import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6 relative">
      <label htmlFor="search" className="sr-only">Search merchants</label>
      <input
        id="search"
        type="search"
        placeholder="Search merchants..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        aria-label="Search merchants"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
    </div>
  );
};

export default SearchBar;