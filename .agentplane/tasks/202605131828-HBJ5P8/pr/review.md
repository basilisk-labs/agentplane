# PR Review

Created: 2026-05-13T18:29:54.674Z

## Task

- Task: `202605131828-HBJ5P8`
- Title: Make test routing faster and more flexible
- Status: DOING
- Branch: `task/202605131828-HBJ5P8/flexible-test-routing`
- Canonical task record: `.agentplane/tasks/202605131828-HBJ5P8/README.md`

## Verification

- State: ok
- Note: Verified: flexible test routing, smoke local CI mode, critical-cli chunk runner, timing reports, route registry, eslint, generated scripts docs, diff hygiene, and policy routing pass on current task branch head.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T20:33:20.125Z
- Branch: task/202605131828-HBJ5P8/flexible-test-routing
- Head: b263353a5d66

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 package.json                                       |   3 +-
 .../backends/task-backend/cloud-backend-state.ts   |  29 ++
 .../src/backends/task-backend/cloud-backend.ts     |  38 +-
 .../agentplane/src/cli/local-ci-selection.test.ts  |  32 +-
 .../commands/release/release-ci-contract.test.ts   |   7 +
 scripts/README.md                                  |   3 +-
 scripts/checks/run-local-ci.mjs                    |  62 ++-
 scripts/checks/run-vitest-suite.mjs                |  87 +++-
 scripts/lib/local-ci-selection.d.ts                |   4 +-
 scripts/lib/local-ci-selection.mjs                 | 120 +++++
 scripts/lib/test-route-registry.mjs                |  14 +
 scripts/oversized-test-baseline.json               |   6 +-
 13 files changed, 896 insertions(+), 61 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
