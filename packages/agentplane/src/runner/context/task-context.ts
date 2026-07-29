import path from "node:path";
import { renderTaskDocFromSections, taskDocToSectionMap } from "@agentplaneorg/core/tasks";

import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import type { TaskData, TaskEvent } from "../../backends/task-backend.js";
import { loadCommandContext, loadTaskFromContext } from "../../commands/shared/task-backend.js";
import { gitCurrentBranch } from "../../commands/shared/git-ops.js";
import { resolveTaskDependencyState } from "../../commands/task/shared.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import type {
  RunnerDependencyState,
  RunnerRepositoryContext,
  RunnerTaskContextCompaction,
  RunnerTaskContextCompactionEntry,
  TaskEpisodeOmissionReceipt,
  TaskEpisodeSection,
  TaskEpisodeView,
} from "../types.js";

export type RunnerTaskContextEnvelope = {
  repository: RunnerRepositoryContext;
  task: TaskEpisodeView;
  /** Backend state remains CLI-internal and is never serialized into a runner bundle. */
  source_task: TaskData;
};

const TRUNCATED_MARKER = "\n\n[TRUNCATED]";
const VERIFICATION_RESULTS_BEGIN = "<!-- BEGIN VERIFICATION RESULTS -->";

export const RUNNER_TASK_CONTEXT_BUDGETS = {
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

function sectionKey(section: string): string {
  return section.trim().replaceAll(/\s+/gu, " ").toLocaleLowerCase();
}

function isCliManagedVerificationSection(text: string | undefined): boolean {
  // The structured task backend stores the opening marker in `sections`; the
  // Markdown renderer appends the closing marker. Treat the stored opening
  // marker as authoritative so accumulated CLI history never becomes required
  // semantic input for a runner episode.
  return typeof text === "string" && text.includes(VERIFICATION_RESULTS_BEGIN);
}

function semanticRequiredSections(opts: {
  required_sections: readonly string[];
  sections: Record<string, string>;
}): string[] {
  const sectionsByKey = new Map(
    Object.entries(opts.sections).map(([section, text]) => [sectionKey(section), text]),
  );
  return opts.required_sections.filter(
    (section) => !isCliManagedVerificationSection(sectionsByKey.get(sectionKey(section))),
  );
}

function compactSections(opts: {
  task_id: string;
  sections: Record<string, string>;
  required_sections: readonly string[];
}): {
  sections: TaskEpisodeSection[];
  omissions: TaskEpisodeOmissionReceipt[];
  compaction: RunnerTaskContextCompaction["sections"];
} {
  const requiredByKey = new Map(
    opts.required_sections.map((section) => [sectionKey(section), section.trim()]),
  );
  const entriesByKey = new Map(
    Object.entries(opts.sections).map(([section, text]) => [
      sectionKey(section),
      { section, text },
    ]),
  );
  const missing = [...requiredByKey.entries()]
    .filter(([key]) => !entriesByKey.has(key))
    .map(([, section]) => section);
  const empty = [...requiredByKey.entries()].flatMap(([key, required]) => {
    const entry = entriesByKey.get(key);
    return entry?.text.trim().length === 0 ? [required] : [];
  });
  const unavailableRequired = new Set([...missing, ...empty]);
  const requiredEntries = [...requiredByKey.entries()].flatMap(([key, required]) => {
    if (unavailableRequired.has(required)) return [];
    const entry = entriesByKey.get(key)!;
    return [{ name: required, text: entry.text, required: true as const }];
  });
  const optionalEntries = Object.entries(opts.sections)
    .filter(([section]) => !requiredByKey.has(sectionKey(section)))
    .map(([name, text]) => ({ name, text, required: false as const }));
  const originalEntries = [...requiredEntries, ...optionalEntries];
  let remainingBudget: number = RUNNER_TASK_CONTEXT_BUDGETS.sections_total_max_bytes;
  let truncated = false;
  const omissions: TaskEpisodeOmissionReceipt[] = [
    ...missing.map((section) => ({
      section,
      required: true,
      reason_code: "required_section_unavailable" as const,
    })),
    ...empty.map((section) => ({
      section,
      required: true,
      reason_code: "required_section_unavailable" as const,
    })),
  ];
  const compactedEntries: TaskEpisodeSection[] = [];
  for (const entry of originalEntries) {
    const textBytes = utf8Bytes(entry.text);
    if (entry.required) {
      const allowedBytes = Math.min(RUNNER_TASK_CONTEXT_BUDGETS.section_max_bytes, remainingBudget);
      if (textBytes > allowedBytes) {
        throw new CliError({
          code: "E_VALIDATION",
          message:
            `TaskEpisodeView cannot compact required section ${JSON.stringify(entry.name)} ` +
            `for ${opts.task_id} without loss.`,
          context: {
            task_id: opts.task_id,
            reason_code: "task_episode_required_section_exceeds_budget",
            section: entry.name,
            section_bytes: textBytes,
            allowed_bytes: allowedBytes,
          },
        });
      }
      remainingBudget -= textBytes;
      compactedEntries.push(entry);
      continue;
    }
    if (remainingBudget <= 0) {
      truncated = true;
      omissions.push({
        section: entry.name,
        required: false,
        reason_code: "section_budget_exhausted",
      });
      continue;
    }
    const allowedBytes = Math.min(RUNNER_TASK_CONTEXT_BUDGETS.section_max_bytes, remainingBudget);
    const nextText = textBytes > allowedBytes ? truncateUtf8(entry.text, allowedBytes) : entry.text;
    if (nextText !== entry.text) truncated = true;
    remainingBudget = Math.max(0, remainingBudget - utf8Bytes(nextText));
    compactedEntries.push({ ...entry, text: nextText });
  }
  return {
    sections: compactedEntries,
    omissions,
    compaction: {
      original_bytes: utf8Bytes(JSON.stringify(opts.sections)),
      emitted_bytes: utf8Bytes(JSON.stringify(compactedEntries)),
      original_count: originalEntries.length,
      emitted_count: compactedEntries.length,
      truncated,
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
  task?: TaskData;
  dependency_backend?: Pick<CommandContext["taskBackend"], "getTask" | "getTasks">;
}): Promise<RunnerTaskContextEnvelope> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    // Route resolution treats the task worktree snapshot as authoritative in
    // branch_pr mode. AgentWorkOrder preparation must read that same snapshot;
    // otherwise a command invoked from the base checkout can combine an older
    // task revision with the route fingerprint from the task branch.
    const task =
      opts.task ??
      (await loadTaskFromContext({
        ctx,
        taskId: opts.task_id,
        preferBranchSnapshot: ctx.config.workflow_mode === "branch_pr",
      }));
    const dependencyState = toRunnerDependencyState(
      await resolveTaskDependencyState(task, opts.dependency_backend ?? ctx.taskBackend),
    );
    const baseDoc =
      typeof task.doc === "string"
        ? task.doc
        : task.sections
          ? renderTaskDocFromSections(task.sections)
          : "";
    const baseSections = task.sections ?? (baseDoc ? taskDocToSectionMap(baseDoc) : {});
    const requiredSections = semanticRequiredSections({
      required_sections: ctx.config.tasks.doc.required_sections,
      sections: baseSections,
    });
    const compactedSections = compactSections({
      task_id: task.id,
      sections: baseSections,
      required_sections: requiredSections,
    });
    const compactedComments = compactComments(task.comments ?? []);
    const compactedEvents = compactEvents(task.events ?? []);
    const compaction: RunnerTaskContextCompaction = {
      sections: compactedSections.compaction,
      comments: compactedComments.compaction,
      events: compactedEvents.compaction,
      omissions: compactedSections.omissions,
      serialized: {
        source_bytes: utf8Bytes(JSON.stringify(task)),
        emitted_bytes: 0,
        duplicate_bytes_removed: 0,
      },
    };
    const [branch, head_commit, readme_path] = await Promise.all([
      readOptionalBranch(ctx.resolvedProject.gitRoot),
      readOptionalHeadCommit(ctx),
      resolveTaskReadmePath(ctx, task.id),
    ]);

    const episode: TaskEpisodeView = {
      schema_version: 1,
      kind: "agentplane.task_episode_view",
      metadata: {
        task_id: task.id,
        revision: task.revision ?? null,
        status: task.status,
        owner: task.owner ?? null,
        priority: task.priority ?? null,
        tags: [...(task.tags ?? [])],
        task_kind: task.task_kind ?? null,
        mutation_scope: task.mutation_scope ?? null,
        blueprint_request: task.blueprint_request ?? null,
      },
      narrative: {
        title: task.title,
        description: task.description,
        sections: compactedSections.sections,
      },
      verification: {
        commands: [...task.verify],
      },
      section_policy: {
        source: "task_document_schema",
        required_sections: requiredSections,
      },
      history: {
        comments: compactedComments.comments,
        events: compactedEvents.events,
      },
      readme_path,
      dependency_state: dependencyState,
      compaction,
    };
    let emittedBytes = utf8Bytes(JSON.stringify(episode));
    compaction.serialized.emitted_bytes = emittedBytes;
    compaction.serialized.duplicate_bytes_removed = Math.max(
      0,
      compaction.serialized.source_bytes - emittedBytes,
    );
    emittedBytes = utf8Bytes(JSON.stringify(episode));
    compaction.serialized.emitted_bytes = emittedBytes;
    compaction.serialized.duplicate_bytes_removed = Math.max(
      0,
      compaction.serialized.source_bytes - emittedBytes,
    );

    return {
      repository: {
        git_root: ctx.resolvedProject.gitRoot,
        workflow_dir: ctx.config.paths.workflow_dir,
        backend_id: ctx.backendId,
        backend_config_path: ctx.backendConfigPath,
        branch,
        head_commit,
      },
      task: episode,
      source_task: task,
    };
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { task_id: opts.task_id });
  }
}
