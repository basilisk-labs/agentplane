import type { SgrReasoningStep, SgrSourceRef } from "./contract-types.js";
import {
  invalid,
  optionalNumber,
  optionalSourceRefs,
  optionalString,
  requireRecord,
  requireString,
} from "./contract-validators.js";

export function validateSourceRef(raw: unknown, field = "source ref"): SgrSourceRef {
  const source = requireRecord(raw, field);
  const sha256 = optionalString(source.sha256, `${field}.sha256`);
  if (sha256 !== undefined && !/^sha256:[a-fA-F0-9]{64}$/.test(sha256)) {
    throw invalid(`${field}.sha256`, "sha256:<64 hex chars>");
  }
  return {
    path: requireString(source.path, `${field}.path`),
    sha256: sha256 as SgrSourceRef["sha256"],
    line: optionalNumber(source.line, `${field}.line`),
    lines: optionalString(source.lines, `${field}.lines`),
    section: optionalString(source.section, `${field}.section`),
  };
}

export function validateReasoningStep(raw: unknown, field = "reasoning step"): SgrReasoningStep {
  const step = requireRecord(raw, field);
  return {
    label: requireString(step.label, `${field}.label`),
    summary: requireString(step.summary, `${field}.summary`),
    evidence_refs: optionalSourceRefs(
      step.evidence_refs,
      `${field}.evidence_refs`,
      validateSourceRef,
    ),
  };
}
