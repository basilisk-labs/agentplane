import path from "node:path";

import { collectHooksInstallConflicts } from "../../../../commands/hooks/install.js";
import { getPathKind } from "../../../fs-utils.js";
import type { InitAnswers } from "./answers.js";
import { collectInitConflicts } from "./conflicts.js";
import { detectParentGitRoot } from "./git.js";
import type { InitFlags } from "./model.js";

export type ResolvedInitPaths = {
  gitRoot: string;
  gitRootExisted: boolean;
  parentGitRoot: string | null;
  agentplaneDir: string;
  workflowPath: string;
  legacyConfigPath: string;
  backendPath: string;
};

export async function resolveInitPaths(opts: {
  cwd: string;
  rootOverride?: string;
  backend: NonNullable<InitFlags["backend"]>;
}): Promise<ResolvedInitPaths> {
  const initRoot = path.resolve(opts.rootOverride ?? opts.cwd);
  const gitRoot = initRoot;
  const gitRootExisted = (await getPathKind(path.join(gitRoot, ".git"))) === "dir";
  const parentGitRoot = gitRootExisted ? null : await detectParentGitRoot(gitRoot);
  const agentplaneDir = path.join(gitRoot, ".agentplane");
  const workflowPath = path.join(agentplaneDir, "WORKFLOW.md");
  const legacyConfigPath = path.join(agentplaneDir, "config.json");
  const localBackendPath = path.join(agentplaneDir, "backends", "local", "backend.json");
  const cloudBackendPath = path.join(agentplaneDir, "backends", "cloud", "backend.json");
  const backendPath = opts.backend === "cloud" ? cloudBackendPath : localBackendPath;
  return {
    gitRoot,
    gitRootExisted,
    parentGitRoot,
    agentplaneDir,
    workflowPath,
    legacyConfigPath,
    backendPath,
  };
}

export async function collectInitAndHookConflicts(opts: {
  paths: ResolvedInitPaths;
  answers: InitAnswers;
}): Promise<string[]> {
  const initDirs = [
    opts.paths.agentplaneDir,
    path.join(opts.paths.agentplaneDir, "tasks"),
    path.join(opts.paths.agentplaneDir, "agents"),
    path.join(opts.paths.agentplaneDir, "evaluators"),
    path.join(opts.paths.agentplaneDir, "cache"),
    path.join(opts.paths.agentplaneDir, "backends"),
    path.join(opts.paths.agentplaneDir, "backends", opts.answers.backend),
  ];
  const initFiles = [opts.paths.workflowPath, opts.paths.legacyConfigPath, opts.paths.backendPath];
  const initConflicts = await collectInitConflicts({ initDirs, initFiles });
  const hookConflicts =
    opts.answers.hooks && opts.paths.gitRootExisted
      ? await collectHooksInstallConflicts({
          gitRoot: opts.paths.gitRoot,
          agentplaneDir: opts.paths.agentplaneDir,
        })
      : [];
  return [...new Set([...initConflicts, ...hookConflicts])];
}

export function initRel(root: string, filePath: string): string {
  return path.relative(root, filePath) || ".";
}
