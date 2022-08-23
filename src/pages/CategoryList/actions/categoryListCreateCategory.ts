import { PayloadAction } from '@reduxjs/toolkit';
import { CategoryCreateState } from '../../../types/pages';

export const categoryCreateInProgressAction = (state: CategoryCreateState) => {
  state.loading = true;
  state.error = null;
};

export const categoryCreateSuccessAction = (state: CategoryCreateState) => {
  state.loading = false;
};

export const categoryCreateErrorAction = (
  state: CategoryCreateState,
  action: PayloadAction<{ error: string }>
) => {
  const { error } = action.payload;

  state.loading = false;
  state.error = error;
};