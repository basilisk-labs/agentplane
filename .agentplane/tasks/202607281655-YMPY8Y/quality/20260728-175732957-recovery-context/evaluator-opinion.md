# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- Concurrent replacement commands can independently authorize and start from the same failed journal because the pending replacement state is not persisted before provider preparation and start.
- Frozen verification evidence contains asserted outcomes but no command-level execution records, and the required real replacement-provider episode remains outstanding.

## Evidence
- .agentplane/tasks/202607281655-YMPY8Y/quality/20260728-175732957-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607281655-YMPY8Y/quality/20260728-175732957-recovery-context/evaluator-observed-checks.json
- .agentplane/tasks/202607281655-YMPY8Y/README.md
- .agentplane/policy/dod.code.md

## Missing Tests
- A command-level concurrency test launching two --replacement executions from the same operation_failed journal and proving that exactly one replacement intent/provider invocation is admitted.
- A persistence-boundary test proving replacement authorization is durably reserved before work-order preparation and cannot be consumed twice after interruption or interleaving.
- Frozen command/result/evidence/scope records for the focused tests, typecheck, formatting, and routing checks.
- The declared post-integration real --replacement episode for 202607221850-8HBF4J, proving preservation of the original failed operation and creation of exactly one linked replacement work order.

## Hidden Assumptions
- The task worktree's single-writer workflow prevents concurrent evaluator commands at runtime.
- Journal store writes provide an unstated compare-and-swap or locking guarantee sufficient to reject stale concurrent replacement starts.
- Summary notes accurately represent successful checks despite the absence of runner records.
- The post-integration provider proof may remain incomplete at the quality gate even though it is a declared acceptance criterion.

## Residual Risks
- Persist or atomically reserve the exact pending replacement before provider preparation, enforce stale-write rejection so only one caller can consume it, and add an interleaving test. Then freeze command-level verification records and complete the declared real post-integration replacement episode before requesting pass.
