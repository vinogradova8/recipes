import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RecipeFull } from '../../types/RecipeFull';

// type RecipeFull = {
//   idMeal: string;
//   strMeal: string;
//   strDrinkAlternate: null;
//   strCategory: string;
//   strArea: string;
//   strInstructions: string;
//   strMealThumb: string;
//   strTags: null;
//   strYoutube: string;
//   strIngredient1: string;
//   strIngredient2: string;
//   strIngredient3: string;
//   strIngredient4: string;
//   strIngredient5: string;
//   strIngredient6: string;
//   strIngredient7: string;
//   strIngredient8: string;
//   strIngredient9: string;
//   strIngredient10: string;
//   strIngredient11: string;
//   strIngredient12: string;
//   strIngredient13: string;
//   strIngredient14: string;
//   strIngredient15: string;
//   strIngredient16: string;
//   strIngredient17: string;
//   strIngredient18: string;
//   strIngredient19: string;
//   strIngredient20: string;
//   strMeasure1: string;
//   strMeasure2: string;
//   strMeasure3: string;
//   strMeasure4: string;
//   strMeasure5: string;
//   strMeasure6: string;
//   strMeasure7: string;
//   strMeasure8: string;
//   strMeasure9: string;
//   strMeasure10: string;
//   strMeasure11: string;
//   strMeasure12: string;
//   strMeasure13: string;
//   strMeasure14: string;
//   strMeasure15: string;
//   strMeasure16: string;
//   strMeasure17: string;
//   strMeasure18: string;
//   strMeasure19: string;
//   strMeasure20: string;
//   strSource: string;
//   strImageSource: null;
//   strCreativeCommonsConfirmed: null;
//   dateModified: null;
// };

// type RecipeFull = {
//   idMeal: string;
//   strMeal: string;
//   strDrinkAlternate: string | null;
//   strCategory: string;
//   strArea: string;
//   strInstructions: string;
//   strMealThumb: string;
//   strTags: string | null;
//   strYoutube: string;
//   strSource: string | null;
//   strImageSource: string | null;
//   strCreativeCommonsConfirmed: string | null;
//   dateModified: string | null;
// } & {
//   [key in `strIngredient${number}` | `strMeasure${number}`]: string | null;
// };

// type RecipeFull = {
//   idMeal: string;
//   strMeal: string;
//   strDrinkAlternate: string | null;
//   strCategory: string;
//   strArea: string;
//   strInstructions: string;
//   strMealThumb: string;
//   strTags: string | null;
//   strYoutube: string;
//   strSource: string | null;
//   strImageSource: string | null;
//   strCreativeCommonsConfirmed: string | null;
//   dateModified: string | null;
// } & {
//   [key: string]: string | null;
// };

export const RecipeDetailsPage: React.FC = ({}) => {
  const { itemId } = useParams<{ itemId: string }>();
  const [recipe, setRecipe] = useState<RecipeFull | null>(null);

  useEffect(() => {
    const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

    fetch(`${BASE_URL}/lookup.php?i=${itemId}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          setRecipe(data.meals[0]); // Берем первый (и единственный) рецепт
        }
      });
  }, [itemId]);

  // useEffect(() => {
  //   const b = 'https://www.themealdb.com/api/json/v1/1';

  //   fetch(`${b}/lookup.php?i=${itemId}`)
  //     .then(response => response.json())
  //     .then(data => setRecipe(data.meals || []));
  // }, [itemId]);

  // const { strMeal, strCategory } = recipe;

  // return (
  //   <div className="card">
  //     <h2 className="card__title">{recipe?.strMeal}</h2>
  //     <p className="card__category">{recipe?.strCategory}</p>
  //   </div>
  // );

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
