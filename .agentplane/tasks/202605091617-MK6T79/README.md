---
id: "202605091617-MK6T79"
title: "Update evaluator/docs and operational guidance"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605091617-83FQ3C"
tags:
  - "docs"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T16:18:19.048Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T16:46:42.050Z"
  updated_by: "DOCS"
  note: "Verified bounded evaluator documentation."
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Проверка обновления документации по итерационному циклу и правилам возврата."
  -
    author: "DOCS"
    body: "Start: document bounded evaluator rework behavior inside the parent evaluator-loop batch."
events:
  -
    type: "status"
    at: "2026-05-09T16:42:27.286Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Проверка обновления документации по итерационному циклу и правилам возврата."
  -
    type: "status"
    at: "2026-05-09T16:42:38.872Z"
    author: "DOCS"
    from: "DOING"
    to: "DOING"
    note: "Start: document bounded evaluator rework behavior inside the parent evaluator-loop batch."
  -
    type: "verify"
    at: "2026-05-09T16:43:26.260Z"
    author: "DOCS"
    state: "ok"
    note: "Документация по ограничению итераций и возврату на предыдущего агента добавлена/обновлена в evaluator docs."
  -
    type: "verify"
    at: "2026-05-09T16:46:42.050Z"
    author: "DOCS"
    state: "ok"
    note: "Verified bounded evaluator documentation."
doc_version: 3
doc_updated_at: "2026-05-09T16:46:42.068Z"
doc_updated_by: "DOCS"
description: "Document how EVALUATOR verdicts are applied, rework loop boundaries, max attempts behavior, and when blocked_external is triggered before returning to next agent."
sections:
  Summary: |-
    Update evaluator/docs and operational guidance
    
    Document how EVALUATOR verdicts are applied, rework loop boundaries, max attempts behavior, and when blocked_external is triggered before returning to next agent.
  Scope: |-
    - In scope: Document how EVALUATOR verdicts are applied, rework loop boundaries, max attempts behavior, and when blocked_external is triggered before returning to next agent.
    - Out of scope: unrelated refactors not required for "Update evaluator/docs and operational guidance".
  Plan: "Scope: update evaluator and task-lifecycle docs describing bounded loop behavior, rework return flow to previous agent, and configuration knob semantics."
  Verify Steps: |-
    1. Review the requested outcome for "Update evaluator/docs and operational guidance". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T16:43:26.260Z — VERIFY — ok
    
    By: DOCS
    
    Note: Документация по ограничению итераций и возврату на предыдущего агента добавлена/обновлена в evaluator docs.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T16:42:38.900Z, excerpt_hash=sha256:93193f81c0e07619ed5c9ed09b1261823dfda3aa83764444abce6ca579b57647
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091617-83FQ3C-bounded-evaluator-loop/.agentplane/tasks/202605091617-MK6T79/blueprint/resolved-snapshot.json
    - old_digest: 94cb0e4d966795685f81e6201831085bcce33169a543bed921399589f9c52a60
    - current_digest: 94cb0e4d966795685f81e6201831085bcce33169a543bed921399589f9c52a60
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091617-MK6T79
    
    ### 2026-05-09T16:46:42.050Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified bounded evaluator documentation.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T16:43:26.277Z, excerpt_hash=sha256:93193f81c0e07619ed5c9ed09b1261823dfda3aa83764444abce6ca579b57647
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091617-83FQ3C-bounded-evaluator-loop/.agentplane/tasks/202605091617-MK6T79/blueprint/resolved-snapshot.json
    - old_digest: 94cb0e4d966795685f81e6201831085bcce33169a543bed921399589f9c52a60
    - current_digest: 94cb0e4d966795685f81e6201831085bcce33169a543bed921399589f9c52a60
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091617-MK6T79
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks: docs text review plus typecheck, schemas:check, and lint:core for touched code.
      Impact: Operator guidance now documents bounded rework attempts and explicit blocked_external behavior.
      Resolution: Updated evaluation and recursive improvement documentation in English.
id_source: "generated"
---
