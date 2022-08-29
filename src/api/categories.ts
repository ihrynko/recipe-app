import { Category, Recipe, Query } from "../types/pages";
import { client } from "./client";

export const getAllCategories = async (query: string) => {
  try {
    return await client.get<never, Category[]>("/categories", {
      params: { search: query },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllRecipesInCategory = async (
  categoryId: string
) => {
  try {
    return await client.get<never, Recipe[]>(`/categories/${categoryId}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    return await client.delete(`/categories/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createCategory = async (data: Partial<Category>) => {
  try {
    return await client.post<never, Category>("/categories", { ...data });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCategoriesBySearch = async (query: string) => {
  try {
    return await client.get(`/categories/search/${query}`);
  } catch (error) {
    return Promise.reject(error);
  }
};
