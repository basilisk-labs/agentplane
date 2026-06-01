---
id: "202606010530-BEYQXA"
title: "Fix Hermes task launch profile gaps"
result_summary: "Merged via PR #4349."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "hermes"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T05:31:07.241Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-01T05:39:04.298Z"
  updated_by: "CODER"
  note: "Verified: Hermes supervise now allowlists same-task task run through typed args, init --tool hermes seeds the custom Hermes runner profile, and targeted tests/type/docs/routing checks pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-01T05:46:00.860Z"
  updated_by: "EVALUATOR"
  note: "Hermes task launch gaps are fixed within approved scope: supervise executes same-task task-run route steps through typed Agentplane args, init --tool hermes configures runner.custom, and docs/tests cover the behavior."
  evaluated_sha: "1ce894445022d85e090d8faf19d54e92a678ab79"
  blueprint_digest: "c22d3c6d19bcfb3ffe8a337ea69c6026f3c836dd54ad89af4b2ecba4fbfdef40"
  evidence_refs:
    - ".agentplane/tasks/202606010530-BEYQXA/README.md"
    - ".agentplane/tasks/202606010530-BEYQXA/quality/20260601-054600860-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606010530-BEYQXA/quality/20260601-054600860-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606010530-BEYQXA/quality/20260601-054600860-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606010530-BEYQXA/blueprint/resolved-snapshot.json"
    - "bunx vitest run packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/core/src/config/config.test.ts"
    - "bun run --filter=agentplane typecheck"
    - "bun run docs:cli:check"
    - "node .agentplane/policy/check-routing.mjs"
  findings:
    - "No rework required. Residual risk is limited to the external Hermes CLI/plugin implementing the documented hermes agentplane run entrypoint."
commit:
  hash: "7f0518beb1db29a92d90102be397c723a85b3679"
  message: "🚧 BEYQXA task: record Hermes quality review"
comments:
  -
    author: "CODER"
    body: "Start: implement the approved Hermes launch fixes for issue #4347 in the task worktree, then run targeted Hermes, runner, init, schema, and routing checks before PR handoff."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4349 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-01T05:31:21.101Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved Hermes launch fixes for issue #4347 in the task worktree, then run targeted Hermes, runner, init, schema, and routing checks before PR handoff."
  -
    type: "verify"
    at: "2026-06-01T05:39:04.298Z"
    author: "CODER"
    state: "ok"
    note: "Verified: Hermes supervise now allowlists same-task task run through typed args, init --tool hermes seeds the custom Hermes runner profile, and targeted tests/type/docs/routing checks pass."
  -
    type: "status"
    at: "2026-06-01T05:55:39.510Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4349 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-01T05:55:39.516Z"
doc_updated_by: "INTEGRATOR"
description: "Resolve GitHub issue #4347 by allowing hermes supervise to execute the same-task task-run route step safely and by adding a first-class Hermes init/runner profile path."
sections:
  Summary: |-
    Fix Hermes task launch profile gaps

    Resolve GitHub issue #4347 by allowing hermes supervise to execute the same-task task-run route step safely and by adding a first-class Hermes init/runner profile path.
  Scope: |-
    - In scope: Resolve GitHub issue #4347 by allowing hermes supervise to execute the same-task task-run route step safely and by adding a first-class Hermes init/runner profile path.
    - Out of scope: unrelated refactors not required for "Fix Hermes task launch profile gaps".
  Plan: "Goal: close GitHub issue #4347 by making Hermes a usable task launch/execution path. Scope: (1) update hermes supervise route-step allowlisting so --execute-step accepts the same-task 'agentplane task run <task-id>' route action and still routes execution through runAgentplaneStep without raw-shell escape; cover dry-run and child failure-code propagation in hermes tests. (2) add a first-class Hermes init/profile path or explicit init token that configures Hermes execution through runner.custom without requiring Codex by default; update schema/help/docs/tests for the chosen existing init/config surfaces. Verification: run ap task verify-show 202606010530-BEYQXA, targeted hermes/runner/init/schema tests, node .agentplane/policy/check-routing.mjs, and final git status --short --untracked-files=all."
  Verify Steps: |-
    1. Run `ap task verify-show 202606010530-BEYQXA`. Expected: task-specific verification contract is visible and no fallback scaffold remains.
    2. Run `bunx vitest run packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/core/src/config/config.test.ts`. Expected: Hermes supervise accepts the same-task `agentplane task run <task-id>` step, child exit codes propagate, and `init --tool hermes` writes a custom Hermes runner profile.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets still pass.
    4. Run `git status --short --untracked-files=all`. Expected: only intentional task/code/docs artifacts are present before commit/PR handoff.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-01T05:39:04.298Z — VERIFY — ok

    By: CODER

    Note: Verified: Hermes supervise now allowlists same-task task run through typed args, init --tool hermes seeds the custom Hermes runner profile, and targeted tests/type/docs/routing checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T05:31:21.101Z, excerpt_hash=sha256:691e2e910a25965848775349bd9dddc98cd3618a5ec239ce8e2ec15eb118cc74

    Details:

    Command: ap task verify-show 202606010530-BEYQXA; Result: pass; Evidence: task-specific Verify Steps rendered and blueprint snapshot current. Command: bunx vitest run packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/core/src/config/config.test.ts; Result: pass; Evidence: 5 files, 80 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass, policy routing OK. Command: bun run docs:cli:check; Result: pass, generated CLI reference up to date. Command: bun run format:changed and git diff --check; Result: pass.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010530-BEYQXA-fix-hermes-task-launch/.agentplane/tasks/202606010530-BEYQXA/blueprint/resolved-snapshot.json
    - old_digest: c22d3c6d19bcfb3ffe8a337ea69c6026f3c836dd54ad89af4b2ecba4fbfdef40
    - current_digest: c22d3c6d19bcfb3ffe8a337ea69c6026f3c836dd54ad89af4b2ecba4fbfdef40
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606010530-BEYQXA

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix Hermes task launch profile gaps

Resolve GitHub issue #4347 by allowing hermes supervise to execute the same-task task-run route step safely and by adding a first-class Hermes init/runner profile path.

## Scope

- In scope: Resolve GitHub issue #4347 by allowing hermes supervise to execute the same-task task-run route step safely and by adding a first-class Hermes init/runner profile path.
- Out of scope: unrelated refactors not required for "Fix Hermes task launch profile gaps".

## Plan

Goal: close GitHub issue #4347 by making Hermes a usable task launch/execution path. Scope: (1) update hermes supervise route-step allowlisting so --execute-step accepts the same-task 'agentplane task run <task-id>' route action and still routes execution through runAgentplaneStep without raw-shell escape; cover dry-run and child failure-code propagation in hermes tests. (2) add a first-class Hermes init/profile path or explicit init token that configures Hermes execution through runner.custom without requiring Codex by default; update schema/help/docs/tests for the chosen existing init/config surfaces. Verification: run ap task verify-show 202606010530-BEYQXA, targeted hermes/runner/init/schema tests, node .agentplane/policy/check-routing.mjs, and final git status --short --untracked-files=all.

## Verify Steps

1. Run `ap task verify-show 202606010530-BEYQXA`. Expected: task-specific verification contract is visible and no fallback scaffold remains.
2. Run `bunx vitest run packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/core/src/config/config.test.ts`. Expected: Hermes supervise accepts the same-task `agentplane task run <task-id>` step, child exit codes propagate, and `init --tool hermes` writes a custom Hermes runner profile.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets still pass.
4. Run `git status --short --untracked-files=all`. Expected: only intentional task/code/docs artifacts are present before commit/PR handoff.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-01T05:39:04.298Z — VERIFY — ok

By: CODER

Note: Verified: Hermes supervise now allowlists same-task task run through typed args, init --tool hermes seeds the custom Hermes runner profile, and targeted tests/type/docs/routing checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T05:31:21.101Z, excerpt_hash=sha256:691e2e910a25965848775349bd9dddc98cd3618a5ec239ce8e2ec15eb118cc74

Details:

Command: ap task verify-show 202606010530-BEYQXA; Result: pass; Evidence: task-specific Verify Steps rendered and blueprint snapshot current. Command: bunx vitest run packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts packages/core/src/config/config.test.ts; Result: pass; Evidence: 5 files, 80 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass, policy routing OK. Command: bun run docs:cli:check; Result: pass, generated CLI reference up to date. Command: bun run format:changed and git diff --check; Result: pass.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010530-BEYQXA-fix-hermes-task-launch/.agentplane/tasks/202606010530-BEYQXA/blueprint/resolved-snapshot.json
- old_digest: c22d3c6d19bcfb3ffe8a337ea69c6026f3c836dd54ad89af4b2ecba4fbfdef40
- current_digest: c22d3c6d19bcfb3ffe8a337ea69c6026f3c836dd54ad89af4b2ecba4fbfdef40
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606010530-BEYQXA

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
