import {
  getTaskDocContract,
  normalizeTaskDocVersion,
  type TaskDocSections,
  type TaskDocVersion,
} from "./task-doc-contract.js";
import {
  ensureDocSections,
  renderTaskDocFromSections,
  setMarkdownSection,
  taskDocToSectionMap,
} from "./task-doc.js";

export type TaskDocMutationComment = {
  author?: string;
};

export type TaskDocMutationState = {
  doc: string;
  doc_version?: unknown;
  doc_updated_by?: unknown;
  owner?: unknown;
  comments?: readonly TaskDocMutationComment[] | null;
  sections?: TaskDocSections | null;
};

export type TaskDocMutation =
  | {
      kind: "replace-doc";
      doc: string;
    }
  | {
      kind: "set-section";
      section: string;
      text: string;
      requiredSections: readonly string[];
    }
  | {
      kind: "touch-doc-meta";
      updatedBy?: string;
      version?: TaskDocVersion;
    };

export type TaskDocMutationResult = {
  doc: string;
  sections: TaskDocSections;
  doc_version: TaskDocVersion;
  doc_updated_at: string;
  doc_updated_by: string;
  touched: boolean;
};

function getLastCommentAuthor(comments: TaskDocMutationState["comments"]): string | null {
  if (comments == null) return null;
  for (let index = comments.length - 1; index >= 0; index -= 1) {
    const comment = comments[index];
    const author = comment?.author;
    if (typeof author !== "string") continue;
    const trimmed = author.trim();
    if (trimmed) return trimmed;
  }
  return null;
}

export function resolveTaskDocUpdatedBy(
  state: Pick<TaskDocMutationState, "comments" | "doc_updated_by" | "owner">,
  updatedBy?: string | null,
): string {
  if (updatedBy != null) {
    const explicit = updatedBy.trim();
    if (explicit.length === 0) {
      throw new Error("doc_updated_by must be a non-empty string");
    }
    return explicit;
  }

  const lastAuthor = getLastCommentAuthor(state.comments ?? null);
  if (lastAuthor) return lastAuthor;

  if (typeof state.doc_updated_by === "string") {
    const existing = state.doc_updated_by.trim();
    if (existing && existing.toLowerCase() !== "agentplane") {
      return existing;
    }
  }

  if (typeof state.owner === "string") {
    const owner = state.owner.trim();
    if (owner) return owner;
  }

  return "agentplane";
}

function nowIso(): string {
  return new Date().toISOString();
}

export function applyTaskDocMutations(
  state: TaskDocMutationState,
  mutations: readonly TaskDocMutation[],
  opts: {
    now?: string;
  } = {},
): TaskDocMutationResult {
  const docVersion = normalizeTaskDocVersion(state.doc_version);
  let nextDoc = String(state.doc ?? "");
  let nextVersion = docVersion;
  let nextUpdatedBy: string | undefined;
  let touched = false;

  for (const mutation of mutations) {
    switch (mutation.kind) {
      case "replace-doc": {
        nextDoc = renderTaskDocFromSections(taskDocToSectionMap(mutation.doc));
        touched = true;
        break;
      }
      case "set-section": {
        const requiredSections =
          mutation.requiredSections.length > 0
            ? [...mutation.requiredSections]
            : [...getTaskDocContract(nextVersion).sections];
        if (!requiredSections.includes(mutation.section)) {
          throw new Error(`Unknown doc section: ${mutation.section}`);
        }
        const baseDoc = ensureDocSections(nextDoc, requiredSections);
        nextDoc = ensureDocSections(
          setMarkdownSection(baseDoc, mutation.section, mutation.text),
          requiredSections,
        );
        touched = true;
        break;
      }
      case "touch-doc-meta": {
        nextUpdatedBy = mutation.updatedBy ?? nextUpdatedBy;
        nextVersion = normalizeTaskDocVersion(mutation.version, nextVersion);
        touched = true;
        break;
      }
    }
  }

  return {
    doc: nextDoc,
    sections: taskDocToSectionMap(nextDoc),
    doc_version: nextVersion,
    doc_updated_at: opts.now ?? nowIso(),
    doc_updated_by: resolveTaskDocUpdatedBy(state, nextUpdatedBy),
    touched,
  };
}
