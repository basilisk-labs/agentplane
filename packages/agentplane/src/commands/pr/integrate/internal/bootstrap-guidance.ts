import { isRuntimeRelevantWatchedFile } from "../../../../../bin/runtime-watch.js";

const WATCHED_RUNTIME_PACKAGES = [
  {
    packageRoot: "packages/agentplane",
    watchedPaths: [
      "src",
      "bin/agentplane.js",
      "bin/dist-guard.js",
      "bin/runtime-context.js",
      "bin/stale-dist-policy.js",
    ],
  },
  {
    packageRoot: "packages/core",
    watchedPaths: ["src"],
  },
] as const;

function normalizeRepoPath(filePath: string): string {
  return filePath.replaceAll("\\", "/");
}

function isWatchedRuntimeSourcePath(filePath: string): boolean {
  const normalized = normalizeRepoPath(filePath);
  for (const watchedPackage of WATCHED_RUNTIME_PACKAGES) {
    for (const watchedPath of watchedPackage.watchedPaths) {
      if (watchedPath === "src") {
        const sourcePrefix = `${watchedPackage.packageRoot}/src/`;
        if (!normalized.startsWith(sourcePrefix)) continue;
        const packageRelativePath = normalized.slice(watchedPackage.packageRoot.length + 1);
        return isRuntimeRelevantWatchedFile(packageRelativePath);
      }
      if (normalized === `${watchedPackage.packageRoot}/${watchedPath}`) {
        return true;
      }
    }
  }
  return false;
}

export function shouldRecommendPostIntegrateBootstrap(changedPaths: string[]): boolean {
  return changedPaths.some((changedPath) => isWatchedRuntimeSourcePath(changedPath));
}

export function renderPostIntegrateBootstrapGuidance(): string {
  return (
    "This merge changed watched runtime sources. Run `bun run framework:dev:bootstrap` " +
    "before the next command so the repo-local build stays current."
  );
}
