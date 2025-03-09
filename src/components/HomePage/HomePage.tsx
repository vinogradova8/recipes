import { useEffect, useState } from 'react';
import { Card } from '../Card';
import './HomePage.scss';

type RecipesFull = {
  idMeal: 'string';
  strMeal: 'string';
  strDrinkAlternate: null;
  strCategory: 'string';
  strArea: 'string';
  strInstructions: 'string';
  strMealThumb: 'string';
  strTags: null;
  strYoutube: 'string';
  strIngredient1: 'string';
  strIngredient2: 'string';
  strIngredient3: 'string';
  strIngredient4: 'string';
  strIngredient5: 'string';
  strIngredient6: 'string';
  strIngredient7: 'string';
  strIngredient8: 'string';
  strIngredient9: 'string';
  strIngredient10: 'string';
  strIngredient11: 'string';
  strIngredient12: 'string';
  strIngredient13: 'string';
  strIngredient14: 'string';
  strIngredient15: 'string';
  strIngredient16: 'string';
  strIngredient17: 'string';
  strIngredient18: 'string';
  strIngredient19: 'string';
  strIngredient20: 'string';
  strMeasure1: 'string';
  strMeasure2: 'string';
  strMeasure3: 'string';
  strMeasure4: 'string';
  strMeasure5: 'string';
  strMeasure6: 'string';
  strMeasure7: 'string';
  strMeasure8: 'string';
  strMeasure9: 'string';
  strMeasure10: 'string';
  strMeasure11: 'string';
  strMeasure12: 'string';
  strMeasure13: 'string';
  strMeasure14: 'string';
  strMeasure15: 'string';
  strMeasure16: 'string';
  strMeasure17: 'string';
  strMeasure18: 'string';
  strMeasure19: 'string';
  strMeasure20: 'string';
  strSource: 'string';
  strImageSource: null;
  strCreativeCommonsConfirmed: null;
  dateModified: null;
};

export const HomePage: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipesFull[]>();

  // useEffect(() => {
  //   fetch('www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
  //     .then(response => response.php())
  //     .then(setRecipes);
  // }, []);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then(response => response.json())
      .then(data => setRecipes(data.meals || []));
  }, []);

  return (
    <>
      <h1>Recipes</h1>
      <div className="recipes">
        {recipes &&
          recipes.map(recipe => (
            <Card
              key={recipe.idMeal}
              // id={recipe.idMeal}
              title={recipe.strMeal}
              image={recipe.strMealThumb}
              category={recipe.strCategory}
              source={recipe.strSource}
            />
          ))}
      </div>

      {/* {recipes.map(recipe => (
        <Card
          key={recipe.idMeal}
          // id={recipe.idMeal}
          title={recipe.strMeal}
          category={recipe.strCategory}
          source={recipe.strSource}
        />
      ))} */}
    </>
  );
};
