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

- State: ok
- Note:

```text
Verified review rework: context/CURATOR rework now depends on the bounded journal; the leaf and
beta.1 gate explicitly require schema fixtures, migrator idempotency/rollback, and installed-package
smoke; routing, doctor, task-state, formatting, and docs-only CI pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-24T22:41:27.950Z
- Branch: task/202607242234-S7WDVM/amend-agentplane-0-7-graph-with-bounded-supervis
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607221850-0SFMS7/README.md |   3 +-
 .agentplane/tasks/202607221850-8HBF4J/README.md |  18 ++---
 .agentplane/tasks/202607221908-MR9EA9/README.md |  18 ++---
 .agentplane/tasks/202607242236-1BFWEY/README.md | 102 ++++++++++++++++++++++++
 docs/internal/v0.7-refactor-plan.md             |  28 ++++++-
 5 files changed, 141 insertions(+), 28 deletions(-)
```

</details>
