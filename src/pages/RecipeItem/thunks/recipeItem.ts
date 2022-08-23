import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecipeById } from '../../../api/recipes';
import { Recipe } from '../../../types/pages';

const RECIPE_ITEM_FETCH_THUNK_TYPE = 'RECIPE_ITEM_FETCH_THUNK_TYPE';

export const recipeItemFetchStart = createAsyncThunk<
  { data: Recipe },
  { id: string }
>(RECIPE_ITEM_FETCH_THUNK_TYPE, async (data, { rejectWithValue }) => {
  try {
    const { id } = data;
    const recipeItem = await getRecipeById(id);
    return { data: recipeItem } as any;
  } catch (error) {
    return rejectWithValue({ error });
  }
});