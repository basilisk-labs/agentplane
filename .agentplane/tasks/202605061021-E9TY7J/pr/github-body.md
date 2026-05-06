Task: `202605061021-E9TY7J`
Title: Complete cloud backend E2E integration
Canonical task record: `.agentplane/tasks/202605061021-E9TY7J/README.md`

## Summary

Complete cloud backend E2E integration

Implement the remaining public AgentPlane cloud backend gaps from the cloud service handoff: refresh the repository cloud connection, add sync-state preflight for conflicts, improve read-only diff output, update docs, and verify end-to-end against sync.agentplane.cloud.

## Scope

- In scope: Implement the remaining public AgentPlane cloud backend gaps from the cloud service handoff: refresh the repository cloud connection, add sync-state preflight for conflicts, improve read-only diff output, update docs, and verify end-to-end against sync.agentplane.cloud.
- Out of scope: unrelated refactors not required for "Complete cloud backend E2E integration".

## Verification

- State: ok
- Note: Verified cloud sync-state preflight, read-only pull diff behavior, repo cloud config, ignored cloud state, and live sync.agentplane.cloud inspect/pull smoke. Focused cloud backend tests, backend-sync CLI tests, typecheck, build, doctor, and policy routing passed. backend-critical remains blocked by pre-existing run-cli.core.tasks.create README v3 expectation failures unrelated to this change.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T10:22:21.425Z
- Branch: task/202605061021-E9TY7J/cloud-backend-e2e
- Head: 64d2f5129167

```text
No changes detected.
```

</details>
