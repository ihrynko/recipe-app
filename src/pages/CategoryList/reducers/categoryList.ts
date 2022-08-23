import { createSlice } from '@reduxjs/toolkit';
import { categoryListFetchStart } from '../thunks/categoryList';
import * as actions from '../actions/categoryList';
import { CategoryListFetchState } from '../../../types/pages';

const initialState: CategoryListFetchState = {
  data: [],
  error: null,
  loading: true,
};

const CATEGORY_LIST_FETCH_SLICE_NAME = 'CATEGORY_LIST_FETCH_SLICE';

const categoryListSlice = createSlice({
  name: CATEGORY_LIST_FETCH_SLICE_NAME,
  initialState,
  reducers: {
    categoryListResetData: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        categoryListFetchStart.pending.type,
        actions.categoryListFetchInProgressAction
      )
      .addCase(
        categoryListFetchStart.fulfilled.type,
        actions.categoryListFetchSuccessAction
      )
      .addCase(
        categoryListFetchStart.rejected.type,
        actions.categoryListFetchErrorAction
      );
  },
});

export const { categoryListResetData } = categoryListSlice.actions;

export const categoryListReducer = categoryListSlice.reducer;