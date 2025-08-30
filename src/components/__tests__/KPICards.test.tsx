import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { KPICards } from '../KPICards';

// Mock the useKPIs hook
vi.mock('../../hooks/useGraphQL', () => ({
  useKPIs: vi.fn(),
}));

import { useKPIs } from '../../hooks/useGraphQL';

describe('KPICards', () => {
  it('renders loading state', () => {
    vi.mocked(useKPIs).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(<KPICards />);
    
    expect(screen.getByText('Total Stock')).toBeInTheDocument();
    expect(screen.getByText('Total Demand')).toBeInTheDocument();
    expect(screen.getByText('Fill Rate')).toBeInTheDocument();
  });

  it('renders KPI data correctly', () => {
    const mockKPIs = {
      totalStock: 1500,
      totalDemand: 1200,
      fillRate: 85.5,
    };

    vi.mocked(useKPIs).mockReturnValue({
      data: mockKPIs,
      loading: false,
      error: null,
    });

    render(<KPICards />);
    
    expect(screen.getByText('1,500')).toBeInTheDocument();
    expect(screen.getByText('1,200')).toBeInTheDocument();
    expect(screen.getByText('85.5%')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const mockError = new Error('Failed to load KPIs');

    vi.mocked(useKPIs).mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
    });

    render(<KPICards />);
    
    expect(screen.getByText(/Error loading KPIs/)).toBeInTheDocument();
  });
});