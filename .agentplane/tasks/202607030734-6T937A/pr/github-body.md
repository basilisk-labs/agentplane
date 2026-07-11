Task: `202607030734-6T937A`
Title: Context help: expose nested v2 commands
Canonical task record: `.agentplane/tasks/202607030734-6T937A/README.md`

## Summary

Context help: expose nested v2 commands

Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably.

## Scope

- In scope: Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably.
- Out of scope: unrelated refactors not required for "Context help: expose nested v2 commands".

## Verification

- State: ok
- Note:

```text
Included implementation was merged by PR #4543; rebased patch-id matches d53b6cf, current help
contract is 14/14 passing, and agentplane typecheck passes.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-11T14:18:38.012Z
- Branch: task/202607030734-6T937A/post-merge-close-included-context-help
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
