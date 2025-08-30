import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { RootState } from '../store';

export const TrendChart: React.FC = () => {
  const { dateRange, products, loading } = useSelector((state: RootState) => state.products);

  const trendData = useMemo(() => {
    const days = dateRange === '7d' ? 7 : dateRange === '14d' ? 14 : 30;
    const data = [];
    
    // Calculate current totals from products
    const currentTotalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const currentTotalDemand = products.reduce((sum, product) => sum + product.demand, 0);
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Add some realistic variation to historical data
      const stockVariation = Math.random() * 50 - 25;
      const demandVariation = Math.random() * 30 - 15;
      
      data.push({
        date: date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        stock: Math.round(currentTotalStock + stockVariation),
        demand: Math.round(currentTotalDemand + demandVariation),
      });
    }
    
    return data;
  }, [dateRange, products]);

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

  const xLabels = trendData.map(item => item.date);
  const stockData = trendData.map(item => item.stock);
  const demandData = trendData.map(item => item.demand);

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