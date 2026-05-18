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
- Note: Verified: hardened release process follow-ups: branch_pr release plans now pin protected base SHA, release candidate preflight catches protected-base drift, PR checks/integration surface unresolved GitHub review threads, pre-push scope handles git push origin HEAD, Vitest hoisting warnings are removed, and close-tail duplicate PR risk is reduced by sibling branch-prefix detection. Focused Vitest, lint, build, routing, and doctor passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T18:33:48.212Z
- Branch: task/202605171326-FXRVNW/v063-prerelease-rough-edges
- Head: 8d5099f549f1

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
 .../commands/release/apply.pipeline/preflight.ts   |   1 +
 .../src/commands/release/apply.pipeline/state.ts   | 156 ++++++
 .../src/commands/release/apply.preflight.plan.ts   |   3 +-
 .../src/commands/release/apply.preflight.test.ts   |  55 ++
 .../agentplane/src/commands/release/apply.types.ts |   1 +
 .../src/commands/release/plan.command.ts           |  11 +-
 .../agentplane/src/commands/release/plan.test.ts   |   5 +
 packages/core/src/tasks/task-store.ts              |  14 +-
 scripts/release/next-action.mjs                    |   6 +
 scripts/release/state.mjs                          |  46 +-
 19 files changed, 2381 insertions(+), 40 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
