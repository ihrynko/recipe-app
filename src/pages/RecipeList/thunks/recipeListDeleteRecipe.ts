import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { modalOpenToggleAction } from "../../../store/modal/reducers/modal";
import { MODAL_NAME } from "../../../store/modal/actions/modal";
import { deleteRecipe } from "../../../api/recipes";
import { AppDispatch } from "../../../store";
import { deleteActions } from "../reducers/recipeListDeleteRecipe";
import { recipeListFetchUpdate } from "../reducers/recipeList";

const RECIPE_LIST_DELETE_THUNK_TYPE = "RECIPE_LIST_DELETE_THUNK_TYPE";

export const recipeListDeleteRecipe = createAsyncThunk<
  void,
  { id: string },
  { dispatch: AppDispatch }
>(RECIPE_LIST_DELETE_THUNK_TYPE, async (data, { dispatch }) => {
  try {
    const { id } = data;
    dispatch(deleteActions.recipeDeleteInProgress());
    (await deleteRecipe(id)) as any;
    dispatch(deleteActions.recipeDeleteSuccess());
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.RECIPE_DELETE }));
    dispatch(deleteActions.recipeResetDeleteRecipeData());
    toast.success("Recipe has been deleted successfully!");
    await dispatch(recipeListFetchUpdate());
  } catch (error) {
    dispatch(deleteActions.recipeDeleteError({ error: error as string }));
    toast.error(error as string);
  }
});
