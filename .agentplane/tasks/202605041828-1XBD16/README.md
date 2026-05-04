---
id: "202605041828-1XBD16"
title: "Batch branch_pr doctor git checks"
status: "DONE"
priority: "med"
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
  updated_at: "2026-05-04T18:28:47.763Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T18:40:10.931Z"
  updated_by: "CODER"
  note: "Focused branch_pr doctor tests, live doctor, typecheck, formatting, and lint passed for cached git probes."
commit:
  hash: "81a80a2f532b83fd3dcef088ee5fe1c383c26f4c"
  message: "🚧 RCSMN7 task: Add fast doctor tier for large task archives [202605041827-RCSMN7]"
comments:
  -
    author: "CODER"
    body: "Start: reduce branch_pr doctor git subprocess overhead while preserving existing drift diagnostics in the approved batch worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #874 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-04T18:29:29.940Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reduce branch_pr doctor git subprocess overhead while preserving existing drift diagnostics in the approved batch worktree."
  -
    type: "verify"
    at: "2026-05-04T18:40:10.931Z"
    author: "CODER"
    state: "ok"
    note: "Focused branch_pr doctor tests, live doctor, typecheck, formatting, and lint passed for cached git probes."
  -
    type: "status"
    at: "2026-05-04T18:49:58.109Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #874 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-04T18:49:58.111Z"
doc_updated_by: "INTEGRATOR"
description: "Reduce branch_pr doctor drift latency by narrowing actionable candidates before git subprocess checks and batching repeated ref/base lookups where possible."
sections:
  Summary: |-
    Batch branch_pr doctor git checks
    
    Reduce branch_pr doctor drift latency by narrowing actionable candidates before git subprocess checks and batching repeated ref/base lookups where possible.
  Scope: |-
    - In scope: Reduce branch_pr doctor drift latency by narrowing actionable candidates before git subprocess checks and batching repeated ref/base lookups where possible.
    - Out of scope: unrelated refactors not required for "Batch branch_pr doctor git checks".
  Plan: "1. Inspect branch_pr doctor candidate filters and git subprocess calls. 2. Narrow branch_pr drift candidates before invoking git, cache base/ref checks per doctor run, and batch repeated existence checks where the local git API allows it. 3. Preserve existing warning semantics for shipped tasks, DONE open PR artifacts, and batch included-task drift. 4. Add focused regressions for reduced git calls and unchanged diagnostics."
  Verify Steps: |-
    1. Run focused branch_pr doctor tests. Expected: existing diagnostics remain and candidate filtering avoids git calls for non-actionable tasks.
    2. Run agentplane doctor on this repository. Expected: command completes successfully.
    3. Run TypeScript/typecheck for changed doctor/git paths. Expected: no type errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T18:40:10.931Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused branch_pr doctor tests, live doctor, typecheck, formatting, and lint passed for cached git probes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:29:29.940Z, excerpt_hash=sha256:a3a2bc56bdb0576388168819a0272de7be625be815a4019b6bf9927167e2820b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts; Result: pass; Evidence: 3 files, 29 tests passed including branch_pr open PR drift checks. Command: agentplane doctor; Result: pass; Evidence: doctor OK. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bunx eslint changed doctor/git files; Result: pass; Evidence: eslint exited 0.
      Impact: Repeated ref/base/ancestry checks inside one branch_pr doctor run are cached, reducing duplicate git subprocess work without changing diagnostics.
      Resolution: Added a per-run BranchPrGitProbe cache used by shipped-task and DONE-open-PR drift checks.
id_source: "generated"
---
## Summary

Batch branch_pr doctor git checks

Reduce branch_pr doctor drift latency by narrowing actionable candidates before git subprocess checks and batching repeated ref/base lookups where possible.

## Scope

- In scope: Reduce branch_pr doctor drift latency by narrowing actionable candidates before git subprocess checks and batching repeated ref/base lookups where possible.
- Out of scope: unrelated refactors not required for "Batch branch_pr doctor git checks".

## Plan

1. Inspect branch_pr doctor candidate filters and git subprocess calls. 2. Narrow branch_pr drift candidates before invoking git, cache base/ref checks per doctor run, and batch repeated existence checks where the local git API allows it. 3. Preserve existing warning semantics for shipped tasks, DONE open PR artifacts, and batch included-task drift. 4. Add focused regressions for reduced git calls and unchanged diagnostics.

## Verify Steps

1. Run focused branch_pr doctor tests. Expected: existing diagnostics remain and candidate filtering avoids git calls for non-actionable tasks.
2. Run agentplane doctor on this repository. Expected: command completes successfully.
3. Run TypeScript/typecheck for changed doctor/git paths. Expected: no type errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T18:40:10.931Z — VERIFY — ok

By: CODER

Note: Focused branch_pr doctor tests, live doctor, typecheck, formatting, and lint passed for cached git probes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:29:29.940Z, excerpt_hash=sha256:a3a2bc56bdb0576388168819a0272de7be625be815a4019b6bf9927167e2820b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/commands/doctor.command.task-docs.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts; Result: pass; Evidence: 3 files, 29 tests passed including branch_pr open PR drift checks. Command: agentplane doctor; Result: pass; Evidence: doctor OK. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bunx eslint changed doctor/git files; Result: pass; Evidence: eslint exited 0.
  Impact: Repeated ref/base/ancestry checks inside one branch_pr doctor run are cached, reducing duplicate git subprocess work without changing diagnostics.
  Resolution: Added a per-run BranchPrGitProbe cache used by shipped-task and DONE-open-PR drift checks.
