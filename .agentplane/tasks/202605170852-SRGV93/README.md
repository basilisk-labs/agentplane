---
id: "202605170852-SRGV93"
title: "Add context prompt CLI helper guidance"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "context"
  - "docs"
  - "prompt"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T08:54:19.238Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T08:56:36.714Z"
  updated_by: "CODER"
  note: "Updated context assimilation prompt, generated wiki agent notes, and local context docs with explicit context wiki helper commands and canonical entity pre-write requirements. Verified with focused context tests, typecheck, docs CLI freshness, policy routing, Prettier, targeted ESLint, and git diff check."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Update context assimilation prompt and docs with explicit wiki helper commands, canonical entity lookup requirements, and regression tests for the generated prompt contract."
events:
  -
    type: "status"
    at: "2026-05-17T08:54:21.153Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Update context assimilation prompt and docs with explicit wiki helper commands, canonical entity lookup requirements, and regression tests for the generated prompt contract."
  -
    type: "verify"
    at: "2026-05-17T08:56:36.714Z"
    author: "CODER"
    state: "ok"
    note: "Updated context assimilation prompt, generated wiki agent notes, and local context docs with explicit context wiki helper commands and canonical entity pre-write requirements. Verified with focused context tests, typecheck, docs CLI freshness, policy routing, Prettier, targeted ESLint, and git diff check."
doc_version: 3
doc_updated_at: "2026-05-17T08:56:36.724Z"
doc_updated_by: "CODER"
description: "Update the context assimilation prompt and docs to explicitly instruct CURATOR agents to use context wiki helper commands and canonical entity lookup before writing wiki, facts, and graph updates."
sections:
  Summary: |-
    Add context prompt CLI helper guidance
    
    Update the context assimilation prompt and docs to explicitly instruct CURATOR agents to use context wiki helper commands and canonical entity lookup before writing wiki, facts, and graph updates.
  Scope: |-
    - In scope: Update the context assimilation prompt and docs to explicitly instruct CURATOR agents to use context wiki helper commands and canonical entity lookup before writing wiki, facts, and graph updates.
    - Out of scope: unrelated refactors not required for "Add context prompt CLI helper guidance".
  Plan: "Update context assimilation guidance so agents explicitly use context wiki helper commands and perform canonical entity lookup before writing. Scope: prompt module, context init wiki notes, user docs, and focused tests validating prompt text."
  Verify Steps: |-
    PLANNER fallback scaffold for "Add context prompt CLI helper guidance". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Add context prompt CLI helper guidance". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T08:56:36.714Z — VERIFY — ok
    
    By: CODER
    
    Note: Updated context assimilation prompt, generated wiki agent notes, and local context docs with explicit context wiki helper commands and canonical entity pre-write requirements. Verified with focused context tests, typecheck, docs CLI freshness, policy routing, Prettier, targeted ESLint, and git diff check.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:54:21.153Z, excerpt_hash=sha256:ac2106e1269d58b0930a4eac40fd66a5e7791b795c7a870a09bdad9997bc2ca6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170830-CTXHELP-context-prompt-helpers/.agentplane/tasks/202605170852-SRGV93/blueprint/resolved-snapshot.json
    - old_digest: f1430d014f53e3fa5775b7a662f3a7f9b7709cd5f3fae9c9e39b88b4e15beb43
    - current_digest: f1430d014f53e3fa5775b7a662f3a7f9b7709cd5f3fae9c9e39b88b4e15beb43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170852-SRGV93
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add context prompt CLI helper guidance

Update the context assimilation prompt and docs to explicitly instruct CURATOR agents to use context wiki helper commands and canonical entity lookup before writing wiki, facts, and graph updates.

## Scope

- In scope: Update the context assimilation prompt and docs to explicitly instruct CURATOR agents to use context wiki helper commands and canonical entity lookup before writing wiki, facts, and graph updates.
- Out of scope: unrelated refactors not required for "Add context prompt CLI helper guidance".

## Plan

Update context assimilation guidance so agents explicitly use context wiki helper commands and perform canonical entity lookup before writing. Scope: prompt module, context init wiki notes, user docs, and focused tests validating prompt text.

## Verify Steps

PLANNER fallback scaffold for "Add context prompt CLI helper guidance". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add context prompt CLI helper guidance". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T08:56:36.714Z — VERIFY — ok

By: CODER

Note: Updated context assimilation prompt, generated wiki agent notes, and local context docs with explicit context wiki helper commands and canonical entity pre-write requirements. Verified with focused context tests, typecheck, docs CLI freshness, policy routing, Prettier, targeted ESLint, and git diff check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:54:21.153Z, excerpt_hash=sha256:ac2106e1269d58b0930a4eac40fd66a5e7791b795c7a870a09bdad9997bc2ca6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170830-CTXHELP-context-prompt-helpers/.agentplane/tasks/202605170852-SRGV93/blueprint/resolved-snapshot.json
- old_digest: f1430d014f53e3fa5775b7a662f3a7f9b7709cd5f3fae9c9e39b88b4e15beb43
- current_digest: f1430d014f53e3fa5775b7a662f3a7f9b7709cd5f3fae9c9e39b88b4e15beb43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170852-SRGV93

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
