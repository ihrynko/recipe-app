import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories } from "../../../api/categories";
import { Category, Query } from "../../../types/pages";

const CATEGORY_LIST_FETCH_THUNK_TYPE = "CATEGORY_LIST_FETCH_THUNK_TYPE";

export const categoryListFetchStart = createAsyncThunk(
  CATEGORY_LIST_FETCH_THUNK_TYPE,
  async (params: string, { rejectWithValue }) => {
    try {
      const categoryList = await getAllCategories(params);
      return { data: categoryList };
    } catch (error) {
      return rejectWithValue({ error: error as string });
    }
  }
);
