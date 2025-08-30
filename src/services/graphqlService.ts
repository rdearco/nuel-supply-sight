import { executeGraphQL } from './mockGraphQL';

export const GET_PRODUCTS = `
  query GetProducts {
    products {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const GET_KPIS = `
  query GetKPIs($range: String!) {
    kpis(range: $range) {
      totalStock
      totalDemand
      fillRate
    }
  }
`;

export const GET_TREND_DATA = `
  query GetTrendData($range: String!) {
    trendData(range: $range) {
      date
      stock
      demand
    }
  }
`;

export const GET_WAREHOUSES = `
  query GetWarehouses {
    warehouses
  }
`;

export const UPDATE_PRODUCT_DEMAND = `
  mutation UpdateProductDemand($productId: ID!, $newDemand: Int!) {
    updateProductDemand(productId: $productId, newDemand: $newDemand) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

export const TRANSFER_STOCK = `
  mutation TransferStock($productId: ID!, $amount: Int!) {
    transferStock(productId: $productId, amount: $amount) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`;

// Service methods
export const graphqlService = {
  async getProducts() {
    return executeGraphQL(GET_PRODUCTS);
  },

  async getKPIs(range: string) {
    return executeGraphQL(GET_KPIS, { range });
  },

  async getTrendData(range: string) {
    return executeGraphQL(GET_TREND_DATA, { range });
  },

  async getWarehouses() {
    return executeGraphQL(GET_WAREHOUSES);
  },

  async updateProductDemand(productId: string, newDemand: number) {
    return executeGraphQL(UPDATE_PRODUCT_DEMAND, { productId, newDemand });
  },

  async transferStock(productId: string, amount: number) {
    return executeGraphQL(TRANSFER_STOCK, { productId, amount });
  },
};