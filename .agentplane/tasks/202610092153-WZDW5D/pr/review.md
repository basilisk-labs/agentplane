# PR Review

Created: 2026-10-09T23:24:22.775Z

## Task

- Task: `202610092153-WZDW5D`
- Title: Align full CI nested timeouts and lint memory budget for issue #6093
- Status: DOING
- Branch: `task/202610092153-WZDW5D/align-full-ci-nested-timeouts-and-lint-memory-bu`
- Canonical task record: `.agentplane/tasks/202610092153-WZDW5D/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-09T23:24:22.775Z
- Branch: task/202610092153-WZDW5D/align-full-ci-nested-timeouts-and-lint-memory-bu
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/testing-and-quality.mdx             |  24 +++
 .../direct-task-verification.qualification.test.ts |  29 +++
 .../src/commands/task/direct-task-verification.ts  |  14 +-
 scripts/checks/run-local-ci-group.mjs              |  15 +-
 scripts/checks/run-local-ci.mjs                    |  42 +++-
 scripts/lib/local-ci-resource-profile.mjs          | 126 ++++++++++++
 scripts/lib/local-ci-resource-profile.test.mjs     | 220 +++++++++++++++++++++
 scripts/lib/verification-scheduler.d.ts            |  18 ++
 scripts/lib/verification-scheduler.mjs             |  56 +++++-
 9 files changed, 533 insertions(+), 11 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
