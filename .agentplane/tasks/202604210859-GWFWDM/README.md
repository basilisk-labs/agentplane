---
id: "202604210859-GWFWDM"
title: "Unify Zod validation error formatting"
result_summary: "Unified Zod validation error formatting for core config and task artifact schemas."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 14
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
  updated_at: "2026-04-21T10:51:42.230Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T11:01:23.598Z"
  updated_by: "CODER"
  note: "Unified core schema validation formatting through zod-validation-error; focused core tests, schemas check, typecheck, lint, formatting, and dependency lock validation pass."
commit:
  hash: "1b1207c5f7df5e926fc6ae6a573cec8e0d521499"
  message: "✅ GWFWDM code: done"
comments:
  -
    author: "CODER"
    body: "Start: unify Zod validation error formatting through zod-validation-error while preserving error codes and exit behavior."
  -
    author: "CODER"
    body: "Verified: unified core schema validation formatting through zod-validation-error; focused core tests, schemas check, typecheck, lint, formatting, lock validation, and framework bootstrap passed."
events:
  -
    type: "status"
    at: "2026-04-21T10:51:42.664Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: unify Zod validation error formatting through zod-validation-error while preserving error codes and exit behavior."
  -
    type: "verify"
    at: "2026-04-21T11:01:23.598Z"
    author: "CODER"
    state: "ok"
    note: "Unified core schema validation formatting through zod-validation-error; focused core tests, schemas check, typecheck, lint, formatting, and dependency lock validation pass."
  -
    type: "status"
    at: "2026-04-21T11:03:03.306Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: unified core schema validation formatting through zod-validation-error; focused core tests, schemas check, typecheck, lint, formatting, lock validation, and framework bootstrap passed."
doc_version: 3
doc_updated_at: "2026-04-21T11:03:03.307Z"
doc_updated_by: "CODER"
description: "Standardize schema validation diagnostics on zod-validation-error so CLI and core schema failures use one readable format."
sections:
  Summary: "Route schema validation formatting through zod-validation-error consistently across CLI/core-facing validation surfaces."
  Scope: "In scope: existing formatSchemaErrors helpers, package dependency placement if required, and validation tests. Out of scope: schema shape changes."
  Plan: |-
    1. Locate all schema error formatting helpers and direct ZodError rendering.
    2. Consolidate through zod-validation-error while preserving machine-readable codes.
    3. Add/adjust tests for nested path and multiple issue output.
    4. Run schema/CLI tests.
  Verify Steps: |-
    - Validation messages share one format across command/config/schema surfaces.
    - Existing error codes and exit behavior are preserved.
    - Tests cover representative nested errors.
  Verification: |-
    - Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210859-GWFWDM`
      - Result: pass
      - Evidence: task requires shared validation format, preserved error behavior, and nested/multiple issue tests.
      - Scope: task acceptance contract.
    - Command: `bun run test:project -- core --run packages/core/src/config/config.test.ts packages/core/src/tasks/task-artifact-schema.test.ts`
      - Result: pass
      - Evidence: 2 files passed, 23 tests passed, including nested/multiple task artifact validation errors.
      - Scope: core config and task artifact validation formatters.
    - Command: `bun run --filter=@agentplaneorg/core typecheck`
      - Result: pass
      - Evidence: @agentplaneorg/core typecheck exited with code 0.
      - Scope: core package dependency/import/type compatibility.
    - Command: `bun run schemas:check`
      - Result: pass
      - Evidence: schemas OK.
      - Scope: generated JSON schema compatibility after formatter changes.
    - Command: `bunx eslint packages/core/src/config/config-zod.ts packages/core/src/config/config.test.ts packages/core/src/tasks/task-artifact-schema.shared.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/schemas/zod-error-format.ts`
      - Result: pass
      - Evidence: ESLint exited with code 0.
      - Scope: changed core validation files and tests.
    - Command: `bunx prettier --check packages/core/package.json packages/core/src/config/config-zod.ts packages/core/src/config/config.test.ts packages/core/src/tasks/task-artifact-schema.shared.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/schemas/zod-error-format.ts`
      - Result: pass
      - Evidence: all matched files use Prettier code style.
      - Scope: changed package manifest, formatter helper, validation sources, and tests.
    - Command: `bun install --ignore-scripts`
      - Result: pass
      - Evidence: lockfile saved/checked with no dependency changes after adding zod-validation-error to @agentplaneorg/core.
      - Scope: dependency manifest/lockfile consistency.
    - Command: `git diff --check -- packages/core/package.json packages/core/src/config/config-zod.ts packages/core/src/config/config.test.ts packages/core/src/tasks/task-artifact-schema.shared.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/schemas/zod-error-format.ts bun.lock .agentplane/tasks/202604210859-GWFWDM/README.md`
      - Result: pass
      - Evidence: no whitespace errors before verification entry.
      - Scope: task-scoped files.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T11:01:23.598Z — VERIFY — ok
    
    By: CODER
    
    Note: Unified core schema validation formatting through zod-validation-error; focused core tests, schemas check, typecheck, lint, formatting, and dependency lock validation pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T11:01:23.252Z, excerpt_hash=sha256:d39b3ea9839a39146f8eceb32084928dd20d74acf06eba412209ecaf72b1104e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert formatter and dependency changes for this task only."
  Findings: |-
    Source input: REFACTORING_PLAN A.4.
    
    - Consolidated core config and task artifact schema formatting through an internal zod-validation-error wrapper.
    - CLI error mapping already used zod-validation-error; this task aligns core-facing validation surfaces with that format.
    - Existing error categories/exit behavior are preserved because validateAgentplaneConfig still throws Error with the original ZodError as cause, and CLI mapping still converts Zod causes to E_VALIDATION.
    - Dependency note: plain `bun install` updated the lockfile but failed in postinstall because local lefthook could not rename an already existing `commit-msg.old`; `bun install --ignore-scripts` passed and confirmed dependency graph consistency.
id_source: "generated"
---
## Summary

Route schema validation formatting through zod-validation-error consistently across CLI/core-facing validation surfaces.

## Scope

In scope: existing formatSchemaErrors helpers, package dependency placement if required, and validation tests. Out of scope: schema shape changes.

## Plan

1. Locate all schema error formatting helpers and direct ZodError rendering.
2. Consolidate through zod-validation-error while preserving machine-readable codes.
3. Add/adjust tests for nested path and multiple issue output.
4. Run schema/CLI tests.

## Verify Steps

- Validation messages share one format across command/config/schema surfaces.
- Existing error codes and exit behavior are preserved.
- Tests cover representative nested errors.

## Verification

- Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210859-GWFWDM`
  - Result: pass
  - Evidence: task requires shared validation format, preserved error behavior, and nested/multiple issue tests.
  - Scope: task acceptance contract.
- Command: `bun run test:project -- core --run packages/core/src/config/config.test.ts packages/core/src/tasks/task-artifact-schema.test.ts`
  - Result: pass
  - Evidence: 2 files passed, 23 tests passed, including nested/multiple task artifact validation errors.
  - Scope: core config and task artifact validation formatters.
- Command: `bun run --filter=@agentplaneorg/core typecheck`
  - Result: pass
  - Evidence: @agentplaneorg/core typecheck exited with code 0.
  - Scope: core package dependency/import/type compatibility.
- Command: `bun run schemas:check`
  - Result: pass
  - Evidence: schemas OK.
  - Scope: generated JSON schema compatibility after formatter changes.
- Command: `bunx eslint packages/core/src/config/config-zod.ts packages/core/src/config/config.test.ts packages/core/src/tasks/task-artifact-schema.shared.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/schemas/zod-error-format.ts`
  - Result: pass
  - Evidence: ESLint exited with code 0.
  - Scope: changed core validation files and tests.
- Command: `bunx prettier --check packages/core/package.json packages/core/src/config/config-zod.ts packages/core/src/config/config.test.ts packages/core/src/tasks/task-artifact-schema.shared.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/schemas/zod-error-format.ts`
  - Result: pass
  - Evidence: all matched files use Prettier code style.
  - Scope: changed package manifest, formatter helper, validation sources, and tests.
- Command: `bun install --ignore-scripts`
  - Result: pass
  - Evidence: lockfile saved/checked with no dependency changes after adding zod-validation-error to @agentplaneorg/core.
  - Scope: dependency manifest/lockfile consistency.
- Command: `git diff --check -- packages/core/package.json packages/core/src/config/config-zod.ts packages/core/src/config/config.test.ts packages/core/src/tasks/task-artifact-schema.shared.ts packages/core/src/tasks/task-artifact-schema.test.ts packages/core/src/schemas/zod-error-format.ts bun.lock .agentplane/tasks/202604210859-GWFWDM/README.md`
  - Result: pass
  - Evidence: no whitespace errors before verification entry.
  - Scope: task-scoped files.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T11:01:23.598Z — VERIFY — ok

By: CODER

Note: Unified core schema validation formatting through zod-validation-error; focused core tests, schemas check, typecheck, lint, formatting, and dependency lock validation pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T11:01:23.252Z, excerpt_hash=sha256:d39b3ea9839a39146f8eceb32084928dd20d74acf06eba412209ecaf72b1104e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert formatter and dependency changes for this task only.

## Findings

Source input: REFACTORING_PLAN A.4.

- Consolidated core config and task artifact schema formatting through an internal zod-validation-error wrapper.
- CLI error mapping already used zod-validation-error; this task aligns core-facing validation surfaces with that format.
- Existing error categories/exit behavior are preserved because validateAgentplaneConfig still throws Error with the original ZodError as cause, and CLI mapping still converts Zod causes to E_VALIDATION.
- Dependency note: plain `bun install` updated the lockfile but failed in postinstall because local lefthook could not rename an already existing `commit-msg.old`; `bun install --ignore-scripts` passed and confirmed dependency graph consistency.
