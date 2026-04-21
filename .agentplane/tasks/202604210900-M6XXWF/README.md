---
id: "202604210900-M6XXWF"
title: "Resolve old source redirect and doctor legacy fix retention"
status: "DOING"
priority: "normal"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202604210900-RP5GA0"
tags:
  - "code"
  - "doctor"
  - "migration"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:45:28.732Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:59:36.758Z"
  updated_by: "CODER"
  note: "Removed the basilisk-labs/agent-plane source redirect and doctor legacy untracked DONE README cleanup; targeted upgrade/doctor tests and typecheck pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove or explicitly resolve old source redirect and doctor legacy README fix paths under approved patch-release breaking cleanup policy, with targeted tests and documentation."
events:
  -
    type: "status"
    at: "2026-04-21T09:45:43.846Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove or explicitly resolve old source redirect and doctor legacy README fix paths under approved patch-release breaking cleanup policy, with targeted tests and documentation."
  -
    type: "verify"
    at: "2026-04-21T09:59:36.758Z"
    author: "CODER"
    state: "ok"
    note: "Removed the basilisk-labs/agent-plane source redirect and doctor legacy untracked DONE README cleanup; targeted upgrade/doctor tests and typecheck pass."
doc_version: 3
doc_updated_at: "2026-04-21T09:59:36.773Z"
doc_updated_by: "CODER"
description: "Either remove or explicitly retain the old source redirect and doctor legacy README fix based on evidence and user-impact policy."
sections:
  Summary: "Handle two low-cost compatibility paths that SAFE_TO_REMOVE marks as questionable removals: old source redirect and safeFixLegacyUntrackedTaskReadmes."
  Scope: "In scope: materialize/source redirect, doctor legacy README fix, tests, and retention/removal documentation. Out of scope: broad upgrade command redesign."
  Plan: |-
    1. Read T23 decision for each path.
    2. If removal is approved, delete code/tests and add migration note.
    3. If retention is approved, add clear comments/tests documenting why it stays.
    4. Run upgrade/doctor tests.
  Verify Steps: |-
    - Each path is either removed with release notes or retained with explicit rationale.
    - Tests match the chosen policy.
    - No ambiguous half-deprecated state remains.
  Verification: |-
    - Command: `bun run test:project -- agentplane --run packages/agentplane/src/commands/upgrade.unit.test.ts packages/agentplane/src/commands/doctor.fast.test.ts`
      - Result: pass
      - Evidence: 2 files passed, 7 tests passed.
      - Scope: upgrade source normalization and doctor --fix fast path.
    - Command: `bun run --filter=agentplane typecheck`
      - Result: pass
      - Evidence: agentplane typecheck exited with code 0.
      - Scope: agentplane package type safety.
    - Command: `bun run framework:dev:bootstrap`
      - Result: pass
      - Evidence: framework dev runtime is ready.
      - Scope: rebuilt watched runtime after doctor/upgrade source changes.
    - Command: `rg -n 'safeFixLegacyUntrackedTaskReadmes|legacy untracked DONE task README|legacy untracked task README collisions|basilisk-labs/agent-plane|normalized\.migrated|deprecated repo basilisk-labs' packages/agentplane/src docs/help/legacy-upgrade-recovery.mdx`
      - Result: pass
      - Evidence: no live runtime references remain; basilisk-labs/agent-plane appears only in the targeted negative unit test.
      - Scope: removal of source redirect and doctor legacy README fix.
    - Command: `git diff --check -- packages/agentplane/src/commands/upgrade/source.ts packages/agentplane/src/commands/upgrade/materialize.ts packages/agentplane/src/commands/upgrade.unit.test.ts packages/agentplane/src/commands/doctor/fixes.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.fast.test.ts .agentplane/tasks/202604210900-M6XXWF/README.md`
      - Result: pass
      - Evidence: no whitespace errors.
      - Scope: changed files for this task.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:59:36.758Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed the basilisk-labs/agent-plane source redirect and doctor legacy untracked DONE README cleanup; targeted upgrade/doctor tests and typecheck pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:59:33.070Z, excerpt_hash=sha256:74c4a1e4b488882b9c093a6010d2a6bb13c780c55ea4c7bf950c03d1c12ee628
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous redirect/doctor behavior if removal causes regressions."
  Findings: "SAFE_TO_REMOVE recommends retaining these longer despite the generic cleanup plan."
id_source: "generated"
---
## Summary

Handle two low-cost compatibility paths that SAFE_TO_REMOVE marks as questionable removals: old source redirect and safeFixLegacyUntrackedTaskReadmes.

## Scope

In scope: materialize/source redirect, doctor legacy README fix, tests, and retention/removal documentation. Out of scope: broad upgrade command redesign.

## Plan

1. Read T23 decision for each path.
2. If removal is approved, delete code/tests and add migration note.
3. If retention is approved, add clear comments/tests documenting why it stays.
4. Run upgrade/doctor tests.

## Verify Steps

- Each path is either removed with release notes or retained with explicit rationale.
- Tests match the chosen policy.
- No ambiguous half-deprecated state remains.

## Verification

- Command: `bun run test:project -- agentplane --run packages/agentplane/src/commands/upgrade.unit.test.ts packages/agentplane/src/commands/doctor.fast.test.ts`
  - Result: pass
  - Evidence: 2 files passed, 7 tests passed.
  - Scope: upgrade source normalization and doctor --fix fast path.
- Command: `bun run --filter=agentplane typecheck`
  - Result: pass
  - Evidence: agentplane typecheck exited with code 0.
  - Scope: agentplane package type safety.
- Command: `bun run framework:dev:bootstrap`
  - Result: pass
  - Evidence: framework dev runtime is ready.
  - Scope: rebuilt watched runtime after doctor/upgrade source changes.
- Command: `rg -n 'safeFixLegacyUntrackedTaskReadmes|legacy untracked DONE task README|legacy untracked task README collisions|basilisk-labs/agent-plane|normalized\.migrated|deprecated repo basilisk-labs' packages/agentplane/src docs/help/legacy-upgrade-recovery.mdx`
  - Result: pass
  - Evidence: no live runtime references remain; basilisk-labs/agent-plane appears only in the targeted negative unit test.
  - Scope: removal of source redirect and doctor legacy README fix.
- Command: `git diff --check -- packages/agentplane/src/commands/upgrade/source.ts packages/agentplane/src/commands/upgrade/materialize.ts packages/agentplane/src/commands/upgrade.unit.test.ts packages/agentplane/src/commands/doctor/fixes.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.fast.test.ts .agentplane/tasks/202604210900-M6XXWF/README.md`
  - Result: pass
  - Evidence: no whitespace errors.
  - Scope: changed files for this task.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:59:36.758Z — VERIFY — ok

By: CODER

Note: Removed the basilisk-labs/agent-plane source redirect and doctor legacy untracked DONE README cleanup; targeted upgrade/doctor tests and typecheck pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:59:33.070Z, excerpt_hash=sha256:74c4a1e4b488882b9c093a6010d2a6bb13c780c55ea4c7bf950c03d1c12ee628

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous redirect/doctor behavior if removal causes regressions.

## Findings

SAFE_TO_REMOVE recommends retaining these longer despite the generic cleanup plan.
