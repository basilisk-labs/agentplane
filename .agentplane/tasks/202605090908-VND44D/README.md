---
id: "202605090908-VND44D"
title: "Split ACR command helper modules"
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
  updated_at: "2026-05-09T09:08:44.192Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T09:12:17.192Z"
  updated_by: "CODER"
  note: "ACR helper split verified with focused tests, typecheck, and hotspot check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split pure ACR helper modules while preserving CLI behavior and release-gate checks."
events:
  -
    type: "status"
    at: "2026-05-09T09:08:45.308Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split pure ACR helper modules while preserving CLI behavior and release-gate checks."
  -
    type: "verify"
    at: "2026-05-09T09:12:17.192Z"
    author: "CODER"
    state: "ok"
    note: "ACR helper split verified with focused tests, typecheck, and hotspot check."
doc_version: 3
doc_updated_at: "2026-05-09T09:12:17.206Z"
doc_updated_by: "CODER"
description: "Reduce the ACR command hotspot by moving pure diff, summary, and remediation helpers into focused modules without changing CLI behavior."
sections:
  Summary: |-
    Split ACR command helper modules
    
    Reduce the ACR command hotspot by moving pure diff, summary, and remediation helpers into focused modules without changing CLI behavior.
  Scope: |-
    - In scope: Reduce the ACR command hotspot by moving pure diff, summary, and remediation helpers into focused modules without changing CLI behavior.
    - Out of scope: unrelated refactors not required for "Split ACR command helper modules".
  Plan: |-
    1. Move ACR diff summarization helpers into a focused diff module while preserving generated ACR file shape.
    2. Move ACR summary rendering into a focused summary module.
    3. Move ACR validation error remediation into a focused remediation module.
    4. Keep command specs and handlers stable, then verify with ACR tests, typecheck, hotspots, and formatting.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T09:12:17.192Z — VERIFY — ok
    
    By: CODER
    
    Note: ACR helper split verified with focused tests, typecheck, and hotspot check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T09:08:45.316Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605090908-VND44D/blueprint/resolved-snapshot.json
    - old_digest: e66ba9f7a2c9edcc587fd256ce0fbf19cc44c82ea7296a73425ebda8f05f8cb9
    - current_digest: e66ba9f7a2c9edcc587fd256ce0fbf19cc44c82ea7296a73425ebda8f05f8cb9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605090908-VND44D
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/commands/acr/acr.command.test.ts | Result: pass | Evidence: 10 tests passed. Scope: ACR command semantics and schema write path.\nCommand: bun run typecheck | Result: pass | Evidence: tsc -b completed. Scope: workspace TypeScript contracts.\nCommand: bun run hotspots:check | Result: pass | Evidence: threshold check passed; ACR remains allow-listed and reduced to 1090 LoC. Scope: hotspot guard.
      Impact: Pure helper extraction only; CLI command specs and handlers remain stable.
      Resolution: Moved ACR diff, summary, and validation remediation helpers into focused modules.
id_source: "generated"
---
