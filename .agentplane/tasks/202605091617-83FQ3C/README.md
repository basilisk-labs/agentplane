---
id: "202605091617-83FQ3C"
title: "Introduce bounded EVALUATOR rework loop with return-to-previous-agent"
status: "DOING"
priority: "med"
owner: "PLANNER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T16:17:27.766Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T16:46:24.391Z"
  updated_by: "CODER"
  note: "Verified bounded evaluator rework loop batch."
  attempts: 0
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: begin implementation design, split into atomic tasks for bounded rework loop in evaluator."
  -
    author: "PLANNER"
    body: "Start: task approved and worktree created; proceeding with atomic subtask decomposition and implementation handoff through bounded evaluator loop tasks."
events:
  -
    type: "status"
    at: "2026-05-09T16:17:30.946Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: begin implementation design, split into atomic tasks for bounded rework loop in evaluator."
  -
    type: "status"
    at: "2026-05-09T16:18:31.684Z"
    author: "PLANNER"
    from: "DOING"
    to: "DOING"
    note: "Start: task approved and worktree created; proceeding with atomic subtask decomposition and implementation handoff through bounded evaluator loop tasks."
  -
    type: "verify"
    at: "2026-05-09T16:46:24.391Z"
    author: "CODER"
    state: "ok"
    note: "Verified bounded evaluator rework loop batch."
doc_version: 3
doc_updated_at: "2026-05-09T16:46:24.421Z"
doc_updated_by: "PLANNER"
description: "Add bounded evaluation loop so results are reviewed against task goals, best coding practices, and repository rules; on rework return to previous agent with reason and max-attempts guard in configuration/settings."
sections:
  Summary: |-
    Introduce bounded EVALUATOR rework loop with return-to-previous-agent
    
    Add bounded evaluation loop so results are reviewed against task goals, best coding practices, and repository rules; on rework return to previous agent with reason and max-attempts guard in configuration/settings.
  Scope: |-
    - In scope: Add bounded evaluation loop so results are reviewed against task goals, best coding practices, and repository rules; on rework return to previous agent with reason and max-attempts guard in configuration/settings.
    - Out of scope: unrelated refactors not required for "Introduce bounded EVALUATOR rework loop with return-to-previous-agent".
  Plan: "Plan: 1) Проверить и зафиксировать, что роль EVALUATOR существует и уже умеет pass/rework/blocked_external в cfg/verdict pipeline. 2) Ввести настраиваемый лимит попыток max_rework_attempts и сохранять счетчик verification.attempts в артефактах. 3) Изменить transition/verify flow: на rework увеличивать attempts и возвращать задачу для доработки, при достижении лимита ставить blocked_external с BLOCKED статусом. 4) Описать поведение и процедуру повторной оценки в документах и связать с best-practice проверками. 5) Добавить проверки и обеспечить atomic-цепочку задач в branch_pr_worktree."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T16:46:24.391Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified bounded evaluator rework loop batch.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T16:18:31.707Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091617-83FQ3C-bounded-evaluator-loop/.agentplane/tasks/202605091617-83FQ3C/blueprint/resolved-snapshot.json
    - old_digest: 75724ec790691d07f4f9f827d4bfa07512062e0ebde0afbcbd21d032c8c55b67
    - current_digest: 75724ec790691d07f4f9f827d4bfa07512062e0ebde0afbcbd21d032c8c55b67
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091617-83FQ3C
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks: bun run typecheck; bunx vitest run workflow-transition-service.unit.test.ts verify-record.unit.test.ts task-store.test.ts; bun run schemas:check; bun run lint:core.
      Impact: Evaluator rework now records attempts, returns within limit, and blocks when the next attempt exceeds evaluator.max_rework_attempts.
      Resolution: Implemented attempts tracking, blocked_external terminal guard, config propagation, schemas, docs, and focused tests.
id_source: "generated"
---
