import { PayloadAction } from '@reduxjs/toolkit';
import { CategoryDeleteState, Category } from '../../../types/pages';

export const categoryDeleteItemDataSetAction = (
  state: CategoryDeleteState,
  action: PayloadAction<{ data: Category }>
) => {
  const { data } = action.payload;
  state.data = data;
};
export const categoryDeleteInProgressAction = (state: CategoryDeleteState) => {
  state.loading = true;
  state.error = null;
};
export const categoryDeleteSuccessAction = (state: CategoryDeleteState) => {
  state.loading = false;
};

export const categoryDeleteErrorAction = (state: CategoryDeleteState, action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
}


