import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  ensureDocSections,
  normalizeDocSectionName,
  normalizeTaskDoc,
  parseDocSections,
  setMarkdownSection,
} from "@agentplaneorg/core";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import {
  infoMessage,
  unknownEntityMessage,
  backendNotSupportedMessage,
  warnMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { backendIsLocalFileBackend, getTaskStore } from "../shared/task-store.js";

import { decodeEscapedTaskTextNewlines } from "./shared.js";

type TaskDocSetOutcome = "section-updated" | "full-doc-updated" | "no-change";

function extractSectionTextForPatch(doc: string, section: string): string | null {
  const { sections } = parseDocSections(doc);
  const entry = sections.get(normalizeDocSectionName(section));
  return entry ? entry.lines.join("\n").trimEnd() : null;
}

function buildUpdatedTaskDoc(opts: {
  baseDocRaw: string;
  section?: string;
  text: string;
  requestMode: "full-doc" | "section";
  requiredSections: string[];
  headingKeys: Set<string>;
  targetKey: string;
}): string {
  const baseDoc = ensureDocSections(opts.baseDocRaw, opts.requiredSections);
  if (opts.requestMode === "full-doc") {
    return ensureDocSections(opts.text, opts.requiredSections);
  }

  let nextText = opts.text;
  if (opts.headingKeys.size > 0 && opts.headingKeys.has(opts.targetKey)) {
    const lines = nextText.replaceAll("\r\n", "\n").split("\n");
    let firstContent = 0;
    while (firstContent < lines.length && lines[firstContent]?.trim() === "") firstContent++;
    if ((lines[firstContent]?.trim() ?? "") === `## ${opts.section}`) {
      lines.splice(firstContent, 1);
      if (lines[firstContent]?.trim() === "") lines.splice(firstContent, 1);
      nextText = lines.join("\n");
    }
  }

  return ensureDocSections(
    setMarkdownSection(baseDoc, opts.section ?? "", nextText),
    opts.requiredSections,
  );
}

export async function cmdTaskDocSet(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  section?: string;
  text?: string;
  file?: string;
  updatedBy?: string;
  fullDoc: boolean;
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
  if (hasText) {
    text = decodeEscapedTaskTextNewlines(text);
  }
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
    if (!opts.fullDoc && !opts.section) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Missing required option: --section (or pass --full-doc)",
      });
    }
    if (opts.fullDoc && opts.section) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Use either --section or --full-doc (not both)",
      });
    }
    if (!opts.fullDoc && !allowed.includes(opts.section ?? "")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: unknownEntityMessage("doc section", opts.section ?? ""),
      });
    }
    const normalizedAllowed = new Set(allowed.map((section) => normalizeDocSectionName(section)));
    const targetKey = normalizeDocSectionName(opts.section ?? "");
    const headingKeys = new Set<string>();
    for (const line of text.replaceAll("\r\n", "\n").split("\n")) {
      const match = /^##\s+(.*)$/.exec(line.trim());
      if (!match) continue;
      const key = normalizeDocSectionName(match[1] ?? "");
      if (key && normalizedAllowed.has(key)) headingKeys.add(key);
    }
    const requestMode = opts.fullDoc
      ? "full-doc"
      : headingKeys.size > 0 && (headingKeys.size > 1 || !headingKeys.has(targetKey))
        ? "full-doc"
        : "section";
    let changed = false;
    if (useStore) {
      let expectedCurrentDoc: string | undefined;
      let expectedCurrentSectionText: string | null | undefined;
      const result = await store!.patch(opts.taskId, (current) => {
        const currentDocRaw = String(current.doc ?? "");
        const nextDoc = buildUpdatedTaskDoc({
          baseDocRaw: currentDocRaw,
          section: opts.section,
          text,
          requestMode,
          requiredSections: config.tasks.doc.required_sections,
          headingKeys,
          targetKey,
        });
        const docChanged = normalizeTaskDoc(currentDocRaw) !== normalizeTaskDoc(nextDoc);
        const shouldWrite = docChanged || updatedBy !== undefined;
        if (!shouldWrite) return null;
        if (!docChanged) {
          return {
            docMeta: {
              touch: true,
              ...(updatedBy ? { updatedBy } : {}),
            },
          };
        }
        if (requestMode === "full-doc") {
          expectedCurrentDoc ??= currentDocRaw;
          return {
            doc: {
              kind: "replace-doc",
              doc: nextDoc,
              expectedCurrentDoc,
            },
            ...(updatedBy ? { docMeta: { updatedBy } } : {}),
          };
        }
        expectedCurrentSectionText ??= extractSectionTextForPatch(
          currentDocRaw,
          opts.section ?? "",
        );
        return {
          doc: {
            kind: "set-section",
            section: opts.section ?? "",
            text: extractSectionTextForPatch(nextDoc, opts.section ?? "") ?? "",
            requiredSections: config.tasks.doc.required_sections,
            expectedCurrentText: expectedCurrentSectionText,
          },
          ...(updatedBy ? { docMeta: { updatedBy } } : {}),
        };
      });
      changed = result.changed;
    } else {
      const baseDocRaw = (await backend.getTaskDoc(opts.taskId)) ?? "";
      const nextDoc = buildUpdatedTaskDoc({
        baseDocRaw,
        section: opts.section,
        text,
        requestMode,
        requiredSections: config.tasks.doc.required_sections,
        headingKeys,
        targetKey,
      });
      const docChanged = normalizeTaskDoc(baseDocRaw) !== normalizeTaskDoc(nextDoc);
      const shouldWrite = docChanged || updatedBy !== undefined;
      if (shouldWrite) {
        await backend.setTaskDoc(opts.taskId, nextDoc, updatedBy);
      }
      changed = shouldWrite;
    }
    const outcome: TaskDocSetOutcome = changed
      ? requestMode === "full-doc"
        ? "full-doc-updated"
        : "section-updated"
      : "no-change";
    const tasksDir = path.join(resolved.gitRoot, config.paths.workflow_dir);
    process.stdout.write(`${path.join(tasksDir, opts.taskId, "README.md")}\n`);
    const outcomeTarget = opts.fullDoc ? "<full-doc>" : (opts.section ?? "");
    const outcomeText = `task doc set outcome=${outcome} section=${outcomeTarget}`;
    process.stderr.write(
      `${outcome === "no-change" ? warnMessage(outcomeText) : infoMessage(outcomeText)}\n`,
    );
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
