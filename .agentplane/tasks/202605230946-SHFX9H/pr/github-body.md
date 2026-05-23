Task: `202605230946-SHFX9H`
Title: Use shared isRecord guard in batch metadata code
Canonical task record: `.agentplane/tasks/202605230946-SHFX9H/README.md`

## Summary

Use shared isRecord guard in batch metadata code

Replace local isRecord helpers introduced in branch_pr batch metadata paths with the shared guard so release guards:check passes.

## Scope

- In scope: Replace local isRecord helpers introduced in branch_pr batch metadata paths with the shared guard so release guards:check passes.
- Out of scope: unrelated refactors not required for "Use shared isRecord guard in batch metadata code".

## Verification

- State: ok
- Note:

```text
Implemented shared guard reuse. Evidence: bun run guards:check passed; bun test
packages/agentplane/src/commands/pr/internal/sync-batch-ownership.test.ts
packages/agentplane/src/commands/release/release-next-action-script.test.ts passed (5 tests, 49
expects); bun run lint:core passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T09:47:16.544Z
- Branch: task/202605230946-SHFX9H/shared-isrecord-guard
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/commands/pr/internal/sync.ts    | 5 +----
 packages/agentplane/src/commands/shared/task-handoff.ts | 5 +----
 2 files changed, 2 insertions(+), 8 deletions(-)
```

</details>
