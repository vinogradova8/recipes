import { useContext } from 'react';
import { RecipesContext } from '../../RecipesContext';
import { Card } from '../Card';

export const Cart: React.FC = () => {
  const { selectedRecipes } = useContext(RecipesContext);

  return (
    <>
      <div>Cart</div>
      <div className="recipes">
        {selectedRecipes.length === 0 ? (
          <p>No recipes in cart</p>
        ) : (
          selectedRecipes.map(recipe => (
            <Card key={recipe.idMeal} recipe={recipe} />
          ))
        )}
      </div>
    </>
  );
};
