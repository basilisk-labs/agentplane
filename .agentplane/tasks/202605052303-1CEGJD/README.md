---
id: "202605052303-1CEGJD"
title: "Add project-local blueprint validation command"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605052303-FXGCNC"
tags:
  - "blueprint"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T23:04:02.222Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T23:13:00.704Z"
  updated_by: "CODER"
  note: "Implemented and tested validate-only CLI for project-local blueprint JSON."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: batch execution in QWE78P worktree; add validate-only CLI for project-local blueprint JSON definitions."
events:
  -
    type: "status"
    at: "2026-05-05T23:09:24.349Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: batch execution in QWE78P worktree; add validate-only CLI for project-local blueprint JSON definitions."
  -
    type: "verify"
    at: "2026-05-05T23:13:00.704Z"
    author: "CODER"
    state: "ok"
    note: "Implemented and tested validate-only CLI for project-local blueprint JSON."
doc_version: 3
doc_updated_at: "2026-05-05T23:13:00.711Z"
doc_updated_by: "CODER"
description: "Add a validate-only CLI path for project-local blueprint JSON definitions, reusing the built-in blueprint validation contract without executing or registering custom routes by default."
sections:
  Summary: |-
    Add project-local blueprint validation command
    
    Add a validate-only CLI path for project-local blueprint JSON definitions, reusing the built-in blueprint validation contract without executing or registering custom routes by default.
  Scope: |-
    - In scope: Add a validate-only CLI path for project-local blueprint JSON definitions, reusing the built-in blueprint validation contract without executing or registering custom routes by default.
    - Out of scope: unrelated refactors not required for "Add project-local blueprint validation command".
  Plan: "1. Add a validate-only CLI subcommand for project-local blueprint JSON files. 2. Parse JSON through the same BlueprintDefinition validation contract used by built-ins. 3. Print deterministic success/error output without registering or executing custom blueprints. 4. Add CLI tests for valid JSON, invalid JSON, and schema/contract errors."
  Verify Steps: |-
    1. Review the requested outcome for "Add project-local blueprint validation command". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T23:13:00.704Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented and tested validate-only CLI for project-local blueprint JSON.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T23:09:24.349Z, excerpt_hash=sha256:bff0c8ba3fa2222f9467c0380b4337fc2ca38abaa10b48859c27c697d65e80de
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.blueprint.test.ts; Result: pass; Evidence: valid local blueprint JSON exits 0, invalid JSON exits 3, contract errors are reported. Scope: blueprint validate CLI command.
      Impact: Custom blueprint definitions can be checked before any future registration or execution path exists.
      Resolution: Added agentplane blueprint validate <path> with deterministic text and JSON output, backed by validateBlueprint.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add project-local blueprint validation command

Add a validate-only CLI path for project-local blueprint JSON definitions, reusing the built-in blueprint validation contract without executing or registering custom routes by default.

## Scope

- In scope: Add a validate-only CLI path for project-local blueprint JSON definitions, reusing the built-in blueprint validation contract without executing or registering custom routes by default.
- Out of scope: unrelated refactors not required for "Add project-local blueprint validation command".

## Plan

1. Add a validate-only CLI subcommand for project-local blueprint JSON files. 2. Parse JSON through the same BlueprintDefinition validation contract used by built-ins. 3. Print deterministic success/error output without registering or executing custom blueprints. 4. Add CLI tests for valid JSON, invalid JSON, and schema/contract errors.

## Verify Steps

1. Review the requested outcome for "Add project-local blueprint validation command". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T23:13:00.704Z — VERIFY — ok

By: CODER

Note: Implemented and tested validate-only CLI for project-local blueprint JSON.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T23:09:24.349Z, excerpt_hash=sha256:bff0c8ba3fa2222f9467c0380b4337fc2ca38abaa10b48859c27c697d65e80de

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.blueprint.test.ts; Result: pass; Evidence: valid local blueprint JSON exits 0, invalid JSON exits 3, contract errors are reported. Scope: blueprint validate CLI command.
  Impact: Custom blueprint definitions can be checked before any future registration or execution path exists.
  Resolution: Added agentplane blueprint validate <path> with deterministic text and JSON output, backed by validateBlueprint.
  Promotion: incident-candidate
  Fixability: external
