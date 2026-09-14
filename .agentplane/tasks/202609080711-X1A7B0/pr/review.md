# PR Review

Created: 2026-09-08T07:39:38.454Z

## Task

- Task: `202609080711-X1A7B0`
- Title: Remove ap task run from standard route recommendations and release AgentPlane v0.6.28
- Status: DOING
- Branch: `task/202609080711-X1A7B0/remove-ap-task-run-from-standard-route-recommend`
- Canonical task record: `.agentplane/tasks/202609080711-X1A7B0/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-14T11:53:41.404Z
- Branch: task/202609080711-X1A7B0/remove-ap-task-run-from-standard-route-recommend
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |   5 +-
 .agentplane/tasks/202607300757-JBHKDW/README.md    | 311 +++++++
 .../blueprint/resolved-snapshot.json               | 579 +++++++++++++
 .../tasks/202607300757-JBHKDW/pr/diffstat.txt      |  19 +
 .../tasks/202607300757-JBHKDW/pr/github-body.md    |  41 +
 .../tasks/202607300757-JBHKDW/pr/github-title.txt  |   1 +
 .agentplane/tasks/202607300757-JBHKDW/pr/meta.json |  29 +
 .agentplane/tasks/202607300757-JBHKDW/pr/review.md |  39 +
 .../tasks/202607300757-JBHKDW/pr/verify.log        |  32 +
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  24 +
 .../evaluator-opinion.md                           |  19 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  21 +
 .../evaluator-opinion.md                           |  19 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  21 +
 .../evaluator-opinion.md                           |  18 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  20 +
 .agentplane/tasks/202607301059-SWF2VC/README.md    | 451 ++++++++++
 .../blueprint/resolved-snapshot.json               | 494 +++++++++++
 .../tasks/202607301059-SWF2VC/pr/diffstat.txt      |  50 ++
 .../tasks/202607301059-SWF2VC/pr/github-body.md    |  70 ++
 .../tasks/202607301059-SWF2VC/pr/github-title.txt  |   1 +
 .agentplane/tasks/202607301059-SWF2VC/pr/meta.json |  29 +
 .agentplane/tasks/202607301059-SWF2VC/pr/review.md |  66 ++
 .../tasks/202607301059-SWF2VC/pr/verify.log        | 625 ++++++++++++++
 .../evaluator-opinion.md                           |  24 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  26 +
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  24 +
 .../evaluator-opinion.md                           |  18 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  20 +
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  24 +
 .agentplane/tasks/202607311055-ST7XZY/README.md    | 732 ++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 456 ++++++++++
 .../tasks/202607311055-ST7XZY/pr/diffstat.txt      |  33 +
 .../tasks/202607311055-ST7XZY/pr/github-body.md    |  46 +
 .../tasks/202607311055-ST7XZY/pr/github-title.txt  |   1 +
 .agentplane/tasks/202607311055-ST7XZY/pr/meta.json |  29 +
 .agentplane/tasks/202607311055-ST7XZY/pr/review.md |  49 ++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  23 +
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  22 +
 .../evaluator-opinion.md                           |  23 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  25 +
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  24 +
 .agentplane/tasks/202607311143-YT435C/README.md    | 938 +++++++++++++++++++++
 .../blueprint/resolved-snapshot.json               | 494 +++++++++++
 .../tasks/202607311143-YT435C/pr/diffstat.txt      |   3 +
 .../tasks/202607311143-YT435C/pr/github-body.md    |  40 +
 .../tasks/202607311143-YT435C/pr/github-title.txt  |   1 +
 .agentplane/tasks/202607311143-YT435C/pr/meta.json |  24 +
 .agentplane/tasks/202607311143-YT435C/pr/review.md |  38 +
 .../tasks/202607311143-YT435C/pr/verify.log        | 634 ++++++++++++++
 .../evaluator-opinion.md                           |  25 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  27 +
 .../evaluator-opinion.md                           |  23 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  25 +
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  24 +
 .../evaluator-opinion.md                           |  22 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  30 +
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  29 +
 .agentplane/tasks/202607311456-B67DP1/README.md    | 227 +++++
 .../blueprint/resolved-snapshot.json               | 454 ++++++++++
 .../tasks/202607311456-B67DP1/pr/diffstat.txt      |  13 +
 .../tasks/202607311456-B67DP1/pr/github-body.md    |  35 +
 .../tasks/202607311456-B67DP1/pr/github-title.txt  |   1 +
 .agentplane/tasks/202607311456-B67DP1/pr/meta.json |  29 +
 .agentplane/tasks/202607311456-B67DP1/pr/review.md |  38 +
 .../tasks/202607311456-B67DP1/pr/verify.log        |  22 +
 .../evaluator-opinion.md                           |  19 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  21 +
 .agentplane/tasks/202607311529-773BXT/README.md    | 227 +++++
 .../blueprint/resolved-snapshot.json               | 454 ++++++++++
 .../tasks/202607311529-773BXT/pr/diffstat.txt      |  13 +
 .../tasks/202607311529-773BXT/pr/github-body.md    |  35 +
 .../tasks/202607311529-773BXT/pr/github-title.txt  |   1 +
 .agentplane/tasks/202607311529-773BXT/pr/meta.json |  29 +
 .agentplane/tasks/202607311529-773BXT/pr/review.md |  38 +
 .../tasks/202607311529-773BXT/pr/verify.log        |  22 +
 .../evaluator-opinion.md                           |  19 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  21 +
 .agentplane/tasks/202608250040-QY7SRW/README.md    | 330 ++++++++
 .../blueprint/resolved-snapshot.json               | 454 ++++++++++
 .../evaluator-opinion.md                           |  21 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  25 +
 .../evaluator-opinion.md                           |  20 +
 .../evaluator-prompt.md                            |  74 ++
 .../quality-report.json                            |  24 +
 .agentplane/workflows/last-known-good.md           |   5 +-
 bun.lock                                           |  12 +-
 docs/assets/header.svg                             |   4 +-
 docs/assets/readme-headers/adr.svg                 |   4 +-
 docs/assets/readme-headers/agentplane-cli.svg      |   4 +-
 docs/assets/readme-headers/agentplane.svg          |   4 +-
 docs/assets/readme-headers/core.svg                |   4 +-
 docs/assets/readme-headers/docs.svg                |   4 +-
 docs/assets/readme-headers/humanizer.svg           |   4 +-
 docs/assets/readme-headers/recipes.svg             |   4 +-
 docs/assets/readme-headers/releases.svg            |   4 +-
 docs/assets/readme-headers/schemas.svg             |   4 +-
 docs/assets/readme-headers/scripts.svg             |   4 +-
 docs/assets/readme-headers/skills.svg              |   4 +-
 docs/assets/readme-headers/spec.svg                |   4 +-
 docs/assets/readme-headers/testkit.svg             |   4 +-
 docs/reference/generated-reference.mdx             |   6 +-
 docs/releases/v0.6.25.md                           |  41 +
 docs/releases/v0.6.26.md                           |  47 ++
 docs/releases/v0.6.27.md                           |  32 +
 docs/releases/v0.6.28.md                           |  38 +
 packages/agentplane/package.json                   |   6 +-
 ...cli.core.route-decision.direct-closeout.test.ts | 289 ++++++-
 .../run-cli.core.route-decision.quality.test.ts    | 103 +++
 .../src/cli/run-cli.core.route-decision.test.ts    |   7 +-
 .../run-cli.core.route-decision.work-start.test.ts | 140 +++
 .../src/cli/run-cli.core.task-guided.test.ts       |   2 +-
 .../src/cli/run-cli.core.task-handoff.test.ts      |  17 +-
 packages/agentplane/src/commands/branch/remove.ts  |   2 +
 .../src/commands/branch/work-start.materialize.ts  |  10 +-
 .../pr/integrate/internal/finalize.test.ts         |   1 +
 .../src/commands/pr/integrate/internal/finalize.ts |   2 +-
 .../agentplane/src/commands/pr/integrate/verify.ts |   9 +
 .../commands/shared/merged-branch-cleanup.test.ts  |  39 +
 .../src/commands/shared/merged-branch-cleanup.ts   |  51 +-
 .../agentplane/src/commands/shared/pr-meta.test.ts | 113 ++-
 .../src/commands/shared/pr-meta/verify-log.ts      | 154 +++-
 .../src/commands/shared/route-decision-blockers.ts |  45 +-
 .../commands/shared/route-decision-next-action.ts  |  84 +-
 .../src/commands/shared/route-decision-repair.ts   |  10 +-
 .../src/commands/shared/route-execution-packet.ts  |  10 +
 .../src/commands/shared/route-guidance.test.ts     |  58 ++
 .../src/commands/shared/route-guidance.ts          |  22 +-
 .../agentplane/src/commands/shared/route-oracle.ts |  15 +-
 .../src/commands/shared/task-handoff.test.ts       |  36 +
 .../agentplane/src/commands/shared/task-handoff.ts |   2 +-
 .../shared/worktree-install-layout-links.test.ts   |  34 +
 .../shared/worktree-install-layout-links.ts        |  22 +
 .../agentplane/src/commands/task/begin.command.ts  |   2 +-
 .../agentplane/src/commands/task/handoff.shared.ts |  35 +-
 .../agentplane/src/commands/task/task.command.ts   |   4 +-
 .../src/runner/process-supervision/signals.ts      |  10 +-
 packages/core/package.json                         |   2 +-
 packages/recipes/package.json                      |   2 +-
 packages/recipes/src/index.ts                      |   2 +-
 packages/spec/examples/acr.json                    |   4 +-
 packages/testkit/package.json                      |   2 +-
 .../static/img/social/docs/releases/v0.6.25.png    | Bin 0 -> 54765 bytes
 .../static/img/social/docs/releases/v0.6.26.png    | Bin 0 -> 55079 bytes
 .../static/img/social/docs/releases/v0.6.27.png    | Bin 0 -> 54282 bytes
 .../static/img/social/docs/releases/v0.6.28.png    | Bin 0 -> 54193 bytes
 website/static/img/social/manifest.json            |  32 +
 175 files changed, 12726 insertions(+), 165 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
