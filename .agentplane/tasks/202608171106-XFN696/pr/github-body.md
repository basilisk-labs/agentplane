Task: `202608171106-XFN696`
Title: Add policy-driven autonomous side-effect authority
Canonical task record: `.agentplane/tasks/202608171106-XFN696/README.md`

## Summary

Add policy-driven autonomous side-effect authority

Implement a repository-configured AgentPlane authority provider with manual, policy allowlist, and explicit all/YOLO modes. Auto-grants must retain operation/state/scope digests, short TTL, durable audit, and a POLICY actor; default behavior remains manual. Fix task authority grant remote/local route drift so stale hosted authority requests return an actionable fresh-route diagnostic instead of incorrectly reporting that no grant is required. Keep model agents unable to impersonate USER and preserve human gates through an explicit deny list.

## Scope

- In scope: Implement a repository-configured AgentPlane authority provider with manual, policy allowlist, and explicit all/YOLO modes. Auto-grants must retain operation/state/scope digests, short TTL, durable audit, and a POLICY actor; default behavior remains manual. Fix task authority grant remote/local route drift so stale hosted authority requests return an actionable fresh-route diagnostic instead of incorrectly reporting that no grant is required. Keep model agents unable to impersonate USER and preserve human gates through an explicit deny list.
- Out of scope: unrelated refactors not required for "Add policy-driven autonomous side-effect authority".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T11:57:53.694Z
- Branch: task/202608171106-XFN696/add-policy-driven-autonomous-side-effect-authori
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes/hermes-agentplane.mdx                 |  30 ++++++
 docs/user/configuration.mdx                        |  48 +++++++++
 .../src/commands/task/advance.command.ts           |  16 +++
 .../commands/task/authority-grant.command.test.ts  |  26 +++++
 .../src/commands/task/authority-grant.command.ts   |  23 ++++-
 .../src/commands/task/branch-task-supervisor.ts    |  26 +++--
 .../src/commands/task/configured-authority.test.ts |  56 +++++++++++
 .../src/commands/task/configured-authority.ts      | 108 +++++++++++++++++++++
 packages/core/schemas/config.schema.json           |  45 +++++++++
 packages/core/schemas/workflow.schema.json         |  76 +++++++++++++++
 packages/core/src/config/config.test.ts            |  44 +++++++++
 packages/core/src/config/config.ts                 |   1 +
 packages/core/src/config/index.ts                  |   1 +
 packages/core/src/config/schema.impl.ts            |  34 +++++++
 packages/core/src/config/workflow-contract.ts      |   1 +
 packages/core/src/config/workflow-file.ts          |   2 +
 packages/spec/schemas/config.schema.json           |  45 +++++++++
 packages/spec/schemas/workflow.schema.json         |  76 +++++++++++++++
 schemas/config.schema.json                         |  45 +++++++++
 schemas/workflow.schema.json                       |  76 +++++++++++++++
 20 files changed, 768 insertions(+), 11 deletions(-)
```

</details>
