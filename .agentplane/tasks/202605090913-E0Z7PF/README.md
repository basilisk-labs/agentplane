---
id: "202605090913-E0Z7PF"
title: "Split ACR validation module"
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
  updated_at: "2026-05-09T09:13:25.474Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T09:16:35.797Z"
  updated_by: "CODER"
  note: "ACR validation split verified with focused tests, typecheck, and hotspot check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split ACR validation helpers into a focused module while preserving command behavior."
events:
  -
    type: "status"
    at: "2026-05-09T09:13:33.287Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split ACR validation helpers into a focused module while preserving command behavior."
  -
    type: "verify"
    at: "2026-05-09T09:16:35.797Z"
    author: "CODER"
    state: "ok"
    note: "ACR validation split verified with focused tests, typecheck, and hotspot check."
doc_version: 3
doc_updated_at: "2026-05-09T09:16:35.811Z"
doc_updated_by: "CODER"
description: "Move ACR validation target, CI semantics, and validation output helpers into a focused validation module without changing ACR CLI behavior."
sections:
  Summary: |-
    Split ACR validation module
    
    Move ACR validation target, CI semantics, and validation output helpers into a focused validation module without changing ACR CLI behavior.
  Scope: |-
    - In scope: Move ACR validation target, CI semantics, and validation output helpers into a focused validation module without changing ACR CLI behavior.
    - Out of scope: unrelated refactors not required for "Split ACR validation module".
  Plan: |-
    1. Move ACR target loading, validation result emission, and CI semantic assertion helpers into commands/acr/validate.ts.
    2. Preserve exported command entrypoints from acr.command.ts and keep validation behavior/error messages stable.
    3. Verify with ACR tests, typecheck, hotspots check, and review line-count impact.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T09:16:35.797Z — VERIFY — ok
    
    By: CODER
    
    Note: ACR validation split verified with focused tests, typecheck, and hotspot check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T09:13:33.296Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605090913-E0Z7PF/blueprint/resolved-snapshot.json
    - old_digest: c05d4162b249eda54b60dba82af8a8e9e04bc9caa9d2e10599578cdd4e64dadc
    - current_digest: c05d4162b249eda54b60dba82af8a8e9e04bc9caa9d2e10599578cdd4e64dadc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605090913-E0Z7PF
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/commands/acr/acr.command.test.ts | Result: pass | Evidence: 10 tests passed. Scope: ACR command specs and CI semantic assertions.\nCommand: bun run typecheck | Result: pass | Evidence: tsc -b completed. Scope: workspace TypeScript contracts after validation module split.\nCommand: bun run hotspots:check | Result: pass | Evidence: threshold check passed; acr.command.ts reduced to 886 LoC and validate.ts is 230 LoC. Scope: hotspot guard.
      Impact: Validation logic moved to commands/acr/validate.ts; exported ACR command API preserved through re-export.
      Resolution: Split ACR validation target loading, CI semantics, and validation output helpers into a focused module.
id_source: "generated"
---
