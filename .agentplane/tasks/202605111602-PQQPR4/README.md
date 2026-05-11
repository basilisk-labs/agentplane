---
id: "202605111602-PQQPR4"
title: "Fix task doc canonical rendering drift for v0.5"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli,bug,docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-11T16:03:49.586Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-11T16:16:31.735Z"
  updated_by: "CODER"
  note: "Run focused task-doc tests; canonical rendering drift fixed and no-change outcomes now stable."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Исправление contract drift для task doc/derive перед финальной валидацией v0.5."
events:
  -
    type: "status"
    at: "2026-05-11T16:03:53.500Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Исправление contract drift для task doc/derive перед финальной валидацией v0.5."
  -
    type: "verify"
    at: "2026-05-11T16:14:55.191Z"
    author: "CODER"
    state: "ok"
    note: "Run focused task-doc tests; canonical rendering drift fixed and now consistently reports no-change for unchanged section updates."
  -
    type: "verify"
    at: "2026-05-11T16:15:29.571Z"
    author: "CODER"
    state: "ok"
    note: "Run focused task-doc tests; canonical rendering drift fixed and no-change outcomes now stable."
  -
    type: "verify"
    at: "2026-05-11T16:16:31.735Z"
    author: "CODER"
    state: "ok"
    note: "Run focused task-doc tests; canonical rendering drift fixed and no-change outcomes now stable."
doc_version: 3
doc_updated_at: "2026-05-11T16:16:31.756Z"
doc_updated_by: "CODER"
description: "Normalize task doc set/read/scaffold behavior after canonical section migration so README output is stable and explicit."
sections:
  Summary: |-
    Fix task doc canonical rendering drift for v0.5
    
    Normalize task doc set/read/scaffold behavior after canonical sections migration so README output is stable and explicit.
  Scope: |-
    - In scope: Normalize task doc set/read/scaffold behavior after canonical sections migration and keep explicit sections stable.
    - Out of scope: unrelated refactors not required for "Fix task doc canonical rendering drift for v0.5".
  Plan: "Align task doc read/set to return stable canonical markdown with Summary/Scope/Verify Steps sections after canonical rendering."
  Verify Steps: |-
    1. Review the requested outcome for "Fix task doc canonical rendering drift for v0.5". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-11T16:14:55.191Z — VERIFY — ok
    
    By: CODER
    
    Note: Run focused task-doc tests; canonical rendering drift fixed and now consistently reports no-change for unchanged section updates.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-11T16:03:53.535Z, excerpt_hash=sha256:087f6151ade07896ba7220417cc66a31638ffe1ad1e60098aee3b59c313ca080
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605111602-PQQPR4-doc-canonical-v05/.agentplane/tasks/202605111602-PQQPR4/blueprint/resolved-snapshot.json
    - old_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
    - current_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605111602-PQQPR4
    
    ### 2026-05-11T16:15:29.571Z — VERIFY — ok
    
    By: CODER
    
    Note: Run focused task-doc tests; canonical rendering drift fixed and no-change outcomes now stable.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-11T16:14:55.211Z, excerpt_hash=sha256:087f6151ade07896ba7220417cc66a31638ffe1ad1e60098aee3b59c313ca080
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605111602-PQQPR4-doc-canonical-v05/.agentplane/tasks/202605111602-PQQPR4/blueprint/resolved-snapshot.json
    - old_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
    - current_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605111602-PQQPR4
    
    ### 2026-05-11T16:16:31.735Z — VERIFY — ok
    
    By: CODER
    
    Note: Run focused task-doc tests; canonical rendering drift fixed and no-change outcomes now stable.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-11T16:15:29.588Z, excerpt_hash=sha256:087f6151ade07896ba7220417cc66a31638ffe1ad1e60098aee3b59c313ca080
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605111602-PQQPR4-doc-canonical-v05/.agentplane/tasks/202605111602-PQQPR4/blueprint/resolved-snapshot.json
    - old_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
    - current_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605111602-PQQPR4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Regression in task doc drift was reproducible during the original run.
      Impact: Release 0.5 readiness for task doc contract.
      Resolution: Adjusted section comparison, canonical section extraction, and no-op intent checks.
    
    - Observation: No regressions found in doc set path after fixes.
      Impact: v0.5 task doc CLI contract.
      Resolution: Updated task doc section extraction and diff semantics.
    
    - Observation: No regressions found in doc set path.
      Impact: v0.5 task doc CLI contract.
      Resolution: Revalidated rendering and no-change behavior.
id_source: "generated"
---
## Summary

Fix task doc canonical rendering drift for v0.5

Нормализовать поведение task doc set/read/scaffold derive после перехода на canonical sections: восстановить ожидаемое состояние README output там, где контракт требует явных markdown секций.

## Scope

- In scope: Нормализовать поведение task doc set/read/scaffold derive после перехода на canonical sections: восстановить ожидаемое состояние README output там, где контракт требует явных markdown секций.
- Out of scope: unrelated refactors not required for "Fix task doc canonical rendering drift for v0.5".

## Plan

Задать единый контракт: task doc read/set должны возвращать стабильный markdown с явными секциями Summary/Scope/Verify Steps после canonical-рендера.

## Verify Steps

1. Review the requested outcome for "Fix task doc canonical rendering drift for v0.5". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-11T16:14:55.191Z — VERIFY — ok

By: CODER

Note: Run focused task-doc tests; canonical rendering drift fixed and now consistently reports no-change for unchanged section updates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-11T16:03:53.535Z, excerpt_hash=sha256:087f6151ade07896ba7220417cc66a31638ffe1ad1e60098aee3b59c313ca080

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605111602-PQQPR4-doc-canonical-v05/.agentplane/tasks/202605111602-PQQPR4/blueprint/resolved-snapshot.json
- old_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
- current_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605111602-PQQPR4

### 2026-05-11T16:15:29.571Z — VERIFY — ok

By: CODER

Note: Run focused task-doc tests; canonical rendering drift fixed and no-change outcomes now stable.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-11T16:14:55.211Z, excerpt_hash=sha256:087f6151ade07896ba7220417cc66a31638ffe1ad1e60098aee3b59c313ca080

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605111602-PQQPR4-doc-canonical-v05/.agentplane/tasks/202605111602-PQQPR4/blueprint/resolved-snapshot.json
- old_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
- current_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605111602-PQQPR4

### 2026-05-11T16:16:31.735Z — VERIFY — ok

By: CODER

Note: Run focused task-doc tests; canonical rendering drift fixed and no-change outcomes now stable.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-11T16:15:29.588Z, excerpt_hash=sha256:087f6151ade07896ba7220417cc66a31638ffe1ad1e60098aee3b59c313ca080

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605111602-PQQPR4-doc-canonical-v05/.agentplane/tasks/202605111602-PQQPR4/blueprint/resolved-snapshot.json
- old_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
- current_digest: 9ae9919175be59b227df1c84f88db66e1f644ac2014ef8cb4308240bb9052703
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605111602-PQQPR4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Regression in task doc drift was reproducible during run
  Impact: Release 0.5 readiness for task doc contract
  Resolution: Adjusted section comparison + canonical section extraction + no-op intent checks

- Observation: No regressions found in doc set path.
  Impact: v0.5 task doc CLI contract
  Resolution: Updated task doc section extraction and diff semantics

- Observation: No regressions found in doc set path.
  Impact: v0.5 task doc CLI contract
  Resolution: Updated doc section extraction and diff semantics
