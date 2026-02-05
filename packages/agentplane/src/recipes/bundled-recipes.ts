export type BundledRecipesCatalog = {
  schema_version: 1;
  recipes: {
    id: string;
    summary: string;
    description?: string;
    versions: { version: string }[];
  }[];
};

export const BUNDLED_RECIPES_CATALOG: BundledRecipesCatalog = {
  schema_version: 1,
  recipes: [],
};
