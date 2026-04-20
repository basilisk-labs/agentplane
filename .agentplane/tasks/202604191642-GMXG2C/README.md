---
id: "202604191642-GMXG2C"
title: "Prototype clack prompts in interactive command flows"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T15:44:24.567Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T15:54:18.493Z"
  updated_by: "CODER"
  note: "Implemented clack-backed TTY prompts behind cli/prompts with plain/non-TTY fallback. Verification passed: bunx vitest run packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts --reporter dot; bun run --filter=agentplane typecheck; bun run format:check; bun run lint:core; bun run build."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Prototyping clack prompts behind the existing prompt abstraction."
events:
  -
    type: "status"
    at: "2026-04-20T15:44:25.711Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Prototyping clack prompts behind the existing prompt abstraction."
  -
    type: "verify"
    at: "2026-04-20T15:54:18.493Z"
    author: "CODER"
    state: "ok"
    note: "Implemented clack-backed TTY prompts behind cli/prompts with plain/non-TTY fallback. Verification passed: bunx vitest run packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts --reporter dot; bun run --filter=agentplane typecheck; bun run format:check; bun run lint:core; bun run build."
doc_version: 3
doc_updated_at: "2026-04-20T15:54:18.525Z"
doc_updated_by: "CODER"
description: "Epic K. Evaluate @clack/prompts in interactive init and plugin installation flows without breaking non-interactive behavior."
sections:
  Summary: |-
    Prototype clack prompts in interactive command flows
    
    Epic K. Evaluate @clack/prompts in interactive init and plugin installation flows without breaking non-interactive behavior.
  Scope: |-
    - In scope: Epic K. Evaluate @clack/prompts in interactive init and plugin installation flows without breaking non-interactive behavior.
    - Out of scope: unrelated refactors not required for "Prototype clack prompts in interactive command flows".
  Plan: "Prototype @clack/prompts only behind the existing interactive prompt abstraction. Add the dependency to the CLI package, keep non-TTY and injected prompt tests on the current deterministic stdio path, and use clack for recoverable TTY input/confirm/select flows where it improves UX without changing command contracts. Add focused tests for fallback behavior and run targeted prompt/init or plugin-install tests plus format, lint, and build."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T15:54:18.493Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented clack-backed TTY prompts behind cli/prompts with plain/non-TTY fallback. Verification passed: bunx vitest run packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts --reporter dot; bun run --filter=agentplane typecheck; bun run format:check; bun run lint:core; bun run build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T15:44:25.737Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prototype clack prompts in interactive command flows

Epic K. Evaluate @clack/prompts in interactive init and plugin installation flows without breaking non-interactive behavior.

## Scope

- In scope: Epic K. Evaluate @clack/prompts in interactive init and plugin installation flows without breaking non-interactive behavior.
- Out of scope: unrelated refactors not required for "Prototype clack prompts in interactive command flows".

## Plan

Prototype @clack/prompts only behind the existing interactive prompt abstraction. Add the dependency to the CLI package, keep non-TTY and injected prompt tests on the current deterministic stdio path, and use clack for recoverable TTY input/confirm/select flows where it improves UX without changing command contracts. Add focused tests for fallback behavior and run targeted prompt/init or plugin-install tests plus format, lint, and build.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T15:54:18.493Z — VERIFY — ok

By: CODER

Note: Implemented clack-backed TTY prompts behind cli/prompts with plain/non-TTY fallback. Verification passed: bunx vitest run packages/agentplane/src/cli/prompts.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.codex-plugin.test.ts --reporter dot; bun run --filter=agentplane typecheck; bun run format:check; bun run lint:core; bun run build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T15:44:25.737Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
