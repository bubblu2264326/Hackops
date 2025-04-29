import { describe, it, expect, beforeEach } from 'vitest';
import { supabase } from './supabase';

describe('Supabase Integration', () => {
  it('can connect to Supabase', () => {
    expect(supabase).toBeDefined();
    expect(supabase.from).toBeDefined();
  });

  it('can query products table', async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(1);

    expect(error).toBeNull();
    expect(Array.isArray(data)).toBe(true);
  });
});