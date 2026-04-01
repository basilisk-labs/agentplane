---
id: "202603301857-F0343K"
title: "Replace process-wide stdout/stderr monkey-patching with a structured output collector"
result_summary: "integrate: squash task/202603301857-F0343K/structured-output-collector"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603301856-CKA7KC"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T12:45:00.215Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T12:52:08.296Z"
  updated_by: "CODER"
  note: "Command: bunx eslint packages/agentplane/src/cli/run-cli/globals.ts packages/agentplane/src/cli/run-cli.core.test.ts; Result: pass; Evidence: 0 lint errors after the collector refactor and contract-test update; Scope: globals.ts and JSON contract test. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 84 tests passed covering runWithOutputMode and JSON task-query envelopes; Scope: CLI JSON/output contracts. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 after the structured collector change; Scope: package buildability for the touched production path."
commit:
  hash: "06878577c70463eaaf038db1ac9ec155e1027c49"
  message: "🧩 F0343K integrate: squash task/202603301857-F0343K/structured-output-collector"
comments:
  -
    author: "CODER"
    body: "Start: replace process-wide stdout/stderr monkey-patching with a task-scoped structured collector while preserving current JSON output contracts."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-F0343K/pr."
events:
  -
    type: "status"
    at: "2026-03-31T12:45:55.716Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace process-wide stdout/stderr monkey-patching with a task-scoped structured collector while preserving current JSON output contracts."
  -
    type: "verify"
    at: "2026-03-31T12:52:08.296Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx eslint packages/agentplane/src/cli/run-cli/globals.ts packages/agentplane/src/cli/run-cli.core.test.ts; Result: pass; Evidence: 0 lint errors after the collector refactor and contract-test update; Scope: globals.ts and JSON contract test. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 84 tests passed covering runWithOutputMode and JSON task-query envelopes; Scope: CLI JSON/output contracts. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 after the structured collector change; Scope: package buildability for the touched production path."
  -
    type: "status"
    at: "2026-03-31T12:54:03.464Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603301857-F0343K/pr."
doc_version: 3
doc_updated_at: "2026-03-31T12:54:03.466Z"
doc_updated_by: "INTEGRATOR"
description: "Implement Epic 6 / R6.2 from REFACTOR.md. JSON mode no longer relies on global write interception, while preserving current output semantics."
sections:
  Summary: |-
    Replace process-wide stdout/stderr monkey-patching with a structured output collector
    
    Implement Epic 6 / R6.2 from REFACTOR.md. JSON mode no longer relies on global write interception, while preserving current output semantics.
  Scope: |-
    - In scope: Implement Epic 6 / R6.2 from REFACTOR.md. JSON mode no longer relies on global write interception, while preserving current output semantics.
    - Out of scope: unrelated refactors not required for "Replace process-wide stdout/stderr monkey-patching with a structured output collector".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts to isolate the exact behavior gap for R6.2.
    2. Implement the smallest change set that satisfies the REFACTOR contract: JSON mode no longer relies on global write interception, while preserving current output semantics.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts. Expected: the behavior described by R6.2 is observable and stable.
    2. Inspect the final diff for 202603301857-F0343K. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: JSON mode no longer relies on global write interception, while preserving current output semantics.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T12:52:08.296Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx eslint packages/agentplane/src/cli/run-cli/globals.ts packages/agentplane/src/cli/run-cli.core.test.ts; Result: pass; Evidence: 0 lint errors after the collector refactor and contract-test update; Scope: globals.ts and JSON contract test. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 84 tests passed covering runWithOutputMode and JSON task-query envelopes; Scope: CLI JSON/output contracts. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 after the structured collector change; Scope: package buildability for the touched production path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:45:55.717Z, excerpt_hash=sha256:68a03190922867c5908b0bb017085bcf05da91a0ba9109e762832506ae36082d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Replace process-wide stdout/stderr monkey-patching with a structured output collector

Implement Epic 6 / R6.2 from REFACTOR.md. JSON mode no longer relies on global write interception, while preserving current output semantics.

## Scope

- In scope: Implement Epic 6 / R6.2 from REFACTOR.md. JSON mode no longer relies on global write interception, while preserving current output semantics.
- Out of scope: unrelated refactors not required for "Replace process-wide stdout/stderr monkey-patching with a structured output collector".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts to isolate the exact behavior gap for R6.2.
2. Implement the smallest change set that satisfies the REFACTOR contract: JSON mode no longer relies on global write interception, while preserving current output semantics.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts. Expected: the behavior described by R6.2 is observable and stable.
2. Inspect the final diff for 202603301857-F0343K. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: JSON mode no longer relies on global write interception, while preserving current output semantics.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T12:52:08.296Z — VERIFY — ok

By: CODER

Note: Command: bunx eslint packages/agentplane/src/cli/run-cli/globals.ts packages/agentplane/src/cli/run-cli.core.test.ts; Result: pass; Evidence: 0 lint errors after the collector refactor and contract-test update; Scope: globals.ts and JSON contract test. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 84 tests passed covering runWithOutputMode and JSON task-query envelopes; Scope: CLI JSON/output contracts. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0 after the structured collector change; Scope: package buildability for the touched production path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T12:45:55.717Z, excerpt_hash=sha256:68a03190922867c5908b0bb017085bcf05da91a0ba9109e762832506ae36082d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
