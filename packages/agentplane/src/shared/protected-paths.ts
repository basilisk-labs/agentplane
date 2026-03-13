import { gitPathIsUnderPrefix, normalizeGitPathPrefix } from "./git-path.js";

export type ProtectedPathKind = "tasks" | "policy" | "config" | "hooks" | "ci";

export type ProtectedPathOverride = {
  kind: ProtectedPathKind;
  cliFlag: string;
  envVar: string;
};

function taskWorkflowPrefix(
  workflowDir: string | undefined,
  taskId: string | undefined,
): string | null {
  const dir = normalizeGitPathPrefix(workflowDir ?? "");
  const id = (taskId ?? "").trim();
  if (!dir || !id) return null;
  return normalizeGitPathPrefix(`${dir}/${id}`);
}

export function taskArtifactPrefixes(opts: {
  tasksPath: string;
  workflowDir?: string;
  taskId?: string;
}): string[] {
  const out = new Set<string>();
  const tasksPath = normalizeGitPathPrefix(opts.tasksPath);
  if (tasksPath) out.add(tasksPath);
  const workflowPrefix = taskWorkflowPrefix(opts.workflowDir, opts.taskId);
  if (workflowPrefix) out.add(workflowPrefix);
  return [...out].toSorted((a, b) => a.localeCompare(b));
}

const POLICY_PATH_PREFIXES = [
  "AGENTS.md",
  "CLAUDE.md",
  "packages/agentplane/assets/AGENTS.md",
  ".agentplane/agents",
] as const;
const CONFIG_PATH_PREFIXES = [".agentplane/config.json", ".agentplane/backends"] as const;
const HOOK_PATH_PREFIXES = ["lefthook.yml"] as const;
const CI_PATH_PREFIXES = [".github/workflows", ".github/actions"] as const;

export function protectedPathAllowPrefixes(opts: {
  tasksPath: string;
  workflowDir?: string;
  taskId?: string;
  allowTasks?: boolean;
  allowPolicy?: boolean;
  allowConfig?: boolean;
  allowHooks?: boolean;
  allowCI?: boolean;
}): string[] {
  const out = new Set<string>();
  if (opts.allowTasks) {
    for (const prefix of taskArtifactPrefixes(opts)) out.add(prefix);
  }
  if (opts.allowPolicy) {
    for (const prefix of POLICY_PATH_PREFIXES) out.add(prefix);
  }
  if (opts.allowConfig) {
    for (const prefix of CONFIG_PATH_PREFIXES) out.add(prefix);
  }
  if (opts.allowHooks) {
    for (const prefix of HOOK_PATH_PREFIXES) out.add(prefix);
  }
  if (opts.allowCI) {
    for (const prefix of CI_PATH_PREFIXES) out.add(prefix);
  }
  return [...out].toSorted((a, b) => a.localeCompare(b));
}

export function getProtectedPathOverride(kind: ProtectedPathKind): ProtectedPathOverride {
  switch (kind) {
    case "tasks": {
      return { kind, cliFlag: "--allow-tasks", envVar: "AGENTPLANE_ALLOW_TASKS" };
    }
    case "policy": {
      return { kind, cliFlag: "--allow-policy", envVar: "AGENTPLANE_ALLOW_POLICY" };
    }
    case "config": {
      return { kind, cliFlag: "--allow-config", envVar: "AGENTPLANE_ALLOW_CONFIG" };
    }
    case "hooks": {
      return { kind, cliFlag: "--allow-hooks", envVar: "AGENTPLANE_ALLOW_HOOKS" };
    }
    case "ci": {
      return { kind, cliFlag: "--allow-ci", envVar: "AGENTPLANE_ALLOW_CI" };
    }
  }
}

export function protectedPathKindForFile(opts: {
  filePath: string;
  tasksPath: string;
  workflowDir?: string;
  taskId?: string;
}): ProtectedPathKind | null {
  const p = opts.filePath;
  if (!p) return null;

  if (
    taskArtifactPrefixes({
      tasksPath: opts.tasksPath,
      workflowDir: opts.workflowDir,
      taskId: opts.taskId,
    }).some((prefix) => gitPathIsUnderPrefix(p, prefix))
  ) {
    return "tasks";
  }

  // "Rules of the game": authoring/agent policies and registry.
  if (
    p === "AGENTS.md" ||
    p === "CLAUDE.md" ||
    p === "packages/agentplane/assets/AGENTS.md" ||
    gitPathIsUnderPrefix(p, ".agentplane/agents")
  ) {
    return "policy";
  }

  // Framework config and task backend config determine enforcement behavior.
  if (p === ".agentplane/config.json" || gitPathIsUnderPrefix(p, ".agentplane/backends")) {
    return "config";
  }

  // Local hook orchestrator is a quality gate for commits.
  if (p === "lefthook.yml") return "hooks";

  // CI workflows are "remote hooks" for quality gates.
  if (gitPathIsUnderPrefix(p, ".github/workflows") || gitPathIsUnderPrefix(p, ".github/actions")) {
    return "ci";
  }

  return null;
}
