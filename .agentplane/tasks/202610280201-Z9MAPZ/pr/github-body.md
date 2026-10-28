Task: `202610280201-Z9MAPZ`
Title: Allow exact provider update after failed integration
Canonical task record: `.agentplane/tasks/202610280201-Z9MAPZ/README.md`

## Summary

Allow exact provider update after failed integration

When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors.

## Scope

- In scope: When integration.run_next fails because a hosted PR becomes behind, the recovered supervisor successor should admit the exact provider.pr.update_branch step bound to the original integration identity. Preserve fail-closed mismatch handling and semantic rework for other successors.
- Out of scope: unrelated refactors not required for "Allow exact provider update after failed integration".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-28T02:57:22.708Z
- Branch: task/202610280201-Z9MAPZ/allow-exact-provider-update-after-failed-integra
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...rnal-agent-workflow-recovery-provider-update.ts | 124 ++++++++++++
 .../task/external-agent-workflow-recovery.test.ts  | 225 +++++++++++++++++++++
 .../task/external-agent-workflow-recovery.ts       |  16 +-
 3 files changed, 355 insertions(+), 10 deletions(-)
```

</details>
