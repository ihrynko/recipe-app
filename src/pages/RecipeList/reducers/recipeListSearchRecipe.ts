import { createSlice } from "@reduxjs/toolkit";
import { recipeListBySearchFetchStart } from "../thunks/recipeListSearchRecipe";
import { RecipeSearchState } from "../../../types/pages";

import * as actions from "../actions/recipeListSearchRecipe";

const initialState: RecipeSearchState = {
  query: "",
  data: [],
  error: null,
  loading: true,
};

const RECIPE_LIST_SEARCH_FETCH_SLICE_NAME = "RECIPE_LIST_SEARCH_FETCH_SLICE";

const recipeListSearchSlice = createSlice({
  name: RECIPE_LIST_SEARCH_FETCH_SLICE_NAME,
  initialState,
  reducers: {
    recipeListSearchResetData: () => initialState,
    recipeListChangeValue: actions.recipeListChangeValueAction,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        recipeListBySearchFetchStart.pending.type,
        actions.recipeListBySearchFetchInProgressAction
      )
      .addCase(
        recipeListBySearchFetchStart.fulfilled.type,
        actions.recipeListBySerchFetchSuccessAction
      )
      .addCase(
        recipeListBySearchFetchStart.rejected.type,
        actions.recipeListBySearchFetchErrorAction
      );
  },
});

export const { recipeListSearchResetData, recipeListChangeValue } =
  recipeListSearchSlice.actions;

export const recipeListBySearch = recipeListSearchSlice.reducer;
