# PR Review

Created: 2026-07-26T10:53:22.624Z

## Task

- Task: `202607221848-VC4VVS`
- Title: Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2
- Status: DOING
- Branch: `task/202607221848-VC4VVS/unify-brief-next-action-runner-and-hermes-on-age`
- Canonical task record: `.agentplane/tasks/202607221848-VC4VVS/README.md`

## Verification

- State: needs_rework
- Note: Hosted Core CI run 30208318242 failed verify-static (Knip new unused VC4 exports/types and stale PromptModuleDiagnostic); PR verification consequently failed. Rework required before publication.
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
 docs/user/cli-reference.generated.mdx              |   1 +
 .../src/cli/run-cli.core.task-run.test.ts          |   1 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/commands/hermes/hermes-runtime.ts          |  35 +-
 .../agentplane/src/commands/hermes/hermes-specs.ts |   8 +
 .../src/commands/hermes/hermes.command.ts          |   4 +-
 .../agentplane/src/commands/task/brief-model.ts    | 129 +++---
 .../agentplane/src/commands/task/brief-render.ts   |   6 +-
 .../src/commands/task/next-action.command.ts       |  25 +-
 .../agentplane/src/commands/task/run.command.ts    |  10 +
 .../src/runner/adapters/codex-preparation.ts       |   3 +-
 .../src/runner/adapters/custom-preparation.ts      |   3 +-
 .../src/runner/adapters/custom-work-order.test.ts  |  76 ++++
 .../src/runner/adapters/execute-supervised.ts      |  12 +-
 .../agentplane/src/runner/context/base-prompts.ts  |   1 +
 .../src/runner/context/prompt-module-bridge.ts     |  34 +-
 .../src/runner/result-manifest-artifacts.ts        |   6 +-
 .../agentplane/src/runner/result-manifest.test.ts  |  42 ++
 packages/agentplane/src/runner/result-manifest.ts  |  29 +-
 .../src/runner/state-fingerprint-authority.test.ts |  34 ++
 .../src/runner/state-fingerprint-authority.ts      |  58 ++-
 .../src/runner/state-fingerprint-observation.ts    |   4 +-
 packages/agentplane/src/runner/types/context.ts    |  10 +-
 .../src/runner/usecases/agent-work-order-build.ts  | 382 ++++++++++++++++++
 .../runner/usecases/agent-work-order-projection.ts | 181 +++++++++
 .../usecases/agent-work-order.integration.test.ts  | 436 +++++++++++++++++++++
 .../src/runner/usecases/agent-work-order.ts        | 330 ++++++++++++++++
 .../usecases/scenario-materialize-task.test.ts     |  40 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |  72 +---
 .../usecases/task-run-context.integration.test.ts  |  24 +-
 .../src/runner/usecases/task-run-work-order.ts     |  24 ++
 .../agentplane/src/runner/usecases/task-run.ts     |  68 ++--
 scripts/baselines/trust-boundary-violations.json   |  36 --
 .../baselines/v0.7-compatibility-candidate.json    |  38 +-
 .../check-compatibility-contract-baseline.mjs      |  28 ++
 35 files changed, 1927 insertions(+), 270 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
