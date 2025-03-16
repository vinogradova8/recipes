import { useEffect, useMemo, useState } from 'react';
import { Card } from '../RecipeCard';
import './HomePage.scss';
import { RecipeFull } from '../../types/RecipeFull';
import { Link, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

export const HomePage: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeFull[]>();
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || 'All';

  const [appliedQuery, setAppliedQuery] = useState(query);

  const applyQuery = useMemo(() => debounce(setAppliedQuery, 1000), []);

  const handleSetQuerySearchParameter = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', `${event?.target.value}`);

    applyQuery(event?.target.value);

    if (event.target.value === '') {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleSetCategorySearchParameter = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set('category', event.target.value);

    if (event.target.value === 'All') {
      params.delete('category');
    }

    setSearchParams(params);
  };

  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
  const itemsPerPage = 3;

  async function fetchRecipes(searchQuery: string) {
    const response = await fetch(`${BASE_URL}/search.php?s=${searchQuery}`);
    const data = await response.json();

    setRecipes(data.meals || []);
  }

  useEffect(() => {
    applyQuery(query);

    fetchRecipes(appliedQuery);
  }, [appliedQuery, applyQuery, query]);

  async function getCategories() {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();

    setCategories(
      data.categories.map((c: { strCategory: string }) => c.strCategory),
    );
  }

  useEffect(() => {
    getCategories();
  }, []);

  const filteredRecipes =
    (category === 'All'
      ? recipes
      : recipes?.filter(recipe => recipe.strCategory === category)) || [];

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const getPagination = (): (number | string)[] => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const groupPagesSize = 7;
    const startPage =
      Math.floor((currentPage - 1) / groupPagesSize) * groupPagesSize + 1;
    const endPage = Math.min(startPage + groupPagesSize - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
      pages.push(totalPages);
    } else if (endPage < totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="page">
      <header className="header">
        <h1>Recipes</h1>
        <Link className="link" to={`/recipe/cart`}>
          Cart
        </Link>

        <input
          className="input"
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={handleSetQuerySearchParameter}
        />

        <select
          className="select"
          value={category}
          onChange={handleSetCategorySearchParameter}
        >
          <option value="All">All</option>
          {categories.map(currentCategory => (
            <option key={currentCategory} value={currentCategory}>
              {currentCategory}
            </option>
          ))}
        </select>
      </header>

      <div className="recipes">
        {paginatedRecipes?.length !== 0 ? (
          paginatedRecipes?.map(recipe => (
            <Card key={recipe.idMeal} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>

          {getPagination().map((page, index) => (
            <span key={index}>
              {typeof page === 'number' ? (
                <button
                  onClick={() => goToPage(page)}
                  disabled={currentPage === page}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              ) : (
                <span> ... </span>
              )}
            </span>
          ))}

          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};
