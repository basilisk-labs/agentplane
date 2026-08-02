# Semantic quality review: blocked

Provenance: evaluator_supplied

EVALUATOR returned blocked with 1 typed finding(s).

## Findings
- The frozen observed-checks artifact contains a verification summary but no deterministic check records, runner history, or runtime evidence for the evaluated SHA.

## Evidence
- .agentplane/tasks/202608021231-PZGG3V/quality/20260802-151617217-recovery-context/evaluator-observed-checks.json

## Missing Tests
- Provide frozen, exact-SHA deterministic results for the product-contract probe, focused supervisor/lifecycle/recovery suites, test:critical, typecheck, workflow coverage, ci:contract, task-state validation, doctor, and policy routing.
- Provide frozen scenario-level evidence for direct and branch_pr planned, doing, approval-required, evaluator-rework, hosted-wait, done, blocked, stale-fingerprint, and effect-in-doubt behavior, including packet size, parity, replay, and absence of hidden side effects.

## Hidden Assumptions
- The verification note is assumed to accurately summarize an external checks artifact that was not included in the frozen evaluator evidence.
- The added tests are assumed to exercise every required state and concurrency-sensitive path, although no test-level results are present in the frozen observed-checks artifact.

## Residual Risks
- Freeze the referenced exact-SHA checks artifact, or an equivalent deterministic check manifest with command and scenario results, into a new evaluator work order and rerun the semantic review.
