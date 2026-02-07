import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";

import { loadBackendTask } from "../shared/task-backend.js";
import { appendTaskEvent, nowIso } from "./shared.js";

export async function cmdTaskComment(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
}): Promise<number> {
  try {
    const { backend, task } = await loadBackendTask({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      taskId: opts.taskId,
    });
    const existing = Array.isArray(task.comments)
      ? task.comments.filter(
          (item): item is { author: string; body: string } =>
            !!item && typeof item.author === "string" && typeof item.body === "string",
        )
      : [];
    const at = nowIso();
    const next: TaskData = {
      ...task,
      comments: [...existing, { author: opts.author, body: opts.body }],
      events: appendTaskEvent(task, {
        type: "comment",
        at,
        author: opts.author,
        body: opts.body,
      }),
      doc_version: 2,
      doc_updated_at: at,
      doc_updated_by: opts.author,
    };
    await backend.writeTask(next);
    process.stdout.write(`${successMessage("commented", opts.taskId)}\n`);
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task comment", root: opts.rootOverride ?? null });
  }
}
