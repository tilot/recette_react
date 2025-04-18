import { useState } from 'react';

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
    <input
      type="text"
      placeholder="Rechercher une recette..."
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}
