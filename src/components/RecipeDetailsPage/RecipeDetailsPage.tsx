import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RecipeFull } from '../../types/RecipeFull';

export const RecipeDetailsPage: React.FC = ({}) => {
  const { itemId } = useParams<{ itemId: string }>();
  const [recipe, setRecipe] = useState<RecipeFull | null>(null);

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
      <Link to={`/`}>Home</Link>
      <h2>{recipe?.strMeal}</h2>
      <p>
        <strong>Category:</strong> {recipe?.strCategory}
      </p>
      <p>
        <strong>Region:</strong> {recipe?.strArea}
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
      <h3>Cooking Instructions:</h3>
      <p>{recipe?.strInstructions}</p>
      {recipe?.strYoutube && (
        <p>
          <strong>Video Recipe:</strong>{' '}
          <a
            href={recipe?.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube
          </a>
        </p>
      )}
      {recipe?.strSource && (
        <p>
          <strong>Source:</strong>{' '}
          <a href={recipe?.strSource} target="_blank" rel="noopener noreferrer">
            View original recipe
          </a>
        </p>
      )}
    </div>
  );
};
