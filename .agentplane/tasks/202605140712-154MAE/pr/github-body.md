Task: `202605140712-154MAE`
Title: Document cloud dependency projection
Canonical task record: `.agentplane/tasks/202605140712-154MAE/README.md`

## Summary

Document cloud dependency projection

Add AgentPlane-side coverage and documentation that cloud push preserves depends_on and treats local depends_on as the source of truth for GitHub blocked-by projection.

## Scope

- In scope: Add AgentPlane-side coverage and documentation that cloud push preserves depends_on and treats local depends_on as the source of truth for GitHub blocked-by projection.
- Out of scope: unrelated refactors not required for "Document cloud dependency projection".

## Verification

- State: ok
- Note:

```text
Verified: cloud dependency projection coverage and docs passed targeted checks. Command: bun test
packages/agentplane/src/backends/task-backend.cloud.test.ts. Result: pass, 24 tests passed. Command:
node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: ap doctor.
Result: pass, doctor OK with two pre-existing warnings about old task archive/branch_pr closure
drift.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T07:17:42.680Z
- Branch: task/202605140712-154MAE/cloud-dependency-projection
- Head: 4da90f8b6179

```text
 docs/user/backends/cloud.mdx                         |  5 +++++
 .../src/backends/task-backend.cloud.test.ts          | 20 +++++++++++++++++++-
 2 files changed, 24 insertions(+), 1 deletion(-)
```

</details>
