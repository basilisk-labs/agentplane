import {
  applyTaskDocMutations,
  normalizeTaskDocVersion,
  taskDocToSectionMap,
} from "@agentplaneorg/core/tasks";

import type { TaskData, TaskEvent } from "../../../backends/task-backend.js";
import { assertExpectedTaskDoc, assertExpectedTaskSection } from "../../../task-doc/conflicts.js";
import type {
  CachedTask,
  TaskComment,
  TaskDocState,
  TaskStoreIntent,
  TaskStoreIntentResult,
  TaskStoreLike,
  TaskStoreMutationOptions,
  TaskStorePatch,
  TaskStoreTaskPatch,
} from "./types.js";

export function setTaskFieldsIntent(task: TaskStoreTaskPatch): TaskStoreIntent {
  return { kind: "set-task-fields", task };
}

export function appendTaskCommentsIntent(comments: TaskComment[]): TaskStoreIntent {
  return { kind: "append-comments", comments };
}

export function appendTaskCommentIntent(comment: TaskComment): TaskStoreIntent {
  return appendTaskCommentsIntent([comment]);
}

export function appendTaskEventsIntent(events: TaskEvent[]): TaskStoreIntent {
  return { kind: "append-events", events };
}

export function appendTaskEventIntent(event: TaskEvent): TaskStoreIntent {
  return appendTaskEventsIntent([event]);
}

export function replaceTaskDocIntent(opts: {
  doc: string;
  expectedCurrentDoc?: string | null;
}): TaskStoreIntent {
  return { kind: "replace-doc", ...opts };
}

export function setTaskSectionIntent(opts: {
  section: string;
  text: string;
  requiredSections: string[];
  expectedCurrentText?: string | null;
}): TaskStoreIntent {
  return { kind: "set-section", ...opts };
}

export function touchTaskDocMetaIntent(
  opts: {
    updatedBy?: string;
    version?: 2 | 3;
  } = {},
): TaskStoreIntent {
  return { kind: "touch-doc-meta", ...opts };
}

function normalizeComments(task: TaskData): TaskComment[] {
  return Array.isArray(task.comments)
    ? task.comments.filter(
        (item): item is TaskComment =>
          !!item && typeof item.author === "string" && typeof item.body === "string",
      )
    : [];
}

function normalizeEvents(task: TaskData): NonNullable<TaskData["events"]> {
  return Array.isArray(task.events)
    ? task.events.filter(
        (item): item is NonNullable<TaskData["events"]>[number] =>
          !!item &&
          typeof item.type === "string" &&
          typeof item.at === "string" &&
          typeof item.author === "string",
      )
    : [];
}

function applyDocMutationsToState(
  docState: TaskDocState,
  mutations: Parameters<typeof applyTaskDocMutations>[1],
  opts: {
    docUpdatedAt?: string;
  },
): TaskDocState {
  const applied = applyTaskDocMutations(docState, mutations, {
    now: opts.docUpdatedAt,
  });
  return {
    ...docState,
    doc: applied.doc,
    sections: applied.sections,
    doc_version: applied.doc_version,
    doc_updated_at: applied.doc_updated_at,
    doc_updated_by: applied.doc_updated_by,
  };
}

function normalizeTaskStoreIntents(intents: TaskStoreIntentResult): TaskStoreIntent[] {
  if (!intents) return [];
  if (Array.isArray(intents)) {
    return intents.filter((intent): intent is TaskStoreIntent => intent != null);
  }
  return [intents as TaskStoreIntent];
}

function patchToIntents(patch: TaskStorePatch | null | undefined): TaskStoreIntent[] {
  if (!patch) return [];
  const intents: TaskStoreIntent[] = [];
  if (patch.task) intents.push(setTaskFieldsIntent(patch.task));
  if (patch.appendComments && patch.appendComments.length > 0) {
    intents.push(appendTaskCommentsIntent(patch.appendComments));
  }
  if (patch.appendEvents && patch.appendEvents.length > 0) {
    intents.push(appendTaskEventsIntent(patch.appendEvents));
  }
  if (patch.doc) {
    intents.push(
      patch.doc.kind === "replace-doc"
        ? replaceTaskDocIntent({
            doc: patch.doc.doc,
            expectedCurrentDoc: patch.doc.expectedCurrentDoc,
          })
        : setTaskSectionIntent({
            section: patch.doc.section,
            text: patch.doc.text,
            requiredSections: patch.doc.requiredSections,
            expectedCurrentText: patch.doc.expectedCurrentText,
          }),
    );
  }
  if (patch.docMeta && (patch.doc !== undefined || patch.docMeta.touch === true)) {
    intents.push(
      touchTaskDocMetaIntent({
        updatedBy: patch.docMeta.updatedBy,
        version: patch.docMeta.version,
      }),
    );
  }
  return intents;
}

export function taskStorePatchFromIntents(
  intents: TaskStoreIntentResult,
): TaskStorePatch | null | undefined {
  const normalized = normalizeTaskStoreIntents(intents);
  if (normalized.length === 0) return null;

  const patch: TaskStorePatch = {};
  for (const intent of normalized) {
    switch (intent.kind) {
      case "set-task-fields": {
        patch.task = patch.task ? { ...patch.task, ...intent.task } : { ...intent.task };
        break;
      }
      case "append-comments": {
        if (intent.comments.length > 0) {
          patch.appendComments = [...(patch.appendComments ?? []), ...intent.comments];
        }
        break;
      }
      case "append-events": {
        if (intent.events.length > 0) {
          patch.appendEvents = [...(patch.appendEvents ?? []), ...intent.events];
        }
        break;
      }
      case "replace-doc": {
        const docPatch: TaskStorePatch["doc"] = {
          kind: "replace-doc",
          doc: intent.doc,
        };
        if (intent.expectedCurrentDoc !== undefined) {
          docPatch.expectedCurrentDoc = intent.expectedCurrentDoc;
        }
        patch.doc = docPatch;
        break;
      }
      case "set-section": {
        const sectionPatch: TaskStorePatch["doc"] = {
          kind: "set-section",
          section: intent.section,
          text: intent.text,
          requiredSections: [...intent.requiredSections],
        };
        if (intent.expectedCurrentText !== undefined) {
          sectionPatch.expectedCurrentText = intent.expectedCurrentText;
        }
        patch.doc = sectionPatch;
        break;
      }
      case "touch-doc-meta": {
        patch.docMeta = {
          touch: true,
          updatedBy: intent.updatedBy ?? patch.docMeta?.updatedBy,
          version: intent.version ?? patch.docMeta?.version,
        };
        break;
      }
    }
  }

  return patch;
}

export async function mutateTaskStore(
  store: TaskStoreLike,
  taskId: string,
  builder: (current: TaskData) => Promise<TaskStoreIntentResult> | TaskStoreIntentResult,
  opts: TaskStoreMutationOptions = {},
): Promise<{ changed: boolean; task: TaskData }> {
  if (typeof store.mutate === "function") {
    return await store.mutate(taskId, builder, opts);
  }
  return await store.patch(
    taskId,
    async (current) => taskStorePatchFromIntents(await builder(current)),
    opts,
  );
}

export function applyTaskStoreIntentsToTask(
  task: TaskData,
  intents: TaskStoreIntentResult,
  opts: {
    currentDocVersion?: 2 | 3;
    docUpdatedAt?: string;
  } = {},
): TaskData {
  const normalizedIntents = normalizeTaskStoreIntents(intents);
  if (normalizedIntents.length === 0) return task;

  const current = task;
  const next: TaskData = { ...current };
  let docState: TaskDocState = {
    comments: next.comments ?? null,
    doc: String(next.doc ?? ""),
    doc_updated_by: next.doc_updated_by,
    doc_version: normalizeTaskDocVersion(opts.currentDocVersion ?? task.doc_version),
    owner: next.owner,
    sections: next.sections ?? null,
  };
  let touchDoc = false;

  for (const intent of normalizedIntents) {
    switch (intent.kind) {
      case "set-task-fields": {
        Object.assign(next, intent.task);
        docState = {
          ...docState,
          doc_updated_by: next.doc_updated_by,
          doc_version: normalizeTaskDocVersion(next.doc_version ?? docState.doc_version),
          owner: next.owner,
        };
        break;
      }
      case "append-comments": {
        if (intent.comments.length > 0) {
          next.comments = [...normalizeComments(next), ...intent.comments];
          docState = { ...docState, comments: next.comments };
        }
        break;
      }
      case "append-events": {
        if (intent.events.length > 0) {
          next.events = [...normalizeEvents(next), ...intent.events];
        }
        break;
      }
      case "replace-doc": {
        if (intent.expectedCurrentDoc !== undefined) {
          assertExpectedTaskDoc({
            taskId: current.id,
            currentDoc: docState.doc,
            expectedDoc: intent.expectedCurrentDoc,
          });
        }
        docState = applyDocMutationsToState(docState, [{ kind: "replace-doc", doc: intent.doc }], {
          docUpdatedAt: opts.docUpdatedAt,
        });
        touchDoc = true;
        break;
      }
      case "set-section": {
        if (intent.expectedCurrentText !== undefined) {
          assertExpectedTaskSection({
            taskId: current.id,
            currentDoc: docState.doc,
            section: intent.section,
            expectedText: intent.expectedCurrentText,
          });
        }
        docState = applyDocMutationsToState(
          docState,
          [
            {
              kind: "set-section",
              section: intent.section,
              text: intent.text,
              requiredSections: intent.requiredSections,
            },
          ],
          { docUpdatedAt: opts.docUpdatedAt },
        );
        touchDoc = true;
        break;
      }
      case "touch-doc-meta": {
        docState = applyDocMutationsToState(
          docState,
          [
            {
              kind: "touch-doc-meta",
              updatedBy: intent.updatedBy,
              version: intent.version,
            },
          ],
          { docUpdatedAt: opts.docUpdatedAt },
        );
        touchDoc = true;
        break;
      }
    }
  }

  if (touchDoc) {
    next.doc = docState.doc;
    next.sections = docState.sections ?? taskDocToSectionMap(docState.doc);
    next.doc_version = docState.doc_version;
    next.doc_updated_at = docState.doc_updated_at;
    next.doc_updated_by = docState.doc_updated_by;
  }

  return next;
}

export function applyTaskStoreIntents(entry: CachedTask, intents: TaskStoreIntent[]): TaskData {
  return applyTaskStoreIntentsToTask(entry.task, intents, {
    currentDocVersion: normalizeTaskDocVersion(entry.parsed.frontmatter.doc_version),
  });
}

export function resolveTaskStoreIntents(intents: TaskStoreIntentResult): TaskStoreIntent[] {
  return normalizeTaskStoreIntents(intents);
}

export function resolveTaskStorePatch(patch: TaskStorePatch | null | undefined): TaskStoreIntent[] {
  return patchToIntents(patch);
}
