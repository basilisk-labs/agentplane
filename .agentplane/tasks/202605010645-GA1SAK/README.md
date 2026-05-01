---
id: "202605010645-GA1SAK"
title: "AP-12: Split PR open flow tests"
result_summary: "Merged via PR #676."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605010645-FD8ZPX"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T11:01:40.956Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T11:17:56.666Z"
  updated_by: "CODER"
  note: "Focused PR-open split verification passed: PR-flow suites, routing/inventory checks, oversized baseline, typecheck, lint, formatting, bootstrap, doctor, and policy routing were green."
commit:
  hash: "08c46fccb7f7c616122a4e06b9a83aec05c32c42"
  message: "Merge pull request #676 from basilisk-labs/task/202605010645-GA1SAK/pr-open-flow-test-split"
comments:
  -
    author: "CODER"
    body: "Start: splitting the PR open flow test suite into artifact, git, validation, and network-gate files with shared testkit helpers and focused routing checks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #676 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T11:02:36.717Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: splitting the PR open flow test suite into artifact, git, validation, and network-gate files with shared testkit helpers and focused routing checks."
  -
    type: "verify"
    at: "2026-05-01T11:17:56.666Z"
    author: "CODER"
    state: "ok"
    note: "Focused PR-open split verification passed: PR-flow suites, routing/inventory checks, oversized baseline, typecheck, lint, formatting, bootstrap, doctor, and policy routing were green."
  -
    type: "status"
    at: "2026-05-01T11:22:31.941Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #676 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T11:22:31.947Z"
doc_updated_by: "INTEGRATOR"
description: "Split PR open flow tests by artifact, git, validation, and network gates using cli-core-pr-flow testkit helpers."
sections:
  Summary: |-
    AP-12: Split PR open flow tests
    
    Split PR open flow tests by artifact, git, validation, and network gates using cli-core-pr-flow testkit helpers.
  Scope: |-
    - In scope: Split PR open flow tests by artifact, git, validation, and network gates using cli-core-pr-flow testkit helpers.
    - Out of scope: unrelated refactors not required for "AP-12: Split PR open flow tests".
  Plan: |-
    1. Inspect the existing PR-open flow test, local-ci/test-inventory route metadata, and current testkit exports.
    2. Extract reusable PR-flow fixtures into @agentplane/testkit private helpers if the existing test duplicates setup.
    3. Split run-cli.core.pr-flow.pr-open.test.ts into artifact, git, validation, and network-gate focused test files without changing runtime behavior.
    4. Update test routing metadata and oversized baseline only to reflect the split.
    5. Run focused PR-flow tests, routing/inventory checks, oversized guard, typecheck, lint:core, formatting/diff checks, and final branch_pr checks.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T11:17:56.666Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused PR-open split verification passed: PR-flow suites, routing/inventory checks, oversized baseline, typecheck, lint, formatting, bootstrap, doctor, and policy routing were green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T11:02:36.717Z, excerpt_hash=sha256:dc53b9276e6a821c50325c73779195f83ba5e1118418b7f0c24e43317ec32531
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow*.test.ts --testTimeout 180000 --hookTimeout 180000
    Result: pass
    Evidence: 15 files, 116 tests passed after splitting pr-open into artifacts/git/network/validation suites.
    Scope: PR-flow CLI behavior and new split test files.
    
    Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/test-inventory.test.ts packages/agentplane/src/cli/test-routing-check.test.ts --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 3 files, 47 tests passed.
    Scope: local CI selection, inventory, and routing check coverage.
    
    Command: node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000
    Result: pass
    Evidence: Oversized test baseline OK (11 entries, 12176 total lines, threshold>1000).
    Scope: oversized test baseline budget.
    
    Command: node scripts/check-vitest-projects.mjs
    Result: pass
    Evidence: vitest workspace projects OK; test routing OK (345 tests, 10 primary routes).
    Scope: Vitest workspace and route registry parity.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: TypeScript project references.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint packages scripts eslint.config.cjs vitest.config.ts exited 0.
    Scope: core lint surface.
    
    Command: bunx prettier --check <touched files> && git diff --check
    Result: pass
    Evidence: Prettier reported all matched files use code style; git diff --check exited 0.
    Scope: touched file formatting and whitespace.
    
    Command: bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js doctor; node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: framework dev runtime ready; doctor OK with 0 errors/0 warnings; policy routing OK.
    Scope: repo-local runtime and policy routing.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-12: Split PR open flow tests

Split PR open flow tests by artifact, git, validation, and network gates using cli-core-pr-flow testkit helpers.

## Scope

- In scope: Split PR open flow tests by artifact, git, validation, and network gates using cli-core-pr-flow testkit helpers.
- Out of scope: unrelated refactors not required for "AP-12: Split PR open flow tests".

## Plan

1. Inspect the existing PR-open flow test, local-ci/test-inventory route metadata, and current testkit exports.
2. Extract reusable PR-flow fixtures into @agentplane/testkit private helpers if the existing test duplicates setup.
3. Split run-cli.core.pr-flow.pr-open.test.ts into artifact, git, validation, and network-gate focused test files without changing runtime behavior.
4. Update test routing metadata and oversized baseline only to reflect the split.
5. Run focused PR-flow tests, routing/inventory checks, oversized guard, typecheck, lint:core, formatting/diff checks, and final branch_pr checks.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T11:17:56.666Z — VERIFY — ok

By: CODER

Note: Focused PR-open split verification passed: PR-flow suites, routing/inventory checks, oversized baseline, typecheck, lint, formatting, bootstrap, doctor, and policy routing were green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T11:02:36.717Z, excerpt_hash=sha256:dc53b9276e6a821c50325c73779195f83ba5e1118418b7f0c24e43317ec32531

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow*.test.ts --testTimeout 180000 --hookTimeout 180000
Result: pass
Evidence: 15 files, 116 tests passed after splitting pr-open into artifacts/git/network/validation suites.
Scope: PR-flow CLI behavior and new split test files.

Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/test-inventory.test.ts packages/agentplane/src/cli/test-routing-check.test.ts --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: 3 files, 47 tests passed.
Scope: local CI selection, inventory, and routing check coverage.

Command: node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000
Result: pass
Evidence: Oversized test baseline OK (11 entries, 12176 total lines, threshold>1000).
Scope: oversized test baseline budget.

Command: node scripts/check-vitest-projects.mjs
Result: pass
Evidence: vitest workspace projects OK; test routing OK (345 tests, 10 primary routes).
Scope: Vitest workspace and route registry parity.

Command: bun run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: TypeScript project references.

Command: bun run lint:core
Result: pass
Evidence: eslint packages scripts eslint.config.cjs vitest.config.ts exited 0.
Scope: core lint surface.

Command: bunx prettier --check <touched files> && git diff --check
Result: pass
Evidence: Prettier reported all matched files use code style; git diff --check exited 0.
Scope: touched file formatting and whitespace.

Command: bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js doctor; node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: framework dev runtime ready; doctor OK with 0 errors/0 warnings; policy routing OK.
Scope: repo-local runtime and policy routing.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
