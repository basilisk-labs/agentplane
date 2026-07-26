Task: `202607221848-VC4VVS`
Title: Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2
Canonical task record: `.agentplane/tasks/202607221848-VC4VVS/README.md`

## Summary

Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2

RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction.

## Scope

- In scope: one in-process work-order builder, typed use-case result, human/JSON compatibility renderers, shared remote policy, prompt compilation, source/test context manifests, and deletion of unsafe casts and duplicate snake/camel aliases from the v2 surface.
- Out of scope: removing the announced v1 compatibility output during its support window.

## Verification

- State: needs_rework
- Note: Generated CLI reference is stale after adding explicit remote options.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T10:55:35.062Z
- Branch: task/202607221848-VC4VVS/unify-brief-next-action-runner-and-hermes-on-age
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-run.test.ts          |   1 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/commands/hermes/hermes-runtime.ts          |  35 +-
 .../agentplane/src/commands/hermes/hermes-specs.ts |   8 +
 .../src/commands/hermes/hermes.command.ts          |   4 +-
 .../agentplane/src/commands/task/brief-model.ts    | 129 +++----
 .../agentplane/src/commands/task/brief-render.ts   |   6 +-
 .../src/commands/task/next-action.command.ts       |  25 +-
 .../agentplane/src/commands/task/run.command.ts    |  10 +
 .../src/runner/adapters/codex-preparation.ts       |   3 +-
 .../src/runner/adapters/custom-preparation.ts      |   3 +-
 .../agentplane/src/runner/context/base-prompts.ts  |   1 +
 .../src/runner/context/prompt-module-bridge.ts     |  34 +-
 .../src/runner/state-fingerprint-authority.ts      |  43 +--
 .../src/runner/state-fingerprint-observation.ts    |   4 +-
 packages/agentplane/src/runner/types/context.ts    |  10 +-
 .../src/runner/usecases/agent-work-order-build.ts  | 382 ++++++++++++++++++++
 .../runner/usecases/agent-work-order-projection.ts | 181 ++++++++++
 .../usecases/agent-work-order.integration.test.ts  | 392 +++++++++++++++++++++
 .../src/runner/usecases/agent-work-order.ts        | 330 +++++++++++++++++
 .../src/runner/usecases/task-run-bootstrap.ts      |  72 +---
 .../usecases/task-run-context.integration.test.ts  |  24 +-
 .../agentplane/src/runner/usecases/task-run.ts     |  79 +++--
 scripts/baselines/trust-boundary-violations.json   |  36 --
 .../baselines/v0.7-compatibility-candidate.json    |  38 +-
 .../check-compatibility-contract-baseline.mjs      |  28 ++
 26 files changed, 1618 insertions(+), 267 deletions(-)
```

</details>
