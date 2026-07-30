# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The candidate-term extractor returns a basename term for deleted source rows, which can surface stale candidates without task-bound source evidence.

## Evidence
- .agentplane/tasks/202607221852-YP9QCH/quality/20260730-100122509-recovery-context/evaluator-diff.patch

## Missing Tests
- Deleted manifest entry produces no candidate term or candidate group.

## Hidden Assumptions
- A deleted path remains valid reconciliation evidence.

## Residual Risks
- Suppress all candidate-term extraction for deleted, unsupported, and unreadable source rows; add a focused deterministic regression test.
