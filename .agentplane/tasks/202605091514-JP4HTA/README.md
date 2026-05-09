---
id: "202605091514-JP4HTA"
title: "Harden managed hook fallback policy"
result_summary: "Merged via PR #3511."
status: "DONE"
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
  updated_at: "2026-05-09T15:15:01.519Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T15:17:48.901Z"
  updated_by: "CODER"
  note: "Managed hook fallback hardening verified."
commit:
  hash: "0e3eb27dc3b7f244b44585d5121b2366c84771ab"
  message: "Merge pull request #3511 from basilisk-labs/task/202605091514-JP4HTA/hook-global-fallback"
comments:
  -
    author: "CODER"
    body: "Start: harden managed hook fallback behavior so global agentplane execution is explicit opt-in."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3511 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-09T15:15:02.345Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden managed hook fallback behavior so global agentplane execution is explicit opt-in."
  -
    type: "verify"
    at: "2026-05-09T15:17:48.901Z"
    author: "CODER"
    state: "ok"
    note: "Managed hook fallback hardening verified."
  -
    type: "status"
    at: "2026-05-09T15:21:19.419Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3511 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-09T15:21:19.426Z"
doc_updated_by: "INTEGRATOR"
description: "Require explicit opt-in before managed hook shims fall back to a global agentplane runner, and make installed hook wrappers fail with actionable local-shim recovery guidance when the repository shim is missing."
sections:
  Summary: |-
    Harden managed hook fallback policy
    
    Require explicit opt-in before managed hook shims fall back to a global agentplane runner, and make installed hook wrappers fail with actionable local-shim recovery guidance when the repository shim is missing.
  Scope: |-
    - In scope: Require explicit opt-in before managed hook shims fall back to a global agentplane runner, and make installed hook wrappers fail with actionable local-shim recovery guidance when the repository shim is missing.
    - Out of scope: unrelated refactors not required for "Harden managed hook fallback policy".
  Plan: |-
    1. Keep the managed hook shim local-first and require AGENTPLANE_HOOK_ALLOW_GLOBAL=1 before using a global agentplane fallback.
    2. Make installed hook wrappers fail with clear local-shim recovery guidance when the repo shim is absent.
    3. Update hook readiness diagnostics and runtime/hook tests for the new fallback contract, then run focused tests and typecheck.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T15:17:48.901Z — VERIFY — ok
    
    By: CODER
    
    Note: Managed hook fallback hardening verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T15:15:02.361Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Updated installed hook wrappers, shared hook shim template, bootstrap-framework-dev shim generation, and doctor readiness diagnostics to remove automatic global/npx fallback. Global agentplane fallback now requires AGENTPLANE_HOOK_ALLOW_GLOBAL=1; missing local shims fail with actionable recovery guidance. Checks passed: bun run framework:dev:bootstrap; bun run typecheck; focused Vitest hook/runtime suite (5 files, 37 tests); targeted eslint on touched files. Also scanned scripts and agentplane src for old AGENTPLANE_HOOK_ALLOW_NPX/npx fallback strings; none remain.
    
    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091515-hook-global-fallback/.agentplane/tasks/202605091514-JP4HTA/blueprint/resolved-snapshot.json
    - old_digest: 4d02de9ab1dde116fa0fca11e7a82e0fea66dbb15a33f3b88315f93fee9b9988
    - current_digest: 8aca6e850bc29945ee26d0026553e1afdf4e0e82398f32b4348c175a5debe964
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091514-JP4HTA
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
