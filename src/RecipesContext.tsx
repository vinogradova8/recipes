import React, { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { RecipeFull } from './types/RecipeFull';

type RecipesContextType = {
  selectedRecipes: RecipeFull[];
  setSelectedRecipes: React.Dispatch<React.SetStateAction<RecipeFull[]>>;
};

export const RecipesContext = React.createContext<RecipesContextType>({
  selectedRecipes: [],
  setSelectedRecipes: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const RecipesProvider: React.FC<Props> = ({ children }) => {
  const [selectedRecipes, setSelectedRecipes] = useLocalStorage<RecipeFull[]>(
    'selectedRecipes',
    [],
  );

  const value = useMemo(
    () => ({
      selectedRecipes,
      setSelectedRecipes,
    }),
    [selectedRecipes, setSelectedRecipes],
  );

  return (
    <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
  );
};
