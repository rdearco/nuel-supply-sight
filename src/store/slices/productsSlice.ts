import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  sku: string;
  warehouse: string;
  stock: number;
  demand: number;
}

export interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    warehouse: string;
    status: string;
  };
  dateRange: string;
  isDrawerOpen: boolean;
  selectedProduct: Product | null;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    warehouse: '',
    status: 'All',
  },
  dateRange: '7d',
  isDrawerOpen: false,
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setDateRange: (state, action: PayloadAction<string>) => {
      state.dateRange = action.payload;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    applyFilters: (state) => {
      const { search, warehouse, status } = state.filters;
      
      state.filteredProducts = state.products.filter((product) => {
        const searchMatch = 
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.sku.toLowerCase().includes(search.toLowerCase()) ||
          product.id.toLowerCase().includes(search.toLowerCase());
        
        const warehouseMatch = !warehouse || product.warehouse === warehouse;
        
        const getStatus = (product: Product) => {
          if (product.stock > product.demand) return 'Healthy';
          if (product.stock === product.demand) return 'Low';
          return 'Critical';
        };
        
        const statusMatch = status === 'All' || getStatus(product) === status;
        
        return searchMatch && warehouseMatch && statusMatch;
      });
    },
    updateProductDemand: (state, action: PayloadAction<{ id: string; demand: number }>) => {
      const { id, demand } = action.payload;
      const productIndex = state.products.findIndex(p => p.id === id);
      if (productIndex !== -1 && state.products[productIndex]) {
        state.products[productIndex].demand = demand;
        if (state.selectedProduct?.id === id) {
          state.selectedProduct.demand = demand;
        }
      }
    },
    transferStock: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const { id, amount } = action.payload;
      const productIndex = state.products.findIndex(p => p.id === id);
      if (productIndex !== -1 && state.products[productIndex]) {
        state.products[productIndex].stock += amount;
        if (state.selectedProduct?.id === id) {
          state.selectedProduct.stock += amount;
        }
      }
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  setFilters,
  setDateRange,
  setDrawerOpen,
  setSelectedProduct,
  applyFilters,
  updateProductDemand,
  transferStock,
} = productsSlice.actions;

export default productsSlice.reducer;