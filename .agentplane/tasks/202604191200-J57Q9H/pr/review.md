# PR Review

Created: 2026-04-19T13:22:57.345Z
Branch: task/202604191200-J57Q9H/split-release-prepublish

## Summary

Split release prepublish into fast and heavy phases

Break release:prepublish into explicit fast, test, and pack phases with machine-readable reports so release failures surface the blocking phase immediately instead of after one long opaque command.

## Scope

- In scope: Break release:prepublish into explicit fast, test, and pack phases with machine-readable reports so release failures surface the blocking phase immediately instead of after one long opaque command.
- Out of scope: unrelated refactors not required for "Split release prepublish into fast and heavy phases".

## Verification

### Plan

1. Review the requested outcome for "Split release prepublish into fast and heavy phases". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Split release prepublish into explicit fast and heavy phases, reordered the gate to run the fast payload validation before the expensive CI route, and added a regression that proves the heavy phase is skipped when the fast phase fails.

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

- Updated: 2026-04-19T13:23:47.497Z
- Branch: task/202604191200-J57Q9H/split-release-prepublish
- Head: 57161a18c611

```text
 package.json                                       |  4 +-
 .../src/commands/release/apply.preflight.ts        | 88 ++++++++++++----------
 .../agentplane/src/commands/release/apply.test.ts  | 82 +++++++++++++++++++-
 3 files changed, 130 insertions(+), 44 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
