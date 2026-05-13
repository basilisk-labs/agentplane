---
id: "202605131449-GS3HB0"
title: "Create agentic context extraction tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T14:50:04.657Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T15:42:11.003Z"
  updated_by: "CODER"
  note: "Verified review-thread fix 96adf5697: combined --write-proposals and --create-extraction-tasks now preserves context_harvest while adding context_task_extraction; bun test packages/agentplane/src/commands/context/harvest-tasks.test.ts passes 11/11."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing agentic context extraction task generation as a bounded extension of context harvest, using standard task lifecycle records and focused verification in the task worktree."
events:
  -
    type: "status"
    at: "2026-05-13T14:50:25.367Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing agentic context extraction task generation as a bounded extension of context harvest, using standard task lifecycle records and focused verification in the task worktree."
  -
    type: "verify"
    at: "2026-05-13T15:01:58.818Z"
    author: "CODER"
    state: "ok"
    note: "Verified agentic context extraction task generation: focused harvest/task-new tests pass; eslint, typecheck, docs CLI freshness, format, knip, hotspot, policy routing, docs IA, doctor, diff whitespace, and live dry-run smoke pass. Release-readiness was rerun with Vitest because Bun lacks node:sqlite in this environment."
  -
    type: "verify"
    at: "2026-05-13T15:03:27.015Z"
    author: "CODER"
    state: "ok"
    note: "Verified committed implementation e237c64f2: focused harvest/task-new tests, eslint, typecheck, docs CLI freshness, format, knip, hotspot, policy routing, docs IA, doctor, diff whitespace, and live create-extraction-tasks dry-run all pass. Release-readiness passes under Vitest; Bun test lacks node:sqlite in this environment."
  -
    type: "verify"
    at: "2026-05-13T15:42:11.003Z"
    author: "CODER"
    state: "ok"
    note: "Verified review-thread fix 96adf5697: combined --write-proposals and --create-extraction-tasks now preserves context_harvest while adding context_task_extraction; bun test packages/agentplane/src/commands/context/harvest-tasks.test.ts passes 11/11."
doc_version: 3
doc_updated_at: "2026-05-13T15:42:11.021Z"
doc_updated_by: "CODER"
description: "Add a context harvest mode that creates standard AgentPlane extraction tasks for batchwise semantic knowledge extraction from completed task history, with modular prompt context and provenance requirements."
sections:
  Summary: |-
    Create agentic context extraction tasks
    
    Add a context harvest mode that creates standard AgentPlane extraction tasks for batchwise semantic knowledge extraction from completed task history, with modular prompt context and provenance requirements.
  Scope: |-
    - In scope: Add a context harvest mode that creates standard AgentPlane extraction tasks for batchwise semantic knowledge extraction from completed task history, with modular prompt context and provenance requirements.
    - Out of scope: unrelated refactors not required for "Create agentic context extraction tasks".
  Plan: "Implement an agentic context extraction task creation layer for context harvest tasks. Scope: add CLI options for creating standard extraction tasks in oldest-first batches; build README/ACR-aware source packs rather than treating raw JSON as the semantic source; include a modular extraction prompt contract that can be improved later; keep existing deterministic write-proposals/promote behavior intact; add tests and user/developer docs. Verification: focused context harvest tests, task lifecycle tests as needed, CLI docs freshness, lint/typecheck for touched files, policy routing, doctor, and a live dry-run/create-task smoke in a temporary project or mocked backend."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T15:01:58.818Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified agentic context extraction task generation: focused harvest/task-new tests pass; eslint, typecheck, docs CLI freshness, format, knip, hotspot, policy routing, docs IA, doctor, diff whitespace, and live dry-run smoke pass. Release-readiness was rerun with Vitest because Bun lacks node:sqlite in this environment.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T14:50:25.367Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131449-GS3HB0-agentic-context-extraction/.agentplane/tasks/202605131449-GS3HB0/blueprint/resolved-snapshot.json
    - old_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
    - current_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131449-GS3HB0
    
    ### 2026-05-13T15:03:27.015Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified committed implementation e237c64f2: focused harvest/task-new tests, eslint, typecheck, docs CLI freshness, format, knip, hotspot, policy routing, docs IA, doctor, diff whitespace, and live create-extraction-tasks dry-run all pass. Release-readiness passes under Vitest; Bun test lacks node:sqlite in this environment.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T15:01:58.829Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131449-GS3HB0-agentic-context-extraction/.agentplane/tasks/202605131449-GS3HB0/blueprint/resolved-snapshot.json
    - old_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
    - current_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131449-GS3HB0
    
    ### 2026-05-13T15:42:11.003Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified review-thread fix 96adf5697: combined --write-proposals and --create-extraction-tasks now preserves context_harvest while adding context_task_extraction; bun test packages/agentplane/src/commands/context/harvest-tasks.test.ts passes 11/11.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T15:03:27.026Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131449-GS3HB0-agentic-context-extraction/.agentplane/tasks/202605131449-GS3HB0/blueprint/resolved-snapshot.json
    - old_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
    - current_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131449-GS3HB0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Implemented --create-extraction-tasks and --batch-size for context harvest tasks. Generated CURATOR tasks carry README/ACR source packs, allowed outputs, provenance rules, queued source markers, and a replaceable prompt module address.
      Impact: Completed task history can now be processed oldest-first by standard AgentPlane tasks instead of a single deterministic wiki proposal.
      Resolution: Keep deterministic --write-proposals/--promote behavior unchanged; use --create-extraction-tasks for semantic extraction batches.
    
    - Observation: PR #3638 opened for the committed branch after implementing agentic extraction task batches.
      Impact: PR metadata and task verification now refer to the committed implementation head.
      Resolution: Proceed with PR update, push, and hosted checks.
    
    - Observation: Resolved PR #3638 P1 review finding by writing extraction markers against the latest backend task state after harvest marker writes.
      Impact: Combined harvest modes no longer drop ingestion provenance markers, so later harvest runs can still detect already ingested tasks.
      Resolution: Added regression coverage for the combined mode and de-duplicated reported changed paths.
id_source: "generated"
---
## Summary

Create agentic context extraction tasks

Add a context harvest mode that creates standard AgentPlane extraction tasks for batchwise semantic knowledge extraction from completed task history, with modular prompt context and provenance requirements.

## Scope

- In scope: Add a context harvest mode that creates standard AgentPlane extraction tasks for batchwise semantic knowledge extraction from completed task history, with modular prompt context and provenance requirements.
- Out of scope: unrelated refactors not required for "Create agentic context extraction tasks".

## Plan

Implement an agentic context extraction task creation layer for context harvest tasks. Scope: add CLI options for creating standard extraction tasks in oldest-first batches; build README/ACR-aware source packs rather than treating raw JSON as the semantic source; include a modular extraction prompt contract that can be improved later; keep existing deterministic write-proposals/promote behavior intact; add tests and user/developer docs. Verification: focused context harvest tests, task lifecycle tests as needed, CLI docs freshness, lint/typecheck for touched files, policy routing, doctor, and a live dry-run/create-task smoke in a temporary project or mocked backend.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T15:01:58.818Z — VERIFY — ok

By: CODER

Note: Verified agentic context extraction task generation: focused harvest/task-new tests pass; eslint, typecheck, docs CLI freshness, format, knip, hotspot, policy routing, docs IA, doctor, diff whitespace, and live dry-run smoke pass. Release-readiness was rerun with Vitest because Bun lacks node:sqlite in this environment.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T14:50:25.367Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131449-GS3HB0-agentic-context-extraction/.agentplane/tasks/202605131449-GS3HB0/blueprint/resolved-snapshot.json
- old_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
- current_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131449-GS3HB0

### 2026-05-13T15:03:27.015Z — VERIFY — ok

By: CODER

Note: Verified committed implementation e237c64f2: focused harvest/task-new tests, eslint, typecheck, docs CLI freshness, format, knip, hotspot, policy routing, docs IA, doctor, diff whitespace, and live create-extraction-tasks dry-run all pass. Release-readiness passes under Vitest; Bun test lacks node:sqlite in this environment.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T15:01:58.829Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131449-GS3HB0-agentic-context-extraction/.agentplane/tasks/202605131449-GS3HB0/blueprint/resolved-snapshot.json
- old_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
- current_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131449-GS3HB0

### 2026-05-13T15:42:11.003Z — VERIFY — ok

By: CODER

Note: Verified review-thread fix 96adf5697: combined --write-proposals and --create-extraction-tasks now preserves context_harvest while adding context_task_extraction; bun test packages/agentplane/src/commands/context/harvest-tasks.test.ts passes 11/11.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T15:03:27.026Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131449-GS3HB0-agentic-context-extraction/.agentplane/tasks/202605131449-GS3HB0/blueprint/resolved-snapshot.json
- old_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
- current_digest: 26f4bf4ba1a7d77364547c7ee3496140e1efe1148c468b4acd413e9806fd3388
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131449-GS3HB0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Implemented --create-extraction-tasks and --batch-size for context harvest tasks. Generated CURATOR tasks carry README/ACR source packs, allowed outputs, provenance rules, queued source markers, and a replaceable prompt module address.
  Impact: Completed task history can now be processed oldest-first by standard AgentPlane tasks instead of a single deterministic wiki proposal.
  Resolution: Keep deterministic --write-proposals/--promote behavior unchanged; use --create-extraction-tasks for semantic extraction batches.

- Observation: PR #3638 opened for the committed branch after implementing agentic extraction task batches.
  Impact: PR metadata and task verification now refer to the committed implementation head.
  Resolution: Proceed with PR update, push, and hosted checks.

- Observation: Resolved PR #3638 P1 review finding by writing extraction markers against the latest backend task state after harvest marker writes.
  Impact: Combined harvest modes no longer drop ingestion provenance markers, so later harvest runs can still detect already ingested tasks.
  Resolution: Added regression coverage for the combined mode and de-duplicated reported changed paths.
