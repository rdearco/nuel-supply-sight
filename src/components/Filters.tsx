import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Card, 
  CardContent, 
  Grid,
  TextField, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  SelectChangeEvent
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { RootState } from '../store';
import { setFilters, applyFilters } from '../store/slices/productsSlice';
import { useWarehouses } from '../hooks/useGraphQL';

export const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.products);
  const { data: warehouses } = useWarehouses();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    dispatch(setFilters({ search }));
    dispatch(applyFilters());
  };

  const handleWarehouseChange = (e: SelectChangeEvent) => {
    const warehouse = e.target.value;
    dispatch(setFilters({ warehouse }));
    dispatch(applyFilters());
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    const status = e.target.value;
    dispatch(setFilters({ status }));
    dispatch(applyFilters());
  };

  return (
    <Card elevation={1} sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={3}>
          {/* Search Box */}
          <Grid>
            <TextField
              fullWidth
              label="Search"
              placeholder="Search by name, SKU, or ID..."
              value={filters.search}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Warehouse Dropdown */}
          <Grid>
            <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
              <InputLabel shrink>Warehouse</InputLabel>
              <Select
                value={filters.warehouse}
                onChange={handleWarehouseChange}
                label="Warehouse"
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return 'All Warehouses';
                  }
                  return selected;
                }}
              >
                <MenuItem value="">All Warehouses</MenuItem>
                {warehouses?.map((warehouse) => (
                  <MenuItem key={warehouse} value={warehouse}>
                    {warehouse}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Status Dropdown */}
          <Grid>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={handleStatusChange}
                label="Status"
              >
                <MenuItem value="All">All Status</MenuItem>
                <MenuItem value="Healthy">Healthy</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};