import { PayloadAction } from "@reduxjs/toolkit";
import { Recipe, RecipeSearchState } from "../../../types/pages";

export const recipeListChangeValueAction = (
  state: RecipeSearchState,
  action: PayloadAction<{ query: string }>
) => {
  const { query } = action.payload;

  state.loading = false;
  state.query = query;
};

export const recipeListBySearchFetchInProgressAction = (
  state: RecipeSearchState
) => {
  state.loading = true;
  state.error = null;
};

export const recipeListBySerchFetchSuccessAction = (
  state: RecipeSearchState,
  action: PayloadAction<{ data: Recipe[] }>
) => {
  const { data } = action.payload;
  state.data = data;
  state.loading = false;
};

export const recipeListBySearchFetchErrorAction = (
  state: RecipeSearchState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};
