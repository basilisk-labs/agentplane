Task: `202607221850-R7WS01`
Title: Return typed runner lifecycle results
Canonical task record: `.agentplane/tasks/202607221850-R7WS01/README.md`

## Summary

Return typed runner lifecycle results

RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing.

## Scope

- In scope: typed runner use-case results, adapter ports, error/result union, human/JSON renderers, compatibility snapshots, and supervisor invocation without subprocess/stdout capture.
- Consume the durable effect-resolution contract as typed `effect_in_doubt`, `applied` and `not_applied` states, preserving resolution provenance, authority/evidence identity and claim generation in every in-process result and renderer.
- An unresolved `effect_in_doubt` result is terminally blocked for generic retry, replay, resume and restart paths; only the explicit resolution protocol from task 202607242158-QV09NA may transition it to `applied` or `not_applied`.
- Out of scope: automating the complete direct route, delivered by the next task.

## Verification

- State: ok
- Note:

```text
PASS (dead-code rework): lifecycle-only exports are private; the public typed result and supervisor
operation contract remain unchanged.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T01:56:15.744Z
- Branch: task/202607221850-R7WS01/return-typed-runner-lifecycle-results
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-run.test.ts          |   6 +
 .../src/commands/hermes/hermes-runtime.ts          |  19 ++-
 .../src/commands/hermes/hermes.command.test.ts     | 100 +++++++++++-
 .../src/commands/shared/workflow-supervisor.ts     |   8 +
 .../src/commands/task/run-render.test.ts           | 138 +++++++++++++++++
 .../agentplane/src/commands/task/run-render.ts     |  91 ++++++++++-
 .../agentplane/src/commands/task/run.command.ts    |  41 ++---
 .../task/task-run-effect-resolution.command.ts     |  28 ++--
 .../src/runner/usecases/task-run-effect-journal.ts |  34 +++-
 .../src/runner/usecases/task-run-execution.ts      |  36 +++++
 .../runner/usecases/task-run-lifecycle-replay.ts   |  18 ++-
 .../runner/usecases/task-run-lifecycle-result.ts   | 171 +++++++++++++++++++++
 .../runner/usecases/task-run-lifecycle-shared.ts   |   3 +
 .../agentplane/src/runner/usecases/task-run.ts     |  44 ++----
 14 files changed, 642 insertions(+), 95 deletions(-)
```

</details>
