# PR Review

Created: 2026-07-28T03:32:16.784Z

## Task

- Task: `202607242236-1BFWEY`
- Title: Persist bounded supervisor execution episodes
- Status: DOING
- Branch: `task/202607242236-1BFWEY/persist-bounded-supervisor-execution-episodes`
- Canonical task record: `.agentplane/tasks/202607242236-1BFWEY/README.md`

## Verification

- State: ok
- Note: Supervisor episode rework verified locally: persisted EXECUTOR, CURATOR, and EVALUATOR episodes recover fail-closed; private provider usage is budgeted without public-schema drift.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T03:32:40.568Z
- Branch: task/202607242236-1BFWEY/persist-bounded-supervisor-execution-episodes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-episode.calibration.test.ts          |  20 +-
 .../src/commands/evaluator/evaluator-episode.ts    |  44 +-
 .../evaluator/evaluator-execute.command.test.ts    | 253 +++++++++
 .../src/commands/evaluator/evaluator.command.ts    | 365 ++++++++++++-
 .../src/commands/hermes/hermes.command.test.ts     |  42 +-
 .../src/commands/hermes/hermes.command.ts          |  53 +-
 .../shared/supervisor-execution-episode.test.ts    | 405 ++++++++++++++
 .../shared/supervisor-execution-episode.ts         | 362 +++++++++++++
 .../runner/adapters/codex-result-transport.test.ts |  33 ++
 .../src/runner/adapters/codex-result-transport.ts  |  73 ++-
 .../agentplane/src/runner/adapters/codex.test.ts   |  14 +-
 packages/agentplane/src/runner/adapters/codex.ts   |  18 +-
 .../supervisor-execution-episode-migration.ts      |  87 +++
 .../runner/supervisor-execution-episode.test.ts    | 267 +++++++++
 .../src/runner/supervisor-execution-episode.ts     | 594 +++++++++++++++++++++
 packages/core/src/schemas/index.ts                 |  37 ++
 16 files changed, 2606 insertions(+), 61 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
