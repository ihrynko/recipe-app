import { PayloadAction } from '@reduxjs/toolkit';
import { Recipe, RecipeItemState } from '../../../types/pages';


export const recipeItemFetchInProgressAction = (state: RecipeItemState) => {
  state.loading = true;
  state.error = null;
};

export const recipeItemFetchSuccessAction = (
  state: RecipeItemState,
  action: PayloadAction<{ data: Recipe }>
) => {
  const { data } = action.payload;

  state.data = data;
  state.loading = false;
};

export const recipeItemFetchErrorAction = (
  state: RecipeItemState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};