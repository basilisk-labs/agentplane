## Summary

Sanitize hosted-merge-sync gh lookups

Make hosted branch_pr reconcile use the same sanitized GitHub CLI environment contract as other gh helpers so task normalize no longer fails with child-process 401 errors when standalone gh is authenticated.

## Scope

- In scope: Make hosted branch_pr reconcile use the same sanitized GitHub CLI environment contract as other gh helpers so task normalize no longer fails with child-process 401 errors when standalone gh is authenticated.
- Out of scope: unrelated refactors not required for "Sanitize hosted-merge-sync gh lookups".

## Verification

### Plan

1. Reproduce hosted branch_pr reconcile from the CLI while standalone gh remains authenticated. Expected: hosted merge lookup succeeds without child-process 401 drift. 2. Run focused tests for hosted merge sync and related gh environment handling. Expected: sanitized gh env is preserved and reconcile behavior stays deterministic. 3. Verify the task normalize reconcile path or equivalent targeted command completes without manual gh workarounds.

### Current Status

- State: ok
- Note: Command: bun x vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts
Result: pass
Evidence: 16/16 targeted tests passed, including the leaked GIT_DIR/GIT_WORK_TREE normalize regression.
Scope: hosted-merge-sync gh environment sanitization and CLI reconcile path.

Command: bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts
Result: pass
Evidence: eslint exited 0 for all touched hosted-merge-sync files.
Scope: implementation, unit regression, and CLI normalize regression.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-09T15:44:49.996Z
- Branch: task/202604091534-QQH4QA/gh-env-sync
- Head: 42d5768e1902

```text
No changes detected.
```

</details>
