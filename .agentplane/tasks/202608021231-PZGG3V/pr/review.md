# PR Review

Created: 2026-08-02T13:20:44.174Z

## Task

- Task: `202608021231-PZGG3V`
- Title: Unify the v0.7.1 task supervisor and external advance protocol
- Status: DOING
- Branch: `task/202608021231-PZGG3V/unify-the-v0-7-1-task-supervisor-and-external-ad`
- Canonical task record: `.agentplane/tasks/202608021231-PZGG3V/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T13:21:11.365Z
- Branch: task/202608021231-PZGG3V/unify-the-v0-7-1-task-supervisor-and-external-ad
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 README.md                                          |   7 +-
 docs/user/agent-bootstrap.generated.mdx            |  30 ++-
 docs/user/cli-reference.generated.mdx              | 155 ++++++--------
 docs/user/commands.mdx                             |  11 +-
 docs/user/task-lifecycle.mdx                       |  31 ++-
 docs/user/workflow.mdx                             |  15 +-
 .../run-cli.core.help-snap.test.ts.snap            |   5 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |  30 ++-
 packages/agentplane/src/cli/command-guide.test.ts  |  20 +-
 packages/agentplane/src/cli/command-guide.ts       |  23 +--
 packages/agentplane/src/cli/command-invocations.ts |   2 +
 .../src/cli/run-cli.core.docs-cli.test.ts          |   5 +-
 .../src/cli/run-cli.core.task-advance.test.ts      | 229 +++++++++++++++++++++
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 +-
 .../src/cli/run-cli/command-catalog.test.ts        |  14 +-
 .../src/cli/run-cli/command-catalog/task.ts        |  14 +-
 .../src/cli/run-cli/command-loaders/task.ts        |  12 ++
 .../src/commands/intake/intake.command.ts          |   2 +-
 .../src/commands/task/advance.command.ts           | 164 +++++++++++++++
 .../src/commands/task/agent-action-packet.test.ts  | 206 ++++++++++++++++++
 .../src/commands/task/agent-action-packet.ts       | 220 ++++++++++++++++++++
 .../agentplane/src/commands/task/task.command.ts   |  19 +-
 .../baselines/v0.7-compatibility-candidate.json    | 228 ++++++++++++++++----
 scripts/checks/check-agent-onboarding-scenario.mjs |   4 +-
 .../check-compatibility-contract-baseline.mjs      |  75 ++++++-
 scripts/lib/test-route-registry.mjs                |   2 +
 26 files changed, 1311 insertions(+), 223 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
