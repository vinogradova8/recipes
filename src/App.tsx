import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { RecipesProvider } from './RecipesContext';

export const App: React.FC = () => {
  return (
    <RecipesProvider>
      <Outlet />
    </RecipesProvider>
  );
};
