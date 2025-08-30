# SupplySight Dashboard

A Daily Inventory Dashboard for supply chain management built with React, TypeScript, Tailwind CSS, and Redux Toolkit.

## Features

- 📊 Real-time KPI dashboard with Total Stock, Total Demand, and Fill Rate
- 📈 Interactive trend chart showing Stock vs Demand over time  
- 🔍 Advanced filtering by search, warehouse, and status
- 📋 Paginated products table with status indicators
- 🏗️ Product management drawer with demand updates and stock transfers
- 🎨 Responsive design with Tailwind CSS
- ✅ Comprehensive testing with Vitest
- 🔧 TypeScript with strict typing

## Tech Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Heroicons
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library
- **GraphQL**: Mock server with executable schema

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (current setup may have compatibility issues with older versions)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Quality Assurance  
npm run lint         # Fix linting issues
npm run lint:check   # Check linting issues
npm run typecheck    # Run TypeScript compiler check
npm run test         # Run tests
npm run test:coverage # Run tests with coverage
```

## Project Structure

```
src/
├── components/          # React components
│   ├── __tests__/      # Component tests
│   ├── Filters.tsx     # Search and filter controls
│   ├── KPICards.tsx    # Key performance indicators
│   ├── ProductDrawer.tsx # Product detail drawer
│   ├── ProductsTable.tsx # Main products table
│   ├── TopBar.tsx      # Navigation header
│   └── TrendChart.tsx  # Stock vs demand chart
├── data/               # Mock data and generators
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── store/              # Redux store and slices
├── test/               # Test utilities and setup
├── types/              # TypeScript definitions
├── App.tsx             # Root component
└── main.tsx           # Application entry point
```

## Key Business Logic

### Status Calculation
- **🟢 Healthy**: `stock > demand`
- **🟡 Low**: `stock = demand`  
- **🔴 Critical**: `stock < demand`

### Fill Rate Formula
```
Fill Rate = (sum(min(stock, demand)) / sum(demand)) * 100%
```

## Features Implemented

✅ **Dashboard Layout**
- Top bar with SupplySight branding and date range chips (7d/14d/30d)
- KPI cards showing key metrics
- Interactive line chart for trend visualization
- Advanced filtering system

✅ **Products Management**
- Paginated table (10 rows per page)
- Live search by name, SKU, or product ID
- Warehouse and status filtering
- Click-to-open product details drawer
- Update demand and transfer stock functionality

✅ **Data Interactions**
- GraphQL mutations for data updates
- Real-time filtering and search
- Loading states and error handling
- Responsive design for all screen sizes

## API Structure

The mock GraphQL API includes:

### Queries
- `products` - Get all products
- `kpis(range: String!)` - Get KPIs for date range
- `trendData(range: String!)` - Get trend data for charts
- `warehouses` - Get list of all warehouses

### Mutations
- `updateProductDemand(productId: ID!, newDemand: Int!)` - Update product demand
- `transferStock(productId: ID!, amount: Int!)` - Transfer stock (positive or negative)

## Testing

The project includes comprehensive tests covering component rendering, business logic, and GraphQL operations.

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage
```

## Architecture Decisions

See [NOTES.md](./NOTES.md) for detailed information about technical decisions, trade-offs, and implementation approach.

## Claude Code Configuration

See [CLAUDE.md](./CLAUDE.md) for project-specific settings and commands for Claude Code development assistance.

## Known Issues

- Node.js version compatibility (requires 20.19+ or 22.12+)
- Some TypeScript strict mode issues may need resolution
- Development server may not start on older Node.js versions

---

🚀 **Generated with [Claude Code](https://claude.ai/code)**
