Task: `202607221848-T9B3PS`
Title: Publish AgentWorkOrder v2 schema and migrations
Canonical task record: `.agentplane/tasks/202607221848-T9B3PS/README.md`

## Summary

Publish AgentWorkOrder v2 schema and migrations

RF-05a: evolve agentplane.agent_work_context into one versioned AgentWorkOrder v2 schema containing objective, acceptance, role, fingerprint, authority, prepared evidence, knowledge refs, verification intent, required outputs, and semantic-result contract.

## Scope

- In scope: Zod source of truth, generated JSON Schema/types/fixtures, v1 compatibility reader and explicit v1-to-v2 migration, casing conversion, digest/fingerprint validation, role-specific prepared excerpts, ContextIntent and VerificationIntent, omission receipts, and output schemas.
- Out of scope: migrating every producer/consumer, which is the next task.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T08:07:55.572Z
- Branch: task/202607221848-T9B3PS/publish-agentworkorder-v2-schema-and-migrations
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
