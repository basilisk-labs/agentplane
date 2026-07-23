import { createHash } from "node:crypto";
import { lstat, readFile, realpath } from "node:fs/promises";
import path from "node:path";

import { WORKFLOW_CONTRACT_VERSION, parseWorkflowFrontMatter } from "@agentplaneorg/core/config";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import { z } from "zod";

import { parseWorkflowMarkdown, replaceWorkflowFrontMatter } from "./markdown.js";
import { resolveWorkflowPaths } from "./paths.js";

const WORKFLOW_MIGRATION_ID = "workflow_v1_to_v2" as const;
const WORKFLOW_RELATIVE_PATH = ".agentplane/WORKFLOW.md";

const WorkflowMigrationReceiptSchema = z
  .object({
    schema_version: z.literal(1),
    migration_id: z.literal(WORKFLOW_MIGRATION_ID),
    workflow_path: z.literal(WORKFLOW_RELATIVE_PATH),
    source_version: z.literal(1),
    target_version: z.literal(WORKFLOW_CONTRACT_VERSION),
    source_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
    target_sha256: z.string().regex(/^[a-f0-9]{64}$/u),
    source_base64: z.string().min(1),
    applied_at: z.string().datetime({ offset: true }),
  })
  .strict();

export type WorkflowMigrationReceipt = z.infer<typeof WorkflowMigrationReceiptSchema>;

export type WorkflowMigrationPlan = {
  changed: boolean;
  sourceVersion: 1 | 2;
  targetVersion: 2;
  sourceText: string;
  targetText: string;
  sourceSha256: string;
  targetSha256: string;
};

export type WorkflowMigrationApplyResult = WorkflowMigrationPlan & {
  applied: boolean;
  receiptPath: string | null;
};

function sha256Bytes(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

export function planWorkflowMigration(sourceText: string): WorkflowMigrationPlan {
  const parsed = parseWorkflowMarkdown(sourceText);
  const raw = parsed.document.frontMatterRaw;
  const sourceVersion = raw.version;
  const normalized = parseWorkflowFrontMatter(raw);
  if (sourceVersion !== 1 && sourceVersion !== 2) {
    throw new Error("WORKFLOW migration requires an explicit supported source version.");
  }

  const targetText =
    sourceVersion === WORKFLOW_CONTRACT_VERSION
      ? sourceText
      : replaceWorkflowFrontMatter(sourceText, normalized as unknown as Record<string, unknown>);
  return {
    changed: targetText !== sourceText,
    sourceVersion,
    targetVersion: WORKFLOW_CONTRACT_VERSION,
    sourceText,
    targetText,
    sourceSha256: sha256Bytes(sourceText),
    targetSha256: sha256Bytes(targetText),
  };
}

function receiptRelativePath(sourceSha256: string): string {
  return `.agentplane/workflows/migrations/workflow-v1-to-v2-${sourceSha256.slice(0, 16)}.json`;
}

function isPathInside(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return (
    relative === "" ||
    (relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative))
  );
}

async function assertExistingPathComponentsInsideRepo(
  repoRoot: string,
  targetPath: string,
  label: string,
): Promise<string> {
  const absoluteRoot = path.resolve(repoRoot);
  const absoluteTarget = path.resolve(targetPath);
  if (!isPathInside(absoluteRoot, absoluteTarget)) {
    throw new Error(`Refusing workflow migration because ${label} is outside repository root.`);
  }

  const canonicalRoot = await realpath(absoluteRoot);
  const relativeTarget = path.relative(absoluteRoot, absoluteTarget);
  let current = absoluteRoot;
  for (const component of relativeTarget.split(path.sep).filter(Boolean)) {
    current = path.join(current, component);
    try {
      await lstat(current);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") break;
      throw error;
    }

    let canonicalComponent: string;
    try {
      canonicalComponent = await realpath(current);
    } catch {
      throw new Error(
        `Refusing workflow migration because ${label} contains an unresolved path component.`,
      );
    }
    if (!isPathInside(canonicalRoot, canonicalComponent)) {
      throw new Error(
        `Refusing workflow migration because ${label} resolves outside repository root.`,
      );
    }
  }

  return absoluteTarget;
}

async function assertFixedMigrationPathsInsideRepo(repoRoot: string): Promise<{
  workflowPath: string;
  lastKnownGoodPath: string;
}> {
  const paths = resolveWorkflowPaths(repoRoot);
  const migrationsDir = path.join(paths.workflowDir, "migrations");
  const workflowPath = await assertExistingPathComponentsInsideRepo(
    repoRoot,
    paths.workflowPath,
    "active WORKFLOW.md path",
  );
  const lastKnownGoodPath = await assertExistingPathComponentsInsideRepo(
    repoRoot,
    paths.lastKnownGoodPath,
    "last-known-good path",
  );
  await assertExistingPathComponentsInsideRepo(repoRoot, migrationsDir, "migration receipts path");
  return { workflowPath, lastKnownGoodPath };
}

export async function applyWorkflowMigration(
  repoRoot: string,
  opts: { dryRun?: boolean; now?: string } = {},
): Promise<WorkflowMigrationApplyResult> {
  const paths = await assertFixedMigrationPathsInsideRepo(repoRoot);
  await assertExistingPathComponentsInsideRepo(
    repoRoot,
    paths.workflowPath,
    "active WORKFLOW.md path",
  );
  const sourceBuffer = await readFile(paths.workflowPath);
  const sourceText = sourceBuffer.toString("utf8");
  const plan = planWorkflowMigration(sourceText);
  if (!plan.changed || opts.dryRun) {
    return { ...plan, applied: false, receiptPath: null };
  }

  const receiptRelPath = receiptRelativePath(plan.sourceSha256);
  const receiptPath = path.join(repoRoot, receiptRelPath);
  const receipt = WorkflowMigrationReceiptSchema.parse({
    schema_version: 1,
    migration_id: WORKFLOW_MIGRATION_ID,
    workflow_path: WORKFLOW_RELATIVE_PATH,
    source_version: 1,
    target_version: WORKFLOW_CONTRACT_VERSION,
    source_sha256: plan.sourceSha256,
    target_sha256: plan.targetSha256,
    source_base64: sourceBuffer.toString("base64"),
    applied_at: opts.now ?? new Date().toISOString(),
  });

  // Persist rollback evidence and the recovery snapshot before replacing the active contract.
  // Each file uses atomic replacement; replacing WORKFLOW.md last is the migration commit point.
  await assertExistingPathComponentsInsideRepo(repoRoot, receiptPath, "migration receipt path");
  await atomicWriteFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, "utf8");
  await assertExistingPathComponentsInsideRepo(
    repoRoot,
    paths.lastKnownGoodPath,
    "last-known-good path",
  );
  await atomicWriteFile(paths.lastKnownGoodPath, plan.targetText, "utf8");
  await assertExistingPathComponentsInsideRepo(
    repoRoot,
    paths.workflowPath,
    "active WORKFLOW.md path",
  );
  await atomicWriteFile(paths.workflowPath, plan.targetText, "utf8");
  return { ...plan, applied: true, receiptPath };
}

async function assertReceiptPathInsideRepo(repoRoot: string, receiptPath: string): Promise<string> {
  const absolute = path.resolve(repoRoot, receiptPath);
  const allowedRoot = path.resolve(repoRoot, ".agentplane", "workflows", "migrations");
  if (!isPathInside(allowedRoot, absolute)) {
    throw new Error("Workflow migration receipt must be inside .agentplane/workflows/migrations.");
  }

  await assertExistingPathComponentsInsideRepo(repoRoot, allowedRoot, "migration receipts path");
  await assertExistingPathComponentsInsideRepo(repoRoot, absolute, "migration receipt path");
  const canonicalAllowedRoot = await realpath(allowedRoot);
  const canonicalReceiptPath = await realpath(absolute);
  if (!isPathInside(canonicalAllowedRoot, canonicalReceiptPath)) {
    throw new Error(
      "Workflow migration receipt must resolve inside .agentplane/workflows/migrations.",
    );
  }
  return absolute;
}

export async function rollbackWorkflowMigration(
  repoRoot: string,
  receiptPath: string,
  opts: { dryRun?: boolean } = {},
): Promise<{ restored: boolean; sourceSha256: string; targetSha256: string }> {
  const paths = await assertFixedMigrationPathsInsideRepo(repoRoot);
  const absoluteReceiptPath = await assertReceiptPathInsideRepo(repoRoot, receiptPath);
  const receipt = WorkflowMigrationReceiptSchema.parse(
    JSON.parse(await readFile(absoluteReceiptPath, "utf8")) as unknown,
  );
  await assertExistingPathComponentsInsideRepo(
    repoRoot,
    paths.workflowPath,
    "active WORKFLOW.md path",
  );
  const current = await readFile(paths.workflowPath);
  if (sha256Bytes(current) !== receipt.target_sha256) {
    throw new Error(
      "Refusing workflow rollback because the active WORKFLOW.md no longer matches the migration target.",
    );
  }
  const source = Buffer.from(receipt.source_base64, "base64");
  if (sha256Bytes(source) !== receipt.source_sha256) {
    throw new Error("Workflow migration receipt source bytes do not match source_sha256.");
  }
  if (opts.dryRun) {
    return {
      restored: false,
      sourceSha256: receipt.source_sha256,
      targetSha256: receipt.target_sha256,
    };
  }

  // Prepare the recovery snapshot first; replacing WORKFLOW.md last is the rollback commit point.
  await assertExistingPathComponentsInsideRepo(
    repoRoot,
    paths.lastKnownGoodPath,
    "last-known-good path",
  );
  await atomicWriteFile(paths.lastKnownGoodPath, source);
  await assertExistingPathComponentsInsideRepo(
    repoRoot,
    paths.workflowPath,
    "active WORKFLOW.md path",
  );
  await atomicWriteFile(paths.workflowPath, source);
  return {
    restored: true,
    sourceSha256: receipt.source_sha256,
    targetSha256: receipt.target_sha256,
  };
}
