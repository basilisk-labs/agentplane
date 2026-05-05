import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "../config/config.js";
import { atomicWriteFile } from "../fs/atomic-write.js";
import { resolveProject } from "../project/project-root.js";
import {
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
} from "./task-artifact-schema.js";
import { parseTaskReadme, renderTaskReadme, taskReadmeDocBody } from "./task-readme.js";
import { updateTaskReadmeAtomic } from "./task-readme-io.js";
import { taskDocToSectionMap } from "./task-doc.js";
import {
  buildDefaultTaskDoc,
  DEFAULT_TASK_DOC_VERSION,
  getTaskDocContract,
  normalizeTaskDocVersion,
  type TaskDocSections,
  type TaskDocVersion,
} from "./task-doc-contract.js";
import { applyTaskDocMutations } from "./task-doc-mutation.js";
import { generateTaskId } from "./task-id.js";
import type { TaskStatus } from "./task-status.js";

export { validateTaskDocMetadata } from "./task-doc-contract.js";

export type TaskPriority = "low" | "normal" | "med" | "high";
export type PlanApprovalState = "pending" | "approved" | "rejected";
export type PlanApproval = {
  state: PlanApprovalState;
  updated_at: string | null;
  updated_by: string | null;
  note: string | null;
};

export type VerificationState = "pending" | "ok" | "needs_rework";
export type VerificationResult = {
  state: VerificationState;
  updated_at: string | null;
  updated_by: string | null;
  note: string | null;
};

export type TaskEventType = "status" | "comment" | "verify";

export type TaskEvent = {
  type: TaskEventType;
  at: string;
  author: string;
  from?: string;
  to?: string;
  state?: string;
  note?: string;
  body?: string;
};

export type TaskOrigin = {
  system: string;
  issue_id?: string;
  url?: string;
  recipe_id?: string;
  scenario_id?: string;
  recipe_version?: string;
  run_id?: string;
  [key: string]: string | undefined;
};

export type TaskRunnerOutcomeStatus = "prepared" | "running" | "success" | "failed" | "cancelled";

export type TaskRunnerExecutionMetrics = {
  duration_ms?: number;
  stdout_bytes?: number;
  stderr_bytes?: number;
  output_last_message_bytes?: number | null;
};

export type TaskRunnerEvidence = {
  evidence_paths?: string[];
  changed_paths?: string[];
  files_changed_count?: number;
  tests_run?: string[];
  verification_candidates?: string[];
};

export type TaskRunnerTarget = {
  kind: "task" | "recipe_scenario";
  task_id?: string;
  recipe_id?: string;
  scenario_id?: string;
};

export type TaskRunnerHistoryEntry = {
  run_id: string;
  status: TaskRunnerOutcomeStatus;
  adapter_id: string;
  mode: "execute" | "dry_run";
  updated_at: string;
  started_at?: string;
  ended_at?: string;
  exit_code: number | null;
  target: TaskRunnerTarget;
  summary?: string;
  output_paths?: string[];
  stdout_summary?: string;
  stderr_summary?: string;
  metrics?: TaskRunnerExecutionMetrics;
  evidence?: TaskRunnerEvidence;
};

export type TaskRunnerOutcome = TaskRunnerHistoryEntry & {
  history?: TaskRunnerHistoryEntry[];
};

export type TaskFrontmatter = {
  id: string;
  title: string;
  result_summary?: string;
  risk_level?: "low" | "med" | "high";
  breaking?: boolean;
  status: TaskStatus;
  priority: TaskPriority;
  owner: string;
  revision?: number;
  origin?: TaskOrigin;
  depends_on: string[];
  tags: string[];
  verify: string[];
  plan_approval?: PlanApproval;
  verification?: VerificationResult;
  runner?: TaskRunnerOutcome;
  comments: { author: string; body: string }[];
  events?: TaskEvent[];
  doc_version: TaskDocVersion;
  doc_updated_at: string;
  doc_updated_by: string;
  description: string;
  sections?: TaskDocSections;
  commit?: { hash: string; message: string } | null;
  dirty?: boolean;
  id_source?: string;
};

export type TaskRecord = {
  id: string;
  frontmatter: TaskFrontmatter;
  body: string;
  readmePath: string;
};

function nowIso(): string {
  return new Date().toISOString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await readFile(filePath, "utf8");
    return true;
  } catch {
    return false;
  }
}

export async function getTasksDir(opts: { cwd: string; rootOverride?: string | null }): Promise<{
  gitRoot: string;
  tasksDir: string;
  idSuffixLengthDefault: number;
}> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const tasksDir = path.join(resolved.gitRoot, loaded.config.paths.workflow_dir);
  return {
    gitRoot: resolved.gitRoot,
    tasksDir,
    idSuffixLengthDefault: loaded.config.tasks.id_suffix_length_default,
  };
}

export function taskReadmePath(tasksDir: string, taskId: string): string {
  return path.join(tasksDir, taskId, "README.md");
}

export async function createTask(opts: {
  cwd: string;
  rootOverride?: string | null;
  title: string;
  description: string;
  owner: string;
  priority: TaskPriority;
  tags: string[];
  dependsOn: string[];
  verify: string[];
  idGenerator?: typeof generateTaskId;
}): Promise<{ id: string; readmePath: string }> {
  const { tasksDir, idSuffixLengthDefault } = await getTasksDir({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  await mkdir(tasksDir, { recursive: true });

  const suffixLength = idSuffixLengthDefault;
  const id = await (opts.idGenerator ?? generateTaskId)({
    length: suffixLength,
    attempts: 20,
    isAvailable: async (taskId) => !(await fileExists(taskReadmePath(tasksDir, taskId))),
  });

  const readmePath = taskReadmePath(tasksDir, id);
  const frontmatter: TaskFrontmatter = {
    id,
    title: opts.title,
    status: "TODO",
    priority: opts.priority,
    owner: opts.owner,
    revision: 1,
    origin: { system: "manual" },
    depends_on: opts.dependsOn,
    tags: opts.tags,
    verify: opts.verify,
    plan_approval: {
      state: "pending",
      updated_at: null,
      updated_by: null,
      note: null,
    },
    verification: {
      state: "pending",
      updated_at: null,
      updated_by: null,
      note: null,
    },
    comments: [],
    events: [],
    doc_version: DEFAULT_TASK_DOC_VERSION,
    doc_updated_at: nowIso(),
    doc_updated_by: opts.owner,
    description: opts.description,
  };

  const body = buildDefaultTaskDoc(frontmatter.doc_version);
  frontmatter.sections = taskDocToSectionMap(body);
  validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(frontmatter));
  const text = renderTaskReadme(frontmatter as unknown as Record<string, unknown>, body);
  await atomicWriteFile(readmePath, text, "utf8");
  return { id, readmePath };
}

export async function setTaskDocSection(opts: {
  cwd: string;
  rootOverride?: string | null;
  taskId: string;
  section: string;
  text: string;
  updatedBy?: string | null;
}): Promise<{ readmePath: string }> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const loaded = await loadConfig(resolved.agentplaneDir);

  const tasksDir = path.join(resolved.gitRoot, loaded.config.paths.workflow_dir);
  const readmePath = taskReadmePath(tasksDir, opts.taskId);
  await updateTaskReadmeAtomic(readmePath, (parsed) => {
    const docVersion = normalizeTaskDocVersion(parsed.frontmatter.doc_version);
    const requiredSections = [...getTaskDocContract(docVersion).sections];
    const canonicalDoc = taskReadmeDocBody(parsed.frontmatter, parsed.body);
    const mutation = applyTaskDocMutations(
      {
        doc: canonicalDoc,
        doc_version: docVersion,
        doc_updated_by: parsed.frontmatter.doc_updated_by,
        owner: parsed.frontmatter.owner,
        comments: Array.isArray(parsed.frontmatter.comments)
          ? parsed.frontmatter.comments
              .filter((comment) => isRecord(comment))
              .map((comment) => ({ author: comment.author as string | undefined }))
          : null,
      },
      [
        {
          kind: "set-section",
          section: opts.section,
          text: opts.text,
          requiredSections,
        },
        {
          kind: "touch-doc-meta",
          updatedBy: opts.updatedBy ?? undefined,
        },
      ],
      { now: nowIso() },
    );
    const nextFrontmatter: Record<string, unknown> = {
      ...parsed.frontmatter,
      doc_version: mutation.doc_version,
      doc_updated_at: mutation.doc_updated_at,
      doc_updated_by: mutation.doc_updated_by,
      sections: mutation.sections,
    };
    validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(nextFrontmatter));
    return { frontmatter: nextFrontmatter, body: mutation.doc };
  });
  return { readmePath };
}

export async function readTask(opts: {
  cwd: string;
  rootOverride?: string | null;
  taskId: string;
}): Promise<TaskRecord> {
  const { tasksDir } = await getTasksDir({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const readmePath = taskReadmePath(tasksDir, opts.taskId);
  const text = await readFile(readmePath, "utf8");
  const parsed = parseTaskReadme(text);
  const frontmatter = validateTaskReadmeFrontmatter(
    withTaskReadmeFrontmatterDefaults({
      ...parsed.frontmatter,
      id:
        typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
          ? parsed.frontmatter.id
          : opts.taskId,
    }),
  );
  return {
    id: opts.taskId,
    frontmatter,
    body: taskReadmeDocBody(frontmatter as unknown as Record<string, unknown>, parsed.body),
    readmePath,
  };
}

export async function listTasks(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<TaskRecord[]> {
  const { tasksDir } = await getTasksDir({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const entries = await readdir(tasksDir, { withFileTypes: true }).catch(() => []);
  const ids = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  const tasks: TaskRecord[] = [];
  for (const id of ids) {
    const readmePath = taskReadmePath(tasksDir, id);
    try {
      const text = await readFile(readmePath, "utf8");
      const parsed = parseTaskReadme(text);
      const fallbackId =
        typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
          ? parsed.frontmatter.id
          : id;
      const frontmatter = validateTaskReadmeFrontmatter(
        withTaskReadmeFrontmatterDefaults({
          ...parsed.frontmatter,
          id: fallbackId,
        }),
      );
      tasks.push({
        id,
        frontmatter,
        body: taskReadmeDocBody(frontmatter as unknown as Record<string, unknown>, parsed.body),
        readmePath,
      });
    } catch {
      // Skip unreadable/broken tasks for now; lint will handle this later.
    }
  }

  return tasks.toSorted((a, b) => a.id.localeCompare(b.id));
}
