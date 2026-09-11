Task: `202609091457-5N53HA`
Title: Publish direct ops quality review fix from upstream main
Canonical task record: `.agentplane/tasks/202609091457-5N53HA/README.md`

## Summary

Publish direct ops quality review fix from upstream main

Recreate the already verified direct ops quality-review patch from commit 75a1b9743288ca2a60ccafd82287df37eb8922bd on a task branch based on upstream main, preserve its tests and documentation, and publish a fork-based PR to basilisk-labs/agentplane. Do not install or deploy the CLI.

## Scope

- In scope: Recreate the already verified direct ops quality-review patch from commit 75a1b9743288ca2a60ccafd82287df37eb8922bd on a task branch based on upstream main, preserve its tests and documentation, and publish a fork-based PR to basilisk-labs/agentplane. Do not install or deploy the CLI.
- Out of scope: unrelated refactors not required for "Publish direct ops quality review fix from upstream main".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-09T15:24:58.152Z
- Branch: task/202609091457-5N53HA/publish-direct-ops-review-fix
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/blueprints.mdx                      |   7 +
 docs/user/cli-reference.generated.mdx              |   3 +
 docs/user/commands.mdx                             |  24 +-
 .../agentplane/src/backends/task-backend.test.ts   |  38 +++
 .../src/backends/task-backend/shared/normalize.ts  |  15 +
 .../src/backends/task-backend/shared/types.ts      |   1 +
 ...n-cli.core.lifecycle.direct-ops-quality.test.ts | 334 ++++++++++++++++++
 .../commands/evaluator/evaluator-artifact-port.ts  |   2 +
 .../evaluator/evaluator-execute-supervisor.ts      |   2 +
 .../evaluator/evaluator-quality-artifacts.ts       |   2 +
 .../commands/evaluator/evaluator-review-apply.ts   |   5 +
 .../commands/evaluator/evaluator-review-usecase.ts | 191 ++++++++++-
 .../evaluator/evaluator-run.command.test.ts        |  52 ++-
 .../src/commands/evaluator/evaluator-work-order.ts |  17 +
 .../src/commands/evaluator/evaluator.command.ts    |   5 +
 .../src/commands/evaluator/evaluator.spec.ts       |  24 ++
 .../src/commands/evidence/ops-evidence-subject.ts  | 238 +++++++++++++
 .../src/commands/task/finish-blueprint-evidence.ts |  61 +++-
 .../task/finish.quality-review-target.unit.test.ts |  42 +++
 .../src/commands/task/quality-review-gate.ts       |  30 +-
 .../commands/task/quality-review-gate.unit.test.ts | 121 +++++++
 .../schemas/task-readme-frontmatter.schema.json    |  34 ++
 packages/core/schemas/tasks-export.schema.json     |  34 ++
 packages/core/src/index.ts                         |   1 +
 packages/core/src/tasks/index.ts                   |   1 +
 .../core/src/tasks/task-artifact-schema.test.ts    |  24 +-
 .../src/tasks/task-artifact-schema.verification.ts |  20 +-
 packages/core/src/tasks/task-readme.ts             |   1 +
 packages/core/src/tasks/task-store.ts              |   4 +
 .../schemas/task-readme-frontmatter.schema.json    |  34 ++
 packages/spec/schemas/tasks-export.schema.json     |  34 ++
 schemas/task-readme-frontmatter.schema.json        |  34 ++
 schemas/tasks-export.schema.json                   |  34 ++
 .../release/check-local-tarball-install-smoke.mjs  | 380 +++++++++++++++++++++
 34 files changed, 1809 insertions(+), 40 deletions(-)
```

</details>
