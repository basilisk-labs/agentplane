# PR Review

Created: 2026-07-26T00:55:55.843Z

## Task

- Task: `202607260007-DQM6AW`
- Title: Prepare semantic conflict rework routes
- Status: DONE
- Branch: `task/202607260007-DQM6AW/prepare-semantic-conflict-rework-routes`
- Canonical task record: `.agentplane/tasks/202607260007-DQM6AW/README.md`

## Verification

- State: ok
- Note: Corrective hotspot split is verified locally after rework.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T02:29:18.327Z
- Branch: task/202607260007-DQM6AW/prepare-semantic-conflict-rework-routes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |   1 +
 docs/user/cli-reference.generated.mdx              |  24 +
 packages/agentplane/assets/policy/incidents.md     |   1 +
 .../cli/run-cli.core.pr-conflict-rework.test.ts    | 506 +++++++++++++++++++
 ...n-cli.core.pr-flow.integrate-validation.test.ts |   2 +
 .../run-cli.core.route-decision.pre-merge.test.ts  |   4 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/cli/run-cli/command-catalog/project.ts     |   3 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../src/commands/pr/branch-publication.test.ts     |  19 +-
 .../src/commands/pr/conflict-rework.command.ts     | 109 ++++
 .../src/commands/pr/conflict-rework.test.ts        | 492 ++++++++++++++++++
 .../agentplane/src/commands/pr/conflict-rework.ts  | 552 +++++++++++++++++++++
 packages/agentplane/src/commands/pr/flow-status.ts |  26 +
 .../pr/integrate/cmd.protected-base.test.ts        | 419 ++++++++++++++++
 .../src/commands/pr/integrate/cmd.test.ts          | 154 +-----
 .../pr/integrate/internal/github-protection.ts     |  35 +-
 .../integrate/internal/protected-base-handoff.ts   |  26 +-
 .../src/commands/pr/internal/sync-github.test.ts   | 146 +++++-
 .../src/commands/pr/internal/sync-github.ts        | 161 ++++--
 packages/agentplane/src/commands/pr/pr.command.ts  |  16 +
 packages/agentplane/src/commands/pr/pr.spec.ts     |  58 ++-
 .../route-decision-blockers.quality-review.test.ts |  64 ++-
 .../src/commands/shared/route-decision-blockers.ts |  54 ++
 .../shared/route-decision-source-confidence.ts     |  29 ++
 .../src/commands/shared/route-decision-types.ts    |   2 +
 .../src/commands/shared/route-decision.ts          |  51 +-
 .../agentplane/src/commands/shared/route-oracle.ts |   2 +
 .../agentplane/src/commands/shared/task-handoff.ts |   1 +
 .../src/commands/shared/workflow-step-branch.ts    |  16 +-
 .../src/commands/shared/workflow-step-factory.ts   |  61 +++
 ...rkflow-step-projections.conflict-rework.test.ts | 535 ++++++++++++++++++++
 .../commands/shared/workflow-step-projections.ts   |  10 +-
 .../src/commands/shared/workflow-step.ts           |   2 +
 .../src/commands/task/next-action.command.ts       |  22 +
 packages/core/schemas/task-handoff.schema.json     |  11 +
 .../core/src/tasks/task-artifact-schema.handoff.ts |   1 +
 packages/spec/schemas/task-handoff.schema.json     |  11 +
 packages/testkit/src/github-pr.ts                  |  11 +-
 schemas/task-handoff.schema.json                   |  11 +
 .../baselines/v0.7-compatibility-candidate.json    |  78 ++-
 .../check-compatibility-contract-baseline.mjs      |  52 +-
 42 files changed, 3544 insertions(+), 245 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
