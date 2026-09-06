Task: `202609061636-BW11J6`
Title: Archive the resolved WorkItem input planning incident before AgentPlane 0.7.8
Canonical task record: `.agentplane/tasks/202609061636-BW11J6/README.md`

## Summary

Archive the resolved WorkItem input planning incident before AgentPlane 0.7.8

Perform the user-approved dedicated incident review before release planning. Confirm the existing canonical planning admission rejects unproduced WorkItem required_inputs before persistence, run its current regressions, preserve the complete INC-20260829-01 record and fresh evidence in docs/developer/incident-archive.mdx, then remove that resolved entry from the active incidents registry. Do not change implementation behavior, weaken checks, close legacy release gates, or publish a release in this task.

## Scope

- In scope: Perform the user-approved dedicated incident review before release planning. Confirm the existing canonical planning admission rejects unproduced WorkItem required_inputs before persistence, run its current regressions, preserve the complete INC-20260829-01 record and fresh evidence in docs/developer/incident-archive.mdx, then remove that resolved entry from the active incidents registry. Do not change implementation behavior, weaken checks, close legacy release gates, or publish a release in this task.
- Out of scope: unrelated refactors not required for "Archive the resolved WorkItem input planning incident before AgentPlane 0.7.8".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-06T16:47:41.474Z
- Branch: task/202609061636-BW11J6/archive-the-resolved-workitem-input-planning-inc
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md     | 1 -
 docs/developer/incident-archive.mdx | 7 +++++++
 2 files changed, 7 insertions(+), 1 deletion(-)
```

</details>
