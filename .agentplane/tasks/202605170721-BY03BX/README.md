---
id: "202605170721-BY03BX"
title: "Make context init guide adaptive wiki setup"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "init"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T07:23:24.728Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T07:37:08.987Z"
  updated_by: "CODER"
  note: "Updated context init adaptive profile and generated manifest/readme/AGENTS guidance for llm-wiki setup; verified generated CLI reference and focused tests."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Align context init starter artifacts with a single adaptive llm-wiki contract while preserving noninteractive defaults."
events:
  -
    type: "status"
    at: "2026-05-17T07:26:20.557Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Align context init starter artifacts with a single adaptive llm-wiki contract while preserving noninteractive defaults."
  -
    type: "verify"
    at: "2026-05-17T07:37:08.987Z"
    author: "CODER"
    state: "ok"
    note: "Updated context init adaptive profile and generated manifest/readme/AGENTS guidance for llm-wiki setup; verified generated CLI reference and focused tests."
doc_version: 3
doc_updated_at: "2026-05-17T07:37:09.002Z"
doc_updated_by: "CODER"
description: "Align context init with the single adaptive llm-wiki contract, preserving noninteractive defaults while documenting and preparing an interactive setup path for durable cloud-ready metadata."
sections:
  Summary: |-
    Make context init guide adaptive wiki setup
    
    Align context init with the single adaptive llm-wiki contract, preserving noninteractive defaults while documenting and preparing an interactive setup path for durable cloud-ready metadata.
  Scope: |-
    - In scope: Align context init with the single adaptive llm-wiki contract, preserving noninteractive defaults while documenting and preparing an interactive setup path for durable cloud-ready metadata.
    - Out of scope: unrelated refactors not required for "Make context init guide adaptive wiki setup".
  Plan: "Update context init behavior and docs toward a single adaptive llm-wiki contract. Preserve safe noninteractive defaults, avoid incompatible profile schemas, and make starter artifacts explain markdown frontmatter, claims, provenance, cross-links, private raw data, and future publication metadata."
  Verify Steps: |-
    1. bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/commands/context/context.spec.ts
    2. Verify context init docs/help still describe safe noninteractive defaults and adaptive llm-wiki setup.
    3. node .agentplane/policy/check-routing.mjs
    4. git diff --check
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T07:37:08.987Z — VERIFY — ok
    
    By: CODER
    
    Note: Updated context init adaptive profile and generated manifest/readme/AGENTS guidance for llm-wiki setup; verified generated CLI reference and focused tests.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T07:26:20.557Z, excerpt_hash=sha256:498dc54efe5cd21a0171c9831fb43f688070a069a6976e536c5e3694dd899436
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170721-ESJ0SW-adaptive-context-curation/.agentplane/tasks/202605170721-BY03BX/blueprint/resolved-snapshot.json
    - old_digest: 66aaaa9e2205dd99b2c6e50ec6159b62dfe10ba60c41ba901eb2b75e884d9c52
    - current_digest: 66aaaa9e2205dd99b2c6e50ec6159b62dfe10ba60c41ba901eb2b75e884d9c52
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170721-BY03BX
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make context init guide adaptive wiki setup

Align context init with the single adaptive llm-wiki contract, preserving noninteractive defaults while documenting and preparing an interactive setup path for durable cloud-ready metadata.

## Scope

- In scope: Align context init with the single adaptive llm-wiki contract, preserving noninteractive defaults while documenting and preparing an interactive setup path for durable cloud-ready metadata.
- Out of scope: unrelated refactors not required for "Make context init guide adaptive wiki setup".

## Plan

Update context init behavior and docs toward a single adaptive llm-wiki contract. Preserve safe noninteractive defaults, avoid incompatible profile schemas, and make starter artifacts explain markdown frontmatter, claims, provenance, cross-links, private raw data, and future publication metadata.

## Verify Steps

1. bun test packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/commands/context/context.spec.ts
2. Verify context init docs/help still describe safe noninteractive defaults and adaptive llm-wiki setup.
3. node .agentplane/policy/check-routing.mjs
4. git diff --check

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T07:37:08.987Z — VERIFY — ok

By: CODER

Note: Updated context init adaptive profile and generated manifest/readme/AGENTS guidance for llm-wiki setup; verified generated CLI reference and focused tests.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T07:26:20.557Z, excerpt_hash=sha256:498dc54efe5cd21a0171c9831fb43f688070a069a6976e536c5e3694dd899436

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170721-ESJ0SW-adaptive-context-curation/.agentplane/tasks/202605170721-BY03BX/blueprint/resolved-snapshot.json
- old_digest: 66aaaa9e2205dd99b2c6e50ec6159b62dfe10ba60c41ba901eb2b75e884d9c52
- current_digest: 66aaaa9e2205dd99b2c6e50ec6159b62dfe10ba60c41ba901eb2b75e884d9c52
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170721-BY03BX

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
