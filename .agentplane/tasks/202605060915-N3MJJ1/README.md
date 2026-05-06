---
id: "202605060915-N3MJJ1"
title: "Embed resolved blueprint plan in runner bundle"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605060915-0EDRBK"
tags:
  - "blueprints"
  - "code"
  - "runner"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T10:01:42.386Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T10:04:05.272Z"
  updated_by: "CODER"
  note: "Verified: runner bundle now exposes a named blueprint plan artifact path and writes the embedded blueprint plan there during prepare."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing explicit runner blueprint plan artifact in the runner/context epic branch; upstream lifecycle and evidence commits are stacked into this worktree."
events:
  -
    type: "status"
    at: "2026-05-06T10:01:42.626Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing explicit runner blueprint plan artifact in the runner/context epic branch; upstream lifecycle and evidence commits are stacked into this worktree."
  -
    type: "verify"
    at: "2026-05-06T10:04:05.272Z"
    author: "CODER"
    state: "ok"
    note: "Verified: runner bundle now exposes a named blueprint plan artifact path and writes the embedded blueprint plan there during prepare."
doc_version: 3
doc_updated_at: "2026-05-06T10:04:05.281Z"
doc_updated_by: "CODER"
description: "Embed the resolved blueprint snapshot into runner bundle output as a compact execution contract for agents and external runners."
sections:
  Summary: |-
    Embed resolved blueprint plan in runner bundle
    
    Embed the resolved blueprint snapshot into runner bundle output as a compact execution contract for agents and external runners.
  Scope: |-
    - In scope: Embed the resolved blueprint snapshot into runner bundle output as a compact execution contract for agents and external runners.
    - Out of scope: unrelated refactors not required for "Embed resolved blueprint plan in runner bundle".
  Plan: "Make the runner bundle explicitly carry and persist the resolved blueprint runner plan. Add a named runner artifact path for the blueprint plan and write the same plan that is embedded in bundle.json to that path during prepare."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T10:04:05.272Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: runner bundle now exposes a named blueprint plan artifact path and writes the embedded blueprint plan there during prepare.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:01:42.626Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-N3MJJ1-blueprint-runner-context/.agentplane/tasks/202605060915-N3MJJ1/blueprint/resolved-snapshot.json
    - old_digest: dbb4292fec92bd380de78b415a13920332282ec250cdfc2247bc2e1dbb42ab2a
    - current_digest: dbb4292fec92bd380de78b415a13920332282ec250cdfc2247bc2e1dbb42ab2a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-N3MJJ1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/task-run-paths.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 7 tests passed. Command: bun run typecheck; Result: pass. Command: bunx prettier --check touched runner files; Result: pass. Command: bunx eslint touched runner files; Result: pass. Command: git diff --check; Result: pass.
      Impact: Runner artifacts now include blueprint-plan.json as a first-class path alongside bundle.json, so consumers can inspect the resolved plan without parsing the full bundle.
      Resolution: Added blueprint_plan_path to runner artifact paths, testkit fixtures, dry-run output, and runner plan persistence.
id_source: "generated"
---
