Task: `202607221852-01ACZ9`
Title: Serve bounded knowledge requests during agent episodes
Canonical task record: `.agentplane/tasks/202607221852-01ACZ9/README.md`

## Summary

Serve bounded knowledge requests during agent episodes

RF-22: let EXECUTOR/EVALUATOR request a query, reason, kind/scope, and blocking flag; let CLI return digest-valid refs/excerpts under round and token limits with escalation on repeated gaps.

## Scope

- In scope: KnowledgeRequest schema, run-bound audit, deterministic retrieval response, verified refs/excerpts, round/token budgets, blocking semantics, dedupe, repeated-unresolved escalation, and role-specific policy.
- Out of scope: exposing unrestricted repository/lifecycle access or naming the contract ContextGapRequest.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T13:20:41.795Z
- Branch: task/202607221852-01ACZ9/serve-bounded-knowledge-requests-during-agent-ep
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
