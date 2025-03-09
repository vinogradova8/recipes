import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route index element={<HomePage />}></Route>
      <Route
        path="*"
        element={
          <h3 style={{ padding: 30 }} className="title">
            Page not found
          </h3>
        }
      ></Route>
    </Routes>
  </HashRouter>,
);
