import { useContext } from 'react';
import { RecipesContext } from '../../RecipesContext';
import { RecipeFull } from '../../types/RecipeFull';
import { Card } from '../RecipeCard';
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { selectedRecipes } = useContext(RecipesContext);

  const getCombinedIngredients = () => {
    const ingredientsMap: Record<string, number> = {};

    selectedRecipes.forEach(recipe => {
      for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}` as keyof RecipeFull];
        const measure = recipe[`strMeasure${i}` as keyof RecipeFull];

        if (ingredient && ingredient.trim() !== '') {
          const key = `${ingredient} (${measure || ''})`;

          if (ingredientsMap[key]) {
            ingredientsMap[key] += 1;
          } else {
            ingredientsMap[key] = 1;
          }
        }
      }
    });

    return ingredientsMap;
  };

  const combinedIngredients = getCombinedIngredients();

  return (
    <div>
      <Link className="link" to={`/`}>
        Home
      </Link>

      {selectedRecipes.length === 0 ? (
        <p>No recipes selected.</p>
      ) : (
        <>
          <h2>Selected Recipes</h2>
          <div className="recipes">
            {selectedRecipes.map(recipe => (
              <>
                <Card key={recipe.idMeal} recipe={recipe} />
              </>
            ))}
          </div>
          <h2>All Ingredients</h2>
          <ul>
            {Object.entries(combinedIngredients).map(([ingredient, count]) => (
              <li key={ingredient}>
                {ingredient} {count > 1 && `x${count}`}
              </li>
            ))}
          </ul>

          <h2>All Instructions</h2>
          <ul>
            {selectedRecipes.map(recipe => (
              <li key={recipe.idMeal}>
                <h3>{recipe.strMeal}</h3>
                <p>{recipe.strInstructions}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
