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


function App() {
  return (
    < >

    <ToastContainer limit={1} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
           <Route path="categories" element={<CategoryListPage />} />
           <Route path="recipes/:categoryId" element={<RecipeListPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
          {/* <Route index element={<HomePage />} /> */}
          {/* <Route path="books/:bookId" element={<BookItemPage />} />
          <Route path="statistics" element={<StatisticsPage />} /> */}
          {/* <Route path="*" element={<HomePage />} /> */}
      </Routes>
    </>
  );
}

export default App;
