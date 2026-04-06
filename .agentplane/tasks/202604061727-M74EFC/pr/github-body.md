## Summary

Fix stale repo-local build drift after base sync

Investigate why a framework checkout becomes stale immediately after syncing main, run the required bootstrap, and implement the smallest reliable fix so repo-local runtime/bootstrap remains usable without repeated manual recovery after normal base updates.

## Scope

- In scope: Investigate why a framework checkout becomes stale immediately after syncing main, run the required bootstrap, and implement the smallest reliable fix so repo-local runtime/bootstrap remains usable without repeated manual recovery after normal base updates.
- Out of scope: unrelated refactors not required for "Fix stale repo-local build drift after base sync".

## Verification

### Plan

1. Run `bun run framework:dev:bootstrap` from a synced framework checkout and from a fresh task worktree that shares the same git common root. Expected: bootstrap completes without requiring a network submodule fetch when the common root already has `agentplane-recipes` and reusable workspace dependencies.
2. Run `agentplane runtime explain` and `agentplane task list` in the bootstrapped worktree. Expected: both commands use the repo-local runtime without stale-build warnings.
3. Run targeted checks for the touched bootstrap path. Expected: `bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts` and `bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts` pass.

### Current Status

- State: ok
- Note: Post-commit verification synced to current head

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

- Updated: 2026-04-06T17:39:39.062Z
- Branch: task/202604061727-M74EFC/stale-build-drift
- Head: 820620b4cd90

```text
No changes detected.
```

</details>
