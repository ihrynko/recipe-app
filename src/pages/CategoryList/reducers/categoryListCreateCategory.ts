import { createSlice } from '@reduxjs/toolkit';
import { CategoryCreateState } from '../../../types/pages';

import * as actions from '../actions/categoryListCreateCategory';

const initialState: CategoryCreateState = {
  data: {},
  error: null,
  loading: false,
};

const CATEGORY_LIST_CREATE_CATEGORY_SLICE = 'CATEGORY_LIST_CREATE_CATEGORY_SLICE';

const categoryListCreateCategorySlice = createSlice({
  name: CATEGORY_LIST_CREATE_CATEGORY_SLICE,
  initialState,
  reducers: {
    categoryCreateInProgress: actions.categoryCreateInProgressAction,
    categoryCreateSuccess: actions.categoryCreateSuccessAction,
    categoryCreateError: actions.categoryCreateErrorAction,
  },
});

export const createActions = categoryListCreateCategorySlice.actions;

export const createCategoryReducer = categoryListCreateCategorySlice.reducer;