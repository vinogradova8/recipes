import { Card } from '../RecipeCard';
import './HomePage.scss';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../hooks/useRecipes';
import { usePagination } from '../../hooks/usePagination';

export const HomePage: React.FC = () => {
  const {
    filteredRecipes,
    categories,
    searchValue,
    setSearchValue,
    category,
    searchParams,
    setSearchParams,
  } = useRecipes();

  const {
    paginatedRecipes,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    getPagination,
  } = usePagination(filteredRecipes);
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   const params = new URLSearchParams(searchParams);

  //   params.set('query', `${event?.target.value}`);

  //   applyQuery(event?.target.value);

  //   // if (event.target.value === '') {
  //   //   params.delete('query');
  //   // }

  //   if (debouncedQuery) {
  //     params.set('query', debouncedQuery);
  //   } else {
  //     params.delete('query');
  //   }

  //   setSearchParams(params);
  // };

  // Функция для обновления searchValue при вводе

  const handleSetQuerySearchParameter = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(event.target.value);
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
          value={searchValue}
          onChange={handleSetQuerySearchParameter}
        />

        <select
          className="select"
          value={category}
          onChange={handleSetCategorySearchParameter}
        >
          <option value="All">All</option>
          {categories.map((currentCategory: string) => (
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
