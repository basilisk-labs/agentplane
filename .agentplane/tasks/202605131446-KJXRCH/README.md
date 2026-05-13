---
id: "202605131446-KJXRCH"
title: "Bootstrap AgentPlane from context init"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T14:47:15.578Z"
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
    body: "Start: implementing the approved context init bootstrap behavior in the dedicated branch_pr worktree, with guarded empty-directory project initialization, current idempotent context behavior preserved, targeted CLI tests, and docs updates."
events:
  -
    type: "status"
    at: "2026-05-13T14:47:30.969Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved context init bootstrap behavior in the dedicated branch_pr worktree, with guarded empty-directory project initialization, current idempotent context behavior preserved, targeted CLI tests, and docs updates."
doc_version: 3
doc_updated_at: "2026-05-13T14:47:30.969Z"
doc_updated_by: "CODER"
description: "Make agentplane context init in an empty directory initialize the AgentPlane project scaffold and then the local context layer, while preserving existing context init behavior and guarded failure modes for unsafe roots."
sections:
  Summary: |-
    Bootstrap AgentPlane from context init
    
    Make agentplane context init in an empty directory initialize the AgentPlane project scaffold and then the local context layer, while preserving existing context init behavior and guarded failure modes for unsafe roots.
  Scope: |-
    - In scope: Make agentplane context init in an empty directory initialize the AgentPlane project scaffold and then the local context layer, while preserving existing context init behavior and guarded failure modes for unsafe roots.
    - Out of scope: unrelated refactors not required for "Bootstrap AgentPlane from context init".
  Plan: |-
    1. Reuse the existing init bootstrap machinery so context init can safely initialize an empty directory before writing context artifacts.
    2. Preserve current behavior for already initialized AgentPlane repositories and keep context artifact creation idempotent.
    3. Guard unsafe roots: reject or require explicit bootstrap for non-empty uninitialized directories and nested parent-git contexts instead of silently writing policy/workflow files.
    4. Add targeted CLI tests for empty-dir bootstrap, existing repo idempotency, and unsafe-root rejection.
    5. Update user-facing docs/help references for the new context init behavior.
    6. Verify with targeted Vitest coverage, routing check, and AgentPlane doctor.
  Verify Steps: |-
    - Run targeted CLI tests covering context init bootstrap and existing init behavior.
    - Run context command tests affected by local context initialization.
    - Run docs/help freshness checks if generated CLI docs or command specs change.
    - Run node .agentplane/policy/check-routing.mjs.
    - Run agentplane doctor.
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

Bootstrap AgentPlane from context init

Make agentplane context init in an empty directory initialize the AgentPlane project scaffold and then the local context layer, while preserving existing context init behavior and guarded failure modes for unsafe roots.

## Scope

- In scope: Make agentplane context init in an empty directory initialize the AgentPlane project scaffold and then the local context layer, while preserving existing context init behavior and guarded failure modes for unsafe roots.
- Out of scope: unrelated refactors not required for "Bootstrap AgentPlane from context init".

## Plan

1. Reuse the existing init bootstrap machinery so context init can safely initialize an empty directory before writing context artifacts.
2. Preserve current behavior for already initialized AgentPlane repositories and keep context artifact creation idempotent.
3. Guard unsafe roots: reject or require explicit bootstrap for non-empty uninitialized directories and nested parent-git contexts instead of silently writing policy/workflow files.
4. Add targeted CLI tests for empty-dir bootstrap, existing repo idempotency, and unsafe-root rejection.
5. Update user-facing docs/help references for the new context init behavior.
6. Verify with targeted Vitest coverage, routing check, and AgentPlane doctor.

## Verify Steps

- Run targeted CLI tests covering context init bootstrap and existing init behavior.
- Run context command tests affected by local context initialization.
- Run docs/help freshness checks if generated CLI docs or command specs change.
- Run node .agentplane/policy/check-routing.mjs.
- Run agentplane doctor.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
