---
id: "202605131815-Y9VGVQ"
title: "Use shared root env for hosted sync"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "config"
  - "sync"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T18:16:39.718Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T18:32:54.637Z"
  updated_by: "CODER"
  note: "Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (29 tests); node .agentplane/policy/check-routing.mjs passed; ap doctor OK with pre-existing cloud service degradation warning; cloud-sync npm test -- --run test/server.test.ts passed (38 tests), npm run typecheck passed, npm test passed (19 files, 123 tests), npm run build passed, agentplane doctor OK, policy routing OK."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement shared root environment resolution for hosted sync commands and prevent stale local task projections from reintroducing outdated hosted metadata."
events:
  -
    type: "status"
    at: "2026-05-13T18:17:31.881Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement shared root environment resolution for hosted sync commands and prevent stale local task projections from reintroducing outdated hosted metadata."
  -
    type: "verify"
    at: "2026-05-13T18:32:54.637Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (29 tests); node .agentplane/policy/check-routing.mjs passed; ap doctor OK with pre-existing cloud service degradation warning; cloud-sync npm test -- --run test/server.test.ts passed (38 tests), npm run typecheck passed, npm test passed (19 files, 123 tests), npm run build passed, agentplane doctor OK, policy routing OK."
doc_version: 3
doc_updated_at: "2026-05-13T18:32:54.684Z"
doc_updated_by: "CODER"
description: "Load hosted backend credentials from the canonical repository root .env across branch_pr worktrees, and prevent cloud push from using stale task projections."
sections:
  Summary: |-
    Use shared root env for hosted sync
    
    Load hosted backend credentials from the canonical repository root .env across branch_pr worktrees, and prevent cloud push from using stale task projections.
  Scope: |-
    - In scope: Load hosted backend credentials from the canonical repository root .env across branch_pr worktrees, and prevent cloud push from using stale task projections.
    - Out of scope: unrelated refactors not required for "Use shared root env for hosted sync".
  Plan: "1. Add a shared root .env resolver so hosted backend credentials are loaded from the canonical repository checkout even when commands run inside branch_pr worktrees. 2. Update backend connect/sync code paths to use the shared env root for Cloud and Redmine credentials without exposing secret values. 3. Fix cloud push task hydration so stale .agentplane/tasks.json/cache projections cannot overwrite canonical task README metadata. 4. Add focused regression tests for worktree env loading and stale projection push behavior. 5. Inspect agentplane-cloud-sync for matching assumptions and patch it if it has its own env/root selection logic. 6. Verify with targeted tests, policy routing check, and a dry/local sync-oriented smoke where possible."
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts. Expected: shared root .env loading and backend connect token write tests pass.
    2. Run npm test -- --run test/server.test.ts in /Users/densmirnov/Github/agentplane-cloud-sync. Expected: HTTP cloud push rejects legacy tasks.json export snapshots while existing sync routes still pass.
    3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
    4. Run ap doctor. Expected: doctor OK; any remaining cloud backend service degradation is reported as external operational state, not a regression from this patch.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T18:32:54.637Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (29 tests); node .agentplane/policy/check-routing.mjs passed; ap doctor OK with pre-existing cloud service degradation warning; cloud-sync npm test -- --run test/server.test.ts passed (38 tests), npm run typecheck passed, npm test passed (19 files, 123 tests), npm run build passed, agentplane doctor OK, policy routing OK.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:27:06.393Z, excerpt_hash=sha256:211e0626146195c97ec313d2687067c210532835230b2e706d9cc783ea914404
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131815-Y9VGVQ-shared-root-env-sync/.agentplane/tasks/202605131815-Y9VGVQ/blueprint/resolved-snapshot.json
    - old_digest: 38bba6ab122e485d1869be63ad6ff4dc757b968aa9677c76488383e1e96c05da
    - current_digest: 38bba6ab122e485d1869be63ad6ff4dc757b968aa9677c76488383e1e96c05da
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131815-Y9VGVQ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Cloud backend sync state remains degraded with reason=rate_limited in the public AgentPlane doctor output; this is external service state, not a local regression.
      Impact: Local hosted-sync credentials now resolve from the shared root .env across worktrees; direct cloud-sync push rejects legacy tasks.json export snapshots.
      Resolution: Implemented root .env resolution and added service-side stale export rejection with tests.
id_source: "generated"
---
## Summary

Use shared root env for hosted sync

Load hosted backend credentials from the canonical repository root .env across branch_pr worktrees, and prevent cloud push from using stale task projections.

## Scope

- In scope: Load hosted backend credentials from the canonical repository root .env across branch_pr worktrees, and prevent cloud push from using stale task projections.
- Out of scope: unrelated refactors not required for "Use shared root env for hosted sync".

## Plan

1. Add a shared root .env resolver so hosted backend credentials are loaded from the canonical repository checkout even when commands run inside branch_pr worktrees. 2. Update backend connect/sync code paths to use the shared env root for Cloud and Redmine credentials without exposing secret values. 3. Fix cloud push task hydration so stale .agentplane/tasks.json/cache projections cannot overwrite canonical task README metadata. 4. Add focused regression tests for worktree env loading and stale projection push behavior. 5. Inspect agentplane-cloud-sync for matching assumptions and patch it if it has its own env/root selection logic. 6. Verify with targeted tests, policy routing check, and a dry/local sync-oriented smoke where possible.

## Verify Steps

1. Run bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts. Expected: shared root .env loading and backend connect token write tests pass.
2. Run npm test -- --run test/server.test.ts in /Users/densmirnov/Github/agentplane-cloud-sync. Expected: HTTP cloud push rejects legacy tasks.json export snapshots while existing sync routes still pass.
3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
4. Run ap doctor. Expected: doctor OK; any remaining cloud backend service degradation is reported as external operational state, not a regression from this patch.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T18:32:54.637Z — VERIFY — ok

By: CODER

Note: Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (29 tests); node .agentplane/policy/check-routing.mjs passed; ap doctor OK with pre-existing cloud service degradation warning; cloud-sync npm test -- --run test/server.test.ts passed (38 tests), npm run typecheck passed, npm test passed (19 files, 123 tests), npm run build passed, agentplane doctor OK, policy routing OK.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:27:06.393Z, excerpt_hash=sha256:211e0626146195c97ec313d2687067c210532835230b2e706d9cc783ea914404

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131815-Y9VGVQ-shared-root-env-sync/.agentplane/tasks/202605131815-Y9VGVQ/blueprint/resolved-snapshot.json
- old_digest: 38bba6ab122e485d1869be63ad6ff4dc757b968aa9677c76488383e1e96c05da
- current_digest: 38bba6ab122e485d1869be63ad6ff4dc757b968aa9677c76488383e1e96c05da
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131815-Y9VGVQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Cloud backend sync state remains degraded with reason=rate_limited in the public AgentPlane doctor output; this is external service state, not a local regression.
  Impact: Local hosted-sync credentials now resolve from the shared root .env across worktrees; direct cloud-sync push rejects legacy tasks.json export snapshots.
  Resolution: Implemented root .env resolution and added service-side stale export rejection with tests.
