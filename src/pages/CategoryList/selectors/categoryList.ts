import { RootState } from '../../../store';

export const categoryListStateSelector = (state: RootState) => state.categoryList.categoryListReducer;

export const categoryCreateStateSelector = (state: RootState) => state.categoryList.createCategoryReducer;

export const categoryDeleteStateSelector = (state: RootState) => state.categoryList.deleteCategoryReducer;

