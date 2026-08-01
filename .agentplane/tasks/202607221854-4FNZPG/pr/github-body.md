Task: `202607221854-4FNZPG`
Title: Validate the 0.6.24-to-0.7 migration and installed-package matrix
Canonical task record: `.agentplane/tasks/202607221854-4FNZPG/README.md`

## Summary

Validate the 0.6.24-to-0.7 migration and installed-package matrix

Run the final compatibility matrix for new repositories, 0.6.24 direct/branch_pr repositories, WORKFLOW v1/v2, task docs v2/v3, active tasks, runner results, package exports, Node support, and installed tarballs.

## Scope

- In scope: automated migration fixtures/matrix, dry-run/rollback/idempotency, active-task preservation, direct/branch_pr route parity, Workflow/task/result schema versions, installed task brief/next-action/workflow doctor/runner smoke, package exports, Node engines, and exact failure diagnostics.
- Out of scope: changing product architecture after rc; defects become bounded release blockers/follow-up tasks.

## Verification

- State: needs_rework
- Note: Heavy prepublish gate is not yet reproducibly green on the recorded implementation head.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T19:32:48.683Z
- Branch: task/202607221854-4FNZPG/validate-the-0-6-24-to-0-7-migration-and-install
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../installed-migration-matrix-script.test.ts      | 103 ++++
 scripts/lib/installed-migration-matrix.mjs         | 649 +++++++++++++++++++++
 .../release/check-local-tarball-install-smoke.mjs  |  10 +
 3 files changed, 762 insertions(+)
```

</details>
