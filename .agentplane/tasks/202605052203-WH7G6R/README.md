---
id: "202605052203-WH7G6R"
title: "Define executable blueprint definition contracts"
result_summary: "Merged via PR #952."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "contracts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T22:05:07.251Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T22:18:24.723Z"
  updated_by: "CODER"
  note: "Verified: executable blueprint definition contracts now include state metadata, policy modules, command boundaries, context budget, materialized plan typing, and focused validation coverage."
commit:
  hash: "5e16019e1eea4992217e70d12170dc8661de1988"
  message: "Merge pull request #952 from basilisk-labs/task/202605052203-WH7G6R/executable-blueprint-contracts"
comments:
  -
    author: "CODER"
    body: "Start: Implement the executable blueprint definition contract as the primary batch task for the approved blueprint execution-route work."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #952 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-05T22:07:05.609Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the executable blueprint definition contract as the primary batch task for the approved blueprint execution-route work."
  -
    type: "verify"
    at: "2026-05-05T22:18:24.723Z"
    author: "CODER"
    state: "ok"
    note: "Verified: executable blueprint definition contracts now include state metadata, policy modules, command boundaries, context budget, materialized plan typing, and focused validation coverage."
  -
    type: "status"
    at: "2026-05-05T22:26:34.154Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #952 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-05T22:26:34.161Z"
doc_updated_by: "INTEGRATOR"
description: "Add the first implementation task for blueprint execution contracts: define typed BlueprintDefinition and BlueprintState shapes without command execution, covering states, required evidence, allowed commands, policy modules, stop rules, and resolver-facing metadata."
sections:
  Summary: |-
    Define executable blueprint definition contracts
    
    Add the first implementation task for blueprint execution contracts: define typed BlueprintDefinition and BlueprintState shapes without command execution, covering states, required evidence, allowed commands, policy modules, stop rules, and resolver-facing metadata.
  Scope: |-
    - In scope: Add the first implementation task for blueprint execution contracts: define typed BlueprintDefinition and BlueprintState shapes without command execution, covering states, required evidence, allowed commands, policy modules, stop rules, and resolver-facing metadata.
    - Out of scope: unrelated refactors not required for "Define executable blueprint definition contracts".
  Plan: |-
    1. Inspect existing blueprint model and resolver types.
    2. Add typed BlueprintDefinition and BlueprintState contracts without command execution.
    3. Cover lifecycle metadata: states, required evidence, allowed commands, policy modules, stop rules, mutation scope, and task-kind compatibility.
    4. Export the contract from the blueprint module boundary.
    5. Add focused unit tests for valid definitions and invalid contract shapes.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T22:18:24.723Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: executable blueprint definition contracts now include state metadata, policy modules, command boundaries, context budget, materialized plan typing, and focused validation coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:05.609Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bun test blueprint/runner focused suite; bun run typecheck; targeted eslint; bun run schemas:check; bun run docs:cli:check; git diff --check; policy routing; agentplane doctor.
      Impact: Blueprint definitions are now usable as an executable route contract without automatic state execution.
      Resolution: Added typed plan metadata, validation, exports, tests, and documentation.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
