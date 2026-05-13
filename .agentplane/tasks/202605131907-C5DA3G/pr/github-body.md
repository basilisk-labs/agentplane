Task: `202605131907-C5DA3G`
Title: Temporarily switch task backend to local
Canonical task record: `.agentplane/tasks/202605131907-C5DA3G/README.md`

## Summary

Temporarily switch task backend to local

Switch the active AgentPlane task backend from cloud to local to reduce lifecycle latency, preserving a clear rollback path to cloud.

## Scope

- In scope: Switch the active AgentPlane task backend from cloud to local to reduce lifecycle latency, preserving a clear rollback path to cloud.
- Out of scope: unrelated refactors not required for "Temporarily switch task backend to local".

## Verification

- State: ok
- Note: Config now resolves tasks_backend.config_path to .agentplane/backends/local/backend.json; task list succeeds against local backend; policy routing passes; committed diff is limited to .agentplane/WORKFLOW.md.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:14:43.472Z
- Branch: task/202605131907-C5DA3G/switch-backend-local
- Head: 81b7f84d11e3

```text
 .agentplane/WORKFLOW.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

</details>
