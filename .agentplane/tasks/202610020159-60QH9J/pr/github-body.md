Task: `202610020159-60QH9J`
Title: Repair authorized policy-change completion and recovery, merge the fix to main, then enable repository autonomy
Canonical task record: `.agentplane/tasks/202610020159-60QH9J/README.md`

## Summary

Repair authorized policy-change completion and recovery, merge the fix to main, then enable repository autonomy

User explicitly authorizes implementing and testing a bounded repair for task 202610020153-XXZXW4: canonical completion hardcodes allowPolicy=false and continuation rejects native_policy_changed after an authorized policy edit. Preserve fail-closed checks for unauthorized drift, frozen task scope, independent review and evidence. Support authorized policy edits and safe retry after commit failure without self-authorizing from edited policy. Merge the repair into main through the supported supervisor route, then recover and complete the approved autonomy configuration task. Network, PR publication and merge into main are explicitly requested. Preserve unrelated task artifacts. No release publishing, credentials changes, destructive history or weakening general authority checks.

## Scope

- In scope: User explicitly authorizes implementing and testing a bounded repair for task 202610020153-XXZXW4: canonical completion hardcodes allowPolicy=false and continuation rejects native_policy_changed after an authorized policy edit. Preserve fail-closed checks for unauthorized drift, frozen task scope, independent review and evidence. Support authorized policy edits and safe retry after commit failure without self-authorizing from edited policy. Merge the repair into main through the supported supervisor route, then recover and complete the approved autonomy configuration task. Network, PR publication and merge into main are explicitly requested. Preserve unrelated task artifacts. No release publishing, credentials changes, destructive history or weakening general authority checks.
- Out of scope: unrelated refactors not required for "Repair authorized policy-change completion and recovery, merge the fix to main, then enable repository autonomy".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-05T21:09:18.108Z
- Branch: task/202610020159-60QH9J/repair-authorized-policy-change-completion-and-r
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-backend/kernel-backend-adapter.test.ts    | 192 +++++++++++++++++++
 .../src/cli/run-cli.core.roadmap-recovery.test.ts  |   5 +-
 .../evaluator/evaluator-evidence-boundary.ts       |  47 ++++-
 .../evaluator/evaluator-evidence-store.test.ts     | 162 +++++++++++++++-
 .../commands/evaluator/evaluator-evidence-store.ts |   2 +
 .../src/commands/task/advance-task-step.ts         |   3 +
 .../direct-task-verification.sequence.cases.ts     |   2 +
 .../src/commands/task/direct-task-verification.ts  |   2 +
 .../src/commands/task/kernel-advance.test.ts       |   6 +-
 .../commands/task/kernel-policy-baseline.test.ts   | 141 ++++++++++++++
 .../src/commands/task/kernel-policy-baseline.ts    | 188 ++++++++++++++++++
 .../commands/task/kernel-policy-completion.test.ts | 209 +++++++++++++++++++++
 .../task/kernel-repository-coordinator.test.ts     |  66 ++++++-
 .../commands/task/kernel-repository-coordinator.ts |  29 ++-
 .../src/commands/task/kernel-runtime-context.ts    |  28 ++-
 .../src/commands/task/kernel-semantic-result.ts    |   4 +-
 .../commands/task/roadmap-terminal-noop.test.ts    |   6 +-
 ...te-fingerprint-residual-git.integration.test.ts |   3 +-
 .../usecases/task-run-context.integration.test.ts  |   2 +-
 .../usecases/task-run-effect-resolution.test.ts    | 159 ++++++++++------
 .../usecases/task-run-lifecycle-cancel.test.ts     |   3 +-
 .../src/tasks/task-kernel/authority-delta.test.ts  | 158 +++++++++++++++-
 .../src/tasks/task-kernel/authority-lineage.ts     |  40 +++-
 23 files changed, 1371 insertions(+), 86 deletions(-)
```

</details>
