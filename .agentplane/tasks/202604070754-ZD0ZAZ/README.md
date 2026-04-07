---
id: "202604070754-ZD0ZAZ"
title: "Auto-promote incident findings into incidents collect flow"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T07:58:14.749Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T08:05:51.675Z"
  updated_by: "CODER"
  note: "Verified: task findings add now emits promotable external incident metadata by default, --local-only preserves task-local findings, targeted bun tests pass, eslint passes, and incidents collect --check shows a promotable candidate without hidden flags."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inspect findings promotion and incident collection path, implement the smallest rule change that makes incident-oriented findings promote without hidden metadata, and verify with focused tests."
events:
  -
    type: "status"
    at: "2026-04-07T07:58:45.059Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect findings promotion and incident collection path, implement the smallest rule change that makes incident-oriented findings promote without hidden metadata, and verify with focused tests."
  -
    type: "verify"
    at: "2026-04-07T08:05:51.675Z"
    author: "CODER"
    state: "ok"
    note: "Verified: task findings add now emits promotable external incident metadata by default, --local-only preserves task-local findings, targeted bun tests pass, eslint passes, and incidents collect --check shows a promotable candidate without hidden flags."
doc_version: 3
doc_updated_at: "2026-04-07T08:05:51.677Z"
doc_updated_by: "CODER"
description: "Make structured findings created during normal CLI/task workflows promote into incidents collection without requiring hidden manual metadata."
sections:
  Summary: |-
    Auto-promote incident findings into incidents collect flow
    
    Make structured findings created during normal CLI/task workflows promote into incidents collection without requiring hidden manual metadata.
  Scope: |-
    - In scope: Make structured findings created during normal CLI/task workflows promote into incidents collection without requiring hidden manual metadata.
    - Out of scope: unrelated refactors not required for "Auto-promote incident findings into incidents collect flow".
  Plan: "1. Inspect findings append, incident collect, and finish/integrate promotion rules to locate why structured findings stay local by default. 2. Change the smallest coherent rule so incident-oriented findings created through normal CLI usage promote into incidents collection without hidden metadata. 3. Add targeted tests for the promotion decision and for no-promotion on ordinary findings. 4. Verify with focused tests and a task-local dogfood flow."
  Verify Steps: |-
    - Add or update targeted tests that prove incident-oriented findings are promoted into collection.
    - Add or update targeted tests that ordinary findings stay local and do not create incidents.
    - Run the focused test commands for the touched findings/incidents path and record the results.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T08:05:51.675Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: task findings add now emits promotable external incident metadata by default, --local-only preserves task-local findings, targeted bun tests pass, eslint passes, and incidents collect --check shows a promotable candidate without hidden flags.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T08:04:59.003Z, excerpt_hash=sha256:726f5ff7d51a69d851a2fb66d23603ebb38ccfb9df4103df80036fc4879a06af
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Structured findings needed hidden promote/external flags before incidents collection could see them.
      Impact: Operators wrote reusable findings but incidents.md stayed unchanged by default.
      Resolution: Make task findings add emit promotable external metadata by default and require --local-only to opt out.
      Promotion: incident-candidate
      Fixability: external
      IncidentScope: task findings incident promotion
      IncidentTags: incidents, workflow
      IncidentMatch: findings, promote
      IncidentAdvice: Use task findings add defaults for reusable incident candidates; use --local-only only for task-scoped notes.
      IncidentRule: Structured findings intended as reusable workflow advice MUST promote by default; task-local-only notes MUST opt out explicitly with --local-only.
id_source: "generated"
---
## Summary

Auto-promote incident findings into incidents collect flow

Make structured findings created during normal CLI/task workflows promote into incidents collection without requiring hidden manual metadata.

## Scope

- In scope: Make structured findings created during normal CLI/task workflows promote into incidents collection without requiring hidden manual metadata.
- Out of scope: unrelated refactors not required for "Auto-promote incident findings into incidents collect flow".

## Plan

1. Inspect findings append, incident collect, and finish/integrate promotion rules to locate why structured findings stay local by default. 2. Change the smallest coherent rule so incident-oriented findings created through normal CLI usage promote into incidents collection without hidden metadata. 3. Add targeted tests for the promotion decision and for no-promotion on ordinary findings. 4. Verify with focused tests and a task-local dogfood flow.

## Verify Steps

- Add or update targeted tests that prove incident-oriented findings are promoted into collection.
- Add or update targeted tests that ordinary findings stay local and do not create incidents.
- Run the focused test commands for the touched findings/incidents path and record the results.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T08:05:51.675Z — VERIFY — ok

By: CODER

Note: Verified: task findings add now emits promotable external incident metadata by default, --local-only preserves task-local findings, targeted bun tests pass, eslint passes, and incidents collect --check shows a promotable candidate without hidden flags.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T08:04:59.003Z, excerpt_hash=sha256:726f5ff7d51a69d851a2fb66d23603ebb38ccfb9df4103df80036fc4879a06af

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Structured findings needed hidden promote/external flags before incidents collection could see them.
  Impact: Operators wrote reusable findings but incidents.md stayed unchanged by default.
  Resolution: Make task findings add emit promotable external metadata by default and require --local-only to opt out.
  Promotion: incident-candidate
  Fixability: external
  IncidentScope: task findings incident promotion
  IncidentTags: incidents, workflow
  IncidentMatch: findings, promote
  IncidentAdvice: Use task findings add defaults for reusable incident candidates; use --local-only only for task-scoped notes.
  IncidentRule: Structured findings intended as reusable workflow advice MUST promote by default; task-local-only notes MUST opt out explicitly with --local-only.
