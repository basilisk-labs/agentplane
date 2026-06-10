import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter, emitCommandResult } from "../../cli/output.js";
import type { CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { appendTaskEvent, normalizeTaskDocVersion, nowIso } from "./shared.js";
import { getHumanInputState, setHumanInputState } from "./human-input.js";

export type TaskAnswerParsed = {
  taskId: string;
  by: string;
  body: string;
};

export const taskAnswerSpec: CommandSpec<TaskAnswerParsed> = {
  id: ["task", "answer"],
  group: "Task",
  summary: "Answer and close a task user-input blocker.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "string", name: "by", valueHint: "<USER>", description: "Answer author." },
    { kind: "string", name: "body", valueHint: "<text>", description: "Answer body." },
  ],
  examples: [
    {
      cmd: 'agentplane task answer 202602030608-F1Q8AB --by USER --body "Use the existing REST API."',
      why: "Close the open user-input blocker.",
    },
  ],
  validateRaw: (raw) => {
    for (const key of ["by", "body"] as const) {
      const value = raw.opts[key];
      if (typeof value !== "string" || value.trim() === "") {
        throw usageError({ spec: taskAnswerSpec, message: `Missing required --${key}.` });
      }
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    by: String(raw.opts.by).trim(),
    body: String(raw.opts.body).trim(),
  }),
};

export function makeRunTaskAnswerHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskAnswerParsed): Promise<number> => {
    const commandCtx = await getCtx("task answer");
    const at = nowIso();
    await applyTaskMutation({
      ctx: commandCtx,
      taskId: parsed.taskId,
      build: (task) => {
        const state = getHumanInputState(task);
        const open = state.openQuestion;
        if (!open) {
          throw usageError({
            spec: taskAnswerSpec,
            message: "Task has no open user question.",
          });
        }
        const nextStatus =
          String(task.status).toUpperCase() === "BLOCKED" ? open.previousStatus : task.status;
        const extensions = setHumanInputState(task, {
          openQuestion: null,
          history: [
            ...state.history,
            {
              id: open.id,
              question: open.question,
              askedAt: open.askedAt,
              askedBy: open.askedBy,
              answeredAt: at,
              answeredBy: parsed.by,
              answer: parsed.body,
              previousStatus: open.previousStatus,
            },
          ],
        });
        const commentBody = `User answer: ${parsed.body}`;
        return {
          nextTask: {
            ...task,
            status: nextStatus,
            extensions,
            comments: [...(task.comments ?? []), { author: parsed.by, body: commentBody }],
            events: appendTaskEvent(task, {
              type: "comment",
              at,
              author: parsed.by,
              body: commentBody,
            }),
            doc_version: normalizeTaskDocVersion(task.doc_version),
            doc_updated_at: at,
            doc_updated_by: parsed.by,
          },
        };
      },
    });
    emitCommandResult(createCliEmitter(), {
      kind: "success",
      action: "question-answered",
      target: parsed.taskId,
    });
    return 0;
  };
}

