---
id: "202605021909-XANHF2"
title: "Materialize active recipe mutations into managed prompt files"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202605021909-2GJ5SR"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
verify:
  - "agentplane doctor"
  - "bun test packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T19:10:06.506Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T19:38:33.508Z"
  updated_by: "CODER"
  note: "Implemented recipe materialization of managed markdown prompt sources. Evidence: prompt module registry tests passed; diff whitespace check passed."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-05-02T19:38:33.508Z"
    author: "CODER"
    state: "ok"
    note: "Implemented recipe materialization of managed markdown prompt sources. Evidence: prompt module registry tests passed; diff whitespace check passed."
doc_version: 3
doc_updated_at: "2026-05-02T19:38:33.515Z"
doc_updated_by: "CODER"
description: "Implement recipe activation materialization so active recipe prompt mutations update AgentPlane-managed source prompt files through fragment-aware operations, while generated prompt graph remains the validation and diagnostics artifact."
sections:
  Summary: |-
    Materialize active recipe mutations into managed prompt files
    
    Implement recipe activation materialization so active recipe prompt mutations update AgentPlane-managed source prompt files through fragment-aware operations, while generated prompt graph remains the validation and diagnostics artifact.
  Scope: |-
    - In scope: Implement recipe activation materialization so active recipe prompt mutations update AgentPlane-managed source prompt files through fragment-aware operations, while generated prompt graph remains the validation and diagnostics artifact.
    - Out of scope: unrelated refactors not required for "Materialize active recipe mutations into managed prompt files".
  Plan: |-
    Goal: make active recipe mutations materialize into AgentPlane-managed prompt source files through fragment-aware operations.
    
    Steps:
    1. Add a materialization stage for recipe activation/update/disable where active mutation sets target managed prompt fragments.
    2. Persist registry state and materialized source updates transactionally.
    3. Keep generated prompt graph as validation/diagnostic output derived from the same materialized model.
    4. Add focused transaction and mutation tests.
    
    Acceptance:
    - recipe activation does not rely only on hidden generated overlays.
    - AGENTS.md/policy/agent profile changes are managed, fragment-targeted, and validated.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T19:38:33.508Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented recipe materialization of managed markdown prompt sources. Evidence: prompt module registry tests passed; diff whitespace check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:09:52.092Z, excerpt_hash=sha256:160e22cab7402a2c12a53e4a2784c1fe02dc720f8d4e242e57a1429b5555dda5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Active recipe prompt graph output can materialize gateway/policy markdown targets.
      Impact: Recipe activation can change managed prompt files through controlled AgentPlane-owned materialization rather than arbitrary manual edits.
      Resolution: Added managed-prompt-sources publisher and wired it into recipe overlay publication/refresh.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Materialize active recipe mutations into managed prompt files

Implement recipe activation materialization so active recipe prompt mutations update AgentPlane-managed source prompt files through fragment-aware operations, while generated prompt graph remains the validation and diagnostics artifact.

## Scope

- In scope: Implement recipe activation materialization so active recipe prompt mutations update AgentPlane-managed source prompt files through fragment-aware operations, while generated prompt graph remains the validation and diagnostics artifact.
- Out of scope: unrelated refactors not required for "Materialize active recipe mutations into managed prompt files".

## Plan

Goal: make active recipe mutations materialize into AgentPlane-managed prompt source files through fragment-aware operations.

Steps:
1. Add a materialization stage for recipe activation/update/disable where active mutation sets target managed prompt fragments.
2. Persist registry state and materialized source updates transactionally.
3. Keep generated prompt graph as validation/diagnostic output derived from the same materialized model.
4. Add focused transaction and mutation tests.

Acceptance:
- recipe activation does not rely only on hidden generated overlays.
- AGENTS.md/policy/agent profile changes are managed, fragment-targeted, and validated.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T19:38:33.508Z — VERIFY — ok

By: CODER

Note: Implemented recipe materialization of managed markdown prompt sources. Evidence: prompt module registry tests passed; diff whitespace check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T19:09:52.092Z, excerpt_hash=sha256:160e22cab7402a2c12a53e4a2784c1fe02dc720f8d4e242e57a1429b5555dda5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Active recipe prompt graph output can materialize gateway/policy markdown targets.
  Impact: Recipe activation can change managed prompt files through controlled AgentPlane-owned materialization rather than arbitrary manual edits.
  Resolution: Added managed-prompt-sources publisher and wired it into recipe overlay publication/refresh.
  Promotion: incident-candidate
  Fixability: external
