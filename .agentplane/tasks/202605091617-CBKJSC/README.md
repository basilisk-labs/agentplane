---
id: "202605091617-CBKJSC"
title: "Add max_rework_attempts configuration surface"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605091617-83FQ3C"
tags:
  - "code"
  - "config"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T16:18:18.191Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T16:46:35.349Z"
  updated_by: "CODER"
  note: "Verified max_rework_attempts configuration surface."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Проверка готовности конфигурационного контурa и маппинга новых параметров попыток."
  -
    author: "CODER"
    body: "Start: implement max_rework_attempts configuration surface inside the parent evaluator-loop batch."
events:
  -
    type: "status"
    at: "2026-05-09T16:42:05.900Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Проверка готовности конфигурационного контурa и маппинга новых параметров попыток."
  -
    type: "status"
    at: "2026-05-09T16:42:33.761Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: implement max_rework_attempts configuration surface inside the parent evaluator-loop batch."
  -
    type: "verify"
    at: "2026-05-09T16:43:06.340Z"
    author: "CODER"
    state: "ok"
    note: "Реализованы параметры evaluator.max_rework_attempts и схемы/normalizer, изменения соответствуют требованиям: попытки хранится в verification.attempts и в конфиге есть верхняя граница 1..20."
  -
    type: "verify"
    at: "2026-05-09T16:46:35.349Z"
    author: "CODER"
    state: "ok"
    note: "Verified max_rework_attempts configuration surface."
doc_version: 3
doc_updated_at: "2026-05-09T16:46:35.375Z"
doc_updated_by: "CODER"
description: "Introduce bounded evaluator loop setting with default, validation, and propagation into verification transitions. Ensure the setting is clearly documented in config surfaces and CLI/runtime contract."
sections:
  Summary: |-
    Add max_rework_attempts configuration surface
    
    Introduce bounded evaluator loop setting with default, validation, and propagation into verification transitions. Ensure the setting is clearly documented in config surfaces and CLI/runtime contract.
  Scope: |-
    - In scope: Introduce bounded evaluator loop setting with default, validation, and propagation into verification transitions. Ensure the setting is clearly documented in config surfaces and CLI/runtime contract.
    - Out of scope: unrelated refactors not required for "Add max_rework_attempts configuration surface".
  Plan: "Scope: add configuration parameter for max_rework_attempts with default and persistence path in runtime; include schema updates and CLI/runtime contract notes."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T16:43:06.340Z — VERIFY — ok
    
    By: CODER
    
    Note: Реализованы параметры evaluator.max_rework_attempts и схемы/normalizer, изменения соответствуют требованиям: попытки хранится в verification.attempts и в конфиге есть верхняя граница 1..20.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T16:42:33.793Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091617-83FQ3C-bounded-evaluator-loop/.agentplane/tasks/202605091617-CBKJSC/blueprint/resolved-snapshot.json
    - old_digest: 42f278a3eb7413e9655422dd33866101f5010261585f47063ca1428b23d5c375
    - current_digest: 42f278a3eb7413e9655422dd33866101f5010261585f47063ca1428b23d5c375
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091617-CBKJSC
    
    ### 2026-05-09T16:46:35.349Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified max_rework_attempts configuration surface.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T16:43:06.360Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091617-83FQ3C-bounded-evaluator-loop/.agentplane/tasks/202605091617-CBKJSC/blueprint/resolved-snapshot.json
    - old_digest: 42f278a3eb7413e9655422dd33866101f5010261585f47063ca1428b23d5c375
    - current_digest: 42f278a3eb7413e9655422dd33866101f5010261585f47063ca1428b23d5c375
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091617-CBKJSC
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks: typecheck, schemas:check, transition tests, lint:core.
      Impact: The evaluator loop limit is configurable with a bounded default and is propagated into verification transitions.
      Resolution: Added evaluator.max_rework_attempts to config schema/runtime surfaces and generated schemas.
id_source: "generated"
---
