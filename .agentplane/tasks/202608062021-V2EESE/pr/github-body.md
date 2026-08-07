Task: `202608062021-V2EESE`
Title: Project semantic-only provider prompts and reject process choreography
Canonical task record: `.agentplane/tasks/202608062021-V2EESE/README.md`

## Summary

Project semantic-only provider prompts and reject process choreography

Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.

## Scope

- In scope: Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.
- Out of scope: unrelated refactors not required for "Project semantic-only provider prompts and reject process choreography".

## Verification

- State: ok
- Note: Prompt guard extraction passes declared verification and the hosted hotspot contract locally.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T21:11:14.161Z
- Branch: task/202608062021-V2EESE/project-semantic-only-provider-prompts-and-rejec
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-run.test.ts          |   9 +-
 .../src/runner/context/base-prompt-sources.ts      |  17 +-
 .../src/runner/context/base-prompts.test.ts        | 189 +++++++++++++
 .../agentplane/src/runner/context/base-prompts.ts  |   5 +
 .../src/runner/context/prompt-block-shared.ts      |   5 +
 .../src/runner/context/prompt-module-bridge.ts     |   4 +
 .../runner/context/semantic-prompt-projection.ts   | 304 +++++++++++++++++++++
 .../src/runner/state-fingerprint-observation.ts    |   3 +-
 .../agentplane/src/runner/state-fingerprint.ts     |   3 +-
 packages/agentplane/src/runner/types/prompts.ts    |   3 +
 .../src/runner/usecases/agent-work-order-build.ts  |   5 +-
 .../src/runner/usecases/agent-work-order.ts        |  12 +
 .../src/runner/usecases/task-run-blueprint.test.ts |  50 ++--
 .../task-run-bootstrap.result-examples.test.ts     |  20 +-
 .../src/runner/usecases/task-run-bootstrap.ts      | 180 ++++++------
 .../usecases/task-run-context.integration.test.ts  | 127 ++++++++-
 .../runner/usecases/task-run-semantic-prompt.ts    |  42 +++
 .../agentplane/src/runner/usecases/task-run.ts     |  10 +-
 18 files changed, 854 insertions(+), 134 deletions(-)
```

</details>
