Task: `202610251417-WYHEXR`
Title: Recover proven applied provider branch updates after interrupted supervisor intents
Canonical task record: `.agentplane/tasks/202610251417-WYHEXR/README.md`

## Summary

Recover proven applied provider branch updates after interrupted supervisor intents

A completed branch_pr task can retain a stopped effect_in_doubt provider.pr.update_branch intent after GitHub updates its PR head and the controller is interrupted. Add a generic fail-closed read-only reconciliation route for the exact original operation. Require bound USER-authorized operation identity, current provider PR identity, exact published descendant ancestry from original head and base, clean local branch/tracking alignment, and atomic journal completion. Never repeat provider PUT during recovery. Reject ambiguous, mismatched, stale, replayed, or unrelated mutating intents. Preserve failed hosted checks and let normal route re-evaluate.

## Scope

- In scope: A completed branch_pr task can retain a stopped effect_in_doubt provider.pr.update_branch intent after GitHub updates its PR head and the controller is interrupted. Add a generic fail-closed read-only reconciliation route for the exact original operation. Require bound USER-authorized operation identity, current provider PR identity, exact published descendant ancestry from original head and base, clean local branch/tracking alignment, and atomic journal completion. Never repeat provider PUT during recovery. Reject ambiguous, mismatched, stale, replayed, or unrelated mutating intents. Preserve failed hosted checks and let normal route re-evaluate.
- Out of scope: unrelated refactors not required for "Recover proven applied provider branch updates after interrupted supervisor intents".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-25T17:46:12.223Z
- Branch: task/202610251417-WYHEXR/recover-proven-applied-provider-branch-updates-a
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../supervisor-execution-effect-recovery.test.ts   |  89 +++++
 .../src/commands/shared/workflow-step-authority.ts |   2 +-
 .../src/commands/task/advance.command.ts           |   4 +-
 .../src/commands/task/ordinary-advance-step.ts     |   4 +-
 .../task/provider-update-effect-recovery.test.ts   | 416 +++++++++++++++++++++
 .../task/provider-update-effect-recovery.ts        | 365 ++++++++++++++++++
 .../task/roadmap-integration-parity.test.ts        |   5 +-
 .../src/commands/task/workflow-effect-recovery.ts  |  22 ++
 8 files changed, 899 insertions(+), 8 deletions(-)
```

</details>
