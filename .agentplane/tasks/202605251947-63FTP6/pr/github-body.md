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

- State: ok
- Note:

```text
Local verification passed. Command: bun run test:project -- agentplane
packages/agentplane/src/commands/task/verify-record.unit.test.ts
packages/agentplane/src/cli/prepare-hosted-task-closure-script.test.ts
packages/agentplane/src/commands/release/release-task-evidence-script.test.ts. Result: pass, 3 files
and 30 tests passed. Command: bun run typecheck. Result: pass. Command: bun run lint:core --
packages/agentplane/src/commands/task/verify-record.ts scripts/lib/workflow-config.mjs
scripts/workflow/prepare-hosted-task-closure.mjs scripts/release/release-task-evidence.mjs. Result:
pass. Command: bun run clone:report. Result: pass; clones 89->86 and duplicatedLines 1403->1311
versus pre-change audit.
```
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
