---
id: "202604191642-E9ZVBF"
title: "Use zod-validation-error in CLI validation output"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T15:38:58.244Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T15:43:47.161Z"
  updated_by: "CODER"
  note: "Implemented zod-validation-error CLI rendering. Verification passed: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.core.test.ts --reporter dot; bun run --filter=agentplane typecheck; bun run format:check; bun run lint:core; bun run build."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Wiring zod-validation-error into CLI validation error rendering."
events:
  -
    type: "status"
    at: "2026-04-20T15:38:58.827Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Wiring zod-validation-error into CLI validation error rendering."
  -
    type: "verify"
    at: "2026-04-20T15:43:47.161Z"
    author: "CODER"
    state: "ok"
    note: "Implemented zod-validation-error CLI rendering. Verification passed: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.core.test.ts --reporter dot; bun run --filter=agentplane typecheck; bun run format:check; bun run lint:core; bun run build."
doc_version: 3
doc_updated_at: "2026-04-20T15:43:47.173Z"
doc_updated_by: "CODER"
description: "Epic K and H′. Adopt zod-validation-error for human-readable schema and config validation output in the CLI."
sections:
  Summary: |-
    Use zod-validation-error in CLI validation output
    
    Epic K and H′. Adopt zod-validation-error for human-readable schema and config validation output in the CLI.
  Scope: |-
    - In scope: Epic K and H′. Adopt zod-validation-error for human-readable schema and config validation output in the CLI.
    - Out of scope: unrelated refactors not required for "Use zod-validation-error in CLI validation output".
  Plan: "Adopt zod-validation-error only at the CLI error-rendering boundary. Add the dependency, route ZodError rendering through the helper in the unified error mapper, preserve existing CLI error envelope fields, and add focused tests for config/schema validation output so invalid Zod input produces stable human-readable guidance without ad-hoc formatting. Verification: focused error-map/config tests plus format, lint, build."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T15:43:47.161Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented zod-validation-error CLI rendering. Verification passed: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.core.test.ts --reporter dot; bun run --filter=agentplane typecheck; bun run format:check; bun run lint:core; bun run build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T15:38:58.844Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Use zod-validation-error in CLI validation output

Epic K and H′. Adopt zod-validation-error for human-readable schema and config validation output in the CLI.

## Scope

- In scope: Epic K and H′. Adopt zod-validation-error for human-readable schema and config validation output in the CLI.
- Out of scope: unrelated refactors not required for "Use zod-validation-error in CLI validation output".

## Plan

Adopt zod-validation-error only at the CLI error-rendering boundary. Add the dependency, route ZodError rendering through the helper in the unified error mapper, preserve existing CLI error envelope fields, and add focused tests for config/schema validation output so invalid Zod input produces stable human-readable guidance without ad-hoc formatting. Verification: focused error-map/config tests plus format, lint, build.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T15:43:47.161Z — VERIFY — ok

By: CODER

Note: Implemented zod-validation-error CLI rendering. Verification passed: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.core.test.ts --reporter dot; bun run --filter=agentplane typecheck; bun run format:check; bun run lint:core; bun run build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T15:38:58.844Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
