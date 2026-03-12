import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";

import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";
import { appendTaskEvent, normalizeTaskDocVersion, nowIso } from "./shared.js";

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
    const useStore = backendIsLocalFileBackend(ctx);
    const store = useStore ? getTaskStore(ctx) : null;
    const task = useStore
      ? await store!.get(opts.taskId)
      : await loadTaskFromContext({ ctx, taskId: opts.taskId });
    const at = nowIso();
    await (useStore
      ? store!.update(opts.taskId, (current) => {
          const existing = Array.isArray(current.comments)
            ? current.comments.filter(
                (item): item is { author: string; body: string } =>
                  !!item && typeof item.author === "string" && typeof item.body === "string",
              )
            : [];
          return {
            ...current,
            comments: [...existing, { author: opts.author, body: opts.body }],
            events: appendTaskEvent(current, {
              type: "comment",
              at,
              author: opts.author,
              body: opts.body,
            }),
            doc_version: normalizeTaskDocVersion(current.doc_version),
            doc_updated_at: at,
            doc_updated_by: opts.author,
          };
        })
      : ctx.taskBackend.writeTask({
          ...task,
          comments: [
            ...(Array.isArray(task.comments)
              ? task.comments.filter(
                  (item): item is { author: string; body: string } =>
                    !!item && typeof item.author === "string" && typeof item.body === "string",
                )
              : []),
            { author: opts.author, body: opts.body },
          ],
          events: appendTaskEvent(task, {
            type: "comment",
            at,
            author: opts.author,
            body: opts.body,
          }),
          doc_version: normalizeTaskDocVersion(task.doc_version),
          doc_updated_at: at,
          doc_updated_by: opts.author,
        }));
    process.stdout.write(`${successMessage("commented", opts.taskId)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task comment", root: opts.rootOverride ?? null });
  }
}
