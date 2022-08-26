import { PayloadAction } from "@reduxjs/toolkit";
import { RecipeCreateState } from "../../../types/pages";

export const recipeCreateInProgressAction = (state: RecipeCreateState) => {
  state.loading = true;
  state.error = null;
};

export const recipeCreateSuccessAction = (state: RecipeCreateState) => {
  state.loading = false;
};

export const recipeCreateErrorAction = (
  state: RecipeCreateState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};
