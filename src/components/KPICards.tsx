import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { 
  Grid,
  Card, 
  CardContent, 
  Typography, 
  Skeleton
} from '@mui/material';
import { RootState } from '../store';

interface KPICardProps {
  title: string;
  value: string | number;
  loading?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, loading = false }) => (
  <Card elevation={1} sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {loading ? (
        <Skeleton variant="text" width={80} height={40} />
      ) : (
        <Typography variant="h4" component="div" fontWeight="bold">
          {value}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export const KPICards: React.FC = () => {
  const { products, loading } = useSelector((state: RootState) => state.products);

  const kpis = useMemo(() => {
    if (!products.length) {
      return {
        totalStock: 0,
        totalDemand: 0,
        fillRate: 0
      };
    }

    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const totalDemand = products.reduce((sum, product) => sum + product.demand, 0);
    const fillRate = totalDemand > 0 
      ? Math.round((products.reduce((sum, product) => sum + Math.min(product.stock, product.demand), 0) / totalDemand) * 100 * 100) / 100
      : 0;

    return {
      totalStock,
      totalDemand,
      fillRate
    };
  }, [products]);

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid>
        <KPICard
          title="Total Stock"
          value={kpis.totalStock.toLocaleString()}
          loading={loading}
        />
      </Grid>
      <Grid>
        <KPICard
          title="Total Demand"
          value={kpis.totalDemand.toLocaleString()}
          loading={loading}
        />
      </Grid>
      <Grid>
        <KPICard
          title="Fill Rate"
          value={`${kpis.fillRate}%`}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};