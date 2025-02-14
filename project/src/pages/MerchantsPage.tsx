import React, { useState, useCallback, useMemo } from 'react';
import { PlusCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import MerchantTable from '../components/merchants/MerchantTable';
import Pagination from '../components/merchants/Pagination';
import SearchBar from '../components/merchants/SearchBar';
import DeleteModal from '../components/merchants/DeleteModal';
import MerchantFormPage from './MerchantFormPage';
import type { Merchant, SortField } from '../types/merchant';

const ITEMS_PER_PAGE = 5;

const initialMerchants: Merchant[] = [
  { id: 1, name: 'John Smith', email: 'john@example.com', store: 'Smith Electronics', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', store: 'Fashion Hub', status: 'active', joinDate: '2024-02-01' },
  { id: 3, name: 'Mike Brown', email: 'mike@example.com', store: 'Sports World', status: 'inactive', joinDate: '2024-02-15' },
  { id: 4, name: 'Emma Davis', email: 'emma@example.com', store: 'Home Decor', status: 'active', joinDate: '2024-03-01' },
  { id: 5, name: 'Alex Wilson', email: 'alex@example.com', store: 'Tech Store', status: 'active', joinDate: '2024-03-10' },
  { id: 6, name: 'Lisa Chen', email: 'lisa@example.com', store: 'Beauty Shop', status: 'active', joinDate: '2024-03-15' },
  { id: 7, name: 'Tom Wilson', email: 'tom@example.com', store: 'Pet Supplies', status: 'inactive', joinDate: '2024-03-20' },
  { id: 8, name: 'Anna Lee', email: 'anna@example.com', store: 'Book Haven', status: 'active', joinDate: '2024-03-25' },
];

const MerchantsPage = () => {
  const [merchants, setMerchants] = useState<Merchant[]>(initialMerchants);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingMerchant, setEditingMerchant] = useState<Merchant | null>(null);
  const [deletingMerchant, setDeletingMerchant] = useState<Merchant | null>(null);
  const [sortConfig, setSortConfig] = useState<{ field: SortField; order: 'asc' | 'desc' }>({
    field: 'name',
    order: 'asc'
  });

  // Memoized filter and sort functions
  const filteredMerchants = useMemo(() => {
    return merchants.filter(merchant =>
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.store.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [merchants, searchTerm]);

  const sortedMerchants = useMemo(() => {
    return [...filteredMerchants].sort((a, b) => {
      const aValue = a[sortConfig.field].toString().toLowerCase();
      const bValue = b[sortConfig.field].toString().toLowerCase();
      
      return sortConfig.order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [filteredMerchants, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedMerchants.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMerchants = sortedMerchants.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handlers
  const handleSort = useCallback((field: SortField) => {
    setSortConfig(current => ({
      field,
      order: current.field === field && current.order === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  }, []);

  const handleEdit = useCallback((merchant: Merchant) => {
    setEditingMerchant(merchant);
    setIsFormVisible(true);
  }, []);

  const handleDeleteClick = useCallback((merchant: Merchant) => {
    setDeletingMerchant(merchant);
    setIsDeleteModalOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (deletingMerchant) {
      setMerchants(prev => prev.filter(m => m.id !== deletingMerchant.id));
      setIsDeleteModalOpen(false);
      setDeletingMerchant(null);
    }
  }, [deletingMerchant]);

  const handleFormSubmit = useCallback((merchantData: Omit<Merchant, 'id' | 'joinDate'>) => {
    const newMerchant = {
      ...merchantData,
      id: editingMerchant ? editingMerchant.id : merchants.length + 1,
      joinDate: editingMerchant ? editingMerchant.joinDate : new Date().toISOString().split('T')[0],
    };

    setMerchants(prev => 
      editingMerchant
        ? prev.map(m => m.id === editingMerchant.id ? newMerchant : m)
        : [...prev, newMerchant]
    );

    setIsFormVisible(false);
    setEditingMerchant(null);
  }, [editingMerchant, merchants.length]);

  if (isFormVisible) {
    return (
      <MerchantFormPage
        merchant={editingMerchant || undefined}
        onSubmit={handleFormSubmit}
        onCancel={() => {
          setIsFormVisible(false);
          setEditingMerchant(null);
        }}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Merchant Management - Admin Panel</title>
        <meta name="description" content="Manage merchants, view their status, and perform administrative tasks." />
      </Helmet>

      <main className="p-6" role="main">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Merchants</h1>
          <button
            onClick={() => setIsFormVisible(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700 transition-colors"
            aria-label="Add new merchant"
          >
            <PlusCircle className="h-5 w-5 mr-2" aria-hidden="true" />
            Add Merchant
          </button>
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <MerchantTable
          merchants={paginatedMerchants}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedMerchants.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          merchant={deletingMerchant}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingMerchant(null);
          }}
          onConfirm={handleDeleteConfirm}
        />
      </main>
    </>
  );
};

export default MerchantsPage;