# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- Retrieval applies the six-result limit before enforcing the work-order task-context allowlist. If higher-ranked repository-wide matches are out of scope, an authorized lower-ranked match is never examined and the request is incorrectly denied.
- The implementation reduces authorized task context to canonical paths and then rematerializes matching files with fresh digests, without proving that returned content still matches the digest-bound KnowledgeRef supplied by the work order.

## Evidence
- .agentplane/tasks/202607221852-01ACZ9/quality/20260730-141132797-recovery-context/evaluator-diff.patch

## Missing Tests
- A retrieval test where more than six higher-ranked repository matches are outside task_context but a lower-ranked authorized match exists; the authorized match must still be served.
- A drift test that changes an authorized file after work-order creation and verifies that retrieval rejects the stale work-order digest instead of returning the changed content with a new digest.
- Deterministic check records for the declared schema, critical, and typecheck commands; the frozen observed-checks artifact contains only a summary note and no verification records or runtime evidence.

## Hidden Assumptions
- Repository-wide search ranking is assumed to place an authorized task-context result within the first six rows.
- Canonical path membership is assumed to be equivalent to membership in the work order's digest-bound context.
- The verification summary is assumed to accurately represent completed checks despite the absence of frozen per-check records.

## Residual Risks
- Constrain retrieval before result limiting, or continue deterministic pagination until the authorized-result budget is satisfied or the projection is exhausted. Preserve and validate the work-order KnowledgeRef digest when materializing evidence, add adversarial ranking and post-work-order drift tests, then attach deterministic check records.
