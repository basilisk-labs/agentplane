# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 1 typed finding(s).

## Findings
- The implementation does not demonstrate managed/external frontend parity across the required lifecycle and recovery scenarios. The added integration coverage exercises external advance only for approval, one direct semantic boundary, and one non-authoritative branch stop; the remaining states are tested through synthetic packet projection rather than comparative execution against managed task run.

## Evidence
- .agentplane/tasks/202608021231-PZGG3V/README.md
- .agentplane/tasks/202608021231-PZGG3V/quality/20260802-142354612-recovery-context/evaluator-diff.patch
- .agentplane/cache/task-verification/202608021231-PZGG3V/06582bde1138360f789c18399c86df20279bafee-checks.json

## Missing Tests
- Run task run and task advance from equivalent direct and branch_pr fixtures and compare resulting transition identities, state fingerprints, persisted evidence, and stop classifications for planned, doing, approval-required, evaluator-rework, hosted-wait, done, blocked, stale-fingerprint, and effect-in-doubt states.
- Exercise an authoritative branch_pr deterministic-transition sequence through task advance, including replay after interruption and concurrent state drift, rather than testing only a non-authoritative control-plane stop.
- Verify that task advance without --agent-json and with --agent-json perform identical state transitions and evidence writes, differing only in rendering.

## Hidden Assumptions
- Because both frontends call the canonical route-decision and supervision helpers, they are assumed to remain behaviorally equivalent without a comparative frontend test.
- Synthetic projection of WorkflowStep variants is assumed to prove persisted lifecycle, concurrency, and recovery behavior.
- The scenario_coverage declaration in runtime evidence is assumed to correspond to comparative managed/external executions, although the frozen diff does not contain such coverage.

## Residual Risks
- Add comparative managed-versus-external integration coverage for every required lifecycle and recovery state, including authoritative branch transitions, persisted evidence, replay, and concurrent stale-state handling; then regenerate SHA-bound verification evidence.
