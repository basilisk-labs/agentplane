# PR Review

Created: 2026-08-17T18:59:25.035Z

## Task

- Task: `202608171853-X3FD5M`
- Title: Harden autonomous authority recovery and Hermes dialog approvals
- Status: DONE
- Branch: `task/202608171853-X3FD5M/harden-autonomous-authority-recovery-and-hermes`
- Canonical task record: `.agentplane/tasks/202608171853-X3FD5M/README.md`

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T19:18:18.741Z
- Branch: task/202608171853-X3FD5M/harden-autonomous-authority-recovery-and-hermes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes/hermes-agentplane.mdx                 |  37 +++
 docs/user/cli-reference.generated.mdx              |   5 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 +-
 .../src/cli/run-cli/command-catalog.test.ts        |  11 +-
 .../command-catalog/task-capability-profiles.ts    |  10 +
 .../src/cli/run-cli/command-catalog/task.ts        |   3 +-
 .../src/cli/run-cli/command-loaders/task.ts        |   3 +-
 .../src/commands/pr/branch-publication.ts          |  23 +-
 .../integrate/internal/github-protection.test.ts   |  58 +++++
 .../pr/integrate/internal/github-protection.ts     |  16 ++
 .../src/commands/shared/declared-check.test.ts     |   1 +
 .../src/commands/shared/declared-check.ts          |   6 +
 .../agentplane/src/commands/shared/pr-meta.test.ts |   4 +-
 .../commands/shared/side-effect-authority.test.ts  |  27 +++
 .../src/commands/shared/side-effect-authority.ts   |  12 +
 .../shared/supervisor-execution-episode.ts         |   7 +-
 .../src/commands/task/agent-action-packet.test.ts  |  74 +++++-
 .../src/commands/task/agent-action-packet.ts       |  79 +++++--
 .../commands/task/authority-grant.command.test.ts  |  51 +++++
 .../src/commands/task/authority-grant.command.ts   |  71 +++++-
 .../task/external-agent-supervisor-episode.ts      |   7 +-
 .../src/commands/task/plan-approve.command.ts      |  76 ++++++-
 packages/agentplane/src/commands/task/plan.ts      |  74 +++---
 .../commands/task/user-approval-receipt.test.ts    | 186 +++++++++++++++
 .../src/commands/task/user-approval-receipt.ts     | 249 +++++++++++++++++++++
 packages/core/schemas/config.schema.json           |  49 +++-
 packages/core/schemas/workflow.schema.json         |  84 +++++++
 packages/core/src/config/config.test.ts            |  35 +++
 packages/core/src/config/schema.impl.ts            |  32 +++
 .../runner/supervisor-execution-episode.test.ts    |  84 +++++++
 .../src/runner/supervisor-execution-episode.ts     |  23 +-
 packages/spec/schemas/config.schema.json           |  49 +++-
 packages/spec/schemas/workflow.schema.json         |  84 +++++++
 schemas/config.schema.json                         |  49 +++-
 schemas/workflow.schema.json                       |  84 +++++++
 .../baselines/v0.7-compatibility-candidate.json    |  72 ++++--
 scripts/bench/capture-compatibility-candidate.mjs  |  35 +++
 .../check-compatibility-contract-baseline.mjs      |  56 ++++-
 .../check-packaged-mixed-scope-lifecycle.mjs       |  78 ++++++-
 39 files changed, 1794 insertions(+), 121 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
