---
id: "202605281714-VX8QQ2"
title: "Decouple prompt assembly from optional local context"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T17:15:06.168Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T17:20:11.658Z"
  updated_by: "CODER"
  note: "Focused prompt/context tests, docs freshness checks, typecheck, format check, diff check, routing policy, and doctor passed. Local context is now documented as optional and independent from runner prompt assembly; context init default remains maximum-assimilation."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decouple runner prompt assembly from the optional local context workspace and align context init defaults with maximum-assimilation docs/tests."
events:
  -
    type: "status"
    at: "2026-05-28T17:15:16.931Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decouple runner prompt assembly from the optional local context workspace and align context init defaults with maximum-assimilation docs/tests."
  -
    type: "verify"
    at: "2026-05-28T17:20:11.658Z"
    author: "CODER"
    state: "ok"
    note: "Focused prompt/context tests, docs freshness checks, typecheck, format check, diff check, routing policy, and doctor passed. Local context is now documented as optional and independent from runner prompt assembly; context init default remains maximum-assimilation."
doc_version: 3
doc_updated_at: "2026-05-28T17:20:11.674Z"
doc_updated_by: "CODER"
description: "Clarify and enforce that runner prompt assembly is independent from the optional local context workspace, and keep context init defaulting to maximum-assimilation across docs/tests."
sections:
  Summary: |-
    Decouple prompt assembly from optional local context

    Clarify and enforce that runner prompt assembly is independent from the optional local context workspace, and keep context init defaulting to maximum-assimilation across docs/tests.
  Scope: |-
    - In scope: Clarify and enforce that runner prompt assembly is independent from the optional local context workspace, and keep context init defaulting to maximum-assimilation across docs/tests.
    - Out of scope: unrelated refactors not required for "Decouple prompt assembly from optional local context".
  Plan: |-
    1. Inspect runner prompt assembly and local context initialization surfaces.
    2. Add focused tests documenting that runner prompt collection works without a local context workspace.
    3. Clarify docs/bootstrap wording so prompt assembly and the optional local context layer are distinct.
    4. Keep context init default as maximum-assimilation across CLI reference and context docs.
    5. Run focused prompt/context tests plus docs/policy checks; record any pre-existing checkout blockers separately.
  Verify Steps: |-
    1. Inspect runner prompt assembly tests and docs to confirm local context is described as optional and independent from prompt/bootstrap surfaces.
    2. Run focused prompt/context tests: `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.context-init.test.ts`.
    3. Run docs/runtime checks: `bun run docs:cli:check`, `bun run docs:bootstrap:check`, `bun run typecheck`, `bun run format:check`, `git diff --check`, `node .agentplane/policy/check-routing.mjs`, and `node packages/agentplane/bin/agentplane.js doctor`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T17:20:11.658Z — VERIFY — ok

    By: CODER

    Note: Focused prompt/context tests, docs freshness checks, typecheck, format check, diff check, routing policy, and doctor passed. Local context is now documented as optional and independent from runner prompt assembly; context init default remains maximum-assimilation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:15:16.931Z, excerpt_hash=sha256:30605a674e2f325acf140ec5a9bbf4b4ec3f4e69166261ade7c3dc3afe1dbcd9

    Details:

    Commands: bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.context-init.test.ts; bun run docs:cli:check; bun run docs:bootstrap:check; bun run typecheck; bun run format:check; git diff --check; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor. Result: pass. Evidence: 37 tests passed, docs up to date, typecheck OK, Prettier OK, routing OK, doctor OK.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281714-VX8QQ2-prompt-context-decoupling/.agentplane/tasks/202605281714-VX8QQ2/blueprint/resolved-snapshot.json
    - old_digest: f3860be40725fc676cb75dfd5ecc4306d8f892865f106faf102459fbf3515fd1
    - current_digest: f3860be40725fc676cb75dfd5ecc4306d8f892865f106faf102459fbf3515fd1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281714-VX8QQ2

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Decouple prompt assembly from optional local context

Clarify and enforce that runner prompt assembly is independent from the optional local context workspace, and keep context init defaulting to maximum-assimilation across docs/tests.

## Scope

- In scope: Clarify and enforce that runner prompt assembly is independent from the optional local context workspace, and keep context init defaulting to maximum-assimilation across docs/tests.
- Out of scope: unrelated refactors not required for "Decouple prompt assembly from optional local context".

## Plan

1. Inspect runner prompt assembly and local context initialization surfaces.
2. Add focused tests documenting that runner prompt collection works without a local context workspace.
3. Clarify docs/bootstrap wording so prompt assembly and the optional local context layer are distinct.
4. Keep context init default as maximum-assimilation across CLI reference and context docs.
5. Run focused prompt/context tests plus docs/policy checks; record any pre-existing checkout blockers separately.

## Verify Steps

1. Inspect runner prompt assembly tests and docs to confirm local context is described as optional and independent from prompt/bootstrap surfaces.
2. Run focused prompt/context tests: `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.context-init.test.ts`.
3. Run docs/runtime checks: `bun run docs:cli:check`, `bun run docs:bootstrap:check`, `bun run typecheck`, `bun run format:check`, `git diff --check`, `node .agentplane/policy/check-routing.mjs`, and `node packages/agentplane/bin/agentplane.js doctor`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T17:20:11.658Z — VERIFY — ok

By: CODER

Note: Focused prompt/context tests, docs freshness checks, typecheck, format check, diff check, routing policy, and doctor passed. Local context is now documented as optional and independent from runner prompt assembly; context init default remains maximum-assimilation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:15:16.931Z, excerpt_hash=sha256:30605a674e2f325acf140ec5a9bbf4b4ec3f4e69166261ade7c3dc3afe1dbcd9

Details:

Commands: bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/cli/run-cli.core.context-init.test.ts; bun run docs:cli:check; bun run docs:bootstrap:check; bun run typecheck; bun run format:check; git diff --check; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor. Result: pass. Evidence: 37 tests passed, docs up to date, typecheck OK, Prettier OK, routing OK, doctor OK.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281714-VX8QQ2-prompt-context-decoupling/.agentplane/tasks/202605281714-VX8QQ2/blueprint/resolved-snapshot.json
- old_digest: f3860be40725fc676cb75dfd5ecc4306d8f892865f106faf102459fbf3515fd1
- current_digest: f3860be40725fc676cb75dfd5ecc4306d8f892865f106faf102459fbf3515fd1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281714-VX8QQ2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
