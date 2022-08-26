import { Recipe, RecipeCreate } from "../types/pages";
import { client } from "./client";


export const getRecipeById = async (id: string) => {
  try {
    return await client.get(`/recipes/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const deleteRecipe = async (id: string) => {
  try {
    return await client.delete(`/recipes/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createRecipe= async (data: RecipeCreate) => {
  try {
    return await client.post<never, RecipeCreate>("/recipes", { ...data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getRecipesBySearch = async (query: string) => {
  try {
    return await client.get(`/recipes/search/${query}`);
  } catch (error) {
    return Promise.reject(error);
  }
};