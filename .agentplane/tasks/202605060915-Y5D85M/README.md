---
id: "202605060915-Y5D85M"
title: "Normalize recipe blueprint hints v2"
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
  - "recipes"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T10:11:17.273Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T10:12:17.606Z"
  updated_by: "CODER"
  note: "Verified: recipe blueprint hints now normalize to a v2 provenance-bearing contract."
commit:
  hash: "0be0fd6e4c4e400cc393ecec9884083b620c0812"
  message: "Shipped on main before canonical task closure"
comments:
  -
    author: "CODER"
    body: "Start: Implementing v2 normalization for recipe-derived blueprint hints in the recipes epic branch."
events:
  -
    type: "status"
    at: "2026-05-06T10:11:17.482Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing v2 normalization for recipe-derived blueprint hints in the recipes epic branch."
  -
    type: "verify"
    at: "2026-05-06T10:12:17.606Z"
    author: "CODER"
    state: "ok"
    note: "Verified: recipe blueprint hints now normalize to a v2 provenance-bearing contract."
  -
    type: "status"
    at: "2026-05-06T12:21:33.425Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Local branch_pr reconciliation detected task commit 0be0fd6e4c4e on base main; canonical task state normalized after shipment."
doc_version: 3
doc_updated_at: "2026-05-06T12:21:33.506Z"
doc_updated_by: "CODER"
description: "Finalize recipe blueprint hint normalization for v0.5, including preferred_blueprint, risk hints, evidence requirements, output schemas, artifact templates, and context hints."
sections:
  Summary: |-
    Normalize recipe blueprint hints v2
    
    Finalize recipe blueprint hint normalization for v0.5, including preferred_blueprint, risk hints, evidence requirements, output schemas, artifact templates, and context hints.
  Scope: |-
    - In scope: Finalize recipe blueprint hint normalization for v0.5, including preferred_blueprint, risk hints, evidence requirements, output schemas, artifact templates, and context hints.
    - Out of scope: unrelated refactors not required for "Normalize recipe blueprint hints v2".
  Plan: "Normalize recipe-derived blueprint hints as a v2 contract. Add explicit schemaVersion/source/matchReasons metadata to RecipeHint conversion while preserving existing resolver behavior and add focused tests for deterministic normalized hints."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T10:12:17.606Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: recipe blueprint hints now normalize to a v2 provenance-bearing contract.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:11:17.482Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-Y5D85M-blueprint-recipes/.agentplane/tasks/202605060915-Y5D85M/blueprint/resolved-snapshot.json
    - old_digest: 19516cf86001ab973fbdd821f3812c6687d110fef426ef942dec00519c23d6f0
    - current_digest: 19516cf86001ab973fbdd821f3812c6687d110fef426ef942dec00519c23d6f0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-Y5D85M
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/blueprints/recipe-hints.test.ts packages/agentplane/src/blueprints/resolve.test.ts; Result: pass; Evidence: 22 tests passed. Command: bun run typecheck; Result: pass. Command: bunx prettier --check touched recipe hint files; Result: pass. Command: bunx eslint touched recipe hint files; Result: pass. Command: git diff --check; Result: pass.
      Impact: Resolved blueprint plans can explain recipe hint provenance without re-reading recipe manifests.
      Resolution: Added RecipeHint schemaVersion/source/matchReasons and focused normalization coverage.
id_source: "generated"
---
