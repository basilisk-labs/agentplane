# PR Review

Created: 2026-08-18T14:05:34.593Z

## Task

- Task: `202608181404-CR1F9W`
- Title: Add v0.7.7 release social assets and a controlled evaluator rework scope-extension boundary
- Status: DONE
- Branch: `task/202608181404-CR1F9W/add-v0-7-7-release-social-assets-and-a-controlle`
- Canonical task record: `.agentplane/tasks/202608181404-CR1F9W/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-18T14:25:38.391Z
- Branch: task/202608181404-CR1F9W/add-v0-7-7-release-social-assets-and-a-controlle
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/releases/v0.7.7.md                            |  38 +++
 ...un-cli.core.task-advance.blocked-result.test.ts | 151 +++++++++++-
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/cli/run-cli/command-catalog/task.ts        |   8 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/commands/shared/side-effect-authority.ts   |   7 +
 .../shared/task-scope-extension-request.ts         | 231 ++++++++++++++++++
 .../commands/shared/workflow-operation-effects.ts  |   1 +
 .../commands/shared/workflow-operation-prefix.ts   |   1 +
 .../workflow-operation-projection.registry.test.ts |  30 ++-
 .../shared/workflow-operation-projection.ts        |  17 ++
 .../commands/shared/workflow-step-branch-state.ts  |  18 ++
 .../src/commands/shared/workflow-step.ts           |  22 ++
 .../task/branch-task-supervisor-operations.ts      |  19 ++
 .../src/commands/task/configured-authority.test.ts |   6 +
 .../src/commands/task/configured-authority.ts      |   1 +
 .../commands/task/external-agent-blocked-result.ts |  64 ++++-
 .../external-agent-implementation-authority.ts     |   1 +
 .../src/commands/task/scope-extend.command.ts      | 126 ++++++++++
 .../src/commands/task/scope-extend.test.ts         | 202 ++++++++++++++++
 .../agentplane/src/commands/task/scope-extend.ts   | 260 +++++++++++++++++++++
 packages/core/src/index.ts                         |   1 +
 .../core/src/runner/agent-semantic-result.test.ts  |  14 ++
 packages/core/src/runner/agent-semantic-result.ts  |  57 ++++-
 packages/core/src/schemas/index.ts                 |   1 +
 schemas/agent-semantic-result.schema.json          | 258 ++++++++++++++++++++
 .../agent-semantic-result-v2.blocked.valid.json    |   8 +-
 .../baselines/v0.7-compatibility-candidate.json    | 147 +++++++++++-
 .../check-compatibility-contract-baseline.mjs      | 103 ++++++++
 website/static/img/social/docs/releases/v0.7.7.png | Bin 0 -> 52375 bytes
 website/static/img/social/manifest.json            |   8 +
 31 files changed, 1777 insertions(+), 34 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
