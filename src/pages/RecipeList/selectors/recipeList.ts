import { RootState } from '../../../store';

export const recipeListStateSelector = (state: RootState) => state.recipeList.recipeListReducer;

export const recipeCreateStateSelector = (state: RootState) => state.recipeList.createRecipeReducer;

export const recipeDeleteStateSelector = (state: RootState) => state.recipeList.deleteRecipeReducer;

export const recipeSearchStateSelector = (state: RootState) =>
  state.recipeList.recipeListBySearch;



