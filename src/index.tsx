import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { RecipeDetailsPage } from './components/RecipeDetailsPage';
import { Cart } from './components/Cart';
import { RecipesProvider } from './RecipesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RecipesProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route index element={<HomePage />}></Route>
          <Route path="/recipe/:itemId" element={<RecipeDetailsPage />} />
          <Route path="/recipe/cart" element={<Cart />} />
          <Route
            path="*"
            element={
              <h3 style={{ padding: 30 }} className="title">
                Page not found
              </h3>
            }
          ></Route>
        </Routes>
      </HashRouter>
    </RecipesProvider>
  </QueryClientProvider>,
);
