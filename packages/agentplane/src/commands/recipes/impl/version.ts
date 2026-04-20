import { compareVersions } from "../../../runtime/shared/version-compare.js";

export function compareRecipeVersions(left: string, right: string): number {
  return compareVersions(left, right);
}

export function pickLatestRecipeVersion<T extends { version: string }>(
  entries: readonly T[],
): T | undefined {
  return [...entries]
    .toSorted((left, right) => compareRecipeVersions(left.version, right.version))
    .at(-1);
}
