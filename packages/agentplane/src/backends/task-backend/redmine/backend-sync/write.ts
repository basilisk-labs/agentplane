import { taskDocToSectionMap } from "@agentplaneorg/core/tasks";

import {
  missingTaskIdMessage,
  RedmineUnavailable,
  sleep,
  toStringSafe,
  validateTaskId,
  type TaskData,
  type TaskWriteOptions,
} from "../../shared.js";
import { parseRedmineCanonicalState } from "../state.js";
import { issueFromPayload, revisionNumber, type RedmineSyncContext } from "./context.js";
import { inferRedmineStatusIdForTaskStatus } from "./status.js";

export async function writeRedmineTask(
  context: RedmineSyncContext,
  task: TaskData,
  opts?: TaskWriteOptions,
): Promise<void> {
  const taskId = toStringSafe(task.id).trim();
  if (!taskId) throw new Error(missingTaskIdMessage());
  validateTaskId(taskId);

  try {
    context.ensureDocMetadata(task);
    let issue = await context.findIssueByTaskId(taskId);
    let issueId = issue?.id;
    let issueIdText = issueId ? toStringSafe(issueId) : "";
    let existingIssue = issue ?? null;
    if (issueIdText && !existingIssue) {
      const payload = await context.requestJson("GET", `issues/${issueIdText}.json`);
      existingIssue = issueFromPayload(payload);
    }
    const currentState =
      existingIssue && context.customFields.canonical_state
        ? parseRedmineCanonicalState(
            context.customFieldValue(existingIssue, context.customFields.canonical_state),
          )
        : null;
    context.assertExpectedRevisionSupported(taskId, opts);
    context.assertExpectedRevision(taskId, opts?.expectedRevision, currentState?.revision ?? 0);
    const nextRevision = issueIdText
      ? Math.max(revisionNumber(task.revision), revisionNumber(currentState?.revision), 0) + 1
      : Math.max(revisionNumber(task.revision), revisionNumber(currentState?.revision), 1);
    const taskForWrite: TaskData = {
      ...task,
      revision: nextRevision,
      sections:
        task.sections && Object.keys(task.sections).length > 0
          ? task.sections
          : task.doc
            ? taskDocToSectionMap(task.doc)
            : undefined,
    };
    const payload = context.taskToIssuePayload(taskForWrite, existingIssue ?? undefined);
    if (payload.status_id === undefined) {
      const inferredStatusId = await inferRedmineStatusIdForTaskStatus(
        context,
        taskForWrite.status,
      );
      if (inferredStatusId !== null) payload.status_id = inferredStatusId;
    }
    if (issueIdText) {
      await context.requestJson("PUT", `issues/${issueIdText}.json`, { issue: payload });
    } else {
      const createPayload = { ...payload, project_id: context.projectId };
      const created = await context.requestJson("POST", "issues.json", { issue: createPayload });
      const createdIssue = issueFromPayload(created);
      issueId = createdIssue?.id;
      issueIdText = issueId ? toStringSafe(issueId) : "";
      if (issueIdText) {
        const updatePayload = { ...payload };
        delete updatePayload.project_id;
        await context.requestJson("PUT", `issues/${issueIdText}.json`, { issue: updatePayload });
        const refreshed = await context.requestJson("GET", `issues/${issueIdText}.json`);
        existingIssue = issueFromPayload(refreshed);
      }
    }
    if (issueIdText) {
      const existingComments =
        existingIssue && context.customFields.comments
          ? context.normalizeComments(
              context.maybeParseJson(
                context.customFieldValue(existingIssue, context.customFields.comments),
              ),
            )
          : [];
      const desiredComments = context.normalizeComments(taskForWrite.comments);
      await context.appendCommentNotes(issueIdText, existingComments, desiredComments);
    }
    taskForWrite.dirty = false;
    await context.cacheTask(taskForWrite, false);
    context.issueCache.clear();
  } catch (err) {
    if (!(err instanceof RedmineUnavailable)) throw err;
    if (!context.cache) throw err;
    context.assertExpectedRevisionSupported(taskId, opts);
    const taskForCache: TaskData = {
      ...task,
      revision: Math.max(revisionNumber(task.revision), 1),
      sections:
        task.sections && Object.keys(task.sections).length > 0
          ? task.sections
          : task.doc
            ? taskDocToSectionMap(task.doc)
            : undefined,
      dirty: true,
    };
    await context.cache.writeTask(taskForCache, opts);
  }
}

export async function writeRedmineTasks(
  context: RedmineSyncContext,
  tasks: TaskData[],
  opts?: TaskWriteOptions,
): Promise<void> {
  for (const [index, task] of tasks.entries()) {
    await context.writeTask(task, opts);
    if (
      context.batchPauseMs > 0 &&
      context.batchSize > 0 &&
      (index + 1) % context.batchSize === 0
    ) {
      await sleep(context.batchPauseMs);
    }
  }
}
