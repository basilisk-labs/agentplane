Task: `202605251947-63FTP6`
Title: Reduce low-risk duplicate implementation paths
Canonical task record: `.agentplane/tasks/202605251947-63FTP6/README.md`

## Summary

Reduce low-risk duplicate implementation paths

Implement the first safe refactoring slice from the duplicate/redundancy audit: remove confirmed unused CLI code, extract repeated verification finding construction, and centralize small duplicated script/config parsing helpers without changing public CLI behavior.

## Scope

- In scope: Implement the first safe refactoring slice from the duplicate/redundancy audit: remove confirmed unused CLI code, extract repeated verification finding construction, and centralize small duplicated script/config parsing helpers without changing public CLI behavior.
- Out of scope: unrelated refactors not required for "Reduce low-risk duplicate implementation paths".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-25T19:51:43.995Z
- Branch: task/202605251947-63FTP6/reduce-duplicate-paths
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/task/verify-record.ts  | 102 +++++++++------------
 scripts/lib/workflow-config.mjs                    |  64 +++++++++++++
 scripts/release/release-task-evidence.mjs          |  55 +----------
 scripts/workflow/prepare-hosted-task-closure.mjs   |  59 +-----------
 4 files changed, 112 insertions(+), 168 deletions(-)
```

</details>
