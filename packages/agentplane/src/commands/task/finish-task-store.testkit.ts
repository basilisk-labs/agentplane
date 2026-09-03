import { vi } from "vitest";
import { ensureDocSections, setMarkdownSection } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import type { TaskStorePatch } from "../shared/task-store.js";

export function applyStorePatch(
  current: TaskData,
  patch: TaskStorePatch | null | undefined,
): TaskData {
  if (!patch) return current;
  const next: TaskData = patch.task ? { ...current, ...patch.task } : { ...current };
  if (patch.appendComments?.length) {
    next.comments = [...(current.comments ?? []), ...patch.appendComments];
  }
  if (patch.appendEvents?.length) {
    next.events = [...(current.events ?? []), ...patch.appendEvents];
  }
  if (patch.doc?.kind === "replace-doc") {
    next.doc = patch.doc.doc;
  } else if (patch.doc) {
    const baseDoc = ensureDocSections(String(current.doc ?? ""), patch.doc.requiredSections);
    next.doc = ensureDocSections(
      setMarkdownSection(baseDoc, patch.doc.section, patch.doc.text),
      patch.doc.requiredSections,
    );
  }
  if (patch.doc || patch.docMeta?.touch === true) {
    next.doc_version = patch.docMeta?.version ?? next.doc_version;
    next.doc_updated_at = new Date().toISOString();
    next.doc_updated_by = patch.docMeta?.updatedBy ?? next.doc_updated_by;
  }
  return next;
}

export function createMutableTaskStore(
  task: TaskData,
  applyPatch: (current: TaskData, patch: TaskStorePatch | null | undefined) => TaskData,
) {
  return {
    get: vi.fn().mockImplementation(() => Promise.resolve(task)),
    patch: vi
      .fn()
      .mockImplementation(
        async (_taskId: string, builder: (current: TaskData) => Promise<TaskStorePatch>) => {
          const next = applyPatch(task, await builder({ ...task }));
          const changed = JSON.stringify(next) !== JSON.stringify(task);
          Object.assign(task, next);
          return { changed, task };
        },
      ),
    update: vi
      .fn()
      .mockImplementation(
        async (_taskId: string, updater: (current: TaskData) => Promise<TaskData>) => {
          const next = await updater({ ...task });
          const changed = JSON.stringify(next) !== JSON.stringify(task);
          Object.assign(task, next);
          return { changed, task };
        },
      ),
  };
}
