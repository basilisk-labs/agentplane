Task: `202608021231-PZGG3V`
Title: Unify the v0.7.1 task supervisor and external advance protocol
Canonical task record: `.agentplane/tasks/202608021231-PZGG3V/README.md`

## Summary

Unify the v0.7.1 task supervisor and external advance protocol

Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.

## Scope

- In scope: Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.
- Out of scope: unrelated refactors not required for "Unify the v0.7.1 task supervisor and external advance protocol".

## Verification

- State: ok
- Note:

```text
Fresh exact-SHA deterministic verification with frozen command-level and scenario-level evidence for
b16798c4824c9e7249bf0d27a5a89e74544513fb.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T13:21:11.365Z
- Branch: task/202608021231-PZGG3V/unify-the-v0-7-1-task-supervisor-and-external-ad
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 README.md                                          |   7 +-
 docs/user/agent-bootstrap.generated.mdx            |  30 +-
 docs/user/cli-reference.generated.mdx              | 155 +++----
 docs/user/commands.mdx                             |  11 +-
 docs/user/task-lifecycle.mdx                       |  31 +-
 docs/user/workflow.mdx                             |  15 +-
 .../run-cli.core.help-snap.test.ts.snap            |   5 +-
 packages/agentplane/src/cli/bootstrap-guide.ts     |  30 +-
 packages/agentplane/src/cli/command-guide.test.ts  |  20 +-
 packages/agentplane/src/cli/command-guide.ts       |  23 +-
 packages/agentplane/src/cli/command-invocations.ts |   2 +
 .../run-cli.core.direct-task-supervision.test.ts   |  23 +
 .../src/cli/run-cli.core.docs-cli.test.ts          |   5 +-
 .../src/cli/run-cli.core.task-advance.test.ts      | 474 +++++++++++++++++++++
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 +-
 .../src/cli/run-cli/command-catalog.test.ts        |  14 +-
 .../src/cli/run-cli/command-catalog/task.ts        |  14 +-
 .../src/cli/run-cli/command-loaders/task.ts        |  12 +
 .../src/commands/intake/intake.command.ts          |   2 +-
 .../src/commands/task/advance.command.ts           | 178 ++++++++
 .../src/commands/task/agent-action-packet.test.ts  | 234 ++++++++++
 .../src/commands/task/agent-action-packet.ts       | 252 +++++++++++
 .../commands/task/branch-task-supervisor.test.ts   | 107 +++++
 .../src/commands/task/branch-task-supervisor.ts    |  14 +-
 .../commands/task/direct-task-supervisor-result.ts |   8 +-
 .../src/commands/task/direct-task-supervisor.ts    |   6 +-
 .../agentplane/src/commands/task/task.command.ts   |  19 +-
 .../baselines/v0.7-compatibility-candidate.json    | 228 ++++++++--
 scripts/checks/check-agent-onboarding-scenario.mjs |   4 +-
 .../check-compatibility-contract-baseline.mjs      |  75 +++-
 scripts/lib/test-route-registry.mjs                |   2 +
 31 files changed, 1782 insertions(+), 229 deletions(-)
```

</details>
