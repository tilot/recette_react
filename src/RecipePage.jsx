import { useParams } from 'react-router-dom';
import recipes from '../data/recipes';
import { Recipe } from './components/Recipe/Recipe';

export function RecipePage() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id.toString() === id);

  if (!recipe) {
    return <p>Recette non trouvée</p>;
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <h3>Ingrédients :</h3>
      <ul>
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>
            {ing.ingredient} {ing.quantity || ''} {ing.unit || ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipePage;
