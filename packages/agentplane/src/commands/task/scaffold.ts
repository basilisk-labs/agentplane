import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { renderTaskReadme, taskReadmePath } from "@agentplaneorg/core";

import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { successMessage, unknownEntityMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  loadCommandContext,
  taskDataToFrontmatter,
  type CommandContext,
} from "../shared/task-backend.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import { nowIso } from "./shared.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { defaultTaskDocV3, TASK_DOC_VERSION_V3 } from "./doc-template.js";

export async function cmdTaskScaffold(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  title?: string;
  overwrite: boolean;
  force: boolean;
  yes?: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    if (opts.force) {
      await ensureActionApproved({
        action: "force_action",
        config: ctx.config,
        yes: opts.yes === true,
        reason: "task scaffold --force",
      });
    }
    const backend = ctx.taskBackend;
    const resolved = ctx.resolvedProject;
    const config = ctx.config;
    const task = await backend.getTask(opts.taskId);
    if (!task && !opts.force) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("task id", opts.taskId),
      });
    }
    const readmePath = taskReadmePath(
      path.join(resolved.gitRoot, config.paths.workflow_dir),
      opts.taskId,
    );
    try {
      await readFile(readmePath, "utf8");
      if (!opts.overwrite) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `File already exists: ${readmePath}`,
        });
      }
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      if (code !== "ENOENT") {
        if (err instanceof CliError) throw err;
        throw err;
      }
    }

    const baseTask: TaskData =
      task ??
      ({
        id: opts.taskId,
        title: opts.title ?? "",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "",
        depends_on: [],
        tags: [],
        verify: [],
        comments: [],
        doc_version: TASK_DOC_VERSION_V3,
        doc_updated_at: nowIso(),
        doc_updated_by: "UNKNOWN",
      } satisfies TaskData);
    if (opts.title) baseTask.title = opts.title;
    if (
      typeof baseTask.doc_updated_by !== "string" ||
      baseTask.doc_updated_by.trim().length === 0 ||
      baseTask.doc_updated_by.trim().toLowerCase() === "agentplane"
    ) {
      baseTask.doc_updated_by = baseTask.owner?.trim() ? baseTask.owner : "UNKNOWN";
    }
    baseTask.doc_version = TASK_DOC_VERSION_V3;

    const frontmatter = taskDataToFrontmatter(baseTask);
    const body = defaultTaskDocV3({
      title: baseTask.title,
      description: baseTask.description ?? "",
    });
    const text = renderTaskReadme(frontmatter, body);
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeTextIfChanged(readmePath, text.endsWith("\n") ? text : `${text}\n`);
    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage("wrote", path.relative(resolved.gitRoot, readmePath))}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task scaffold", root: opts.rootOverride ?? null });
  }
}
