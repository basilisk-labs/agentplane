# PR Review

Created: 2026-04-13T16:09:25.111Z
Branch: task/202604131608-V0H90T/stale-post-merge-allowlist

## Summary

Allow post-merge cleanup under stale-dist guard

Let repo-local post-merge hooks run in warn-and-run mode under stale-dist so merged task branches/worktrees are pruned automatically after base sync.

## Scope

- In scope: Let repo-local post-merge hooks run in warn-and-run mode under stale-dist so merged task branches/worktrees are pruned automatically after base sync.
- Out of scope: unrelated refactors not required for "Allow post-merge cleanup under stale-dist guard".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: stale-dist policy now allows hooks run post-merge in warn-and-run mode, targeted stale-dist and hook cleanup suites pass, and manual cleanup semantics stay unchanged outside the managed hook path.

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

- Updated: 2026-04-13T16:12:03.417Z
- Branch: task/202604131608-V0H90T/stale-post-merge-allowlist
- Head: 591a613ca522

```text
 .agentplane/tasks/202604131608-V0H90T/README.md    | 121 +++++++++++++++++++++
 packages/agentplane/bin/stale-dist-policy.js       |   7 +-
 .../agentplane/src/cli/stale-dist-readonly.test.ts |  21 ++++
 3 files changed, 148 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
