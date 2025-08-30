# Claude Code Configuration

This file contains project-specific settings and commands for Claude Code.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build project
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Type check
npm run typecheck
```

## Project Structure

- `src/` - Source code
- `public/` - Static assets
- `index.html` - Entry point
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

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

## Notes

Add any project-specific notes or commands that Claude should be aware of here.