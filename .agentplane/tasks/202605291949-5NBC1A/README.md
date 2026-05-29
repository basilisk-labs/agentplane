---
id: "202605291949-5NBC1A"
title: "Remove direct Redmine task backend"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T19:50:53.941Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Remove direct Redmine task backend from public AgentPlane and keep Redmine connector behavior in cloud-sync integration scope."
events:
  -
    type: "status"
    at: "2026-05-29T19:51:11.560Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Remove direct Redmine task backend from public AgentPlane and keep Redmine connector behavior in cloud-sync integration scope."
doc_version: 3
doc_updated_at: "2026-05-29T19:51:11.560Z"
doc_updated_by: "CODER"
description: "Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior."
sections:
  Summary: |-
    Remove direct Redmine task backend

    Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior.
  Scope: |-
    - In scope: Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior.
    - Out of scope: unrelated refactors not required for "Remove direct Redmine task backend".
  Plan: |-
    1. Implement the change for "Remove direct Redmine task backend".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run focused task backend and init CLI tests. Expected: local/cloud backend choices pass and redmine is rejected with a migration-oriented error.
    2. Run repository routing/policy checks. Expected: backend removal does not violate AGENTS or policy routing budgets.
    3. Run package typecheck/build or the narrowest available equivalent. Expected: no public AgentPlane code imports Redmine backend modules.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove direct Redmine task backend

Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior.

## Scope

- In scope: Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior.
- Out of scope: unrelated refactors not required for "Remove direct Redmine task backend".

## Plan

1. Implement the change for "Remove direct Redmine task backend".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run focused task backend and init CLI tests. Expected: local/cloud backend choices pass and redmine is rejected with a migration-oriented error.
2. Run repository routing/policy checks. Expected: backend removal does not violate AGENTS or policy routing budgets.
3. Run package typecheck/build or the narrowest available equivalent. Expected: no public AgentPlane code imports Redmine backend modules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
