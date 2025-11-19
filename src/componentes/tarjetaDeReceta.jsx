import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="card shadow-sm h-100">
      {recipe.strMealThumb && (
        <img
          src={recipe.strMealThumb}
          className="card-img-top"
          alt={`Imagen de ${recipe.strMeal}`}
        />
      )}

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{recipe.strMeal}</h5>
        <p><strong>Categoría:</strong> {recipe.strCategory}</p>

        <div className="mt-auto">
          <Link
            to={`/receta/${recipe.idMeal}`}
            className="btn btn-primary w-100"
          >
            Ver receta completa
          </Link>
        </div>
      </div>
    </div>
  );
}
