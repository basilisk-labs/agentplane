import path from "node:path";

import { renderTaskDocFromSections, taskDocToSectionMap } from "@agentplaneorg/core";

import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import type { TaskEvent } from "../../backends/task-backend.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  taskDataToFrontmatter,
} from "../../commands/shared/task-backend.js";
import { gitCurrentBranch } from "../../commands/shared/git-ops.js";
import { resolveTaskDependencyState } from "../../commands/task/shared.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import type {
  RunnerDependencyState,
  RunnerRepositoryContext,
  RunnerTaskContext,
  RunnerTaskContextCompaction,
  RunnerTaskContextCompactionEntry,
} from "../types.js";

export type RunnerTaskContextEnvelope = {
  repository: RunnerRepositoryContext;
  task: RunnerTaskContext;
};

const TRUNCATED_MARKER = "\n\n[TRUNCATED]";
const OMITTED_SECTION_MARKER = "[TRUNCATED: omitted due to task context budget]";

export const RUNNER_TASK_CONTEXT_BUDGETS = {
  doc_max_bytes: 24_576,
  section_max_bytes: 3072,
  sections_total_max_bytes: 20_480,
  comments_max_count: 20,
  comment_body_max_bytes: 1024,
  comments_total_max_bytes: 12_288,
  events_max_count: 40,
  event_note_max_bytes: 768,
  events_total_max_bytes: 16_384,
} as const;

function toRunnerDependencyState(dep: {
  dependsOn: string[];
  missing: string[];
  incomplete: string[];
}): RunnerDependencyState {
  const missing = [...dep.missing];
  const incomplete = [...dep.incomplete];
  const completed = dep.dependsOn.filter(
    (taskId) => !missing.includes(taskId) && !incomplete.includes(taskId),
  );
  return {
    ready: missing.length === 0 && incomplete.length === 0,
    missing,
    incomplete,
    completed,
  };
}

function utf8Bytes(text: string): number {
  return Buffer.byteLength(text, "utf8");
}

function truncateUtf8(text: string, maxBytes: number, marker = TRUNCATED_MARKER): string {
  if (maxBytes <= 0) return "";
  if (utf8Bytes(text) <= maxBytes) return text;
  const markerBytes = utf8Bytes(marker);
  if (markerBytes >= maxBytes) {
    let head = "";
    for (const char of marker) {
      const next = head + char;
      if (utf8Bytes(next) > maxBytes) break;
      head = next;
    }
    return head;
  }
  let head = "";
  for (const char of text) {
    const candidate = head + char;
    if (utf8Bytes(candidate) + markerBytes > maxBytes) break;
    head = candidate;
  }
  return `${head}${marker}`;
}

function compactByTotalBudget<T>(opts: {
  items: T[];
  maxCount: number;
  maxTotalBytes: number;
  measure: (item: T) => number;
}): T[] {
  const selected = opts.items.slice(-opts.maxCount);
  while (
    selected.length > 1 &&
    selected.reduce((sum, item) => sum + opts.measure(item), 0) > opts.maxTotalBytes
  ) {
    selected.shift();
  }
  return selected;
}

function measureComments(comments: { author: string; body: string }[]): number {
  return utf8Bytes(JSON.stringify(comments));
}

function measureEvents(events: TaskEvent[]): number {
  return utf8Bytes(JSON.stringify(events));
}

function prioritizeSections(sections: Record<string, string>): [string, string][] {
  const preferredOrder = [
    "Summary",
    "Scope",
    "Plan",
    "Verify Steps",
    "Verification",
    "Rollback Plan",
    "Findings",
  ];
  const entries = Object.entries(sections);
  const indexByKey = new Map(entries.map(([key], index) => [key, index]));
  return entries.toSorted(([left], [right]) => {
    const leftPreferred = preferredOrder.indexOf(left);
    const rightPreferred = preferredOrder.indexOf(right);
    if (leftPreferred !== -1 && rightPreferred !== -1) return leftPreferred - rightPreferred;
    if (leftPreferred !== -1) return -1;
    if (rightPreferred !== -1) return 1;
    return (indexByKey.get(left) ?? 0) - (indexByKey.get(right) ?? 0);
  });
}

function compactSections(sections: Record<string, string>): {
  sections: Record<string, string>;
  doc: string;
  compaction: RunnerTaskContextCompaction["sections"];
  docCompaction: RunnerTaskContextCompaction["doc"];
} {
  const originalEntries = prioritizeSections(sections);
  const originalDoc = renderTaskDocFromSections(sections);
  let remainingBudget: number = RUNNER_TASK_CONTEXT_BUDGETS.sections_total_max_bytes;
  let truncated = false;
  const compactedEntries = originalEntries.map(([section, text]) => {
    if (!text) return [section, text] as const;
    if (remainingBudget <= 0) {
      truncated = true;
      return [section, OMITTED_SECTION_MARKER] as const;
    }
    const allowedBytes = Math.min(RUNNER_TASK_CONTEXT_BUDGETS.section_max_bytes, remainingBudget);
    const nextText = utf8Bytes(text) > allowedBytes ? truncateUtf8(text, allowedBytes) : text;
    if (nextText !== text) truncated = true;
    remainingBudget = Math.max(0, remainingBudget - utf8Bytes(nextText));
    return [section, nextText] as const;
  });
  const compactedSections = Object.fromEntries(compactedEntries);
  const compactedDoc = truncateUtf8(
    renderTaskDocFromSections(compactedSections),
    RUNNER_TASK_CONTEXT_BUDGETS.doc_max_bytes,
  );
  const docTruncated = compactedDoc !== originalDoc;
  return {
    sections: compactedSections,
    doc: compactedDoc,
    compaction: {
      original_bytes: utf8Bytes(JSON.stringify(sections)),
      emitted_bytes: utf8Bytes(JSON.stringify(compactedSections)),
      original_count: originalEntries.length,
      emitted_count: compactedEntries.length,
      truncated,
    },
    docCompaction: {
      original_bytes: utf8Bytes(originalDoc),
      emitted_bytes: utf8Bytes(compactedDoc),
      truncated: docTruncated,
    },
  };
}

function compactComments(comments: { author: string; body: string }[]): {
  comments: { author: string; body: string }[];
  compaction: RunnerTaskContextCompactionEntry;
} {
  const originalBytes = measureComments(comments);
  const truncatedBodies = comments.map((comment) => ({
    author: comment.author,
    body: truncateUtf8(comment.body, RUNNER_TASK_CONTEXT_BUDGETS.comment_body_max_bytes),
  }));
  const compacted = compactByTotalBudget({
    items: truncatedBodies,
    maxCount: RUNNER_TASK_CONTEXT_BUDGETS.comments_max_count,
    maxTotalBytes: RUNNER_TASK_CONTEXT_BUDGETS.comments_total_max_bytes,
    measure: (item) => measureComments([item]),
  });
  return {
    comments: compacted,
    compaction: {
      original_bytes: originalBytes,
      emitted_bytes: measureComments(compacted),
      original_count: comments.length,
      emitted_count: compacted.length,
      truncated:
        compacted.length !== comments.length ||
        compacted.some(
          (comment, index) =>
            comment.body !== truncatedBodies.at(-(compacted.length - index))?.body,
        ),
    },
  };
}

function compactEvents(events: TaskEvent[]): {
  events: TaskEvent[];
  compaction: RunnerTaskContextCompactionEntry;
} {
  const originalBytes = measureEvents(events);
  const truncatedNotes = events.map((event) =>
    event.note
      ? {
          ...event,
          note: truncateUtf8(event.note, RUNNER_TASK_CONTEXT_BUDGETS.event_note_max_bytes),
        }
      : event,
  );
  const compacted = compactByTotalBudget({
    items: truncatedNotes,
    maxCount: RUNNER_TASK_CONTEXT_BUDGETS.events_max_count,
    maxTotalBytes: RUNNER_TASK_CONTEXT_BUDGETS.events_total_max_bytes,
    measure: (item) => measureEvents([item]),
  });
  return {
    events: compacted,
    compaction: {
      original_bytes: originalBytes,
      emitted_bytes: measureEvents(compacted),
      original_count: events.length,
      emitted_count: compacted.length,
      truncated:
        compacted.length !== events.length ||
        compacted.some((event, index) => {
          const original = truncatedNotes.at(-(compacted.length - index));
          return JSON.stringify(event) !== JSON.stringify(original);
        }),
    },
  };
}

async function resolveTaskReadmePath(
  ctx: CommandContext,
  taskId: string,
): Promise<string | undefined> {
  const readmePath = path.join(
    ctx.resolvedProject.gitRoot,
    ctx.config.paths.workflow_dir,
    taskId,
    "README.md",
  );
  return (await fileExists(readmePath)) ? readmePath : undefined;
}

async function readOptionalBranch(gitRoot: string): Promise<string | null> {
  try {
    return await gitCurrentBranch(gitRoot);
  } catch {
    return null;
  }
}

async function readOptionalHeadCommit(ctx: CommandContext): Promise<string | null> {
  try {
    return await ctx.git.headCommit();
  } catch {
    return null;
  }
}

export async function assembleRunnerTaskContext(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
}): Promise<RunnerTaskContextEnvelope> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const task = await loadTaskFromContext({ ctx, taskId: opts.task_id });
    const dependencyState = toRunnerDependencyState(
      await resolveTaskDependencyState(task, ctx.taskBackend),
    );
    const frontmatter = taskDataToFrontmatter(task);
    const baseDoc =
      typeof task.doc === "string"
        ? task.doc
        : task.sections
          ? renderTaskDocFromSections(task.sections)
          : "";
    const baseSections = task.sections ?? (baseDoc ? taskDocToSectionMap(baseDoc) : {});
    const compactedSections = compactSections(baseSections);
    const compactedComments = compactComments(task.comments ?? []);
    const compactedEvents = compactEvents(task.events ?? []);
    const compaction: RunnerTaskContextCompaction = {
      doc: compactedSections.docCompaction,
      sections: compactedSections.compaction,
      comments: compactedComments.compaction,
      events: compactedEvents.compaction,
    };
    const [branch, head_commit, readme_path] = await Promise.all([
      readOptionalBranch(ctx.resolvedProject.gitRoot),
      readOptionalHeadCommit(ctx),
      resolveTaskReadmePath(ctx, task.id),
    ]);

    return {
      repository: {
        git_root: ctx.resolvedProject.gitRoot,
        workflow_dir: ctx.config.paths.workflow_dir,
        backend_id: ctx.backendId,
        backend_config_path: ctx.backendConfigPath,
        branch,
        head_commit,
      },
      task: {
        task_id: task.id,
        data: task,
        frontmatter,
        doc: compactedSections.doc,
        sections: compactedSections.sections,
        comments: compactedComments.comments,
        events: compactedEvents.events,
        readme_path,
        dependency_state: dependencyState,
        compaction,
      },
    };
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { task_id: opts.task_id });
  }
}
