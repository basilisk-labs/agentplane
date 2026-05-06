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
- Note: Verified cloud sync-state preflight including numeric open conflict counts, read-only pull diff behavior, repo cloud config, ignored cloud state, and live sync.agentplane.cloud inspect/pull smoke. Focused cloud backend tests, backend-sync CLI tests, typecheck, build, doctor, and policy routing passed. backend-critical remains blocked by pre-existing run-cli.core.tasks.create README v3 expectation failures unrelated to this change.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-06T10:44:25.604Z
- Branch: task/202605061021-E9TY7J/cloud-backend-e2e
- Head: 6663a4e759c6

```text
 .agentplane/WORKFLOW.md                            |   2 +-
 .agentplane/backends/cloud/backend.json            |  11 ++
 .gitignore                                         |   1 +
 docs/developer/cloud-backend-integration-plan.mdx  |  20 +--
 docs/user/backends/cloud.mdx                       |  13 +-
 .../src/backends/task-backend.cloud.test.ts        | 122 +++++++++++++++++-
 .../src/backends/task-backend/cloud-backend.ts     | 138 ++++++++++-----------
 .../src/backends/task-backend/cloud-pull.ts        | 123 ++++++++++++++++++
 8 files changed, 341 insertions(+), 89 deletions(-)
```

</details>
