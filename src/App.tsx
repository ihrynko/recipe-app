import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Layout from "./components/Layout";

const HomePage = lazy(() => import("./pages/Home"));
const CategoryListPage = lazy(() => import("./pages/CategoryList"));
const RecipeListPage = lazy(() => import("./pages/RecipeList"));
const RecipeItemPage = lazy(() => import("./pages/RecipeItem"));
const Page404 = lazy(() => import("./pages/Page404"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<Layout />}>
          <Route path="categories" element={<CategoryListPage />} />
          <Route path="categories/:categoryId" element={<RecipeListPage />} />
          <Route path="recipes/:recipeId" element={<RecipeItemPage />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
      <ToastContainer limit={1} />
    </>
  );
}

export default App;
