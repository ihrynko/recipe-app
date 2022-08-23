import { RootState } from '../../../store';

export const recipeListStateSelector = (state: RootState) => state.recipeList.recipeListReducer;

export const recipeDeleteStateSelector = (state: RootState) => state.recipeList.deleteRecipeReducer;

