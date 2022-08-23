import { createSlice } from '@reduxjs/toolkit';
import { recipeItemFetchStart } from '../thunks/recipeItem';
import { RecipeItemState } from '../../../types/pages';

import * as actions from '../actions/recipeItem';


const initialState: RecipeItemState = {
  data: {},
  error: null,
  loading: true,
};

const RECIPE_ITEM_FETCH_SLICE_NAME = 'RECIPE_ITEM_FETCH_SLICE_NAME';

const recipeItemSlice = createSlice({
  name: RECIPE_ITEM_FETCH_SLICE_NAME,
  initialState,
  reducers: {
    recipeItemResetData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        recipeItemFetchStart.pending.type,
        actions.recipeItemFetchInProgressAction
      )
      .addCase(
        recipeItemFetchStart.fulfilled.type,
        actions.recipeItemFetchSuccessAction
      )
      .addCase(
        recipeItemFetchStart.rejected.type,
        actions.recipeItemFetchErrorAction
      );
  },
});

export const { recipeItemResetData } = recipeItemSlice.actions;

export const recipeItemReducer =  recipeItemSlice.reducer;