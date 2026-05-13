# PR Review

Created: 2026-05-13T18:29:54.674Z

## Task

- Task: `202605131828-HBJ5P8`
- Title: Make test routing faster and more flexible
- Status: DOING
- Branch: `task/202605131828-HBJ5P8/flexible-test-routing`
- Canonical task record: `.agentplane/tasks/202605131828-HBJ5P8/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:06:43.757Z
- Branch: task/202605131828-HBJ5P8/flexible-test-routing
- Head: fa819a8ee3b4

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 package.json                                       |   3 +-
 .../agentplane/src/cli/local-ci-selection.test.ts  |  32 +-
 .../commands/release/release-ci-contract.test.ts   |   6 +
 scripts/README.md                                  |   3 +-
 scripts/checks/run-local-ci.mjs                    |  62 ++-
 scripts/checks/run-vitest-suite.mjs                |  87 +++-
 scripts/lib/local-ci-selection.d.ts                |   4 +-
 scripts/lib/local-ci-selection.mjs                 | 120 +++++
 scripts/lib/test-route-registry.mjs                |  14 +
 10 files changed, 857 insertions(+), 26 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
