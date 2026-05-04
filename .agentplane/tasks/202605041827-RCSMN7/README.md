---
id: "202605041827-RCSMN7"
title: "Add fast doctor tier for large task archives"
result_summary: "Merged via PR #874."
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
  - "doctor"
  - "performance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T18:28:26.959Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T18:39:51.606Z"
  updated_by: "CODER"
  note: "Focused doctor tests passed; typecheck, live doctor, and policy routing passed for fast/default doctor behavior."
commit:
  hash: "81a80a2f532b83fd3dcef088ee5fe1c383c26f4c"
  message: "🚧 RCSMN7 task: Add fast doctor tier for large task archives [202605041827-RCSMN7]"
comments:
  -
    author: "CODER"
    body: "Start: implement the primary batch branch for fast doctor behavior and include related cache, branch_pr, and benchmark performance tasks in one worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #874 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-04T18:29:19.104Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the primary batch branch for fast doctor behavior and include related cache, branch_pr, and benchmark performance tasks in one worktree."
  -
    type: "verify"
    at: "2026-05-04T18:39:51.606Z"
    author: "CODER"
    state: "ok"
    note: "Focused doctor tests passed; typecheck, live doctor, and policy routing passed for fast/default doctor behavior."
  -
    type: "status"
    at: "2026-05-04T18:49:58.088Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #874 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-04T18:49:58.095Z"
doc_updated_by: "INTEGRATOR"
description: "Introduce a cheaper default doctor path that skips archive-wide task body drift checks unless explicitly requested, while preserving deep diagnostics behind flags."
sections:
  Summary: |-
    Add fast doctor tier for large task archives
    
    Introduce a cheaper default doctor path that skips archive-wide task body drift checks unless explicitly requested, while preserving deep diagnostics behind flags.
  Scope: |-
    - In scope: Introduce a cheaper default doctor path that skips archive-wide task body drift checks unless explicitly requested, while preserving deep diagnostics behind flags.
    - Out of scope: unrelated refactors not required for "Add fast doctor tier for large task archives".
  Plan: "1. Add a bounded doctor mode split so default doctor avoids full task README body drift scans on large archives. 2. Keep deep archive/body diagnostics available behind an explicit flag or dev/deep path without removing existing checks. 3. Update doctor tests and help/spec snapshots if flags or output change. 4. Execute this task in one related batch worktree that also includes N44VNX, 1XBD16, and P4V1R1 because the performance fixes share doctor/backend benchmark surfaces."
  Verify Steps: |-
    1. Run focused doctor tests covering default and deep/archive behavior. Expected: default doctor skips full task body drift scan while explicit deep/archive path still reports drift.
    2. Run TypeScript/typecheck for changed CLI/backend paths. Expected: no type errors.
    3. Run agentplane doctor on this repository. Expected: command completes and reports OK or only pre-existing non-blocking findings.
    4. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T18:39:51.606Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused doctor tests passed; typecheck, live doctor, and policy routing passed for fast/default doctor behavior.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:29:19.104Z, excerpt_hash=sha256:d460dd426e04bf5818be9b13c746a30953a9688028f550570b1c02f09ea5ae77
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts; Result: pass; Evidence: 3 files, 29 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: agentplane doctor; Result: pass; Evidence: doctor OK with runtime info only. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK.
      Impact: Default doctor now skips full task README body drift scanning while --deep preserves the expensive diagnostic path.
      Resolution: Added doctor --deep, gated checkTaskProjectionDrift behind deep mode, and covered default/deep behavior with focused tests.
id_source: "generated"
---
## Summary

Add fast doctor tier for large task archives

Introduce a cheaper default doctor path that skips archive-wide task body drift checks unless explicitly requested, while preserving deep diagnostics behind flags.

## Scope

- In scope: Introduce a cheaper default doctor path that skips archive-wide task body drift checks unless explicitly requested, while preserving deep diagnostics behind flags.
- Out of scope: unrelated refactors not required for "Add fast doctor tier for large task archives".

## Plan

1. Add a bounded doctor mode split so default doctor avoids full task README body drift scans on large archives. 2. Keep deep archive/body diagnostics available behind an explicit flag or dev/deep path without removing existing checks. 3. Update doctor tests and help/spec snapshots if flags or output change. 4. Execute this task in one related batch worktree that also includes N44VNX, 1XBD16, and P4V1R1 because the performance fixes share doctor/backend benchmark surfaces.

## Verify Steps

1. Run focused doctor tests covering default and deep/archive behavior. Expected: default doctor skips full task body drift scan while explicit deep/archive path still reports drift.
2. Run TypeScript/typecheck for changed CLI/backend paths. Expected: no type errors.
3. Run agentplane doctor on this repository. Expected: command completes and reports OK or only pre-existing non-blocking findings.
4. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing OK.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T18:39:51.606Z — VERIFY — ok

By: CODER

Note: Focused doctor tests passed; typecheck, live doctor, and policy routing passed for fast/default doctor behavior.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:29:19.104Z, excerpt_hash=sha256:d460dd426e04bf5818be9b13c746a30953a9688028f550570b1c02f09ea5ae77

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts; Result: pass; Evidence: 3 files, 29 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: agentplane doctor; Result: pass; Evidence: doctor OK with runtime info only. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK.
  Impact: Default doctor now skips full task README body drift scanning while --deep preserves the expensive diagnostic path.
  Resolution: Added doctor --deep, gated checkTaskProjectionDrift behind deep mode, and covered default/deep behavior with focused tests.
