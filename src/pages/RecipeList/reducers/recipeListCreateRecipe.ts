import { createSlice } from "@reduxjs/toolkit";
import { RecipeCreateState } from "../../../types/pages";

import * as actions from "../actions/recipeListCreateRecipe";

const initialState: RecipeCreateState = {
  data: {},
  error: null,
  loading: false,
};

const RECIPE_LIST_CREATE_RECIPE_SLICE = "RECIPE_LIST_CREATE_RECIPE_SLICE";

const recipeListCreateRecipeSlice = createSlice({
  name: RECIPE_LIST_CREATE_RECIPE_SLICE,
  initialState,
  reducers: {
    recipeCreateInProgress: actions.recipeCreateInProgressAction,
    recipeCreateSuccess: actions.recipeCreateSuccessAction,
    recipeCreateError: actions.recipeCreateErrorAction,
  },
});

export const createActions = recipeListCreateRecipeSlice.actions;

export const createRecipeReducer = recipeListCreateRecipeSlice.reducer;
