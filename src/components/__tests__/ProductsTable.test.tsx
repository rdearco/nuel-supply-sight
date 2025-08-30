import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { ProductsTable } from '../ProductsTable';
import { Product } from '../../types';

// Mock Redux store with test data
const mockProducts: Product[] = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "DEL-B", stock: 50, demand: 80 },
];

// Mock Redux hooks
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(() => ({
      filteredProducts: mockProducts,
      loading: false,
    })),
    useDispatch: vi.fn(() => vi.fn()),
  };
});

describe('ProductsTable', () => {
  it('renders product data correctly', () => {
    render(<ProductsTable />);
    
    expect(screen.getByText('12mm Hex Bolt')).toBeInTheDocument();
    expect(screen.getByText('P-1001')).toBeInTheDocument();
    expect(screen.getByText('HEX-12-100')).toBeInTheDocument();
    expect(screen.getByText('BLR-A')).toBeInTheDocument();
    expect(screen.getByText('DEL-B')).toBeInTheDocument();
    expect(screen.getByText('180')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('shows correct status pills', () => {
    render(<ProductsTable />);
    
    expect(screen.getByText('Healthy')).toBeInTheDocument(); // 180 > 120
    expect(screen.getByText('Critical')).toBeInTheDocument(); // 50 < 80
  });

  it('displays product count', () => {
    render(<ProductsTable />);
    
    expect(screen.getByText('Products (2)')).toBeInTheDocument();
  });

  it('handles row click', () => {
    const { container } = render(<ProductsTable />);
    
    // DataGrid uses .MuiDataGrid-row class for rows instead of tbody tr
    const firstRow = container.querySelector('.MuiDataGrid-row');
    expect(firstRow).toBeInTheDocument();
    
    if (firstRow) {
      fireEvent.click(firstRow);
    }
  });
});