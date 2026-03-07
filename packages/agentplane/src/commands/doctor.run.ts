import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { resolveProject } from "@agentplaneorg/core";

import type { CommandHandler } from "../cli/spec/spec.js";
import { warnMessage, successMessage } from "../cli/output.js";
import { renderDiagnosticFinding } from "../shared/diagnostics.js";
import { RUNTIME_GITIGNORE_LINES } from "../shared/runtime-artifacts.js";
import { describeRuntimeMode, resolveRuntimeSourceInfo } from "../shared/runtime-source.js";
import { resolvePolicyGatewayForRepo } from "../shared/policy-gateway.js";
import { execFileAsync, gitEnv } from "./shared/git.js";
import { loadCommandContext } from "./shared/task-backend.js";
import type { DoctorParsed } from "./doctor.spec.js";
import {
  emitWorkflowEvent,
  isWorkflowEnforcementDisabled,
  resolveWorkflowPaths,
  safeAutofixWorkflowText,
  validateWorkflowAtPath,
  workflowEnforcementEnvHint,
} from "../workflow-runtime/index.js";

type FileEntry = { absPath: string; relPath: string };

async function listTsFiles(rootDir: string): Promise<FileEntry[]> {
  const out: FileEntry[] = [];
  async function walk(absDir: string) {
    const entries = await fs.readdir(absDir, { withFileTypes: true });
    for (const ent of entries) {
      if (ent.name.startsWith(".")) continue;
      if (ent.name === "__snapshots__") continue;
      if (ent.name === "node_modules") continue;
      const abs = path.join(absDir, ent.name);
      if (ent.isDirectory()) {
        await walk(abs);
        continue;
      }
      if (ent.isFile() && ent.name.endsWith(".ts")) {
        out.push({ absPath: abs, relPath: path.relative(rootDir, abs) });
      }
    }
  }
  await walk(rootDir);
  return out;
}

function extractImports(source: string): string[] {
  const imports: string[] = [];
  const re = /^\s*import\s+(?:type\s+)?(?:[^"']*?\s+from\s+)?["']([^"']+)["']\s*;?/gm;
  for (const match of source.matchAll(re)) {
    imports.push(match[1] ?? "");
  }
  return imports.filter(Boolean);
}

async function pathExists(absPath: string): Promise<boolean> {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function isDirectory(absPath: string): Promise<boolean> {
  try {
    const st = await fs.stat(absPath);
    return st.isDirectory();
  } catch {
    return false;
  }
}

async function listMissingManagedPolicyFiles(repoRoot: string): Promise<string[]> {
  const manifestPath = fileURLToPath(
    new URL("../../assets/framework.manifest.json", import.meta.url),
  );
  let parsed: { files?: { path?: unknown; required?: unknown }[] } = {};
  try {
    parsed = JSON.parse(await fs.readFile(manifestPath, "utf8")) as {
      files?: { path?: unknown; required?: unknown }[];
    };
  } catch {
    return [];
  }
  const relPaths = Array.isArray(parsed.files)
    ? parsed.files
        .filter((entry) => entry?.required === true && typeof entry.path === "string")
        .map((entry) => String(entry.path).replaceAll("\\", "/").trim())
        .filter((relPath) => relPath.startsWith(".agentplane/policy/"))
    : [];
  const missing: string[] = [];
  for (const relPath of relPaths) {
    if (!(await pathExists(path.join(repoRoot, relPath)))) {
      missing.push(relPath);
    }
  }
  return missing.toSorted();
}

async function checkWorkspace(repoRoot: string): Promise<string[]> {
  const problems: string[] = [];
  const requiredFiles = [path.join(repoRoot, ".agentplane", "config.json")];
  for (const filePath of requiredFiles) {
    if (!(await pathExists(filePath))) {
      problems.push(`Missing required file: ${path.relative(repoRoot, filePath)}`);
    }
  }
  const gateway = await resolvePolicyGatewayForRepo({
    gitRoot: repoRoot,
    fallbackFlavor: "codex",
  });
  if (!(await pathExists(gateway.absPath))) {
    problems.push("Missing required policy gateway file: AGENTS.md or CLAUDE.md");
  }
  if (await pathExists(gateway.absPath)) {
    const missingManagedPolicy = await listMissingManagedPolicyFiles(repoRoot);
    if (missingManagedPolicy.length > 0) {
      const listed = missingManagedPolicy.slice(0, 8).join(", ");
      const more =
        missingManagedPolicy.length > 8 ? ` (+${missingManagedPolicy.length - 8} more)` : "";
      problems.push(
        renderDiagnosticFinding({
          severity: "ERROR",
          state: "framework-managed policy tree is incomplete",
          likelyCause:
            "the active AGENTS.md/CLAUDE.md gateway expects required policy files that are not installed in this workspace",
          nextAction: {
            command: "agentplane upgrade --yes",
            reason: "reinstall the managed policy tree from the currently active framework bundle",
          },
          details: [
            `Missing required files: ${listed}${more}`,
            "If the installed CLI is older than the gateway, update or reinstall agentplane first and then rerun `agentplane upgrade --yes` (or `agentplane upgrade --remote --yes`).",
            "Recovery guide: docs/help/legacy-upgrade-recovery.mdx",
          ],
        }),
      );
    }
  }

  const agentsDir = path.join(repoRoot, ".agentplane", "agents");
  if (!(await isDirectory(agentsDir))) {
    problems.push("Missing required directory: .agentplane/agents");
    return problems;
  }

  const entries = await fs.readdir(agentsDir);
  const hasJson = entries.some((name) => name.endsWith(".json"));
  if (!hasJson) {
    problems.push("No agent profiles found in .agentplane/agents (*.json expected).");
  }
  return problems;
}

async function checkLayering(repoRoot: string): Promise<string[]> {
  const problems: string[] = [];
  const agentplaneSrcRoot = path.join(repoRoot, "packages", "agentplane", "src");
  if (!(await isDirectory(agentplaneSrcRoot))) {
    problems.push(
      "Dev source checks requested but packages/agentplane/src was not found in this workspace.",
    );
    return problems;
  }

  const cliRoot = path.join(agentplaneSrcRoot, "cli");
  const cliFiles = await listTsFiles(cliRoot);
  for (const f of cliFiles) {
    const src = await fs.readFile(f.absPath, "utf8");
    const imports = extractImports(src);
    const hits = imports.filter(
      (s) =>
        s.includes("/adapters/") ||
        s.includes("../adapters") ||
        s.includes("../../adapters") ||
        s.includes("../../../adapters"),
    );
    if (hits.length > 0) {
      problems.push(`${f.relPath} imports adapters directly: ${hits.join(", ")}`);
    }
  }

  const roots = [path.join(agentplaneSrcRoot, "usecases"), path.join(agentplaneSrcRoot, "ports")];
  const banned = [
    "node:fs",
    "node:fs/promises",
    "fs",
    "fs/promises",
    "node:path",
    "path",
    "simple-git",
    "isomorphic-git",
  ];
  for (const root of roots) {
    const files = await listTsFiles(root);
    for (const f of files) {
      const src = await fs.readFile(f.absPath, "utf8");
      const imports = extractImports(src);
      const hits = imports.filter((s) => banned.some((b) => s === b || s.startsWith(`${b}/`)));
      if (hits.length > 0) {
        problems.push(`${f.relPath} imports banned modules: ${hits.join(", ")}`);
      }
    }
  }

  return problems;
}

async function safeFixGitignore(repoRoot: string): Promise<{ changed: boolean; note: string }> {
  const gitignorePath = path.join(repoRoot, ".gitignore");
  let existing = "";
  try {
    existing = await fs.readFile(gitignorePath, "utf8");
  } catch {
    // If .gitignore doesn't exist, do not create it implicitly (keep doctor safe).
    return { changed: false, note: "Skip: .gitignore not found." };
  }

  const lines = existing.split(/\r?\n/);
  const existingSet = new Set(lines.map((line) => line.trimEnd()));
  const missing = RUNTIME_GITIGNORE_LINES.filter((line) => !existingSet.has(line));
  if (missing.length === 0) {
    return { changed: false, note: "OK: .gitignore already contains agentplane runtime ignores." };
  }

  const nextLines = [...lines];
  if (nextLines.length > 0 && nextLines.at(-1) !== "") nextLines.push("");
  nextLines.push(...missing, "");
  const next = `${nextLines.join("\n")}`.replaceAll(/\n{2,}$/g, "\n");
  await fs.writeFile(gitignorePath, next, "utf8");
  return {
    changed: true,
    note: `Fixed: added agentplane runtime ignores to .gitignore (${missing.length} lines).`,
  };
}

async function safeFixTaskIndex(repoRoot: string): Promise<{ changed: boolean; note: string }> {
  try {
    // Best-effort: rebuilding the index is a side-effect of listing tasks for the local backend.
    const ctx = await loadCommandContext({ cwd: repoRoot, rootOverride: null });
    await ctx.taskBackend.listTasks();
    return { changed: true, note: "OK: rebuilt tasks index cache (best-effort)." };
  } catch {
    return { changed: false, note: "Skip: could not rebuild tasks index cache." };
  }
}

async function checkWorkflowContract(repoRoot: string): Promise<string[]> {
  const result = await validateWorkflowAtPath(repoRoot);
  const findings = result.diagnostics.map(
    (d) => `[${d.severity}] ${d.code} ${d.path}: ${d.message}`,
  );
  emitWorkflowEvent({
    event: "workflow_doctor_check",
    details: { ok: result.ok, findings: result.diagnostics.length },
  });
  return findings;
}

function checkRuntimeSourceFacts(cwd: string): string[] {
  const report = resolveRuntimeSourceInfo({ cwd, entryModuleUrl: import.meta.url });
  if (!report.framework.inFrameworkCheckout) return [];

  const warning =
    report.mode === "global-in-framework"
      ? "[WARN] Framework checkout detected but the active runtime is still a global installed binary. " +
        "Update or reinstall agentplane to pick up repo-local handoff, or run the repo-local binary directly."
      : report.mode === "global-forced-in-framework"
        ? "[WARN] Framework checkout is forcing the global installed binary via AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1."
        : null;

  return [
    ...(warning ? [warning] : []),
    `[INFO] Runtime mode: ${report.mode} (${describeRuntimeMode(report.mode)})`,
    `[INFO] Active binary: ${report.activeBinaryPath ?? "unresolved"}`,
    ...(report.handoffFromBinaryPath
      ? [`[INFO] Handoff source binary: ${report.handoffFromBinaryPath}`]
      : []),
    `[INFO] Resolved agentplane: ${report.agentplane.version ?? "unknown"} @ ${report.agentplane.packageRoot ?? "unresolved"}`,
    `[INFO] Resolved @agentplaneorg/core: ${report.core.version ?? "unknown"} @ ${report.core.packageRoot ?? "unresolved"}`,
    `[INFO] Framework repo root: ${report.frameworkSources.repoRoot ?? "unresolved"}`,
    `[INFO] Framework agentplane root: ${report.frameworkSources.agentplaneRoot ?? "unresolved"}`,
    `[INFO] Framework core root: ${report.frameworkSources.coreRoot ?? "unresolved"}`,
  ];
}

function findingSeverity(problem: string): "ERROR" | "WARN" | "INFO" {
  const normalized = problem.trimStart();
  if (normalized.startsWith("[WARN]")) return "WARN";
  if (normalized.startsWith("[INFO]")) return "INFO";
  if (normalized.startsWith("[ERROR]")) return "ERROR";
  return "ERROR";
}

async function safeFixWorkflow(repoRoot: string): Promise<{ changed: boolean; note: string }> {
  const paths = resolveWorkflowPaths(repoRoot);
  let current = "";
  let sourcePath = paths.workflowPath;
  try {
    current = await fs.readFile(paths.workflowPath, "utf8");
  } catch {
    try {
      current = await fs.readFile(paths.legacyWorkflowPath, "utf8");
      sourcePath = paths.legacyWorkflowPath;
    } catch {
      return { changed: false, note: "Skip: workflow contract file not found." };
    }
  }

  const fixed = safeAutofixWorkflowText(current);
  if (fixed.diagnostics.some((d) => d.code === "WF_FIX_SKIPPED_UNSAFE")) {
    const details = fixed.diagnostics.map((d) => `${d.path}`).join(", ");
    return {
      changed: false,
      note: `Skip: unsafe workflow autofix required (unknown keys). Proposed manual review: ${details}`,
    };
  }
  if (!fixed.changed) {
    if (sourcePath === paths.workflowPath) {
      return { changed: false, note: "OK: workflow contract already normalized." };
    }
    await fs.mkdir(path.dirname(paths.workflowPath), { recursive: true });
    await fs.writeFile(paths.workflowPath, current, "utf8");
    await fs.rm(paths.legacyWorkflowPath, { force: true });
    await fs.mkdir(paths.workflowDir, { recursive: true });
    await fs.copyFile(paths.workflowPath, paths.lastKnownGoodPath);
    return {
      changed: true,
      note: "Fixed: moved legacy WORKFLOW.md into .agentplane and refreshed last-known-good.",
    };
  }

  await fs.mkdir(path.dirname(paths.workflowPath), { recursive: true });
  await fs.writeFile(paths.workflowPath, fixed.text, "utf8");
  if (sourcePath === paths.legacyWorkflowPath) {
    await fs.rm(paths.legacyWorkflowPath, { force: true });
  }
  await fs.mkdir(paths.workflowDir, { recursive: true });
  await fs.copyFile(paths.workflowPath, paths.lastKnownGoodPath);
  return {
    changed: true,
    note: "Fixed: normalized workflow contract and refreshed last-known-good.",
  };
}

type TaskSnapshotRecord = {
  id?: unknown;
  status?: unknown;
  commit?: { hash?: unknown } | null;
};

type HistoricalCommitFinding = {
  id: string;
  hash: string;
  subject?: string;
};

function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count === 1 ? singular : plural;
}

function formatIdExamples(ids: string[], maxExamples = 3): string {
  const shown = ids.slice(0, maxExamples);
  const remainder = ids.length - shown.length;
  return remainder > 0 ? `${shown.join(", ")}; +${remainder} more` : shown.join(", ");
}

function summarizeHistoricalFindings(
  findings: HistoricalCommitFinding[],
  opts: {
    singlePrefix: string;
    groupLabel: string;
    summaryLabel: string;
    includeSubject: boolean;
  },
): string[] {
  if (findings.length === 0) return [];
  if (findings.length === 1) {
    const [finding] = findings;
    const subjectSuffix = opts.includeSubject && finding.subject ? ` (${finding.subject})` : "";
    return [`[WARN] ${opts.singlePrefix}: ${finding.id} -> ${finding.hash}${subjectSuffix}`];
  }

  const grouped = new Map<string, { hash: string; ids: string[]; subject?: string }>();
  for (const finding of findings) {
    const existing = grouped.get(finding.hash);
    if (existing) {
      existing.ids.push(finding.id);
      if (!existing.subject && finding.subject) existing.subject = finding.subject;
      continue;
    }
    grouped.set(finding.hash, {
      hash: finding.hash,
      ids: [finding.id],
      subject: finding.subject,
    });
  }

  const groups = [...grouped.values()].toSorted((left, right) => {
    const countDelta = right.ids.length - left.ids.length;
    if (countDelta !== 0) return countDelta;
    return left.hash.localeCompare(right.hash);
  });
  const exampleGroups = groups.slice(0, 3).map((group) => {
    const subjectSuffix = opts.includeSubject && group.subject ? `; subject: ${group.subject}` : "";
    return `${group.hash} (${group.ids.length} ${pluralize(group.ids.length, "task")}: ${formatIdExamples(group.ids)}${subjectSuffix})`;
  });
  const remainingGroups = groups.length - exampleGroups.length;
  const groupedSuffix = remainingGroups > 0 ? `; +${remainingGroups} more hash groups` : "";

  return [
    `[WARN] Historical task archive contains ${findings.length} DONE tasks with ${opts.summaryLabel} across ${groups.length} distinct commit ${opts.groupLabel}. Examples: ${exampleGroups.join("; ")}${groupedSuffix}`,
  ];
}

async function checkDoneTaskCommitInvariants(repoRoot: string): Promise<string[]> {
  const tasksPath = path.join(repoRoot, ".agentplane", "tasks.json");
  let raw = "";
  try {
    raw = await fs.readFile(tasksPath, "utf8");
  } catch {
    return [];
  }

  let parsed: { tasks?: unknown };
  try {
    parsed = JSON.parse(raw) as { tasks?: unknown };
  } catch {
    return [`Invalid JSON snapshot: ${path.relative(repoRoot, tasksPath)}`];
  }
  const all = Array.isArray(parsed.tasks) ? (parsed.tasks as TaskSnapshotRecord[]) : [];
  const done = all.filter((t) => {
    const status = typeof t.status === "string" ? t.status : "";
    return status.toUpperCase() === "DONE";
  });
  if (done.length === 0) return [];

  const problems: string[] = [];
  const unknownHashWarnings: HistoricalCommitFinding[] = [];
  const closeCommitWarnings: HistoricalCommitFinding[] = [];
  const hashes = new Set<string>();
  for (const task of done) {
    const id = typeof task.id === "string" ? task.id : "<unknown>";
    const hash = typeof task.commit?.hash === "string" ? task.commit.hash.trim() : "";
    if (!hash) {
      problems.push(
        `DONE task is missing implementation commit hash: ${id} (finish with --commit <hash>).`,
      );
      continue;
    }
    hashes.add(hash);
  }
  if (hashes.size === 0) return problems;

  const subjectByHash = new Map<string, string>();
  for (const hash of hashes) {
    try {
      const { stdout } = await execFileAsync("git", ["show", "-s", "--format=%s", hash], {
        cwd: repoRoot,
        env: gitEnv(),
      });
      subjectByHash.set(hash, String(stdout ?? "").trim());
    } catch {
      subjectByHash.set(hash, "");
    }
  }

  for (const task of done) {
    const id = typeof task.id === "string" ? task.id : "<unknown>";
    const hash = typeof task.commit?.hash === "string" ? task.commit.hash.trim() : "";
    if (!hash) continue;
    const subject = subjectByHash.get(hash) ?? "";
    if (!subject) {
      unknownHashWarnings.push({ id, hash });
      continue;
    }
    if (/\bclose:/iu.test(subject)) {
      closeCommitWarnings.push({ id, hash, subject });
    }
  }

  problems.push(
    ...summarizeHistoricalFindings(unknownHashWarnings, {
      singlePrefix: "DONE task references unknown historical commit hash",
      groupLabel: "hashes",
      summaryLabel: "unknown implementation commit hashes",
      includeSubject: false,
    }),
    ...summarizeHistoricalFindings(closeCommitWarnings, {
      singlePrefix: "DONE task implementation commit points to a close commit",
      groupLabel: "hashes",
      summaryLabel: "implementation commits that point to close commits",
      includeSubject: true,
    }),
  );

  return problems;
}

export const runDoctor: CommandHandler<DoctorParsed> = async (ctx, p) => {
  const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
  const repoRoot = resolved.gitRoot;

  const runChecks = async (): Promise<string[]> => {
    let checks = [
      ...(await checkWorkspace(repoRoot)),
      ...checkRuntimeSourceFacts(ctx.cwd),
      ...(await checkDoneTaskCommitInvariants(repoRoot)),
    ];
    if (!isWorkflowEnforcementDisabled()) {
      checks = [...checks, ...(await checkWorkflowContract(repoRoot))];
    }
    if (p.dev) {
      checks = [...checks, ...(await checkLayering(repoRoot))];
    }
    return checks;
  };

  if (isWorkflowEnforcementDisabled()) {
    console.log(
      successMessage(
        "doctor",
        undefined,
        `workflow contract checks disabled via ${workflowEnforcementEnvHint()}.`,
      ),
    );
  }

  if (p.fix) {
    const fix = await safeFixGitignore(repoRoot);
    console.log(successMessage("doctor fix", undefined, fix.note));
    const idx = await safeFixTaskIndex(repoRoot);
    console.log(successMessage("doctor fix", undefined, idx.note));
    const workflowFix = await safeFixWorkflow(repoRoot);
    console.log(successMessage("doctor fix", undefined, workflowFix.note));
  }

  const problems = await runChecks();
  const errors = problems.filter((problem) => findingSeverity(problem) === "ERROR");
  if (problems.length > 0) {
    const warningCount = problems.filter((problem) => findingSeverity(problem) === "WARN").length;
    const infoCount = problems.filter((problem) => findingSeverity(problem) === "INFO").length;
    console.error(
      warnMessage(
        `doctor findings: errors=${errors.length} warnings=${warningCount} info=${infoCount}`,
      ),
    );
    for (const prob of problems) console.error(`- ${prob}`);
    if (errors.length > 0) return 1;
  }

  console.log(successMessage("doctor", undefined, "OK"));
  return 0;
};
