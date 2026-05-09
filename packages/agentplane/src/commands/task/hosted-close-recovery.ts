import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { fileExists } from "../../cli/fs-utils.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { parsePrMeta, type PrMeta } from "../shared/pr-meta.js";

import type { HostedMergeTarget } from "./hosted-merge-sync.js";
import { readCommitInfo } from "./shared.js";

function isMissingCommitObjectError(err: unknown): boolean {
  const stderr = (err as { stderr?: unknown }).stderr;
  const text =
    err instanceof Error
      ? [err.message, typeof stderr === "string" ? stderr : ""]
          .filter((part) => part.trim().length > 0)
          .join("\n")
      : String(err);
  return (
    /bad object/i.test(text) || /unknown revision/i.test(text) || /ambiguous argument/i.test(text)
  );
}

export async function resolveHostedTaskCommitInfo(opts: {
  gitRoot: string;
  mergedPr: {
    number: number;
    title?: string | null;
    baseRefName?: string | null;
    mergeCommit?: { oid?: string | null } | null;
  };
}): Promise<{ hash: string; message: string }> {
  const mergeHash = opts.mergedPr.mergeCommit?.oid ?? "";
  try {
    return await readCommitInfo(opts.gitRoot, mergeHash);
  } catch (err) {
    if (!isMissingCommitObjectError(err)) throw err;
    return {
      hash: mergeHash,
      message:
        opts.mergedPr.title?.trim() ??
        `Hosted PR #${opts.mergedPr.number} merged on GitHub ${opts.mergedPr.baseRefName ?? "main"}`,
    };
  }
}

export async function hasTaskArtifactChanges(opts: {
  gitRoot: string;
  taskDirRelative: string;
}): Promise<boolean> {
  const { stdout } = await execFileAsync("git", ["status", "--short", "--", opts.taskDirRelative], {
    cwd: opts.gitRoot,
    env: process.env,
  });
  return stdout.trim().length > 0;
}

function buildFallbackPrMeta(opts: {
  taskId: string;
  branch: string;
  mergedPr: HostedMergeTarget["mergedPr"];
}): PrMeta {
  const at = opts.mergedPr.mergedAt ?? new Date().toISOString();
  const headShaRaw = opts.mergedPr.headRefOid?.trim();
  const headSha = headShaRaw && headShaRaw.length > 0 ? headShaRaw : undefined;
  const prUrlRaw = opts.mergedPr.url?.trim();
  const prUrl = prUrlRaw && prUrlRaw.length > 0 ? prUrlRaw : undefined;
  return {
    schema_version: 1,
    task_id: opts.taskId,
    branch: opts.branch,
    ...(opts.mergedPr.baseRefName ? { base: opts.mergedPr.baseRefName } : {}),
    pr_number: opts.mergedPr.number,
    ...(prUrl ? { pr_url: prUrl } : {}),
    created_at: at,
    updated_at: at,
    status: "OPEN",
    ...(headSha ? { head_sha: headSha } : {}),
    last_verified_sha: null,
    last_verified_at: null,
    verify: { status: "skipped" },
  };
}

function escapeRegExp(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

function extractMarkdownSection(markdown: string, heading: string): string {
  const pattern = new RegExp(
    String.raw`^## ${escapeRegExp(heading)}\n\n([\s\S]*?)(?=\n## [^\n]+\n|$)`,
    "m",
  );
  const match = pattern.exec(markdown);
  return match?.[1]?.trim() ?? "";
}

function fallbackTaskTitleFromPrTitle(taskId: string, prTitle?: string | null): string {
  const trimmed = prTitle?.trim() ?? "";
  if (!trimmed) return `Hosted close recovery for ${taskId}`;
  const suffix = taskId.split("-").at(-1)?.trim();
  if (suffix) {
    const stripped = trimmed.replace(
      new RegExp(String.raw`\s*\(${escapeRegExp(suffix)}\)\s*$`),
      "",
    );
    if (stripped.trim().length > 0) return stripped.trim();
  }
  return trimmed;
}

export function isMissingTaskReadmeError(err: unknown, readmePath: string): boolean {
  if (!(err instanceof CliError)) return false;
  return err.code === "E_IO" && err.message.includes(readmePath);
}

export async function buildHostedTaskFromTrackedPrArtifacts(opts: {
  gitRoot: string;
  taskDirRelative: string;
  taskId: string;
  mergedPr: HostedMergeTarget["mergedPr"];
}): Promise<TaskData | null> {
  const bodyPath = path.join(opts.gitRoot, opts.taskDirRelative, "pr", "github-body.md");
  let bodyText = "";
  try {
    bodyText = await readFile(bodyPath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }

  const summary = extractMarkdownSection(bodyText, "Summary");
  const scope = extractMarkdownSection(bodyText, "Scope");
  const verification = extractMarkdownSection(bodyText, "Verification");
  const handoff = extractMarkdownSection(bodyText, "Handoff Notes");
  const summaryLines = summary
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const title = summaryLines[0] || fallbackTaskTitleFromPrTitle(opts.taskId, opts.mergedPr.title);
  const description =
    summaryLines.slice(1).join("\n").trim() ||
    `Recovered hosted-close state from tracked PR artifacts for merged PR #${opts.mergedPr.number}.`;
  const scopeText =
    scope || `- In scope: record canonical task closure for merged PR #${opts.mergedPr.number}.`;
  const verificationText =
    verification || "- State: pending\n- Note: Recovered during hosted-close.";
  const handoffText = handoff || "- No handoff notes recorded.";
  const planText = `Recovered hosted-close state from tracked PR artifacts for merged PR #${opts.mergedPr.number}.`;
  const rollbackText = [
    "- Revert the hosted closure commit if the merged PR metadata was recorded incorrectly.",
    "- Re-run the required checks after rollback.",
  ].join("\n");
  const doc = [
    "## Summary",
    "",
    title,
    "",
    description,
    "",
    "## Scope",
    "",
    scopeText,
    "",
    "## Plan",
    "",
    planText,
    "",
    "## Verification",
    "",
    verificationText,
    "",
    "## Rollback Plan",
    "",
    rollbackText,
    "",
    "## Handoff Notes",
    "",
    handoffText,
    "",
    "## Findings",
    "",
  ].join("\n");
  return {
    id: opts.taskId,
    title,
    description,
    status: "DOING",
    priority: "med",
    owner: "INTEGRATOR",
    revision: 1,
    origin: { system: "manual" },
    depends_on: [],
    tags: [],
    verify: [],
    plan_approval: { state: "pending", updated_at: null, updated_by: null, note: null },
    verification: { state: "pending", attempts: 0, updated_at: null, updated_by: null, note: null },
    commit: null,
    doc,
    doc_version: 3,
    doc_updated_at: opts.mergedPr.mergedAt ?? new Date().toISOString(),
    doc_updated_by: "INTEGRATOR",
    id_source: "generated",
  };
}

export async function readHostedPrMetaOrFallback(opts: {
  gitRoot: string;
  taskDirRelative: string;
  target: HostedMergeTarget;
}): Promise<{ metaPath: string; meta: PrMeta }> {
  const metaPath = path.join(opts.gitRoot, opts.taskDirRelative, "pr", "meta.json");
  if (!(await fileExists(metaPath))) {
    return {
      metaPath,
      meta: buildFallbackPrMeta({
        taskId: opts.target.taskId,
        branch: opts.target.branch,
        mergedPr: opts.target.mergedPr,
      }),
    };
  }
  const rawMeta = await readFile(metaPath, "utf8");
  return {
    metaPath,
    meta: parsePrMeta(rawMeta, opts.target.taskId),
  };
}
