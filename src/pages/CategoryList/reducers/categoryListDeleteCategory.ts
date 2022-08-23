import { createSlice } from '@reduxjs/toolkit';
import { CategoryDeleteState } from '../../../types/pages';

import * as actions from '../actions/categoryListDeleteCategory';

const initialState: CategoryDeleteState = {
  data: {},
  error: null,
  loading: false,
};

const CATEGORY_LIST_DELETE_CATEGORY_SLICE = 'CATEGORY_LIST_DELETE_CATEGORY_SLICE';

const categoryListDeleteCategorySlice = createSlice({
  name: CATEGORY_LIST_DELETE_CATEGORY_SLICE,
  initialState,
  reducers: {
    categoryDeleteItemDataSet: actions.categoryDeleteItemDataSetAction,
    categoryDeleteInProgress: actions.categoryDeleteInProgressAction,
    categoryDeleteSuccess: actions.categoryDeleteSuccessAction,
    categoryDeleteError: actions.categoryDeleteErrorAction,
    categoryResetDeleteCategoryData: () => initialState,
  },
});

export const deleteActions = categoryListDeleteCategorySlice.actions;

export const deleteCategoryReducer = categoryListDeleteCategorySlice.reducer;