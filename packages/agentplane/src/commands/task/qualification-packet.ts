import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { canonicalizeJson, normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  parseVerificationCheckDetails,
  type VerificationCheckDetail,
} from "../shared/verification-details.js";
import {
  buildQualificationRf04Comparison,
  type QualificationRf04Comparison,
} from "./qualification-packet-rf04.js";
import { asNumber, asString, readJson, recordValue } from "./qualification-packet-json.js";
import {
  assertPathWithinGitRoot,
  readArtifactAtReviewedSha,
  readFileAtGitCommit,
  relativeToGitRoot,
} from "./qualification-packet-artifacts.js";
import { resolveQualificationDependencyLeaves } from "./qualification-packet-dependencies.js";
import {
  loadQualificationTaskAtReviewedSha,
  readPassingQualityReportAtReviewedSha,
} from "./qualification-packet-pinned-task.js";

const QUALIFICATION_PACKET_FILE = "qualification-packet.v1.json";
const QUALIFICATION_PACKET_KIND = "task_qualification_packet";
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/u;
const SHA1_PATTERN = /^[a-f0-9]{40}$/u;

type QualificationVerificationRecord = {
  schema_version: number;
  kind: string;
  task_id: string;
  recorded_at: string;
  result: string;
  verifier: string;
  note: string;
  details: string | null;
  implementation_sha: string | null;
  digest: string;
};

type QualificationPacket = {
  schema_version: 1;
  kind: typeof QUALIFICATION_PACKET_KIND;
  task_id: string;
  prepared_at: string;
  implementation_sha: string;
  verification: {
    record_path: string;
    record_sha256: `sha256:${string}`;
    record_digest: `sha256:${string}`;
    recorded_at: string;
    result: "ok";
    verifier: string;
    note: string;
    implementation_sha: string;
    checks: VerificationCheckDetail[];
  };
  dependency_closure: {
    root_dependency_ids: string[];
    terminal_leaf_ids: string[];
    leaves: {
      task_id: string;
      status: "DONE";
      verification: {
        state: "ok";
        updated_at: string | null;
        updated_by: string | null;
      };
      evaluator: {
        state: "pass";
        evaluated_sha: string | null;
        quality_report: { path: string; sha256: `sha256:${string}` };
      };
      hosted_close: {
        pr_number: number;
        pre_merge_closure: "closed_before_merge";
        task_artifact_commit: string;
        ancestor_of_reviewed_sha: true;
        pr_meta: { path: string; sha256: `sha256:${string}` };
        task_document: { path: string; sha256: `sha256:${string}` };
      };
    }[];
  };
  rf04: QualificationRf04Comparison;
  digest: `sha256:${string}`;
};

export type CurrentQualificationPacket = {
  path: string;
  file_sha256: `sha256:${string}`;
  packet: QualificationPacket;
};

function sha256(value: string | Buffer): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function packetDigest(packet: Omit<QualificationPacket, "digest">): `sha256:${string}` {
  return sha256(JSON.stringify(canonicalizeJson(packet)));
}

function isSha(value: unknown): value is string {
  return typeof value === "string" && SHA1_PATTERN.test(value);
}

export function isQualificationTask(task: Pick<TaskData, "tags">): boolean {
  const tags = new Set(task.tags.map((tag) => tag.trim()));
  return (
    tags.has("quality") &&
    tags.has("release-gate") &&
    [...tags].some((tag) => tag.startsWith("milestone-"))
  );
}

function qualificationPacketPath(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): string {
  return path.join(
    opts.gitRoot,
    opts.workflowDir,
    opts.taskId,
    "evidence",
    QUALIFICATION_PACKET_FILE,
  );
}

function parseVerificationRecord(value: unknown, taskId: string): QualificationVerificationRecord {
  if (!isRecord(value)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Qualification verification record is invalid.",
    });
  }
  const record: QualificationVerificationRecord = {
    schema_version: asNumber(value.schema_version) ?? 0,
    kind: asString(value.kind) ?? "",
    task_id: asString(value.task_id) ?? "",
    recorded_at: asString(value.recorded_at) ?? "",
    result: asString(value.result) ?? "",
    verifier: asString(value.verifier) ?? "",
    note: asString(value.note) ?? "",
    details: typeof value.details === "string" ? value.details : null,
    implementation_sha: asString(value.implementation_sha),
    digest: asString(value.digest) ?? "",
  };
  if (
    record.schema_version !== 1 ||
    record.kind !== "task_verification_record" ||
    record.task_id !== taskId ||
    record.result !== "ok" ||
    !isSha(record.implementation_sha) ||
    !SHA256_PATTERN.test(record.digest)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Qualification packet requires a current passing durable verification record for ${taskId}.`,
    });
  }
  return record;
}

async function buildDependencyClosure(opts: {
  ctx: CommandContext;
  task: TaskData;
  reviewedSha: string;
}): Promise<QualificationPacket["dependency_closure"]> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const workflowDir = opts.ctx.config.paths.workflow_dir;
  const pinnedTask = async (taskId: string) => {
    const pinned = await loadQualificationTaskAtReviewedSha({
      gitRoot,
      workflowDir,
      reviewedSha: opts.reviewedSha,
      taskId,
    });
    return pinned.task;
  };
  const dependencies = await resolveQualificationDependencyLeaves({
    taskId: opts.task.id,
    loadTask: pinnedTask,
  });
  const leaves = await Promise.all(
    dependencies.terminalLeaves.map(async (leaf) => {
      const taskId = leaf.id;
      const leafAtReviewedSha = leaf;
      if (normalizeTaskStatus(leafAtReviewedSha.status) !== "DONE") {
        throw new CliError({
          code: "E_VALIDATION",
          message: `Qualification dependency leaf ${taskId} is not DONE.`,
        });
      }
      if (leafAtReviewedSha.verification?.state !== "ok") {
        throw new CliError({
          code: "E_VALIDATION",
          message: `Qualification dependency leaf ${taskId} lacks passing verification state.`,
        });
      }
      if (leafAtReviewedSha.quality_review?.state !== "pass") {
        throw new CliError({
          code: "E_VALIDATION",
          message: `Qualification dependency leaf ${taskId} lacks evaluator pass state.`,
        });
      }
      const taskRoot = path.join(gitRoot, workflowDir, taskId);
      const readmePath = path.join(taskRoot, "README.md");
      const metaPath = path.join(taskRoot, "pr", "meta.json");
      const [readme, metaArtifact] = await Promise.all([
        readArtifactAtReviewedSha({
          gitRoot,
          reviewedSha: opts.reviewedSha,
          filePath: readmePath,
          label: `Qualification leaf ${taskId} task document`,
        }),
        readArtifactAtReviewedSha({
          gitRoot,
          reviewedSha: opts.reviewedSha,
          filePath: metaPath,
          label: `Qualification leaf ${taskId} PR metadata`,
        }),
      ]);
      const qualityReport = await readPassingQualityReportAtReviewedSha({
        gitRoot,
        workflowDir,
        task: leafAtReviewedSha,
        reviewedSha: opts.reviewedSha,
        sha256,
      });
      let metaValue: unknown;
      try {
        metaValue = JSON.parse(metaArtifact.raw);
      } catch {
        metaValue = null;
      }
      const meta = recordValue(metaValue);
      const closure = recordValue(meta.pre_merge_closure);
      const prNumber = asNumber(meta.pr_number);
      if (
        meta.verify === null ||
        !isRecord(meta.verify) ||
        meta.verify.status !== "pass" ||
        closure.state !== "closed_before_merge" ||
        prNumber === null ||
        !Number.isInteger(prNumber) ||
        prNumber < 1
      ) {
        throw new CliError({
          code: "E_VALIDATION",
          message: `Qualification dependency leaf ${taskId} lacks passing PR verification or a closed hosted-close marker.`,
        });
      }
      return {
        task_id: taskId,
        status: "DONE" as const,
        verification: {
          state: "ok" as const,
          updated_at: leafAtReviewedSha.verification.updated_at ?? null,
          updated_by: leafAtReviewedSha.verification.updated_by ?? null,
        },
        evaluator: {
          state: "pass" as const,
          evaluated_sha: leafAtReviewedSha.quality_review.evaluated_sha ?? null,
          quality_report: qualityReport,
        },
        hosted_close: {
          pr_number: prNumber,
          pre_merge_closure: "closed_before_merge" as const,
          task_artifact_commit: opts.reviewedSha,
          ancestor_of_reviewed_sha: true as const,
          pr_meta: { path: metaArtifact.path, sha256: sha256(metaArtifact.raw) },
          task_document: { path: readme.path, sha256: sha256(readme.raw) },
        },
      };
    }),
  );
  return {
    root_dependency_ids: dependencies.rootDependencyIds,
    terminal_leaf_ids: dependencies.terminalLeaves.map((leaf) => leaf.id),
    leaves,
  };
}

export async function writeQualificationPacket(opts: {
  ctx: CommandContext;
  task: TaskData;
  recordPath: string;
  recordedAt: string;
}): Promise<string | null> {
  if (!isQualificationTask(opts.task)) return null;
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  assertPathWithinGitRoot(gitRoot, opts.recordPath, "Qualification verification record");
  const recordJson = await readJson(opts.recordPath, "Qualification verification record");
  const record = parseVerificationRecord(recordJson.value, opts.task.id);
  const checks = parseVerificationCheckDetails(record.details);
  if (!checks) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Qualification packet requires structured verification details with Command, Result, Evidence, and Scope for every check.",
    });
  }
  if (!isSha(record.implementation_sha)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Qualification verification record for ${opts.task.id} lacks a reviewed implementation SHA.`,
    });
  }
  const implementationSha = record.implementation_sha;
  const packetWithoutDigest: Omit<QualificationPacket, "digest"> = {
    schema_version: 1,
    kind: QUALIFICATION_PACKET_KIND,
    task_id: opts.task.id,
    prepared_at: opts.recordedAt,
    implementation_sha: implementationSha,
    verification: {
      record_path: relativeToGitRoot(gitRoot, opts.recordPath),
      record_sha256: sha256(recordJson.raw),
      record_digest: record.digest as `sha256:${string}`,
      recorded_at: record.recorded_at,
      result: "ok",
      verifier: record.verifier,
      note: record.note,
      implementation_sha: implementationSha,
      checks,
    },
    dependency_closure: await buildDependencyClosure({
      ctx: opts.ctx,
      task: opts.task,
      reviewedSha: implementationSha,
    }),
    rf04: await buildQualificationRf04Comparison({
      gitRoot,
      checks,
      taskId: opts.task.id,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      reviewedSha: implementationSha,
    }),
  };
  const packet: QualificationPacket = {
    ...packetWithoutDigest,
    digest: packetDigest(packetWithoutDigest),
  };
  const packetPath = qualificationPacketPath({
    gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    taskId: opts.task.id,
  });
  await writeJsonStableIfChanged(packetPath, packet);
  return packetPath;
}

function parseQualificationPacket(value: unknown, task: TaskData): QualificationPacket | null {
  if (!isRecord(value)) return null;
  const { digest, ...payload } = value;
  if (
    value.schema_version !== 1 ||
    value.kind !== QUALIFICATION_PACKET_KIND ||
    value.task_id !== task.id ||
    !isSha(value.implementation_sha) ||
    typeof digest !== "string" ||
    !SHA256_PATTERN.test(digest) ||
    digest !== sha256(JSON.stringify(canonicalizeJson(payload)))
  ) {
    return null;
  }
  const verification = recordValue(value.verification);
  if (
    verification.result !== "ok" ||
    verification.recorded_at !== task.verification?.updated_at ||
    verification.verifier !== task.verification?.updated_by ||
    verification.note !== task.verification?.note ||
    verification.implementation_sha !== value.implementation_sha ||
    !Array.isArray(verification.checks) ||
    verification.checks.length === 0
  ) {
    return null;
  }
  return value as QualificationPacket;
}

export async function readCurrentQualificationPacket(opts: {
  gitRoot: string;
  workflowDir: string;
  task: TaskData;
}): Promise<CurrentQualificationPacket | null> {
  if (!isQualificationTask(opts.task)) return null;
  const filePath = qualificationPacketPath({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    taskId: opts.task.id,
  });
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = parseQualificationPacket(JSON.parse(raw), opts.task);
    return parsed ? { path: filePath, file_sha256: sha256(raw), packet: parsed } : null;
  } catch {
    return null;
  }
}

type PinnedQualificationArtifact = {
  label: string;
  path: string;
  sha256: `sha256:${string}`;
};

function qualificationPinnedArtifacts(
  opts: CurrentQualificationPacket,
  gitRoot: string,
): PinnedQualificationArtifact[] {
  const packet = opts.packet;
  const artifacts: PinnedQualificationArtifact[] = [
    {
      label: "qualification packet",
      path: relativeToGitRoot(gitRoot, opts.path),
      sha256: opts.file_sha256,
    },
    {
      label: "qualification verification record",
      path: packet.verification.record_path,
      sha256: packet.verification.record_sha256,
    },
    {
      label: "RF-04 main baseline",
      path: packet.rf04.main_baseline.path,
      sha256: packet.rf04.main_baseline.sha256,
    },
    {
      label: "RF-04 replay baseline",
      path: packet.rf04.replay_comparison.baseline.path,
      sha256: packet.rf04.replay_comparison.baseline.sha256,
    },
    {
      label: "RF-04 current replay rebuild",
      path: packet.rf04.replay_comparison.current_rebuild.path,
      sha256: packet.rf04.replay_comparison.current_rebuild.sha256,
    },
    {
      label: "RF-04 candidate measurement",
      path: packet.rf04.candidate_measurement.path,
      sha256: packet.rf04.candidate_measurement.sha256,
    },
  ];
  for (const leaf of packet.dependency_closure.leaves) {
    artifacts.push(
      {
        label: `qualification leaf ${leaf.task_id} task document`,
        path: leaf.hosted_close.task_document.path,
        sha256: leaf.hosted_close.task_document.sha256,
      },
      {
        label: `qualification leaf ${leaf.task_id} PR metadata`,
        path: leaf.hosted_close.pr_meta.path,
        sha256: leaf.hosted_close.pr_meta.sha256,
      },
      {
        label: `qualification leaf ${leaf.task_id} quality report`,
        path: leaf.evaluator.quality_report.path,
        sha256: leaf.evaluator.quality_report.sha256,
      },
    );
  }
  return artifacts;
}

export async function assertQualificationEvidenceLineage(opts: {
  gitRoot: string;
  implementationSha: string;
  evidenceCommit: string;
  evidenceRoot: string;
}): Promise<void> {
  try {
    await execFileAsync(
      "git",
      ["merge-base", "--is-ancestor", opts.implementationSha, opts.evidenceCommit],
      { cwd: opts.gitRoot },
    );
  } catch {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Qualification evidence commit must descend from the packet's verified implementation SHA.",
    });
  }
  const { stdout } = await execFileAsync(
    "git",
    ["diff", "--name-only", opts.implementationSha, opts.evidenceCommit],
    { cwd: opts.gitRoot },
  );
  const allowedPrefix = `${opts.evidenceRoot.replaceAll(/\\+$/gu, "")}/`;
  const disallowedPath = String(stdout)
    .split("\n")
    .map((filePath) => filePath.trim())
    .find((filePath) => filePath && !filePath.startsWith(allowedPrefix));
  if (disallowedPath) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Qualification evidence commit may contain only current-task evidence after the packet's verified implementation SHA.",
    });
  }
}

export async function resolveQualificationEvidenceCommit(opts: {
  gitRoot: string;
  qualificationPacket: CurrentQualificationPacket;
}): Promise<string> {
  const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: opts.gitRoot });
  const commit = String(stdout).trim();
  if (!isSha(commit)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Qualification review requires a resolvable current HEAD commit.",
    });
  }
  await assertQualificationEvidenceLineage({
    gitRoot: opts.gitRoot,
    implementationSha: opts.qualificationPacket.packet.implementation_sha,
    evidenceCommit: commit,
    evidenceRoot: path.posix.dirname(
      path.posix.dirname(opts.qualificationPacket.packet.verification.record_path),
    ),
  });
  const seen = new Map<string, `sha256:${string}`>();
  for (const artifact of qualificationPinnedArtifacts(opts.qualificationPacket, opts.gitRoot)) {
    const previous = seen.get(artifact.path);
    if (previous && previous !== artifact.sha256) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Qualification packet declares conflicting hashes for ${artifact.path}.`,
      });
    }
    seen.set(artifact.path, artifact.sha256);
    const contents = await readFileAtGitCommit({
      gitRoot: opts.gitRoot,
      commit,
      filePath: path.resolve(opts.gitRoot, artifact.path),
      label: artifact.label,
      missingMessage:
        "Qualification review requires current HEAD to contain the exact qualification packet, verification record, and dependency evidence. Commit task artifacts before evaluator review.",
    });
    if (sha256(contents) !== artifact.sha256) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Qualification evidence at current HEAD does not match the sealed packet: ${artifact.label}.`,
      });
    }
  }
  return commit;
}
