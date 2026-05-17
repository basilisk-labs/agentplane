Task: `202605171021-ARB2JV`
Title: Fix task README trailing whitespace generation
Canonical task record: `.agentplane/tasks/202605171021-ARB2JV/README.md`

## Summary

Fix task README trailing whitespace generation

Task README rendering can emit lines containing only indentation spaces in YAML block scalars and may preserve trailing spaces in verification entries. Fix canonical rendering so generated task artifacts pass git diff --check without manual whitespace cleanup, and audit adjacent renderer paths for the same class.

## Scope

- In scope: Task README rendering can emit lines containing only indentation spaces in YAML block scalars and may preserve trailing spaces in verification entries. Fix canonical rendering so generated task artifacts pass git diff --check without manual whitespace cleanup, and audit adjacent renderer paths for the same class.
- Out of scope: unrelated refactors not required for "Fix task README trailing whitespace generation".

## Verification

- State: ok
- Note:

```text
Verified: task README block scalar rendering no longer creates whitespace-only blank lines;
verification entries trim per-line tails. Checks passed: focused core task README/doc tests, focused
agentplane workflow transition/shared tests, Prettier on touched files, git diff --check, policy
routing, and repo-local runtime bootstrap.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T10:33:00.195Z
- Branch: task/202605171021-ARB2JV/fix-task-readme-whitespace
- Head: 43b4ccf19267

```text
 .../blueprint/resolved-snapshot.json               | 527 +++++++++++++++++++++
 .../task/shared/workflow-transition-service.ts     |  13 +-
 .../task/workflow-transition-service.unit.test.ts  |  21 +
 packages/core/src/tasks/task-readme.test.ts        |  11 +-
 packages/core/src/tasks/task-readme.ts             |   8 +-
 5 files changed, 572 insertions(+), 8 deletions(-)
```

</details>
