---
id: "202604170830-04WYRT"
title: "Compile namespaced recipe asset registry"
result_summary: "Closed as duplicate of 202604170832-CJEZSZ."
risk_level: "low"
breaking: false
status: "DONE"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "recipes"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: |-
      Verified: 202604170830-04WYRT is a bookkeeping duplicate of 202604170832-CJEZSZ (Compile namespaced recipe asset registry); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed recipe-assets-registry task.
events:
  -
    type: "status"
    at: "2026-04-17T10:04:52.588Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202604170830-04WYRT is a bookkeeping duplicate of 202604170832-CJEZSZ (Compile namespaced recipe asset registry); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed recipe-assets-registry task.
doc_version: 3
doc_updated_at: "2026-04-17T10:04:52.588Z"
doc_updated_by: "ORCHESTRATOR"
description: "Compile vendored recipe agents, skills, tools, templates, and scenarios into a project-local asset registry with namespaced identities for runtime resolution."
sections:
  Summary: |-
    Compile namespaced recipe asset registry
    
    Compile vendored recipe agents, skills, tools, templates, and scenarios into a project-local asset registry with namespaced identities for runtime resolution.
  Scope: |-
    - In scope: Compile vendored recipe agents, skills, tools, templates, and scenarios into a project-local asset registry with namespaced identities for runtime resolution.
    - Out of scope: unrelated refactors not required for "Compile namespaced recipe asset registry".
  Plan: "1. Add a compiled project-local recipe asset registry and types for agents, skills, tools, templates, and scenarios. 2. Populate the registry from vendored recipes with namespaced asset identities and generated output under .agentplane/generated. 3. Switch runtime capability resolution and recipe-related readers to use the compiled registry where appropriate. 4. Update tests and verification to cover namespaced assets and registry generation."
  Verify Steps: |-
    1. Review the requested outcome for "Compile namespaced recipe asset registry". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Compile namespaced recipe asset registry

Compile vendored recipe agents, skills, tools, templates, and scenarios into a project-local asset registry with namespaced identities for runtime resolution.

## Scope

- In scope: Compile vendored recipe agents, skills, tools, templates, and scenarios into a project-local asset registry with namespaced identities for runtime resolution.
- Out of scope: unrelated refactors not required for "Compile namespaced recipe asset registry".

## Plan

1. Add a compiled project-local recipe asset registry and types for agents, skills, tools, templates, and scenarios. 2. Populate the registry from vendored recipes with namespaced asset identities and generated output under .agentplane/generated. 3. Switch runtime capability resolution and recipe-related readers to use the compiled registry where appropriate. 4. Update tests and verification to cover namespaced assets and registry generation.

## Verify Steps

1. Review the requested outcome for "Compile namespaced recipe asset registry". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
