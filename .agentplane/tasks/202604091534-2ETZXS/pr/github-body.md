## Summary

Sanitize gh env for hosted merge sync lookups

Make hosted merge reconciliation use the same sanitized gh environment contract as other GitHub helpers so sync-hosted-merges does not fail with child-process auth drift while direct gh commands still work.

## Scope

- In scope: Make hosted merge reconciliation use the same sanitized gh environment contract as other GitHub helpers so sync-hosted-merges does not fail with child-process auth drift while direct gh commands still work.
- Out of scope: unrelated refactors not required for "Sanitize gh env for hosted merge sync lookups".

## Verification

### Plan

1. Reproduce the hosted merge lookup path with a `gh` subprocess environment that includes unrelated git overrides. Expected: hosted merge sync still resolves the merged PR instead of surfacing a child-process auth/config failure.
2. Run focused hosted-merge-sync tests. Expected: sanitized `gh` env coverage passes and existing local/hosted reconcile behavior remains intact.
3. Run targeted lint/tests for touched helpers. Expected: no regressions in GitHub transport or branch_pr reconciliation paths.

### Current Status

- State: ok
- Note: Command: bun x vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
Result: pass
Evidence: 7/7 hosted-merge-sync tests passed, including sanitized gh env coverage for merged PR lookups.
Scope: hosted merge reconciliation GitHub transport contract.

Command: bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
Result: pass
Evidence: eslint exited 0.
Scope: hosted merge sync implementation and regression tests.

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

- Updated: 2026-04-09T15:42:08.592Z
- Branch: task/202604091534-2ETZXS/gh-env-hosted-sync
- Head: c8d4591af50e

```text
No changes detected.
```

</details>
