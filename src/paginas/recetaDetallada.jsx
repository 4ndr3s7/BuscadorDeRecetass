import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RecipeDetail() {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoadRecipe = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const data = await response.json();
      const receta = data.meals ? data.meals[0] : null;
      
      if (!receta) {
        setError("No se encontró la receta.");
      } else {
        setRecipe(receta);
        setError("");
      }
    } catch {
      setError("Error al cargar la receta.");
    } finally {
      setLoading(false);
    }
  };

  const renderIngredients = () => {
    return Array.from({ length: 20 })
      .map((_, i) => {
        const ing = recipe[`strIngredient${i + 1}`];
        const measure = recipe[`strMeasure${i + 1}`];
        return ing && ing.trim()
          ? `${ing} — ${measure}`
          : null;
      })
      .filter(Boolean)
      .map((item, index) => <li key={index}>{item}</li>);
  };

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">
        ← Volver a la búsqueda
      </Link>

      <h2 className="text-center mb-4">Receta Completa</h2>

      {!recipe && !loading && (
        <div className="text-center my-5">
          <p className="mb-4">Haz clic en el botón para cargar los detalles de la receta.</p>
          <button
            onClick={handleLoadRecipe}
            className="btn btn-primary btn-lg"
          >
            Cargar Receta
          </button>
        </div>
      )}

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center">
          {error} (ID: {idMeal})
          {!recipe && (
            <div className="mt-3">
              <button
                onClick={handleLoadRecipe}
                className="btn btn-primary"
              >
                Intentar de nuevo
              </button>
            </div>
          )}
        </div>
      )}

      {!loading && !error && recipe && (
        <div className="card shadow animate__animated animate__fadeIn">
          {recipe.strMealThumb && (
            <img
              src={recipe.strMealThumb}
              className="card-img-top"
              alt={`Imagen de ${recipe.strMeal}`}
            />
          )}
          <div className="card-body">
            <h3 className="card-title">{recipe.strMeal}</h3>
            <p><strong>Categoría:</strong> {recipe.strCategory}</p>
            <p><strong>Origen:</strong> {recipe.strArea}</p>

            <h4>Instrucciones</h4>
            <p style={{ whiteSpace: "pre-line" }}>{recipe.strInstructions}</p>

            <h4>Ingredientes</h4>
            <ul>{renderIngredients()}</ul>

            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                className="btn btn-danger mt-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver video en YouTube
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
