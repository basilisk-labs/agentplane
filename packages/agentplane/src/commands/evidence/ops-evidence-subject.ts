import { createHash } from "node:crypto";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import path from "node:path";

import { canonicalizeJson, taskDocToSectionMap } from "@agentplaneorg/core/tasks";
import type { QualityReviewSubject } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { verificationRuntimeEvidencePaths } from "../evaluator/evaluator-verification-records.js";
import { hasValidRecordDigest } from "../shared/task-verification-record-parser.js";
import { verificationContractEvidenceCoverage } from "../shared/task-verification-records.js";
import { parseVerificationCheckDetails } from "../shared/verification-details.js";
import type { CommandContext } from "../shared/task-backend.js";
import { sha256EvidenceFile } from "./evidence-sha256.js";

export type OpsEvidenceBundle = {
  schema_version: 1;
  kind: "agentplane.ops_evidence_bundle";
  task_id: string;
  blueprint_digest: string;
  approval: TaskData["plan_approval"];
  rollback_plan: string;
  declared_checks: string[];
  verification_contract: TaskData["execution_contract"];
  verification: TaskData["verification"];
  operational_checks: ReturnType<typeof parseVerificationCheckDetails>;
  verification_records: { path: string; sha256: `sha256:${string}` }[];
  action_receipts: { path: string; sha256: `sha256:${string}` }[];
  verification_artifacts: { path: string; sha256: `sha256:${string}` }[];
};

function digestJson(value: unknown): `sha256:${string}` {
  const canonical = JSON.stringify(canonicalizeJson(value));
  return `sha256:${createHash("sha256").update(canonical).digest("hex")}`;
}

function toPosix(value: string): string {
  return value.replaceAll(path.sep, "/");
}

function relativeToRoot(root: string, absolute: string): string {
  return toPosix(path.relative(root, absolute));
}

function isWithinRoot(root: string, target: string): boolean {
  const relative = path.relative(root, target);
  return relative !== "" && relative !== ".." && !relative.startsWith(`..${path.sep}`);
}

function taskSections(task: TaskData): Record<string, string> {
  return task.sections ?? taskDocToSectionMap(typeof task.doc === "string" ? task.doc : "");
}

function isFilledEvidenceText(value: string): boolean {
  const trimmed = value.trim();
  return (
    Boolean(trimmed) && !/^(?:todo|tbd|n\/a)$/iu.test(trimmed) && !trimmed.includes("<!-- TODO:")
  );
}

function verificationRecordMatchesTask(record: Record<string, unknown>, task: TaskData): boolean {
  const verification = task.verification;
  return Boolean(
    verification &&
    record.kind === "task_verification_record" &&
    record.task_id === task.id &&
    record.recorded_at === verification.updated_at &&
    record.result === verification.state &&
    record.verifier === verification.updated_by &&
    record.note === verification.note &&
    hasValidRecordDigest(record),
  );
}

async function currentOpsVerificationRecords(opts: {
  gitRoot: string;
  taskRoot: string;
  task: TaskData;
}): Promise<
  {
    absolutePath: string;
    path: string;
    digest: `sha256:${string}`;
    record: Record<string, unknown>;
  }[]
> {
  const directory = path.join(opts.taskRoot, "verification");
  const entries = await readdir(directory, { withFileTypes: true }).catch(() => []);
  const records = [];
  for (const entry of entries.toSorted((left, right) => left.name.localeCompare(right.name))) {
    if (!entry.isFile() || entry.isSymbolicLink() || !entry.name.endsWith(".json")) continue;
    const absolutePath = path.join(directory, entry.name);
    let record: Record<string, unknown>;
    try {
      const raw = JSON.parse(await readFile(absolutePath, "utf8")) as unknown;
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
      record = raw as Record<string, unknown>;
    } catch {
      continue;
    }
    if (!verificationRecordMatchesTask(record, opts.task)) continue;
    const checks = parseVerificationCheckDetails(record.details);
    const coverage = verificationContractEvidenceCoverage(opts.task, record.details);
    if (!checks || checks.some((check) => check.result !== "pass") || !coverage.accepted) continue;
    records.push({
      absolutePath,
      path: relativeToRoot(opts.gitRoot, absolutePath),
      digest: await sha256EvidenceFile(absolutePath),
      record,
    });
  }
  return records;
}

async function verifiedReceipt(opts: {
  gitRoot: string;
  reference: { path: string; sha256: string };
}): Promise<{ path: string; sha256: `sha256:${string}` }> {
  const absolute = path.resolve(opts.gitRoot, opts.reference.path);
  const root = await realpath(opts.gitRoot);
  const resolved = await realpath(absolute).catch(() => null);
  const entry = resolved ? await lstat(resolved).catch(() => null) : null;
  if (!resolved || !entry?.isFile() || entry.isSymbolicLink() || !isWithinRoot(root, resolved)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `ops evidence bundle contains an unavailable action receipt: ${opts.reference.path}`,
    });
  }
  const digest = await sha256EvidenceFile(resolved);
  if (digest !== opts.reference.sha256) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `ops evidence bundle action receipt digest changed: ${opts.reference.path}`,
    });
  }
  return { path: toPosix(opts.reference.path), sha256: digest };
}

export async function buildOpsEvidenceBundle(opts: {
  ctx: CommandContext;
  task: TaskData;
  blueprintDigest: string;
}): Promise<{ bundle: OpsEvidenceBundle; subject: QualityReviewSubject }> {
  if (opts.task.plan_approval?.state !== "approved") {
    throw new CliError({
      code: "E_VALIDATION",
      message: "ops evidence bundle requires an approved operational plan.",
    });
  }
  if (opts.task.verification?.state !== "ok") {
    throw new CliError({
      code: "E_VALIDATION",
      message: "ops evidence bundle requires passing operational checks.",
    });
  }
  const sections = taskSections(opts.task);
  const rollbackPlan = sections["Rollback Plan"] ?? "";
  if (!isFilledEvidenceText(rollbackPlan)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "ops evidence bundle requires concrete rollback evidence in Rollback Plan.",
    });
  }

  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const taskRoot = path.join(gitRoot, opts.ctx.config.paths.workflow_dir, opts.task.id);
  const records = await currentOpsVerificationRecords({ gitRoot, taskRoot, task: opts.task });
  if (records.length === 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "ops evidence bundle requires a current verification record with passing operational checks.",
    });
  }
  const operationalChecks = records.flatMap(
    ({ record }) => parseVerificationCheckDetails(record.details) ?? [],
  );
  const artifactPaths = await verificationRuntimeEvidencePaths({
    gitRoot,
    taskRoot,
    verificationRecordPaths: records.map(({ absolutePath }) => absolutePath),
  });
  const verificationArtifacts = await Promise.all(
    artifactPaths.map(async (absolute) => ({
      path: relativeToRoot(gitRoot, absolute),
      sha256: await sha256EvidenceFile(absolute),
    })),
  );
  const runnerEntries = opts.task.runner?.history ?? (opts.task.runner ? [opts.task.runner] : []);
  const actionReceipts = await Promise.all(
    runnerEntries
      .filter((entry) => entry.status === "success" && entry.execution_receipt)
      .map(
        async (entry) => await verifiedReceipt({ gitRoot, reference: entry.execution_receipt! }),
      ),
  );
  const stableActionEvidence = [...actionReceipts, ...verificationArtifacts]
    .filter(
      (entry, index, rows) =>
        rows.findIndex(
          (candidate) => candidate.path === entry.path && candidate.sha256 === entry.sha256,
        ) === index,
    )
    .toSorted((left, right) => left.path.localeCompare(right.path));
  if (stableActionEvidence.length === 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "ops evidence bundle requires an action receipt or a file artifact cited by current verification evidence.",
    });
  }

  const bundle: OpsEvidenceBundle = {
    schema_version: 1,
    kind: "agentplane.ops_evidence_bundle",
    task_id: opts.task.id,
    blueprint_digest: opts.blueprintDigest,
    approval: opts.task.plan_approval,
    rollback_plan: rollbackPlan.trim(),
    declared_checks: [...(opts.task.verify ?? [])],
    verification_contract: opts.task.execution_contract,
    verification: opts.task.verification,
    operational_checks: operationalChecks,
    verification_records: records.map(({ path: recordPath, digest }) => ({
      path: recordPath,
      sha256: digest,
    })),
    action_receipts: actionReceipts.toSorted((left, right) => left.path.localeCompare(right.path)),
    verification_artifacts: verificationArtifacts.toSorted((left, right) =>
      left.path.localeCompare(right.path),
    ),
  };
  return {
    bundle,
    subject: { kind: "evidence_bundle", value: digestJson(bundle) },
  };
}
