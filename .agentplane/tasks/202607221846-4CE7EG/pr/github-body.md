Task: `202607221846-4CE7EG`
Title: Split agent semantic results from legacy observed claims
Canonical task record: `.agentplane/tasks/202607221846-4CE7EG/README.md`

## Summary

Split agent semantic results from legacy observed claims

RF-01a: define the agent-writable AgentSemanticResult contract and a compatibility reader that cannot treat process status, exit, timing, metrics, checks, or filesystem evidence as observed truth.

## Scope

- In scope: semantic result schema/types/fixtures, provenance for agent-reported claims, compatibility reading of v1 manifests, warning/normalization behavior, and removal of observed fields from the writable v2 schema.
- Out of scope: process/Git/check observation implementation, which belongs to the ExecutionReceipt task.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T14:37:15.639Z
- Branch: task/202607221846-4CE7EG/split-agent-semantic-results-from-legacy-observe
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
