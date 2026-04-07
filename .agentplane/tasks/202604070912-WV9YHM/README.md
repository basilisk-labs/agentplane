---
id: "202604070912-WV9YHM"
title: "Sync incident template assets when incidents registry mutates"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "policy"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T09:19:32.159Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T17:32:51.322Z"
  updated_by: "CODER"
  note: "Stabilized the wait-remote-pr-checks gh mock under parallel polling; targeted and fast test suites pass after commit f9a5267b."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a shared incident-registry writer, route promotion through it, and cover framework-checkout sync so incidents.md mutations stop leaving canonical policy assets stale."
events:
  -
    type: "status"
    at: "2026-04-07T09:19:05.625Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a shared incident-registry writer, route promotion through it, and cover framework-checkout sync so incidents.md mutations stop leaving canonical policy assets stale."
  -
    type: "verify"
    at: "2026-04-07T09:25:05.406Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts; Result: pass; Evidence: 22 pass, 0 fail including hosted-close regression and policy allowlist coverage. Scope: incident promotion writer, hosted-close closure path, protected-path policy classification. Command: bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/shared/protected-paths.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts; Result: pass; Evidence: no lint errors. Scope: touched implementation and tests. Command: bun run agents:check; Result: pass; Evidence: agents templates OK. Scope: target/canonical policy sync contract in framework checkout."
  -
    type: "verify"
    at: "2026-04-07T17:31:37.453Z"
    author: "CODER"
    state: "ok"
    note: "Stabilized wait-remote-pr-checks gh mock under parallel status/check-runs polling; hosted-close, policy, and protected-path tests pass."
  -
    type: "verify"
    at: "2026-04-07T17:32:51.322Z"
    author: "CODER"
    state: "ok"
    note: "Stabilized the wait-remote-pr-checks gh mock under parallel polling; targeted and fast test suites pass after commit f9a5267b."
doc_version: 3
doc_updated_at: "2026-04-07T17:32:51.338Z"
doc_updated_by: "CODER"
description: "When integrate or hosted-close promotes incidents into .agentplane/policy/incidents.md, the canonical asset copy under packages/agentplane/assets/policy remains stale and later agents:check fails. Make incident mutation paths keep both files in sync or make the canonical source update deterministic."
sections:
  Summary: |-
    Sync incident template assets when incidents registry mutates
    
    When integrate or hosted-close promotes incidents into .agentplane/policy/incidents.md, the canonical asset copy under packages/agentplane/assets/policy remains stale and later agents:check fails. Make incident mutation paths keep both files in sync or make the canonical source update deterministic.
  Scope: |-
    - In scope: When integrate or hosted-close promotes incidents into .agentplane/policy/incidents.md, the canonical asset copy under packages/agentplane/assets/policy remains stale and later agents:check fails. Make incident mutation paths keep both files in sync or make the canonical source update deterministic.
    - Out of scope: unrelated refactors not required for "Sync incident template assets when incidents registry mutates".
  Plan: "1. Add a shared incident-registry write path that updates .agentplane/policy/incidents.md and mirrors packages/agentplane/assets/policy/incidents.md when the framework asset exists. 2. Route incidents collect/integrate/finish promotion through that shared writer without changing append-only registry semantics. 3. Add regression coverage proving framework checkouts keep target and canonical incident policy in sync, then run focused tests and lint."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: incident promotion paths still pass and the framework-checkout regression for synced incident assets is covered.
    2. Run `bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: touched implementation and regression coverage stay lint-clean.
    3. Run `bun run agents:check`. Expected: after an incident-registry mutation path updates `.agentplane/policy/incidents.md`, the canonical asset copy under `packages/agentplane/assets/policy/incidents.md` remains in sync and the check passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T09:25:05.406Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts; Result: pass; Evidence: 22 pass, 0 fail including hosted-close regression and policy allowlist coverage. Scope: incident promotion writer, hosted-close closure path, protected-path policy classification. Command: bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/shared/protected-paths.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts; Result: pass; Evidence: no lint errors. Scope: touched implementation and tests. Command: bun run agents:check; Result: pass; Evidence: agents templates OK. Scope: target/canonical policy sync contract in framework checkout.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T09:19:05.634Z, excerpt_hash=sha256:d89d732ab81937b954c3325ee6aeae70c9099363f9839c6430e5c0cd7440175c
    
    ### 2026-04-07T17:31:37.453Z — VERIFY — ok
    
    By: CODER
    
    Note: Stabilized wait-remote-pr-checks gh mock under parallel status/check-runs polling; hosted-close, policy, and protected-path tests pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T09:25:05.410Z, excerpt_hash=sha256:d89d732ab81937b954c3325ee6aeae70c9099363f9839c6430e5c0cd7440175c
    
    ### 2026-04-07T17:32:51.322Z — VERIFY — ok
    
    By: CODER
    
    Note: Stabilized the wait-remote-pr-checks gh mock under parallel polling; targeted and fast test suites pass after commit f9a5267b.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T17:31:37.461Z, excerpt_hash=sha256:d89d732ab81937b954c3325ee6aeae70c9099363f9839c6430e5c0cd7440175c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Sync incident template assets when incidents registry mutates

When integrate or hosted-close promotes incidents into .agentplane/policy/incidents.md, the canonical asset copy under packages/agentplane/assets/policy remains stale and later agents:check fails. Make incident mutation paths keep both files in sync or make the canonical source update deterministic.

## Scope

- In scope: When integrate or hosted-close promotes incidents into .agentplane/policy/incidents.md, the canonical asset copy under packages/agentplane/assets/policy remains stale and later agents:check fails. Make incident mutation paths keep both files in sync or make the canonical source update deterministic.
- Out of scope: unrelated refactors not required for "Sync incident template assets when incidents registry mutates".

## Plan

1. Add a shared incident-registry write path that updates .agentplane/policy/incidents.md and mirrors packages/agentplane/assets/policy/incidents.md when the framework asset exists. 2. Route incidents collect/integrate/finish promotion through that shared writer without changing append-only registry semantics. 3. Add regression coverage proving framework checkouts keep target and canonical incident policy in sync, then run focused tests and lint.

## Verify Steps

1. Run `bun test packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: incident promotion paths still pass and the framework-checkout regression for synced incident assets is covered.
2. Run `bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/runtime/incidents/resolve.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts`. Expected: touched implementation and regression coverage stay lint-clean.
3. Run `bun run agents:check`. Expected: after an incident-registry mutation path updates `.agentplane/policy/incidents.md`, the canonical asset copy under `packages/agentplane/assets/policy/incidents.md` remains in sync and the check passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T09:25:05.406Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/runtime/incidents/resolve.test.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts; Result: pass; Evidence: 22 pass, 0 fail including hosted-close regression and policy allowlist coverage. Scope: incident promotion writer, hosted-close closure path, protected-path policy classification. Command: bun x eslint packages/agentplane/src/commands/incidents/shared.ts packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts packages/agentplane/src/shared/protected-paths.ts packages/agentplane/src/shared/protected-paths.test.ts packages/agentplane/src/policy/evaluate.test.ts; Result: pass; Evidence: no lint errors. Scope: touched implementation and tests. Command: bun run agents:check; Result: pass; Evidence: agents templates OK. Scope: target/canonical policy sync contract in framework checkout.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T09:19:05.634Z, excerpt_hash=sha256:d89d732ab81937b954c3325ee6aeae70c9099363f9839c6430e5c0cd7440175c

### 2026-04-07T17:31:37.453Z — VERIFY — ok

By: CODER

Note: Stabilized wait-remote-pr-checks gh mock under parallel status/check-runs polling; hosted-close, policy, and protected-path tests pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T09:25:05.410Z, excerpt_hash=sha256:d89d732ab81937b954c3325ee6aeae70c9099363f9839c6430e5c0cd7440175c

### 2026-04-07T17:32:51.322Z — VERIFY — ok

By: CODER

Note: Stabilized the wait-remote-pr-checks gh mock under parallel polling; targeted and fast test suites pass after commit f9a5267b.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T17:31:37.461Z, excerpt_hash=sha256:d89d732ab81937b954c3325ee6aeae70c9099363f9839c6430e5c0cd7440175c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
