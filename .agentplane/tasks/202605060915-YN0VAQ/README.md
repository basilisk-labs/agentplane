---
id: "202605060915-YN0VAQ"
title: "Define resolved blueprint snapshot schema"
result_summary: "Shipped on main and reconciled from local branch_pr state."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "lifecycle"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T09:20:39.410Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T09:24:59.991Z"
  updated_by: "CODER"
  note: "Implemented resolved blueprint snapshot schema, deterministic sha256 digest helpers, canonical JSON serialization, and snapshot validation without adding command execution. Verification passed: bun test packages/agentplane/src/blueprints/snapshot.test.ts packages/agentplane/src/blueprints/resolve.test.ts; bun run typecheck; prettier/eslint on touched blueprint files; git diff --check; bun run framework:dev:bootstrap."
commit:
  hash: "38314f0bb8a7533bc8bbcfc198fd9361bedfe721"
  message: "Shipped on main before canonical task closure"
comments:
  -
    author: "CODER"
    body: "Start: Implement resolved blueprint snapshot schema and deterministic digest helpers for the v0.5 lifecycle foundation."
events:
  -
    type: "status"
    at: "2026-05-06T09:20:45.323Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement resolved blueprint snapshot schema and deterministic digest helpers for the v0.5 lifecycle foundation."
  -
    type: "verify"
    at: "2026-05-06T09:24:59.991Z"
    author: "CODER"
    state: "ok"
    note: "Implemented resolved blueprint snapshot schema, deterministic sha256 digest helpers, canonical JSON serialization, and snapshot validation without adding command execution. Verification passed: bun test packages/agentplane/src/blueprints/snapshot.test.ts packages/agentplane/src/blueprints/resolve.test.ts; bun run typecheck; prettier/eslint on touched blueprint files; git diff --check; bun run framework:dev:bootstrap."
  -
    type: "status"
    at: "2026-05-06T12:21:33.425Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Local branch_pr reconciliation detected task commit 38314f0bb8a7 on base main; canonical task state normalized after shipment."
doc_version: 3
doc_updated_at: "2026-05-06T12:21:33.425Z"
doc_updated_by: "INTEGRATOR"
description: "Define the persisted task-local resolved blueprint snapshot schema for v0.5, including blueprint id/version, route, evidence checklist, policy modules, context budget, stop rules, recipe contributions, resolver input digest, and compatibility metadata."
sections:
  Summary: |-
    Define resolved blueprint snapshot schema
    
    Define the persisted task-local resolved blueprint snapshot schema for v0.5, including blueprint id/version, route, evidence checklist, policy modules, context budget, stop rules, recipe contributions, resolver input digest, and compatibility metadata.
  Scope: |-
    - In scope: Define the persisted task-local resolved blueprint snapshot schema for v0.5, including blueprint id/version, route, evidence checklist, policy modules, context budget, stop rules, recipe contributions, resolver input digest, and compatibility metadata.
    - Out of scope: unrelated refactors not required for "Define resolved blueprint snapshot schema".
  Plan: |-
    Implement the foundational resolved blueprint snapshot contract.
    
    Steps:
    1. Inspect existing blueprint model, resolver, explain output, and tests.
    2. Add typed snapshot schema for the resolved blueprint decision, including resolver inputs, selected blueprint, nodes, required evidence, stop rules, policy module set, recipe contributions, and stable digest metadata.
    3. Add deterministic serialization/digest helpers and validation helpers without adding command execution behavior.
    4. Export the contract through the existing blueprint module surface.
    5. Add focused tests for determinism, schema coverage, and rejection of malformed snapshots.
    
    Verification:
    - Focused blueprint tests pass.
    - Typecheck or repository bootstrap check passes if practical in this worktree.
    - Task README records evidence and rollback.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T09:24:59.991Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented resolved blueprint snapshot schema, deterministic sha256 digest helpers, canonical JSON serialization, and snapshot validation without adding command execution. Verification passed: bun test packages/agentplane/src/blueprints/snapshot.test.ts packages/agentplane/src/blueprints/resolve.test.ts; bun run typecheck; prettier/eslint on touched blueprint files; git diff --check; bun run framework:dev:bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:20:45.323Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Snapshot contract now captures resolver input, selected blueprint, active nodes, required evidence, policy modules, allowed commands, context budget/manifest, recipe contributions, stop reasons, selection reasons, and digest metadata.
      Impact: Dependent lifecycle tasks can persist, refresh, and compare resolved blueprint snapshots using a stable artifact instead of recomputing opaque resolver state.
      Resolution: Exported snapshot builders and validators from the blueprint public module surface with focused tests for coverage, determinism, and malformed snapshot rejection.
id_source: "generated"
---
