import { loadConfig, type AgentplaneConfig } from "@agentplaneorg/core/config";
import { GitContext } from "@agentplaneorg/core/git";
import { resolveProject } from "@agentplaneorg/core/project";

import { loadTaskBackend } from "../../../../backends/task-backend.js";
import { gitCurrentBranch } from "../../../../commands/shared/git-ops.js";
import { dedupeStrings } from "../../../../shared/strings.js";
import {
  isWorkflowEnforcementDisabled,
  validateWorkflowAtPath,
  workflowEnforcementEnvHint,
} from "../../../../workflow-runtime/index.js";
import { renderQuickstart } from "../../../command-guide.js";

export type PreflightMode = "quick" | "full";
type NextAction = { command: string; reason: string };
type Probe = { ok: boolean; error?: string };
type TaskArtifactDrift = {
  present: boolean;
  task_ids: string[];
  paths: string[];
};

export type PreflightReport = {
  mode: PreflightMode;
  project_detected: boolean;
  config_loaded: Probe;
  quickstart_loaded: Probe;
  workflow_loaded: Probe;
  task_list_loaded: Probe & { count?: number };
  working_tree_clean_tracked: Probe & { value?: boolean };
  task_artifact_drift: TaskArtifactDrift;
  current_branch: Probe & { value?: string };
  workflow_mode: "direct" | "branch_pr" | "unknown";
  approvals: {
    require_plan: boolean | "unknown";
    require_verify: boolean | "unknown";
    require_network: boolean | "unknown";
  };
  harness_health: {
    status: "ok" | "warn";
    reasons: string[];
  };
  outside_repo_needed: false;
  next_actions: NextAction[];
};

function compactError(err: unknown): string {
  if (err instanceof Error) {
    const first = (err.message ?? "").split("\n", 1)[0] ?? "";
    return first.trim() || err.name;
  }
  return String(err);
}

function inferWorkflowMode(config: AgentplaneConfig | null): "direct" | "branch_pr" | "unknown" {
  if (!config) return "unknown";
  return config.workflow_mode === "direct" || config.workflow_mode === "branch_pr"
    ? config.workflow_mode
    : "unknown";
}

function inferApprovals(config: AgentplaneConfig | null): PreflightReport["approvals"] {
  if (!config?.agents?.approvals) {
    return {
      require_plan: "unknown",
      require_verify: "unknown",
      require_network: "unknown",
    };
  }
  const approvals = config.agents.approvals;
  return {
    require_plan: approvals.require_plan,
    require_verify: approvals.require_verify,
    require_network: approvals.require_network,
  };
}

function normalizeRepoPath(value: string): string {
  return value.replaceAll("\\", "/");
}

function detectTaskArtifactDrift(opts: {
  changedPaths: string[];
  workflowDir: string;
}): TaskArtifactDrift {
  const workflowDir = normalizeRepoPath(opts.workflowDir).replace(/\/+$/, "");
  const prefix = `${workflowDir}/`;
  const matched = opts.changedPaths
    .map((value) => normalizeRepoPath(value))
    .filter((value) => value.startsWith(prefix))
    .toSorted((a, b) => a.localeCompare(b));
  const taskIds = new Set<string>();
  for (const matchedPath of matched) {
    const relative = matchedPath.slice(prefix.length);
    const [taskId] = relative.split("/", 1);
    if (taskId && taskId !== "." && taskId !== "..") {
      taskIds.add(taskId);
    }
  }
  return {
    present: matched.length > 0,
    task_ids: [...taskIds].toSorted((a, b) => a.localeCompare(b)),
    paths: matched,
  };
}

export async function buildPreflightReport(opts: {
  cwd: string;
  rootOverride?: string;
  mode: PreflightMode;
}): Promise<PreflightReport> {
  const nextActions: NextAction[] = [];
  const harnessHealthReasons: string[] = [];
  const quickstartText = renderQuickstart();
  const quickstartLoaded: Probe = {
    ok: quickstartText.trim().length > 0,
    error:
      quickstartText.trim().length > 0 ? undefined : "quickstart renderer returned empty output",
  };

  let resolved: {
    gitRoot: string;
    agentplaneDir: string;
  } | null = null;
  try {
    resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  } catch (err) {
    nextActions.push({
      command: "agentplane init",
      reason: `project not resolved (${compactError(err)})`,
    });
  }

  let config: AgentplaneConfig | null = null;
  let configLoaded: Probe = { ok: false, error: "project not resolved" };
  if (resolved) {
    try {
      const loaded = await loadConfig(resolved.agentplaneDir);
      config = loaded.config;
      configLoaded = { ok: true };
    } catch (err) {
      const message = compactError(err);
      configLoaded = { ok: false, error: message };
      nextActions.push({
        command: "agentplane config show",
        reason: `config failed validation (${message})`,
      });
      harnessHealthReasons.push("config_unavailable");
    }
  }

  let taskListLoaded: PreflightReport["task_list_loaded"] = {
    ok: false,
    error: opts.mode === "quick" ? "skipped in quick mode" : "project not resolved",
  };
  if (opts.mode === "full" && resolved) {
    try {
      const loaded = await loadTaskBackend({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const tasks = await loaded.backend.listTasks();
      taskListLoaded = { ok: true, count: tasks.length };
    } catch (err) {
      const message = compactError(err);
      taskListLoaded = { ok: false, error: message };
      nextActions.push({
        command: "agentplane task list",
        reason: `task backend unavailable (${message})`,
      });
      harnessHealthReasons.push("task_backend_unavailable");
    }
  }

  let workflowLoaded: Probe = { ok: false, error: "project not resolved" };
  if (resolved) {
    if (isWorkflowEnforcementDisabled()) {
      workflowLoaded = {
        ok: true,
        error: `workflow checks disabled via ${workflowEnforcementEnvHint()}`,
      };
    } else {
      try {
        const workflowValidation = await validateWorkflowAtPath(resolved.gitRoot);
        workflowLoaded = workflowValidation.ok
          ? { ok: true }
          : {
              ok: false,
              error: workflowValidation.diagnostics
                .filter((diagnostic) => diagnostic.severity === "ERROR")
                .map((diagnostic) => `${diagnostic.code}:${diagnostic.path}`)
                .join(", "),
            };
        if (!workflowValidation.ok) {
          harnessHealthReasons.push("workflow_contract_invalid");
          nextActions.push({
            command: "agentplane workflow build --validate --dry-run",
            reason: "workflow contract is invalid",
          });
        }
      } catch (err) {
        const message = compactError(err);
        workflowLoaded = { ok: false, error: message };
        harnessHealthReasons.push("workflow_contract_unreadable");
        nextActions.push({
          command: "agentplane workflow build --validate --dry-run",
          reason: `cannot validate workflow (${message})`,
        });
      }
    }
  }

  let workingTree: PreflightReport["working_tree_clean_tracked"] = {
    ok: false,
    error: "project not resolved",
  };
  let taskArtifactDrift: TaskArtifactDrift = {
    present: false,
    task_ids: [],
    paths: [],
  };
  let branch: PreflightReport["current_branch"] = {
    ok: false,
    error: "project not resolved",
  };
  if (resolved) {
    try {
      const git = new GitContext({ gitRoot: resolved.gitRoot });
      const [changed, staged, unstagedTracked] = await Promise.all([
        git.statusChangedPaths(),
        git.statusStagedPaths(),
        git.statusUnstagedTrackedPaths(),
      ]);
      taskArtifactDrift = detectTaskArtifactDrift({
        changedPaths: changed,
        workflowDir: config?.paths.workflow_dir ?? ".agentplane/tasks",
      });
      workingTree = { ok: true, value: staged.length === 0 && unstagedTracked.length === 0 };
      if (!workingTree.value) {
        harnessHealthReasons.push("working_tree_dirty");
        nextActions.push({
          command: "git status --short --untracked-files=no",
          reason: "tracked changes detected",
        });
      }
      if (taskArtifactDrift.present) {
        harnessHealthReasons.push("task_artifact_drift");
        nextActions.push({
          command: `git status --short --untracked-files=all -- ${config?.paths.workflow_dir ?? ".agentplane/tasks"}`,
          reason: `task artifact drift detected for ${taskArtifactDrift.task_ids.join(", ")}`,
        });
      }
    } catch (err) {
      const message = compactError(err);
      workingTree = { ok: false, error: message };
      harnessHealthReasons.push("working_tree_unreadable");
      nextActions.push({
        command: "git status --short --untracked-files=no",
        reason: `cannot inspect git status (${message})`,
      });
    }

    try {
      branch = { ok: true, value: await gitCurrentBranch(resolved.gitRoot) };
    } catch (err) {
      branch = { ok: false, error: compactError(err) };
    }
  }

  return {
    mode: opts.mode,
    project_detected: resolved !== null,
    config_loaded: configLoaded,
    quickstart_loaded: quickstartLoaded,
    workflow_loaded: workflowLoaded,
    task_list_loaded: taskListLoaded,
    working_tree_clean_tracked: workingTree,
    task_artifact_drift: taskArtifactDrift,
    current_branch: branch,
    workflow_mode: inferWorkflowMode(config),
    approvals: inferApprovals(config),
    harness_health: {
      status: harnessHealthReasons.length === 0 ? "ok" : "warn",
      reasons: dedupeStrings(harnessHealthReasons),
    },
    outside_repo_needed: false,
    next_actions: nextActions,
  };
}
