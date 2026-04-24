---
id: "202604241136-ZE24F8"
title: "v0.3 freeze B3: prune orphaned init UI exports"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604241136-RTDFZS"
tags:
  - "cleanup"
  - "init"
  - "v0.3"
verify:
  - "bun run knip"
  - "rg -n 'previewConflicts|renderInitV2ConflictPreview' packages/agentplane/src/cli/run-cli/commands/init"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T12:39:53.535Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after B2 completion; scope is limited to orphan init conflict-preview exports and matching focused tests/checks."
verification:
  state: "ok"
  updated_at: "2026-04-24T12:45:32.537Z"
  updated_by: "CODER"
  note: "B3 verified: orphan init conflict-preview exports removed, conflict preview behavior remains covered in resolver tests, knip baseline returns to 239 exports/577 total, typecheck/format/routing/bootstrap/doctor pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: prune orphaned init conflict preview exports after B2, keeping behavior covered through conflict resolver tests and focused validation."
events:
  -
    type: "status"
    at: "2026-04-24T12:39:57.570Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prune orphaned init conflict preview exports after B2, keeping behavior covered through conflict resolver tests and focused validation."
  -
    type: "verify"
    at: "2026-04-24T12:45:32.537Z"
    author: "CODER"
    state: "ok"
    note: "B3 verified: orphan init conflict-preview exports removed, conflict preview behavior remains covered in resolver tests, knip baseline returns to 239 exports/577 total, typecheck/format/routing/bootstrap/doctor pass."
doc_version: 3
doc_updated_at: "2026-04-24T12:45:32.564Z"
doc_updated_by: "CODER"
description: "Remove unused init conflict-preview exports after the single init path lands and ratchet unused-export baseline where applicable."
sections:
  Summary: |-
    v0.3 freeze B3: prune orphaned init UI exports
    
    Remove unused init conflict-preview exports after the single init path lands and ratchet unused-export baseline where applicable.
  Scope: |-
    - In scope: Remove unused init conflict-preview exports after the single init path lands and ratchet unused-export baseline where applicable.
    - Out of scope: unrelated refactors not required for "v0.3 freeze B3: prune orphaned init UI exports".
  Plan: |-
    1. Remove the now-exported conflict preview helper surface from init UI: keep install preview/logo/outros in ui.ts, but move conflict-specific rendering into the conflict resolver step that owns it.
    2. Update init UI/conflict resolver tests to cover conflict preview through the resolver instead of public ui exports.
    3. Run init unit tests, knip baseline check, typecheck, format/diff checks, and framework bootstrap/doctor if runtime drift appears.
  Verify Steps: |-
    1. Run `rg -n 'previewConflicts|renderInitConflictPreview|renderInitV2ConflictPreview' packages/agentplane/src/cli/run-cli/commands/init`. Expected: no public orphan conflict preview export remains; only local conflict resolver implementation/tests may mention conflict preview behavior.
    2. Run `bun run test -- packages/agentplane/src/cli/run-cli/commands/init`. Expected: pass.
    3. Run `bun run knip:check`. Expected: pass with baseline not increased.
    4. Run `bun run typecheck`. Expected: pass.
    5. Run `git diff --check && bun run format:check`. Expected: pass.
    6. Run `node .agentplane/policy/check-routing.mjs`. Expected: pass after approved formatting drift in incident policy registry.
    7. If watched runtime drift is reported by agentplane commands, run `bun run framework:dev:bootstrap` and `agentplane doctor`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T12:45:32.537Z — VERIFY — ok
    
    By: CODER
    
    Note: B3 verified: orphan init conflict-preview exports removed, conflict preview behavior remains covered in resolver tests, knip baseline returns to 239 exports/577 total, typecheck/format/routing/bootstrap/doctor pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T12:44:20.597Z, excerpt_hash=sha256:03039144cd2af3c23585113b93bea6933b7ccf85449d51226e0a1780074b0e63
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze B3: prune orphaned init UI exports

Remove unused init conflict-preview exports after the single init path lands and ratchet unused-export baseline where applicable.

## Scope

- In scope: Remove unused init conflict-preview exports after the single init path lands and ratchet unused-export baseline where applicable.
- Out of scope: unrelated refactors not required for "v0.3 freeze B3: prune orphaned init UI exports".

## Plan

1. Remove the now-exported conflict preview helper surface from init UI: keep install preview/logo/outros in ui.ts, but move conflict-specific rendering into the conflict resolver step that owns it.
2. Update init UI/conflict resolver tests to cover conflict preview through the resolver instead of public ui exports.
3. Run init unit tests, knip baseline check, typecheck, format/diff checks, and framework bootstrap/doctor if runtime drift appears.

## Verify Steps

1. Run `rg -n 'previewConflicts|renderInitConflictPreview|renderInitV2ConflictPreview' packages/agentplane/src/cli/run-cli/commands/init`. Expected: no public orphan conflict preview export remains; only local conflict resolver implementation/tests may mention conflict preview behavior.
2. Run `bun run test -- packages/agentplane/src/cli/run-cli/commands/init`. Expected: pass.
3. Run `bun run knip:check`. Expected: pass with baseline not increased.
4. Run `bun run typecheck`. Expected: pass.
5. Run `git diff --check && bun run format:check`. Expected: pass.
6. Run `node .agentplane/policy/check-routing.mjs`. Expected: pass after approved formatting drift in incident policy registry.
7. If watched runtime drift is reported by agentplane commands, run `bun run framework:dev:bootstrap` and `agentplane doctor`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T12:45:32.537Z — VERIFY — ok

By: CODER

Note: B3 verified: orphan init conflict-preview exports removed, conflict preview behavior remains covered in resolver tests, knip baseline returns to 239 exports/577 total, typecheck/format/routing/bootstrap/doctor pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T12:44:20.597Z, excerpt_hash=sha256:03039144cd2af3c23585113b93bea6933b7ccf85449d51226e0a1780074b0e63

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
