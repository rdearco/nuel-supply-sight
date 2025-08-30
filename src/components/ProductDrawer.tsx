import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Alert,
  Chip,
  Stack,
  Paper
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { RootState } from '../store';
import { setDrawerOpen, updateProductDemand, transferStock } from '../store/slices/productsSlice';
import { graphqlService } from '../services/graphqlService';

export const ProductDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const { isDrawerOpen, selectedProduct } = useSelector((state: RootState) => state.products);
  const [demandValue, setDemandValue] = useState('');
  const [stockValue, setStockValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    dispatch(setDrawerOpen(false));
    setDemandValue('');
    setStockValue('');
    setError(null);
  };

  const handleUpdateDemand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !demandValue) return;

    const newDemand = parseInt(demandValue);
    if (isNaN(newDemand) || newDemand < 0) {
      setError('Please enter a valid demand value');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await graphqlService.updateProductDemand(selectedProduct.id, newDemand);
      dispatch(updateProductDemand({ id: selectedProduct.id, demand: newDemand }));
      setDemandValue('');
    } catch (error) {
      console.log(error);
      setError('Failed to update demand');
    } finally {
      setLoading(false);
    }
  };

  const handleTransferStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !stockValue) return;

    const amount = parseInt(stockValue);
    if (isNaN(amount)) {
      setError('Please enter a valid stock amount');
      return;
    }

    if (amount < 0 && Math.abs(amount) > selectedProduct.stock) {
      setError('Cannot transfer more stock than available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await graphqlService.transferStock(selectedProduct.id, amount);
      dispatch(transferStock({ id: selectedProduct.id, amount }));
      setStockValue('');
    } catch {
      setError('Failed to transfer stock');
    } finally {
      setLoading(false);
    }
  };

  const getProductStatus = () => {
    if (!selectedProduct) return 'Unknown';
    if (selectedProduct.stock > selectedProduct.demand) return 'Healthy';
    if (selectedProduct.stock === selectedProduct.demand) return 'Low';
    return 'Critical';
  };

  const getStatusChip = (status: string) => {
    const statusProps = {
      Healthy: { color: 'success' as const },
      Low: { color: 'warning' as const },
      Critical: { color: 'error' as const },
    };
    return statusProps[status as keyof typeof statusProps] || { color: 'default' as const };
  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={handleClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: 'grey.50'
          }}
        >
          <Typography variant="h6">Product Details</Typography>
          <IconButton onClick={handleClose} edge="end">
            <Close />
          </IconButton>
        </Box>

        {selectedProduct && (
          <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
            {/* Product Information */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Information
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">{selectedProduct.name}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Product ID
                  </Typography>
                  <Typography variant="body1">{selectedProduct.id}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    SKU
                  </Typography>
                  <Typography variant="body1">{selectedProduct.sku}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Warehouse
                  </Typography>
                  <Typography variant="body1">{selectedProduct.warehouse}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Current Stock
                  </Typography>
                  <Typography variant="body1">{selectedProduct.stock.toLocaleString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Current Demand
                  </Typography>
                  <Typography variant="body1">{selectedProduct.demand.toLocaleString()}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={getProductStatus()}
                    size="small"
                    {...getStatusChip(getProductStatus())}
                  />
                </Box>
              </Stack>
            </Paper>

            {/* Error Message */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Update Demand Form */}
            <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Update Demand
              </Typography>
              <Box component="form" onSubmit={handleUpdateDemand}>
                <TextField
                  fullWidth
                  type="number"
                  label="New Demand"
                  value={demandValue}
                  onChange={(e) => setDemandValue(e.target.value)}
                  placeholder="Enter new demand..."
                  inputProps={{ min: 0 }}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading || !demandValue}
                  sx={{ bgcolor: 'primary.main' }}
                >
                  {loading ? 'Updating...' : 'Update Demand'}
                </Button>
              </Box>
            </Paper>

            {/* Transfer Stock Form */}
            <Paper elevation={1} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Transfer Stock
              </Typography>
              <Box component="form" onSubmit={handleTransferStock}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount"
                  helperText="Positive to add, negative to remove"
                  value={stockValue}
                  onChange={(e) => setStockValue(e.target.value)}
                  placeholder="Enter stock amount..."
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading || !stockValue}
                  sx={{ bgcolor: 'success.main', '&:hover': { bgcolor: 'success.dark' } }}
                >
                  {loading ? 'Processing...' : 'Transfer Stock'}
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};