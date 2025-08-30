import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer, { ProductsState } from '../store/slices/productsSlice';

export type RootState = {
  products: ProductsState;
};

const createTestStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      products: productsReducer,
    },
    preloadedState,
  });
};

interface AllTheProvidersProps {
  children: React.ReactNode;
  preloadedState?: Partial<RootState> | undefined;
}

const AllTheProviders = ({ children, preloadedState }: AllTheProvidersProps) => {
  const store = createTestStore(preloadedState);
  return <Provider store={store}>{children}</Provider>;
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions,
) => {
  const { preloadedState, ...renderOptions } = options || {};
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AllTheProviders preloadedState={preloadedState}>{children}</AllTheProviders>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export { customRender as render };
export * from '@testing-library/react';