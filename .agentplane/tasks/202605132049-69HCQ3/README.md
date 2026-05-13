---
id: "202605132049-69HCQ3"
title: "Hide non-variadic group roots in user CLI reference"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T21:27:44.265Z"
  updated_by: "CODER"
  note: "Added docs-render regression: optional non-variadic dispatcher roots are hidden from CLI docs while concrete child commands remain visible."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement CLI reference filtering for non-variadic group roots inside the approved batch worktree."
events:
  -
    type: "status"
    at: "2026-05-13T21:06:41.639Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement CLI reference filtering for non-variadic group roots inside the approved batch worktree."
  -
    type: "verify"
    at: "2026-05-13T21:27:44.265Z"
    author: "CODER"
    state: "ok"
    note: "Added docs-render regression: optional non-variadic dispatcher roots are hidden from CLI docs while concrete child commands remain visible."
doc_version: 3
doc_updated_at: "2026-05-13T21:27:44.276Z"
doc_updated_by: "CODER"
description: |-
  GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3656 (#3656)
  
  Problem: generated user CLI reference includes group roots whose dispatcher arg is optional but not variadic (e.g. `task doc`, `task verify`).
  
  Acceptance:
  - non-variadic optional dispatchers with children are treated as group roots
  - generated user CLI reference excludes those roots but keeps actionable children
  - regression coverage includes at least one non-variadic dispatcher
sections:
  Summary: |-
    Hide non-variadic group roots in user CLI reference
    
    GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3656 (#3656)
    
    Problem: generated user CLI reference includes group roots whose dispatcher arg is optional but not variadic (e.g. `task doc`, `task verify`).
    
    Acceptance:
    - non-variadic optional dispatchers with children are treated as group roots
    - generated user CLI reference excludes those roots but keeps actionable children
    - regression coverage includes at least one non-variadic dispatcher
  Scope: |-
    - In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3656 (#3656) Problem: generated user CLI reference includes group roots whose dispatcher arg is optional but not variadic (e.g. `task doc`, `task verify`). Acceptance: - non-variadic optional dispatchers with children are treated as group roots - generated user CLI reference excludes those roots but keeps actionable children - regression coverage includes at least one non-variadic dispatcher.
    - Out of scope: unrelated refactors not required for "Hide non-variadic group roots in user CLI reference".
  Plan: |-
    1. Implement the change for "Hide non-variadic group roots in user CLI reference".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Hide non-variadic group roots in user CLI reference". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Hide non-variadic group roots in user CLI reference". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T21:27:44.265Z — VERIFY — ok
    
    By: CODER
    
    Note: Added docs-render regression: optional non-variadic dispatcher roots are hidden from CLI docs while concrete child commands remain visible.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:06:41.639Z, excerpt_hash=sha256:654f59d59850c70639e4741d058fe2de38b1092986baf73db5c2014ecf13eb64
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132103-J5YVSS-remove-tasks-json/.agentplane/tasks/202605132049-69HCQ3/blueprint/resolved-snapshot.json
    - old_digest: 532930b0f4c73e33ed011d508e014692ff64450aa95dcb47c680276c81c592bc
    - current_digest: 532930b0f4c73e33ed011d508e014692ff64450aa95dcb47c680276c81c592bc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132049-69HCQ3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Hide non-variadic group roots in user CLI reference

GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3656 (#3656)

Problem: generated user CLI reference includes group roots whose dispatcher arg is optional but not variadic (e.g. `task doc`, `task verify`).

Acceptance:
- non-variadic optional dispatchers with children are treated as group roots
- generated user CLI reference excludes those roots but keeps actionable children
- regression coverage includes at least one non-variadic dispatcher

## Scope

- In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3656 (#3656) Problem: generated user CLI reference includes group roots whose dispatcher arg is optional but not variadic (e.g. `task doc`, `task verify`). Acceptance: - non-variadic optional dispatchers with children are treated as group roots - generated user CLI reference excludes those roots but keeps actionable children - regression coverage includes at least one non-variadic dispatcher.
- Out of scope: unrelated refactors not required for "Hide non-variadic group roots in user CLI reference".

## Plan

1. Implement the change for "Hide non-variadic group roots in user CLI reference".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Hide non-variadic group roots in user CLI reference". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Hide non-variadic group roots in user CLI reference". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T21:27:44.265Z — VERIFY — ok

By: CODER

Note: Added docs-render regression: optional non-variadic dispatcher roots are hidden from CLI docs while concrete child commands remain visible.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:06:41.639Z, excerpt_hash=sha256:654f59d59850c70639e4741d058fe2de38b1092986baf73db5c2014ecf13eb64

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132103-J5YVSS-remove-tasks-json/.agentplane/tasks/202605132049-69HCQ3/blueprint/resolved-snapshot.json
- old_digest: 532930b0f4c73e33ed011d508e014692ff64450aa95dcb47c680276c81c592bc
- current_digest: 532930b0f4c73e33ed011d508e014692ff64450aa95dcb47c680276c81c592bc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132049-69HCQ3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
