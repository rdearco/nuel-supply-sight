import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Box, Skeleton, Alert } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { RootState } from '../store';
import { useTrendData } from '../hooks/useGraphQL';

export const TrendChart: React.FC = () => {
  const { dateRange } = useSelector((state: RootState) => state.products);
  const { data: trendData, loading, error } = useTrendData(dateRange);

  if (loading) {
    return (
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Stock vs Demand Trend
          </Typography>
          <Skeleton variant="rectangular" height={300} />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Stock vs Demand Trend
          </Typography>
          <Alert severity="error">
            Error loading trend data: {error.message}
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const chartData = trendData?.map((item) => ({
    date: formatDate(item.date),
    stock: Math.round(item.stock),
    demand: Math.round(item.demand),
  })) || [];

  const xLabels = chartData.map(item => item.date);
  const stockData = chartData.map(item => item.stock);
  const demandData = chartData.map(item => item.demand);

  return (
    <Card elevation={1} sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Stock vs Demand Trend
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <LineChart
            height={300}
            series={[
              {
                data: stockData,
                label: 'Stock',
                color: '#10b981',
              },
              {
                data: demandData,
                label: 'Demand',
                color: '#2563eb',
              },
            ]}
            xAxis={[{ 
              scaleType: 'point', 
              data: xLabels,
              tickLabelStyle: {
                fontSize: 12,
              },
            }]}
            yAxis={[{
              tickLabelStyle: {
                fontSize: 12,
              },
            }]}
            grid={{ vertical: true, horizontal: true }}
            margin={{ left: 60, right: 20, top: 20, bottom: 60 }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};