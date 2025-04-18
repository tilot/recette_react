import recipes from './assets/json/recipes'; 
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Les Recettes</h1>
      <ul>
        {recipes.map((recette) => (
          <li key={recette.id}>
            <Link to={`/recette/${recette.id}`}>{recette.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
