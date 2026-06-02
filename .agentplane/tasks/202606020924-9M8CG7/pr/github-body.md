Task: `202606020924-9M8CG7`
Title: Refactor cloud backend mutation freshness checks
Canonical task record: `.agentplane/tasks/202606020924-9M8CG7/README.md`

## Summary

Refactor cloud backend mutation freshness checks

Extract the cloud backend pending_push recovery and freshness guard logic into focused helpers so recent GitLab sync fixes are easier to audit before the patch release. Preserve the current remote projection semantics and diagnostics.

## Scope

- In scope: Extract the cloud backend pending_push recovery and freshness guard logic into focused helpers so recent GitLab sync fixes are easier to audit before the patch release. Preserve the current remote projection semantics and diagnostics.
- Out of scope: unrelated refactors not required for "Refactor cloud backend mutation freshness checks".

## Verification

- State: ok
- Note:

```bash
bun test packages/agentplane/src/backends/task-backend.cloud-regression.test.ts \
  packages/agentplane/src/backends/task-backend.cloud.test.ts \
  packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts | Result: pass | \
  Evidence: 34 pass, 0 fail. Command: bun test \
  packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts | Result: pass | Evidence: 19 pass, \
  0 fail. Command: bun run typecheck | Result: pass. Command: node \
  .agentplane/policy/check-routing.mjs | Result: pass; policy routing OK. Command: bunx prettier \
  --write packages/agentplane/src/backends/task-backend/cloud-backend.ts \
  packages/agentplane/src/backends/task-backend/cloud-backend-state.ts \
  packages/agentplane/src/backends/task-backend/cloud-mutation-readiness.ts | Result: pass; \
  unchanged. Scope: cloud backend mutation readiness extraction; cloud-backend.ts reduced to 401 \
  lines and new helper owns pending_push recovery/stale mutation guard.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-02T09:47:46.817Z
- Branch: task/202606020924-9M8CG7/refactor-cloud-backend-mutation-freshness-checks
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../backends/task-backend/cloud-backend-state.ts   |  2 +-
 .../src/backends/task-backend/cloud-backend.ts     | 60 +++++------------
 .../task-backend/cloud-mutation-readiness.ts       | 75 ++++++++++++++++++++++
 3 files changed, 91 insertions(+), 46 deletions(-)
```

</details>
