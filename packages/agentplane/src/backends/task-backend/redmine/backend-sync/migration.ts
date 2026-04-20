import { taskDocToSectionMap } from "@agentplaneorg/core";

import {
  BackendError,
  redmineConfigMissingEnvMessage,
  redmineIssueIdMissingMessage,
  sleep,
  toStringSafe,
  type TaskCanonicalStateMigrationResult,
} from "../../shared.js";
import { buildRedmineCanonicalStateWithOptions, parseRedmineCanonicalState } from "../state.js";
import { revisionNumber, type RedmineSyncContext } from "./context.js";

export async function migrateRedmineCanonicalState(
  context: RedmineSyncContext,
): Promise<TaskCanonicalStateMigrationResult> {
  if (!context.customFields.canonical_state) {
    throw new BackendError(
      redmineConfigMissingEnvMessage("AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE"),
      "E_BACKEND",
    );
  }

  const tasks = await context.listTasksRemote();
  const result: TaskCanonicalStateMigrationResult = {
    scanned: tasks.length,
    migrated: [],
    skippedStructured: [],
    skippedNoDoc: [],
    failed: [],
  };

  for (const [index, task] of tasks.entries()) {
    const taskId = toStringSafe(task.id).trim();
    if (!taskId) continue;
    const issue = context.issueCache.get(taskId);

    if (!issue) {
      result.failed.push({
        taskId,
        reason: "Redmine issue payload was not cached during remote list refresh",
      });
      continue;
    }

    const currentState = parseRedmineCanonicalState(
      context.customFieldValue(issue, context.customFields.canonical_state),
    );
    if (currentState) {
      result.skippedStructured.push(taskId);
      continue;
    }

    const sections =
      task.sections && Object.keys(task.sections).length > 0
        ? task.sections
        : task.doc
          ? taskDocToSectionMap(task.doc)
          : undefined;
    if (!sections || Object.keys(sections).length === 0) {
      result.skippedNoDoc.push(taskId);
      continue;
    }

    const issueIdText = toStringSafe(issue.id);
    if (!issueIdText) {
      result.failed.push({ taskId, reason: redmineIssueIdMissingMessage() });
      continue;
    }

    const nextRevision = Math.max(revisionNumber(task.revision), 0, 1);
    const nextCanonicalState = buildRedmineCanonicalStateWithOptions(
      {
        ...task,
        sections,
        revision: nextRevision,
      },
      { base: currentState, revision: nextRevision },
    );
    if (!nextCanonicalState) {
      result.skippedNoDoc.push(taskId);
      continue;
    }

    const customFields: Record<string, unknown>[] = [];
    context.appendCustomField(customFields, "canonical_state", nextCanonicalState);
    try {
      await context.requestJson("PUT", `issues/${issueIdText}.json`, {
        issue: { custom_fields: customFields },
      });
      context.setIssueCustomFieldValue(
        issue,
        context.customFields.canonical_state,
        nextCanonicalState,
      );
      context.issueCache.set(taskId, issue);
      await context.cacheTask(
        {
          ...task,
          sections,
          revision: nextRevision,
          dirty: false,
        },
        false,
      );
      result.migrated.push(taskId);
    } catch (err) {
      result.failed.push({
        taskId,
        reason:
          err instanceof Error ? err.message : "Unknown Redmine canonical_state migration failure",
      });
    }

    if (
      context.batchPauseMs > 0 &&
      context.batchSize > 0 &&
      (index + 1) % context.batchSize === 0
    ) {
      await sleep(context.batchPauseMs);
    }
  }

  return result;
}
