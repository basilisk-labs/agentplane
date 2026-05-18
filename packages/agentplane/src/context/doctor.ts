/* eslint-disable @typescript-eslint/no-base-to-string, @typescript-eslint/no-unsafe-assignment */
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

import { CliError } from "../shared/errors.js";
import { resolveAgentplaneCacheSqlitePath } from "../shared/cache-paths.js";
import { isRecord } from "../shared/guards.js";
import { parseJsonlLines, fileExists, readText } from "./context-utils.js";
import { readHarvestReport } from "./harvest-tasks-artifacts.js";
import { readContextProjection } from "./reindex.js";
import { checkSqliteProjection } from "./sqlite.js";

export async function cmdContextDoctor(opts: {
  cwd: string;
  rootOverride?: string;
  parsed: { fix: boolean };
}): Promise<number> {
  const root = path.resolve(opts.rootOverride ?? opts.cwd);
  const manifestPath = path.join(root, ".agentplane/context/agentplane.context.yaml");
  const lockPath = path.join(root, ".agentplane/context/manifest.lock.json");
  const warnings: string[] = [];
  const issues: string[] = [];

  if (!(await fileExists(manifestPath))) issues.push(`missing manifest: ${manifestPath}`);
  if (!(await fileExists(lockPath))) warnings.push(`missing lockfile: ${lockPath}`);

  const requiredDirs = [
    "context",
    "context/raw",
    "context/wiki",
    "context/capabilities",
    ".agentplane/context/derived",
    ".agentplane/context/service",
  ];
  for (const rel of requiredDirs) {
    const candidate = path.join(root, rel);
    if (!(await fileExists(candidate))) {
      issues.push(`missing required directory: ${rel}`);
      if (opts.parsed.fix)
        await import("node:fs/promises").then((m) => m.mkdir(candidate, { recursive: true }));
    }
  }

  try {
    const manifestText = await readText(manifestPath);
    const manifest = parseYaml(manifestText);
    if (isRecord(manifest)) {
      if (manifest.version !== 1) {
        issues.push("manifest.version must be 1");
      }
      if (!isRecord(manifest.project)) {
        issues.push("manifest.project is required");
      }
      if (!isRecord(manifest.workspace)) {
        issues.push("manifest.workspace is required");
      }
      if (!isRecord(manifest.control)) {
        issues.push("manifest.control is required");
      }
      if (!isRecord(manifest.service)) {
        issues.push("manifest.service is required");
      }
      if (!isRecord(manifest.derived)) {
        issues.push("manifest.derived is required");
      }
      if (typeof manifest.generated_at !== "string" || manifest.generated_at.length === 0) {
        issues.push("manifest.generated_at is required");
      }
    } else {
      issues.push("manifest is not a mapping");
    }
  } catch {
    issues.push("manifest is unreadable");
  }

  for (const file of [
    ".agentplane/context/policies/context.rules.md",
    ".agentplane/context/policies/wiki.rules.md",
    ".agentplane/context/policies/capability.rules.md",
    ".agentplane/context/policies/redaction.rules.yaml",
    ".agentplane/context/policies/sync.rules.yaml",
  ]) {
    if (!(await fileExists(path.join(root, file)))) {
      issues.push(`missing policy file: ${file}`);
    }
  }

  for (const file of [
    ".agentplane/context/derived/facts/facts.jsonl",
    ".agentplane/context/derived/graph/entities.jsonl",
    ".agentplane/context/derived/graph/edges.jsonl",
    ".agentplane/context/derived/graph/provenance_edges.jsonl",
    ".agentplane/context/derived/capabilities/capabilities.jsonl",
    ".agentplane/context/derived/capabilities/capability_edges.jsonl",
    ".agentplane/context/derived/reports/assimilation-events.jsonl",
  ]) {
    if (!(await fileExists(path.join(root, file)))) {
      warnings.push(`derived artifact missing: ${file}`);
    }
  }

  for (const file of [".agentplane/context/manifest.lock.json", ".agentplane/cache.sqlite"]) {
    if (!(await fileExists(path.join(root, file)))) {
      issues.push(`missing context registry artifact: ${file}`);
    }
  }

  const sqlitePath = resolveAgentplaneCacheSqlitePath(root);
  if (await fileExists(sqlitePath)) {
    const sqliteOk = await checkSqliteProjection(sqlitePath);
    if (!sqliteOk) {
      issues.push("context projection is not a valid SQLite database");
    }
  }

  const projection = await readContextProjection(root);
  if (projection) {
    let staleProjection = 0;
    for (const row of projection.rows) {
      const [basePath, selector] = row.path.split("#", 2);
      const absolute = path.join(root, basePath ?? row.path);
      try {
        if (selector) {
          await calculateSha256(absolute);
          continue;
        }
        const hash = await calculateSha256(absolute);
        if (hash !== row.sha256) staleProjection += 1;
      } catch {
        staleProjection += 1;
      }
    }
    if (staleProjection > 0) {
      warnings.push(`projection stale rows: ${staleProjection}`);
    }
  }

  const manifestSources = await collectManifestSources(root);
  for (const file of [
    ".agentplane/context/derived/facts/facts.jsonl",
    ".agentplane/context/derived/graph/entities.jsonl",
    ".agentplane/context/derived/graph/edges.jsonl",
    ".agentplane/context/derived/graph/provenance_edges.jsonl",
    ".agentplane/context/derived/capabilities/capabilities.jsonl",
    ".agentplane/context/derived/capabilities/capability_edges.jsonl",
  ]) {
    await checkSourceRefs(path.join(root, file), manifestSources, root, warnings);
  }
  await checkHarvestReports(root, issues, warnings);

  if (issues.length > 0) {
    process.stderr.write(
      `[context.doctor] issues:\n` + issues.map((entry) => `- ${entry}`).join("\n") + "\n",
    );
    process.stderr.write(contextDoctorRecoveryHint(root, opts.parsed.fix) + "\n");
    if (!opts.parsed.fix)
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `context doctor failed: ${issues.length} issues`,
      });
  }
  if (warnings.length > 0) {
    process.stderr.write(
      `[context.doctor] warnings:\n` + warnings.map((entry) => `- ${entry}`).join("\n") + "\n",
    );
  }

  process.stdout.write("context doctor: ok\n");
  return 0;
}

function contextDoctorRecoveryHint(root: string, fix: boolean): string {
  const retry = fix ? "then re-run `agentplane context doctor`" : "then re-run this command";
  return (
    `[context.doctor] recovery:\n` +
    `- If this repository has no initialized context workspace, run \`agentplane context init --repair\` from ${root}, ${retry}.\n` +
    "- `--fix` only repairs missing directories; it does not create the manifest, policy files, lockfile, or registry artifacts."
  );
}

async function calculateSha256(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  return await new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on("data", (chunk: Buffer) => hash.update(chunk));
    stream.on("error", (err) => reject(err));
    stream.on("end", () => resolve(`sha256:${hash.digest("hex")}`));
  });
}

async function collectManifestSources(root: string): Promise<Set<string>> {
  const result = new Set<string>();
  const lockPath = path.join(root, ".agentplane", "context", "manifest.lock.json");
  try {
    const parsed = JSON.parse(await readFile(lockPath, "utf8")) as {
      sources?: { path?: unknown }[];
    };
    if (Array.isArray(parsed?.sources)) {
      for (const entry of parsed.sources) {
        if (typeof entry?.path === "string") result.add(entry.path);
      }
    }
  } catch {
    // Missing or malformed manifest lock is reported elsewhere.
  }
  return result;
}

async function checkSourceRefs(
  artifactPath: string,
  manifestSources: Set<string>,
  root: string,
  warnings: string[],
): Promise<void> {
  try {
    const raw = await readText(artifactPath);
    const rows = parseJsonlLines(raw);
    for (const row of rows) {
      const rowId = String((row as { id?: unknown }).id ?? "<unknown>");
      const source =
        typeof (row as { source?: unknown }).source === "string"
          ? String((row as { source?: unknown }).source)
          : "";
      const sourceRefs = Array.isArray((row as { source_refs?: unknown }).source_refs)
        ? ((row as { source_refs?: unknown }).source_refs as unknown[])
        : [];
      if (source.length > 0) {
        sourceRefs.push(source);
      }
      if (sourceRefs.length === 0) {
        warnings.push(`artifact row has no source reference: ${artifactPath}#${rowId}`);
        continue;
      }
      for (const value of sourceRefs) {
        if (typeof value !== "string") continue;
        const candidate = value.trim();
        if (!candidate) continue;
        if (
          (manifestSources.size > 0 && manifestSources.has(candidate)) ||
          (await fileExists(path.join(root, candidate)))
        ) {
          continue;
        }
        warnings.push(`artifact source missing: ${candidate} (${artifactPath}#${rowId})`);
        break;
      }
    }
  } catch {
    warnings.push(`artifact unreadable: ${artifactPath}`);
  }
}

async function checkHarvestReports(
  root: string,
  issues: string[],
  warnings: string[],
): Promise<void> {
  const reportsRoot = path.join(root, ".agentplane/context/derived/reports");
  let entries: string[] = [];
  try {
    entries = await readdir(reportsRoot);
  } catch {
    return;
  }
  for (const entry of entries.filter((name) => name.startsWith("task-harvest-"))) {
    const rel = `.agentplane/context/derived/reports/${entry}`;
    const report = await readHarvestReport(path.join(root, rel));
    if (!report) {
      issues.push(`invalid task harvest report: ${rel}`);
      continue;
    }
    if (report.promotion_gate.state === "promoted" && report.promotion_gate.blockers.length > 0) {
      issues.push(`promoted task harvest report has blockers: ${rel}`);
    }
    if (report.source_refs.length === 0) {
      warnings.push(`task harvest report has no source refs: ${rel}`);
    }
  }
}
