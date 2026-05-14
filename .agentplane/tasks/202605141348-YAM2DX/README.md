---
id: "202605141348-YAM2DX"
title: "Clarify context wiki structure guidance"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "context"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T13:48:30.454Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T13:54:33.959Z"
  updated_by: "DOCS"
  note: "Command: bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --timeout 120000; Result: pass; Evidence: 27 tests passed, including context init bootstraps AgentPlane and verifies generated context/wiki/AGENTS.md guidance. Scope: context init scaffold and regression coverage. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing. Command: ap doctor; Result: pass with unrelated warnings; Evidence: doctor (OK), warnings only for pre-existing branch_pr reconciliation drift on older tasks. Scope: repository runtime health."
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: update the context wiki agent-notes scaffold to require project-specific structure selection, then verify the generated context init behavior with focused tests."
events:
  -
    type: "status"
    at: "2026-05-14T13:49:11.005Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: update the context wiki agent-notes scaffold to require project-specific structure selection, then verify the generated context init behavior with focused tests."
  -
    type: "verify"
    at: "2026-05-14T13:54:33.959Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --timeout 120000; Result: pass; Evidence: 27 tests passed, including context init bootstraps AgentPlane and verifies generated context/wiki/AGENTS.md guidance. Scope: context init scaffold and regression coverage. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing. Command: ap doctor; Result: pass with unrelated warnings; Evidence: doctor (OK), warnings only for pre-existing branch_pr reconciliation drift on older tasks. Scope: repository runtime health."
doc_version: 3
doc_updated_at: "2026-05-14T13:54:33.982Z"
doc_updated_by: "DOCS"
description: "Update the generated context/wiki/AGENTS.md template so agents analyze the base project and choose an appropriate wiki structure instead of assuming one fixed hierarchy."
sections:
  Summary: |-
    Clarify context wiki structure guidance
    
    Update the generated context/wiki/AGENTS.md template so agents analyze the base project and choose an appropriate wiki structure instead of assuming one fixed hierarchy.
  Scope: |-
    - In scope: Update the generated context/wiki/AGENTS.md template so agents analyze the base project and choose an appropriate wiki structure instead of assuming one fixed hierarchy.
    - Out of scope: unrelated refactors not required for "Clarify context wiki structure guidance".
  Plan: "1. Inspect current context init scaffold and tests for context/wiki/AGENTS.md. 2. Update the generated wiki agent notes so agents first analyze the base project/context and choose the wiki hierarchy that fits, keeping only durable source-backed project knowledge in context/wiki. 3. Add or update focused regression coverage for the generated AGENTS.md content. 4. Run targeted context init tests plus routing/doctor checks, then record verification evidence."
  Verify Steps: |-
    PLANNER fallback scaffold for "Clarify context wiki structure guidance". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Clarify context wiki structure guidance". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T13:54:33.959Z — VERIFY — ok
    
    By: DOCS
    
    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --timeout 120000; Result: pass; Evidence: 27 tests passed, including context init bootstraps AgentPlane and verifies generated context/wiki/AGENTS.md guidance. Scope: context init scaffold and regression coverage. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing. Command: ap doctor; Result: pass with unrelated warnings; Evidence: doctor (OK), warnings only for pre-existing branch_pr reconciliation drift on older tasks. Scope: repository runtime health.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:49:11.005Z, excerpt_hash=sha256:74352f58f024a4e85150c41605cbbf445541380b2994364b9cd746921817adee
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141348-YAM2DX-wiki-structure-guidance/.agentplane/tasks/202605141348-YAM2DX/blueprint/resolved-snapshot.json
    - old_digest: 6eafd5f026f6ff7a55a02caa2639233a75555d2618d6c1b32b6e217679ec4229
    - current_digest: 6eafd5f026f6ff7a55a02caa2639233a75555d2618d6c1b32b6e217679ec4229
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141348-YAM2DX
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Clarify context wiki structure guidance

Update the generated context/wiki/AGENTS.md template so agents analyze the base project and choose an appropriate wiki structure instead of assuming one fixed hierarchy.

## Scope

- In scope: Update the generated context/wiki/AGENTS.md template so agents analyze the base project and choose an appropriate wiki structure instead of assuming one fixed hierarchy.
- Out of scope: unrelated refactors not required for "Clarify context wiki structure guidance".

## Plan

1. Inspect current context init scaffold and tests for context/wiki/AGENTS.md. 2. Update the generated wiki agent notes so agents first analyze the base project/context and choose the wiki hierarchy that fits, keeping only durable source-backed project knowledge in context/wiki. 3. Add or update focused regression coverage for the generated AGENTS.md content. 4. Run targeted context init tests plus routing/doctor checks, then record verification evidence.

## Verify Steps

PLANNER fallback scaffold for "Clarify context wiki structure guidance". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Clarify context wiki structure guidance". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T13:54:33.959Z — VERIFY — ok

By: DOCS

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --timeout 120000; Result: pass; Evidence: 27 tests passed, including context init bootstraps AgentPlane and verifies generated context/wiki/AGENTS.md guidance. Scope: context init scaffold and regression coverage. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing. Command: ap doctor; Result: pass with unrelated warnings; Evidence: doctor (OK), warnings only for pre-existing branch_pr reconciliation drift on older tasks. Scope: repository runtime health.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:49:11.005Z, excerpt_hash=sha256:74352f58f024a4e85150c41605cbbf445541380b2994364b9cd746921817adee

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141348-YAM2DX-wiki-structure-guidance/.agentplane/tasks/202605141348-YAM2DX/blueprint/resolved-snapshot.json
- old_digest: 6eafd5f026f6ff7a55a02caa2639233a75555d2618d6c1b32b6e217679ec4229
- current_digest: 6eafd5f026f6ff7a55a02caa2639233a75555d2618d6c1b32b6e217679ec4229
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141348-YAM2DX

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
