# PR Review

Created: 2026-08-01T19:31:51.047Z

## Task

- Task: `202607221854-4FNZPG`
- Title: Validate the 0.6.24-to-0.7 migration and installed-package matrix
- Status: DOING
- Branch: `task/202607221854-4FNZPG/validate-the-0-6-24-to-0-7-migration-and-install`
- Canonical task record: `.agentplane/tasks/202607221854-4FNZPG/README.md`

## Verification

- State: needs_rework
- Note: Heavy prepublish gate is not yet reproducibly green on the recorded implementation head.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T19:32:48.683Z
- Branch: task/202607221854-4FNZPG/validate-the-0-6-24-to-0-7-migration-and-install
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.branch-meta.readiness.test.ts |  18 +
 ...n-cli.core.branch-meta.sync-maintenance.test.ts |   4 -
 .../installed-migration-matrix-script.test.ts      | 103 ++++
 scripts/lib/installed-migration-matrix.mjs         | 649 +++++++++++++++++++++
 .../release/check-local-tarball-install-smoke.mjs  |  10 +
 5 files changed, 780 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
