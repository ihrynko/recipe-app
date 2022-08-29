import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRecipesBySearch } from "../../../api/recipes";
import { Recipe } from "../../../types/pages";

const RECIPE_LIST_SEARCH_FETCH_THUNK_TYPE =
  "RECIPE_LIST_SEARCH_FETCH_THUNK_TYPE";

export const recipeListBySearchFetchStart = createAsyncThunk<
  { data: Recipe[] },
  { query: string }
>(RECIPE_LIST_SEARCH_FETCH_THUNK_TYPE, async (data, { rejectWithValue }) => {
  try {
    const { query } = data;
    const recipeItem = await getRecipesBySearch(query);
    return { data: recipeItem } as any;
  } catch (error) {
    return rejectWithValue({ error });
  }
});
