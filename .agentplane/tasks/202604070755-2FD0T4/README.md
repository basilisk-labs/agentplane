---
id: "202604070755-2FD0T4"
title: "Add retryable gh transport wrapper for flaky GitHub API calls"
result_summary: "Merged via PR #123."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T09:36:23.150Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T09:46:35.856Z"
  updated_by: "CODER"
  note: "Command: bun test hosted-merge-sync.test.ts and run-cli.core.pr-close.test.ts; Result: pass; Evidence: 11 pass, 0 fail covering transient retry and permanent auth stop behavior in hosted-merge-sync and pr close. Scope: shared GitHub transport retry wrapper and both consumer command paths. Command: bun x eslint touched gh transport files; Result: pass; Evidence: no lint errors. Scope: shared helper, command consumers, and regression tests. Command: review call sites; Result: pass; Evidence: retry/backoff classifier is centralized and pr close stays on REST gh api endpoints. Scope: transport call-site design."
commit:
  hash: "0cf28277a68597386a29455ced5b4666a569ecf5"
  message: "🧩 2FD0T4 code: add gh transport retry wrapper (#123)"
comments:
  -
    author: "CODER"
    body: "Start: extract a shared GitHub transport retry helper and apply it to hosted-merge-sync plus pr close so transient EOF/TLS failures retry while permanent auth and usage failures still stop immediately."
  -
    author: "INTEGRATOR"
    body: "Verified: GitHub PR #123 was merged to main, the squash commit is present on the base branch, and this reconcile wave is closing the stale branch_pr task state."
events:
  -
    type: "status"
    at: "2026-04-07T09:37:31.098Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract a shared GitHub transport retry helper and apply it to hosted-merge-sync plus pr close so transient EOF/TLS failures retry while permanent auth and usage failures still stop immediately."
  -
    type: "verify"
    at: "2026-04-07T09:46:35.856Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test hosted-merge-sync.test.ts and run-cli.core.pr-close.test.ts; Result: pass; Evidence: 11 pass, 0 fail covering transient retry and permanent auth stop behavior in hosted-merge-sync and pr close. Scope: shared GitHub transport retry wrapper and both consumer command paths. Command: bun x eslint touched gh transport files; Result: pass; Evidence: no lint errors. Scope: shared helper, command consumers, and regression tests. Command: review call sites; Result: pass; Evidence: retry/backoff classifier is centralized and pr close stays on REST gh api endpoints. Scope: transport call-site design."
  -
    type: "status"
    at: "2026-04-07T17:58:29.005Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: GitHub PR #123 was merged to main, the squash commit is present on the base branch, and this reconcile wave is closing the stale branch_pr task state."
doc_version: 3
doc_updated_at: "2026-04-07T17:58:29.006Z"
doc_updated_by: "INTEGRATOR"
description: "Wrap gh-backed GitHub transport operations with bounded retry/backoff and REST-first paths so transient EOF and TLS errors stop breaking workflow commands."
sections:
  Summary: |-
    Add retryable gh transport wrapper for flaky GitHub API calls
    
    Wrap gh-backed GitHub transport operations with bounded retry/backoff and REST-first paths so transient EOF and TLS errors stop breaking workflow commands.
  Scope: |-
    - In scope: Wrap gh-backed GitHub transport operations with bounded retry/backoff and REST-first paths so transient EOF and TLS errors stop breaking workflow commands.
    - Out of scope: unrelated refactors not required for "Add retryable gh transport wrapper for flaky GitHub API calls".
  Plan: "1. Extract a shared GitHub transport retry helper with transient/permanent error classification and bounded backoff. 2. Move hosted-merge-sync onto the shared helper and apply it to pr close REST calls so transient EOF/TLS errors retry while auth and usage failures still stop immediately. 3. Add regression coverage for retry and non-retry behavior, then run focused tests and lint."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.pr-close.test.ts`. Expected: transient GitHub transport errors are retried where intended, while auth/usage failures still stop immediately.
    2. Run `bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/pr/close.ts`. Expected: the shared transport wrapper and touched command paths stay lint-clean.
    3. Review the touched GitHub transport call sites. Expected: retry/backoff logic is centralized instead of duplicated, and the command paths stay REST-first where a REST endpoint already exists.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T09:46:35.856Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test hosted-merge-sync.test.ts and run-cli.core.pr-close.test.ts; Result: pass; Evidence: 11 pass, 0 fail covering transient retry and permanent auth stop behavior in hosted-merge-sync and pr close. Scope: shared GitHub transport retry wrapper and both consumer command paths. Command: bun x eslint touched gh transport files; Result: pass; Evidence: no lint errors. Scope: shared helper, command consumers, and regression tests. Command: review call sites; Result: pass; Evidence: retry/backoff classifier is centralized and pr close stays on REST gh api endpoints. Scope: transport call-site design.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T09:37:31.108Z, excerpt_hash=sha256:a33fac570c6c8a884fe8a9fc8cb02d6fb4300eadd3463dd56e94f5fcebb81410
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add retryable gh transport wrapper for flaky GitHub API calls

Wrap gh-backed GitHub transport operations with bounded retry/backoff and REST-first paths so transient EOF and TLS errors stop breaking workflow commands.

## Scope

- In scope: Wrap gh-backed GitHub transport operations with bounded retry/backoff and REST-first paths so transient EOF and TLS errors stop breaking workflow commands.
- Out of scope: unrelated refactors not required for "Add retryable gh transport wrapper for flaky GitHub API calls".

## Plan

1. Extract a shared GitHub transport retry helper with transient/permanent error classification and bounded backoff. 2. Move hosted-merge-sync onto the shared helper and apply it to pr close REST calls so transient EOF/TLS errors retry while auth and usage failures still stop immediately. 3. Add regression coverage for retry and non-retry behavior, then run focused tests and lint.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/cli/run-cli.core.pr-close.test.ts`. Expected: transient GitHub transport errors are retried where intended, while auth/usage failures still stop immediately.
2. Run `bun x eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/pr/close.ts`. Expected: the shared transport wrapper and touched command paths stay lint-clean.
3. Review the touched GitHub transport call sites. Expected: retry/backoff logic is centralized instead of duplicated, and the command paths stay REST-first where a REST endpoint already exists.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T09:46:35.856Z — VERIFY — ok

By: CODER

Note: Command: bun test hosted-merge-sync.test.ts and run-cli.core.pr-close.test.ts; Result: pass; Evidence: 11 pass, 0 fail covering transient retry and permanent auth stop behavior in hosted-merge-sync and pr close. Scope: shared GitHub transport retry wrapper and both consumer command paths. Command: bun x eslint touched gh transport files; Result: pass; Evidence: no lint errors. Scope: shared helper, command consumers, and regression tests. Command: review call sites; Result: pass; Evidence: retry/backoff classifier is centralized and pr close stays on REST gh api endpoints. Scope: transport call-site design.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T09:37:31.108Z, excerpt_hash=sha256:a33fac570c6c8a884fe8a9fc8cb02d6fb4300eadd3463dd56e94f5fcebb81410

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
