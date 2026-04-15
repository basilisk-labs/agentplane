# PR Review

Created: 2026-04-15T07:17:49.256Z
Branch: task/202604150716-0FJK7K/exact-sha-dispatch-identity

## Summary

Fix exact-sha workflow-dispatch identity for release recovery

Workflow-dispatch Core CI currently checks out a historical SHA but still records GitHub run/head metadata and release-ready identity against the dispatch branch head, so release recovery for d95b2762... remains blocked. Align workflow, manifest, and resolver logic so exact-SHA recovery is real, then use it to publish v0.3.11.

## Scope

- In scope: Workflow-dispatch Core CI currently checks out a historical SHA but still records GitHub run/head metadata and release-ready identity against the dispatch branch head, so release recovery for d95b2762... remains blocked. Align workflow, manifest, and resolver logic so exact-SHA recovery is real, then use it to publish v0.3.11.
- Out of scope: unrelated refactors not required for "Fix exact-sha workflow-dispatch identity for release recovery".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Command: bun vitest run packages/agentplane/src/commands/release/ci-workflow-contract.test.ts packages/agentplane/src/commands/release/resolve-release-ready-source-script.test.ts. Result: pass. Evidence: 10 targeted tests passed, including workflow_dispatch recovery alias and explicit run-id mismatch coverage. Scope: Core CI exact-sha artifact identity and release-ready source resolution for historical recovery.

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

- Updated: 2026-04-15T08:55:18.442Z
- Branch: task/202604150716-0FJK7K/exact-sha-dispatch-identity
- Head: ecf90d594592

```text
 .agentplane/tasks/202604150716-0FJK7K/README.md    | 118 +++++++++++++++++++++
 .github/workflows/ci.yml                           |  17 ++-
 .../commands/release/ci-workflow-contract.test.ts  |   5 +-
 .../resolve-release-ready-source-script.test.ts    | 110 ++++++++++++++++++-
 scripts/lib/github-actions-workflow-status.mjs     |  11 +-
 scripts/lib/release-ready-source.mjs               |  99 +++++++++++++----
 6 files changed, 336 insertions(+), 24 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
