import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { modalOpenToggleAction } from '../../../store/modal/reducers/modal';
import { MODAL_NAME } from '../../../store/modal/actions/modal';
import { deleteCategory} from '../../../api/categories';
import { AppDispatch } from '../../../store';
import { deleteActions } from '../reducers/categoryListDeleteCategory';

import { categoryListFetchStart } from './categoryList';

const CATEGORY_LIST_DELETE_THUNK_TYPE = 'CATEGORY_LIST_DELETE_THUNK_TYPE';

export const categoryListDeleteCategory = createAsyncThunk<
  void,
  { id: string },
  { dispatch: AppDispatch }
>(CATEGORY_LIST_DELETE_THUNK_TYPE, async (data, { dispatch }) => {
  try {
    const { id } = data;
    dispatch(deleteActions.categoryDeleteInProgress());
    await deleteCategory(id);
    dispatch(deleteActions.categoryDeleteSuccess());
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.CATEGORY_DELETE }));
    dispatch(deleteActions.categoryResetDeleteCategoryData());
    toast.success('Category has been deleted successfully!');
    await dispatch(categoryListFetchStart());
  } catch (error) {
    dispatch(deleteActions.categoryDeleteError({ error: error as string }));
    toast.error(error as string);
  }
});