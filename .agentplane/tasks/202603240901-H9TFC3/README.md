---
id: "202603240901-H9TFC3"
title: "Add configurable runner trace policy"
result_summary: "Configurable runner trace policy added with deterministic trace capture controls and green config/supervision/CLI verification."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603240901-EABAY5"
tags:
  - "code"
  - "runner"
  - "config"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T09:46:04.026Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T09:59:11.549Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 7 files, 68 tests passed. Command: bunx eslint packages/core/src/index.ts packages/core/src/config/config.ts packages/core/src/config/config-schema.ts packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/process-supervision.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0. Scope: runner trace policy config, supervision, adapters, artifacts, and CLI dry-run projection."
commit:
  hash: "93f2c53e15134e2545f04edbae8983bd7bed6b90"
  message: "✅ H9TFC3 code: done"
comments:
  -
    author: "CODER"
    body: "Start: add config-backed runner trace policy knobs for trace mode, capped tail size, and stderr capture without weakening the raw-trace-versus-task-projection boundary."
  -
    author: "CODER"
    body: "Verified: runner trace policy is now config-backed, propagates into execution artifacts and invocation metadata, and supervision respects raw/off capture, capped tail size, and stderr capture deterministically."
events:
  -
    type: "status"
    at: "2026-03-24T09:46:12.365Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add config-backed runner trace policy knobs for trace mode, capped tail size, and stderr capture without weakening the raw-trace-versus-task-projection boundary."
  -
    type: "verify"
    at: "2026-03-24T09:59:11.549Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 7 files, 68 tests passed. Command: bunx eslint packages/core/src/index.ts packages/core/src/config/config.ts packages/core/src/config/config-schema.ts packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/process-supervision.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0. Scope: runner trace policy config, supervision, adapters, artifacts, and CLI dry-run projection."
  -
    type: "status"
    at: "2026-03-24T09:59:33.696Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: runner trace policy is now config-backed, propagates into execution artifacts and invocation metadata, and supervision respects raw/off capture, capped tail size, and stderr capture deterministically."
doc_version: 3
doc_updated_at: "2026-03-24T09:59:33.696Z"
doc_updated_by: "CODER"
description: "Introduce config-controlled runner trace policy knobs such as trace mode, capped tail size, and stderr capture so repositories can tune trace fidelity, storage cost, and privacy boundaries intentionally."
sections:
  Summary: "Introduce config-controlled runner trace policy knobs such as trace mode, capped tail size, and stderr capture so repositories can tune trace fidelity, storage cost, and privacy boundaries intentionally."
  Scope: |-
    - In scope: add runtime config knobs for runner trace capture, capped in-memory tail size, and stderr artifact capture.
    - In scope: thread those knobs into runner preparation/supervision without changing the raw-trace-vs-task-projection boundary.
    - Out of scope: final language-isolation regressions and docs updates.
  Plan: |-
    1. Inspect the current runner config/runtime/schema flow to identify minimal insertion points for trace mode, tail-size, and stderr-capture knobs.
    2. Implement config-backed trace policy so supervision and artifact preparation honour those knobs without changing task-facing sanitization semantics.
    3. Update focused config, runner, and CLI tests, then verify the new knobs before finishing with one task-scoped commit.
  Verify Steps: |-
    1. Inspect the runner trace policy path. Expected: execute-mode runs honour configured trace mode, tail size, and stderr-capture policy deterministically.
    2. Run focused config, runner supervision, and CLI tests. Expected: trace artifacts and summaries follow the configured policy without regressing existing run behavior.
    3. Run a source build for the touched package. Expected: TypeScript/build checks pass after the trace policy config changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T09:59:11.549Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 7 files, 68 tests passed. Command: bunx eslint packages/core/src/index.ts packages/core/src/config/config.ts packages/core/src/config/config-schema.ts packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/process-supervision.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0. Scope: runner trace policy config, supervision, adapters, artifacts, and CLI dry-run projection.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T09:46:12.367Z, excerpt_hash=sha256:1e767c57d343cb062d71511a42870ceb27b83f79a6084113bfcf98732fb149e0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit.
    - Re-run the focused config, runner, and CLI tests plus build to confirm the prior default trace behavior is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce config-controlled runner trace policy knobs such as trace mode, capped tail size, and stderr capture so repositories can tune trace fidelity, storage cost, and privacy boundaries intentionally.

## Scope

- In scope: add runtime config knobs for runner trace capture, capped in-memory tail size, and stderr artifact capture.
- In scope: thread those knobs into runner preparation/supervision without changing the raw-trace-vs-task-projection boundary.
- Out of scope: final language-isolation regressions and docs updates.

## Plan

1. Inspect the current runner config/runtime/schema flow to identify minimal insertion points for trace mode, tail-size, and stderr-capture knobs.
2. Implement config-backed trace policy so supervision and artifact preparation honour those knobs without changing task-facing sanitization semantics.
3. Update focused config, runner, and CLI tests, then verify the new knobs before finishing with one task-scoped commit.

## Verify Steps

1. Inspect the runner trace policy path. Expected: execute-mode runs honour configured trace mode, tail size, and stderr-capture policy deterministically.
2. Run focused config, runner supervision, and CLI tests. Expected: trace artifacts and summaries follow the configured policy without regressing existing run behavior.
3. Run a source build for the touched package. Expected: TypeScript/build checks pass after the trace policy config changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T09:59:11.549Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: 7 files, 68 tests passed. Command: bunx eslint packages/core/src/index.ts packages/core/src/config/config.ts packages/core/src/config/config-schema.ts packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/process-supervision.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; Result: pass; Evidence: no lint errors. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds exited with code 0. Scope: runner trace policy config, supervision, adapters, artifacts, and CLI dry-run projection.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T09:46:12.367Z, excerpt_hash=sha256:1e767c57d343cb062d71511a42870ceb27b83f79a6084113bfcf98732fb149e0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit.
- Re-run the focused config, runner, and CLI tests plus build to confirm the prior default trace behavior is restored.

## Findings
