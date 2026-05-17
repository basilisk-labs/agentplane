import { createHash } from "node:crypto";
import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import {
  ensureDocSections,
  normalizeTaskStatus,
  setMarkdownSection,
} from "@agentplaneorg/core/tasks";

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
import {
  extractDocSection,
  normalizeTaskDocVersion,
  normalizeVerificationSectionLayout,
  VERIFICATION_RESULTS_BEGIN,
  VERIFICATION_RESULTS_END,
} from "./docs.js";
import {
  appendTaskEvent,
  ensureStatusTransitionAllowed,
  resolveCommentCommitWarning,
} from "./transition-rules.js";

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
  state: "ok" | "needs_rework" | "blocked_external";
  attempts: number;
  verificationSection: string;
  nextDoc: string;
  requiredSections: string[];
  maxReworkAttempts: number;
};

export type ExecuteTaskVerificationTransitionRequest = {
  task: TaskData;
  at: string;
  by: string;
  note: string;
  state: "ok" | "needs_rework";
  details?: string | null;
  doc: string;
  requiredSections: string[];
  maxReworkAttempts?: number;
};

export type TaskVerificationTransitionExecution = TaskTransitionWrite & {
  verificationSection: string;
  nextDoc: string;
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

export function readDeferredTaskTransitionWarnings(error: unknown): string[] {
  if (!(error instanceof CliError)) return [];
  const warnings = error.context?.deferred_warnings;
  if (!Array.isArray(warnings)) return [];
  return [
    ...new Set(
      warnings.filter((item): item is string => typeof item === "string" && item.length > 0),
    ),
  ];
}

function normalizeComments(task: TaskData): TaskComment[] {
  return Array.isArray(task.comments)
    ? task.comments.filter(
        (item): item is TaskComment =>
          !!item && typeof item.author === "string" && typeof item.body === "string",
      )
    : [];
}

function appendVerificationEntryBetweenMarkers(
  sectionText: string,
  entryText: string,
  version: 2 | 3,
): string {
  const ensured = normalizeVerificationSectionLayout(sectionText, version);
  const beginIdx = ensured.indexOf(VERIFICATION_RESULTS_BEGIN);
  const endIdx = ensured.indexOf(VERIFICATION_RESULTS_END);
  if (beginIdx === -1 || endIdx === -1 || endIdx <= beginIdx) {
    throw new Error("Verification results markers are malformed");
  }

  const beforeEnd = ensured.slice(0, endIdx).trimEnd();
  const afterEnd = ensured.slice(endIdx).trimStart();
  const entry = entryText.trimEnd();

  const parts: string[] = [
    beforeEnd,
    ...(beforeEnd.endsWith(VERIFICATION_RESULTS_BEGIN) ? [] : [""]),
    entry,
    "",
    afterEnd,
  ];
  return parts.join("\n").trimEnd();
}

function trimLineEndings(text: string): string {
  return text
    .replaceAll("\r\n", "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

function renderVerificationEntry(opts: {
  at: string;
  state: "ok" | "needs_rework" | "blocked_external";
  attempts: number;
  by: string;
  note: string;
  details?: string | null;
  verifyStepsRef?: string | null;
}): string {
  const lines = [
    `### ${opts.at} — VERIFY — ${opts.state}`,
    "",
    `By: ${opts.by}`,
    "",
    `Note: ${opts.note}`,
    `Attempts: ${opts.attempts}`,
  ];
  const verifyStepsRef = (opts.verifyStepsRef ?? "").trim();
  if (verifyStepsRef) {
    lines.push("", `VerifyStepsRef: ${verifyStepsRef}`);
  }
  const details = trimLineEndings(opts.details ?? "");
  if (details) {
    lines.push("", "Details:", "", details);
  }
  return `${trimLineEndings(lines.join("\n"))}\n`;
}

function sha256Hex(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
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
  const currentStatus = normalizeTaskStatus(opts.task.status);
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
  const currentStatus = normalizeTaskStatus(opts.task.status);
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
  const verification = {
    state: opts.state,
    attempts: opts.attempts,
    updated_at: opts.at,
    updated_by: opts.by,
    note: opts.note,
  } as const;
  const currentStatus = normalizeTaskStatus(opts.task.status);
  const patch: TaskStoreTaskPatch = {
    verification,
    ...(opts.state === "needs_rework" || opts.state === "blocked_external"
      ? {
          status:
            opts.state === "blocked_external" ||
            (opts.maxReworkAttempts > 0 && verification.attempts > opts.maxReworkAttempts)
              ? "BLOCKED"
              : "DOING",
          commit: null,
        }
      : {}),
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

export function executeTaskVerificationTransitionRequest(
  opts: ExecuteTaskVerificationTransitionRequest,
): TaskVerificationTransitionExecution {
  const maxReworkAttempts =
    typeof opts.maxReworkAttempts === "number" &&
    Number.isInteger(opts.maxReworkAttempts) &&
    opts.maxReworkAttempts > 0
      ? opts.maxReworkAttempts
      : 3;
  const baseDoc = ensureDocSections(opts.doc, opts.requiredSections);
  const verificationSection = extractDocSection(baseDoc, "Verification") ?? "";
  const verifySteps = extractDocSection(baseDoc, "Verify Steps");
  const verifyStepsHash = verifySteps
    ? sha256Hex(verifySteps.replaceAll("\r\n", "\n").trim())
    : null;
  const docVersion = normalizeTaskDocVersion(opts.task.doc_version);
  const verifyStepsRef = [
    `doc_version=${String(docVersion)}`,
    `doc_updated_at=${String(opts.task.doc_updated_at ?? "missing")}`,
    `excerpt_hash=sha256:${verifyStepsHash ?? "missing"}`,
  ].join(", ");
  const currentAttempts =
    typeof opts.task.verification?.attempts === "number" &&
    Number.isInteger(opts.task.verification.attempts) &&
    opts.task.verification.attempts >= 0
      ? opts.task.verification.attempts
      : 0;
  const nextAttempts = opts.state === "needs_rework" ? currentAttempts + 1 : 0;
  const willBlockRework = opts.state === "needs_rework" && nextAttempts > maxReworkAttempts;
  const nextState = willBlockRework ? "blocked_external" : opts.state;
  const entry = renderVerificationEntry({
    at: opts.at,
    state: nextState,
    attempts: nextAttempts,
    by: opts.by,
    note: opts.note,
    details: opts.details ?? null,
    verifyStepsRef,
  });
  const nextVerification = appendVerificationEntryBetweenMarkers(
    verificationSection,
    entry,
    docVersion,
  );
  const nextDoc = ensureDocSections(
    setMarkdownSection(baseDoc, "Verification", nextVerification),
    opts.requiredSections,
  );
  const transition = buildTaskVerificationTransition({
    task: opts.task,
    at: opts.at,
    by: opts.by,
    note: opts.note,
    state: nextState,
    maxReworkAttempts,
    attempts: nextAttempts,
    verificationSection: nextVerification,
    nextDoc,
    requiredSections: opts.requiredSections,
  });

  return {
    ...transition,
    verificationSection: nextVerification,
    nextDoc,
  };
}
