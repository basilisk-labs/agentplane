import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  ensureDocSections,
  normalizeDocSectionName,
  parseDocSections,
  setMarkdownSection,
} from "@agentplaneorg/core";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import { infoMessage, unknownEntityMessage, backendNotSupportedMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";

export async function cmdTaskDocSet(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  section: string;
  text?: string;
  file?: string;
  updatedBy?: string;
}): Promise<number> {
  let updatedBy: string | undefined;
  if (opts.updatedBy !== undefined) {
    const trimmed = opts.updatedBy.trim();
    if (trimmed.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--updated-by must be non-empty",
      });
    }
    updatedBy = trimmed;
  }

  const hasText = opts.text !== undefined;
  const hasFile = opts.file !== undefined;
  if (hasText === hasFile) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Exactly one of --text or --file must be provided",
    });
  }

  let text = opts.text ?? "";
  if (hasFile) {
    try {
      text = await readFile(path.resolve(opts.cwd, opts.file ?? ""), "utf8");
    } catch (err) {
      throw mapCoreError(err, { command: "task doc set", filePath: opts.file ?? "" });
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
    const useStore = backendIsLocalFileBackend(ctx);
    const store = useStore ? getTaskStore(ctx) : null;
    const allowed = config.tasks.doc.sections;
    if (!allowed.includes(opts.section)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("doc section", opts.section),
      });
    }
    const normalizedAllowed = new Set(allowed.map((section) => normalizeDocSectionName(section)));
    const targetKey = normalizeDocSectionName(opts.section);
    const headingKeys = new Set<string>();
    for (const line of text.replaceAll("\r\n", "\n").split("\n")) {
      const match = /^##\s+(.*)$/.exec(line.trim());
      if (!match) continue;
      const key = normalizeDocSectionName(match[1] ?? "");
      if (key && normalizedAllowed.has(key)) headingKeys.add(key);
    }
    const storeTask = useStore ? await store!.get(opts.taskId) : null;
    const baseDocRaw = useStore
      ? String(storeTask!.doc ?? "")
      : ((await backend.getTaskDoc(opts.taskId)) ?? "");
    const baseDoc = ensureDocSections(baseDocRaw, config.tasks.doc.required_sections);
    if (headingKeys.size > 0 && (headingKeys.size > 1 || !headingKeys.has(targetKey))) {
      const fullDoc = ensureDocSections(text, config.tasks.doc.required_sections);
      await (useStore
        ? store!.update(opts.taskId, (current) => ({
            ...current,
            doc: fullDoc,
            ...(updatedBy ? { doc_updated_by: updatedBy } : {}),
          }))
        : backend.setTaskDoc(opts.taskId, fullDoc, updatedBy));
    } else {
      let nextText = text;
      if (headingKeys.size > 0 && headingKeys.has(targetKey)) {
        const lines = nextText.replaceAll("\r\n", "\n").split("\n");
        let firstContent = 0;
        while (firstContent < lines.length && lines[firstContent]?.trim() === "") firstContent++;
        if ((lines[firstContent]?.trim() ?? "") === `## ${opts.section}`) {
          lines.splice(firstContent, 1);
          if (lines[firstContent]?.trim() === "") lines.splice(firstContent, 1);
          nextText = lines.join("\n");
        }
      }
      const nextDoc = setMarkdownSection(baseDoc, opts.section, nextText);
      const normalized = ensureDocSections(nextDoc, config.tasks.doc.required_sections);
      await (useStore
        ? store!.update(opts.taskId, (current) => ({
            ...current,
            doc: normalized,
            ...(updatedBy ? { doc_updated_by: updatedBy } : {}),
          }))
        : backend.setTaskDoc(opts.taskId, normalized, updatedBy));
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
  section?: string;
  quiet: boolean;
}): Promise<number> {
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
    const useStore = backendIsLocalFileBackend(ctx);
    const storeTask = useStore ? await getTaskStore(ctx).get(opts.taskId) : null;
    const doc = useStore
      ? String(storeTask!.doc ?? "")
      : ((await backend.getTaskDoc(opts.taskId)) ?? "");
    if (opts.section) {
      const sectionKey = normalizeDocSectionName(opts.section);
      const { sections } = parseDocSections(doc);
      const entry = sections.get(sectionKey);
      const content = entry?.lines ?? [];
      if (content.length > 0) {
        process.stdout.write(`${content.join("\n").trimEnd()}\n`);
        return 0;
      }
      if (!opts.quiet) {
        process.stdout.write(`${infoMessage(`section has no content: ${opts.section}`)}\n`);
      }
      return 0;
    }
    if (doc.trim()) {
      process.stdout.write(`${doc.trimEnd()}\n`);
      return 0;
    }
    if (!opts.quiet) {
      process.stdout.write(`${infoMessage("task doc metadata missing")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task doc show", root: opts.rootOverride ?? null });
  }
}
