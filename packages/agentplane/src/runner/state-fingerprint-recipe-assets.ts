import { createHash } from "node:crypto";
import type { BigIntStats } from "node:fs";
import { lstat, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { readStableRegularFileNoFollow } from "../shared/stable-file.js";
import type { RunnerRecipeContext } from "./types.js";

const RECIPE_ASSET_MAX_BYTES = 16 * 1024 * 1024;
const RECIPE_ASSET_TOTAL_MAX_BYTES = 64 * 1024 * 1024;
const RECIPE_ASSET_MAX_ENTRIES = 4096;

export type RunnerRecipeAssetsObservation =
  | { state: "not_applicable" }
  | {
      state: "present";
      recipe_id: string;
      scenario_id: string;
      recipe_root: string;
      assets: (
        | { path: string; kind: "directory"; mode: number }
        | { path: string; kind: "file"; mode: number; size: number; sha256: string }
      )[];
    }
  | { state: "unavailable"; reason_code: string };

type RecipeAssetSnapshot = {
  path: string;
  absolute_path: string;
  stats: BigIntStats;
  size: number;
  sha256: string;
};

type RecipeDirectorySnapshot = {
  path: string;
  absolute_path: string;
  stats: BigIntStats;
};

class RecipeAssetObservationError extends Error {
  constructor(readonly reason_code: string) {
    super(reason_code);
    this.name = "RecipeAssetObservationError";
  }
}

function sameSnapshot(left: BigIntStats, right: BigIntStats): boolean {
  return (
    left.dev === right.dev &&
    left.ino === right.ino &&
    left.size === right.size &&
    left.ctimeNs === right.ctimeNs &&
    left.mtimeNs === right.mtimeNs
  );
}

async function assertSnapshotStable(
  snapshot: RecipeAssetSnapshot | RecipeDirectorySnapshot,
): Promise<void> {
  let current: BigIntStats;
  try {
    current = await lstat(snapshot.absolute_path, { bigint: true });
  } catch {
    throw new RecipeAssetObservationError("recipe_tree_changed_during_observation");
  }
  if (!sameSnapshot(snapshot.stats, current)) {
    throw new RecipeAssetObservationError("recipe_tree_changed_during_observation");
  }
}

async function walkRecipeTree(opts: {
  recipe_root: string;
  relative_dir: string;
  assets: RecipeAssetSnapshot[];
  directories: RecipeDirectorySnapshot[];
  total_bytes: { value: number };
}): Promise<void> {
  const absoluteDirectory = path.join(opts.recipe_root, opts.relative_dir);
  const directoryStats = await lstat(absoluteDirectory, { bigint: true });
  if (!directoryStats.isDirectory() || directoryStats.isSymbolicLink()) {
    throw new RecipeAssetObservationError("recipe_tree_unsafe");
  }
  const directorySnapshot = {
    path: opts.relative_dir ? opts.relative_dir.split(path.sep).join("/") : ".",
    absolute_path: absoluteDirectory,
    stats: directoryStats,
  };
  opts.directories.push(directorySnapshot);
  const entries = await readdir(absoluteDirectory, { withFileTypes: true });
  for (const entry of entries.toSorted((left, right) => left.name.localeCompare(right.name))) {
    if (opts.assets.length + opts.directories.length >= RECIPE_ASSET_MAX_ENTRIES) {
      throw new RecipeAssetObservationError("recipe_asset_count_exceeded");
    }
    const relativePath = path.join(opts.relative_dir, entry.name);
    const absolutePath = path.join(opts.recipe_root, relativePath);
    const stats = await lstat(absolutePath, { bigint: true });
    if (stats.isSymbolicLink()) {
      throw new RecipeAssetObservationError("recipe_tree_unsafe");
    }
    if (stats.isDirectory()) {
      await walkRecipeTree({
        ...opts,
        relative_dir: relativePath,
      });
      continue;
    }
    if (!stats.isFile()) {
      throw new RecipeAssetObservationError("recipe_tree_unsafe");
    }
    if (stats.size > BigInt(RECIPE_ASSET_MAX_BYTES)) {
      throw new RecipeAssetObservationError("recipe_asset_budget_exceeded");
    }
    const content = await readStableRegularFileNoFollow(absolutePath, "recipe tree asset", {
      max_bytes: RECIPE_ASSET_MAX_BYTES,
      expected_identity: { dev: stats.dev, ino: stats.ino },
    });
    opts.total_bytes.value += content.byteLength;
    if (opts.total_bytes.value > RECIPE_ASSET_TOTAL_MAX_BYTES) {
      throw new RecipeAssetObservationError("recipe_asset_budget_exceeded");
    }
    opts.assets.push({
      path: relativePath.split(path.sep).join("/"),
      absolute_path: absolutePath,
      stats,
      size: content.byteLength,
      sha256: `sha256:${createHash("sha256").update(content).digest("hex")}`,
    });
  }
  await assertSnapshotStable(directorySnapshot);
}

export async function observeRunnerRecipeAssets(
  recipe: RunnerRecipeContext | null | undefined,
): Promise<RunnerRecipeAssetsObservation> {
  if (!recipe) return { state: "not_applicable" };
  const recipeRootInput = recipe.recipe_dir?.trim();
  if (!recipeRootInput) {
    return { state: "unavailable", reason_code: "recipe_root_unavailable" };
  }
  try {
    const recipeRoot = await realpath(recipeRootInput);
    const assets: RecipeAssetSnapshot[] = [];
    const directories: RecipeDirectorySnapshot[] = [];
    await walkRecipeTree({
      recipe_root: recipeRoot,
      relative_dir: "",
      assets,
      directories,
      total_bytes: { value: 0 },
    });
    await Promise.all([
      ...directories.map(async (snapshot) => await assertSnapshotStable(snapshot)),
      ...assets.map(async (snapshot) => await assertSnapshotStable(snapshot)),
    ]);
    const afterRootPath = await realpath(recipeRootInput);
    if (afterRootPath !== recipeRoot) {
      return { state: "unavailable", reason_code: "recipe_root_changed_during_observation" };
    }
    return {
      state: "present",
      recipe_id: recipe.recipe_id,
      scenario_id: recipe.scenario_id,
      recipe_root: recipeRoot,
      assets: [
        ...directories.map(({ path: assetPath, stats }) => ({
          path: assetPath,
          kind: "directory" as const,
          mode: Number(stats.mode & 0o7777n),
        })),
        ...assets.map(({ path: assetPath, stats, size, sha256 }) => ({
          path: assetPath,
          kind: "file" as const,
          mode: Number(stats.mode & 0o7777n),
          size,
          sha256,
        })),
      ].toSorted((left, right) => left.path.localeCompare(right.path)),
    };
  } catch (error) {
    if (error instanceof RecipeAssetObservationError) {
      return { state: "unavailable", reason_code: error.reason_code };
    }
    return { state: "unavailable", reason_code: "recipe_asset_observation_unavailable" };
  }
}
