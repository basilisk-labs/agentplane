export type ProtectedPathKind = "tasks" | "policy" | "config" | "hooks" | "ci";

export type ProtectedPathOverride = {
  kind: ProtectedPathKind;
  cliFlag: string;
  envVar: string;
};

function pathIsUnder(candidate: string, prefix: string): boolean {
  if (prefix === "." || prefix === "") return true;
  if (candidate === prefix) return true;
  return candidate.startsWith(`${prefix}/`);
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
}): ProtectedPathKind | null {
  const p = opts.filePath;
  if (!p) return null;

  if (p === opts.tasksPath) return "tasks";

  // "Rules of the game": authoring/agent policies and registry.
  if (
    p === "AGENTS.md" ||
    p === "packages/agentplane/assets/AGENTS.md" ||
    pathIsUnder(p, ".agentplane/agents")
  ) {
    return "policy";
  }

  // Framework config and task backend config determine enforcement behavior.
  if (p === ".agentplane/config.json" || pathIsUnder(p, ".agentplane/backends")) {
    return "config";
  }

  // Local hook orchestrator is a quality gate for commits.
  if (p === "lefthook.yml") return "hooks";

  // CI workflows are "remote hooks" for quality gates.
  if (pathIsUnder(p, ".github/workflows") || pathIsUnder(p, ".github/actions")) {
    return "ci";
  }

  return null;
}
