import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { modalOpenToggleAction } from "../../../store/modal/reducers/modal";
import { RecipeCreate } from "../../../types/pages";
import { createRecipe } from "../../../api/recipes";
import { createActions } from "../reducers/recipeListCreateRecipe";
import { AppDispatch } from "../../../store";
import { MODAL_NAME } from "../../../store/modal/actions/modal";
import { recipeListFetchUpdate } from "../reducers/recipeList";

const RECIPE_LIST_CREATE_THUNK_TYPE = "RECIPE_LIST_CREATE_THUNK_TYPE";

export const recipeListCreateRecipe = createAsyncThunk<
  void,
  { recipeData: RecipeCreate },
  { dispatch: AppDispatch }
>(RECIPE_LIST_CREATE_THUNK_TYPE, async (data, { dispatch }) => {
  try {
    const { recipeData } = data;
    dispatch(createActions.recipeCreateInProgress());
    await createRecipe(recipeData);
    dispatch(createActions.recipeCreateSuccess());
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_CREATE }));
    toast.success("Recipe has been created successfully!");
    await dispatch(recipeListFetchUpdate());
  } catch (error) {
    dispatch(createActions.recipeCreateError({ error: error as string }));
    toast.error(error as string);
  }
});
