# PR Review

Created: 2026-04-27T14:18:58.754Z
Branch: task/202604271418-0D3EDF/preserve-merge-history

## Summary

Preserve branch_pr merge history by default

Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly.

## Scope

- In scope: Change branch_pr integrate policy, CLI defaults, and prompt/help text so merge commits preserve task branch history by default, while squash remains an explicit opt-in strategy. Update tests and docs/policy references accordingly.
- Out of scope: unrelated refactors not required for "Preserve branch_pr merge history by default".

## Verification

### Plan

1. Run focused integrate/PR-flow tests covering merge strategy defaults. Expected: default branch_pr integrate uses merge-preserving strategy and explicit squash remains supported.
2. Run tests or snapshots covering command help/policy prompt text touched by this task. Expected: guidance no longer recommends squash as the default branch_pr route.
3. Run `bun run typecheck`. Expected: it succeeds.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
5. Run Prettier/ESLint on touched source and policy/doc files. Expected: both succeed.

### Current Status

- State: pending
- Note: Not recorded yet.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-27T14:18:58.754Z
- Branch: task/202604271418-0D3EDF/preserve-merge-history
- Head: 0662769ce92f

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
