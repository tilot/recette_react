import { Link } from 'react-router-dom';
import './Recipe.css';

export default function Recipe({ data }) {
  return (
    <Link to={`/recette/${data.id}`} className="recipe-link">
      <div className="recipe-card">
        <h2>{data.name}</h2>
        <p>{data.servings} personnes</p>

        <ul className="ingredients-list">
          {data.ingredients.map((ing, idx) => (
            <li key={idx}>
              {ing.ingredient}
              {ing.quantity && ` - ${ing.quantity}`}
              {ing.unit && ` ${ing.unit}`}
            </li>
          ))}
        </ul>

        <p className="time">⏱️ {data.time} min</p>
        <p className="description">{data.description}</p>
        <p><strong>Appareil :</strong> {data.appliance}</p>
        <p><strong>Ustensiles :</strong> {data.ustensils.join(', ')}</p>
      </div>
    </Link>
  );
}
