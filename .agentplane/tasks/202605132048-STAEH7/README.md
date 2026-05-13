---
id: "202605132048-STAEH7"
title: "Fix branch_pr hosted sync credential resolution"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "config"
  - "sync"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T20:49:59.038Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T21:14:43.949Z"
  updated_by: "CODER"
  note: "Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (31 tests); node .agentplane/policy/check-routing.mjs passed; ./node_modules/.bin/eslint packages/agentplane/src/shared/env.ts packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.load.test.ts passed; bunx prettier --check touched files passed; bun run hotspots:check passed after keeping cloud-backend.ts at the 600-line hotspot threshold; ap doctor previously OK with one pre-existing branch_pr closure warning for 202605111603-XQM14A."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: tightening cloud hosted sync credential diagnostics from branch_pr worktrees so missing-token failures identify the canonical root .env path while preserving secret-safe output."
events:
  -
    type: "status"
    at: "2026-05-13T20:50:37.772Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tightening cloud hosted sync credential diagnostics from branch_pr worktrees so missing-token failures identify the canonical root .env path while preserving secret-safe output."
  -
    type: "verify"
    at: "2026-05-13T20:58:09.288Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (31 tests); node .agentplane/policy/check-routing.mjs passed; ./node_modules/.bin/eslint packages/agentplane/src/shared/env.ts packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.load.test.ts passed; ap doctor OK with one pre-existing branch_pr closure warning for 202605111603-XQM14A."
  -
    type: "verify"
    at: "2026-05-13T21:14:43.949Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (31 tests); node .agentplane/policy/check-routing.mjs passed; ./node_modules/.bin/eslint packages/agentplane/src/shared/env.ts packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.load.test.ts passed; bunx prettier --check touched files passed; bun run hotspots:check passed after keeping cloud-backend.ts at the 600-line hotspot threshold; ap doctor previously OK with one pre-existing branch_pr closure warning for 202605111603-XQM14A."
doc_version: 3
doc_updated_at: "2026-05-13T21:14:43.965Z"
doc_updated_by: "CODER"
description: |-
  GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3654 (#3654)
  
  Problem: `ap backend sync cloud --direction push` fails from branch_pr worktrees because credentials/env are not resolved from canonical repo root.
  
  Acceptance:
  - branch_pr worktrees can run hosted sync without manual token export
  - missing-token diagnostic points to canonical root/env resolution
  - avoid pushing stale projections over canonical task README metadata
  - add focused regression coverage for env loading + stale projection push behavior
sections:
  Summary: |-
    Fix branch_pr hosted sync credential resolution
    
    GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3654 (#3654)
    
    Problem: `ap backend sync cloud --direction push` fails from branch_pr worktrees because credentials/env are not resolved from canonical repo root.
    
    Acceptance:
    - branch_pr worktrees can run hosted sync without manual token export
    - missing-token diagnostic points to canonical root/env resolution
    - avoid pushing stale projections over canonical task README metadata
    - add focused regression coverage for env loading + stale projection push behavior
  Scope: |-
    - In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3654 (#3654) Problem: `ap backend sync cloud --direction push` fails from branch_pr worktrees because credentials/env are not resolved from canonical repo root. Acceptance: - branch_pr worktrees can run hosted sync without manual token export - missing-token diagnostic points to canonical root/env resolution - avoid pushing stale projections over canonical task README metadata - add focused regression coverage for env loading + stale projection push behavior.
    - Out of scope: unrelated refactors not required for "Fix branch_pr hosted sync credential resolution".
  Plan: "1. Reuse the existing shared root .env resolver and add explicit cloud-backend diagnostic context for missing credentials, including the canonical env root/path checked from branch_pr worktrees without exposing secret values. 2. Add focused regression coverage that a branch_pr worktree missing AGENTPLANE_CLOUD_TOKEN reports the canonical root .env path in the sync failure. 3. Keep stale projection protection covered by the existing backend-sync regression and rerun the focused backend tests plus policy routing."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts`. Expected: branch_pr worktree env loading, missing cloud-token diagnostics, backend connect root .env writes, and stale projection sync regression coverage pass.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets pass.
    3. Run `ap doctor`. Expected: local runtime is healthy; any cloud service degradation is external state and not caused by this patch.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T20:58:09.288Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (31 tests); node .agentplane/policy/check-routing.mjs passed; ./node_modules/.bin/eslint packages/agentplane/src/shared/env.ts packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.load.test.ts passed; ap doctor OK with one pre-existing branch_pr closure warning for 202605111603-XQM14A.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:53:56.633Z, excerpt_hash=sha256:93737d52370220fb03c7556436cd7e65f8c76e8e26e24c3888858047afad04ee
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132048-STAEH7-hosted-sync-credentials/.agentplane/tasks/202605132048-STAEH7/blueprint/resolved-snapshot.json
    - old_digest: b6756598dec617607ffe6a5f83acd7c074fc2e0da99daf769ac00415ba9e70b8
    - current_digest: b6756598dec617607ffe6a5f83acd7c074fc2e0da99daf769ac00415ba9e70b8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132048-STAEH7
    
    ### 2026-05-13T21:14:43.949Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (31 tests); node .agentplane/policy/check-routing.mjs passed; ./node_modules/.bin/eslint packages/agentplane/src/shared/env.ts packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.load.test.ts passed; bunx prettier --check touched files passed; bun run hotspots:check passed after keeping cloud-backend.ts at the 600-line hotspot threshold; ap doctor previously OK with one pre-existing branch_pr closure warning for 202605111603-XQM14A.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:58:09.315Z, excerpt_hash=sha256:93737d52370220fb03c7556436cd7e65f8c76e8e26e24c3888858047afad04ee
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132048-STAEH7-hosted-sync-credentials/.agentplane/tasks/202605132048-STAEH7/blueprint/resolved-snapshot.json
    - old_digest: b6756598dec617607ffe6a5f83acd7c074fc2e0da99daf769ac00415ba9e70b8
    - current_digest: b6756598dec617607ffe6a5f83acd7c074fc2e0da99daf769ac00415ba9e70b8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132048-STAEH7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Cloud backend missing-token diagnostics now report the canonical env root and checked .env path resolved from a branch_pr worktree.
      Impact: Operators can fix hosted sync credentials in the canonical repository root without exposing secret values or falling back to manual GitHub task updates.
      Resolution: Added DotEnvLoadResult metadata, threaded it into CloudBackend.create, and added a branch_pr worktree regression for missing AGENTPLANE_CLOUD_TOKEN diagnostics.
    
    - Observation: Cloud backend missing-token diagnostics report the canonical env root and checked .env path resolved from a branch_pr worktree while staying inside hotspot limits.
      Impact: Operators can fix hosted sync credentials in the canonical repository root without exposing secret values or falling back to manual GitHub task updates.
      Resolution: Added DotEnvLoadResult metadata, threaded it into CloudBackend.create, added a branch_pr worktree regression for missing AGENTPLANE_CLOUD_TOKEN diagnostics, and compacted the touched hotspot file to satisfy the hosted CI line budget.
id_source: "generated"
---
## Summary

Fix branch_pr hosted sync credential resolution

GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3654 (#3654)

Problem: `ap backend sync cloud --direction push` fails from branch_pr worktrees because credentials/env are not resolved from canonical repo root.

Acceptance:
- branch_pr worktrees can run hosted sync without manual token export
- missing-token diagnostic points to canonical root/env resolution
- avoid pushing stale projections over canonical task README metadata
- add focused regression coverage for env loading + stale projection push behavior

## Scope

- In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3654 (#3654) Problem: `ap backend sync cloud --direction push` fails from branch_pr worktrees because credentials/env are not resolved from canonical repo root. Acceptance: - branch_pr worktrees can run hosted sync without manual token export - missing-token diagnostic points to canonical root/env resolution - avoid pushing stale projections over canonical task README metadata - add focused regression coverage for env loading + stale projection push behavior.
- Out of scope: unrelated refactors not required for "Fix branch_pr hosted sync credential resolution".

## Plan

1. Reuse the existing shared root .env resolver and add explicit cloud-backend diagnostic context for missing credentials, including the canonical env root/path checked from branch_pr worktrees without exposing secret values. 2. Add focused regression coverage that a branch_pr worktree missing AGENTPLANE_CLOUD_TOKEN reports the canonical root .env path in the sync failure. 3. Keep stale projection protection covered by the existing backend-sync regression and rerun the focused backend tests plus policy routing.

## Verify Steps

1. Run `bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts`. Expected: branch_pr worktree env loading, missing cloud-token diagnostics, backend connect root .env writes, and stale projection sync regression coverage pass.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets pass.
3. Run `ap doctor`. Expected: local runtime is healthy; any cloud service degradation is external state and not caused by this patch.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T20:58:09.288Z — VERIFY — ok

By: CODER

Note: Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (31 tests); node .agentplane/policy/check-routing.mjs passed; ./node_modules/.bin/eslint packages/agentplane/src/shared/env.ts packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.load.test.ts passed; ap doctor OK with one pre-existing branch_pr closure warning for 202605111603-XQM14A.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:53:56.633Z, excerpt_hash=sha256:93737d52370220fb03c7556436cd7e65f8c76e8e26e24c3888858047afad04ee

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132048-STAEH7-hosted-sync-credentials/.agentplane/tasks/202605132048-STAEH7/blueprint/resolved-snapshot.json
- old_digest: b6756598dec617607ffe6a5f83acd7c074fc2e0da99daf769ac00415ba9e70b8
- current_digest: b6756598dec617607ffe6a5f83acd7c074fc2e0da99daf769ac00415ba9e70b8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132048-STAEH7

### 2026-05-13T21:14:43.949Z — VERIFY — ok

By: CODER

Note: Verified: bun test packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts passed (31 tests); node .agentplane/policy/check-routing.mjs passed; ./node_modules/.bin/eslint packages/agentplane/src/shared/env.ts packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.load.test.ts passed; bunx prettier --check touched files passed; bun run hotspots:check passed after keeping cloud-backend.ts at the 600-line hotspot threshold; ap doctor previously OK with one pre-existing branch_pr closure warning for 202605111603-XQM14A.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T20:58:09.315Z, excerpt_hash=sha256:93737d52370220fb03c7556436cd7e65f8c76e8e26e24c3888858047afad04ee

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132048-STAEH7-hosted-sync-credentials/.agentplane/tasks/202605132048-STAEH7/blueprint/resolved-snapshot.json
- old_digest: b6756598dec617607ffe6a5f83acd7c074fc2e0da99daf769ac00415ba9e70b8
- current_digest: b6756598dec617607ffe6a5f83acd7c074fc2e0da99daf769ac00415ba9e70b8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132048-STAEH7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Cloud backend missing-token diagnostics now report the canonical env root and checked .env path resolved from a branch_pr worktree.
  Impact: Operators can fix hosted sync credentials in the canonical repository root without exposing secret values or falling back to manual GitHub task updates.
  Resolution: Added DotEnvLoadResult metadata, threaded it into CloudBackend.create, and added a branch_pr worktree regression for missing AGENTPLANE_CLOUD_TOKEN diagnostics.

- Observation: Cloud backend missing-token diagnostics report the canonical env root and checked .env path resolved from a branch_pr worktree while staying inside hotspot limits.
  Impact: Operators can fix hosted sync credentials in the canonical repository root without exposing secret values or falling back to manual GitHub task updates.
  Resolution: Added DotEnvLoadResult metadata, threaded it into CloudBackend.create, added a branch_pr worktree regression for missing AGENTPLANE_CLOUD_TOKEN diagnostics, and compacted the touched hotspot file to satisfy the hosted CI line budget.
