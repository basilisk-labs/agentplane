---
id: "202604062309-EXTXG1"
title: "Promote confirmed external workflow incidents into incidents registry"
status: "TODO"
priority: "med"
owner: "DOCS"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "policy"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T23:10:43.470Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T23:28:04.069Z"
  updated_by: "DOCS"
  note: "Policy incident backfill verified: reviewed both appended external entries against task evidence, confirmed append-only registry updates, and reran node .agentplane/policy/check-routing.mjs after compressing incidents.md back under the 100-line budget. Result: pass. Evidence: incidents.md now contains explicit external guidance for flaky GitHub transport and protected-main closure permission limits."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-06T23:28:04.069Z"
    author: "DOCS"
    state: "ok"
    note: "Policy incident backfill verified: reviewed both appended external entries against task evidence, confirmed append-only registry updates, and reran node .agentplane/policy/check-routing.mjs after compressing incidents.md back under the 100-line budget. Result: pass. Evidence: incidents.md now contains explicit external guidance for flaky GitHub transport and protected-main closure permission limits."
doc_version: 3
doc_updated_at: "2026-04-06T23:28:04.074Z"
doc_updated_by: "DOCS"
description: "Append confirmed external operational lessons from the recent GitHub transport/reconciliation cycle into .agentplane/policy/incidents.md with concrete rules and evidence."
sections:
  Summary: |-
    Promote confirmed external workflow incidents into incidents registry
    
    Append confirmed external operational lessons from the recent GitHub transport/reconciliation cycle into .agentplane/policy/incidents.md with concrete rules and evidence.
  Scope: |-
    - In scope: Append confirmed external operational lessons from the recent GitHub transport/reconciliation cycle into .agentplane/policy/incidents.md with concrete rules and evidence.
    - Out of scope: unrelated refactors not required for "Promote confirmed external workflow incidents into incidents registry".
  Plan: "1. Extract confirmed external operational lessons from the recent GitHub transport and reconciliation cycle using task evidence already recorded in the repository. 2. Append concrete incidents to .agentplane/policy/incidents.md with testable rules, evidence, and matching metadata. 3. Verify policy routing and ensure the registry stays append-only and machine-matchable."
  Verify Steps: |-
    1. Review the appended incidents against the recorded task evidence. Expected: every new entry is supported by concrete repository evidence and describes an external operational failure mode rather than an already-fixed code defect.
    2. Run policy routing validation. Expected: `node .agentplane/policy/check-routing.mjs` passes after the registry update.
    3. Review `.agentplane/policy/incidents.md` for format and append-only discipline. Expected: new entries are machine-matchable and keep the registry schema intact.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T23:28:04.069Z — VERIFY — ok
    
    By: DOCS
    
    Note: Policy incident backfill verified: reviewed both appended external entries against task evidence, confirmed append-only registry updates, and reran node .agentplane/policy/check-routing.mjs after compressing incidents.md back under the 100-line budget. Result: pass. Evidence: incidents.md now contains explicit external guidance for flaky GitHub transport and protected-main closure permission limits.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T23:09:43.527Z, excerpt_hash=sha256:c1e7cd793d1171b7c10c7a2be1fffd2f78ed8a5ff864461ecf59d1ccc0a3ce4c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Added `INC-20260407-01` for recurring GitHub transport instability across PR creation, remote-check waiting, and reconcile helpers.
    - Added `INC-20260407-02` for protected-main closure cases where hosted automation cannot create the follow-up PR because of external GitHub permission limits.
id_source: "generated"
---
## Summary

Promote confirmed external workflow incidents into incidents registry

Append confirmed external operational lessons from the recent GitHub transport/reconciliation cycle into .agentplane/policy/incidents.md with concrete rules and evidence.

## Scope

- In scope: Append confirmed external operational lessons from the recent GitHub transport/reconciliation cycle into .agentplane/policy/incidents.md with concrete rules and evidence.
- Out of scope: unrelated refactors not required for "Promote confirmed external workflow incidents into incidents registry".

## Plan

1. Extract confirmed external operational lessons from the recent GitHub transport and reconciliation cycle using task evidence already recorded in the repository. 2. Append concrete incidents to .agentplane/policy/incidents.md with testable rules, evidence, and matching metadata. 3. Verify policy routing and ensure the registry stays append-only and machine-matchable.

## Verify Steps

1. Review the appended incidents against the recorded task evidence. Expected: every new entry is supported by concrete repository evidence and describes an external operational failure mode rather than an already-fixed code defect.
2. Run policy routing validation. Expected: `node .agentplane/policy/check-routing.mjs` passes after the registry update.
3. Review `.agentplane/policy/incidents.md` for format and append-only discipline. Expected: new entries are machine-matchable and keep the registry schema intact.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T23:28:04.069Z — VERIFY — ok

By: DOCS

Note: Policy incident backfill verified: reviewed both appended external entries against task evidence, confirmed append-only registry updates, and reran node .agentplane/policy/check-routing.mjs after compressing incidents.md back under the 100-line budget. Result: pass. Evidence: incidents.md now contains explicit external guidance for flaky GitHub transport and protected-main closure permission limits.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T23:09:43.527Z, excerpt_hash=sha256:c1e7cd793d1171b7c10c7a2be1fffd2f78ed8a5ff864461ecf59d1ccc0a3ce4c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Added `INC-20260407-01` for recurring GitHub transport instability across PR creation, remote-check waiting, and reconcile helpers.
- Added `INC-20260407-02` for protected-main closure cases where hosted automation cannot create the follow-up PR because of external GitHub permission limits.
