import { PayloadAction } from '@reduxjs/toolkit';
import { SliceState } from '../reducers/modal';

export enum MODAL_NAME {
 CATEGORY_CREATE = 'CATEGORY_CREATE',
 CATEGORY_DELETE = 'CATEGORY_DELETE',
 RECIPE_CREATE = 'RECIPE_CREATE',
RECIPE_DELETE = 'RECIPE_DELETE',
RECIPE_INGREDIENTS = 'RECIPE_INGREDIENTS',
 RECIPE_METHOD = 'RECIPE_METHOD',
}

export const modalOpenToggle = (
  state: SliceState,
  action: PayloadAction<{ name: MODAL_NAME }>
) => {
   state.open = !state.open;
  state.name = action.payload?.name;
};