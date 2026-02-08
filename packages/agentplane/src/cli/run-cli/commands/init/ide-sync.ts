import path from "node:path";

import { fileExists } from "../../../fs-utils.js";

import { cmdIdeSync } from "../ide.js";

export async function maybeSyncIde(opts: {
  cwd: string;
  rootOverride?: string;
  ide: "codex" | "cursor" | "windsurf";
  gitRoot: string;
}): Promise<{ installPaths: string[] }> {
  if (opts.ide === "codex") return { installPaths: [] };

  await cmdIdeSync({ cwd: opts.cwd, rootOverride: opts.rootOverride, ide: opts.ide });

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
