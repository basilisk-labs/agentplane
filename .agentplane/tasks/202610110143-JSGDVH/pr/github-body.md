Task: `202610110143-JSGDVH`
Title: Make no-grace process cleanup verification deterministic
Canonical task record: `.agentplane/tasks/202610110143-JSGDVH/README.md`

## Summary

Make no-grace process cleanup verification deterministic

Repair the HY full run-008 runtime timing assertion without changing production behavior or increasing a threshold. Preserve real integration assertions: exit 0, cleanup not_needed, no signals, no residual processes and containment. Replace only total wall time below 1500ms with a deterministic unit assertion: mock ESRCH only for the exact negative process-group ID, use fake timers, require cleanupSupervisedProcessGroup with 2000ms grace to resolve without advancing time or scheduling a timer, and restore spies and timers in finally. Preserve original failed HY run-008 evidence. No provider, network, production change or parallel full regression.

## Scope

- In scope: Repair the HY full run-008 runtime timing assertion without changing production behavior or increasing a threshold. Preserve real integration assertions: exit 0, cleanup not_needed, no signals, no residual processes and containment. Replace only total wall time below 1500ms with a deterministic unit assertion: mock ESRCH only for the exact negative process-group ID, use fake timers, require cleanupSupervisedProcessGroup with 2000ms grace to resolve without advancing time or scheduling a timer, and restore spies and timers in finally. Preserve original failed HY run-008 evidence. No provider, network, production change or parallel full regression.
- Out of scope: unrelated refactors not required for "Make no-grace process cleanup verification deterministic".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-11T02:29:04.159Z
- Branch: task/202610110143-JSGDVH/deterministic-no-grace-proof
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../process-supervision.process-tree.test.ts       |  2 -
 .../process-supervision/process-tree.test.ts       | 44 ++++++++++++++++++++++
 2 files changed, 44 insertions(+), 2 deletions(-)
```

</details>
