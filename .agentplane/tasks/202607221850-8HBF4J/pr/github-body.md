Task: `202607221850-8HBF4J`
Title: Supervise context assimilation post-processing
Canonical task record: `.agentplane/tasks/202607221850-8HBF4J/README.md`

## Summary

Supervise context assimilation post-processing

RF-11/RF-25b: after the CURATOR semantic result, let the supervisor validate/apply, reindex, build/lint wiki, validate graph, run coverage/checks, evaluate, create ACR, and finalize with resumable mechanical operations.

## Scope

- In scope: typed in-process context use-case results, supervisor operation registry for every mechanical assimilation phase, separate CURATOR rework work orders, retry from failed operation, and removal of lifecycle command lists from CURATOR prompts.
- Out of scope: changing the CURATOR's semantic identity, synthesis, or ambiguity decisions.

## Verification

- State: ok
- Note:

```text
Verified supervisor implementation: invalid semantic SGR blocks mechanics; failed CLI operation
retries without replaying CURATOR; durable completed phase resumes without replay; evaluator rework
creates bounded CURATOR work order. Checks passed: typecheck, focused core/context tests (43),
workflow coverage (52), compatibility contract, format and lint, critical CLI suite, lifecycle
invariants.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T13:53:59.240Z
- Branch: task/202607221850-8HBF4J/supervise-context-assimilation-post-processing
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/cli/run-cli/command-catalog/project.ts     |   2 +
 .../commands/context/assimilation-supervisor.ts    | 601 +++++++++++++++++++++
 .../context/assimilation-supervisor.unit.test.ts   | 279 ++++++++++
 .../src/commands/context/context-runner.ts         |  74 +++
 .../src/commands/context/context.spec.ts           |  45 ++
 .../agentplane/src/context/ingest-run-journal.ts   | 111 +++-
 .../agentplane/src/context/ingest-task-prompt.ts   |  30 +-
 .../agentplane/src/context/ingest-task.test.ts     |  19 +-
 packages/agentplane/src/context/ingest-task.ts     |  29 +-
 .../runner/supervisor-execution-episode.test.ts    |  34 ++
 .../src/runner/supervisor-execution-episode.ts     |  55 ++
 packages/core/src/schemas/index.ts                 |   1 +
 .../baselines/v0.7-compatibility-candidate.json    | 111 +++-
 .../check-compatibility-contract-baseline.mjs      |  67 +++
 15 files changed, 1398 insertions(+), 67 deletions(-)
```

</details>
