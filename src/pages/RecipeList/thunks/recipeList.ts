import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllRecipesInCategory } from "../../../api/categories";
import { Recipe } from "../../../types/pages";

const RECIPE_LIST_FETCH_THUNK_TYPE = "RECIPE_LIST_FETCH_THUNK_TYPE";

export const recipeListFetchStart = createAsyncThunk<
  { data: Recipe[] },
  { categoryId: string }
>(RECIPE_LIST_FETCH_THUNK_TYPE, async (data, { rejectWithValue }) => {
  try {
    const { categoryId } = data;
    const recipeList = await getAllRecipesInCategory(categoryId);
    return { data: recipeList };
  } catch (error) {
    return rejectWithValue({ error });
  }
});
