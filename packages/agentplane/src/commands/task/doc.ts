import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  ensureDocSections,
  normalizeDocSectionName,
  parseDocSections,
  setMarkdownSection,
} from "@agentplaneorg/core";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import {
  infoMessage,
  missingValueMessage,
  unknownEntityMessage,
  usageMessage,
  backendNotSupportedMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

export const TASK_DOC_SET_USAGE =
  "Usage: agentplane task doc set <task-id> --section <name> (--text <text> | --file <path>)";
export const TASK_DOC_SET_USAGE_EXAMPLE =
  'agentplane task doc set 202602030608-F1Q8AB --section Summary --text "..."';
export const TASK_DOC_SHOW_USAGE =
  "Usage: agentplane task doc show <task-id> [--section <name>] [--quiet]";
export const TASK_DOC_SHOW_USAGE_EXAMPLE =
  "agentplane task doc show 202602030608-F1Q8AB --section Summary";

type TaskDocSetFlags = {
  section?: string;
  text?: string;
  file?: string;
  updatedBy?: string;
};

type TaskDocShowFlags = {
  section?: string;
  quiet: boolean;
};

function parseTaskDocShowFlags(args: string[]): TaskDocShowFlags {
  const out: TaskDocShowFlags = { quiet: false };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg === "--section") {
      const next = args[i + 1];
      if (!next) {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
      }
      out.section = next;
      i++;
      continue;
    }
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
  }
  return out;
}

function parseTaskDocSetFlags(args: string[]): TaskDocSetFlags {
  const out: TaskDocSetFlags = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    if (!arg.startsWith("--")) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unexpected argument: ${arg}` });
    }

    const next = args[i + 1];
    if (!next) {
      throw new CliError({ exitCode: 2, code: "E_USAGE", message: missingValueMessage(arg) });
    }

    switch (arg) {
      case "--section": {
        out.section = next;
        break;
      }
      case "--text": {
        out.text = next;
        break;
      }
      case "--file": {
        out.file = next;
        break;
      }
      case "--updated-by": {
        out.updatedBy = next;
        break;
      }
      default: {
        throw new CliError({ exitCode: 2, code: "E_USAGE", message: `Unknown flag: ${arg}` });
      }
    }

    i++;
  }

  return out;
}

export async function cmdTaskDocSet(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskDocSetFlags(opts.args);

  if (!flags.section) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_DOC_SET_USAGE, TASK_DOC_SET_USAGE_EXAMPLE),
    });
  }

  const hasText = flags.text !== undefined;
  const hasFile = flags.file !== undefined;
  if (hasText === hasFile) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_DOC_SET_USAGE, TASK_DOC_SET_USAGE_EXAMPLE),
    });
  }

  let updatedBy: string | undefined;
  if (flags.updatedBy !== undefined) {
    const trimmed = flags.updatedBy.trim();
    if (trimmed.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--updated-by must be non-empty",
      });
    }
    updatedBy = trimmed;
  }

  let text = flags.text ?? "";
  if (hasFile) {
    try {
      text = await readFile(path.resolve(opts.cwd, flags.file ?? ""), "utf8");
    } catch (err) {
      throw mapCoreError(err, { command: "task doc set", filePath: flags.file ?? "" });
    }
  }

  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const backend = ctx.taskBackend;
    const resolved = ctx.resolvedProject;
    const config = ctx.config;
    if (!backend.getTaskDoc || !backend.setTaskDoc) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }
    const allowed = config.tasks.doc.sections;
    if (!allowed.includes(flags.section)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("doc section", flags.section),
      });
    }
    const normalizedAllowed = new Set(allowed.map((section) => normalizeDocSectionName(section)));
    const targetKey = normalizeDocSectionName(flags.section);
    const headingKeys = new Set<string>();
    for (const line of text.replaceAll("\r\n", "\n").split("\n")) {
      const match = /^##\s+(.*)$/.exec(line.trim());
      if (!match) continue;
      const key = normalizeDocSectionName(match[1] ?? "");
      if (key && normalizedAllowed.has(key)) headingKeys.add(key);
    }
    const existing = await backend.getTaskDoc(opts.taskId);
    const baseDoc = ensureDocSections(existing ?? "", config.tasks.doc.required_sections);
    if (headingKeys.size > 0 && (headingKeys.size > 1 || !headingKeys.has(targetKey))) {
      const fullDoc = ensureDocSections(text, config.tasks.doc.required_sections);
      await backend.setTaskDoc(opts.taskId, fullDoc, updatedBy);
    } else {
      let nextText = text;
      if (headingKeys.size > 0 && headingKeys.has(targetKey)) {
        const lines = nextText.replaceAll("\r\n", "\n").split("\n");
        let firstContent = 0;
        while (firstContent < lines.length && lines[firstContent]?.trim() === "") firstContent++;
        if ((lines[firstContent]?.trim() ?? "") === `## ${flags.section}`) {
          lines.splice(firstContent, 1);
          if (lines[firstContent]?.trim() === "") lines.splice(firstContent, 1);
          nextText = lines.join("\n");
        }
      }
      const nextDoc = setMarkdownSection(baseDoc, flags.section, nextText);
      const normalized = ensureDocSections(nextDoc, config.tasks.doc.required_sections);
      await backend.setTaskDoc(opts.taskId, normalized, updatedBy);
    }
    const tasksDir = path.join(resolved.gitRoot, config.paths.workflow_dir);
    process.stdout.write(`${path.join(tasksDir, opts.taskId, "README.md")}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task doc set", root: opts.rootOverride ?? null });
  }
}

export async function cmdTaskDocShow(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskDocShowFlags(opts.args);
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const backend = ctx.taskBackend;
    if (!backend.getTaskDoc) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }
    const doc = (await backend.getTaskDoc(opts.taskId)) ?? "";
    if (flags.section) {
      const sectionKey = normalizeDocSectionName(flags.section);
      const { sections } = parseDocSections(doc);
      const entry = sections.get(sectionKey);
      const content = entry?.lines ?? [];
      if (content.length > 0) {
        process.stdout.write(`${content.join("\n").trimEnd()}\n`);
        return 0;
      }
      if (!flags.quiet) {
        process.stdout.write(`${infoMessage(`section has no content: ${flags.section}`)}\n`);
      }
      return 0;
    }
    if (doc.trim()) {
      process.stdout.write(`${doc.trimEnd()}\n`);
      return 0;
    }
    if (!flags.quiet) {
      process.stdout.write(`${infoMessage("task doc metadata missing")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task doc show", root: opts.rootOverride ?? null });
  }
}
