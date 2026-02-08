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
import { successMessage, unknownEntityMessage } from "../../cli/output.js";
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

function insertMarkdownSectionBefore(opts: {
  body: string;
  section: string;
  text: string;
  beforeSection: string;
}): string {
  const normalized = opts.body.replaceAll("\r\n", "\n");
  if (normalized.includes(`## ${opts.section}`)) {
    return setMarkdownSection(normalized, opts.section, opts.text);
  }

  const lines = normalized.split("\n");
  const beforeHeading = `## ${opts.beforeSection}`;
  const beforeIdx = lines.findIndex((line) => line.trim() === beforeHeading);
  if (beforeIdx === -1) {
    // Fallback: append at the end if we can't find the insertion anchor.
    return setMarkdownSection(normalized, opts.section, opts.text);
  }

  const textLines = opts.text.replaceAll("\r\n", "\n").split("\n");
  const sectionLines = [`## ${opts.section}`, "", ...textLines, "", ""];
  const out = [...lines.slice(0, beforeIdx), ...sectionLines, ...lines.slice(beforeIdx)];
  return `${out.join("\n").trimEnd()}\n`;
}

export async function cmdTaskScaffold(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  title?: string;
  overwrite: boolean;
  force: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
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
        doc_version: 2,
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

    const frontmatter = taskDataToFrontmatter(baseTask);
    const verifyStepsTemplate = [
      "<!-- TODO: FILL VERIFY STEPS -->",
      "",
      "### Scope",
      "",
      "",
      "### Checks",
      "",
      "",
      "### Evidence / Commands",
      "",
      "",
      "### Pass criteria",
      "",
      "",
    ].join("\n");
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
    const withVerifySteps = insertMarkdownSectionBefore({
      body: baseDoc,
      section: "Verify Steps",
      text: verifyStepsTemplate,
      beforeSection: "Verification",
    });
    const body = setMarkdownSection(withVerifySteps, "Verification", verificationTemplate);
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
