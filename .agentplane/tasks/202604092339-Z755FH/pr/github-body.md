## Summary

Warn on stale verify metadata during pr update

When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later.

## Scope

- In scope: When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later.
- Out of scope: unrelated refactors not required for "Warn on stale verify metadata during pr update".

## Verification

### Plan

1. Verify a task branch, create another commit, and run pr update. Expected: pr update completes but prints an exact rerun-verify warning naming the stale last_verified_sha and current head.
2. Run pr update when head_sha still matches last_verified_sha. Expected: no stale-verify warning is printed.
3. Run targeted regression tests. Expected: stale and fresh verify metadata paths are both covered.

### Current Status

- State: ok
- Note: Verified: targeted pr-flow stale-verify regression test and eslint passed for pr update warning behavior.

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

- Updated: 2026-04-09T23:59:25.027Z
- Branch: task/202604092339-Z755FH/pr-update-stale-verify-warning
- Head: c41381cb5cfc

```text
 .agentplane/tasks/202604092339-Z755FH/README.md    | 117 +++++++++++++++++++++
 .../tasks/202604092339-Z755FH/pr/diffstat.txt      |   0
 .../tasks/202604092339-Z755FH/pr/github-body.md    |  50 +++++++++
 .../tasks/202604092339-Z755FH/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604092339-Z755FH/pr/meta.json |  14 +++
 .../tasks/202604092339-Z755FH/pr/notes.jsonl       |   0
 .agentplane/tasks/202604092339-Z755FH/pr/review.md |  57 ++++++++++
 .../tasks/202604092339-Z755FH/pr/verify.log        |   0
 .../src/cli/run-cli.core.pr-flow.pr.test.ts        |  10 +-
 packages/agentplane/src/commands/pr/update.ts      |  80 +++++++++++++-
 10 files changed, 326 insertions(+), 3 deletions(-)
```

</details>
