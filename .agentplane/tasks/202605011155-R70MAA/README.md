---
id: "202605011155-R70MAA"
title: "AP-13 follow-up: Extract task query fixtures"
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
  updated_at: "2026-05-01T11:55:39.584Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-01T11:59:28.607Z"
  updated_by: "CODER"
  note: "Verified AP-13 follow-up task query fixture extraction: helper diff applied on fresh branch and all impacted checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: applying the AP-13 leftover task-query helper extraction on a fresh follow-up branch without carrying stale AP-13 task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T11:56:08.362Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: applying the AP-13 leftover task-query helper extraction on a fresh follow-up branch without carrying stale AP-13 task artifacts."
  -
    type: "verify"
    at: "2026-05-01T11:59:28.607Z"
    author: "CODER"
    state: "ok"
    note: "Verified AP-13 follow-up task query fixture extraction: helper diff applied on fresh branch and all impacted checks passed."
doc_version: 3
doc_updated_at: "2026-05-01T11:59:28.626Z"
doc_updated_by: "CODER"
description: "Move repeated task run/query setup into @agentplane/testkit cli-core-tasks-query helpers after AP-13 split landed before the helper extraction."
sections:
  Summary: |-
    AP-13 follow-up: Extract task query fixtures
    
    Move repeated task run/query setup into @agentplane/testkit cli-core-tasks-query helpers after AP-13 split landed before the helper extraction.
  Scope: |-
    - In scope: Move repeated task run/query setup into @agentplane/testkit cli-core-tasks-query helpers after AP-13 split landed before the helper extraction.
    - Out of scope: unrelated refactors not required for "AP-13 follow-up: Extract task query fixtures".
  Plan: |-
    1. Start a dedicated branch_pr worktree from current main.
    2. Apply only the helper extraction code diff from the late AP-13 task branch: testkit fixture helpers plus query-run prepare/inspection callsite cleanup.
    3. Do not carry over old AP-13 task artifacts or stale PR metadata.
    4. Run focused query-run tests, oversized guard, route/inventory checks, typecheck, lint, formatting/diff checks, bootstrap, doctor, and policy routing.
    5. Publish a fresh follow-up PR and close through the hosted branch_pr route.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T11:59:28.607Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified AP-13 follow-up task query fixture extraction: helper diff applied on fresh branch and all impacted checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T11:56:08.362Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts --testTimeout 180000 --hookTimeout 180000 && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000
    Result: pass
    Evidence: 6 files, 19 tests passed; oversized baseline OK (10 entries, 11090 total lines).
    Scope: task run/query split tests and helper extraction.
    
    Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/test-inventory.test.ts packages/agentplane/src/cli/test-routing-check.test.ts --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 3 files, 47 tests passed.
    Scope: route/inventory checks.
    
    Command: node scripts/check-vitest-projects.mjs
    Result: pass
    Evidence: vitest workspace projects OK; test routing OK (346 tests, 10 primary routes).
    Scope: registry parity.
    
    Command: bun run typecheck; bun run lint:core
    Result: pass
    Evidence: tsc -b exited 0; eslint packages scripts eslint.config.cjs vitest.config.ts exited 0.
    Scope: TypeScript and lint.
    
    Command: bunx prettier --check <touched files>; git diff --check
    Result: pass
    Evidence: Prettier reported all matched files use code style; git diff --check exited 0.
    Scope: formatting and whitespace.
    
    Command: bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js doctor; node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: framework dev runtime ready; doctor OK with 0 errors/0 warnings; policy routing OK.
    Scope: runtime and policy routing.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-13 follow-up: Extract task query fixtures

Move repeated task run/query setup into @agentplane/testkit cli-core-tasks-query helpers after AP-13 split landed before the helper extraction.

## Scope

- In scope: Move repeated task run/query setup into @agentplane/testkit cli-core-tasks-query helpers after AP-13 split landed before the helper extraction.
- Out of scope: unrelated refactors not required for "AP-13 follow-up: Extract task query fixtures".

## Plan

1. Start a dedicated branch_pr worktree from current main.
2. Apply only the helper extraction code diff from the late AP-13 task branch: testkit fixture helpers plus query-run prepare/inspection callsite cleanup.
3. Do not carry over old AP-13 task artifacts or stale PR metadata.
4. Run focused query-run tests, oversized guard, route/inventory checks, typecheck, lint, formatting/diff checks, bootstrap, doctor, and policy routing.
5. Publish a fresh follow-up PR and close through the hosted branch_pr route.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T11:59:28.607Z — VERIFY — ok

By: CODER

Note: Verified AP-13 follow-up task query fixture extraction: helper diff applied on fresh branch and all impacted checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T11:56:08.362Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts --testTimeout 180000 --hookTimeout 180000 && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000
Result: pass
Evidence: 6 files, 19 tests passed; oversized baseline OK (10 entries, 11090 total lines).
Scope: task run/query split tests and helper extraction.

Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/test-inventory.test.ts packages/agentplane/src/cli/test-routing-check.test.ts --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: 3 files, 47 tests passed.
Scope: route/inventory checks.

Command: node scripts/check-vitest-projects.mjs
Result: pass
Evidence: vitest workspace projects OK; test routing OK (346 tests, 10 primary routes).
Scope: registry parity.

Command: bun run typecheck; bun run lint:core
Result: pass
Evidence: tsc -b exited 0; eslint packages scripts eslint.config.cjs vitest.config.ts exited 0.
Scope: TypeScript and lint.

Command: bunx prettier --check <touched files>; git diff --check
Result: pass
Evidence: Prettier reported all matched files use code style; git diff --check exited 0.
Scope: formatting and whitespace.

Command: bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js doctor; node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: framework dev runtime ready; doctor OK with 0 errors/0 warnings; policy routing OK.
Scope: runtime and policy routing.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
