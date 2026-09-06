# PR Review

Created: 2026-09-06T17:54:49.525Z

## Task

- Task: `202609061750-Z0XXVD`
- Title: Prepare and qualify AgentPlane 0.7.8 for exact-SHA hosted publication
- Status: DOING
- Branch: `task/202609061750-Z0XXVD/prepare-and-qualify-agentplane-0-7-8-for-exact-s`
- Canonical task record: `.agentplane/tasks/202609061750-Z0XXVD/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-06T18:16:20.873Z
- Branch: task/202609061750-Z0XXVD/prepare-and-qualify-agentplane-0-7-8-for-exact-s
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |    2 +-
 docs/assets/header.svg                             |    4 +-
 docs/assets/readme-headers/adr.svg                 |    4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |    4 +-
 docs/assets/readme-headers/agentplane.svg          |    4 +-
 docs/assets/readme-headers/core.svg                |    4 +-
 docs/assets/readme-headers/docs.svg                |    4 +-
 docs/assets/readme-headers/humanizer.svg           |    4 +-
 docs/assets/readme-headers/recipes.svg             |    4 +-
 docs/assets/readme-headers/releases.svg            |    4 +-
 docs/assets/readme-headers/schemas.svg             |    4 +-
 docs/assets/readme-headers/scripts.svg             |    4 +-
 docs/assets/readme-headers/skills.svg              |    4 +-
 docs/assets/readme-headers/spec.svg                |    4 +-
 docs/assets/readme-headers/testkit.svg             |    4 +-
 docs/reference/generated-reference.mdx             |   14 +-
 docs/releases/v0.7.8-evidence/preparation.md       |   35 +
 .../v0.7.8-evidence/qualify-upgrade-0.7.7.mjs      |  283 +
 .../v0.7.8-evidence/release-plan-changes.json      | 7087 ++++++++++++++++++++
 .../v0.7.8-evidence/release-plan-version.json      |    8 +
 docs/releases/v0.7.8.md                            | 1691 +++++
 packages/agentplane/package.json                   |    6 +-
 .../run-cli.core.help-snap.test.ts.snap            |    5 +-
 .../agentplane/src/cli/route-decision.testkit.ts   |  223 +-
 .../cli/run-cli.core.branch-meta.readiness.test.ts |   17 +-
 .../src/cli/run-cli.core.command-session.test.ts   |    5 +-
 .../src/cli/run-cli.core.incidents.test.ts         |   12 +
 .../src/cli/run-cli.core.installed-smoke.test.ts   |   16 +
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts |    6 +
 ...-cli.core.lifecycle.finish-close-commit.test.ts |    6 +
 ...un-cli.core.lifecycle.finish-validation.test.ts |    6 +
 .../src/cli/run-cli.core.lifecycle.verify.test.ts  |    9 +
 .../run-cli.core.pr-conflict-publication.test.ts   |    2 +
 ...run-cli.core.pr-flow.integrate-failures.test.ts |   44 +-
 ...-cli.core.pr-flow.integrate-rebase-race.test.ts |    9 +-
 ...n-cli.core.pr-flow.integrate-strategies.test.ts |    7 +-
 .../src/cli/run-cli.core.pr-flow.status.test.ts    |    7 +-
 .../src/cli/run-cli.core.pr-flow.test.ts           |   27 +-
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |    3 +-
 .../run-cli.core.release-tasks-reconcile.test.ts   |   31 +-
 .../cli/run-cli.core.route-decision.batch.test.ts  |   64 +-
 ...cli.core.route-decision.direct-closeout.test.ts |   43 +-
 .../run-cli.core.route-decision.pre-merge.test.ts  |   79 +-
 .../src/cli/run-cli.core.route-decision.test.ts    |   46 +-
 ...un-cli.core.task-advance.blocked-result.test.ts |    6 +-
 ...li.core.task-advance.evaluator-recovery.test.ts |   13 +
 ...n-cli.core.task-advance.evidence-rework.test.ts |   50 +-
 .../src/cli/run-cli.core.task-advance.test.ts      |    8 +-
 ...i.core.task-advance.worktree-resolution.test.ts |   50 +-
 ...run-cli.core.task-create-planner-intent.test.ts |   19 +-
 .../src/cli/run-cli.core.task-guided.test.ts       |    3 +
 .../cli/run-cli.core.task-next-action-json.test.ts |   17 +-
 .../src/cli/run-cli.core.task-run.test.ts          |    6 +-
 .../cli/run-cli.core.tasks.verify-matrix.test.ts   |    2 +
 .../cli/task-advance-effect-recovery.testkit.ts    |   41 +-
 .../agentplane/src/cli/task-continuity.testkit.ts  |   88 +-
 .../commands/branch/work-resume-planning-base.ts   |    4 +-
 .../commands/branch/work-start.materialize.test.ts |   46 +-
 .../src/commands/branch/work-start.materialize.ts  |   10 +-
 .../src/commands/shared/route-decision-blockers.ts |    6 +-
 .../src/runtime/task-execution-context/resolve.ts  |   10 +-
 packages/core/package.json                         |    2 +-
 packages/recipes/package.json                      |    2 +-
 packages/recipes/src/index.ts                      |    2 +-
 packages/spec/examples/acr.json                    |    4 +-
 packages/testkit/package.json                      |    2 +-
 .../src/cli-core-tasks-query.expected-run.ts       |   28 +-
 packages/testkit/src/cli-harness.ts                |  140 +-
 packages/testkit/src/release.ts                    |   55 +-
 .../baselines/v0.7-compatibility-candidate.json    |    6 +-
 .../docs/releases/v0.7.8-evidence/preparation.png  |  Bin 0 -> 55103 bytes
 website/static/img/social/docs/releases/v0.7.8.png |  Bin 0 -> 52552 bytes
 website/static/img/social/manifest.json            |   16 +
 73 files changed, 9847 insertions(+), 638 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
