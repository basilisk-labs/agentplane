Task: `202608031426-0BY4B4`
Title: Make integration handoff and hosted-close finalization converge
Canonical task record: `.agentplane/tasks/202608031426-0BY4B4/README.md`

## Summary

Make integration handoff and hosted-close finalization converge

Fix branch_pr queue and route reconciliation so a merged PR with successful hosted-close and completed cleanup reaches terminal done automatically. Reproduce from PR 4756/run 30822322247: queue remained handoff, run-next would not reclaim it, and next-action repeated cleanup merged --finalize after cleanup was already clean. Preserve fail-closed behavior for unresolved reviews, failed checks, and ambiguous remote state.

## Scope

- In scope: Fix branch_pr queue and route reconciliation so a merged PR with successful hosted-close and completed cleanup reaches terminal done automatically. Reproduce from PR 4756/run 30822322247: queue remained handoff, run-next would not reclaim it, and next-action repeated cleanup merged --finalize after cleanup was already clean. Preserve fail-closed behavior for unresolved reviews, failed checks, and ambiguous remote state.
- Out of scope: unrelated refactors not required for "Make integration handoff and hosted-close finalization converge".

## Verification

- State: ok
- Note: Command: bun run ci:local:fast; focused Vitest route/queue suite; built CLI next-action against PR 4756 state.
Result: PASS. 533 files / 3767 tests passed; 12/12 critical CLI chunks passed; focused 7 files / 99 tests passed; typecheck, lint, format, policy routing, diff, hotspot, and build gates passed.
Evidence: implementation commit cd4b21269; actual PR 4756 route returned terminal.done with evidence_missing=none; retry tests prove unresolved review becomes queued and --wait retries without manual release.
Scope: integration queue retry classification, finalize-time queue normalization, base synchronization proof, hosted-close terminal route, and regression tests only.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T14:26:49.868Z
- Branch: task/202608031426-0BY4B4/make-integration-handoff-and-hosted-close-finali
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/branch/cleanup-merged.ts          |  36 +++++++
 .../src/commands/integrate-queue-reservation.ts    |  11 +-
 .../src/commands/integrate-queue.command.test.ts   |  43 ++++++++
 .../src/commands/integrate-queue.command.ts        |  20 +++-
 .../pr/internal/github-review-threads.test.ts      |  33 +++++-
 .../commands/pr/internal/github-review-threads.ts  |   5 +
 .../src/commands/shared/route-cleanup-probe.ts     |  64 ++++++++++++
 .../src/commands/shared/route-decision-types.ts    |   2 +-
 .../src/commands/shared/route-decision.ts          |  57 +----------
 .../src/commands/shared/workflow-step-branch.ts    |   7 ++
 .../shared/workflow-step-hosted-close.test.ts      | 113 +++++++++++++++++++++
 11 files changed, 332 insertions(+), 59 deletions(-)
```

</details>
