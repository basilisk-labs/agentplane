---
id: "202604200859-JT87PW"
title: "Declarative dispatch for scenario and backend commands"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T08:59:20.552Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Refactor backend command preflight into descriptors and apply small declarative cleanup to scenario helpers without changing CLI behavior."
events:
  -
    type: "status"
    at: "2026-04-20T08:59:32.301Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactor backend command preflight into descriptors and apply small declarative cleanup to scenario helpers without changing CLI behavior."
doc_version: 3
doc_updated_at: "2026-04-20T08:59:32.316Z"
doc_updated_by: "CODER"
description: "Complete C-prime command dispatch cleanup by extracting shared backend command preflight/operation dispatch and replacing scenario command branching with small declarative registries where it reduces repeated if-chains without changing CLI behavior."
sections:
  Summary: |-
    Declarative dispatch for scenario and backend commands
    
    Complete C-prime command dispatch cleanup by extracting shared backend command preflight/operation dispatch and replacing scenario command branching with small declarative registries where it reduces repeated if-chains without changing CLI behavior.
  Scope: |-
    - In scope: Complete C-prime command dispatch cleanup by extracting shared backend command preflight/operation dispatch and replacing scenario command branching with small declarative registries where it reduces repeated if-chains without changing CLI behavior.
    - Out of scope: unrelated refactors not required for "Declarative dispatch for scenario and backend commands".
  Plan: |-
    1. Extract shared backend command setup: context loading, backend-id mismatch validation, operation support validation, and network approval.
    2. Replace repeated backend command branches with declarative operation descriptors while preserving outputs and error contexts.
    3. Apply the same pattern to scenario helper branching where low-risk: runtime invocation and scenario selection error mapping.
    4. Run focused backend/scenario tests plus typecheck/lint/format/bootstrap, record evidence, commit, and finish.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Declarative dispatch for scenario and backend commands

Complete C-prime command dispatch cleanup by extracting shared backend command preflight/operation dispatch and replacing scenario command branching with small declarative registries where it reduces repeated if-chains without changing CLI behavior.

## Scope

- In scope: Complete C-prime command dispatch cleanup by extracting shared backend command preflight/operation dispatch and replacing scenario command branching with small declarative registries where it reduces repeated if-chains without changing CLI behavior.
- Out of scope: unrelated refactors not required for "Declarative dispatch for scenario and backend commands".

## Plan

1. Extract shared backend command setup: context loading, backend-id mismatch validation, operation support validation, and network approval.
2. Replace repeated backend command branches with declarative operation descriptors while preserving outputs and error contexts.
3. Apply the same pattern to scenario helper branching where low-risk: runtime invocation and scenario selection error mapping.
4. Run focused backend/scenario tests plus typecheck/lint/format/bootstrap, record evidence, commit, and finish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
