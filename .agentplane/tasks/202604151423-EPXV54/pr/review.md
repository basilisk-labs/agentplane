# PR Review

Created: 2026-04-15T14:25:42.036Z
Branch: task/202604151423-EPXV54/release-recovery-dispatch-path

## Summary

Split exact-sha release recovery from broad Core CI test surface

Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits.

## Scope

- In scope: Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits.
- Out of scope: unrelated refactors not required for "Split exact-sha release recovery from broad Core CI test surface".

## Verification

### Plan

1. Review the requested outcome for "Split exact-sha release recovery from broad Core CI test surface". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Verified: exact-sha workflow_dispatch recovery now uses a publishability-only validation path; ci-workflow-contract.test.ts passes locally.

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

- Updated: 2026-04-15T14:32:15.945Z
- Branch: task/202604151423-EPXV54/release-recovery-dispatch-path
- Head: 4731c5b89bae

```text
 .agentplane/tasks/202604151423-EPXV54/README.md    | 121 +++++++++++++++++++++
 .github/workflows/ci.yml                           |  56 +++++++++-
 .../commands/release/ci-workflow-contract.test.ts  |  18 ++-
 3 files changed, 186 insertions(+), 9 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
