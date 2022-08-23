import { PayloadAction } from '@reduxjs/toolkit';
import { RecipeDeleteState, Recipe } from '../../../types/pages';

export const recipeDeleteItemDataSetAction = (
  state: RecipeDeleteState,
  action: PayloadAction<{ data: Recipe }>
) => {
  const { data } = action.payload;
  state.data = data;
};
export const recipeDeleteInProgressAction = (state: RecipeDeleteState) => {
  state.loading = true;
  state.error = null;
};
export const recipeDeleteSuccessAction = (state: RecipeDeleteState) => {
  state.loading = false;
};

export const recipeDeleteErrorAction = (state: RecipeDeleteState, action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
}


