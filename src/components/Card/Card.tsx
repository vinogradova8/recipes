// import React, { useContext, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { RecipesContext } from '../../RecipesContext';
// import { RecipeFull } from '../../types/RecipeFull';

// interface CardProps {
//   recipe: RecipeFull;
// }

// export const Card: React.FC<CardProps> = ({ recipe }) => {
//   const [isSelected, setIsSelected] = useState(false);
//   const { selectedRecipes, setSelectedRecipes } = useContext(RecipesContext);

//   const handleAddToCart = (
//     newSelectedRecipe: RecipeFull,
//     isRecipeSelected: boolean,
//   ) => {
//     if (!isRecipeSelected) {
//       setIsSelected(true);
//       setSelectedRecipes([...selectedRecipes, newSelectedRecipe]);

//       setIsSelected(true);
//     }
//   };

//   return (
//     <div className="card">
//       <h2 className="card__title">{recipe?.strMeal}</h2>
//       <Link to={`/recipe/${recipe?.idMeal}`}>
//         <img src={recipe?.strMealThumb} alt="Photo" />
//       </Link>
//       <p className="card__category">{recipe?.strCategory}</p>
//       <a
//         href={`${recipe?.strSource}`}
//         target="_blank"
//         className="card__source"
//         rel="noreferrer"
//       >
//         {recipe?.strSource}
//       </a>
//       <button type="button" onClick={() => handleAddToCart(recipe, isSelected)}>
//         Add to cart
//       </button>
//     </div>
//   );
// };

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../../RecipesContext';
import { RecipeFull } from '../../types/RecipeFull';

interface CardProps {
  recipe: RecipeFull;
}

export const Card: React.FC<CardProps> = ({ recipe }) => {
  const { selectedRecipes, setSelectedRecipes } = useContext(RecipesContext);

  // Проверяем, есть ли рецепт уже в корзине
  const isSelected = selectedRecipes.some(r => r.idMeal === recipe.idMeal);

  const handleAddToCart = () => {
    if (!isSelected) {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
  };

  return (
    <div className="card">
      <h2 className="card__title">{recipe.strMeal}</h2>
      <Link to={`/recipe/${recipe.idMeal}`}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      </Link>
      <p className="card__category">{recipe.strCategory}</p>
      {recipe.strSource && (
        <a
          href={recipe.strSource}
          target="_blank"
          className="card__source"
          rel="noreferrer"
        >
          {recipe.strSource}
        </a>
      )}
      <button type="button" onClick={handleAddToCart} disabled={isSelected}>
        {isSelected ? 'Added' : 'Add to cart'}
      </button>
    </div>
  );
};
