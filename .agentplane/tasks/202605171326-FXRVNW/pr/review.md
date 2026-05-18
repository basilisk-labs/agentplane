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
- Note: Verified follow-up: close-tail unit test coverage now stays below the oversized-test hotspot threshold after adding sibling close PR coverage.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T18:45:31.858Z
- Branch: task/202605171326-FXRVNW/v063-prerelease-rough-edges
- Head: d7923b35dd42

```text
 .agentplane/tasks/202605170941-3RACDD/README.md    |  84 ++-
 .../blueprint/resolved-snapshot.json               | 363 +++++++++++++
 .agentplane/tasks/202605171325-7P2VM4/README.md    |  74 ++-
 .../blueprint/resolved-snapshot.json               | 598 +++++++++++++++++++++
 .agentplane/tasks/202605171325-7P5M3V/README.md    |  74 ++-
 .../blueprint/resolved-snapshot.json               | 455 ++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 455 ++++++++++++++++
 .../agentplane/src/cli/local-ci-selection.test.ts  |   5 +
 .../src/commands/context/release-readiness.test.ts |  16 +
 packages/agentplane/src/commands/context/wiki.ts   |   4 +
 packages/agentplane/src/commands/pr/check.ts       |  19 +
 .../pr/integrate/internal/github-pr-merge.ts       |  18 +
 .../commands/pr/internal/github-review-threads.ts  | 108 ++++
 .../src/commands/pr/internal/sync-github.ts        |  43 ++
 .../commands/release/apply.pipeline/preflight.ts   |   1 +
 .../src/commands/release/apply.pipeline/state.ts   | 156 ++++++
 .../src/commands/release/apply.preflight.plan.ts   |   3 +-
 .../src/commands/release/apply.preflight.test.ts   |  55 ++
 .../agentplane/src/commands/release/apply.types.ts |   1 +
 .../src/commands/release/plan.command.ts           |  87 ++-
 .../agentplane/src/commands/release/plan.test.ts   |  54 +-
 .../agentplane/src/commands/task/finish-close.ts   |  15 +-
 .../commands/task/finish.close-tail.unit.test.ts   |  37 +-
 .../src/commands/task/mutation-parity.unit.test.ts |  10 +-
 packages/core/src/tasks/task-store.ts              |  14 +-
 scripts/lib/pre-push-scope.mjs                     |   2 +-
 scripts/release/next-action.mjs                    |   6 +
 scripts/release/state.mjs                          |  46 +-
 28 files changed, 2739 insertions(+), 64 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
