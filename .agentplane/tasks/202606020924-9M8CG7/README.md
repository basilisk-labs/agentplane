---
id: "202606020924-9M8CG7"
title: "Refactor cloud backend mutation freshness checks"
result_summary: "Merged via PR #4383."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/backends/task-backend.cloud-regression.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts"
  - "bun test packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-02T09:28:25.089Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-02T09:50:08.617Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/backends/task-backend.cloud-regression.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts | Result: pass | Evidence: 34 pass, 0 fail. Command: bun test packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts | Result: pass | Evidence: 19 pass, 0 fail. Command: bun run typecheck | Result: pass. Command: node .agentplane/policy/check-routing.mjs | Result: pass; policy routing OK. Command: bunx prettier --write packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend/cloud-backend-state.ts packages/agentplane/src/backends/task-backend/cloud-mutation-readiness.ts | Result: pass; unchanged. Scope: cloud backend mutation readiness extraction; cloud-backend.ts reduced to 401 lines and new helper owns pending_push recovery/stale mutation guard."
  attempts: 0
commit:
  hash: "11ee3c2d9a6fb6de153f90efd6c80c465a30bc46"
  message: "Merge pull request #4383 from basilisk-labs/task/202606020924-9M8CG7/refactor-cloud-backend-mutation-freshness-checks"
comments:
  -
    author: "CODER"
    body: "Start: Refactor cloud backend mutation freshness checks into focused helpers while preserving pending_push recovery and stale projection behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4383 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-02T09:47:46.637Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactor cloud backend mutation freshness checks into focused helpers while preserving pending_push recovery and stale projection behavior."
  -
    type: "verify"
    at: "2026-06-02T09:50:08.617Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/backends/task-backend.cloud-regression.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts | Result: pass | Evidence: 34 pass, 0 fail. Command: bun test packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts | Result: pass | Evidence: 19 pass, 0 fail. Command: bun run typecheck | Result: pass. Command: node .agentplane/policy/check-routing.mjs | Result: pass; policy routing OK. Command: bunx prettier --write packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend/cloud-backend-state.ts packages/agentplane/src/backends/task-backend/cloud-mutation-readiness.ts | Result: pass; unchanged. Scope: cloud backend mutation readiness extraction; cloud-backend.ts reduced to 401 lines and new helper owns pending_push recovery/stale mutation guard."
  -
    type: "status"
    at: "2026-06-02T10:20:59.971Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4383 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-02T10:20:59.976Z"
doc_updated_by: "INTEGRATOR"
description: "Extract the cloud backend pending_push recovery and freshness guard logic into focused helpers so recent GitLab sync fixes are easier to audit before the patch release. Preserve the current remote projection semantics and diagnostics."
sections:
  Summary: |-
    Refactor cloud backend mutation freshness checks

    Extract the cloud backend pending_push recovery and freshness guard logic into focused helpers so recent GitLab sync fixes are easier to audit before the patch release. Preserve the current remote projection semantics and diagnostics.
  Scope: |-
    - In scope: Extract the cloud backend pending_push recovery and freshness guard logic into focused helpers so recent GitLab sync fixes are easier to audit before the patch release. Preserve the current remote projection semantics and diagnostics.
    - Out of scope: unrelated refactors not required for "Refactor cloud backend mutation freshness checks".
  Plan: |-
    1. Isolate pending_push recovery, projection health diagnostics, and stale freshness checks from cloud-backend.ts into focused helpers under the task-backend cloud module boundary.
    2. Preserve exact mutation guard behavior from the recent GitLab cloud sync fixes: recovery may clear sticky markers only after current projection proof, then stale checks must still run.
    3. Keep backend inspect and doctor diagnostics stable unless a clearer internal helper name improves maintainability without changing output.
    4. Run focused cloud backend regression tests and backend-sync CLI tests before PR publication.
    Acceptance: cloud-backend.ts is smaller and easier to audit, all cloud regression tests pass, and no release-facing diagnostic text regresses.
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/backends/task-backend.cloud-regression.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts; expected: cloud backend mutation and freshness behavior remains green.
    2. Run bun test packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts; expected: CLI backend sync behavior remains stable.
    3. Run bun run typecheck; expected: extracted helpers preserve public types.
    4. Run node .agentplane/policy/check-routing.mjs; expected: routing policy remains valid.
    5. Review packages/agentplane/src/backends/task-backend/cloud-backend.ts and extracted helper files; expected: pending_push recovery, projection health, and stale freshness checks are separated without output regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-02T09:50:08.617Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/backends/task-backend.cloud-regression.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts | Result: pass | Evidence: 34 pass, 0 fail. Command: bun test packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts | Result: pass | Evidence: 19 pass, 0 fail. Command: bun run typecheck | Result: pass. Command: node .agentplane/policy/check-routing.mjs | Result: pass; policy routing OK. Command: bunx prettier --write packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend/cloud-backend-state.ts packages/agentplane/src/backends/task-backend/cloud-mutation-readiness.ts | Result: pass; unchanged. Scope: cloud backend mutation readiness extraction; cloud-backend.ts reduced to 401 lines and new helper owns pending_push recovery/stale mutation guard.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T09:47:46.637Z, excerpt_hash=sha256:6a3f0a6ff41b3bb3c714ddadc2022ef8488054e56b040c34c1b3214850871b06

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606020924-9M8CG7-refactor-cloud-backend-mutation-freshness-checks/.agentplane/tasks/202606020924-9M8CG7/blueprint/resolved-snapshot.json
    - old_digest: 9c917156c2f3dc49df80daf1d65ca7ff7ff609ae23227588c0e8938297b0b43c
    - current_digest: 9c917156c2f3dc49df80daf1d65ca7ff7ff609ae23227588c0e8938297b0b43c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606020924-9M8CG7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refactor cloud backend mutation freshness checks

Extract the cloud backend pending_push recovery and freshness guard logic into focused helpers so recent GitLab sync fixes are easier to audit before the patch release. Preserve the current remote projection semantics and diagnostics.

## Scope

- In scope: Extract the cloud backend pending_push recovery and freshness guard logic into focused helpers so recent GitLab sync fixes are easier to audit before the patch release. Preserve the current remote projection semantics and diagnostics.
- Out of scope: unrelated refactors not required for "Refactor cloud backend mutation freshness checks".

## Plan

1. Isolate pending_push recovery, projection health diagnostics, and stale freshness checks from cloud-backend.ts into focused helpers under the task-backend cloud module boundary.
2. Preserve exact mutation guard behavior from the recent GitLab cloud sync fixes: recovery may clear sticky markers only after current projection proof, then stale checks must still run.
3. Keep backend inspect and doctor diagnostics stable unless a clearer internal helper name improves maintainability without changing output.
4. Run focused cloud backend regression tests and backend-sync CLI tests before PR publication.
Acceptance: cloud-backend.ts is smaller and easier to audit, all cloud regression tests pass, and no release-facing diagnostic text regresses.

## Verify Steps

1. Run bun test packages/agentplane/src/backends/task-backend.cloud-regression.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts; expected: cloud backend mutation and freshness behavior remains green.
2. Run bun test packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts; expected: CLI backend sync behavior remains stable.
3. Run bun run typecheck; expected: extracted helpers preserve public types.
4. Run node .agentplane/policy/check-routing.mjs; expected: routing policy remains valid.
5. Review packages/agentplane/src/backends/task-backend/cloud-backend.ts and extracted helper files; expected: pending_push recovery, projection health, and stale freshness checks are separated without output regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-02T09:50:08.617Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/backends/task-backend.cloud-regression.test.ts packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.cloud-start-refresh.test.ts | Result: pass | Evidence: 34 pass, 0 fail. Command: bun test packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts | Result: pass | Evidence: 19 pass, 0 fail. Command: bun run typecheck | Result: pass. Command: node .agentplane/policy/check-routing.mjs | Result: pass; policy routing OK. Command: bunx prettier --write packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend/cloud-backend-state.ts packages/agentplane/src/backends/task-backend/cloud-mutation-readiness.ts | Result: pass; unchanged. Scope: cloud backend mutation readiness extraction; cloud-backend.ts reduced to 401 lines and new helper owns pending_push recovery/stale mutation guard.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-02T09:47:46.637Z, excerpt_hash=sha256:6a3f0a6ff41b3bb3c714ddadc2022ef8488054e56b040c34c1b3214850871b06

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606020924-9M8CG7-refactor-cloud-backend-mutation-freshness-checks/.agentplane/tasks/202606020924-9M8CG7/blueprint/resolved-snapshot.json
- old_digest: 9c917156c2f3dc49df80daf1d65ca7ff7ff609ae23227588c0e8938297b0b43c
- current_digest: 9c917156c2f3dc49df80daf1d65ca7ff7ff609ae23227588c0e8938297b0b43c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606020924-9M8CG7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
