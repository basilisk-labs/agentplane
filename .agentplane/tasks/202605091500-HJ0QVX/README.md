---
id: "202605091500-HJ0QVX"
title: "Deduplicate agentplane utility guards"
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
  updated_at: "2026-05-09T15:00:44.989Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T15:02:45.991Z"
  updated_by: "CODER"
  note: "Agentplane shared guard batch verified."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Replace a low-risk batch of local agentplane isRecord helpers with the canonical shared guard."
events:
  -
    type: "status"
    at: "2026-05-09T15:00:45.858Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Replace a low-risk batch of local agentplane isRecord helpers with the canonical shared guard."
  -
    type: "verify"
    at: "2026-05-09T15:02:45.991Z"
    author: "CODER"
    state: "ok"
    note: "Agentplane shared guard batch verified."
doc_version: 3
doc_updated_at: "2026-05-09T15:02:45.999Z"
doc_updated_by: "CODER"
description: "Replace a first low-risk batch of local agentplane isRecord helpers with the canonical shared guard without changing behavior."
sections:
  Summary: |-
    Deduplicate agentplane utility guards
    
    Replace a first low-risk batch of local agentplane isRecord helpers with the canonical shared guard without changing behavior.
  Scope: |-
    - In scope: Replace a first low-risk batch of local agentplane isRecord helpers with the canonical shared guard without changing behavior.
    - Out of scope: unrelated refactors not required for "Deduplicate agentplane utility guards".
  Plan: |-
    1. Replace local isRecord helpers in a low-risk batch of agentplane CLI/runtime utility files with imports from packages/agentplane/src/shared/guards.ts.
    2. Keep exported guard surfaces that may be imported elsewhere out of this batch.
    3. Run focused tests/typecheck and scan remaining local isRecord definitions.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T15:02:45.991Z — VERIFY — ok
    
    By: CODER
    
    Note: Agentplane shared guard batch verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T15:00:45.872Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Replaced local isRecord helpers in task-index, blueprint snapshot, blueprint catalog, runner result manifest, and prompt-fragments JSON with the canonical shared guard. Exported guard surfaces and higher-coupling runtime/cloud validators were left for separate atoms. Checks passed: bun run typecheck; targeted eslint on touched files; focused Vitest task-index, blueprint snapshot, runner result manifest, and prompt-fragments JSON suites (4 files, 17 tests). Duplicate scan shows remaining agentplane isRecord definitions reduced to canonical/shared, exported surfaces, and future batches.
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/codex-v05-clean-base/.agentplane/tasks/202605091500-HJ0QVX/blueprint/resolved-snapshot.json
    - old_digest: 0076bbdda24fa58d4eb86dba1b4890ac04f32b0574101dc3dddcac2a46a040ea
    - current_digest: 0076bbdda24fa58d4eb86dba1b4890ac04f32b0574101dc3dddcac2a46a040ea
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091500-HJ0QVX
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
