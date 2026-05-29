import { loadConfig, type AgentplaneConfig } from "@agentplaneorg/core/config";
import { GitContext } from "@agentplaneorg/core/git";
import { resolveProject } from "@agentplaneorg/core/project";

import { loadTaskBackend, toTaskSummary } from "../../../../backends/task-backend.js";
import { gitCurrentBranch } from "../../../../commands/shared/git-ops.js";
import { dedupeStrings } from "../../../../shared/strings.js";
import {
  isWorkflowEnforcementDisabled,
  validateWorkflowAtPath,
  workflowEnforcementEnvHint,
} from "../../../../workflow-runtime/index.js";
import { renderQuickstart } from "../../../command-guide.js";
import {
  detectTaskArtifactDrift,
  emptyTaskArtifactDrift,
  type TaskArtifactDrift,
} from "./preflight-report-drift.js";
import {
  emptyMessageFormatGuard,
  validateChangedGithubTitleArtifacts,
  type MessageFormatGuard,
} from "./preflight-report-message-guard.js";

export type PreflightMode = "quick" | "full";
type NextAction = { command: string; reason: string };
type Probe = { ok: boolean; error?: string };

export type PreflightReport = {
  mode: PreflightMode;
  project_detected: boolean;
  config_loaded: Probe;
  quickstart_loaded: Probe;
  workflow_loaded: Probe;
  task_list_loaded: Probe & { count?: number };
  active_tasks: Probe & { count?: number; task_ids?: string[] };
  working_tree_clean_tracked: Probe & { value?: boolean };
  task_artifact_drift: TaskArtifactDrift;
  message_format_guard: MessageFormatGuard;
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

export async function buildPreflightReport(opts: {
  cwd: string;
  rootOverride?: string;
  mode: PreflightMode;
  role: string | null;
}): Promise<PreflightReport> {
  const nextActions: NextAction[] = [];
  const harnessHealthReasons: string[] = [];
  const quickstartText = renderQuickstart();
  const role = opts.role?.trim() ?? "";
  if (role) {
    nextActions.push({
      command: `agentplane role ${role}`,
      reason: "load role-specific workflow guidance before owner-scoped execution",
    });
  }
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
  let activeTasks: PreflightReport["active_tasks"] = {
    ok: false,
    error: resolved ? "skipped in quick mode without --role" : "project not resolved",
  };
  const activeStatuses = ["TODO", "DOING", "BLOCKED", "MERGED_PENDING_CLOSE"];
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
  const shouldProbeActiveTasks = opts.mode === "full" || opts.role !== null;
  if (resolved && shouldProbeActiveTasks) {
    try {
      const loaded = await loadTaskBackend({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
      const summaries = loaded.backend.listProjectionTasks
        ? await loaded.backend.listProjectionTasks({ status: activeStatuses })
        : await loaded.backend.listTasks();
      const taskSummaries = loaded.backend.listProjectionTasks
        ? summaries
        : summaries.map((task) => toTaskSummary(task));
      const active = taskSummaries.filter((task) => {
        const status = String(task.status).trim().toUpperCase();
        return (
          status === "TODO" ||
          status === "DOING" ||
          status === "BLOCKED" ||
          status === "MERGED_PENDING_CLOSE"
        );
      });
      activeTasks = {
        ok: true,
        count: active.length,
        task_ids: active.map((task) => task.id).toSorted((a, b) => a.localeCompare(b)),
      };
      if (active.length > 0) {
        nextActions.push({
          command: "agentplane task active",
          reason: `${active.length} active task(s) visible`,
        });
      }
    } catch (err) {
      const message = compactError(err);
      activeTasks = { ok: false, error: message };
      harnessHealthReasons.push("active_tasks_unavailable");
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
  let taskArtifactDrift: TaskArtifactDrift = emptyTaskArtifactDrift();
  let messageFormatGuard: MessageFormatGuard = emptyMessageFormatGuard();
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
      taskArtifactDrift = await detectTaskArtifactDrift({
        gitRoot: resolved.gitRoot,
        changedPaths: changed,
        workflowDir: config?.paths.workflow_dir ?? ".agentplane/tasks",
      });
      messageFormatGuard = await validateChangedGithubTitleArtifacts({
        gitRoot: resolved.gitRoot,
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
      if (taskArtifactDrift.actionable) {
        harnessHealthReasons.push("task_artifact_drift");
        nextActions.push({
          command: `git status --short --untracked-files=all -- ${config?.paths.workflow_dir ?? ".agentplane/tasks"}`,
          reason: `actionable task artifact drift detected for ${taskArtifactDrift.task_ids.join(", ")}`,
        });
      }
      if (!messageFormatGuard.ok) {
        harnessHealthReasons.push("message_format_guard_failed");
        nextActions.push({
          command: "agentplane pr update <task-id>",
          reason: `changed PR title artifact failed message format guard (${messageFormatGuard.errors.join("; ")})`,
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
    active_tasks: activeTasks,
    working_tree_clean_tracked: workingTree,
    task_artifact_drift: taskArtifactDrift,
    message_format_guard: messageFormatGuard,
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
