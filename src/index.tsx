import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { RecipeDetailsPage } from './components/RecipeDetailsPage';
import { Cart } from './components/Cart';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route index element={<HomePage />}></Route>
      <Route path="/recipe/:itemId" element={<RecipeDetailsPage />} />
      <Route path="/recipe/cart" element={<Cart />} />
      {/* <Route
        path="https://www.themealdb.com/api/json/v1/1/lookup.php?i=:itemId"
        element={<RecipeDetailsPage />}
      ></Route> */}
      {/* <Route
        path="*"
        element={
          <h3 style={{ padding: 30 }} className="title">
            Page not found
          </h3>
        }
      ></Route> */}
    </Routes>
  </HashRouter>,
);
