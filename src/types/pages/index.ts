export type Category = {
  _id: string;
  name: string;
  description?: string;
  image: string;
};

export type CategoryListFetchState = {
  data: Category[];
  error: string | null;
  loading: boolean;
};

export type CategoryCreate = {
  name: string;
  description?: string;
  image: string;
};

export type CategoryCreateState = {
  data: Category | Record<string, never>;
  error: string | null;
  loading: boolean;
};

export type CategoryDeleteState = {
  data: Category | Record<string, never>;
  error: string | null;
  loading: boolean;
};

export type Recipe = {
   _id: string;
    title: string;
    description: string;
    imageUrl: string;
    timeInMins: number;
    category: Category;
    // user?: TUser;
    createdAt?: Date;
    updatedAt?: Date;
    ingredients: Array<Ingredients>;
    instructions: Array<string>;
};

export type Ingredients = {
    ingredient: string;
    amount: number;
    unit: string;
};

export type RecipeListFetchState = {
  data: Recipe[];
  error: string | null;
  loading: boolean;
};

export type RecipeDeleteState = {
  data: Recipe | Record<string, never>;
  error: string | null;
  loading: boolean;
};

export type RecipeItemState = {
  data: Recipe | Record<string, never>;
  error: string | null;
  loading: boolean;
};
