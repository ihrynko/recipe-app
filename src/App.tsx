import React from 'react';
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Layout from './components/Layout'

const HomePage = lazy(() => import("./pages/Home"));
const CategoryListPage = lazy(() => import("./pages/CategoryList"));
const RecipeListPage = lazy(() => import("./pages/RecipeList"));
const RecipeItemPage = lazy(() => import("./pages/RecipeItem"));


function App() {
  return (
    < >

    <ToastContainer limit={1} />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/" element={<Layout />}>
           <Route path="categories" element={<CategoryListPage />} />
          <Route path="categories/:categoryId" element={<RecipeListPage />} />
           <Route path="recipes/:recipeId" element={<RecipeItemPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
