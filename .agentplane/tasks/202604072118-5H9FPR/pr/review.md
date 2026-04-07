# PR Review

Created: 2026-04-07T21:35:58.735Z
Branch: task/202604072118-5H9FPR/reconcile-incident-promotion

## Summary

Promote incidents during hosted merge reconciliation

Make branch_pr hosted/local reconcile paths update incidents.md when DONE task findings contain promotable external incident entries, instead of only updating task projection metadata.

## Scope

- In scope: Make branch_pr hosted/local reconcile paths update incidents.md when DONE task findings contain promotable external incident entries, instead of only updating task projection metadata.
- Out of scope: unrelated refactors not required for "Promote incidents during hosted merge reconciliation".

## Verification

### Plan

1. Run targeted hosted/local reconcile tests. Expected: reconcile marks the task DONE and promotes any promotable external Findings into .agentplane/policy/incidents.md. 2. Run a negative coverage slice. Expected: reconcile still leaves incidents.md unchanged when there are no structured promotable findings. 3. Run focused eslint on touched reconcile/incidents files. Expected: new shared promotion path stays lint-clean.

### Current Status

- State: ok
- Note: Repo-local bootstrap refreshed; targeted normalize-migrate vitest passed with hosted/local incident promotion coverage; focused eslint on normalize/test files passed.

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

- Updated: 2026-04-07T21:39:08.661Z
- Branch: task/202604072118-5H9FPR/reconcile-incident-promotion
- Head: 245140db1748

```text
 .../run-cli.core.tasks.normalize-migrate.test.ts   | 213 ++++++++++++++++++++-
 packages/agentplane/src/commands/task/normalize.ts |  39 +++-
 2 files changed, 245 insertions(+), 7 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
