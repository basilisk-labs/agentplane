---
id: "202605041618-E011A7"
title: "Improve doctor performance and progress"
result_summary: "Merged via PR #866."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "doctor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T16:19:00.286Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T16:24:44.331Z"
  updated_by: "CODER"
  note: "Focused doctor tests, typecheck, formatting, routing, and live doctor check passed; live doctor completed in 10.90s with phase progress output."
commit:
  hash: "9b96103d3db0aa8686a2ac2548e3849fb7c04870"
  message: "Merge pull request #866 from basilisk-labs/task/202605041618-E011A7/doctor-progress-perf"
comments:
  -
    author: "CODER"
    body: "Start: implement doctor progress and performance improvements for large branch_pr task archives with focused regression coverage."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #866 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-04T16:19:19.320Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement doctor progress and performance improvements for large branch_pr task archives with focused regression coverage."
  -
    type: "verify"
    at: "2026-05-04T16:24:44.331Z"
    author: "CODER"
    state: "ok"
    note: "Focused doctor tests, typecheck, formatting, routing, and live doctor check passed; live doctor completed in 10.90s with phase progress output."
  -
    type: "status"
    at: "2026-05-04T16:50:26.856Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #866 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-04T16:50:26.861Z"
doc_updated_by: "INTEGRATOR"
description: "Reduce agentplane doctor silence and repeated expensive branch_pr scans on large task archives while preserving existing diagnostics."
sections:
  Summary: "Improve agentplane doctor performance and progress behavior on large local task archives without changing the diagnostic contract."
  Scope: "In scope: doctor command internals, branch_pr drift-check performance, focused tests, and verification evidence. Out of scope: unrelated asset changes, release publishing, task archive cleanup, and public docs copy."
  Plan: |-
    1. Inspect doctor checks and identify repeated full-archive branch_pr/git subprocess work.
    2. Add bounded progress output and reduce repeated listTasks/PR metadata scans without removing existing diagnostics.
    3. Add focused regression coverage for the optimized branch_pr doctor path.
    4. Verify with focused tests, routing, and a live doctor run.
  Verify Steps: |-
    1. Run focused doctor/branch_pr tests covering the changed behavior.
    2. Run npm package typecheck or targeted build check if source typing changed.
    3. Run node .agentplane/policy/check-routing.mjs.
    4. Run agentplane doctor and confirm it completes successfully with clearer progress/performance behavior.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T16:24:44.331Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused doctor tests, typecheck, formatting, routing, and live doctor check passed; live doctor completed in 10.90s with phase progress output.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T16:19:19.320Z, excerpt_hash=sha256:aada94c068b897283069073d7c794e8f6657424a9bce785c238c829d0161a543
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the doctor performance changes and test updates for task 202605041618-E011A7, then rerun the focused doctor tests and routing check."
  Findings: |-
    - Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor.command.open-pr.test.ts packages/agentplane/src/commands/doctor.fast.test.ts; Result: pass; Evidence: 2 files, 20 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bunx prettier --check changed doctor files; Result: pass; Evidence: All matched files use Prettier code style. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor (OK), progress phases printed, real 10.90s.
      Impact: doctor no longer appears silent during expensive checks and avoids repeated full local task scans across branch_pr doctor checks.
      Resolution: Added shared task-list memoization, moved shipped-task git checks behind cheap actionability filters, and emitted doctor phase progress.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Improve agentplane doctor performance and progress behavior on large local task archives without changing the diagnostic contract.

## Scope

In scope: doctor command internals, branch_pr drift-check performance, focused tests, and verification evidence. Out of scope: unrelated asset changes, release publishing, task archive cleanup, and public docs copy.

## Plan

1. Inspect doctor checks and identify repeated full-archive branch_pr/git subprocess work.
2. Add bounded progress output and reduce repeated listTasks/PR metadata scans without removing existing diagnostics.
3. Add focused regression coverage for the optimized branch_pr doctor path.
4. Verify with focused tests, routing, and a live doctor run.

## Verify Steps

1. Run focused doctor/branch_pr tests covering the changed behavior.
2. Run npm package typecheck or targeted build check if source typing changed.
3. Run node .agentplane/policy/check-routing.mjs.
4. Run agentplane doctor and confirm it completes successfully with clearer progress/performance behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T16:24:44.331Z — VERIFY — ok

By: CODER

Note: Focused doctor tests, typecheck, formatting, routing, and live doctor check passed; live doctor completed in 10.90s with phase progress output.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T16:19:19.320Z, excerpt_hash=sha256:aada94c068b897283069073d7c794e8f6657424a9bce785c238c829d0161a543

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the doctor performance changes and test updates for task 202605041618-E011A7, then rerun the focused doctor tests and routing check.

## Findings

- Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor.command.open-pr.test.ts packages/agentplane/src/commands/doctor.fast.test.ts; Result: pass; Evidence: 2 files, 20 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bunx prettier --check changed doctor files; Result: pass; Evidence: All matched files use Prettier code style. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor (OK), progress phases printed, real 10.90s.
  Impact: doctor no longer appears silent during expensive checks and avoids repeated full local task scans across branch_pr doctor checks.
  Resolution: Added shared task-list memoization, moved shipped-task git checks behind cheap actionability filters, and emitted doctor phase progress.
  Promotion: incident-candidate
  Fixability: external
