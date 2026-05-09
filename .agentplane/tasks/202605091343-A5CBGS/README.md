---
id: "202605091343-A5CBGS"
title: "Deduplicate GitHub transport sleep helper"
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
  updated_at: "2026-05-09T13:43:25.192Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T13:48:36.189Z"
  updated_by: "CODER"
  note: "Shared sleep helper reuse verified."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Deduplicate the GitHub transport sleep helper by importing the existing shared concurrency helper and verifying retry behavior stays unchanged."
events:
  -
    type: "status"
    at: "2026-05-09T13:44:08.198Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Deduplicate the GitHub transport sleep helper by importing the existing shared concurrency helper and verifying retry behavior stays unchanged."
  -
    type: "verify"
    at: "2026-05-09T13:48:36.189Z"
    author: "CODER"
    state: "ok"
    note: "Shared sleep helper reuse verified."
doc_version: 3
doc_updated_at: "2026-05-09T13:48:36.199Z"
doc_updated_by: "CODER"
description: "Replace the local gh-transport sleep helper with the existing shared task-backend concurrency helper to remove one duplicate sleep implementation without changing retry behavior."
sections:
  Summary: |-
    Deduplicate GitHub transport sleep helper
    
    Replace the local gh-transport sleep helper with the existing shared task-backend concurrency helper to remove one duplicate sleep implementation without changing retry behavior.
  Scope: |-
    - In scope: Replace the local gh-transport sleep helper with the existing shared task-backend concurrency helper to remove one duplicate sleep implementation without changing retry behavior.
    - Out of scope: unrelated refactors not required for "Deduplicate GitHub transport sleep helper".
  Plan: |-
    1. Replace the local sleep helper in gh-transport with the existing shared concurrency sleep import.
    2. Keep retry semantics and transient/permanent error classification unchanged.
    3. Verify the focused gh transport tests or dependent PR/transport tests, plus typecheck, lint, and hotspot check.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T13:48:36.189Z — VERIFY — ok
    
    By: CODER
    
    Note: Shared sleep helper reuse verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T13:44:08.206Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Replaced the GitHub transport local sleep implementation with the shared task-backend concurrency helper while preserving the zero-delay retry path. Checks passed: focused Vitest PR/transport-adjacent suite; bun run typecheck; bun run hotspots:check; bun run lint:core. rg confirms only the shared task-backend sleep helper remains in the relevant agentplane transport/backend paths.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091343-A5CBGS-dedupe-gh-sleep/.agentplane/tasks/202605091343-A5CBGS/blueprint/resolved-snapshot.json
    - old_digest: a1256b0d16877f024ac814c3773fcc7cdbb11b0236e11c19a7af10b248944c2a
    - current_digest: a1256b0d16877f024ac814c3773fcc7cdbb11b0236e11c19a7af10b248944c2a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091343-A5CBGS
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
