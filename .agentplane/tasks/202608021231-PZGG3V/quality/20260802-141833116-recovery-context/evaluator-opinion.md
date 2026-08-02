# Semantic quality review: blocked

Provenance: evaluator_supplied

EVALUATOR returned blocked with 1 typed finding(s).

## Findings
- The frozen evidence contains only a narrative verification note; it contains no deterministic check records, runner history, or runtime evidence for the evaluated SHA.

## Evidence
- .agentplane/tasks/202608021231-PZGG3V/quality/20260802-141833116-recovery-context/evaluator-observed-checks.json

## Missing Tests
- Frozen, machine-readable results for the product-contract qualification, focused supervisor/lifecycle/recovery suites, critical tests, typecheck, workflow coverage, ci:contract, task-state validation, doctor, and policy routing against evaluated SHA 06582bde1138360f789c18399c86df20279bafee.
- Frozen scenario evidence for direct and branch_pr planned, doing, approval-required, evaluator-rework, hosted-wait, done, blocked, stale-fingerprint, and effect-in-doubt states, including replay/idempotency and packet-size assertions.

## Hidden Assumptions
- The TESTER verification note is assumed to faithfully summarize checks whose commands, outputs, exit statuses, and SHA binding are absent from the frozen evidence.
- The claimed managed/external transition parity and absence of hidden side effects are assumed from the implementation and narrative note rather than demonstrated by reviewable runtime records.

## Residual Risks
- Regenerate the evaluator work order with deterministic, machine-readable verification records bound to evaluated SHA 06582bde1138360f789c18399c86df20279bafee, including the required scenario matrix and maintained gates, then repeat the semantic evaluation.
