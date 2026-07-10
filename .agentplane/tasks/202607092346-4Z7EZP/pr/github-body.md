Task: `202607092346-4Z7EZP`
Title: Make AgentPlane loops executable, resumable, and token-aware
Canonical task record: `.agentplane/tasks/202607092346-4Z7EZP/README.md`

## Summary

Make AgentPlane loops executable, resumable, and token-aware

Implement an end-to-end deterministic loop engine on agentplane-loops without touching main: typed transitions, durable checkpoints and resume, step-specific prompt/context propagation, enforced eligibility/permissions/budgets, token accounting, focused checks/evaluator decisions, CLI/docs/schema alignment, and regression tests.

## Scope

Implement only on the agentplane-loops branch family. Do not switch, merge, push, or integrate into main. Approved implementation paths: packages/agentplane/src/loops/**; packages/agentplane/src/commands/loop/**; packages/agentplane/src/runner/types/**; packages/agentplane/src/runner/usecases/task-run*.ts; packages/agentplane/src/harness/token-accounting*; schemas and packages/{spec,core}/schemas/loop-spec.schema.json; docs/{reference,developer}/loops.mdx; generated CLI reference when required; task-local artifacts. Deliver one end-to-end executable tdd.fix vertical slice with durable state, enforced gates and budgets, compact step context, deterministic verification, and resumable execution. Other built-in loops may remain experimental but must fail closed when unsupported.

## Verification

- State: ok
- Note:

```text
Focused loop tests (34/34), typecheck, docs CLI parity, routing, targeted lint/format, schema hash
parity, and git diff checks pass; repository-wide schema/format failures are pre-existing and
outside this task scope.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T00:18:10.108Z
- Branch: task/202607092346-4Z7EZP/make-agentplane-loops-executable-resumable-and-t
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/loops.mdx                           |  49 +-
 docs/reference/loops.mdx                           |  48 +-
 docs/user/cli-reference.generated.mdx              |  12 +-
 .../src/commands/loop/loop.command.test.ts         |  24 +-
 .../agentplane/src/commands/loop/loop.command.ts   | 468 ++++++++++++++---
 .../agentplane/src/commands/loop/loop.specs.ts     |  68 ++-
 packages/agentplane/src/loops/builtins.ts          |  10 +-
 packages/agentplane/src/loops/conditions.ts        |  58 +++
 packages/agentplane/src/loops/engine.test.ts       | 266 ++++++++++
 packages/agentplane/src/loops/engine.ts            | 573 +++++++++++++++++++++
 packages/agentplane/src/loops/index.ts             |   2 +
 packages/agentplane/src/loops/model.ts             |  69 ++-
 packages/agentplane/src/loops/selection.test.ts    |  47 ++
 packages/agentplane/src/loops/selection.ts         |  17 +-
 packages/agentplane/src/loops/validate.test.ts     |  34 +-
 packages/agentplane/src/loops/validate.ts          |  61 ++-
 packages/agentplane/src/runner/types/target.ts     |   5 +
 .../src/runner/usecases/task-run-blueprint.test.ts |   8 +
 .../src/runner/usecases/task-run-bootstrap.ts      |   9 +
 .../agentplane/src/runner/usecases/task-run.ts     |  57 +-
 packages/core/schemas/loop-spec.schema.json        |  41 +-
 packages/spec/schemas/loop-spec.schema.json        |  41 +-
 schemas/loop-spec.schema.json                      |  41 +-
 23 files changed, 1884 insertions(+), 124 deletions(-)
```

</details>
