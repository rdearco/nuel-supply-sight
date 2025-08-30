import { makeExecutableSchema } from '@graphql-tools/schema';
import { mockProducts, generateTrendData, getWarehouses } from '../data/mockData';
import { Product, TrendData, KPI } from '../types';

const typeDefs = `
  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type TrendData {
    date: String!
    stock: Float!
    demand: Float!
  }

  type KPI {
    totalStock: Int!
    totalDemand: Int!
    fillRate: Float!
  }

  type Query {
    products: [Product!]!
    kpis(range: String!): KPI!
    trendData(range: String!): [TrendData!]!
    warehouses: [String!]!
  }

  type Mutation {
    updateProductDemand(productId: ID!, newDemand: Int!): Product
    transferStock(productId: ID!, amount: Int!): Product
  }
`;

// Create a fully mutable copy of mockProducts for mutations
let products: Product[] = structuredClone(mockProducts);

const resolvers = {
  Query: {
    products: (): Product[] => products,
    
    kpis: (_: unknown, { range: _range }: { range: string }): KPI => {
      const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
      const totalDemand = products.reduce((sum, product) => sum + product.demand, 0);
      const fillRate = totalDemand > 0 
        ? (products.reduce((sum, product) => sum + Math.min(product.stock, product.demand), 0) / totalDemand) * 100 
        : 0;
      
      return {
        totalStock,
        totalDemand,
        fillRate: Math.round(fillRate * 100) / 100,
      };
    },
    
    trendData: (_: unknown, { range }: { range: string }): TrendData[] => {
      return generateTrendData(range);
    },
    
    warehouses: (): string[] => getWarehouses(),
  },
  
  Mutation: {
    updateProductDemand: (_: unknown, { productId, newDemand }: { productId: string; newDemand: number }): Product | null => {
      const productIndex = products.findIndex(p => p.id === productId);
      if (productIndex !== -1 && products[productIndex]) {
        const updatedProduct = { ...products[productIndex], demand: newDemand };
        products = products.map((product, index) => 
          index === productIndex ? updatedProduct : product
        );
        return updatedProduct;
      }
      return null;
    },
    
    transferStock: (_: unknown, { productId, amount }: { productId: string; amount: number }): Product | null => {
      const productIndex = products.findIndex(p => p.id === productId);
      if (productIndex !== -1 && products[productIndex]) {
        const updatedProduct = { 
          ...products[productIndex], 
          stock: products[productIndex].stock + amount 
        };
        products = products.map((product, index) => 
          index === productIndex ? updatedProduct : product
        );
        return updatedProduct;
      }
      return null;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Mock execution function to simulate GraphQL operations
export const executeGraphQL = async (query: string, variables?: Record<string, unknown>) => {
  // This is a simplified mock - in a real app you'd use something like graphql-js execute
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  
  if (query.includes('products')) {
    return { data: { products } };
  }
  
  if (query.includes('kpis')) {
    const range = variables?.['range'] || '7d';
    const kpis = resolvers.Query.kpis(null, { range: range as string });
    return { data: { kpis } };
  }
  
  if (query.includes('trendData')) {
    const range = variables?.['range'] || '7d';
    const trendData = resolvers.Query.trendData(null, { range: range as string });
    return { data: { trendData } };
  }
  
  if (query.includes('warehouses')) {
    const warehouses = resolvers.Query.warehouses();
    return { data: { warehouses } };
  }
  
  if (query.includes('updateProductDemand')) {
    const result = resolvers.Mutation.updateProductDemand(null, {
      productId: variables?.['productId'] as string,
      newDemand: variables?.['newDemand'] as number,
    });
    return { data: { updateProductDemand: result } };
  }
  
  if (query.includes('transferStock')) {
    const result = resolvers.Mutation.transferStock(null, {
      productId: variables?.['productId'] as string,
      amount: variables?.['amount'] as number,
    });
    return { data: { transferStock: result } };
  }
  
  return { data: null };
};