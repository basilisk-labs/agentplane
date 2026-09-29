import { createHash } from "node:crypto";

import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import { parseVerificationCheckDetails } from "./verification-details.js";
import type {
  VerificationCommandIdentity,
  VerificationEnvironment,
  VerificationInputIdentity,
} from "./task-verification-input-types.js";

export function verificationInputSha256(value: string | Buffer): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

export function currentVerificationEnvironment(): VerificationEnvironment {
  return {
    platform: process.platform,
    architecture: process.arch,
    node_major: process.versions.node.split(".")[0] ?? process.versions.node,
    bun_major: process.versions.bun?.split(".")[0] ?? null,
  };
}

export function verificationCommandIdentity(details: string | null | undefined): {
  digest: `sha256:${string}`;
  entries: VerificationCommandIdentity[];
} {
  const entries = (parseVerificationCheckDetails(details) ?? [])
    .map((check) => ({ check_id: check.checkId, command: check.command }))
    .toSorted((left, right) =>
      `${left.check_id ?? ""}\0${left.command}`.localeCompare(
        `${right.check_id ?? ""}\0${right.command}`,
      ),
    );
  return {
    digest: verificationInputSha256(JSON.stringify(canonicalizeJson(entries))),
    entries,
  };
}

export function verificationInputDigest(opts: {
  executionDigest?: string | null;
  implementationDigest: string;
  verifyStepsDigest: string;
  verificationContractDigest?: string | null;
  contextDigest: string;
  environmentDigest: string;
  evidenceDigest: string;
}): `sha256:${string}` {
  return verificationInputSha256(
    JSON.stringify(
      canonicalizeJson({
        ...(opts.executionDigest ? { execution_digest: opts.executionDigest } : {}),
        implementation_digest: opts.implementationDigest,
        verify_steps_digest: opts.verifyStepsDigest,
        ...(opts.verificationContractDigest
          ? { verification_contract_digest: opts.verificationContractDigest }
          : {}),
        context_digest: opts.contextDigest,
        environment_digest: opts.environmentDigest,
        evidence_digest: opts.evidenceDigest,
      }),
    ),
  );
}

export function verificationInputV5Digest(opts: {
  concurrencyDigest: string;
  checkedInputDigest: string;
  obligationsDigest: string;
}): `sha256:${string}` {
  return verificationInputSha256(
    JSON.stringify(
      canonicalizeJson({
        concurrency_digest: opts.concurrencyDigest,
        checked_input_digest: opts.checkedInputDigest,
        obligations_digest: opts.obligationsDigest,
      }),
    ),
  );
}

export function verificationInputInvalidationReason(opts: {
  recorded: VerificationInputIdentity;
  current: VerificationInputIdentity;
}):
  | "verification_current"
  | "verification_route_context_changed"
  | "verification_plan_changed"
  | "verification_policy_changed"
  | "verification_capability_changed"
  | "verification_implementation_changed"
  | "verification_commands_changed"
  | "verification_steps_changed"
  | "verification_contract_changed"
  | "verification_obligation_coverage_changed"
  | "verification_context_changed"
  | "verification_environment_changed"
  | "verification_evidence_changed"
  | "verification_input_changed" {
  if (opts.recorded.digest === opts.current.digest) return "verification_current";
  if (opts.recorded.schema_version !== opts.current.schema_version) {
    return "verification_input_changed";
  }
  if (opts.recorded.schema_version === 5 && opts.current.schema_version === 5) {
    if (
      opts.recorded.concurrency.execution.digest !== opts.current.concurrency.execution.digest ||
      opts.recorded.concurrency.task.task_id !== opts.current.concurrency.task.task_id
    ) {
      return "verification_route_context_changed";
    }
    if (opts.recorded.concurrency.task.plan.digest !== opts.current.concurrency.task.plan.digest) {
      return "verification_plan_changed";
    }
    if (
      opts.recorded.concurrency.task.policy.digest !== opts.current.concurrency.task.policy.digest
    ) {
      return "verification_policy_changed";
    }
    if (
      opts.recorded.concurrency.task.capability.digest !==
      opts.current.concurrency.task.capability.digest
    ) {
      return "verification_capability_changed";
    }
    if (
      opts.recorded.checked_input.implementation.digest !==
      opts.current.checked_input.implementation.digest
    ) {
      return "verification_implementation_changed";
    }
    if (
      opts.recorded.checked_input.commands.digest !== opts.current.checked_input.commands.digest
    ) {
      return "verification_commands_changed";
    }
    if (
      opts.recorded.obligations.verify_steps_digest !== opts.current.obligations.verify_steps_digest
    ) {
      return "verification_steps_changed";
    }
    if (
      opts.recorded.obligations.verification_contract_digest !==
      opts.current.obligations.verification_contract_digest
    ) {
      return "verification_contract_changed";
    }
    if (opts.recorded.obligations.digest !== opts.current.obligations.digest) {
      return "verification_obligation_coverage_changed";
    }
    if (opts.recorded.checked_input.context.digest !== opts.current.checked_input.context.digest) {
      return "verification_context_changed";
    }
    if (
      opts.recorded.checked_input.environment.digest !==
      opts.current.checked_input.environment.digest
    ) {
      return "verification_environment_changed";
    }
    if (
      opts.recorded.checked_input.evidence.digest !== opts.current.checked_input.evidence.digest
    ) {
      return "verification_evidence_changed";
    }
    return "verification_input_changed";
  }
  if (opts.recorded.schema_version === 5 || opts.current.schema_version === 5) {
    return "verification_input_changed";
  }
  if (opts.recorded.execution?.digest !== opts.current.execution?.digest) {
    return "verification_route_context_changed";
  }
  if (opts.recorded.implementation.digest !== opts.current.implementation.digest) {
    return "verification_implementation_changed";
  }
  if (opts.recorded.verify_steps_digest !== opts.current.verify_steps_digest) {
    return "verification_steps_changed";
  }
  if (opts.recorded.verification_contract_digest !== opts.current.verification_contract_digest) {
    return "verification_contract_changed";
  }
  if (opts.recorded.context.digest !== opts.current.context.digest) {
    return "verification_context_changed";
  }
  if (opts.recorded.environment.digest !== opts.current.environment.digest) {
    return "verification_environment_changed";
  }
  if (opts.recorded.evidence.digest !== opts.current.evidence.digest) {
    return "verification_evidence_changed";
  }
  return "verification_input_changed";
}
