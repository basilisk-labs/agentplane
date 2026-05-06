---
id: "202605060915-SZVSYK"
title: "Validate recipe hints against resolved blueprint extension points"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605060915-Y5D85M"
  - "202605060915-YN0VAQ"
tags:
  - "blueprints"
  - "code"
  - "recipes"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T10:12:37.963Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T10:14:12.207Z"
  updated_by: "CODER"
  note: "Verified: recipe hints can be validated explicitly against selected blueprint extension points."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Exposing explicit recipe hint validation against blueprint extension points; dependency Y5D85M is verified and committed in this stacked branch."
events:
  -
    type: "status"
    at: "2026-05-06T10:12:38.164Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Exposing explicit recipe hint validation against blueprint extension points; dependency Y5D85M is verified and committed in this stacked branch."
  -
    type: "verify"
    at: "2026-05-06T10:14:12.207Z"
    author: "CODER"
    state: "ok"
    note: "Verified: recipe hints can be validated explicitly against selected blueprint extension points."
doc_version: 3
doc_updated_at: "2026-05-06T10:14:12.211Z"
doc_updated_by: "CODER"
description: "Validate normalized recipe hints against the selected blueprint extension points and reject protected lifecycle overrides deterministically."
sections:
  Summary: |-
    Validate recipe hints against resolved blueprint extension points
    
    Validate normalized recipe hints against the selected blueprint extension points and reject protected lifecycle overrides deterministically.
  Scope: |-
    - In scope: Validate normalized recipe hints against the selected blueprint extension points and reject protected lifecycle overrides deterministically.
    - Out of scope: unrelated refactors not required for "Validate recipe hints against resolved blueprint extension points".
  Plan: "Expose recipe hint validation against a resolved blueprint as an explicit helper. Reuse the existing extension-point acceptance/rejection semantics, export the helper through the blueprints index, and add focused tests for accepted, rejected, and inactive-node hints."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T10:14:12.207Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: recipe hints can be validated explicitly against selected blueprint extension points.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:12:38.164Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-Y5D85M-blueprint-recipes/.agentplane/tasks/202605060915-SZVSYK/blueprint/resolved-snapshot.json
    - old_digest: dfb492257f1c1c226b164f139c9a83ad411b1d1307cafe7461f2393c6b4ae905
    - current_digest: dfb492257f1c1c226b164f139c9a83ad411b1d1307cafe7461f2393c6b4ae905
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-SZVSYK
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/recipe-hints.test.ts; Result: pass; Evidence: 23 tests passed. Command: bun run typecheck; Result: pass. Command: bunx prettier --check touched resolver files; Result: pass. Command: bunx eslint touched resolver files; Result: pass. Command: git diff --check; Result: pass.
      Impact: Future recipe/blueprint commands can explain accepted and rejected hints through a reusable validation helper.
      Resolution: Exported validateRecipeHintsForBlueprint and reused it from resolveBlueprint with focused coverage.
id_source: "generated"
---
