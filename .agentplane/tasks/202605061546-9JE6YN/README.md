---
id: "202605061546-9JE6YN"
title: "Expose blueprint route in task lifecycle surfaces"
result_summary: "Merged via PR #983."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T15:47:26.499Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T15:55:19.567Z"
  updated_by: "CODER"
  note: "Verified: task show/list/verify-show expose resolved blueprint route; focused lifecycle and blueprint tests, typecheck, docs:cli:check, routing, doctor, and diff check passed."
commit:
  hash: "75ccb30824fb162d724b0fdc9d1a290c93293a2a"
  message: "Merge pull request #983 from basilisk-labs/task/202605061546-9JE6YN/blueprint-task-lifecycle"
comments:
  -
    author: "CODER"
    body: "Start: Implement blueprint route visibility on task lifecycle read surfaces in the approved primary worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #983 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-06T15:47:53.078Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement blueprint route visibility on task lifecycle read surfaces in the approved primary worktree."
  -
    type: "verify"
    at: "2026-05-06T15:55:19.567Z"
    author: "CODER"
    state: "ok"
    note: "Verified: task show/list/verify-show expose resolved blueprint route; focused lifecycle and blueprint tests, typecheck, docs:cli:check, routing, doctor, and diff check passed."
  -
    type: "status"
    at: "2026-05-06T16:01:13.336Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #983 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-06T16:01:13.343Z"
doc_updated_by: "INTEGRATOR"
description: "Show resolved blueprint route on task show, task list, and task verify-show so agents can see the selected route without running separate blueprint diagnostics."
sections:
  Summary: |-
    Expose blueprint route in task lifecycle surfaces
    
    Show resolved blueprint route on task show, task list, and task verify-show so agents can see the selected route without running separate blueprint diagnostics.
  Scope: |-
    - In scope: Show resolved blueprint route on task show, task list, and task verify-show so agents can see the selected route without running separate blueprint diagnostics.
    - Out of scope: unrelated refactors not required for "Expose blueprint route in task lifecycle surfaces".
  Plan: "Primary batch task. Scope: expose resolved blueprint information directly in task lifecycle read surfaces: task show JSON, task list text/JSON where practical, and task verify-show contract output. Keep blueprint resolver semantics unchanged. Include related docs task 202605061546-6XX986 in the same branch/worktree. Verification: focused task listing/show tests, blueprint lifecycle output checks, docs CLI generation/check if specs change, typecheck, ap doctor, routing check, diff check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T15:55:19.567Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: task show/list/verify-show expose resolved blueprint route; focused lifecycle and blueprint tests, typecheck, docs:cli:check, routing, doctor, and diff check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T15:47:53.078Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605061546-9JE6YN-blueprint-task-lifecycle/.agentplane/tasks/202605061546-9JE6YN/blueprint/resolved-snapshot.json
    - old_digest: 16a1e2be26607066269fa872341b581dfa869ef4da3bfc1562c21338fbbd421d
    - current_digest: 16a1e2be26607066269fa872341b581dfa869ef4da3bfc1562c21338fbbd421d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605061546-9JE6YN
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
