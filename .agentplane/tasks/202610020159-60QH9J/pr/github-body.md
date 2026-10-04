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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-02T03:22:12.106Z
- Branch: task/202610020159-60QH9J/repair-authorized-policy-change-completion-and-r
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/advance-task-step.ts         |   3 +
 .../direct-task-verification.sequence.cases.ts     |   2 +
 .../src/commands/task/direct-task-verification.ts  |   2 +
 .../src/commands/task/kernel-advance.test.ts       |   6 +-
 .../commands/task/kernel-policy-baseline.test.ts   | 141 ++++++++++++++++
 .../src/commands/task/kernel-policy-baseline.ts    | 188 +++++++++++++++++++++
 .../commands/task/kernel-policy-completion.test.ts | 179 ++++++++++++++++++++
 .../task/kernel-repository-coordinator.test.ts     |  66 +++++++-
 .../commands/task/kernel-repository-coordinator.ts |  29 +++-
 .../src/commands/task/kernel-runtime-context.ts    |  20 ++-
 .../src/commands/task/kernel-semantic-result.ts    |   4 +-
 .../commands/task/roadmap-terminal-noop.test.ts    |   6 +-
 12 files changed, 634 insertions(+), 12 deletions(-)
```

</details>
