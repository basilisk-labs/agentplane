# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- Evaluator execution persists intent before launch but turns a known nonzero provider exit into an effect-in-doubt recovery path; the next invocation cannot distinguish a graceful read-only provider failure from a crash.

## Evidence
- .agentplane/tasks/202607242236-1BFWEY/quality/20260728-050440170-recovery-context/evaluator-diff.patch

## Missing Tests
- Exercise a nonzero Codex evaluator exit through evaluator execute and assert a redacted terminal failure record plus an actionable classification.

## Hidden Assumptions
- A provider failure before a typed result is always indistinguishable from an external effect, although the evaluator authority is read-only.

## Residual Risks
- Record a bounded, redacted read-only provider failure before returning E_RUNTIME; preserve crash-time intent as effect_in_doubt, and add the matching restart and diagnostic tests.
