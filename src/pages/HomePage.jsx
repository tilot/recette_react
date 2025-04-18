import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { Link } from 'react-router-dom';
import recipes from "../assets/json/recipes";
import Recipe from "../components/Recipe/Recipe";
import { RecipePage } from "./RecipePage";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { FilterBar } from "../components/FilterBar/FilterBar";
import { ToggleBar } from "../components/ToggleBar/ToggleBar";
import "../assets/css/style.scss";
import Header from "../components/Header/Header";
import '../assets/css/RecipeGrid.css'; // Importation du CSS spécifique à la grille de recettes


function HomePage() {
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
      const ingredients = recipe.ingredients.map((ing) =>
        ing.ingredient.toLowerCase()
      );
      const ustensils = recipe.ustensils.map((ust) => ust.toLowerCase());
      const appliance = recipe.appliance.toLowerCase();
      return newFilters.every(
        (filter) =>
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
      const ingredients = recipe.ingredients.map((ing) =>
        ing.ingredient.toLowerCase()
      );
      const ustensils = recipe.ustensils.map((ust) => ust.toLowerCase());
      const appliance = recipe.appliance.toLowerCase();
      return newFilters.every(
        (filter) =>
          ingredients.includes(filter) ||
          ustensils.includes(filter) ||
          appliance === filter
      );
    });

    setFilteredRecipes(
      results.length > 0 || newFilters.length > 0 ? results : recipes
    );
  };

  return (
    <>
      <div>
        <Header />

        <main className="main-content">
          <SearchBar
            className="search position relative"
            onSearch={handleSearch}
          />
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
          <div className="recipe-grid">
            {filteredRecipes.map((r) => (
              <Link
                to={`/recette/${r.id}`}
                key={r.id}
                className="recipe-link"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Recipe data={r} />
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default HomePage;
