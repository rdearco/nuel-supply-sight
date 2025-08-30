import { useState, useEffect } from 'react';
import { graphqlService } from '../services/graphqlService';
import { Product, KPI, TrendData } from '../types';

export function useProducts() {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await graphqlService.getProducts();
        setData(response.data?.products || null);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { data, loading, error };
}

export function useKPIs(range: string) {
  const [data, setData] = useState<KPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchKPIs = async () => {
      try {
        setLoading(true);
        const response = await graphqlService.getKPIs(range);
        setData(response.data?.kpis || null);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchKPIs();
  }, [range]);

  return { data, loading, error };
}

export function useTrendData(range: string) {
  const [data, setData] = useState<TrendData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTrendData = async () => {
      try {
        setLoading(true);
        const response = await graphqlService.getTrendData(range);
        setData(response.data?.trendData || null);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendData();
  }, [range]);

  return { data, loading, error };
}

export function useWarehouses() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        setLoading(true);
        const response = await graphqlService.getWarehouses();
        setData(response.data?.warehouses || []);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, []);

  return { data, loading, error };
}