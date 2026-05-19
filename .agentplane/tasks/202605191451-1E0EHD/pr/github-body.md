Task: `202605191451-1E0EHD`
Title: Add daily cloud pull before task start
Canonical task record: `.agentplane/tasks/202605191451-1E0EHD/README.md`

## Summary

Add daily cloud pull before task start

Before task start-ready on the cloud backend, pull the cloud projection once per local day so GitHub issue intake tasks are visible before local work begins.

## Scope

- In scope: Before task start-ready on the cloud backend, pull the cloud projection once per local day so GitHub issue intake tasks are visible before local work begins.
- Out of scope: unrelated refactors not required for "Add daily cloud pull before task start".

## Verification

- State: ok
- Note:

```bash
npm test -- --run packages/agentplane/src/backends/task-backend/cloud-backend-state.test.ts \
  packages/agentplane/src/backends/task-backend.cloud.test.ts
```
Result: pass
Evidence: 2 files, 30 tests passed after final code changes.
Scope: cloud backend state parsing/writing and daily task-start pull behavior.

Command: npm run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: TypeScript project references.

Command: npm run build
Result: pass
Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
Scope: package build outputs.

Command: ap doctor
Result: pass
Evidence: doctor (OK), errors=0 warnings=0.
Scope: repo-local runtime/workflow health.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy routing contract.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-19T14:52:45.909Z
- Branch: task/202605191451-1E0EHD/daily-cloud-start-pull
- Head: 81a3ed59446b

```text
No changes detected.
```

</details>
