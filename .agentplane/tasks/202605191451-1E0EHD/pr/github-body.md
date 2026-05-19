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
  packages/agentplane/src/backends/task-backend.cloud.test.ts \
  packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts
```
Result: pass
Evidence: 3 files, 30 tests passed after extracting daily-start tests.
Scope: cloud backend state parsing/writing, existing cloud backend behavior, and daily task-start pull behavior.

Command: npm run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: TypeScript project references.

Command: npm run build
Result: pass
Evidence: tsc -b plus core, recipes, and agentplane bundles built successfully.
Scope: package build outputs.

Command: bun run hotspots:check
Result: pass
Evidence: hotspot threshold check passed; oversized test baseline OK.
Scope: line-budget regression from the cloud backend split.

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

- Updated: 2026-05-19T15:22:49.030Z
- Branch: task/202605191451-1E0EHD/daily-cloud-start-pull
- Head: bf213af3cbf8

```text
 .../blueprint/resolved-snapshot.json               | 571 +++++++++++++++++++++
 .../src/backends/task-backend.cloud.test.ts        | 105 ++++
 .../task-backend/cloud-backend-settings.ts         |   1 +
 .../task-backend/cloud-backend-state.test.ts       |   5 +
 .../backends/task-backend/cloud-backend-state.ts   |   8 +-
 .../src/backends/task-backend/cloud-backend.ts     |  67 +++
 .../src/backends/task-backend/shared/types.ts      |   1 +
 .../agentplane/src/commands/task/start-ready.ts    |   1 +
 8 files changed, 758 insertions(+), 1 deletion(-)
```

</details>
