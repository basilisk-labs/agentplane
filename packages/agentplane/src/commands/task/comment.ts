import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter, emitCommandResult } from "../../cli/output.js";

import { type TaskData } from "../../backends/task-backend.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation, type TaskMutationPlan } from "../shared/task-mutation.js";
import {
  appendTaskCommentIntent,
  appendTaskEventIntent,
  touchTaskDocMetaIntent,
} from "../shared/task-store.js";
import { appendTaskEvent, normalizeTaskDocVersion, nowIso } from "./shared.js";

const output = createCliEmitter();

function buildCommentMutation(opts: {
  task: TaskData;
  at: string;
  author: string;
  body: string;
}): TaskMutationPlan {
  return {
    intents: [
      appendTaskCommentIntent({ author: opts.author, body: opts.body }),
      appendTaskEventIntent({
        type: "comment",
        at: opts.at,
        author: opts.author,
        body: opts.body,
      }),
      touchTaskDocMetaIntent({
        updatedBy: opts.author,
        version: normalizeTaskDocVersion(opts.task.doc_version),
      }),
    ],
    nextTask: {
      ...opts.task,
      comments: [
        ...(Array.isArray(opts.task.comments)
          ? opts.task.comments.filter(
              (item): item is { author: string; body: string } =>
                !!item && typeof item.author === "string" && typeof item.body === "string",
            )
          : []),
        { author: opts.author, body: opts.body },
      ],
      events: appendTaskEvent(opts.task, {
        type: "comment",
        at: opts.at,
        author: opts.author,
        body: opts.body,
      }),
      doc_version: normalizeTaskDocVersion(opts.task.doc_version),
      doc_updated_at: opts.at,
      doc_updated_by: opts.author,
    },
  };
}

export async function cmdTaskComment(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const at = nowIso();
    await applyTaskMutation({
      ctx,
      taskId: opts.taskId,
      build: (task) =>
        buildCommentMutation({
          task,
          at,
          author: opts.author,
          body: opts.body,
        }),
    });
    emitCommandResult(output, {
      kind: "success",
      action: "commented",
      target: opts.taskId,
    });
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task comment", root: opts.rootOverride ?? null });
  }
}
