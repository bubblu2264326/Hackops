import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import InventoryTable from './InventoryTable';
import { useAuthStore } from '../../store/authStore';

// Mock the auth store
vi.mock('../../store/authStore', () => ({
  useAuthStore: () => ({
    role: 'admin'
  })
}));

describe('InventoryTable', () => {
  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const mockProducts = [
    {
      id: '1',
      name: 'Test Product',
      sku: 'TEST-001',
      stock_quantity: 10,
      price: 99.99,
      category_id: '1',
      cost_price: 50.00,
      reorder_level: 5,
      description: 'Test description'
    }
  ];

  it('renders loading state correctly', () => {
    render(<InventoryTable products={[]} isLoading={true} />, { wrapper });
  });

  it('renders empty state correctly', () => {
    render(<InventoryTable products={[]} isLoading={false} />, { wrapper });
  });

  it('renders products correctly', () => {
    render(<InventoryTable products={mockProducts} isLoading={false} />, { wrapper });
  });
});