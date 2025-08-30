import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { KPICards } from '../KPICards';

describe('KPICards', () => {
  it('renders loading state', () => {
    const initialState = {
      products: {
        products: [],
        filteredProducts: [],
        loading: true,
        error: null,
        filters: {
          search: '',
          warehouse: 'All',
          status: 'All'
        },
        dateRange: '7d',
        isDrawerOpen: false,
        selectedProduct: null
      }
    };

    render(<KPICards />, { preloadedState: initialState });
    
    expect(screen.getByText('Total Stock')).toBeInTheDocument();
    expect(screen.getByText('Total Demand')).toBeInTheDocument();
    expect(screen.getByText('Fill Rate')).toBeInTheDocument();
  });

  it('renders KPI data correctly', () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', sku: 'SKU1', warehouse: 'WH1', stock: 800, demand: 600 },
      { id: '2', name: 'Product 2', sku: 'SKU2', warehouse: 'WH2', stock: 700, demand: 600 },
    ];

    const initialState = {
      products: {
        products: mockProducts,
        filteredProducts: mockProducts,
        loading: false,
        error: null,
        filters: {
          search: '',
          warehouse: 'All',
          status: 'All'
        },
        dateRange: '7d',
        isDrawerOpen: false,
        selectedProduct: null
      }
    };

    render(<KPICards />, { preloadedState: initialState });
    
    expect(screen.getByText('1,500')).toBeInTheDocument(); // Total stock: 800 + 700
    expect(screen.getByText('1,200')).toBeInTheDocument(); // Total demand: 600 + 600
    expect(screen.getByText('100%')).toBeInTheDocument(); // Fill rate: (600+600)/(600+600) * 100 = 100%
  });

  it('calculates fill rate correctly when stock is limited', () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', sku: 'SKU1', warehouse: 'WH1', stock: 400, demand: 600 },
      { id: '2', name: 'Product 2', sku: 'SKU2', warehouse: 'WH2', stock: 300, demand: 400 },
    ];

    const initialState = {
      products: {
        products: mockProducts,
        filteredProducts: mockProducts,
        loading: false,
        error: null,
        filters: {
          search: '',
          warehouse: 'All',
          status: 'All'
        },
        dateRange: '7d',
        isDrawerOpen: false,
        selectedProduct: null
      }
    };

    render(<KPICards />, { preloadedState: initialState });
    
    expect(screen.getByText('700')).toBeInTheDocument(); // Total stock: 400 + 300
    expect(screen.getByText('1,000')).toBeInTheDocument(); // Total demand: 600 + 400
    expect(screen.getByText('70%')).toBeInTheDocument(); // Fill rate: (400+300)/(600+400) * 100 = 70%
  });
});