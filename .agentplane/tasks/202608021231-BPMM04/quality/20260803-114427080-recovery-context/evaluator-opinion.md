# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- A completed task can be marked with fully observed token usage even when output/reasoning breakdown telemetry was absent from one or more agent runs.

## Evidence
- .agentplane/tasks/202608021231-BPMM04/quality/20260803-114427080-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202608021231-BPMM04/README.md

## Missing Tests
- Add a deterministic completion test where every agent run has input/output/total telemetry but at least one run omits visible_output_tokens and reasoning_tokens; the task projection must be partial and must not expose fabricated zero breakdown counts.
- Add the equivalent mixed executor/evaluator test using an evaluator receipt that lacks the optional output/reasoning breakdown fields.

## Hidden Assumptions
- Numeric visible_output_tokens and reasoning_tokens fields in the aggregate are assumed to prove that every observed agent run supplied those fields, although they are initialized to zero independently of provider evidence.
- All evaluator/provider receipts are assumed to include the newly optional breakdown fields.

## Residual Risks
- Track breakdown-observed provenance separately from primary token-observed runs, or otherwise ensure projection can distinguish genuine zero breakdown counts from absent breakdown telemetry; then cover mixed executor/evaluator and replay paths.
