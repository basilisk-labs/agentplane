Task: `202608181315-3NYFYK`
Title: Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7
Canonical task record: `.agentplane/tasks/202608181315-3NYFYK/README.md`

## Summary

Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7

Deliver the complete 0.7.7 patch pool: prevent task branches from inheriting diverged or contaminated local base history; block foreign-task commits and artifacts before PR publication; make provider truth authoritative for MERGED/DONE/cleanup and detect local/provider contradictions in doctor and release gates; preserve fully autonomous mode=all including integration.enqueue while loading authority only from a trusted base/operator-owned policy source; make task lookup and read/write/grant route contexts canonical across old worktrees; allow PLANNER to refine structured execution contracts and route evaluator-required scope widening through a controlled approval boundary; incorporate only still-relevant local changes, discard duplicates already present upstream, integrate the verified patch/beta release automation, run focused/full/installed-package/hosted checks, publish 0.7.7, and verify all public release surfaces plus opening 0.7.8-beta.1.

## Scope

- In scope: Deliver the complete 0.7.7 patch pool: prevent task branches from inheriting diverged or contaminated local base history; block foreign-task commits and artifacts before PR publication; make provider truth authoritative for MERGED/DONE/cleanup and detect local/provider contradictions in doctor and release gates; preserve fully autonomous mode=all including integration.enqueue while loading authority only from a trusted base/operator-owned policy source; make task lookup and read/write/grant route contexts canonical across old worktrees; allow PLANNER to refine structured execution contracts and route evaluator-required scope widening through a controlled approval boundary; incorporate only still-relevant local changes, discard duplicates already present upstream, integrate the verified patch/beta release automation, run focused/full/installed-package/hosted checks, publish 0.7.7, and verify all public release surfaces plus opening 0.7.8-beta.1.
- Out of scope: unrelated refactors not required for "Harden task isolation, provider truth, autonomous authority, recovery, and release AgentPlane 0.7.7".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-18T13:16:41.665Z
- Branch: task/202608181315-3NYFYK/harden-task-isolation-provider-truth-autonomous
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .github/workflows/publish.yml                      |  57 +++++++-
 docs/developer/release-and-publishing.mdx          |  34 ++++-
 docs/reference/generated-reference.mdx             |  14 +-
 docs/releases/v0.7.7.md                            |  38 ++++++
 packages/agentplane/package.json                   |   6 +-
 packages/agentplane/src/cli/reason-codes.ts        |   6 +
 .../src/cli/run-cli.core.pr-flow.test.ts           |   4 +-
 .../src/cli/run-cli.core.task-advance.test.ts      |  10 +-
 ...run-cli.core.task-create-planner-intent.test.ts |   9 +-
 .../src/commands/branch/work-start.git.test.ts     |  40 ++++++
 .../src/commands/branch/work-start.git.ts          |  23 +++-
 .../integrate/internal/github-protection.test.ts   |   3 +
 .../pr/integrate/internal/github-protection.ts     |   7 +-
 .../src/commands/pr/integrate/internal/prepare.ts  |  12 ++
 .../branch-task-artifact-ownership.test.ts         |  75 +++++++++++
 .../pr/internal/branch-task-artifact-ownership.ts  |  70 ++++++++++
 .../agentplane/src/commands/pr/internal/sync.ts    |  12 ++
 .../release/check-release-version-script.test.ts   |  34 ++++-
 .../open-next-development-version-script.test.ts   | 148 +++++++++++++++++++++
 .../src/commands/release/plan.command.ts           |  17 ++-
 .../src/commands/release/plan.helpers.ts           |  91 ++++++++++++-
 .../agentplane/src/commands/release/plan.test.ts   |  85 ++++++++++++
 .../release/publish-workflow-contract.test.ts      |  18 +++
 .../release/release-task-evidence-script.test.ts   |   8 +-
 .../src/commands/shared/task-backend.test.ts       |  43 +++++-
 .../agentplane/src/commands/shared/task-backend.ts |  30 ++++-
 .../src/commands/task/advance.command.ts           |  13 +-
 .../src/commands/task/configured-authority.test.ts |   6 +
 .../task/external-agent-planning-authority.ts      |  16 ++-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../baselines/v0.7-compatibility-candidate.json    |   6 +-
 scripts/lib/next-development-version.mjs           | 119 +++++++++++++++++
 scripts/lib/release-semver.mjs                     |  66 +++++++++
 scripts/lib/release-version-surfaces.mjs           |  63 ++++++++-
 .../release/check-local-tarball-install-smoke.mjs  |   5 +-
 scripts/release/check-release-version.mjs          |  25 +++-
 scripts/release/open-next-development-version.mjs  |  55 ++++++++
 scripts/release/release-task-evidence.mjs          |  19 ++-
 scripts/release/version-bump.mjs                   |  13 +-
 44 files changed, 1229 insertions(+), 85 deletions(-)
```

</details>
