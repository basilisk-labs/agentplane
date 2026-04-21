export type RecipesIndex = {
  schema_version: 1;
  recipes: {
    id: string;
    summary: string;
    description?: string;
    versions: {
      version: string;
      url: string;
      sha256: string;
      min_agentplane_version?: string;
      tags?: string[];
    }[];
  }[];
};

export type RecipesIndexSignature = {
  schema_version: 1;
  key_id: string;
  signature: string;
  algorithm?: string;
};

export type RecipeInstallSource =
  | { type: "name"; value: string }
  | { type: "path"; value: string }
  | { type: "url"; value: string }
  | { type: "auto"; value: string };

export type RecipeCachePruneFlags = {
  dryRun: boolean;
  all: boolean;
};

export type RecipeListFlags = {
  full: boolean;
  tag?: string;
};

export type RecipeListRemoteFlags = {
  refresh: boolean;
  index?: string;
  yes: boolean;
};
