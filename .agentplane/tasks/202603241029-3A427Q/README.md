---
id: "202603241029-3A427Q"
title: "Add semantic runner timeouts and timeout classification"
result_summary: "Added configurable runner timeout policy and timeout classification for supervised runs."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "lifecycle"
  - "timeouts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T10:29:54.058Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T10:52:37.450Z"
  updated_by: "CODER"
  note: "Implemented configurable runner timeout policy under runner.timeouts, propagated timeout_policy through bundle/invocation/state, added idle and wall-clock supervision classification, persisted timeout metadata in run-state/result/events, and covered execute-path timeout behavior with focused runner and CLI tests. Verified with: bun run schemas:sync; bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/core/src/config/config.ts packages/core/src/config/config-schema.ts packages/core/src/index.ts packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/process-supervision.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/result-manifest.ts packages/agentplane/src/runner/adapters/shared.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/artifacts.test.ts; node .agentplane/policy/check-routing.mjs; AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor."
commit:
  hash: "d277bf07698f15cf04f9c59f24a85647856a0242"
  message: "✅ 3A427Q code: done"
comments:
  -
    author: "CODER"
    body: "Start: add configurable wall and idle timeouts with explicit timeout classification in runner supervision artifacts."
  -
    author: "CODER"
    body: "Verified: added configurable runner timeout policy and typed idle and wall-clock timeout classification; focused tests, build, lint, routing, and doctor passed."
events:
  -
    type: "status"
    at: "2026-03-24T10:29:55.327Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add configurable wall and idle timeouts with explicit timeout classification in runner supervision artifacts."
  -
    type: "verify"
    at: "2026-03-24T10:52:37.450Z"
    author: "CODER"
    state: "ok"
    note: "Implemented configurable runner timeout policy under runner.timeouts, propagated timeout_policy through bundle/invocation/state, added idle and wall-clock supervision classification, persisted timeout metadata in run-state/result/events, and covered execute-path timeout behavior with focused runner and CLI tests. Verified with: bun run schemas:sync; bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/core/src/config/config.ts packages/core/src/config/config-schema.ts packages/core/src/index.ts packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/process-supervision.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/result-manifest.ts packages/agentplane/src/runner/adapters/shared.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/artifacts.test.ts; node .agentplane/policy/check-routing.mjs; AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor."
  -
    type: "status"
    at: "2026-03-24T10:54:07.218Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added configurable runner timeout policy and typed idle and wall-clock timeout classification; focused tests, build, lint, routing, and doctor passed."
doc_version: 3
doc_updated_at: "2026-03-24T10:54:07.219Z"
doc_updated_by: "CODER"
description: "Add wall-clock and trace-inactivity timeouts to the runner, classify timeout exits explicitly, and persist timeout reasons in run-state and event artifacts."
sections:
  Summary: |-
    Add semantic runner timeouts and timeout classification.
    
    Add wall-clock and trace-inactivity timeouts to the runner, classify timeout exits explicitly, and persist timeout reasons in run-state and event artifacts.
  Scope: |-
    - In scope: add configurable runner timeout policy, enforce wall and idle timeouts in process supervision, persist timeout classification in run-state and finish events, and update focused tests.
    - Out of scope: new CLI inspection commands and retention/compression policy.
  Plan: "1. Extend runner config and execution contract with wall and idle timeout policy. 2. Enforce the policy in process supervision and persist explicit timeout classification in run-state and events. 3. Update focused tests and run source build."
  Verify Steps: |-
    1. Inspect the supervision path. Expected: wall-clock and idle timeouts produce distinct typed timeout reasons without changing success-path behavior.
    2. Run focused runner and lifecycle tests. Expected: timeout runs terminate deterministically and persist timeout classification in run-state and events.
    3. Run a source build. Expected: touched packages build cleanly after the timeout contract changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T10:52:37.450Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented configurable runner timeout policy under runner.timeouts, propagated timeout_policy through bundle/invocation/state, added idle and wall-clock supervision classification, persisted timeout metadata in run-state/result/events, and covered execute-path timeout behavior with focused runner and CLI tests. Verified with: bun run schemas:sync; bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/core/src/config/config.ts packages/core/src/config/config-schema.ts packages/core/src/index.ts packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/process-supervision.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/result-manifest.ts packages/agentplane/src/runner/adapters/shared.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/artifacts.test.ts; node .agentplane/policy/check-routing.mjs; AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T10:29:55.329Z, excerpt_hash=sha256:58372b6070db964b1d689d65f438b94acfe482164bf413f01f1d4c50ec3cee7c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit.
    - Re-run the touched tests and build to confirm the previous supervision contract is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Add semantic runner timeouts and timeout classification.

Add wall-clock and trace-inactivity timeouts to the runner, classify timeout exits explicitly, and persist timeout reasons in run-state and event artifacts.

## Scope

- In scope: add configurable runner timeout policy, enforce wall and idle timeouts in process supervision, persist timeout classification in run-state and finish events, and update focused tests.
- Out of scope: new CLI inspection commands and retention/compression policy.

## Plan

1. Extend runner config and execution contract with wall and idle timeout policy. 2. Enforce the policy in process supervision and persist explicit timeout classification in run-state and events. 3. Update focused tests and run source build.

## Verify Steps

1. Inspect the supervision path. Expected: wall-clock and idle timeouts produce distinct typed timeout reasons without changing success-path behavior.
2. Run focused runner and lifecycle tests. Expected: timeout runs terminate deterministically and persist timeout classification in run-state and events.
3. Run a source build. Expected: touched packages build cleanly after the timeout contract changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T10:52:37.450Z — VERIFY — ok

By: CODER

Note: Implemented configurable runner timeout policy under runner.timeouts, propagated timeout_policy through bundle/invocation/state, added idle and wall-clock supervision classification, persisted timeout metadata in run-state/result/events, and covered execute-path timeout behavior with focused runner and CLI tests. Verified with: bun run schemas:sync; bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx eslint packages/core/src/config/config.ts packages/core/src/config/config-schema.ts packages/core/src/index.ts packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/process-supervision.ts packages/agentplane/src/runner/process-supervision.test.ts packages/agentplane/src/runner/result-manifest.ts packages/agentplane/src/runner/adapters/shared.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/runner/artifacts.test.ts; node .agentplane/policy/check-routing.mjs; AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T10:29:55.329Z, excerpt_hash=sha256:58372b6070db964b1d689d65f438b94acfe482164bf413f01f1d4c50ec3cee7c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit.
- Re-run the touched tests and build to confirm the previous supervision contract is restored.

## Findings
