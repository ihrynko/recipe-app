import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { categoryListReducer } from "../pages/CategoryList/reducers/categoryList";
import { createCategoryReducer } from "../pages/CategoryList/reducers/categoryListCreateCategory";
import { deleteCategoryReducer } from "../pages/CategoryList/reducers/categoryListDeleteCategory";

import { recipeListReducer } from "../pages/RecipeList/reducers/recipeList";
import { createRecipeReducer } from "../pages/RecipeList/reducers/recipeListCreateRecipe";
import { deleteRecipeReducer } from "../pages/RecipeList/reducers/recipeListDeleteRecipe";
import {recipeListBySearch} from '../pages/RecipeList/reducers/recipeListSearchRecipe'

import { recipeItem } from "../pages/RecipeItem/reducers/recipeItem";

import { modal } from "./modal/reducers/modal";

const categoryList = combineReducers({
  categoryListReducer,
  createCategoryReducer,
  deleteCategoryReducer,
});

const recipeList = combineReducers({
  recipeListReducer,
  createRecipeReducer,
  deleteRecipeReducer,
  recipeListBySearch,
});

const rootReducer = combineReducers({
  categoryList,
  recipeList,
  recipeItem,
  modal,
});

const store = configureStore({
  reducer: rootReducer,
});

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const setupStore = (preloadedState: RootState | {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export default store;
