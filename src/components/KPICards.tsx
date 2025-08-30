import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Grid,
  Card, 
  CardContent, 
  Typography, 
  Skeleton,
  Alert,
  Box
} from '@mui/material';
import { RootState } from '../store';
import { useKPIs } from '../hooks/useGraphQL';

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
  const { dateRange } = useSelector((state: RootState) => state.products);
  const { data: kpis, loading, error } = useKPIs(dateRange);

  if (error) {
    return (
      <Box sx={{ mb: 3 }}>
        <Alert severity="error">
          Error loading KPIs: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid>
        <KPICard
          title="Total Stock"
          value={kpis?.totalStock.toLocaleString() || 0}
          loading={loading}
        />
      </Grid>
      <Grid>
        <KPICard
          title="Total Demand"
          value={kpis?.totalDemand.toLocaleString() || 0}
          loading={loading}
        />
      </Grid>
      <Grid>
        <KPICard
          title="Fill Rate"
          value={kpis ? `${kpis.fillRate}%` : '0%'}
          loading={loading}
        />
      </Grid>
    </Grid>
  );
};