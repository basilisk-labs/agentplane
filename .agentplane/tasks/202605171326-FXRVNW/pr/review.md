# PR Review

Created: 2026-05-18T17:41:11.285Z

## Task

- Task: `202605171326-FXRVNW`
- Title: Freeze release candidate base and scope after late merges
- Status: DOING
- Branch: `task/202605171326-FXRVNW/v063-prerelease-rough-edges`
- Canonical task record: `.agentplane/tasks/202605171326-FXRVNW/README.md`

## Verification

- State: ok
- Note: Verified: release planning now records baseSha and release candidate/apply fails closed if HEAD drifts from the planned base; focused release plan tests, builds, policy routing, and doctor passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T17:46:47.806Z
- Branch: task/202605171326-FXRVNW/v063-prerelease-rough-edges
- Head: 96af9912673c

```text
 .agentplane/tasks/202605170941-3RACDD/README.md    |  84 ++-
 .../blueprint/resolved-snapshot.json               | 363 +++++++++++++
 .agentplane/tasks/202605171325-7P2VM4/README.md    |  74 ++-
 .../blueprint/resolved-snapshot.json               | 598 +++++++++++++++++++++
 .agentplane/tasks/202605171325-7P5M3V/README.md    |  74 ++-
 .../blueprint/resolved-snapshot.json               | 455 ++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 455 ++++++++++++++++
 .../src/commands/context/release-readiness.test.ts |  16 +
 packages/agentplane/src/commands/context/wiki.ts   |   4 +
 .../src/commands/release/apply.pipeline/state.ts   |  31 ++
 .../src/commands/release/apply.preflight.plan.ts   |   3 +-
 .../agentplane/src/commands/release/apply.types.ts |   1 +
 .../src/commands/release/plan.command.ts           |  11 +-
 .../agentplane/src/commands/release/plan.test.ts   |   5 +
 packages/core/src/tasks/task-store.ts              |  14 +-
 scripts/release/next-action.mjs                    |   6 +
 scripts/release/state.mjs                          |  46 +-
 17 files changed, 2200 insertions(+), 40 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
