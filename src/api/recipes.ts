import { Recipe } from "../types/pages";
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

export const createRecipe= async (data: Partial<Recipe>) => {
  try {
    return await client.post<never, Recipe>("/recipes", { ...data });
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