import { Product, TrendData } from '../types';

export const mockProducts: Product[] = [
  { id: "P-1001", name: "12mm Hex Bolt", sku: "HEX-12-100", warehouse: "BLR-A", stock: 180, demand: 120 },
  { id: "P-1002", name: "Steel Washer", sku: "WSR-08-500", warehouse: "BLR-A", stock: 50, demand: 80 },
  { id: "P-1003", name: "M8 Nut", sku: "NUT-08-200", warehouse: "PNQ-C", stock: 80, demand: 80 },
  { id: "P-1004", name: "Bearing 608ZZ", sku: "BRG-608-50", warehouse: "DEL-B", stock: 24, demand: 120 },
];

export const generateTrendData = (range: string): TrendData[] => {
  const days = range === '7d' ? 7 : range === '14d' ? 14 : 30;
  const data: TrendData[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const totalStock = mockProducts.reduce((sum, product) => sum + product.stock, 0);
    const totalDemand = mockProducts.reduce((sum, product) => sum + product.demand, 0);
    
    // Add some variation to make the trend more realistic
    const stockVariation = Math.random() * 50 - 25;
    const demandVariation = Math.random() * 30 - 15;
    
    const dateStr = date.toISOString().split('T')[0];
    if (dateStr) {
      data.push({
        date: dateStr,
        stock: totalStock + stockVariation,
        demand: totalDemand + demandVariation,
      });
    }
  }
  
  return data;
};

export const getWarehouses = (): string[] => {
  return [...new Set(mockProducts.map(product => product.warehouse))];
};