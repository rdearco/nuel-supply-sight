import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container, Alert, AlertTitle } from '@mui/material';
import { setProducts, applyFilters } from './store/slices/productsSlice';
import { useProducts } from './hooks/useGraphQL';
import { TopBar } from './components/TopBar';
import { KPICards } from './components/KPICards';
import { TrendChart } from './components/TrendChart';
import { Filters } from './components/Filters';
import { ProductsTable } from './components/ProductsTable';
import { ProductDrawer } from './components/ProductDrawer';

function App() {
  const dispatch = useDispatch();
  const { data: products, error } = useProducts();

  useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
      dispatch(applyFilters());
    }
  }, [products, dispatch]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopBar />
      
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>Error Loading Data</AlertTitle>
            {error.message}
          </Alert>
        ) : (
          <>
            <KPICards />
            <TrendChart />
            <Filters />
            <ProductsTable />
          </>
        )}
      </Container>

      <ProductDrawer />
    </Box>
  );
}

export default App;
