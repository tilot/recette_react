import { useState } from 'react';
// import './SearchBar.css'; // Importation du CSS séparé
import "../../assets/css/style.css"; // Importation du CSS global
export function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Appliquer le filtre uniquement si +3 caractères
    if (value.length >= 3) {
      onSearch(value);
    } else {
      onSearch(''); // reset → toutes les recettes
    }
  };

  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Rechercher une recette..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="search-img">
        <img src="/search.svg" alt="search" className="search-logo" />
      </button>
    </div>
  );
}