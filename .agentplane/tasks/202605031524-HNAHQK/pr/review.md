# PR Review

Created: 2026-05-03T15:31:22.377Z
Branch: task/202605031524-HNAHQK/batch-metadata-contract

## Summary

Make branch_pr batch metadata first-class

Extend branch_pr PR metadata and artifact rendering so a primary PR records included task ids as a structured batch membership contract, with tests proving stable preservation across pr open/update.

## Scope

- In scope: Extend branch_pr PR metadata and artifact rendering so a primary PR records included task ids as a structured batch membership contract, with tests proving stable preservation across pr open/update.
- Out of scope: unrelated refactors not required for "Make branch_pr batch metadata first-class".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Structured branch_pr batch metadata implemented and focused checks passed.

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

- Updated: 2026-05-03T15:31:42.929Z
- Branch: task/202605031524-HNAHQK/batch-metadata-contract
- Head: bab00d92157e

```text
 .../commands/pr/internal/review-template.test.ts   | 87 ++++++++++------------
 .../src/commands/pr/internal/review-template.ts    |  3 +-
 .../src/commands/pr/internal/sync-open-step.ts     |  7 +-
 .../src/commands/pr/internal/sync-update-step.ts   |  5 +-
 .../agentplane/src/commands/shared/pr-meta.test.ts | 58 +++++++++++++++
 packages/agentplane/src/commands/shared/pr-meta.ts | 83 +++++++++++++++++++--
 packages/core/schemas/pr-meta.schema.json          | 27 +++++++
 .../src/tasks/task-artifact-schema.pr-metadata.ts  | 10 +++
 packages/spec/schemas/pr-meta.schema.json          | 27 +++++++
 9 files changed, 244 insertions(+), 63 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
