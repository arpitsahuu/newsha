export interface Merchant {
  id: number;
  name: string;
  email: string;
  store: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

export type SortField = 'name' | 'store' | 'status' | 'joinDate';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}