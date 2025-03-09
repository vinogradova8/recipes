import { useEffect, useState } from 'react';
import { Card } from '../Card';
import './HomePage.scss';
import { RecipeFull } from '../../types/RecipeFull';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipeFull[]>();
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
  const itemsPerPage = 3;
  const delay = 1000;

  const fetchRecipes = (query: string) => {
    fetch(`${BASE_URL}/search.php?s=${query}`)
      .then(response => response.json())
      .then(data => setRecipes(data.meals || []));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchRecipes(searchQuery);
    }, delay);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    fetch(`${BASE_URL}/categories.php`)
      .then(response => response.json())
      .then(data =>
        setCategories(
          data.categories.map((c: { strCategory: string }) => c.strCategory),
        ),
      );
  }, []);

  const filteredRecipes =
    (selectedCategory === 'All'
      ? recipes
      : recipes?.filter(recipe => recipe.strCategory === selectedCategory)) ||
    [];

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
    <>
      <header className="header">
        <h1>Recipes</h1>
        <Link to={`/recipe/cart`}>Cart</Link>

        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
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
    </>
  );
};
