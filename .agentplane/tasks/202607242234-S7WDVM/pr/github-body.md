Task: `202607242234-S7WDVM`
Title: Amend AgentPlane 0.7 graph with bounded supervisor execution
Canonical task record: `.agentplane/tasks/202607242234-S7WDVM/README.md`

## Summary

Amend AgentPlane 0.7 graph with bounded supervisor execution

Add a beta.1 implementation leaf for a durable supervisor episode journal and hard execution budgets, wire its release-DAG dependencies, and update the canonical AgentPlane 0.7 refactor plan without implementing runtime code.

## Scope

- In scope: Add a beta.1 implementation leaf for a durable supervisor episode journal and hard execution budgets, wire its release-DAG dependencies, and update the canonical AgentPlane 0.7 refactor plan without implementing runtime code.
- Out of scope: unrelated refactors not required for "Amend AgentPlane 0.7 graph with bounded supervisor execution".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-24T22:35:38.268Z
- Branch: task/202607242234-S7WDVM/amend-agentplane-0-7-graph-with-bounded-supervis
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221850-0SFMS7/README.md |   3 +-
 .agentplane/tasks/202607221908-MR9EA9/README.md |   3 +-
 .agentplane/tasks/202607242236-1BFWEY/README.md | 103 ++++++++++++++++++++++++
 docs/internal/v0.7-refactor-plan.md             |  20 ++++-
 4 files changed, 125 insertions(+), 4 deletions(-)
```

</details>
