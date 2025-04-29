import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts } from './useProducts';
import { supabase } from '../lib/supabase';
import { ReactNode } from 'react';

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({
          data: [
            {
              id: '1',
              name: 'Test Product',
              sku: 'TEST-001',
              stock_quantity: 10
            }
          ],
          error: null
        }))
      }))
    }))
  }
}));

describe('useProducts', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('fetches products successfully', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toHaveLength(1);
    expect(result.current.products[0].name).toBe('Test Product');
  });
});