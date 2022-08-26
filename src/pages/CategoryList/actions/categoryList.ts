import { PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryListFetchState } from "../../../types/pages";
import { toast } from "react-toastify";

export const categoryListFetchInProgressAction = (
  state: CategoryListFetchState
) => {
  state.loading = true;
  state.error = null;
};

export const categoryListFetchSuccessAction = (
  state: CategoryListFetchState,
  action: PayloadAction<{ data: Category[] }>
) => {
  const { data } = action.payload;

  state.data = data;
  state.loading = false;
};

export const categoryListFetchErrorAction = (
  state: CategoryListFetchState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};
