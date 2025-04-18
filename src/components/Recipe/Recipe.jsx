import './Recipe.css';

export default function Recipe({ data }) {
  return (
    <div className="recipe-card">
      <h2>{data.name}</h2>
      <p>{data.servings} personnes</p>
      <ul>
        {data.ingredients.map((ing, idx) => (
          <li key={idx}>
            {ing.ingredient}
            {ing.quantity && ` - ${ing.quantity}`}
            {ing.unit && ` ${ing.unit}`}
          </li>
        ))}
      </ul>
      <p>Temps : {data.time} min</p>
      <p>{data.description}</p>
      <p>Appareil : {data.appliance}</p>
      <p>Ustensiles : {data.ustensils.join(', ')}</p>
    </div>
  );
}

