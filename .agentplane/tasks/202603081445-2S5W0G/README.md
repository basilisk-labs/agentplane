---
id: "202603081445-2S5W0G"
title: "Unify platform-critical CI test runner and timeout policy"
result_summary: "Windows and prepublish workflows now call bun run test:platform-critical instead of bun test, removing the runner mismatch that ignored the legacy migration timeout budget."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T14:45:55.586Z"
  updated_by: "ORCHESTRATOR"
  note: "CI must use one runner contract for platform-critical suites so timeout behavior matches the integration tests."
verification:
  state: "ok"
  updated_at: "2026-03-08T14:47:54.706Z"
  updated_by: "CODER"
  note: |-
    Checks passed:
    - bun run test:platform-critical
    - bun run workflows:lint
    - reviewed .github/workflows/ci.yml and .github/workflows/prepublish.yml to confirm both now use the shared Vitest-based platform-critical suite.
commit:
  hash: "f19022132395d95d326d5107777b45feeb1a62b0"
  message: "🧪 2S5W0G ci: unify platform-critical test runner"
comments:
  -
    author: "CODER"
    body: "Start: unify the platform-critical workflow suite under a shared Vitest command so Windows and prepublish honor explicit timeout settings."
  -
    author: "CODER"
    body: "Verified: the platform-critical workflow suite now runs through the shared Vitest command in both Windows CI and prepublish, so explicit timeout settings are honored."
events:
  -
    type: "status"
    at: "2026-03-08T14:46:03.817Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: unify the platform-critical workflow suite under a shared Vitest command so Windows and prepublish honor explicit timeout settings."
  -
    type: "verify"
    at: "2026-03-08T14:47:54.706Z"
    author: "CODER"
    state: "ok"
    note: |-
      Checks passed:
      - bun run test:platform-critical
      - bun run workflows:lint
      - reviewed .github/workflows/ci.yml and .github/workflows/prepublish.yml to confirm both now use the shared Vitest-based platform-critical suite.
  -
    type: "status"
    at: "2026-03-08T14:48:05.230Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the platform-critical workflow suite now runs through the shared Vitest command in both Windows CI and prepublish, so explicit timeout settings are honored."
doc_version: 3
doc_updated_at: "2026-03-08T14:48:05.230Z"
doc_updated_by: "CODER"
description: "Replace bun test invocations for platform-critical suites in CI workflows with a single vitest-based command that honors explicit test timeouts on Windows and prepublish paths."
id_source: "generated"
---
## Summary

Unify platform-critical CI test runner and timeout policy

Replace bun test invocations for platform-critical suites in CI workflows with a single vitest-based command that honors explicit test timeouts on Windows and prepublish paths.

## Scope

- In scope: Replace bun test invocations for platform-critical suites in CI workflows with a single vitest-based command that honors explicit test timeouts on Windows and prepublish paths.
- Out of scope: unrelated refactors not required for "Unify platform-critical CI test runner and timeout policy".

## Plan

1. Add a single vitest-based platform-critical test command with explicit timeouts so the workflow uses the same runner semantics as local CLI tests.
2. Switch Windows CI and prepublish workflows from `bun test` to that shared command.
3. Run targeted verification, update the task README, and push the fix.

## Verify Steps

1. Run `bun run test:platform-critical`. Expected: the shared platform-critical suite passes under Vitest with explicit timeout controls.
2. Review `.github/workflows/ci.yml` and `.github/workflows/prepublish.yml`. Expected: both workflows invoke the shared command instead of `bun test` for the platform-critical suite.
3. Run `bun run lint:core -- package.json` if the script surface changes. Expected: no lint errors in changed core workflow files.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T14:47:54.706Z — VERIFY — ok

By: CODER

Note: Checks passed:
- bun run test:platform-critical
- bun run workflows:lint
- reviewed .github/workflows/ci.yml and .github/workflows/prepublish.yml to confirm both now use the shared Vitest-based platform-critical suite.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T14:46:03.817Z, excerpt_hash=sha256:29841efb33a71706188bb32395596af06034e51cba4954ff83bf9a74b0c1293f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
