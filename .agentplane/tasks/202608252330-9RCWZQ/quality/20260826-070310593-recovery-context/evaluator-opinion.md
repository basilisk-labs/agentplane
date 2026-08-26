# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 6 typed finding(s).

## Findings
- The exact-SHA provider-base implementation and provider-boundary regressions are within scope and pass full CI.
- TaskAggregate records WI-1 READY and WI-2 PLANNED, but computeReadyWorkItems reports WI-1 false with input_missing for Task execution.base_ref and execution.base_sha, Configured or current repository base branch, and Live local and provider-visible branch heads.
- Those three values are context requirements, not output-manifest IDs; no predecessor WorkItem can produce them under the approved graph.
- WorkItemScheduler therefore returns an empty selection and recordTaskCentricExternalResult fails with The issued WorkItem is no longer present in the approved task plan.
- A validation-only material plan refinement is required before another verification: retain the same two WorkItems, scope, outputs, acceptance criteria, checks, and dependency WI-1 to WI-2, but remove prose context from required_inputs and keep it in context.required_sources/symbol_hints.
- Residual risk: Repeating implementation verification without correcting the plan graph will deterministically fail receipt recording again.

## Evidence
- .agentplane/tasks/202608252330-9RCWZQ/quality/objects/sha256/40b7d8dc17957fc877ffa91a1ef8afa3b513a03b896a29fa8ff477dc295356b0.patch

## Missing Tests
- none recorded

## Hidden Assumptions
- The approved plan assumed required_inputs were descriptive context, while TaskAggregate defines them as artifact dependency identifiers.

## Residual Risks
- Rework. Implementation commit 1c53295ba0a1d77eb1d4adc93b8c1776dbad1a08 and full CI pass, but the approved Task plan is not executable because WI-1 prose context was encoded as required artifact IDs, leaving scheduler readiness false.
