---
id: "202604050745-18JJ5E"
title: "Fix branch_pr shipped-task reconciliation and diagnostics"
result_summary: "Merged via PR #74."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-05T07:47:37.913Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T17:01:45.736Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts. Result: pass. Evidence: 36 targeted tests passed; doctor reports shipped open branch_pr tasks; normalize sync-path regressions passed; targeted eslint on touched workflow files passed; verification recorded after refreshing PR artifacts so last_verified_sha now matches the current task head."
commit:
  hash: "aadce675ae8585d9dacab044421fcab5e6b9abcd"
  message: "cli/workflow: Fix branch_pr shipped-task reconciliation and diagnostics (18JJ5E) (#74)"
comments:
  -
    author: "CODER"
    body: "Start: inspect doctor, task normalize, and hosted merge reconciliation paths to detect how a branch_pr task can already be shipped on base while remaining locally DOING, then implement the smallest deterministic repair and diagnostics path."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #74 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-05T08:02:11.770Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect doctor, task normalize, and hosted merge reconciliation paths to detect how a branch_pr task can already be shipped on base while remaining locally DOING, then implement the smallest deterministic repair and diagnostics path."
  -
    type: "verify"
    at: "2026-04-06T16:39:19.041Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts. Result: pass. Evidence: 36 targeted tests passed; doctor now reports shipped open branch_pr tasks; normalize sync-path regressions passed; targeted eslint on touched workflow files passed."
  -
    type: "verify"
    at: "2026-04-06T17:01:45.736Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts. Result: pass. Evidence: 36 targeted tests passed; doctor reports shipped open branch_pr tasks; normalize sync-path regressions passed; targeted eslint on touched workflow files passed; verification recorded after refreshing PR artifacts so last_verified_sha now matches the current task head."
  -
    type: "status"
    at: "2026-04-06T17:22:20.655Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #74 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-06T17:22:20.662Z"
doc_updated_by: "INTEGRATOR"
description: "Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically."
sections:
  Summary: |-
    Fix branch_pr shipped-task reconciliation and diagnostics
    
    Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically.
  Scope: |-
    - In scope: Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically.
    - Out of scope: unrelated refactors not required for "Fix branch_pr shipped-task reconciliation and diagnostics".
  Plan: "1. Audit the current doctor, task normalize, hosted-close, and hosted-merge-sync paths to determine where a shipped branch_pr task can remain DOING without any deterministic repair path. 2. Define the minimal canonical reconciliation rule for this state, keyed off base-branch ancestry plus existing task/PR metadata rather than guesswork. 3. Implement workflow diagnostics and the reconciliation path, then add focused regression coverage for the stale shipped-task fixture. 4. Run targeted verification and record the resulting behavior contract in the task artifacts."
  Verify Steps: "1. Reproduce a branch_pr task whose implementation commit is already reachable from the base branch while the task still remains DOING locally. Expected: doctor and/or task normalization report the stale shipped-task state instead of leaving it silent. 2. Run the new reconciliation path on that fixture. Expected: the task is deterministically moved to the correct DONE/commit state without inventing a merge that never happened. 3. Run the targeted workflow tests and package build. Expected: shipped-task reconciliation passes regressions and the touched workflow code still builds cleanly."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T16:39:19.041Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts. Result: pass. Evidence: 36 targeted tests passed; doctor now reports shipped open branch_pr tasks; normalize sync-path regressions passed; targeted eslint on touched workflow files passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-05T08:02:11.813Z, excerpt_hash=sha256:5efaece1e35fca92b3e374b9d2fb37a82e12fdceb6a4215ce9e8b9f8372f3b5a
    
    ### 2026-04-06T17:01:45.736Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts. Result: pass. Evidence: 36 targeted tests passed; doctor reports shipped open branch_pr tasks; normalize sync-path regressions passed; targeted eslint on touched workflow files passed; verification recorded after refreshing PR artifacts so last_verified_sha now matches the current task head.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T16:39:19.049Z, excerpt_hash=sha256:5efaece1e35fca92b3e374b9d2fb37a82e12fdceb6a4215ce9e8b9f8372f3b5a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix branch_pr shipped-task reconciliation and diagnostics

Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically.

## Scope

- In scope: Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically.
- Out of scope: unrelated refactors not required for "Fix branch_pr shipped-task reconciliation and diagnostics".

## Plan

1. Audit the current doctor, task normalize, hosted-close, and hosted-merge-sync paths to determine where a shipped branch_pr task can remain DOING without any deterministic repair path. 2. Define the minimal canonical reconciliation rule for this state, keyed off base-branch ancestry plus existing task/PR metadata rather than guesswork. 3. Implement workflow diagnostics and the reconciliation path, then add focused regression coverage for the stale shipped-task fixture. 4. Run targeted verification and record the resulting behavior contract in the task artifacts.

## Verify Steps

1. Reproduce a branch_pr task whose implementation commit is already reachable from the base branch while the task still remains DOING locally. Expected: doctor and/or task normalization report the stale shipped-task state instead of leaving it silent. 2. Run the new reconciliation path on that fixture. Expected: the task is deterministically moved to the correct DONE/commit state without inventing a merge that never happened. 3. Run the targeted workflow tests and package build. Expected: shipped-task reconciliation passes regressions and the touched workflow code still builds cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T16:39:19.041Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts. Result: pass. Evidence: 36 targeted tests passed; doctor now reports shipped open branch_pr tasks; normalize sync-path regressions passed; targeted eslint on touched workflow files passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-05T08:02:11.813Z, excerpt_hash=sha256:5efaece1e35fca92b3e374b9d2fb37a82e12fdceb6a4215ce9e8b9f8372f3b5a

### 2026-04-06T17:01:45.736Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/normalize.command.ts packages/agentplane/src/commands/task/normalize.ts. Result: pass. Evidence: 36 targeted tests passed; doctor reports shipped open branch_pr tasks; normalize sync-path regressions passed; targeted eslint on touched workflow files passed; verification recorded after refreshing PR artifacts so last_verified_sha now matches the current task head.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T16:39:19.049Z, excerpt_hash=sha256:5efaece1e35fca92b3e374b9d2fb37a82e12fdceb6a4215ce9e8b9f8372f3b5a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
