import { useParams } from 'react-router-dom';
import recipes from '../assets/json/recipes';
import { Recipe } from '../components/Recipe/Recipe';

export function RecipePage() {
   const { id } = useParams(); // 🆔 récupère l'ID dans l'URL
   const recipe = recipes.find((r) => r.id === parseInt(id));
 
   if (!recipe) {
     return <p>Recette non trouvée.</p>;
   }
 
   return (
     <div>
       <h1>Détail de la recette</h1>
       <Recipe data={recipe} />
     </div>
   );
 }
