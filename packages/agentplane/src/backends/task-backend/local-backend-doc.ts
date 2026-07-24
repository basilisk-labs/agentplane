import {
  applyTaskDocMutations,
  docChanged,
  taskDocToSectionMap,
  taskReadmePath,
  updateTaskReadmeAtomic,
} from "@agentplaneorg/core/tasks";
import {
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
} from "@agentplaneorg/core/schemas";

import { assertExpectedTaskDoc, assertExpectedTaskSection } from "../../task-doc/conflicts.js";
import {
  normalizeDocVersion,
  nowIso,
  resolveDocUpdatedByFromFrontmatter,
  BackendError,
  mergeTaskDoc,
  type TaskWriteOptions,
} from "./shared.js";
import {
  assertExpectedRevision,
  storedRevisionFromFrontmatter,
  taskDocStateFromFrontmatter,
  type LocalBackendContext,
} from "./local-backend-state.js";

export async function setLocalTaskDoc(
  context: LocalBackendContext,
  taskId: string,
  doc: string,
  updatedBy?: string,
  opts?: TaskWriteOptions,
): Promise<void> {
  const readmePath = taskReadmePath(context.root, taskId);
  await updateTaskReadmeAtomic(readmePath, (parsed) => {
    assertExpectedRevision({
      taskId,
      expectedRevision: opts?.expectedRevision,
      currentRevision: storedRevisionFromFrontmatter(parsed.frontmatter, 1),
    });

    const docText = String(doc ?? "");
    const currentDoc = taskDocStateFromFrontmatter(parsed.frontmatter, parsed.body).doc;
    if (opts?.expectedCurrentDoc !== undefined) {
      assertExpectedTaskDoc({ taskId, currentDoc, expectedDoc: opts.expectedCurrentDoc });
    }
    if (opts?.expectedCurrentText !== undefined) {
      if (!opts.expectedSection) {
        throw new BackendError(
          "expectedSection is required when expectedCurrentText is set",
          "E_BACKEND",
        );
      }
      assertExpectedTaskSection({
        taskId,
        currentDoc,
        section: opts.expectedSection,
        expectedText: opts.expectedCurrentText,
      });
    }

    let body = parsed.body;
    const frontmatter = {
      ...parsed.frontmatter,
      id:
        typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
          ? parsed.frontmatter.id
          : taskId,
    } as Record<string, unknown>;
    const currentDocVersion = normalizeDocVersion(frontmatter.doc_version);

    if (docChanged(currentDoc, docText) || !frontmatter.doc_updated_at) {
      const applied = applyTaskDocMutations(
        taskDocStateFromFrontmatter(frontmatter, parsed.body),
        [
          { kind: "replace-doc", doc: docText },
          {
            kind: "touch-doc-meta",
            updatedBy: resolveDocUpdatedByFromFrontmatter(
              frontmatter,
              updatedBy,
              context.updatedBy,
            ),
            version: currentDocVersion,
          },
        ],
        { now: nowIso() },
      );
      body = mergeTaskDoc(parsed.body, applied.doc);
      frontmatter.doc_version = applied.doc_version;
      frontmatter.doc_updated_at = applied.doc_updated_at;
      frontmatter.doc_updated_by = applied.doc_updated_by;
      frontmatter.sections = applied.sections;
    } else {
      body = mergeTaskDoc(parsed.body, docText);
      frontmatter.sections = taskDocToSectionMap(docText);
    }

    frontmatter.doc_version = normalizeDocVersion(frontmatter.doc_version, currentDocVersion);
    validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(frontmatter));
    return { frontmatter, body };
  });
}

export async function touchLocalTaskDocMetadata(
  context: LocalBackendContext,
  taskId: string,
  updatedBy?: string,
  opts?: TaskWriteOptions,
): Promise<void> {
  const readmePath = taskReadmePath(context.root, taskId);
  await updateTaskReadmeAtomic(readmePath, (parsed) => {
    assertExpectedRevision({
      taskId,
      expectedRevision: opts?.expectedRevision,
      currentRevision: storedRevisionFromFrontmatter(parsed.frontmatter, 1),
    });
    const frontmatter = {
      ...parsed.frontmatter,
      id:
        typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
          ? parsed.frontmatter.id
          : taskId,
    } as Record<string, unknown>;
    const applied = applyTaskDocMutations(
      taskDocStateFromFrontmatter(frontmatter, parsed.body),
      [
        {
          kind: "touch-doc-meta",
          updatedBy: resolveDocUpdatedByFromFrontmatter(frontmatter, updatedBy, context.updatedBy),
          version: normalizeDocVersion(frontmatter.doc_version),
        },
      ],
      { now: nowIso() },
    );
    frontmatter.doc_version = applied.doc_version;
    frontmatter.doc_updated_at = applied.doc_updated_at;
    frontmatter.doc_updated_by = applied.doc_updated_by;
    frontmatter.sections =
      typeof frontmatter.sections === "object" &&
      frontmatter.sections !== null &&
      Object.keys(frontmatter.sections).length > 0
        ? frontmatter.sections
        : applied.sections;
    validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(frontmatter));
    return { frontmatter, body: parsed.body || "" };
  });
}
