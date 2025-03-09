import React from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { RecipesProvider } from './RecipesContext';

// interface Props {
//   onClick: () => void;
//   children: React.ReactNode;
// }

// export const Provider: React.FC<Props> = React.memo(({ onClick, children }) => (
//   <button type="button" onClick={onClick}>
//     {children}
//   </button>
// ));

export const App: React.FC = () => {
  return (
    <RecipesProvider>
      <Outlet />
    </RecipesProvider>
  );
};
