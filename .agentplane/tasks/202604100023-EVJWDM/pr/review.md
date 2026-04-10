# PR Review

Created: 2026-04-10T00:30:41.150Z
Branch: task/202604100023-EVJWDM/integrate-autobootstrap

## Summary

Auto-bootstrap framework runtime after integrate touches watched sources

When branch_pr integrate lands watched runtime source changes on base inside the framework checkout, refresh the repo-local runtime automatically so the next finish --close-commit does not fail on stale dist.

## Scope

- In scope: When branch_pr integrate lands watched runtime source changes on base inside the framework checkout, refresh the repo-local runtime automatically so the next finish --close-commit does not fail on stale dist.
- Out of scope: unrelated refactors not required for "Auto-bootstrap framework runtime after integrate touches watched sources".

## Verification

### Plan

1. Run the targeted integrate unit tests that cover watched-runtime merges in a framework checkout. Expected: integrate invokes framework bootstrap automatically when watched runtime sources changed, and skips bootstrap otherwise.
2. Exercise the failure branch with a mocked bootstrap error. Expected: integrate still succeeds at the git/task level but emits an explicit warning that the runtime refresh failed and manual bootstrap is required.
3. Run the touched-unit lint/test slice for the integrate command and any new bootstrap helper. Expected: the new auto-bootstrap path passes without regressing existing integrate behavior.

### Current Status

- State: ok
- Note: Verified: bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts and bun x eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.ts packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts passed; integrate now auto-refreshes repo-local runtime on watched-source merges and falls back to explicit manual guidance on bootstrap failure.

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

- Updated: 2026-04-10T00:37:13.668Z
- Branch: task/202604100023-EVJWDM/integrate-autobootstrap
- Head: No commits yet

```text
No changes detected.
```

</details>
<!-- END AUTO SUMMARY -->
