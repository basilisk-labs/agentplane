---
id: "202605091355-S6ZHV4"
title: "Deduplicate core type guards"
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
  updated_at: "2026-05-09T13:55:31.185Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T14:00:17.297Z"
  updated_by: "CODER"
  note: "Core guard deduplication verified."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Deduplicate internal core type guards with a narrow helper and preserve existing config/task parsing behavior."
events:
  -
    type: "status"
    at: "2026-05-09T13:55:54.430Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Deduplicate internal core type guards with a narrow helper and preserve existing config/task parsing behavior."
  -
    type: "verify"
    at: "2026-05-09T14:00:17.297Z"
    author: "CODER"
    state: "ok"
    note: "Core guard deduplication verified."
doc_version: 3
doc_updated_at: "2026-05-09T14:00:17.310Z"
doc_updated_by: "CODER"
description: "Create one internal core type guard helper and replace duplicated isRecord/isStringArray implementations inside packages/core without changing public package exports."
sections:
  Summary: |-
    Deduplicate core type guards
    
    Create one internal core type guard helper and replace duplicated isRecord/isStringArray implementations inside packages/core without changing public package exports.
  Scope: |-
    - In scope: Create one internal core type guard helper and replace duplicated isRecord/isStringArray implementations inside packages/core without changing public package exports.
    - Out of scope: unrelated refactors not required for "Deduplicate core type guards".
  Plan: |-
    1. Add one internal core guard module for shared record/string-array checks.
    2. Replace duplicated guards in packages/core config/tasks modules with imports from that helper.
    3. Run focused core tests and typecheck to confirm behavior is unchanged.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T14:00:17.297Z — VERIFY — ok
    
    By: CODER
    
    Note: Core guard deduplication verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T13:55:54.440Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Added one internal packages/core/src/types/guards.ts helper and replaced duplicated core-local isRecord/isStringArray implementations in config and task modules. Preserved the stricter tasks-lint non-empty string array behavior via isNonEmptyStringArray and kept task-artifact-schema.shared isRecord as a compatibility re-export. Checks passed: bun run --filter=@agentplaneorg/core typecheck; focused Vitest suite for config, task artifact schema, task README, task store, tasks export, and tasks lint (7 files, 89 tests); bun run lint:core. Duplicate scan now shows guard function definitions only in packages/core/src/types/guards.ts.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091355-S6ZHV4-core-guards/.agentplane/tasks/202605091355-S6ZHV4/blueprint/resolved-snapshot.json
    - old_digest: bf82dde7e1c415cfc6837b90a1096f18499769df3a2608529092a96aaecb8fa9
    - current_digest: bf82dde7e1c415cfc6837b90a1096f18499769df3a2608529092a96aaecb8fa9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091355-S6ZHV4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
