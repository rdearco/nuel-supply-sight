import { describe, it, expect } from 'vitest';
import { executeGraphQL } from '../mockGraphQL';

describe('mockGraphQL', () => {
  it('returns products data', async () => {
    const result = await executeGraphQL('query { products { id name sku warehouse stock demand } }');
    
    expect(result.data?.products).toBeDefined();
    if (result.data?.products) {
      expect(Array.isArray(result.data.products)).toBe(true);
      expect(result.data.products.length).toBeGreaterThan(0);
    }
  });

  it('returns KPIs data', async () => {
    const result = await executeGraphQL('query GetKPIs($range: String!) { kpis(range: $range) { totalStock totalDemand fillRate } }', { range: '7d' });
    
    expect(result.data?.kpis).toBeDefined();
    if (result.data?.kpis) {
      expect(result.data.kpis.totalStock).toBeGreaterThan(0);
      expect(result.data.kpis.totalDemand).toBeGreaterThan(0);
      expect(result.data.kpis.fillRate).toBeGreaterThanOrEqual(0);
    }
  });

  it('returns trend data', async () => {
    const result = await executeGraphQL('query GetTrendData($range: String!) { trendData(range: $range) { date stock demand } }', { range: '7d' });
    
    expect(result.data?.trendData).toBeDefined();
    if (result.data?.trendData) {
      expect(Array.isArray(result.data.trendData)).toBe(true);
      expect(result.data.trendData.length).toBe(7);
    }
  });

  it('returns warehouses data', async () => {
    const result = await executeGraphQL('query { warehouses }');
    
    expect(result.data?.warehouses).toBeDefined();
    expect(Array.isArray(result.data?.warehouses)).toBe(true);
  });

  it('updates product demand', async () => {
    const result = await executeGraphQL(
      'mutation UpdateProductDemand($productId: ID!, $newDemand: Int!) { updateProductDemand(productId: $productId, newDemand: $newDemand) { id demand } }',
      { productId: 'P-1001', newDemand: 150 }
    );
    
    expect(result.data?.updateProductDemand).toBeDefined();
    if (result.data?.updateProductDemand) {
      expect(result.data.updateProductDemand.demand).toBe(150);
    }
  });

  it('transfers stock', async () => {
    const result = await executeGraphQL(
      'mutation TransferStock($productId: ID!, $amount: Int!) { transferStock(productId: $productId, amount: $amount) { id stock } }',
      { productId: 'P-1001', amount: 25 }
    );
    
    expect(result.data?.transferStock).toBeDefined();
    if (result.data?.transferStock) {
      expect(result.data.transferStock.stock).toBeGreaterThan(0);
    }
  });
});