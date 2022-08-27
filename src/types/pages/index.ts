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
export type CategorySearchState = {
  data: Category[];
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
  createdAt?: Date;
  updatedAt?: Date;
  ingredients: Ingredients[];
  instructions: Instruction[];
};

export type Ingredients = {
  ingredient: string;
  amount: number;
  unit: string;
};

export type RecipeListFetchState = {
  refreshIndex: 1 | number;
  data: Recipe[];
  error: string | null;
  loading: boolean;
};

export type RecipeCreate = {
  title: string;
  description: string;
  imageUrl: string;
  timeInMins: number;
  category: Category["_id"];
  ingredients: Ingredients[];
  instructions: Instruction[];
};

export type Instruction = {
  order?: number;
  value: string;
};

export type RecipeCreateState = {
  data: Recipe | Record<string, never>;
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
