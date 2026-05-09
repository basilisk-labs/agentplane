---
id: "202605090759-1KPX8Z"
title: "Harden cloud sync and ACR git helpers"
status: "DOING"
priority: "high"
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
  updated_at: "2026-05-09T08:00:08.361Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement cloud sync release blockers and ACR git-helper consolidation with focused verification."
events:
  -
    type: "status"
    at: "2026-05-09T08:00:09.531Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement cloud sync release blockers and ACR git-helper consolidation with focused verification."
doc_version: 3
doc_updated_at: "2026-05-09T08:00:09.539Z"
doc_updated_by: "CODER"
description: "Fix cloud backend release blockers around freshness timestamps, request timeouts, transient retry behavior, cloud diagnostics, and ACR git helper duplication."
sections:
  Summary: |-
    Harden cloud sync and ACR git helpers
    
    Fix cloud backend release blockers around freshness timestamps, request timeouts, transient retry behavior, cloud diagnostics, and ACR git helper duplication.
  Scope: |-
    - In scope: Fix cloud backend release blockers around freshness timestamps, request timeouts, transient retry behavior, cloud diagnostics, and ACR git helper duplication.
    - Out of scope: unrelated refactors not required for "Harden cloud sync and ACR git helpers".
  Plan: |-
    1. Preserve cloud freshness semantics: push must only advance last_checked_at from a service timestamp; pull may use a local fallback only after a successful no-op projection refresh.
    2. Add bounded cloud request timeouts, transient batch retry handling, and actionable backend inspect diagnostics for .env overrides and remote sync-state.
    3. Replace ACR-local git process helpers with core/git helpers and add focused coverage for the new core git APIs.
    4. Verify with focused tests, typecheck, package builds, hotspot, knip, policy routing, and a live patched CLI cloud inspect/pull probe.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
