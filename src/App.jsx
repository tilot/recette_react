import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import recipes from './assets/json/recipes';
import { Recipe } from './components/Recipe/Recipe';
import { RecipePage } from './pages/RecipePage';
import { SearchBar } from './components/SearchBar';
import { FilterBar } from './components/FilterBar/FilterBar';
import { ToggleBar } from './components/ToggleBar/ToggleBar';

function App() {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [activeFilters, setActiveFilters] = useState([]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.length >= 3) {
      const results = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(results);
    } else {
      setFilteredRecipes(recipes);
    }
  };

  const handleFilter = (filterValue) => {
    const newFilters = [...activeFilters, filterValue];
    setActiveFilters(newFilters);

    const results = recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map((ing) => ing.ingredient.toLowerCase());
      const ustensils = recipe.ustensils.map((ust) => ust.toLowerCase());
      const appliance = recipe.appliance.toLowerCase();
      return newFilters.every((filter) =>
        ingredients.includes(filter) ||
        ustensils.includes(filter) ||
        appliance === filter
      );
    });

    setFilteredRecipes(results);
  };

  const handleRemoveFilter = (filterValue) => {
    const newFilters = activeFilters.filter((f) => f !== filterValue);
    setActiveFilters(newFilters);

    const results = recipes.filter((recipe) => {
      const ingredients = recipe.ingredients.map((ing) => ing.ingredient.toLowerCase());
      const ustensils = recipe.ustensils.map((ust) => ust.toLowerCase());
      const appliance = recipe.appliance.toLowerCase();
      return newFilters.every((filter) =>
        ingredients.includes(filter) ||
        ustensils.includes(filter) ||
        appliance === filter
      );
    });

    setFilteredRecipes(results.length > 0 || newFilters.length > 0 ? results : recipes);
  };

  const slugify = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-');

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <SearchBar onSearch={handleSearch} />
              <div className="filters">
                <FilterBar
                  recipes={recipes}
                  filterType="ingredients"
                  onFilter={handleFilter}
                />
                <FilterBar
                  recipes={recipes}
                  filterType="ustensils"
                  onFilter={handleFilter}
                />
                <FilterBar
                  recipes={recipes}
                  filterType="appliance"
                  onFilter={handleFilter}
                />
              </div>
              <ToggleBar
                activeFilters={activeFilters}
                onRemoveFilter={handleRemoveFilter}
              />
              <div className="recipe-list">
                {filteredRecipes.map((r) => (
                  <Link
                    key={r.id}
                    to={`/recipe/${r.id}/${slugify(r.name)}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Recipe data={r} />
                  </Link>
                ))}
              </div>
            </div>
          }
        />
        <Route path="/recipe/:id/:name" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}

export default App;
