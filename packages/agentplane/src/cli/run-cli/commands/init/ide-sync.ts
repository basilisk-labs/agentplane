import path from "node:path";

import { fileExists } from "../../../fs-utils.js";

import type { RunDeps } from "../../command-catalog/kernel.js";
import { syncPlatforms, type PlatformId } from "../platform.js";

export async function maybeSyncIde(opts: {
  cwd: string;
  rootOverride?: string;
  ide: "none" | "codex" | "cursor" | "windsurf";
  gitRoot: string;
}): Promise<{ installPaths: string[] }> {
  if (opts.ide === "none") return { installPaths: [] };
  if (opts.ide === "codex") return { installPaths: [] };

  const deps: RunDeps = {
    getCtx: (_cmd) => Promise.reject(new Error("getCtx is not available during init")),
    getResolvedProject: (_cmd) =>
      Promise.resolve({
        gitRoot: opts.gitRoot,
        agentplaneDir: path.join(opts.gitRoot, ".agentplane"),
      }),
    getLoadedConfig: (_cmd) =>
      Promise.reject(new Error("getLoadedConfig is not available during init")),
    getHelpJsonForDocs: () => [],
  };
  const platforms: PlatformId[] = opts.ide === "cursor" ? ["cursor"] : ["windsurf"];
  await syncPlatforms({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    platforms,
    dryRun: false,
    deps,
  });

  const installPaths: string[] = [];
  const cursorPath = path.join(opts.gitRoot, ".cursor", "rules", "agentplane.mdc");
  const windsurfPath = path.join(opts.gitRoot, ".windsurf", "rules", "agentplane.md");
  if (opts.ide === "cursor" && (await fileExists(cursorPath))) {
    installPaths.push(path.relative(opts.gitRoot, cursorPath));
  }
  if (opts.ide === "windsurf" && (await fileExists(windsurfPath))) {
    installPaths.push(path.relative(opts.gitRoot, windsurfPath));
  }
  return { installPaths };
}
