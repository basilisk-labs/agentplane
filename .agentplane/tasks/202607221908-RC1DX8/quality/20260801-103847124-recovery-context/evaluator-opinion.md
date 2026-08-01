# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- `task run` uses one execution-capability profile for both dry-run preparation and execution, so preparation still declares provider and Git-mutation capabilities.
- The frozen check evidence contains only a verification summary; verification records, runner history, runtime evidence, and direct-supervision evidence are empty.

## Evidence
- .agentplane/tasks/202607221908-RC1DX8/quality/20260801-103847124-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221908-RC1DX8/README.md
- .agentplane/tasks/202607221908-RC1DX8/quality/20260801-103847124-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607221908-RC1DX8/quality/20260801-103847124-recovery-context/evaluator-blueprint.json

## Missing Tests
- Assert that dry-run preparation receives a session whose declared requirements exclude `provider`, `git.mutate`, and other execution-only capabilities.
- Exercise direct and branch_pr dry-run and execution fixtures while recording the resolved capability set for each phase.
- Provide deterministic results for the declared guards, lifecycle invariants, critical tests, typecheck, focused runner/Hermes matrix, and concurrency-sensitive supervision paths.

## Hidden Assumptions
- Not calling `session.require` for an execution-only capability is assumed equivalent to not declaring that capability.
- The aggregate TESTER note is assumed to faithfully represent all named checks despite the absence of frozen check records.
- The unrelated FIFO timeout is assumed to be suite-load flakiness without frozen concurrency or rerun output.

## Residual Risks
- Split or otherwise constrain `task run` preparation and execution so dry-run preparation cannot declare execution-only provider or Git-mutation capabilities, add a capability-set assertion for the dry-run path, and freeze deterministic outputs for the declared and concurrency-sensitive checks before reevaluation.
