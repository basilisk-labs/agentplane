import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import type { AgentChangeRecord } from "@agentplaneorg/core/schemas";

import { isRecord } from "../../shared/guards.js";
import type { loadTaskFromContext } from "../shared/task-backend.js";
import {
  buildNativeQualityReviewIdentity,
  latestVerificationInputDigest,
  resolveNativeTaskIdentity,
} from "../shared/native-task-identity.js";
import { evaluatorAcceptanceCriteria } from "../evaluator/evaluator-review-shared.js";

type AcrTask = Awaited<ReturnType<typeof loadTaskFromContext>>;

export function buildAcrContextExtension(task: AcrTask): Record<string, unknown> {
  if (task.task_kind !== "context") return {};
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const context = extensions["agentplane.context"];
  if (!isRecord(context)) return {};
  return {
    "agentplane.context": {
      ...structuredClone(context),
      schema_version: 1,
      task_id: task.id,
      task_kind: task.task_kind,
      mutation_scope: task.mutation_scope ?? null,
    },
  };
}

export function buildAcrNativeIdentityExtension(task: AcrTask, implementationSha: string | null) {
  const identity = resolveNativeTaskIdentity(task);
  if (!identity) return null;
  const review = buildNativeQualityReviewIdentity({
    task,
    native_identity: identity,
    verification_input_digest: latestVerificationInputDigest(task),
    acceptance_criteria: evaluatorAcceptanceCriteria(task),
    implementation_sha: implementationSha,
  });
  return {
    schema_version: 1,
    task_id: task.id,
    identity,
    review_identity: review,
  };
}

export function inferCheckType(
  command: string,
): AgentChangeRecord["verification"]["checks"][number]["type"] {
  if (command.includes("typecheck")) return "typecheck";
  if (command.includes("lint")) return "lint";
  if (command.includes("build")) return "build";
  if (command.includes("schema")) return "schema_validation";
  if (command.includes("test") || command.includes("vitest")) return "test";
  return "other";
}

export async function hashFile(filePath: string): Promise<string> {
  const bytes = await readFile(filePath);
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

export function buildResidualRisks(opts: {
  taskHash: string | null;
  planState: string;
  verificationState: string;
  verificationChecks: AgentChangeRecord["verification"]["checks"];
  evidence: AgentChangeRecord["evidence"];
}): string[] {
  const risks: string[] = [];
  if (opts.planState !== "approved") risks.push("Plan is not approved.");
  if (opts.verificationState !== "ok") risks.push("Verification is not recorded as ok.");
  if (opts.verificationState === "ok" && opts.verificationChecks.length === 0) {
    risks.push("Passed verification has no checks.");
  }
  if (!opts.taskHash) risks.push("Task README evidence is missing.");
  if (!opts.evidence.some((item) => item.type === "plan")) risks.push("Plan evidence is missing.");
  if (!opts.evidence.some((item) => item.type === "verification_log")) {
    risks.push("Verification log evidence is missing.");
  }
  return risks;
}
