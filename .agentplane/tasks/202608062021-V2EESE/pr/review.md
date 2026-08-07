# PR Review

Created: 2026-08-06T21:10:34.048Z

## Task

- Task: `202608062021-V2EESE`
- Title: Project semantic-only provider prompts and reject process choreography
- Status: DOING
- Branch: `task/202608062021-V2EESE/project-semantic-only-provider-prompts-and-rejec`
- Canonical task record: `.agentplane/tasks/202608062021-V2EESE/README.md`

## Verification

- State: ok
- Note: Evaluator persistence-path rework is resolved in exact compiled prompts for every semantic role.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T21:11:14.161Z
- Branch: task/202608062021-V2EESE/project-semantic-only-provider-prompts-and-rejec
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-run.test.ts          |   9 +-
 .../evaluator/evaluator-episode.stdin.test.ts      |   9 +-
 .../src/commands/evaluator/evaluator-episode.ts    |  38 ++-
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
 20 files changed, 888 insertions(+), 147 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
