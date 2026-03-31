import type { AgentplaneConfig } from "@agentplaneorg/core";

import type { TaskBackend, TaskData } from "../../../backends/task-backend.js";
import { CliError } from "../../../shared/errors.js";
import {
  appendTaskCommentIntent,
  appendTaskEventIntent,
  setTaskFieldsIntent,
  setTaskSectionIntent,
  touchTaskDocMetaIntent,
  type TaskStoreIntent,
  type TaskStoreTaskPatch,
} from "../../shared/task-store.js";
import {
  dependencyWarningMessages,
  resolveTaskDependencyState,
  type DependencyState,
} from "./dependencies.js";
import { appendTaskEvent, normalizeTaskDocVersion } from "../shared.js";
import { ensureStatusTransitionAllowed, resolveCommentCommitWarning } from "./transitions.js";

type TaskComment = NonNullable<TaskData["comments"]>[number];

type BuildTaskStatusTransitionOptions = {
  task: TaskData;
  at: string;
  toStatus: TaskData["status"];
  eventAuthor: string;
  updatedBy: string;
  note?: string;
  comment?: TaskComment;
  commit?: TaskData["commit"] | null;
  extraFields?: TaskStoreTaskPatch;
};

type BuildTaskVerificationTransitionOptions = {
  task: TaskData;
  at: string;
  by: string;
  note: string;
  state: "ok" | "needs_rework";
  verificationSection: string;
  nextDoc: string;
  requiredSections: string[];
};

export type TaskTransitionWrite = {
  currentStatus: string;
  intents: TaskStoreIntent[];
  nextTask: TaskData;
};

export type TaskStatusTransitionDependencyPolicy =
  | { kind: "none" }
  | { kind: "require-ready"; failureMessage?: string };

export type TaskStatusTransitionCommentCommitPolicy = {
  enabled: boolean;
  action: string;
  confirmed: boolean;
  quiet: boolean;
};

export type ExecuteTaskStatusTransitionRequest = BuildTaskStatusTransitionOptions & {
  backend: Pick<TaskBackend, "getTask" | "getTasks">;
  config: AgentplaneConfig;
  force: boolean;
  dependencyPolicy?: TaskStatusTransitionDependencyPolicy;
  commentCommitPolicy?: TaskStatusTransitionCommentCommitPolicy;
};

export type TaskStatusTransitionExecution = TaskTransitionWrite & {
  dependencyState: DependencyState | null;
  deferredWarnings: string[];
};

function normalizeComments(task: TaskData): TaskComment[] {
  return Array.isArray(task.comments)
    ? task.comments.filter(
        (item): item is TaskComment =>
          !!item && typeof item.author === "string" && typeof item.body === "string",
      )
    : [];
}

function buildStatusTaskPatch(opts: BuildTaskStatusTransitionOptions): TaskStoreTaskPatch {
  const patch: TaskStoreTaskPatch = { status: opts.toStatus };
  if (opts.extraFields) Object.assign(patch, opts.extraFields);
  if (opts.commit !== undefined) {
    patch.commit = opts.commit;
  }
  return patch;
}

export function buildTaskStatusTransition(
  opts: BuildTaskStatusTransitionOptions,
): TaskTransitionWrite {
  const currentStatus = String(opts.task.status || "TODO").toUpperCase();
  const patch = buildStatusTaskPatch(opts);
  const statusEvent = {
    type: "status" as const,
    at: opts.at,
    author: opts.eventAuthor,
    from: currentStatus,
    to: opts.toStatus,
    note: opts.note,
  };
  const intents: TaskStoreIntent[] = [setTaskFieldsIntent(patch)];
  if (opts.comment) {
    intents.push(appendTaskCommentIntent(opts.comment));
  }
  intents.push(
    appendTaskEventIntent(statusEvent),
    touchTaskDocMetaIntent({
      updatedBy: opts.updatedBy,
      version: normalizeTaskDocVersion(opts.task.doc_version),
    }),
  );

  const nextTask: TaskData = {
    ...opts.task,
    ...patch,
    comments: opts.comment ? [...normalizeComments(opts.task), opts.comment] : opts.task.comments,
    events: appendTaskEvent(opts.task, statusEvent),
    doc_version: normalizeTaskDocVersion(opts.task.doc_version),
    doc_updated_at: opts.at,
    doc_updated_by: opts.updatedBy,
  };

  return { currentStatus, intents, nextTask };
}

export async function executeTaskStatusTransitionRequest(
  opts: ExecuteTaskStatusTransitionRequest,
): Promise<TaskStatusTransitionExecution> {
  const currentStatus = String(opts.task.status || "TODO").toUpperCase();
  ensureStatusTransitionAllowed({
    currentStatus,
    nextStatus: opts.toStatus,
    force: opts.force,
  });

  let dependencyState: DependencyState | null = null;
  const deferredWarnings: string[] = [];
  const dependencyPolicy = opts.dependencyPolicy ?? { kind: "none" };
  if (dependencyPolicy.kind === "require-ready" && !opts.force) {
    dependencyState = await resolveTaskDependencyState(opts.task, opts.backend);
    deferredWarnings.push(...dependencyWarningMessages(dependencyState));
    if (dependencyState.missing.length > 0 || dependencyState.incomplete.length > 0) {
      const warnings = [...new Set(deferredWarnings)];
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          dependencyPolicy.failureMessage ??
          `Task is not ready: ${opts.task.id} (use --force to override)`,
        context: {
          reason_code: "task_transition_dependencies_not_ready",
          deferred_warnings: warnings,
        },
      });
    }
  }

  if (opts.commentCommitPolicy) {
    const warning = resolveCommentCommitWarning({
      enabled: opts.commentCommitPolicy.enabled,
      config: opts.config,
      action: opts.commentCommitPolicy.action,
      confirmed: opts.commentCommitPolicy.confirmed,
      quiet: opts.commentCommitPolicy.quiet,
      statusFrom: currentStatus,
      statusTo: opts.toStatus,
    });
    if (warning) deferredWarnings.push(warning);
  }

  return {
    ...buildTaskStatusTransition(opts),
    dependencyState,
    deferredWarnings: [...new Set(deferredWarnings)],
  };
}

export function buildTaskVerificationTransition(
  opts: BuildTaskVerificationTransitionOptions,
): TaskTransitionWrite {
  const currentStatus = String(opts.task.status || "TODO").toUpperCase();
  const verification = {
    state: opts.state,
    updated_at: opts.at,
    updated_by: opts.by,
    note: opts.note,
  } as const;
  const patch: TaskStoreTaskPatch = {
    verification,
    ...(opts.state === "needs_rework" ? { status: "DOING", commit: null } : {}),
  };
  const verifyEvent = {
    type: "verify" as const,
    at: opts.at,
    author: opts.by,
    state: opts.state,
    note: opts.note,
  };
  const intents: TaskStoreIntent[] = [
    setTaskFieldsIntent(patch),
    setTaskSectionIntent({
      section: "Verification",
      text: opts.verificationSection,
      requiredSections: opts.requiredSections,
    }),
    appendTaskEventIntent(verifyEvent),
    touchTaskDocMetaIntent({ updatedBy: opts.by }),
  ];

  const nextTask: TaskData = {
    ...opts.task,
    ...patch,
    doc: opts.nextDoc,
    events: appendTaskEvent(opts.task, verifyEvent),
    doc_version: normalizeTaskDocVersion(opts.task.doc_version),
    doc_updated_at: opts.at,
    doc_updated_by: opts.by,
  };

  return { currentStatus, intents, nextTask };
}
