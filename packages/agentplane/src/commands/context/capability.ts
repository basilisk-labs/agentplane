import path from "node:path";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { parse as parseYaml } from "yaml";

import { CliError } from "../../shared/errors.js";
import { fileExists, readText, walkScopeFiles } from "./context-utils.js";
import { parseJsonlLines } from "./context-utils.js";
import { readContextProjection } from "./reindex.js";

const SUPPORTED_EXTENSIONS = new Set([".md", ".mdx", ".jsonl", ".yml", ".yaml"]);

export async function cmdContextCapabilityValidate(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { path: string };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const target = path.join(root, opts.parsed.path);
  if (!(await fileExists(target))) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Capability artifact not found: ${opts.parsed.path}`,
    });
  }

  const extension = path.extname(target).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(extension)) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Unsupported capability artifact format: ${extension}`,
    });
  }

  const text = await readText(target);
  if (!text.trim()) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Capability artifact is empty: ${opts.parsed.path}`,
    });
  }

  if (extension === ".jsonl") {
    const rows = parseJsonlLines(text);
    for (const row of rows) {
      if (typeof row.id !== "string" || !row.id.trim()) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Capability row missing id in ${opts.parsed.path}`,
        });
      }
      if (typeof row.status !== "undefined" && typeof row.status !== "string") {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Capability row has invalid status in ${opts.parsed.path}: ${row.id}`,
        });
      }
      const rawSourceRefs = (row as { source_refs?: unknown }).source_refs;
      if (rawSourceRefs !== undefined && !Array.isArray(rawSourceRefs)) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Capability row has invalid source_refs in ${opts.parsed.path}: ${row.id}`,
        });
      }
      const sourceRefs = Array.isArray(rawSourceRefs) ? rawSourceRefs : [];
      if (sourceRefs.length === 0) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Capability row has empty source_refs in ${opts.parsed.path}: ${row.id}`,
        });
      }
    }
    process.stdout.write(
      `context capability validate: ${opts.parsed.path}: ok (${rows.length} row(s))\n`,
    );
    return 0;
  }

  if (text.trim().startsWith("---")) {
    const closeIndex = text.indexOf("---", 3);
    if (closeIndex <= 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Capability artifact has malformed frontmatter: ${opts.parsed.path}`,
      });
    }
    const frontmatterText = text.slice(3, closeIndex);
    try {
      const frontmatter = parseYaml(frontmatterText) as unknown;
      if (
        typeof frontmatter !== "object" ||
        frontmatter === null ||
        Array.isArray(frontmatter) ||
        (!("id" in (frontmatter as object)) &&
          !("name" in (frontmatter as object)) &&
          !("title" in (frontmatter as object)))
      ) {
        throw new Error("bad frontmatter");
      }
    } catch {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Invalid capability frontmatter: ${opts.parsed.path}`,
      });
    }
  }

  process.stdout.write(`context capability validate: ${opts.parsed.path}: ok\n`);
  return 0;
}

export async function cmdContextCapabilitySearch(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { query: string };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const query = opts.parsed.query.trim().toLowerCase();
  if (!query) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "query is required" });
  }

  const projection = await readContextProjection(root);
  if (projection) {
    const matches = projection.rows
      .filter((row) => isCapabilityProjectionPath(row.path))
      .filter(
        (row) => row.body.toLowerCase().includes(query) || row.path.toLowerCase().includes(query),
      );
    for (const row of matches) {
      process.stdout.write(`match: ${row.path}\n`);
      if (row.source_refs && row.source_refs.length > 0) {
        process.stdout.write(`  source_refs: ${row.source_refs.join(", ")}\n`);
      }
    }
    if (matches.length === 0) process.stdout.write("No capability matches\n");
    return 0;
  }

  const files = await walkScopeFiles(root, ["capabilities"]);
  let found = false;
  for (const file of files) {
    const abs = path.join(root, file);
    if (!(await fileExists(abs))) continue;
    const text = await readText(abs);
    const lines = text.split(/\\r?\\n/);
    if (text.toLowerCase().includes(query)) {
      process.stdout.write(`match: ${file}\n`);
      found = true;
    }
    if (abs.endsWith(".jsonl")) {
      for (const row of parseJsonlLines(text)) {
        const haystack = JSON.stringify(row).toLowerCase();
        if (haystack.includes(query)) {
          process.stdout.write(
            `match: ${file}#entity=${String((row as { id?: unknown }).id ?? "")}\n`,
          );
          found = true;
        }
      }
    }
    if (found && !text.toLowerCase().includes(query)) {
      const digest = buildDigest(lines);
      if (digest.includes(query)) {
        process.stdout.write(`match: ${file}\n`);
      }
    }
  }
  if (!found) process.stdout.write("No capability matches\n");
  return 0;
}

export async function cmdContextCapabilityDiscover(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { from: string; minSupport: string; writeProposals: boolean };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const from = opts.parsed.from.trim().toLowerCase();
  if (!from) {
    throw new CliError({ exitCode: 2, code: "E_USAGE", message: "from is required" });
  }
  const minSupport = Number.parseInt(opts.parsed.minSupport, 10);
  const effectiveMin = Number.isFinite(minSupport) && minSupport > 0 ? minSupport : 1;
  const projection = await readContextProjection(root);
  if (projection) {
    const scored = projection.rows
      .filter((row) => isCapabilityProjectionPath(row.path))
      .map((row) => {
        const haystack = `${row.path}\n${row.body}`.toLowerCase();
        const support = Math.max(row.source_refs?.length ?? 1, 1);
        return haystack.includes(from) ? { row, support } : { row, support: 0 };
      })
      .filter((item) => item.support >= effectiveMin);
    if (scored.length < effectiveMin) {
      process.stdout.write(
        `capability discover: candidates=${scored.length}, minSupport=${effectiveMin}\n`,
      );
      return 0;
    }
    for (const item of scored) {
      process.stdout.write(`${item.row.path}, support=${item.support}\n`);
    }
    if (!opts.parsed.writeProposals || scored.length === 0) return 0;
    const proposalsDir = path.join(root, "context/capabilities/discoveries");
    await mkdir(proposalsDir, { recursive: true });
    for (const [index, item] of scored.entries()) {
      const proposalPath = path.join(
        proposalsDir,
        `${item.row.path.replace(/[^a-zA-Z0-9-_]/g, "_") || `cap-${index + 1}`}.md`,
      );
      const sourceRefs =
        item.row.source_refs && item.row.source_refs.length > 0
          ? item.row.source_refs
          : [item.row.path];
      const proposalText = [
        "---",
        `id: capability.discovery.${index + 1}`,
        "capability_kind: artifact",
        "visibility: local",
        "status: proposed",
        "source_refs:",
        ...sourceRefs.map((ref) => `  - ${ref}`),
        "---",
        "",
        "# Capability discovery proposal",
        "",
        `Candidate: ${item.row.path}`,
        `Support: ${item.support}`,
        "",
      ].join("\n");
      await writeFile(proposalPath, proposalText, "utf8");
    }
    return 0;
  }

  const sourcePath = path.join(root, ".agentplane/context/derived/capabilities/capabilities.jsonl");
  const entries = await loadJsonlRows(sourcePath);
  const scored = entries
    .map((row) => {
      const source = String((row as { source?: unknown })?.source ?? "").toLowerCase();
      const context = String((row as { context?: unknown })?.context ?? "").toLowerCase();
      const sourceRefs = (row as { source_refs?: unknown }).source_refs;
      const support = Math.max(Array.isArray(sourceRefs) ? sourceRefs.length : 1, 1);
      if (source.includes(from) || context.includes(from)) {
        return { row, support };
      }
      return { row, support: 0 };
    })
    .filter((item) => item.support >= effectiveMin);
  if (scored.length < effectiveMin) {
    process.stdout.write(
      `capability discover: candidates=${scored.length}, minSupport=${effectiveMin}\n`,
    );
    return 0;
  }
  for (const item of scored) {
    const row = item.row as { id?: unknown; source?: unknown };
    process.stdout.write(
      `${String(row.id ?? "<id>")}, source=${String(row.source ?? "")}, support=${item.support}\n`,
    );
  }

  if (!opts.parsed.writeProposals || scored.length === 0) return 0;
  const proposalsDir = path.join(root, "context/capabilities/discoveries");
  await mkdir(proposalsDir, { recursive: true });
  for (const [index, entry] of scored.entries()) {
    const row = entry.row as { id?: unknown; source?: unknown };
    const proposalPath = path.join(
      proposalsDir,
      `${String(row.id ?? `cap-${index + 1}`).replace(/[^a-zA-Z0-9-_]/g, "_")}.md`,
    );
    const sourceHash = createHash("sha256")
      .update(String(row.source ?? ""))
      .digest("hex")
      .slice(0, 8);
    const proposalText = `# Capability proposal\n\nid: ${String(row.id ?? "")}\nsource: ${String(row.source ?? "")}\nsupport: ${entry.support}\nsource_hash: ${sourceHash}\n`;
    await writeFile(proposalPath, proposalText, "utf8");
  }
  return 0;
}

async function loadJsonlRows(filePath: string): Promise<Array<Record<string, unknown>>> {
  const exists = await fileExists(filePath);
  if (!exists) return [];
  const raw = await readText(filePath);
  return parseJsonlLines(raw) as Array<Record<string, unknown>>;
}

function buildDigest(lines: string[]): string {
  return lines.slice(0, 12).join("\\n").toLowerCase();
}

function isCapabilityProjectionPath(value: string): boolean {
  return (
    value.startsWith("context/capabilities/") ||
    value.startsWith(".agentplane/context/derived/capabilities/")
  );
}
