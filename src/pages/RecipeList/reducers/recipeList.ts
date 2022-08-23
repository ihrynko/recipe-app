import { createSlice } from '@reduxjs/toolkit';
import { recipeListFetchStart } from '../thunks/recipeList';

import * as actions from '../actions/recipeList';
import {  RecipeListFetchState } from '../../../types/pages';


const initialState: RecipeListFetchState = {
  data: [],
  error: null,
  loading: true,
};

const RECIPE_LIST_FETCH_SLICE_NAME = 'RECIPE_LIST_FETCH_SLICE';

const recipeListSlice = createSlice({
  name: RECIPE_LIST_FETCH_SLICE_NAME,
  initialState,
  reducers: {
    recipeListResetData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        recipeListFetchStart.pending.type,
        actions.recipeListFetchInProgressAction
      )
      .addCase(
        recipeListFetchStart.fulfilled.type,
        actions.recipeListFetchSuccessAction
      )
      .addCase(
        recipeListFetchStart.rejected.type,
        actions.recipeListFetchErrorAction
      );
  },
});

export const { recipeListResetData } = recipeListSlice.actions;

export const recipeListReducer = recipeListSlice.reducer;