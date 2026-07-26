# PR Review

Created: 2026-07-26T10:53:22.624Z

## Task

- Task: `202607221848-VC4VVS`
- Title: Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2
- Status: DOING
- Branch: `task/202607221848-VC4VVS/unify-brief-next-action-runner-and-hermes-on-age`
- Canonical task record: `.agentplane/tasks/202607221848-VC4VVS/README.md`

## Verification

- State: ok
- Note: Rework at cd59e4d7 adds the approved AgentWorkOrder v2 production paths and passes declared checks.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T10:55:35.062Z
- Branch: task/202607221848-VC4VVS/unify-brief-next-action-runner-and-hermes-on-age
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/hermes/hermes-runtime.ts          |  33 +-
 .../agentplane/src/commands/task/brief-model.ts    | 129 +++----
 .../agentplane/src/commands/task/brief-render.ts   |   6 +-
 .../src/commands/task/next-action.command.ts       |  25 +-
 .../src/runner/adapters/codex-preparation.ts       |   3 +-
 .../src/runner/adapters/custom-preparation.ts      |   3 +-
 .../agentplane/src/runner/context/base-prompts.ts  |   1 +
 .../src/runner/context/prompt-module-bridge.ts     |  34 +-
 .../src/runner/state-fingerprint-authority.ts      |  43 +--
 .../src/runner/state-fingerprint-observation.ts    |   4 +-
 packages/agentplane/src/runner/types/context.ts    |  10 +-
 .../src/runner/usecases/agent-work-order-build.ts  | 382 +++++++++++++++++++++
 .../runner/usecases/agent-work-order-projection.ts | 183 ++++++++++
 .../usecases/agent-work-order.integration.test.ts  | 300 ++++++++++++++++
 .../src/runner/usecases/agent-work-order.ts        | 312 +++++++++++++++++
 .../src/runner/usecases/task-run-bootstrap.ts      |  72 +---
 .../usecases/task-run-context.integration.test.ts  |  24 +-
 .../agentplane/src/runner/usecases/task-run.ts     |  76 ++--
 scripts/baselines/trust-boundary-violations.json   |  36 --
 19 files changed, 1421 insertions(+), 255 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
