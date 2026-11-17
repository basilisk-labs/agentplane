Task: `202610271221-Y385P8`
Title: Use configured workflow mode for canonical final-validation targets
Canonical task record: `.agentplane/tasks/202610271221-Y385P8/README.md`

## Summary

Use configured workflow mode for canonical final-validation targets

Fix issue #6943: in direct repositories, canonical final validation must resolve initial, restored, and post-check target commit using configured workflow mode so I-C-M history selects semantic commit C; branch_pr remains strict. Preserve fail-closed missing/changed identity, content fingerprint, and failed-check behavior. Scope source and nearest tests only. Full framework CI required before integration.

## Scope

- In scope: Fix issue #6943: in direct repositories, canonical final validation must resolve initial, restored, and post-check target commit using configured workflow mode so I-C-M history selects semantic commit C; branch_pr remains strict. Preserve fail-closed missing/changed identity, content fingerprint, and failed-check behavior. Scope source and nearest tests only. Full framework CI required before integration.
- Out of scope: unrelated refactors not required for "Use configured workflow mode for canonical final-validation targets".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-27T13:08:48.098Z
- Branch: task/202610271221-Y385P8/use-configured-workflow-mode-for-canonical-final
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/shared/quality-review-target.test.ts  | 45 +++++++++-------
 .../commands/task/kernel-final-validation.test.ts  | 62 ++++++++++++++++++++--
 .../src/commands/task/kernel-final-validation.ts   | 12 +----
 3 files changed, 85 insertions(+), 34 deletions(-)
```

</details>
