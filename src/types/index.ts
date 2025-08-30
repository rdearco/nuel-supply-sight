export interface Product {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
}

export interface KPI {
  totalStock: number;
  totalDemand: number;
  fillRate: number;
}

export interface TrendData {
  date: string;
  stock: number;
  demand: number;
}

export interface Filters {
  search: string;
  warehouse: string;
  status: 'All' | 'Healthy' | 'Low' | 'Critical';
}

export type DateRange = '7d' | '14d' | '30d';

export type ProductStatus = 'Healthy' | 'Low' | 'Critical';

export interface UpdateDemandInput {
  productId: string;
  newDemand: number;
}

export interface TransferStockInput {
  productId: string;
  amount: number;
}

export interface GraphQLResponse<T> {
  data?: T;
  loading: boolean;
  error?: Error;
}