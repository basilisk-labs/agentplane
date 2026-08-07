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
- Note:

```text
Verified: blueprint snapshot refreshed after explicit repair-authority tag; implementation and
checks are unchanged.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T21:11:14.161Z
- Branch: task/202608062021-V2EESE/project-semantic-only-provider-prompts-and-rejec
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-run.test.ts          |   3 +-
 .../src/runner/context/base-prompt-sources.ts      |  17 +-
 .../src/runner/context/base-prompts.test.ts        | 179 ++++++++++++
 .../agentplane/src/runner/context/base-prompts.ts  |   5 +
 .../src/runner/context/prompt-block-shared.ts      |   5 +
 .../src/runner/context/prompt-module-bridge.ts     |   4 +
 .../runner/context/semantic-prompt-projection.ts   | 299 +++++++++++++++++++++
 .../src/runner/state-fingerprint-observation.ts    |   3 +-
 .../agentplane/src/runner/state-fingerprint.ts     |   3 +-
 packages/agentplane/src/runner/types/prompts.ts    |   3 +
 .../src/runner/usecases/agent-work-order-build.ts  |   5 +-
 .../src/runner/usecases/agent-work-order.ts        |  12 +
 .../src/runner/usecases/task-run-blueprint.test.ts |  35 +--
 .../task-run-bootstrap.result-examples.test.ts     |   2 +-
 .../src/runner/usecases/task-run-bootstrap.ts      | 139 +++++++---
 .../usecases/task-run-context.integration.test.ts  |  95 ++++++-
 .../agentplane/src/runner/usecases/task-run.ts     |  40 ++-
 17 files changed, 772 insertions(+), 77 deletions(-)
```

</details>
