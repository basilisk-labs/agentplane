Task: `202608171853-X3FD5M`
Title: Harden autonomous authority recovery and Hermes dialog approvals
Canonical task record: `.agentplane/tasks/202608171853-X3FD5M/README.md`

## Summary

Harden autonomous authority recovery and Hermes dialog approvals

Recover the AgentPlane authority release after an unavailable GitHub protection lookup selected a local merge; fail closed on unavailable provider protection, repair supervisor replay/concurrency regressions, and define a verifiable Hermes-to-AgentPlane user approval receipt so the user approves in dialogue while the integration layer executes exact state-bound commands. Preserve mandatory primary plan approval and operator-owned provider merge semantics.

## Scope

- In scope: Recover the AgentPlane authority release after an unavailable GitHub protection lookup selected a local merge; fail closed on unavailable provider protection, repair supervisor replay/concurrency regressions, and define a verifiable Hermes-to-AgentPlane user approval receipt so the user approves in dialogue while the integration layer executes exact state-bound commands. Preserve mandatory primary plan approval and operator-owned provider merge semantics.
- Out of scope: unrelated refactors not required for "Harden autonomous authority recovery and Hermes dialog approvals".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T19:18:18.741Z
- Branch: task/202608171853-X3FD5M/harden-autonomous-authority-recovery-and-hermes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes/hermes-agentplane.mdx                 |  37 +++
 docs/user/cli-reference.generated.mdx              |   5 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 +-
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
 34 files changed, 1693 insertions(+), 117 deletions(-)
```

</details>
