Task: `202608032207-V8HMV8`
Title: Make qualification reruns ignore their active evidence directory
Canonical task record: `.agentplane/tasks/202608032207-V8HMV8/README.md`

## Summary

Make qualification reruns ignore their active evidence directory

Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes.

## Scope

- In scope: Fix the v0.7.1 qualification runner so its top-level exact-subject cleanliness check excludes only the explicitly selected nested evidence directory, allowing audit-to-gate reruns without hiding unrelated repository changes.
- Out of scope: unrelated refactors not required for "Make qualification reruns ignore their active evidence directory".

## Verification

- State: needs_rework
- Note: GitHub review found that an arbitrary nested --out-dir can hide source changes from the exact-subject gate.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T22:10:16.335Z
- Branch: task/202608032207-V8HMV8/qualification-evidence-rerun
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../qualification/release-qualification.test.mjs   | 27 +++++++++++++-----
 .../run-v0.7.1-release-qualification.mjs           | 32 +++++++++++++++-------
 2 files changed, 42 insertions(+), 17 deletions(-)
```

</details>
