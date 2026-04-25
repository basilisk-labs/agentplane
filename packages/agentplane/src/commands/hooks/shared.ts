import { readFile } from "node:fs/promises";
import path from "node:path";

import { gitRevParse } from "../shared/git-ops.js";
import { isPathWithin } from "../shared/path.js";
import { CliError } from "../../shared/errors.js";

export const HOOK_MARKER = "agentplane-hook";
export { HOOK_SHIM_MARKER as SHIM_MARKER } from "../shared/hook-shim-template.js";
export const HOOK_NAMES = ["commit-msg", "pre-commit", "pre-push", "post-merge"] as const;
export type HookName = (typeof HOOK_NAMES)[number];

export async function resolveGitHooksDir(cwd: string): Promise<string> {
  const repoRoot = await gitRevParse(cwd, ["--show-toplevel"]);
  const commonDirRaw = await gitRevParse(cwd, ["--git-common-dir"]);
  const hooksRaw = await gitRevParse(cwd, ["--git-path", "hooks"]);
  const commonDir = path.resolve(
    path.isAbsolute(commonDirRaw) ? commonDirRaw : path.join(repoRoot, commonDirRaw),
  );
  const hooksDir = path.resolve(
    path.isAbsolute(hooksRaw) ? hooksRaw : path.join(repoRoot, hooksRaw),
  );
  const resolvedRoot = path.resolve(repoRoot);

  if (!isPathWithin(resolvedRoot, hooksDir) && !isPathWithin(commonDir, hooksDir)) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: [
        "Refusing to manage git hooks outside the repository.",
        `hooks_path=${hooksDir}`,
        `repo_root=${resolvedRoot}`,
        `common_dir=${commonDir}`,
        "Fix:",
        "  1) Use a repo-relative core.hooksPath (e.g., .git/hooks)",
        "  2) Re-run `agentplane hooks install`",
      ].join("\n"),
    });
  }
  return hooksDir;
}

export async function fileIsManaged(filePath: string, marker: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, "utf8");
    return content.includes(marker);
  } catch {
    return false;
  }
}
