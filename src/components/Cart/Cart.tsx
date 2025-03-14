import { useContext } from 'react';
import { RecipesContext } from '../../RecipesContext';
import { Card } from '../RecipeCard';
import { Link } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { selectedRecipes } = useContext(RecipesContext);

  const getIngredients = () => {
    const ingredientsArray: [string, string][] = [];

    selectedRecipes.forEach(recipe => {
      const entries = Object.entries(recipe);

      const entriesIngredients = entries
        .filter(
          entry =>
            entry[0].includes('strIngredient') && entry[1]?.trim() !== '',
        )
        .map(entry => entry[1]);

      const entriesMeasures = entries
        .filter(
          entry => entry[0].includes('strMeasure') && entry[1]?.trim() !== '',
        )
        .map(entry => entry[1]);

      for (let i = 0; i < entriesIngredients.length; i++) {
        const ingredientName = entriesIngredients[i] || '';
        const measure = entriesMeasures[i] || '';

        const index = ingredientsArray.findIndex(
          item => item[0] === ingredientName,
        );

        if (index !== -1) {
          ingredientsArray[index][1] += `, ${measure}`;
        } else {
          ingredientsArray.push([ingredientName, measure]);
        }
      }
    });

    return ingredientsArray;
  };

  const combinedIngredients = getIngredients();

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
            {combinedIngredients.map(item => (
              <li key={item[0]}>
                {item[0]} {`(${item[1]})`}
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
