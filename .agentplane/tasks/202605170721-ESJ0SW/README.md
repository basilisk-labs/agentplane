---
id: "202605170721-ESJ0SW"
title: "Add portable context assimilation prompts"
result_summary: "Merged via PR #3791."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "context"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T07:23:07.710Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T07:37:06.075Z"
  updated_by: "CODER"
  note: "Implemented portable context assimilation prompt module and adaptive wiki task contract; verified with focused context tests, typecheck, CLI docs check, policy routing, diff check, and temp-dir wiki CLI smoke."
  attempts: 0
commit:
  hash: "0c094b7552042fd78695fcbdf986030060f1c790"
  message: "Merge pull request #3791 from basilisk-labs/task/202605170721-ESJ0SW/adaptive-context-curation"
comments:
  -
    author: "CODER"
    body: "Start: Implement adaptive context curation batch in the primary task worktree, covering portable context prompts, wiki metadata helpers, adaptive init, docs, and focused tests for related task IDs."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3791 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T07:25:58.955Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement adaptive context curation batch in the primary task worktree, covering portable context prompts, wiki metadata helpers, adaptive init, docs, and focused tests for related task IDs."
  -
    type: "verify"
    at: "2026-05-17T07:37:06.075Z"
    author: "CODER"
    state: "ok"
    note: "Implemented portable context assimilation prompt module and adaptive wiki task contract; verified with focused context tests, typecheck, CLI docs check, policy routing, diff check, and temp-dir wiki CLI smoke."
  -
    type: "status"
    at: "2026-05-17T08:29:27.295Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3791 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T08:29:27.302Z"
doc_updated_by: "INTEGRATOR"
description: "Make context learn files/changes create self-contained CURATOR tasks with an embedded context_assimilation prompt module and task-readable wiki/claim/cross-link contract for non-runner agents."
sections:
  Summary: |-
    Add portable context assimilation prompts
    
    Make context learn files/changes create self-contained CURATOR tasks with an embedded context_assimilation prompt module and task-readable wiki/claim/cross-link contract for non-runner agents.
  Scope: |-
    - In scope: Make context learn files/changes create self-contained CURATOR tasks with an embedded context_assimilation prompt module and task-readable wiki/claim/cross-link contract for non-runner agents.
    - Out of scope: unrelated refactors not required for "Add portable context assimilation prompts".
  Plan: "Primary batch task for adaptive llm-wiki curation. Implement a reusable context_assimilation prompt module for learn files/changes, embed it into generated task extensions, and make generated task README content sufficient for non-runner agents. Included related tasks in this batch: 202605170721-BTF484, 202605170721-BY03BX, 202605170722-YP81RG. Verify with focused context command tests, type/lint checks if available, docs generation checks when touched, and policy routing."
  Verify Steps: |-
    1. bun test packages/agentplane/src/commands/context/ingest.spec.ts packages/agentplane/src/commands/context/context.learn.spec.ts
    2. bun test packages/agentplane/src/commands/context/context.spec.ts
    3. node .agentplane/policy/check-routing.mjs
    4. git diff --check
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T07:37:06.075Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented portable context assimilation prompt module and adaptive wiki task contract; verified with focused context tests, typecheck, CLI docs check, policy routing, diff check, and temp-dir wiki CLI smoke.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T07:25:58.955Z, excerpt_hash=sha256:51dab77a4ea9a67d91a1743ce333226a5b697607d7bd609f177d1a43dd66ab8e
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170721-ESJ0SW-adaptive-context-curation/.agentplane/tasks/202605170721-ESJ0SW/blueprint/resolved-snapshot.json
    - old_digest: 7058bc199fca37d553bc375308a245011cb42cc940277d531ceb485363543c95
    - current_digest: 7058bc199fca37d553bc375308a245011cb42cc940277d531ceb485363543c95
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170721-ESJ0SW
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add portable context assimilation prompts

Make context learn files/changes create self-contained CURATOR tasks with an embedded context_assimilation prompt module and task-readable wiki/claim/cross-link contract for non-runner agents.

## Scope

- In scope: Make context learn files/changes create self-contained CURATOR tasks with an embedded context_assimilation prompt module and task-readable wiki/claim/cross-link contract for non-runner agents.
- Out of scope: unrelated refactors not required for "Add portable context assimilation prompts".

## Plan

Primary batch task for adaptive llm-wiki curation. Implement a reusable context_assimilation prompt module for learn files/changes, embed it into generated task extensions, and make generated task README content sufficient for non-runner agents. Included related tasks in this batch: 202605170721-BTF484, 202605170721-BY03BX, 202605170722-YP81RG. Verify with focused context command tests, type/lint checks if available, docs generation checks when touched, and policy routing.

## Verify Steps

1. bun test packages/agentplane/src/commands/context/ingest.spec.ts packages/agentplane/src/commands/context/context.learn.spec.ts
2. bun test packages/agentplane/src/commands/context/context.spec.ts
3. node .agentplane/policy/check-routing.mjs
4. git diff --check

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T07:37:06.075Z — VERIFY — ok

By: CODER

Note: Implemented portable context assimilation prompt module and adaptive wiki task contract; verified with focused context tests, typecheck, CLI docs check, policy routing, diff check, and temp-dir wiki CLI smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T07:25:58.955Z, excerpt_hash=sha256:51dab77a4ea9a67d91a1743ce333226a5b697607d7bd609f177d1a43dd66ab8e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170721-ESJ0SW-adaptive-context-curation/.agentplane/tasks/202605170721-ESJ0SW/blueprint/resolved-snapshot.json
- old_digest: 7058bc199fca37d553bc375308a245011cb42cc940277d531ceb485363543c95
- current_digest: 7058bc199fca37d553bc375308a245011cb42cc940277d531ceb485363543c95
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170721-ESJ0SW

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
