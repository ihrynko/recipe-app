import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategories } from '../../../api/categories';
import { Category } from '../../../types/pages';

const CATEGORY_LIST_FETCH_THUNK_TYPE = "CATEGORY_LIST_FETCH_THUNK_TYPE";

export const categoryListFetchStart = createAsyncThunk<
  { data: Category[] },
  never,
  { rejectValue: { error: string } }
>(CATEGORY_LIST_FETCH_THUNK_TYPE, async (_, { rejectWithValue }) => {
    try {
    const categoryList = await getAllCategories();
   return { data: categoryList };
  } catch (error) {
    return rejectWithValue({ error: error as string });
  }
});