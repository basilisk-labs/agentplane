---
id: "202605051359-R5XAZG"
title: "Require incident cleanup before release tasks"
result_summary: "Merged via PR #911."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T13:59:20.236Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T14:05:48.588Z"
  updated_by: "CODER"
  note: "Implemented release incident cleanup gate and verified focused release contracts, typecheck, policy routing, workflow command checks, agents check, diff whitespace, and repo-local doctor."
commit:
  hash: "42743c894bc6b9c0fd7b664c18515a119f8cda16"
  message: "Merge pull request #911 from basilisk-labs/task/202605051359-R5XAZG/release-incident-gate"
comments:
  -
    author: "CODER"
    body: "Start: implementing release incident cleanup CI gate in the dedicated branch_pr worktree after approved scope and clean preflight."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #911 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-05T13:59:31.357Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing release incident cleanup CI gate in the dedicated branch_pr worktree after approved scope and clean preflight."
  -
    type: "verify"
    at: "2026-05-05T14:05:48.588Z"
    author: "CODER"
    state: "ok"
    note: "Implemented release incident cleanup gate and verified focused release contracts, typecheck, policy routing, workflow command checks, agents check, diff whitespace, and repo-local doctor."
  -
    type: "status"
    at: "2026-05-05T14:40:58.042Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #911 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-05T14:40:58.048Z"
doc_updated_by: "INTEGRATOR"
description: "Add a CI/release gate so every release is preceded by an incident review/fix task for .agentplane/policy/incidents.md and cleanup of that file before release tasks run."
sections:
  Summary: |-
    Require incident cleanup before release tasks
    
    Add a CI/release gate so every release is preceded by an incident review/fix task for .agentplane/policy/incidents.md and cleanup of that file before release tasks run.
  Scope: |-
    - In scope: Add a CI/release gate so every release is preceded by an incident review/fix task for .agentplane/policy/incidents.md and cleanup of that file before release tasks run.
    - Out of scope: unrelated refactors not required for "Require incident cleanup before release tasks".
  Plan: "Plan: 1. Inspect release CI/workflow scripts and current incidents handling. 2. Add a machine-checkable release prerequisite gate that fails release CI unless .agentplane/policy/incidents.md was reviewed/fixed and cleaned before release work. 3. Wire the gate into release CI/prepublish path without bypassing parity/version checks. 4. Add/update focused tests or fixtures for the guard. 5. Verify with task verify-show, targeted tests, agentplane doctor, and policy routing check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T14:05:48.588Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented release incident cleanup gate and verified focused release contracts, typecheck, policy routing, workflow command checks, agents check, diff whitespace, and repo-local doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T13:59:31.357Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: node scripts/check-release-incidents.mjs now fails on the current registry because .agentplane/policy/incidents.md still contains 15 active entries.
      Impact: Future release planning, prepublish, release-ready manifest generation, and publish detection are blocked until a dedicated incident cleanup task resolves or archives those entries and cleans incidents.md.
      Resolution: Leave current incident cleanup as a separate release-prep task; this task only adds the enforceable guard and tests.
id_source: "generated"
---
