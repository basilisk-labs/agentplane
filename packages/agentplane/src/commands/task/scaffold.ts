import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  ensureDocSections,
  renderTaskReadme,
  setMarkdownSection,
  taskReadmePath,
} from "@agentplaneorg/core";

import { type TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import {
  missingValueMessage,
  successMessage,
  unknownEntityMessage,
  usageMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  loadCommandContext,
  taskDataToFrontmatter,
  type CommandContext,
} from "../shared/task-backend.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import { nowIso } from "./shared.js";

export const TASK_SCAFFOLD_USAGE =
  "Usage: agentplane task scaffold <task-id> [--title <text>] [--overwrite] [--force]";
export const TASK_SCAFFOLD_USAGE_EXAMPLE = "agentplane task scaffold 202602030608-F1Q8AB";

type TaskScaffoldFlags = {
  taskId: string;
  title?: string;
  overwrite: boolean;
  force: boolean;
  quiet: boolean;
};

function parseTaskScaffoldFlags(args: string[]): TaskScaffoldFlags {
  const [taskId, ...rest] = args;
  if (!taskId) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_SCAFFOLD_USAGE, TASK_SCAFFOLD_USAGE_EXAMPLE),
    });
  }
  const out: TaskScaffoldFlags = { taskId, overwrite: false, force: false, quiet: false };
  for (let i = 0; i < rest.length; i++) {
    const arg = rest[i];
    if (!arg) continue;
    if (arg === "--overwrite") {
      out.overwrite = true;
      continue;
    }
    if (arg === "--force") {
      out.force = true;
      continue;
    }
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--title") {
      const next = rest[i + 1];
      if (!next) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: missingValueMessage("--title"),
        });
      }
      out.title = next;
      i++;
      continue;
    }
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown flag: ${arg}`,
    });
  }
  return out;
}

export async function cmdTaskScaffold(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskScaffoldFlags(opts.args);
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const backend = ctx.taskBackend;
    const resolved = ctx.resolvedProject;
    const config = ctx.config;
    const task = await backend.getTask(flags.taskId);
    if (!task && !flags.force) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("task id", flags.taskId),
      });
    }
    const readmePath = taskReadmePath(
      path.join(resolved.gitRoot, config.paths.workflow_dir),
      flags.taskId,
    );
    try {
      await readFile(readmePath, "utf8");
      if (!flags.overwrite) {
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
        id: flags.taskId,
        title: flags.title ?? "",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "",
        depends_on: [],
        tags: [],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: nowIso(),
        doc_updated_by: "UNKNOWN",
      } satisfies TaskData);
    if (flags.title) baseTask.title = flags.title;
    if (
      typeof baseTask.doc_updated_by !== "string" ||
      baseTask.doc_updated_by.trim().length === 0 ||
      baseTask.doc_updated_by.trim().toLowerCase() === "agentplane"
    ) {
      baseTask.doc_updated_by = baseTask.owner?.trim() ? baseTask.owner : "UNKNOWN";
    }

    const frontmatter = taskDataToFrontmatter(baseTask);
    const verificationTemplate = [
      "### Plan",
      "",
      "",
      "### Results",
      "",
      "",
      "<!-- BEGIN VERIFICATION RESULTS -->",
      "<!-- END VERIFICATION RESULTS -->",
    ].join("\n");
    const baseDoc = ensureDocSections("", config.tasks.doc.required_sections);
    const body = setMarkdownSection(baseDoc, "Verification", verificationTemplate);
    const text = renderTaskReadme(frontmatter, body);
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeTextIfChanged(readmePath, text.endsWith("\n") ? text : `${text}\n`);
    if (!flags.quiet) {
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
