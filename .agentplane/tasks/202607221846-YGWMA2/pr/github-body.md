Task: `202607221846-YGWMA2`
Title: Remove automatic semantic pass verdicts
Canonical task record: `.agentplane/tasks/202607221846-YGWMA2/README.md`

## Summary

Remove automatic semantic pass verdicts

RF-00: remove preselected evaluator pass outcomes from route control, repair guidance, context task contracts, templates, and fixtures; emit a typed evaluator episode or quality-review stop instead.

## Scope

- In scope: route decision, repair, execution packet, context-ingest task/prompt, quality-review templates, compatibility views, and regression tests for missing or stale review.
- Out of scope: replacing semantic review with lint/test heuristics or implementing the full EVALUATOR episode.

## Verification

- State: needs_rework
- Note:

```text
Hosted gates require rework: finding-free evaluator rework is misrouted as stale, and Ubuntu font
metrics overflow one social title.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T05:19:11.314Z
- Branch: task/202607221846-YGWMA2/remove-automatic-semantic-pass-verdicts
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/agents/EVALUATOR.json                  |   4 +-
 .agentplane/evaluators/recovery-context.md         |   2 +-
 docs/user/agent-bootstrap.generated.mdx            |   2 +-
 docs/user/cli-reference.generated.mdx              |   5 +-
 docs/user/commands.mdx                             |   7 +-
 packages/agentplane/assets/AGENTS.md               |   4 +-
 packages/agentplane/assets/agents/EVALUATOR.json   |   4 +-
 .../assets/evaluators/recovery-context.md          |   2 +-
 .../agentplane/src/backends/task-backend.test.ts   |  37 +++
 .../src/backends/task-backend/shared/normalize.ts  |   5 +
 packages/agentplane/src/blueprints/builtins.ts     |   2 +-
 .../agentplane/src/blueprints/validate.test.ts     |   2 +-
 packages/agentplane/src/cli/cli-smoke.test.ts      |   2 +
 packages/agentplane/src/cli/command-invocations.ts |   2 +-
 .../src/cli/release-critical-lifecycle.test.ts     |   2 +
 .../cli/run-cli.core.branch-meta.readiness.test.ts |   2 +
 ...run-cli.core.lifecycle.finish-branch-pr.test.ts |   2 +
 ...-cli.core.lifecycle.finish-close-commit.test.ts |   2 +
 ...un-cli.core.lifecycle.finish-validation.test.ts |   2 +
 .../cli/run-cli.core.route-decision.batch.test.ts  |   4 +-
 ...cli.core.route-decision.direct-closeout.test.ts |   2 +
 ...li.core.route-decision.pr-open-metadata.test.ts |   2 +
 .../run-cli.core.route-decision.quality.test.ts    | 267 ++++++++++++++++++++-
 .../src/cli/run-cli.core.task-guided.test.ts       |   2 +
 .../src/cli/run-cli.core.tasks.incidents.test.ts   |   2 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |   2 +-
 .../evaluator/evaluator-quality-artifacts.ts       |  15 +-
 .../evaluator/evaluator-run.command.test.ts        |  78 +++++-
 .../src/commands/evaluator/evaluator.command.ts    |  15 +-
 .../src/commands/evaluator/evaluator.spec.ts       |  22 +-
 .../src/commands/shared/route-decision-blockers.ts |  36 ++-
 .../commands/shared/route-decision-next-action.ts  |  17 +-
 .../src/commands/shared/route-decision-repair.ts   |  22 +-
 .../src/commands/shared/route-execution-packet.ts  |  29 ++-
 .../src/commands/shared/route-guidance.ts          |  14 ++
 .../agentplane/src/commands/shared/route-oracle.ts |  12 +-
 .../src/commands/task/evidence-check.command.ts    |  31 ++-
 .../src/commands/task/evidence-check.unit.test.ts  |  59 ++++-
 .../src/commands/task/quality-review-gate.ts       |  36 ++-
 .../commands/task/quality-review-gate.unit.test.ts |  78 +++++-
 packages/agentplane/src/commands/workflow.test.ts  |   1 +
 .../src/commands/workflow.verify-hooks.test.ts     |   1 +
 .../src/context/evaluator-projection.test.ts       |   2 +
 .../agentplane/src/context/evaluator-projection.ts |   2 +
 .../agentplane/src/context/ingest-task-prompt.ts   |   2 +-
 .../agentplane/src/context/ingest-task.test.ts     |   8 +
 packages/agentplane/src/context/ingest-task.ts     |   6 +-
 .../src/shared/builtin-assets.generated.ts         |  10 +-
 .../agentplane/src/workflow-lifecycle/contract.ts  |   4 +-
 .../schemas/task-readme-frontmatter.schema.json    |   4 +
 packages/core/schemas/tasks-export.schema.json     |   4 +
 packages/core/src/index.ts                         |   3 +
 packages/core/src/tasks/index.ts                   |   1 +
 .../core/src/tasks/task-artifact-schema.test.ts    |  41 ++++
 .../src/tasks/task-artifact-schema.verification.ts |   2 +
 packages/core/src/tasks/task-readme.ts             |   1 +
 packages/core/src/tasks/task-store.ts              |   2 +
 .../schemas/task-readme-frontmatter.schema.json    |   4 +
 packages/spec/schemas/tasks-export.schema.json     |   4 +
 schemas/task-readme-frontmatter.schema.json        |   4 +
 schemas/tasks-export.schema.json                   |   4 +
 scripts/baselines/trust-boundary-violations.json   |  36 ---
 .../v0.7-workflow-contract-candidate.json          |  10 +-
 website/scripts/generate-social-images.mjs         |  55 ++++-
 .../docs/archive/v0-3/cli-bug-ledger-v0-3-x.png    | Bin 64869 -> 63041 bytes
 .../archive/v0-3/framework-refactor-program.png    | Bin 67228 -> 67371 bytes
 .../internal/v0.7-agent-efficiency-baseline.png    | Bin 0 -> 64133 bytes
 .../social/docs/internal/v0.7-refactor-plan.png    | Bin 0 -> 57912 bytes
 website/static/img/social/docs/user/website-ia.png | Bin 63166 -> 62132 bytes
 .../img/social/docs/user/workflow-migration.png    | Bin 61355 -> 63204 bytes
 website/static/img/social/manifest.json            |  26 +-
 website/static/llms-full.txt                       |   7 +-
 72 files changed, 931 insertions(+), 148 deletions(-)
```

</details>
