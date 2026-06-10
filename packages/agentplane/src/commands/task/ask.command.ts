import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter, emitCommandResult } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import {
  appendTaskCommentIntent,
  appendTaskEventIntent,
  setTaskFieldsIntent,
  touchTaskDocMetaIntent,
} from "../shared/task-store.js";
import { appendTaskEvent, normalizeTaskDocVersion, nowIso } from "./shared.js";
import { getHumanInputState, setHumanInputState } from "./human-input.js";

export type TaskAskParsed = {
  taskId: string;
  author: string;
  body: string;
};

export const taskAskSpec: CommandSpec<TaskAskParsed> = {
  id: ["task", "ask"],
  group: "Task",
  summary: "Record a blocking user question for a task.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "string", name: "author", valueHint: "<ROLE>", description: "Question author." },
    { kind: "string", name: "body", valueHint: "<text>", description: "Blocking question." },
  ],
  examples: [
    {
      cmd: 'agentplane task ask 202602030608-F1Q8AB --author CODER --body "Which API should this use?"',
      why: "Block the task until the user answers.",
    },
  ],
  validateRaw: (raw) => {
    for (const key of ["author", "body"] as const) {
      const value = raw.opts[key];
      if (typeof value !== "string" || value.trim() === "") {
        throw usageError({ spec: taskAskSpec, message: `Missing required --${key}.` });
      }
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    author: String(raw.opts.author).trim(),
    body: String(raw.opts.body).trim(),
  }),
};

export function makeRunTaskAskHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskAskParsed): Promise<number> => {
    const commandCtx = await getCtx("task ask");
    const at = nowIso();
    await applyTaskMutation({
      ctx: commandCtx,
      taskId: parsed.taskId,
      build: (task) => {
        const state = getHumanInputState(task);
        if (state.openQuestion) {
          throw usageError({
            spec: taskAskSpec,
            message: `Task already has an open user question: ${state.openQuestion.id}`,
          });
        }
        const question = {
          id: `question-${at.replaceAll(/[^0-9]/gu, "")}`,
          question: parsed.body,
          askedAt: at,
          askedBy: parsed.author,
          previousStatus: String(task.status || "TODO"),
        };
        const extensions = setHumanInputState(task, {
          openQuestion: question,
          history: state.history,
        });
        const commentBody = `Question for user: ${parsed.body}`;
        return {
          intents: [
            setTaskFieldsIntent({ status: "BLOCKED", extensions }),
            appendTaskCommentIntent({ author: parsed.author, body: commentBody }),
            appendTaskEventIntent({
              type: "comment",
              at,
              author: parsed.author,
              body: commentBody,
            }),
            touchTaskDocMetaIntent({
              updatedBy: parsed.author,
              version: normalizeTaskDocVersion(task.doc_version),
            }),
          ],
          nextTask: {
            ...task,
            status: "BLOCKED",
            extensions,
            comments: [...(task.comments ?? []), { author: parsed.author, body: commentBody }],
            events: appendTaskEvent(task, {
              type: "comment",
              at,
              author: parsed.author,
              body: commentBody,
            }),
            doc_version: normalizeTaskDocVersion(task.doc_version),
            doc_updated_at: at,
            doc_updated_by: parsed.author,
          },
        };
      },
    });
    emitCommandResult(createCliEmitter(), {
      kind: "success",
      action: "question-opened",
      target: parsed.taskId,
    });
    return 0;
  };
}

