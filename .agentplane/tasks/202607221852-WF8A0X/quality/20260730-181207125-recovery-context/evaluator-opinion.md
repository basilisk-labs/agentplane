# Semantic quality review: rework

Provenance: evaluator_supplied

EVALUATOR returned rework with 2 typed finding(s).

## Findings
- A crashed stale-lock reclaimer leaves a permanent reclaim guard that prevents all later CURATOR selections.
- CURATOR task creation and its durable selection receipt are not interruption-atomic, so a crash after task creation can produce an orphaned task and a duplicate owner on retry.

## Evidence
- .agentplane/tasks/202607221852-WF8A0X/quality/20260730-181207125-recovery-context/evaluator-diff.patch
- .agentplane/tasks/202607221852-WF8A0X/README.md

## Missing Tests
- Simulate process interruption after creating the reclaim guard and verify a later invocation can safely reclaim the abandoned guard and selection lock.
- Inject failures after CURATOR task creation but before task-pack, source-marker, and selection-receipt persistence; verify retry adopts or reconciles the existing exact task instead of creating a second owner.

## Hidden Assumptions
- The reclaiming process will always execute its finally block and remove the reclaim guard.
- All writes after CURATOR task creation will complete before interruption, or an orphaned created task will be discovered automatically on retry.
- A passing in-process replacement-lock race test represents process-crash recovery, although it does not exercise abandoned guard state or post-creation partial persistence.

## Residual Risks
- Make reclaim guards lease- and owner-aware with safe stale-guard recovery, then introduce a durable pre-creation intent or idempotent adoption protocol so retries reconcile a partially created CURATOR task before creating another owner. Add crash-point tests for both recovery boundaries.
