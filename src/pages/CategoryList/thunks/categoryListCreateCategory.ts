import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { modalOpenToggleAction } from '../../../store/modal/reducers/modal';
import { CategoryCreate } from '../../../types/pages';
import { createCategory} from '../../../api/categories';
import { createActions } from '../reducers/categoryListCreateCategory';
import { categoryListFetchStart } from './categoryList';
import { AppDispatch } from '../../../store';
import { MODAL_NAME } from '../../../store/modal/actions/modal';

const CATEGORY_LIST_CREATE_THUNK_TYPE = 'CATEGORY_LIST_CREATE_THUNK_TYPE';

export const categoryListCreateCategory = createAsyncThunk<
  void,
  { categoryData: CategoryCreate },
  { dispatch: AppDispatch }
>(CATEGORY_LIST_CREATE_THUNK_TYPE, async (data, { dispatch }) => {
  try {
    const { categoryData } = data;
    dispatch(createActions.categoryCreateInProgress());
    await createCategory(categoryData);
    dispatch(createActions.categoryCreateSuccess());
    dispatch(modalOpenToggleAction({ name: MODAL_NAME.CATEGORY_CREATE }));
    toast.success('Category has been created successfully!');
    await dispatch(categoryListFetchStart());
  } catch (error) {
    dispatch(createActions.categoryCreateError({ error: error as string }));
    toast.error(error as string);
  }
});