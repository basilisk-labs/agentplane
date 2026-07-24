import type { ExecutionReceiptObservedCheck } from "@agentplaneorg/core/schemas";

import type { SupervisedProcessResult } from "../process-supervision/run.js";
import type { RunnerContextBundle, RunnerInvocation } from "../types.js";
import { codexInvocationHasExactFilesystemEffectSandbox } from "./codex-preparation.js";

const OBSERVED_PROVENANCE = "supervisor_observed" as const;
const EFFECT_CHECK_ID = "runner.sandbox.filesystem_effects_enforced";
const PROCESS_CHECK_ID = "runner.process_containment";
const COMPLETE_EFFECT_SANDBOX = "read-only";

function observedCheck(opts: {
  id: string;
  required: boolean;
  status: ExecutionReceiptObservedCheck["status"];
  details: string;
}): ExecutionReceiptObservedCheck {
  return {
    provenance: OBSERVED_PROVENANCE,
    id: opts.id,
    required: opts.required,
    status: opts.status,
    details: opts.details,
  };
}

export function validateNativeFilesystemEffectBoundary(
  invocation: RunnerInvocation,
  bundle: RunnerContextBundle | null,
): { expected: boolean; valid: boolean; details: string } {
  const attestation = invocation.filesystem_effect_containment;
  const sandboxPolicy = bundle?.execution.sandbox_policy;
  const sandboxDecision = bundle?.execution.policy_decision?.fields.sandbox;
  const capability = bundle?.execution.adapter_capabilities?.filesystem_effect_containment;
  const writeScope = bundle?.execution.write_scope;
  const requested = sandboxPolicy?.requested;
  const effective =
    typeof sandboxDecision?.effective === "string" ? sandboxDecision.effective : null;
  const expected =
    requested === COMPLETE_EFFECT_SANDBOX &&
    sandboxDecision?.status === "enforced" &&
    sandboxDecision.capability_level === "native" &&
    effective === requested &&
    capability?.level === "native" &&
    capability.boundary === "workspace" &&
    capability.descendant_inheritance === "enforced" &&
    capability.lifetime_containment === "not_provided" &&
    capability.supported_sandboxes.includes(requested) &&
    writeScope?.mutation_scope?.trim() === "none" &&
    writeScope.writable_roots.length === 0;
  const valid =
    expected &&
    attestation?.mechanism === "native_inherited_sandbox" &&
    attestation.sandbox === requested &&
    attestation.boundary === "workspace" &&
    attestation.descendant_inheritance === "enforced" &&
    attestation.lifetime_containment === "not_provided" &&
    codexInvocationHasExactFilesystemEffectSandbox(invocation, COMPLETE_EFFECT_SANDBOX);

  if (valid) {
    return {
      expected,
      valid,
      details:
        "The adapter attested that the native read-only sandbox is inherited by descendant commands and prevents filesystem writes. Descendant lifetime is not bounded, but detached descendants cannot write.",
    };
  }
  if (expected) {
    return {
      expected,
      valid,
      details:
        "The selected native sandbox requires filesystem-effect containment, but the supervisor-held invocation attestation is missing or inconsistent.",
    };
  }
  if (attestation) {
    return {
      expected,
      valid,
      details:
        "The invocation claimed native filesystem-effect containment without a matching enforced adapter capability and sandbox policy.",
    };
  }
  if (requested === "workspace-write") {
    return {
      expected,
      valid,
      details:
        "The native workspace-write sandbox does not prove exact writable roots, protected-path exclusions, or descendant lifetime containment.",
    };
  }
  if (requested === COMPLETE_EFFECT_SANDBOX) {
    return {
      expected,
      valid,
      details:
        "The native read-only sandbox can replace bounded descendant lifetime only when the declared mutation scope is none and writable roots are empty.",
    };
  }
  return {
    expected,
    valid,
    details:
      "The selected adapter does not establish an inherited native filesystem-effect boundary.",
  };
}

export function buildExecutionContainmentChecks(opts: {
  invocation: RunnerInvocation;
  bundle: RunnerContextBundle | null;
  process_result: SupervisedProcessResult | null;
}): ExecutionReceiptObservedCheck[] {
  const processTree = opts.process_result?.process_tree;
  const processBounded = processTree?.containment_state === "bounded";
  const effectBoundary = validateNativeFilesystemEffectBoundary(opts.invocation, opts.bundle);
  const effectRequired =
    !processBounded &&
    (effectBoundary.expected || Boolean(opts.invocation.filesystem_effect_containment));
  const effectCheck = observedCheck({
    id: EFFECT_CHECK_ID,
    required: effectRequired,
    status: effectBoundary.valid ? "passed" : effectRequired ? "failed" : "not_run",
    details: effectBoundary.details,
  });

  if (!opts.process_result) {
    return [
      effectCheck,
      observedCheck({
        id: PROCESS_CHECK_ID,
        required: true,
        status: "failed",
        details: "The supervisor did not capture process-containment evidence.",
      }),
    ];
  }
  if (processBounded) {
    return [
      effectCheck,
      observedCheck({
        id: PROCESS_CHECK_ID,
        required: true,
        status: "passed",
        details: "The supervisor established bounded descendant lifetime containment.",
      }),
    ];
  }
  const limitedProcessTree = opts.process_result.process_tree;
  return [
    effectCheck,
    observedCheck({
      id: PROCESS_CHECK_ID,
      required: !effectBoundary.valid,
      status: "not_run",
      details:
        limitedProcessTree.containment_limitation ??
        "The current execution mode does not establish bounded descendant lifetime containment.",
    }),
  ];
}
