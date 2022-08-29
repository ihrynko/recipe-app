import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories } from "../../../api/categories";
import { Category, Query } from "../../../types/pages";

const CATEGORY_LIST_FETCH_THUNK_TYPE = "CATEGORY_LIST_FETCH_THUNK_TYPE";

export const categoryListFetchStart = createAsyncThunk<
  { data: Category[] },
  never,
  { rejectValue: { error: string } }
>(
  CATEGORY_LIST_FETCH_THUNK_TYPE,
  async (params: Partial<Query>, { rejectWithValue }) => {
    try {
      const categoryList = await getAllCategories(params);
      return { data: categoryList };
    } catch (error) {
      return rejectWithValue({ error: error as string });
    }
  }
);
