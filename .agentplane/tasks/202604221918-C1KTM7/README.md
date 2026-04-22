---
id: "202604221918-C1KTM7"
title: "Validate suite and selector test targets"
result_summary: "Validated hard-coded Vitest suite and local CI selector test targets."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202604221918-25GXRR"
tags:
  - "code"
  - "test"
verify:
  - "bun run test:precommit"
  - "bun run vitest:projects:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T19:37:38.260Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T19:39:16.899Z"
  updated_by: "CODER"
  note: "Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and target-backed test routing OK. Command: bun run test:precommit; Result: pass; Evidence: 17 files passed, 134 tests passed. Command: bun run lint:core -- scripts/check-test-routing.mjs scripts/run-vitest-suite.mjs scripts/lib/local-ci-selection.mjs packages/agentplane/src/cli/test-routing-check.test.ts; Result: pass."
commit:
  hash: "500e6dbf97cf0e4179efe7714421aeed431e8e33"
  message: "✨ C1KTM7 test: validate suite targets"
comments:
  -
    author: "CODER"
    body: "Start: validating hard-coded Vitest suite and local CI selector targets against the shared test inventory."
  -
    author: "CODER"
    body: "Verified: suite and selector target validation is wired into the routing check and precommit coverage passed."
events:
  -
    type: "status"
    at: "2026-04-22T19:37:38.638Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: validating hard-coded Vitest suite and local CI selector targets against the shared test inventory."
  -
    type: "verify"
    at: "2026-04-22T19:39:16.899Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and target-backed test routing OK. Command: bun run test:precommit; Result: pass; Evidence: 17 files passed, 134 tests passed. Command: bun run lint:core -- scripts/check-test-routing.mjs scripts/run-vitest-suite.mjs scripts/lib/local-ci-selection.mjs packages/agentplane/src/cli/test-routing-check.test.ts; Result: pass."
  -
    type: "status"
    at: "2026-04-22T19:39:23.254Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: suite and selector target validation is wired into the routing check and precommit coverage passed."
doc_version: 3
doc_updated_at: "2026-04-22T19:39:23.254Z"
doc_updated_by: "CODER"
description: "Make run-vitest-suite and local CI selector targets validate against the shared test inventory so stale hard-coded test paths cannot survive silently."
sections:
  Summary: |-
    Validate suite and selector test targets
    
    Make run-vitest-suite and local CI selector targets validate against the shared test inventory so stale hard-coded test paths cannot survive silently.
  Scope: |-
    - In scope: validate hard-coded run-vitest-suite targets and local CI selector targets against the shared inventory.
    - In scope: make stale suite files fail before an individual suite happens to run.
    - In scope: keep target validation cheap and deterministic.
    - Out of scope: redesigning all suite definitions into a new DSL.
  Plan: "Validate hard-coded Vitest suite and local CI selector targets against the shared inventory, preventing stale test file references from surviving silently."
  Verify Steps: |-
    1. Run `bun run vitest:projects:check`. Expected: validates suite/selector targets and passes.
    2. Run `bun run test:precommit`. Expected: pass.
    3. Run a direct validation command if added. Expected: stale target detection is covered.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T19:39:16.899Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and target-backed test routing OK. Command: bun run test:precommit; Result: pass; Evidence: 17 files passed, 134 tests passed. Command: bun run lint:core -- scripts/check-test-routing.mjs scripts/run-vitest-suite.mjs scripts/lib/local-ci-selection.mjs packages/agentplane/src/cli/test-routing-check.test.ts; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T19:37:38.646Z, excerpt_hash=sha256:6c4dd621bce3ebddc3850ac1081a3c806f80d28b219c696155c522c4602ea78c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Validate suite and selector test targets

Make run-vitest-suite and local CI selector targets validate against the shared test inventory so stale hard-coded test paths cannot survive silently.

## Scope

- In scope: validate hard-coded run-vitest-suite targets and local CI selector targets against the shared inventory.
- In scope: make stale suite files fail before an individual suite happens to run.
- In scope: keep target validation cheap and deterministic.
- Out of scope: redesigning all suite definitions into a new DSL.

## Plan

Validate hard-coded Vitest suite and local CI selector targets against the shared inventory, preventing stale test file references from surviving silently.

## Verify Steps

1. Run `bun run vitest:projects:check`. Expected: validates suite/selector targets and passes.
2. Run `bun run test:precommit`. Expected: pass.
3. Run a direct validation command if added. Expected: stale target detection is covered.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T19:39:16.899Z — VERIFY — ok

By: CODER

Note: Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK and target-backed test routing OK. Command: bun run test:precommit; Result: pass; Evidence: 17 files passed, 134 tests passed. Command: bun run lint:core -- scripts/check-test-routing.mjs scripts/run-vitest-suite.mjs scripts/lib/local-ci-selection.mjs packages/agentplane/src/cli/test-routing-check.test.ts; Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T19:37:38.646Z, excerpt_hash=sha256:6c4dd621bce3ebddc3850ac1081a3c806f80d28b219c696155c522c4602ea78c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
