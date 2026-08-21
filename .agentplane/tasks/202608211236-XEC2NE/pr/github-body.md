Task: `202608211236-XEC2NE`
Title: Repair packaged candidate verification-contract refresh after managed upgrade
Canonical task record: `.agentplane/tasks/202608211236-XEC2NE/README.md`

## Summary

Repair packaged candidate verification-contract refresh after managed upgrade

Fix the packaged-candidate-flow qualification regression exposed after rebasing PR #4853 onto current main. The direct upgrade scenario must record verification evidence that covers the exact evaluated diff, including .agentplane/agents/UPGRADER.json, without weakening evaluator enforcement. Validate the focused packaged-candidate-flow and relevant tests, publish and merge the prerequisite PR, then refresh PR #4853.

## Scope

- In scope: Fix the packaged-candidate-flow qualification regression exposed after rebasing PR #4853 onto current main. The direct upgrade scenario must record verification evidence that covers the exact evaluated diff, including .agentplane/agents/UPGRADER.json, without weakening evaluator enforcement. Validate the focused packaged-candidate-flow and relevant tests, publish and merge the prerequisite PR, then refresh PR #4853.
- Out of scope: unrelated refactors not required for "Repair packaged candidate verification-contract refresh after managed upgrade".

## Verification

- State: needs_rework
- Note:

```text
Hosted P1 review requires preserving the single-commit fallback when a direct task has no genuinely
frozen pre-execution base (discussion_r3833736708).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-21T21:04:38.003Z
- Branch: task/202608211236-XEC2NE/repair-packaged-candidate-verification-contract
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/verify-record-observed-changes.ts         |  26 +++++-
 .../task/verify-record.durability.unit.test.ts     | 102 +++++++++++++++++++++
 2 files changed, 127 insertions(+), 1 deletion(-)
```

</details>
