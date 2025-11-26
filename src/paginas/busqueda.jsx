import { useState } from "react";
import RecipeCard from "../componentes/tarjetaDeReceta";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setError("Por favor, ingresa un término de búsqueda");
      return;
    }

    setLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      const resultados = data.meals || [];
      
      if (resultados.length === 0) {
        setError(`No se encontraron recetas con el término "${searchTerm}"`);
        setRecipes([]);
      } else {
        setRecipes(resultados);
        setError("");
      }
    } catch (err) {
      setError("Error al realizar la búsqueda. Por favor, intenta nuevamente.");
      setRecipes([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setHasSearched(false);
    setError("");
    setRecipes([]);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Buscador de Recetas</h1>
          
          {/* Formulario de búsqueda */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="row g-2">
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Busca recetas por nombre (ej: Chicken, Pasta, Cake)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    "Buscar"
                  )}
                </button>
              </div>
            </div>
            {hasSearched && (
              <div className="mt-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleClearSearch}
                >
                  Limpiar búsqueda
                </button>
              </div>
            )}
          </form>

          {/* Mensaje de error */}
          {error && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError("")}
                aria-label="Close"
              ></button>
            </div>
          )}

          {/* Indicador de carga */}
          {loading && (
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          )}

          {/* Título de sección */}
          {!loading && !error && hasSearched && (
            <div className="mb-3">
              <h2 className="h4">
                Resultados de búsqueda ({recipes.length})
              </h2>
            </div>
          )}

          {/* Grid de recetas */}
          {!loading && recipes.length > 0 && (
            <div className="row g-4">
              {recipes.map((recipe) => (
                <div key={recipe.idMeal} className="col-md-4 col-lg-3">
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          )}

          {/* Mensaje cuando no hay resultados */}
          {!loading && !error && recipes.length === 0 && hasSearched && (
            <div className="alert alert-info text-center">
              <p className="mb-0">No se encontraron recetas. Intenta con otro término de búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

