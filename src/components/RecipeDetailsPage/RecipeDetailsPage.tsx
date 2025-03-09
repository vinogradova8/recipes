import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RecipeFull } from '../../types/RecipeFull';
import { RecipesContext } from '../../RecipesContext';
import './RecipeDetailsPage.scss';

export const RecipeDetailsPage: React.FC = ({}) => {
  const { itemId } = useParams<{ itemId: string }>();
  const [recipe, setRecipe] = useState<RecipeFull>();

  const { selectedRecipes, setSelectedRecipes } = useContext(RecipesContext);

  const isSelected = selectedRecipes.some(r => r.idMeal === recipe?.idMeal);

  const handleAddToCart = () => {
    if (!recipe) {
      return;
    }

    setSelectedRecipes(prev => {
      if (prev.some(r => r.idMeal === recipe?.idMeal)) {
        return prev.filter(r => r.idMeal !== recipe?.idMeal);
      }

      return [...prev, recipe];
    });
  };

  const removeRecipe = (id: string) => {
    setSelectedRecipes(
      selectedRecipes.filter(currentrecipe => currentrecipe.idMeal !== id),
    );
  };

  useEffect(() => {
    const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

    fetch(`${BASE_URL}/lookup.php?i=${itemId}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          setRecipe(data.meals[0]);
        }
      });
  }, [itemId]);

  const ingredients: { ingredient: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe?.[`strIngredient${i}`] || '';
    const measure = recipe?.[`strMeasure${i}`] || '';

    if (ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="recipe-details">
      <Link className="link" to={`/`}>
        Home
      </Link>
      <h2>{recipe?.strMeal}</h2>
      <p>
        <span>Category:</span> {recipe?.strCategory}
      </p>
      <p>
        <span>Region:</span> {recipe?.strArea}
      </p>
      <img src={recipe?.strMealThumb} alt={recipe?.strMeal} />
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>
            {item.ingredient} - {item.measure}
          </li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe?.strInstructions}</p>
      {recipe?.strYoutube && (
        <p>
          <span>Video Recipe:</span>
          <a href={recipe?.strYoutube} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
        </p>
      )}
      {recipe?.strSource && (
        <p>
          <span>Source:</span>
          <a href={recipe?.strSource} target="_blank" rel="noreferrer">
            View original recipe
          </a>
        </p>
      )}

      <div className="card__actions">
        <button type="button" onClick={handleAddToCart} disabled={isSelected}>
          {isSelected ? 'Added' : 'Add to cart'}
        </button>
        <button
          onClick={() => removeRecipe(recipe?.idMeal || '')}
          disabled={!isSelected}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
