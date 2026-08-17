Task: `202608170928-8Y24PK`
Title: Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories
Canonical task record: `.agentplane/tasks/202608170928-8Y24PK/README.md`

## Summary

Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories

Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published.

## Scope

- In scope: Implement the user-approved plan for AgentPlane 0.7.6, agentplane-hermes-plugin 0.2.0, and current Hermes worker-lane dispatch. Scope roots are /Users/densmirnov/Github/agentplane, /Users/densmirnov/Github/agentplane-hermes-plugin, and /Users/densmirnov/Github/hermes-agent. Required effects include source, tests, docs, public API, schema, CI/release metadata, security boundary, network reads, hosted external writes, and publication through explicit authority. Prove PLANNER/approval/EXECUTOR/EVALUATOR, retry, stale-run, and terminal attestation without direct kanban.db writes. Existing D5MAJ3 and failed structured-intake DDW1J5 are superseded and must not be implemented or published.
- Out of scope: unrelated refactors not required for "Upgrade the Hermes AgentPlane bridge protocol across the three approved repositories".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-17T10:38:22.317Z
- Branch: task/202608170928-8Y24PK/upgrade-the-hermes-agentplane-bridge-protocol-ac
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes/hermes-agentplane.mdx                 |  28 +++-
 docs/workflow-guides/hermes-kanban.mdx             |  94 ++++++------
 integrations/hermes-agentplane-plugin/README.md    | 106 ++++++++++----
 .../lane-registry.example.json                     |  19 +++
 .../protocol-v2.schema.json                        |  39 +++++
 .../src/commands/hermes/hermes-environment.test.ts |  30 ++++
 .../src/commands/hermes/hermes-environment.ts      |  65 ++++++++-
 .../src/commands/hermes/hermes-runtime.ts          |  35 +++--
 .../src/commands/hermes/hermes.command.test.ts     | 157 ++++++++++++++++++++-
 .../src/commands/hermes/hermes.command.ts          |  52 ++++++-
 10 files changed, 525 insertions(+), 100 deletions(-)
```

</details>
