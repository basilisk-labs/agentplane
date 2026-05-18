Task: `202605171326-FXRVNW`
Title: Freeze release candidate base and scope after late merges
Canonical task record: `.agentplane/tasks/202605171326-FXRVNW/README.md`

## Summary

Freeze release candidate base and scope after late merges

Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.

## Scope

- In scope: Harden release candidate planning so a patch release cannot claim to exclude work that is already merged into the candidate base. The v0.6.2 regression case is a release task that planned to exclude route-decision CLI work while PR #3823 later landed on origin/main. Release tooling should pin the base SHA, detect late merges, and require explicit revert, branch cut, or re-scope before candidate generation.
- Out of scope: unrelated refactors not required for "Freeze release candidate base and scope after late merges".

## Verification

- State: ok
- Note:

```text
Verified: release planning now records baseSha and release candidate/apply fails closed if HEAD
drifts from the planned base; focused release plan tests, builds, policy routing, and doctor passed.
```
- Canonical workflow state lives in the task README.

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
