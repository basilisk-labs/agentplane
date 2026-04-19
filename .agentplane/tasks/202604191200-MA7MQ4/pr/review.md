# PR Review

Created: 2026-04-19T12:31:53.285Z
Branch: task/202604191200-MA7MQ4/release-candidate-preflight

## Summary

Add fail-fast preflight for release candidate route

Validate clean tracked tree, authored release notes, and other cheap release-candidate prerequisites before launching the expensive release:prepublish gate in branch_pr mode.

## Scope

- In scope: Validate clean tracked tree, authored release notes, and other cheap release-candidate prerequisites before launching the expensive release:prepublish gate in branch_pr mode.
- Out of scope: unrelated refactors not required for "Add fail-fast preflight for release candidate route".

## Verification

### Plan

1. Review the requested outcome for "Add fail-fast preflight for release candidate route". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Added a fail-fast release-candidate preflight layer by reusing the shared release preflight checks with command-aware diagnostics, then covered the new dirty-tracked-tree branch_pr route with release apply regressions kept green.

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

- Updated: 2026-04-19T12:33:22.911Z
- Branch: task/202604191200-MA7MQ4/release-candidate-preflight
- Head: 64d75a4e9cbd

```text
 .../src/commands/release/apply.pipeline.ts         | 28 +++++++---
 .../src/commands/release/apply.preflight.ts        | 65 +++++++++++++++-------
 .../agentplane/src/commands/release/apply.test.ts  | 51 +++++++++++++++++
 3 files changed, 118 insertions(+), 26 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
