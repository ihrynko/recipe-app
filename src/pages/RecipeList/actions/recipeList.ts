import { PayloadAction } from '@reduxjs/toolkit';
import { Recipe, RecipeListFetchState } from '../../../types/pages';

export const recipeListFetchInProgressAction = (state: RecipeListFetchState) => {
  state.loading = true;
  state.error = null;
};

export const recipeListFetchSuccessAction = (
  state: RecipeListFetchState,
  action: PayloadAction<{ data: Recipe[] }>
) => {
  const { data } = action.payload;
  state.data = data;
  state.loading = false;
};

export const recipeListFetchErrorAction = (
  state: RecipeListFetchState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};