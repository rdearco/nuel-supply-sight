import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  ToggleButtonGroup, 
  ToggleButton,
  useTheme
} from '@mui/material';
import { RootState } from '../store';
import { setDateRange } from '../store/slices/productsSlice';
import { DateRange } from '../types';

const dateRangeOptions: { value: DateRange; label: string }[] = [
  { value: '7d', label: '7 days' },
  { value: '14d', label: '14 days' },
  { value: '30d', label: '30 days' },
];

export const TopBar: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { dateRange } = useSelector((state: RootState) => state.products);

  const handleDateRangeChange = (_: React.MouseEvent<HTMLElement>, newRange: DateRange | null) => {
    if (newRange) {
      dispatch(setDateRange(newRange));
    }
  };

  return (
    <AppBar 
      position="static" 
      elevation={1}
      sx={{ 
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            color: 'primary.main'
          }}
        >
          SupplySight
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Date Range:
          </Typography>
          <ToggleButtonGroup
            value={dateRange}
            exclusive
            onChange={handleDateRangeChange}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                border: '1px solid',
                borderColor: 'divider',
                '&:not(:last-of-type)': {
                  borderRight: '1px solid',
                  borderRightColor: 'divider',
                },
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              },
            }}
          >
            {dateRangeOptions.map((option) => (
              <ToggleButton 
                key={option.value} 
                value={option.value}
                sx={{ px: 2, py: 0.5 }}
              >
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};