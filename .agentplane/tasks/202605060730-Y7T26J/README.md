---
id: "202605060730-Y7T26J"
title: "Load project-local blueprint registry safely"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605060730-B55DQR"
tags:
  - "blueprints"
  - "registry"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T07:31:24.921Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T07:46:55.599Z"
  updated_by: "CODER"
  note: "Verified: project-local registry listing validates JSON definitions before listing; focused tests and ci:local:fast passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: batch execution in B55DQR worktree; add safe local blueprint registry loading."
events:
  -
    type: "status"
    at: "2026-05-06T07:31:57.413Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: batch execution in B55DQR worktree; add safe local blueprint registry loading."
  -
    type: "verify"
    at: "2026-05-06T07:46:55.599Z"
    author: "CODER"
    state: "ok"
    note: "Verified: project-local registry listing validates JSON definitions before listing; focused tests and ci:local:fast passed."
doc_version: 3
doc_updated_at: "2026-05-06T07:46:55.605Z"
doc_updated_by: "CODER"
description: "Add a validate-only project-local blueprint registry loader for .agentplane/blueprints/*.json and expose list/validate-all surfaces without automatic resolver selection."
sections:
  Summary: |-
    Load project-local blueprint registry safely
    
    Add a validate-only project-local blueprint registry loader for .agentplane/blueprints/*.json and expose list/validate-all surfaces without automatic resolver selection.
  Scope: |-
    - In scope: Add a validate-only project-local blueprint registry loader for .agentplane/blueprints/*.json and expose list/validate-all surfaces without automatic resolver selection.
    - Out of scope: unrelated refactors not required for "Load project-local blueprint registry safely".
  Plan: "1. Add project-local blueprint JSON discovery under .agentplane/blueprints/*.json. 2. Reuse validateBlueprint for each file and surface deterministic errors. 3. Extend blueprint list/validate surfaces to include project-local entries without feeding them into resolver by default. 4. Add focused tests."
  Verify Steps: |-
    1. Review the requested outcome for "Load project-local blueprint registry safely". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T07:46:55.599Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: project-local registry listing validates JSON definitions before listing; focused tests and ci:local:fast passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T07:31:57.413Z, excerpt_hash=sha256:851f38c7379d116d85dca34e6f933cb93dd56a2c9d6cf925579370bbc111ff43
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Load project-local blueprint registry safely

Add a validate-only project-local blueprint registry loader for .agentplane/blueprints/*.json and expose list/validate-all surfaces without automatic resolver selection.

## Scope

- In scope: Add a validate-only project-local blueprint registry loader for .agentplane/blueprints/*.json and expose list/validate-all surfaces without automatic resolver selection.
- Out of scope: unrelated refactors not required for "Load project-local blueprint registry safely".

## Plan

1. Add project-local blueprint JSON discovery under .agentplane/blueprints/*.json. 2. Reuse validateBlueprint for each file and surface deterministic errors. 3. Extend blueprint list/validate surfaces to include project-local entries without feeding them into resolver by default. 4. Add focused tests.

## Verify Steps

1. Review the requested outcome for "Load project-local blueprint registry safely". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T07:46:55.599Z — VERIFY — ok

By: CODER

Note: Verified: project-local registry listing validates JSON definitions before listing; focused tests and ci:local:fast passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T07:31:57.413Z, excerpt_hash=sha256:851f38c7379d116d85dca34e6f933cb93dd56a2c9d6cf925579370bbc111ff43

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
