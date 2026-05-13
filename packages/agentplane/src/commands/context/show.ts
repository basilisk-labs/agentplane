import path from "node:path";

import { CliError } from "../../shared/errors.js";
import {
  parseLineRange,
  locateMarkdownSection,
  parseSourceRef,
  readText,
  buildSnippet,
  fileExists,
  parseJsonlLines,
} from "./context-utils.js";

export async function cmdContextShow(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { ref: string };
}): Promise<number> {
  const projectRoot = path.resolve(opts.rootOverride ?? opts.cwd);
  const parsed = parseSourceRef(opts.parsed.ref);
  const rawPath = parsed.path;
  if (!rawPath || rawPath.includes("..")) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Invalid source reference path: ${rawPath}`,
    });
  }
  const absolutePath = path.resolve(projectRoot, rawPath);
  const relativePath = toPosixSafeRelative(projectRoot, absolutePath);
  if (!isPathInsideProject(projectRoot, absolutePath)) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Path escapes project root: ${rawPath}`,
    });
  }

  const targetPath = path.join(projectRoot, relativePath);
  if (!(await fileExists(targetPath))) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Path not found: ${parsed.path}`,
    });
  }
  const relative = relativePath;
  const text = await readText(targetPath);
  const selectors = parsed.selectors;
  const selectorKeys = Object.keys(selectors);

  if (selectorKeys.length === 0) {
    process.stdout.write(text.endsWith("\n") ? text : `${text}\n`);
    return 0;
  }

  if (selectorKeys.includes("line") || selectorKeys.includes("lines")) {
    const rangeValue = selectors.lines ?? selectors.line;
    const range = parseLineRange(rangeValue);
    if (!range) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Invalid line range: ${rangeValue}`,
      });
    }
    const lines = text.split(/\r?\n/);
    const snippet = buildSnippet(lines, range[0], range[1]);
    process.stdout.write(snippet.endsWith("\n") ? snippet : `${snippet}\n`);
    return 0;
  }

  if (selectors.section) {
    const heading = locateMarkdownSection(text, selectors.section);
    if (!heading) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Section not found: ${selectors.section}`,
      });
    }
    const lines = text.split(/\r?\n/);
    const snippet = buildSnippet(lines, heading.start, heading.end);
    process.stdout.write(snippet.endsWith("\n") ? snippet : `${snippet}\n`);
    return 0;
  }

  const selectorValue = ["fact", "entity", "edge", "capability", "task"].find((key) =>
    selectorKeys.includes(key),
  );
  if (selectorValue) {
    const wanted = selectors[selectorValue];
    if (!wanted) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Missing selector value",
      });
    }
    const rows = parseJsonlLines(text);
    const row = rows.find(
      (item) =>
        String(
          (item as Record<string, unknown>)[selectorValue] ??
            (item as Record<string, unknown>).id ??
            "",
        ) === wanted,
    );
    if (!row) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Row not found: ${relative}#${selectorValue}=${wanted}`,
      });
    }
    process.stdout.write(`${JSON.stringify(row, null, 2)}\n`);
    return 0;
  }

  process.stdout.write(text.endsWith("\n") ? text : `${text}\n`);
  return 0;
}

function isPathInsideProject(projectRoot: string, targetPath: string): boolean {
  const root = path.resolve(projectRoot);
  const target = path.resolve(targetPath);
  return target === root || target.startsWith(`${root}${path.sep}`);
}

function toPosixSafeRelative(projectRoot: string, targetPath: string): string {
  const root = path.resolve(projectRoot);
  const target = path.resolve(targetPath);
  if (target === root) return "";
  return target.startsWith(`${root}${path.sep}`) ? toPosix(target.slice(root.length + 1)) : "";

  function toPosix(value: string): string {
    return value.split(path.sep).join("/");
  }
}
