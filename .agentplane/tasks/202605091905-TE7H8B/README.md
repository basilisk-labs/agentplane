---
id: "202605091905-TE7H8B"
title: "Improve managed hook readiness diagnostics"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-09T19:06:28.382Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T19:12:21.347Z"
  updated_by: "CODER"
  note: "Focused hook readiness implementation verified."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: improving managed hook readiness diagnostics and safe doctor repair for AgentPlane-managed hook files."
events:
  -
    type: "status"
    at: "2026-05-09T19:07:09.840Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: improving managed hook readiness diagnostics and safe doctor repair for AgentPlane-managed hook files."
  -
    type: "verify"
    at: "2026-05-09T19:12:21.347Z"
    author: "CODER"
    state: "ok"
    note: "Focused hook readiness implementation verified."
doc_version: 3
doc_updated_at: "2026-05-09T19:12:21.411Z"
doc_updated_by: "CODER"
description: "Tighten managed hook install/readiness behavior: detect stale managed hook wrappers, make doctor --fix refresh safe managed hook shims/hooks, and clarify pre-push fallback diagnostics without requiring project-local hook scripts."
sections:
  Summary: |-
    Improve managed hook readiness diagnostics
    
    Tighten managed hook install/readiness behavior: detect stale managed hook wrappers, make doctor --fix refresh safe managed hook shims/hooks, and clarify pre-push fallback diagnostics without requiring project-local hook scripts.
  Scope: |-
    - In scope: Tighten managed hook install/readiness behavior: detect stale managed hook wrappers, make doctor --fix refresh safe managed hook shims/hooks, and clarify pre-push fallback diagnostics without requiring project-local hook scripts.
    - Out of scope: unrelated refactors not required for "Improve managed hook readiness diagnostics".
  Plan: |-
    1. Update managed hook readiness diagnostics to detect stale managed hook wrappers and to distinguish clean built-in pre-push fallback from missing project scripts.
    2. Extend safe doctor fixes so agentplane doctor --fix can refresh AgentPlane-managed hook files and shim without overwriting custom hooks.
    3. Add focused tests covering stale wrapper detection, pre-push fallback messaging, and doctor --fix hook repair.
    4. Run focused tests plus routing/doctor verification, then publish the branch_pr task for integration.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T19:12:21.347Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused hook readiness implementation verified.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T19:07:09.862Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091905-TE7H8B-hook-readiness-repair/.agentplane/tasks/202605091905-TE7H8B/blueprint/resolved-snapshot.json
    - old_digest: fbc95f4a623121922a59da1cfde2609272997ef92bf7c98eb966c6cd5ddee51b
    - current_digest: fbc95f4a623121922a59da1cfde2609272997ef92bf7c98eb966c6cd5ddee51b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091905-TE7H8B
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts | Result: pass | Evidence: 19 pass, 0 fail. Command: bun run typecheck | Result: pass | Evidence: tsc -b exited 0. Command: ./node_modules/.bin/prettier --check <changed doctor files> | Result: pass | Evidence: All matched files use Prettier code style. Command: ap doctor | Result: pass | Evidence: doctor OK, errors=0 warnings=0. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK.
      Impact: Covers stale managed hook wrapper diagnostics, doctor --fix managed hook repair, pre-push fallback messaging, and TypeScript/format health for touched scope.
      Resolution: No residual implementation blocker found in focused local verification.
id_source: "generated"
---
