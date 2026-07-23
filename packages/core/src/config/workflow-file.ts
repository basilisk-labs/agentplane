import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

import { atomicWriteFile } from "../fs/atomic-write.js";
import { isRecord } from "../types/guards.js";
import type { AgentplaneConfig } from "./validation.js";
import { parseWorkflowFrontMatter, type WorkflowV2FrontMatter } from "./workflow-contract.js";

export type WorkflowMarkdown = {
  frontMatter: Record<string, unknown>;
  body: string;
};

const DEFAULT_WORKFLOW_BODY = `## Prompt Template
Repository: {{ runtime.repo_name }}
Workflow mode: {{ workflow.mode }}

## Checks
- preflight
- verify
- finish

## Fallback
last_known_good: .agentplane/workflows/last-known-good.md
`;

function cloneRecord(value: unknown): Record<string, unknown> {
  return isRecord(value) ? structuredClone(value) : {};
}

function splitWorkflowMarkdown(text: string): WorkflowMarkdown {
  const normalized = text.replaceAll("\r\n", "\n");
  if (!normalized.startsWith("---\n")) return { frontMatter: {}, body: normalized };
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) return { frontMatter: {}, body: "" };
  const parsed = YAML.parse(normalized.slice(4, end)) as unknown;
  return {
    frontMatter: isRecord(parsed) ? parsed : {},
    body: normalized.slice(end + 5),
  };
}

export async function readWorkflowMarkdown(workflowPath: string): Promise<WorkflowMarkdown | null> {
  try {
    return splitWorkflowMarkdown(await readFile(workflowPath, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException | undefined)?.code === "ENOENT") return null;
    throw error;
  }
}

export function workflowFrontMatterToConfigRaw(
  frontMatter: Record<string, unknown>,
): Record<string, unknown> {
  const normalized = parseWorkflowFrontMatter(frontMatter);
  const normalizedRecord = normalized as unknown as Record<string, unknown>;
  const workflow = normalized.workflow;
  const approvals = cloneRecord(normalized.approvals);
  const workspace = cloneRecord(normalized.workspace);
  const tasks = cloneRecord(normalized.tasks);
  const raw: Record<string, unknown> = { workflow_mode: workflow.mode };
  for (const key of [
    "status_commit_policy",
    "commit_automation",
    "finish_auto_status_commit",
    "artifacts_language",
    "closure_commit_requires_approval",
  ]) {
    if (workflow[key] !== undefined) raw[key] = workflow[key];
  }
  if (isRecord(workflow.close_commit)) raw.close_commit = workflow.close_commit;
  raw.agents = { approvals };

  const paths = cloneRecord(normalized.paths);
  for (const key of ["agents_dir", "tasks_path", "workflow_dir", "worktrees_dir"]) {
    if (workspace[key] !== undefined) paths[key] = workspace[key];
  }
  if (Object.keys(paths).length > 0) raw.paths = paths;

  if (isRecord(tasks.backend)) raw.tasks_backend = tasks.backend;
  delete tasks.backend;
  if (Object.keys(tasks).length > 0) raw.tasks = tasks;

  for (const key of [
    "branch",
    "framework",
    "execution",
    "runner",
    "feedback",
    "recipes",
    "commit",
    "acr",
    "scheduler",
    "evaluator",
    "observability",
  ]) {
    if (normalizedRecord[key] !== undefined) raw[key] = normalizedRecord[key];
  }

  return raw;
}

export function configRawToWorkflowFrontMatter(
  raw: Record<string, unknown>,
  baseFrontMatter?: Record<string, unknown>,
): WorkflowV2FrontMatter {
  const config = raw as unknown as AgentplaneConfig & Record<string, unknown>;
  const base = baseFrontMatter
    ? parseWorkflowFrontMatter(baseFrontMatter)
    : parseWorkflowFrontMatter({
        version: 2,
        workflow: {
          mode: "direct",
          status_commit_policy: "warn",
          commit_automation: "manual",
          finish_auto_status_commit: false,
          close_commit: { direct_dirty_policy: "allow_other_task_readmes" },
          artifacts_language: "any",
          closure_commit_requires_approval: false,
        },
        owners: { orchestrator: "ORCHESTRATOR" },
        approvals: {
          require_plan: true,
          require_verify: true,
          require_network: true,
        },
        workspace: {
          agents_dir: ".agentplane/agents",
          tasks_path: ".agentplane/tasks.json",
          workflow_dir: ".agentplane/tasks",
          worktrees_dir: ".agentplane/worktrees",
          isolation: "per_task",
          cleanup: "after_finish",
        },
        tasks: {
          backend: { config_path: ".agentplane/backends/local/backend.json" },
        },
        retry_policy: {
          normal_exit_continuation: true,
          abnormal_backoff: "exponential",
          max_attempts: 5,
        },
        timeouts: { stall_seconds: 900 },
        in_scope_paths: ["**"],
      });
  const paths = cloneRecord(config.paths);
  const agents = cloneRecord(config.agents);
  const tasks = cloneRecord(config.tasks);
  const baseWorkflow = cloneRecord(base.workflow);
  const baseWorkspace = cloneRecord(base.workspace);
  const baseTasks = cloneRecord(base.tasks);
  const next: Record<string, unknown> = {
    ...structuredClone(base),
    version: 2,
    workflow: {
      ...baseWorkflow,
      mode: config.workflow_mode ?? baseWorkflow.mode ?? "direct",
      status_commit_policy:
        config.status_commit_policy ?? baseWorkflow.status_commit_policy ?? "warn",
      commit_automation: config.commit_automation ?? baseWorkflow.commit_automation ?? "manual",
      finish_auto_status_commit:
        config.finish_auto_status_commit ?? baseWorkflow.finish_auto_status_commit ?? false,
      close_commit: config.close_commit ??
        baseWorkflow.close_commit ?? { direct_dirty_policy: "allow_other_task_readmes" },
      artifacts_language: config.artifacts_language ?? baseWorkflow.artifacts_language ?? "any",
      closure_commit_requires_approval:
        config.closure_commit_requires_approval ??
        baseWorkflow.closure_commit_requires_approval ??
        false,
    },
    owners: structuredClone(base.owners),
    approvals: {
      ...cloneRecord(base.approvals),
      ...cloneRecord(agents.approvals),
    },
    workspace: {
      ...baseWorkspace,
      agents_dir: paths.agents_dir ?? baseWorkspace.agents_dir ?? ".agentplane/agents",
      tasks_path: paths.tasks_path ?? baseWorkspace.tasks_path ?? ".agentplane/tasks.json",
      workflow_dir: paths.workflow_dir ?? baseWorkspace.workflow_dir ?? ".agentplane/tasks",
      worktrees_dir: paths.worktrees_dir ?? baseWorkspace.worktrees_dir ?? ".agentplane/worktrees",
      isolation: baseWorkspace.isolation ?? "per_task",
      cleanup: baseWorkspace.cleanup ?? "after_finish",
    },
    tasks: {
      ...baseTasks,
      backend: config.tasks_backend ??
        baseTasks.backend ?? { config_path: ".agentplane/backends/local/backend.json" },
      ...tasks,
    },
    branch: config.branch ??
      base.branch ?? { task_prefix: "task", task_close_prefix: "task-close" },
    framework: config.framework ??
      base.framework ?? {
        source: "https://github.com/basilisk-labs/agentplane",
        last_update: null,
        cli: { expected_version: null },
      },
    execution: config.execution ?? base.execution,
    runner: config.runner ?? base.runner,
    feedback: config.feedback ?? base.feedback,
    recipes: config.recipes ?? base.recipes,
    commit: config.commit ?? base.commit,
    acr: config.acr ?? base.acr,
    scheduler: config.scheduler ??
      base.scheduler ?? {
        concurrency: 1,
        poll_interval_ms: 30_000,
        retry_policy: {
          normal_exit_continuation: true,
          abnormal_backoff: "exponential",
          max_attempts: 5,
        },
      },
    evaluator: config.evaluator ??
      base.evaluator ?? {
        verdicts: [
          "pass",
          "rework",
          "blocked_external",
          "human_review",
          "infra_failed",
          "no_change",
        ],
        skepticism_level: "standard",
        required_checks: ["agentplane doctor", "node .agentplane/policy/check-routing.mjs"],
      },
    observability: config.observability ??
      base.observability ?? {
        runs_dir: ".agentplane/tasks/<task-id>/runs",
        events: "jsonl",
      },
    retry_policy: structuredClone(base.retry_policy),
    timeouts: structuredClone(base.timeouts),
    in_scope_paths: [...base.in_scope_paths],
  };

  return parseWorkflowFrontMatter(next);
}

export async function readWorkflowConfigRaw(agentplaneDir: string): Promise<{
  path: string;
  exists: boolean;
  raw: Record<string, unknown>;
  frontMatter: WorkflowV2FrontMatter | null;
}> {
  const workflowPath = path.join(agentplaneDir, "WORKFLOW.md");
  const workflow = await readWorkflowMarkdown(workflowPath);
  if (!workflow) return { path: workflowPath, exists: false, raw: {}, frontMatter: null };
  const frontMatter = parseWorkflowFrontMatter(workflow.frontMatter);
  return {
    path: workflowPath,
    exists: true,
    raw: workflowFrontMatterToConfigRaw(frontMatter),
    frontMatter,
  };
}

export async function writeWorkflowConfigRaw(
  agentplaneDir: string,
  raw: Record<string, unknown>,
): Promise<string> {
  const workflowPath = path.join(agentplaneDir, "WORKFLOW.md");
  const lastKnownGoodPath = path.join(agentplaneDir, "workflows", "last-known-good.md");
  const current = await readWorkflowMarkdown(workflowPath);
  const frontMatter = configRawToWorkflowFrontMatter(raw, current?.frontMatter);
  const yaml = YAML.stringify(frontMatter, { lineWidth: 0, sortMapEntries: false }).trimEnd();
  const currentBody = current?.body.trimEnd();
  const body = (
    currentBody === undefined || currentBody === "" ? DEFAULT_WORKFLOW_BODY : currentBody
  ).trimEnd();
  const workflowText = `---\n${yaml}\n---\n\n${body}\n`;
  await atomicWriteFile(workflowPath, workflowText, "utf8");
  await mkdir(path.dirname(lastKnownGoodPath), { recursive: true });
  await atomicWriteFile(lastKnownGoodPath, workflowText, "utf8");
  return workflowPath;
}
