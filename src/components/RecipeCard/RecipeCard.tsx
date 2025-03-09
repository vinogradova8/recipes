import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipesContext } from '../../RecipesContext';
import { RecipeFull } from '../../types/RecipeFull';
import './RecipeCard.scss';

interface CardProps {
  recipe: RecipeFull;
}

export const Card: React.FC<CardProps> = ({ recipe }) => {
  const { selectedRecipes, setSelectedRecipes } = useContext(RecipesContext);

  const isSelected = selectedRecipes.some(r => r.idMeal === recipe.idMeal);

  const handleAddToCart = () => {
    setSelectedRecipes(prev => {
      if (prev.some(r => r.idMeal === recipe.idMeal)) {
        return prev.filter(r => r.idMeal !== recipe.idMeal);
      }

      return [...prev, recipe];
    });
  };

  const removeRecipe = (id: string) => {
    setSelectedRecipes(
      selectedRecipes.filter(currentrecipe => currentrecipe.idMeal !== id),
    );
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

      <div className="card__actions">
        <button type="button" onClick={handleAddToCart} disabled={isSelected}>
          {isSelected ? 'Added' : 'Add to cart'}
        </button>
        <button
          onClick={() => removeRecipe(recipe.idMeal)}
          disabled={!isSelected}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
