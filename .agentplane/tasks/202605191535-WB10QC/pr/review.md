# PR Review

Created: 2026-05-19T15:43:24.548Z

## Task

- Task: `202605191535-WB10QC`
- Title: Make local test routing more flexible and observable
- Status: DOING
- Branch: `task/202605191535-WB10QC/flexible-test-routing`
- Canonical task record: `.agentplane/tasks/202605191535-WB10QC/README.md`

## Verification

- State: ok
- Note: Revalidated local CI route explainability after implementation and PR artifact commits.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T15:52:47.939Z
- Branch: task/202605191535-WB10QC/flexible-test-routing
- Head: 4083285e3a46

```text
 .../blueprint/resolved-snapshot.json               | 598 +++++++++++++++++++++
 package.json                                       |   2 +
 .../agentplane/src/cli/local-ci-selection.test.ts  |  59 +-
 .../commands/release/release-ci-contract.test.ts   |   4 +
 scripts/checks/run-local-ci.mjs                    | 137 +++--
 scripts/lib/local-ci-selection.mjs                 | 148 +++++
 6 files changed, 917 insertions(+), 31 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
