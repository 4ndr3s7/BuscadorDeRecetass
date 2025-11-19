import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RecipeDetail() {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const data = await res.json();
        if (!data.meals) {
          setError("No se encontró la receta.");
        } else {
          setRecipe(data.meals[0]);
        }
      } catch {
        setError("Error al cargar la receta.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [idMeal]);

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
