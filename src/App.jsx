import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./paginas/";
import RecipeDetail from "./paginas/RecetaDetallada";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/receta/:idMeal" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
