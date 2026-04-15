# PR Review

Created: 2026-04-15T17:50:32.117Z
Branch: task/202604151748-763QPM/publish-exact-artifact-selection

## Summary

Fix publish exact artifact selection for release-ready recovery

Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload.

## Scope

- In scope: Publish detect resolves the correct release SHA but publish still downloads the generic release-ready artifact by run id. Carry the exact artifact identity from resolver through publish so workflow_dispatch recovery and first-parent publish both consume the exact release-ready payload.
- Out of scope: unrelated refactors not required for "Fix publish exact artifact selection for release-ready recovery".

## Verification

### Plan

1. Review the requested outcome for "Fix publish exact artifact selection for release-ready recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

### Current Status

- State: ok
- Note: Targeted release workflow checks passed: bun vitest run packages/agentplane/src/commands/release/publish-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. The publish workflow now carries release_ready_artifact_name from source.json and downloads the exact detected artifact instead of hard-coding the generic release-ready name.

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

- Updated: 2026-04-15T17:50:32.117Z
- Branch: task/202604151748-763QPM/publish-exact-artifact-selection
- Head: 3eacf6566b14

```text
 .agentplane/tasks/202604151748-763QPM/README.md    | 99 ++++++++++++++++++++++
 .github/workflows/publish.yml                      |  5 +-
 .../release/publish-workflow-contract.test.ts      |  9 +-
 3 files changed, 110 insertions(+), 3 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
