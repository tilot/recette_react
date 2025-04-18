import { useState } from 'react';
import recipes from './assets/json/recipes';
import { FilterBar } from './components/FilterBar/FilterBar';
import { SearchBar } from './components/SearchBar';
import { ToggleBar } from './components/ToggleBar/ToggleBar';
import { Recipe } from './components/Recipe/Recipe';
import './App.css';
import './assets/css/style.css';

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

  const handleFilter = (value) => {
    const lowerValue = value.toLowerCase();

    if (!activeFilters.includes(lowerValue)) {
      const newFilters = [...activeFilters, lowerValue];
      setActiveFilters(newFilters);
      applyFilters(newFilters);
    }
  };

  const handleRemoveFilter = (value) => {
    const newFilters = activeFilters.filter((f) => f !== value);
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    if (filters.length === 0) {
      setFilteredRecipes(recipes);
      return;
    }

    const filtered = recipes.filter((recipe) =>
      filters.every((filter) =>
        recipe.ingredients.some((ing) =>
          ing.ingredient.toLowerCase().includes(filter)
        ) ||
        recipe.ustensils.some((ust) => ust.toLowerCase().includes(filter)) ||
        recipe.appliance.toLowerCase().includes(filter)
      )
    );

    setFilteredRecipes(filtered);
  };

  return (
    <div>
      <h1>Les Grands Plats</h1>

      <SearchBar onSearch={handleSearch} />

      <FilterBar
        recipes={recipes}
        filterType="ingredients"
        onFilter={handleFilter}
      />
      <FilterBar
        recipes={recipes}
        filterType="ustensils"
        onFilter={handleFilter}
      /><FilterBar
      recipes={recipes}
      filterType="appliance"
      onFilter={handleFilter}
    />

      <ToggleBar
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter} // ✅ ici c’est bien défini
      />

      <h2>Recettes</h2>
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
