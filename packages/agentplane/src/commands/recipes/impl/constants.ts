export const INSTALLED_RECIPES_NAME = "recipes.json";
export const RECIPES_DIR_NAME = "recipes";
export const RECIPES_SCENARIOS_DIR_NAME = "scenarios";
export const RECIPES_SCENARIOS_INDEX_NAME = "scenarios.json";

export const AGENTPLANE_HOME_ENV = "AGENTPLANE_HOME";

export const GLOBAL_RECIPES_DIR_NAME = "recipes";
export const PROJECT_RECIPES_CACHE_DIR_NAME = "recipes-cache";

export const RECIPES_REMOTE_INDEX_NAME = "recipes-index.json";
export const RECIPES_REMOTE_INDEX_SIG_NAME = "recipes-index.json.sig";

export const DEFAULT_RECIPES_INDEX_URL =
  "https://raw.githubusercontent.com/basilisk-labs/agentplane-recipes/main/index.json";

export const RECIPES_INDEX_PUBLIC_KEYS_ENV = "AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS";

export const RECIPES_INDEX_PUBLIC_KEYS: Record<string, string> = {
  "2026-02": `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAeRWdXKVZtz0v+bnQS3zb24jMfa0gflsRUHQkeJkji6E=
-----END PUBLIC KEY-----`,
};
