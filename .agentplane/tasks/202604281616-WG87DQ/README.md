---
id: "202604281616-WG87DQ"
title: "Harden branch_pr close and verification reconciliation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-28T16:17:00.774Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-28T16:27:20.152Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; Result: pass; Evidence: 12 pass, 0 fail, including dirty PR fast-fail. Scope: remote check watcher. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts; Result: pass; Evidence: 4 pass, 0 fail, including remote merged close PR duplicate skip. Scope: hosted-close-pr lifecycle. Command: bun x prettier --check <changed files>; Result: pass. Scope: formatting. Command: bun x eslint <changed files>; Result: pass. Scope: changed script/source/test files. Command: bun run typecheck; Result: pass; Evidence: tsc -b. Scope: workspace types. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime 0.3.29 matches expected. Scope: framework dev runtime. Command: node .agentplane/policy/check-routing.mjs && git diff --check; Result: pass. Scope: policy routing and whitespace."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved branch_pr lifecycle hardening in the task worktree: hosted-close idempotency, dirty PR check waiting diagnostics, and verification artifact reconciliation."
events:
  -
    type: "status"
    at: "2026-04-28T16:17:24.477Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved branch_pr lifecycle hardening in the task worktree: hosted-close idempotency, dirty PR check waiting diagnostics, and verification artifact reconciliation."
  -
    type: "verify"
    at: "2026-04-28T16:27:20.152Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; Result: pass; Evidence: 12 pass, 0 fail, including dirty PR fast-fail. Scope: remote check watcher. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts; Result: pass; Evidence: 4 pass, 0 fail, including remote merged close PR duplicate skip. Scope: hosted-close-pr lifecycle. Command: bun x prettier --check <changed files>; Result: pass. Scope: formatting. Command: bun x eslint <changed files>; Result: pass. Scope: changed script/source/test files. Command: bun run typecheck; Result: pass; Evidence: tsc -b. Scope: workspace types. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime 0.3.29 matches expected. Scope: framework dev runtime. Command: node .agentplane/policy/check-routing.mjs && git diff --check; Result: pass. Scope: policy routing and whitespace."
doc_version: 3
doc_updated_at: "2026-04-28T16:27:20.166Z"
doc_updated_by: "CODER"
description: "Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows."
sections:
  Summary: |-
    Harden branch_pr close and verification reconciliation
    
    Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows.
  Scope: |-
    - In scope: Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows.
    - Out of scope: unrelated refactors not required for "Harden branch_pr close and verification reconciliation".
  Plan: "1. Inspect hosted-close, wait-remote-checks, and task close/verification code paths against the observed v0.3.29 log failures. 2. Implement narrow lifecycle hardening: hosted close must detect already-merged close PRs and avoid duplicate PRs; remote check waiting must fail fast or report clearly when GitHub marks a PR dirty/conflicting before checks appear; task/PR artifacts must not present DONE release/hosted-close outcomes with pending or skipped verification when evidence exists. 3. Add focused regression tests for duplicate hosted-close prevention, dirty PR check waiting, and closure verification artifact reconciliation. 4. Verify with targeted tests, typecheck or relevant project checks, policy routing, and git diff check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-28T16:27:20.152Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; Result: pass; Evidence: 12 pass, 0 fail, including dirty PR fast-fail. Scope: remote check watcher. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts; Result: pass; Evidence: 4 pass, 0 fail, including remote merged close PR duplicate skip. Scope: hosted-close-pr lifecycle. Command: bun x prettier --check <changed files>; Result: pass. Scope: formatting. Command: bun x eslint <changed files>; Result: pass. Scope: changed script/source/test files. Command: bun run typecheck; Result: pass; Evidence: tsc -b. Scope: workspace types. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime 0.3.29 matches expected. Scope: framework dev runtime. Command: node .agentplane/policy/check-routing.mjs && git diff --check; Result: pass. Scope: policy routing and whitespace.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T16:17:24.477Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Release evidence reconciliation is not fully fixed in this atom: release-task-evidence apply already writes verification.state=ok, but legacy DONE+pending tasks are widespread and need a separate migration-aware invariant.
      Impact: Avoids widening this branch_pr lifecycle patch into a broad historical task migration while still preventing the two repeated operational failures that caused duplicate close PRs and wasted check polling.
      Resolution: Follow-up should add a scoped release/hosted evidence reconciliation check that applies only to new release tasks or provides an explicit baseline for legacy DONE+pending artifacts.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Harden branch_pr close and verification reconciliation

Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows.

## Scope

- In scope: Fix recurring branch_pr lifecycle failure modes from recent logs: make hosted close idempotent, make remote-check waiting fail fast on conflicted PRs, and preserve verification evidence consistently when a task is closed from hosted or release flows.
- Out of scope: unrelated refactors not required for "Harden branch_pr close and verification reconciliation".

## Plan

1. Inspect hosted-close, wait-remote-checks, and task close/verification code paths against the observed v0.3.29 log failures. 2. Implement narrow lifecycle hardening: hosted close must detect already-merged close PRs and avoid duplicate PRs; remote check waiting must fail fast or report clearly when GitHub marks a PR dirty/conflicting before checks appear; task/PR artifacts must not present DONE release/hosted-close outcomes with pending or skipped verification when evidence exists. 3. Add focused regression tests for duplicate hosted-close prevention, dirty PR check waiting, and closure verification artifact reconciliation. 4. Verify with targeted tests, typecheck or relevant project checks, policy routing, and git diff check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-28T16:27:20.152Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; Result: pass; Evidence: 12 pass, 0 fail, including dirty PR fast-fail. Scope: remote check watcher. Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-hosted-close-pr.test.ts; Result: pass; Evidence: 4 pass, 0 fail, including remote merged close PR duplicate skip. Scope: hosted-close-pr lifecycle. Command: bun x prettier --check <changed files>; Result: pass. Scope: formatting. Command: bun x eslint <changed files>; Result: pass. Scope: changed script/source/test files. Command: bun run typecheck; Result: pass; Evidence: tsc -b. Scope: workspace types. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: repo-local runtime 0.3.29 matches expected. Scope: framework dev runtime. Command: node .agentplane/policy/check-routing.mjs && git diff --check; Result: pass. Scope: policy routing and whitespace.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T16:17:24.477Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Release evidence reconciliation is not fully fixed in this atom: release-task-evidence apply already writes verification.state=ok, but legacy DONE+pending tasks are widespread and need a separate migration-aware invariant.
  Impact: Avoids widening this branch_pr lifecycle patch into a broad historical task migration while still preventing the two repeated operational failures that caused duplicate close PRs and wasted check polling.
  Resolution: Follow-up should add a scoped release/hosted evidence reconciliation check that applies only to new release tasks or provides an explicit baseline for legacy DONE+pending artifacts.
  Promotion: incident-candidate
  Fixability: external
