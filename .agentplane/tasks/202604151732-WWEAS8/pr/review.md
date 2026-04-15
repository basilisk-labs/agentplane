# PR Review

Created: 2026-04-15T17:34:16.300Z
Branch: task/202604151732-WWEAS8/exact-artifact-identity

## Summary

Require exact artifact identity for workflow_dispatch release-ready resolution

workflow_dispatch publish currently accepts a generic release-ready artifact from a mismatched run, which lets detect resolve the dispatch head instead of the true release candidate and makes publish fail on manifest sha mismatch.

## Scope

- In scope: workflow_dispatch publish currently accepts a generic release-ready artifact from a mismatched run, which lets detect resolve the dispatch head instead of the true release candidate and makes publish fail on manifest sha mismatch.
- Out of scope: unrelated refactors not required for "Require exact artifact identity for workflow_dispatch release-ready resolution".

## Verification

### Plan

1. Review the requested outcome for "Require exact artifact identity for workflow_dispatch release-ready resolution". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Verified exact artifact identity tightening locally.

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

- Updated: 2026-04-15T17:37:15.102Z
- Branch: task/202604151732-WWEAS8/exact-artifact-identity
- Head: 0ecf40b3aecb

```text
 .agentplane/tasks/202604151732-WWEAS8/README.md    | 150 +++++++++++++++++++++
 .../resolve-release-ready-source-script.test.ts    | 103 ++++++++++++++
 scripts/lib/release-ready-source.mjs               |   9 +-
 3 files changed, 260 insertions(+), 2 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
