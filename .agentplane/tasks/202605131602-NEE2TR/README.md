---
id: "202605131602-NEE2TR"
title: "Split human context command surface"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T16:02:46.702Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T16:13:58.711Z"
  updated_by: "CODER"
  note: "Verified human/ap context surface split at 1589d71f8: focused context/help tests pass, typecheck passes, docs CLI reference is fresh, policy routing and doctor pass, and smoke commands confirm agentplane shows learn/check while ap shows advanced harvest/ingest/capability."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the approved human context command surface in a dedicated branch_pr worktree, reusing existing context handlers and keeping low-level pipeline commands available for ap."
events:
  -
    type: "status"
    at: "2026-05-13T16:03:03.096Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved human context command surface in a dedicated branch_pr worktree, reusing existing context handlers and keeping low-level pipeline commands available for ap."
  -
    type: "verify"
    at: "2026-05-13T16:13:58.711Z"
    author: "CODER"
    state: "ok"
    note: "Verified human/ap context surface split at 1589d71f8: focused context/help tests pass, typecheck passes, docs CLI reference is fresh, policy routing and doctor pass, and smoke commands confirm agentplane shows learn/check while ap shows advanced harvest/ingest/capability."
doc_version: 3
doc_updated_at: "2026-05-13T16:13:58.728Z"
doc_updated_by: "CODER"
description: "Add a simpler human-facing agentplane context surface for creating context processing tasks from external files and completed tasks while keeping ap as the advanced agent/pipeline surface."
sections:
  Summary: |-
    Split human context command surface
    
    Add a simpler human-facing agentplane context surface for creating context processing tasks from external files and completed tasks while keeping ap as the advanced agent/pipeline surface.
  Scope: |-
    - In scope: Add a simpler human-facing agentplane context surface for creating context processing tasks from external files and completed tasks while keeping ap as the advanced agent/pipeline surface.
    - Out of scope: unrelated refactors not required for "Split human context command surface".
  Plan: "Implement a human-facing context command surface while keeping ap as the advanced agent/pipeline interface. Scope: preserve existing context pipeline commands for ap; add agentplane-oriented aliases that use current terminology: context init, context learn files <paths...>, context learn changes, context learn tasks, context show, and context check; do not add context open/setup; implement aliases by reusing existing handlers rather than duplicating domain logic; update CLI help/docs/tests so human commands create processing tasks for external data and completed task data in simple mode; keep promotion/write-proposals advanced. Verification: focused command spec/parse tests, context command tests, CLI reference freshness, policy routing, doctor, and a smoke of the new help/parse surface."
  Verify Steps: |-
    1. Review the requested outcome for "Split human context command surface". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T16:13:58.711Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified human/ap context surface split at 1589d71f8: focused context/help tests pass, typecheck passes, docs CLI reference is fresh, policy routing and doctor pass, and smoke commands confirm agentplane shows learn/check while ap shows advanced harvest/ingest/capability.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:03:03.096Z, excerpt_hash=sha256:9e5e7df9568aab6e03aed2c9a48517f430a339701d72919dbca5afc309ae519b
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131602-NEE2TR-human-context-surface/.agentplane/tasks/202605131602-NEE2TR/blueprint/resolved-snapshot.json
    - old_digest: 76d54818c7fc93f17cc16b1c5e85dc70961daf0ce732b1956b8be6c3e1b6e6ed
    - current_digest: 76d54818c7fc93f17cc16b1c5e85dc70961daf0ce732b1956b8be6c3e1b6e6ed
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131602-NEE2TR
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: agentplane now exposes human context task-factory commands: context init, learn files, learn changes, learn tasks, show, check; ap help exposes the full advanced context pipeline.
      Impact: Humans can create context processing tasks from files/changes/task history without using low-level harvest/ingest/promote flags; agents still retain full pipeline control through ap.
      Resolution: Implemented aliases by reusing existing ingest/harvest/doctor handlers and marked low-level context commands as advanced surface.
id_source: "generated"
---
## Summary

Split human context command surface

Add a simpler human-facing agentplane context surface for creating context processing tasks from external files and completed tasks while keeping ap as the advanced agent/pipeline surface.

## Scope

- In scope: Add a simpler human-facing agentplane context surface for creating context processing tasks from external files and completed tasks while keeping ap as the advanced agent/pipeline surface.
- Out of scope: unrelated refactors not required for "Split human context command surface".

## Plan

Implement a human-facing context command surface while keeping ap as the advanced agent/pipeline interface. Scope: preserve existing context pipeline commands for ap; add agentplane-oriented aliases that use current terminology: context init, context learn files <paths...>, context learn changes, context learn tasks, context show, and context check; do not add context open/setup; implement aliases by reusing existing handlers rather than duplicating domain logic; update CLI help/docs/tests so human commands create processing tasks for external data and completed task data in simple mode; keep promotion/write-proposals advanced. Verification: focused command spec/parse tests, context command tests, CLI reference freshness, policy routing, doctor, and a smoke of the new help/parse surface.

## Verify Steps

1. Review the requested outcome for "Split human context command surface". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T16:13:58.711Z — VERIFY — ok

By: CODER

Note: Verified human/ap context surface split at 1589d71f8: focused context/help tests pass, typecheck passes, docs CLI reference is fresh, policy routing and doctor pass, and smoke commands confirm agentplane shows learn/check while ap shows advanced harvest/ingest/capability.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:03:03.096Z, excerpt_hash=sha256:9e5e7df9568aab6e03aed2c9a48517f430a339701d72919dbca5afc309ae519b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131602-NEE2TR-human-context-surface/.agentplane/tasks/202605131602-NEE2TR/blueprint/resolved-snapshot.json
- old_digest: 76d54818c7fc93f17cc16b1c5e85dc70961daf0ce732b1956b8be6c3e1b6e6ed
- current_digest: 76d54818c7fc93f17cc16b1c5e85dc70961daf0ce732b1956b8be6c3e1b6e6ed
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131602-NEE2TR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: agentplane now exposes human context task-factory commands: context init, learn files, learn changes, learn tasks, show, check; ap help exposes the full advanced context pipeline.
  Impact: Humans can create context processing tasks from files/changes/task history without using low-level harvest/ingest/promote flags; agents still retain full pipeline control through ap.
  Resolution: Implemented aliases by reusing existing ingest/harvest/doctor handlers and marked low-level context commands as advanced surface.
