import "../../assets/css/style.css"; // Importation du CSS global
import image from "../../assets/img/plat.jpg"; // Importation de l'image par défaut
export default function Recipe({ data }) {
  return (
    <div className="recipe-card">
      <img className="card-img-top" alt="" src={image} />
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

