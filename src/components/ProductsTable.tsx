import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { RootState } from '../store';
import { setDrawerOpen, setSelectedProduct } from '../store/slices/productsSlice';
import { Product, ProductStatus } from '../types';

const StatusChip: React.FC<{ status: ProductStatus }> = ({ status }) => {
  const getStatusColor = (status: ProductStatus) => {
    switch (status) {
      case 'Healthy':
        return { color: 'success' as const, variant: 'filled' as const };
      case 'Low':
        return { color: 'warning' as const, variant: 'filled' as const };
      case 'Critical':
        return { color: 'error' as const, variant: 'filled' as const };
      default:
        return { color: 'default' as const, variant: 'filled' as const };
    }
  };

  const { color, variant } = getStatusColor(status);
  return <Chip label={status} color={color} variant={variant} size="small" />;
};

export const ProductsTable: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredProducts, loading } = useSelector((state: RootState) => state.products);

  const getProductStatus = (product: Product): ProductStatus => {
    if (product.stock > product.demand) return 'Healthy';
    if (product.stock === product.demand) return 'Low';
    return 'Critical';
  };

  const handleRowClick = (params: { row: Product }) => {
    dispatch(setSelectedProduct(params.row));
    dispatch(setDrawerOpen(true));
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Product',
      width: 200,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Typography variant="body2" fontWeight="medium">
            {params.row.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.id}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'sku',
      headerName: 'SKU',
      width: 150,
    },
    {
      field: 'warehouse',
      headerName: 'Warehouse',
      width: 150,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 120,
      type: 'number',
      valueFormatter: (value: number) => value.toLocaleString(),
    },
    {
      field: 'demand',
      headerName: 'Demand',
      width: 120,
      type: 'number',
      valueFormatter: (value: number) => value.toLocaleString(),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const status = getProductStatus(params.row);
        return <StatusChip status={status} />;
      },
    },
  ];

  const rows = filteredProducts.map((product) => ({
    ...product,
    status: getProductStatus(product),
  }));

  return (
    <Card elevation={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Products ({filteredProducts.length})
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          onRowClick={handleRowClick}
          rowHeight={75}
          sx={{
            '& .MuiDataGrid-row[data-rowindex="0"]': {
              '&[data-selected="false"]': {
                bgcolor: (theme) => {
                  const firstRow = rows[0];
                  return firstRow && getProductStatus(firstRow) === 'Critical' 
                    ? theme.palette.error.light + '20' 
                    : 'transparent';
                },
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </CardContent>
    </Card>
  );
};