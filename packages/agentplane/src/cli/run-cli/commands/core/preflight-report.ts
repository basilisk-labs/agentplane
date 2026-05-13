import { readFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig, type AgentplaneConfig } from "@agentplaneorg/core/config";
import { GitContext } from "@agentplaneorg/core/git";
import { resolveProject } from "@agentplaneorg/core/project";
import { normalizeTaskStatus, readTask, type TaskStatus } from "@agentplaneorg/core/tasks";

import { loadTaskBackend } from "../../../../backends/task-backend.js";
import { validateGithubPrTitleContents } from "../../../../commands/pr/internal/review-template.js";
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
type TaskArtifactKind = "task_readme" | "handoff" | "pr_artifact" | "blueprint" | "unknown";
type TaskArtifactClassification =
  | "active_parallel_task_artifact"
  | "stale_done_handoff"
  | "unknown_task_artifact";
type TaskArtifactAction = "ignore_parallel_agent" | "cleanup_candidate" | "inspect";
type TaskArtifactDriftItem = {
  path: string;
  task_id: string;
  artifact_kind: TaskArtifactKind;
  classification: TaskArtifactClassification;
  action: TaskArtifactAction;
  status: TaskStatus | "unknown";
  reason: string;
};
type TaskArtifactDrift = {
  present: boolean;
  task_ids: string[];
  paths: string[];
  actionable: boolean;
  items: TaskArtifactDriftItem[];
  counts: Record<TaskArtifactClassification, number>;
};
type MessageFormatGuard = {
  ok: boolean;
  checked_paths: string[];
  errors: string[];
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

function normalizeRepoPath(value: string): string {
  return value.replaceAll("\\", "/");
}

function inferTaskArtifactKind(relativeTaskPath: string): TaskArtifactKind {
  if (relativeTaskPath === "README.md") return "task_readme";
  if (relativeTaskPath.startsWith("handoff/")) return "handoff";
  if (relativeTaskPath.startsWith("pr/")) return "pr_artifact";
  if (relativeTaskPath.startsWith("blueprint/")) return "blueprint";
  return "unknown";
}

function isActiveParallelStatus(status: TaskStatus | "unknown"): boolean {
  return status === "TODO" || status === "DOING" || status === "BLOCKED";
}

function classifyTaskArtifactDriftItem(opts: {
  path: string;
  taskId: string;
  artifactKind: TaskArtifactKind;
  status: TaskStatus | "unknown";
}): TaskArtifactDriftItem {
  if (isActiveParallelStatus(opts.status) && opts.artifactKind === "task_readme") {
    return {
      path: opts.path,
      task_id: opts.taskId,
      artifact_kind: opts.artifactKind,
      classification: "active_parallel_task_artifact",
      action: "ignore_parallel_agent",
      status: opts.status,
      reason: "README belongs to an active task and may be owned by another parallel agent",
    };
  }
  if (opts.status === "DONE" && opts.artifactKind === "handoff") {
    return {
      path: opts.path,
      task_id: opts.taskId,
      artifact_kind: opts.artifactKind,
      classification: "stale_done_handoff",
      action: "cleanup_candidate",
      status: opts.status,
      reason: "handoff artifact belongs to a completed task and may be stale closure residue",
    };
  }
  return {
    path: opts.path,
    task_id: opts.taskId,
    artifact_kind: opts.artifactKind,
    classification: "unknown_task_artifact",
    action: "inspect",
    status: opts.status,
    reason: "artifact ownership could not be classified from task status and path",
  };
}

async function resolveTaskStatus(opts: {
  gitRoot: string;
  taskId: string;
}): Promise<TaskStatus | "unknown"> {
  try {
    const task = await readTask({
      cwd: opts.gitRoot,
      rootOverride: opts.gitRoot,
      taskId: opts.taskId,
    });
    return normalizeTaskStatus(task.frontmatter.status);
  } catch {
    return "unknown";
  }
}

async function detectTaskArtifactDrift(opts: {
  gitRoot: string;
  changedPaths: string[];
  workflowDir: string;
}): Promise<TaskArtifactDrift> {
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
  const taskStatusById = new Map<string, TaskStatus | "unknown">();
  for (const taskId of taskIds) {
    taskStatusById.set(taskId, await resolveTaskStatus({ gitRoot: opts.gitRoot, taskId }));
  }
  const items: TaskArtifactDriftItem[] = [];
  for (const matchedPath of matched) {
    const relative = matchedPath.slice(prefix.length);
    const [taskId, ...artifactParts] = relative.split("/");
    if (!taskId || taskId === "." || taskId === "..") continue;
    const artifactKind = inferTaskArtifactKind(artifactParts.join("/"));
    items.push(
      classifyTaskArtifactDriftItem({
        path: matchedPath,
        taskId,
        artifactKind,
        status: taskStatusById.get(taskId) ?? "unknown",
      }),
    );
  }
  const counts: Record<TaskArtifactClassification, number> = {
    active_parallel_task_artifact: 0,
    stale_done_handoff: 0,
    unknown_task_artifact: 0,
  };
  for (const item of items) {
    counts[item.classification] += 1;
  }
  const actionable = items.some((item) => item.action !== "ignore_parallel_agent");
  return {
    present: matched.length > 0,
    task_ids: [...taskIds].toSorted((a, b) => a.localeCompare(b)),
    paths: matched,
    actionable,
    items,
    counts,
  };
}

async function validateChangedGithubTitleArtifacts(opts: {
  gitRoot: string;
  changedPaths: string[];
  workflowDir: string;
}): Promise<MessageFormatGuard> {
  const workflowDir = normalizeRepoPath(opts.workflowDir).replace(/\/+$/, "");
  const prefix = `${workflowDir}/`;
  const suffix = "/pr/github-title.txt";
  const checkedPaths = opts.changedPaths
    .map((value) => normalizeRepoPath(value))
    .filter((value) => value.startsWith(prefix) && value.endsWith(suffix))
    .toSorted((a, b) => a.localeCompare(b));
  const errors: string[] = [];
  for (const relPath of checkedPaths) {
    const relative = relPath.slice(prefix.length);
    const taskId = relative.slice(0, -suffix.length);
    if (!taskId || taskId.includes("/")) {
      errors.push(`${relPath}: cannot infer task id from PR title artifact path`);
      continue;
    }
    const title = await readFile(path.join(opts.gitRoot, relPath), "utf8");
    const titleErrors: string[] = [];
    validateGithubPrTitleContents(title, taskId, titleErrors);
    errors.push(...titleErrors.map((message) => `${relPath}: ${message}`));
  }
  return {
    ok: errors.length === 0,
    checked_paths: checkedPaths,
    errors,
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
    actionable: false,
    items: [],
    counts: {
      active_parallel_task_artifact: 0,
      stale_done_handoff: 0,
      unknown_task_artifact: 0,
    },
  };
  let messageFormatGuard: MessageFormatGuard = {
    ok: true,
    checked_paths: [],
    errors: [],
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
