---
id: "202605090917-VMPWJP"
title: "Split ACR generation module"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T09:17:09.766Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T09:20:42.358Z"
  updated_by: "CODER"
  note: "ACR generation split verified with focused tests, typecheck, and hotspot check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split ACR generation logic into a focused module while preserving generated record output."
events:
  -
    type: "status"
    at: "2026-05-09T09:17:14.064Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split ACR generation logic into a focused module while preserving generated record output."
  -
    type: "verify"
    at: "2026-05-09T09:20:42.358Z"
    author: "CODER"
    state: "ok"
    note: "ACR generation split verified with focused tests, typecheck, and hotspot check."
doc_version: 3
doc_updated_at: "2026-05-09T09:20:42.380Z"
doc_updated_by: "CODER"
description: "Move ACR generation, blueprint extension builders, and generation-only helpers into a focused module without changing generated ACR output."
sections:
  Summary: |-
    Split ACR generation module
    
    Move ACR generation, blueprint extension builders, and generation-only helpers into a focused module without changing generated ACR output.
  Scope: |-
    - In scope: Move ACR generation, blueprint extension builders, and generation-only helpers into a focused module without changing generated ACR output.
    - Out of scope: unrelated refactors not required for "Split ACR generation module".
  Plan: |-
    1. Move generateAcr and generation-only helpers into commands/acr/generate.ts while preserving generated ACR shape.
    2. Move blueprint extension/snapshot projection builders with generateAcr, keeping command handlers and specs in acr.command.ts.
    3. Keep writeAcrFile and validation APIs stable from acr.command.ts through re-exports or narrow imports as needed.
    4. Verify with ACR tests, typecheck, hotspots check, and line-count review.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T09:20:42.358Z — VERIFY — ok
    
    By: CODER
    
    Note: ACR generation split verified with focused tests, typecheck, and hotspot check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T09:17:14.075Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605090917-VMPWJP/blueprint/resolved-snapshot.json
    - old_digest: fa99eef09e18edac74063fd6f1243c88c7bcf888bcefe13f25d8f819a954f0ea
    - current_digest: fa99eef09e18edac74063fd6f1243c88c7bcf888bcefe13f25d8f819a954f0ea
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605090917-VMPWJP
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/commands/acr/acr.command.test.ts | Result: pass | Evidence: 10 tests passed. Scope: ACR command specs and CI semantic assertions.\nCommand: bun run typecheck | Result: pass | Evidence: tsc -b completed. Scope: workspace TypeScript contracts after generation module split.\nCommand: bun run hotspots:check | Result: pass | Evidence: threshold check passed; acr.command.ts is 458 LoC and generate.ts is 438 LoC. Scope: hotspot guard and ACR line-count regression.
      Impact: Generation logic moved to commands/acr/generate.ts; command handlers and exported generateAcr API remain available.
      Resolution: Split ACR generation, blueprint projection, Git range, verification-check inference, and residual-risk helpers into a focused generation module.
id_source: "generated"
---
