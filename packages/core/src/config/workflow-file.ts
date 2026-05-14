import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import YAML from "yaml";

import { atomicWriteFile } from "../fs/atomic-write.js";
import { isRecord } from "../types/guards.js";
import type { AgentplaneConfig } from "./validation.js";

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

function workflowSection(raw: Record<string, unknown>): Record<string, unknown> {
  return isRecord(raw.workflow) ? raw.workflow : raw;
}

export function workflowFrontMatterToConfigRaw(
  frontMatter: Record<string, unknown>,
): Record<string, unknown> {
  const workflow = workflowSection(frontMatter);
  const approvals = cloneRecord(frontMatter.approvals);
  const workspace = cloneRecord(frontMatter.workspace);
  const tasks = cloneRecord(frontMatter.tasks);
  const raw: Record<string, unknown> = {};

  const mode = workflow.mode ?? frontMatter.mode;
  if (mode !== undefined) raw.workflow_mode = mode;
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
  if (Object.keys(approvals).length > 0) raw.agents = { approvals };

  const paths = cloneRecord(frontMatter.paths);
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
    "scheduler",
    "evaluator",
    "observability",
  ]) {
    if (frontMatter[key] !== undefined) raw[key] = frontMatter[key];
  }

  return raw;
}

export function configRawToWorkflowFrontMatter(
  raw: Record<string, unknown>,
): Record<string, unknown> {
  const config = raw as unknown as AgentplaneConfig & Record<string, unknown>;
  const paths = cloneRecord(config.paths);
  const agents = cloneRecord(config.agents);
  const tasks = cloneRecord(config.tasks);

  return {
    version: 2,
    workflow: {
      mode: config.workflow_mode ?? "direct",
      status_commit_policy: config.status_commit_policy ?? "warn",
      commit_automation: config.commit_automation ?? "manual",
      finish_auto_status_commit: config.finish_auto_status_commit ?? false,
      close_commit: config.close_commit ?? { direct_dirty_policy: "allow_other_task_readmes" },
      artifacts_language: config.artifacts_language ?? "any",
      closure_commit_requires_approval: config.closure_commit_requires_approval ?? false,
    },
    owners: { orchestrator: "ORCHESTRATOR" },
    approvals: cloneRecord(agents.approvals),
    workspace: {
      agents_dir: paths.agents_dir ?? ".agentplane/agents",
      tasks_path: paths.tasks_path ?? ".agentplane/tasks.json",
      workflow_dir: paths.workflow_dir ?? ".agentplane/tasks",
      worktrees_dir: paths.worktrees_dir ?? ".agentplane/worktrees",
      isolation: "per_task",
      cleanup: "after_finish",
    },
    tasks: {
      backend: config.tasks_backend ?? { config_path: ".agentplane/backends/local/backend.json" },
      ...tasks,
    },
    branch: config.branch ?? { task_prefix: "task" },
    framework: config.framework ?? {
      source: "https://github.com/basilisk-labs/agentplane",
      last_update: null,
      cli: { expected_version: null },
    },
    execution: config.execution,
    runner: config.runner,
    feedback: config.feedback,
    recipes: config.recipes,
    commit: config.commit,
    scheduler: config.scheduler ?? {
      concurrency: 1,
      poll_interval_ms: 30_000,
      retry_policy: {
        normal_exit_continuation: true,
        abnormal_backoff: "exponential",
        max_attempts: 5,
      },
    },
    evaluator: config.evaluator ?? {
      verdicts: ["pass", "rework", "blocked_external", "human_review", "infra_failed", "no_change"],
      required_checks: ["agentplane doctor", "node .agentplane/policy/check-routing.mjs"],
    },
    observability: config.observability ?? {
      runs_dir: ".agentplane/runs",
      events: "jsonl",
    },
    retry_policy: {
      normal_exit_continuation: true,
      abnormal_backoff: "exponential",
      max_attempts: 5,
    },
    timeouts: { stall_seconds: 900 },
    in_scope_paths: ["**"],
  };
}

export async function readWorkflowConfigRaw(agentplaneDir: string): Promise<{
  path: string;
  exists: boolean;
  raw: Record<string, unknown>;
}> {
  const workflowPath = path.join(agentplaneDir, "WORKFLOW.md");
  const workflow = await readWorkflowMarkdown(workflowPath);
  if (!workflow) return { path: workflowPath, exists: false, raw: {} };
  return {
    path: workflowPath,
    exists: true,
    raw: workflowFrontMatterToConfigRaw(workflow.frontMatter),
  };
}

export async function writeWorkflowConfigRaw(
  agentplaneDir: string,
  raw: Record<string, unknown>,
): Promise<string> {
  const workflowPath = path.join(agentplaneDir, "WORKFLOW.md");
  const lastKnownGoodPath = path.join(agentplaneDir, "workflows", "last-known-good.md");
  const current = await readWorkflowMarkdown(workflowPath);
  const frontMatter = configRawToWorkflowFrontMatter(raw);
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
