import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  normalizeDocSectionName,
  normalizeTaskDoc,
  parseTaskReadme,
  parseDocSections,
  renderTaskDocFromSections,
  setMarkdownSection,
  taskReadmeDocBody,
  taskDocToSectionMap,
  ensureDocSections,
} from "@agentplaneorg/core/tasks";

import { mapBackendError, mapCoreError } from "../../cli/error-map.js";
import {
  infoMessage,
  unknownEntityMessage,
  backendNotSupportedMessage,
  warnMessage,
} from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskMutation, withTaskMutationStorage } from "../shared/task-mutation.js";
import {
  replaceTaskDocIntent,
  setTaskSectionIntent,
  touchTaskDocMetaIntent,
} from "../shared/task-store.js";

import { decodeEscapedTaskTextNewlines, resolveWritableDocSections } from "./shared.js";

type TaskDocSetOutcome = "section-updated" | "full-doc-updated" | "no-change";

function extractSectionTextForPatch(doc: string, section: string): string | null {
  const { sections } = parseDocSections(doc);
  const entry = sections.get(normalizeDocSectionName(section));
  return entry ? entry.lines.join("\n").trimEnd() : null;
}

function extractSectionTextFromSectionsMap(
  sections: Record<string, unknown>,
  section: string,
): string | null {
  const target = normalizeDocSectionName(section);
  for (const [title, text] of Object.entries(sections)) {
    if (normalizeDocSectionName(title) !== target) continue;
    if (typeof text === "string") return text.trimEnd();
  }
  return null;
}

function extractSectionTextFromTaskReadme(
  readme: string,
  section: string,
): string | null {
  try {
    const parsed = parseTaskReadme(readme);
    const rawSections = parsed.frontmatter.sections;
    if (!rawSections || typeof rawSections !== "object" || Array.isArray(rawSections)) return null;
    return extractSectionTextFromSectionsMap(rawSections as Record<string, unknown>, section);
  } catch {
    return null;
  }
}

function buildUpdatedTaskDoc(opts: {
  baseDocRaw: string;
  section?: string;
  text: string;
  requestMode: "full-doc" | "section";
  sectionOrder: string[];
  headingKeys: Set<string>;
  targetKey: string;
}): string {
  const baseDoc = ensureDocSections(opts.baseDocRaw, opts.sectionOrder);
  if (opts.requestMode === "full-doc") {
    return ensureDocSections(opts.text, opts.sectionOrder);
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
    opts.sectionOrder,
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
    if (
      backend.capabilities?.writes_task_readmes === false ||
      !backend.getTaskDoc ||
      !backend.writeTask
    ) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: backendNotSupportedMessage("task docs"),
      });
    }
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
      const sectionOrder =
        requestMode === "full-doc"
          ? [...config.tasks.doc.required_sections]
          : resolveWritableDocSections({
              allowedSections: allowed,
            requiredSections: config.tasks.doc.required_sections,
            targetSection: opts.section ?? "",
          });
    let changed = false;
    const result = await applyTaskMutation({
      ctx,
      taskId: opts.taskId,
      build: async (current) => {
        const currentDocRaw =
          typeof current.doc === "string"
            ? current.doc
            : ((await backend.getTaskDoc!(opts.taskId)) ?? "");
        const currentDocText =
          (() => {
            try {
              const parsed = parseTaskReadme(currentDocRaw);
              return taskReadmeDocBody(
                parsed.frontmatter as Record<string, unknown>,
                parsed.body,
              );
            } catch {
              return currentDocRaw;
            }
          })();
        const nextDoc = buildUpdatedTaskDoc({
          baseDocRaw: requestMode === "full-doc" ? currentDocRaw : currentDocText,
          section: opts.section,
          text,
          requestMode,
          sectionOrder,
          headingKeys,
          targetKey,
        });
        const docSource = requestMode === "full-doc" ? currentDocRaw : currentDocText;
        const currentSectionText =
          requestMode === "full-doc"
            ? null
            : extractSectionTextForPatch(docSource, opts.section ?? "") ??
              extractSectionTextFromTaskReadme(currentDocRaw, opts.section ?? "");
        const nextSectionText = requestMode === "full-doc"
          ? undefined
          : extractSectionTextForPatch(nextDoc, opts.section ?? "");
        const docChanged =
          requestMode === "full-doc"
            ? normalizeTaskDoc(docSource) !== normalizeTaskDoc(nextDoc)
            : normalizeTaskDoc(currentSectionText ?? "") !== normalizeTaskDoc(nextSectionText ?? "");
        const shouldWrite = docChanged || updatedBy !== undefined;
        if (!shouldWrite) return null;
        if (!docChanged) {
          return {
            intents: [touchTaskDocMetaIntent({ updatedBy })],
          };
        }
        if (requestMode === "full-doc") {
          return {
            intents: [
              replaceTaskDocIntent({
                doc: nextDoc,
                expectedCurrentDoc: currentDocRaw,
              }),
              ...(updatedBy ? [touchTaskDocMetaIntent({ updatedBy })] : []),
            ],
            writeOptions: {
              expectedCurrentDoc: currentDocRaw,
            },
          };
        }
        const expectedCurrentSectionText =
          extractSectionTextForPatch(currentDocText, opts.section ?? "") ??
          extractSectionTextFromTaskReadme(currentDocRaw, opts.section ?? "");
        return {
          intents: [
            setTaskSectionIntent({
              section: opts.section ?? "",
              text: extractSectionTextForPatch(nextDoc, opts.section ?? "") ?? "",
              requiredSections: sectionOrder,
              expectedCurrentText: expectedCurrentSectionText,
            }),
            ...(updatedBy ? [touchTaskDocMetaIntent({ updatedBy })] : []),
          ],
          writeOptions: {
            expectedCurrentText: expectedCurrentSectionText,
            expectedSection: opts.section ?? "",
          },
        };
      },
    });
    changed = result.changed;
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
    const doc = await withTaskMutationStorage({
      ctx,
      local: async (store) => {
        const storeTask = await store.get(opts.taskId);
        return storeTask?.sections && Object.keys(storeTask.sections).length > 0
          ? renderTaskDocFromSections(storeTask.sections)
          : String(storeTask?.doc ?? "");
      },
      remote: async (remoteBackend) => (await remoteBackend.getTaskDoc!(opts.taskId)) ?? "",
    });
    const canonicalSections = new Map<string, { title: string; lines: string[] }>();
    for (const [title, text] of Object.entries(taskDocToSectionMap(doc))) {
      canonicalSections.set(normalizeDocSectionName(title), {
        title,
        lines: String(text ?? "").split("\n"),
      });
    }
    if (opts.section) {
      const sectionKey = normalizeDocSectionName(opts.section);
      const entry = canonicalSections.get(sectionKey);
      const content = entry?.lines ?? [];
      if (content.some((line) => line.trim().length > 0)) {
        process.stdout.write(`${content.join("\n").trimEnd()}\n`);
        return 0;
      }
      if (!opts.quiet) {
        process.stdout.write(`${infoMessage(`section has no content: ${opts.section}`)}\n`);
        return 0;
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
