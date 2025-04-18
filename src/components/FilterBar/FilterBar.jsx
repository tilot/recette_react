import { useState } from 'react';
import './FilterBar.css';

export function FilterBar({ recipes, filterType, onFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  

  // 🔍 Récupération unique des éléments selon le type de filtre
  const getAllValues = () => {
    const values = new Set();
    recipes.forEach((recipe) => {
      if (filterType === 'ingredients') {
        recipe.ingredients.forEach((ing) =>
          values.add(ing.ingredient.toLowerCase())
        );
      } else if (filterType === 'ustensils') {
        recipe.ustensils.forEach((ust) => values.add(ust.toLowerCase()));
      } else if (filterType === 'appliance') {
        values.add(recipe.appliance.toLowerCase());
      }
    });
    return Array.from(values);
  };

  const allValues = getAllValues();

  // 🎯 Filtrage uniquement si searchTerm ≥ 3
  const filteredValues =
    searchTerm.length >= 3
      ? allValues.filter((value) =>
          value.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allValues;

  return (
    <div className="filter-bar">
      <div className="filter-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{filterType}</span>
        <span className="caret">{isOpen ? '▴' : '▾'}</span>
      </div>

      {isOpen && (
        <div className="filter-content">
          <input
            type="text"
            placeholder={`Rechercher ${filterType}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul>
            {filteredValues.map((value, index) => (
              <li key={index} onClick={() => onFilter(value)}>
                {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
