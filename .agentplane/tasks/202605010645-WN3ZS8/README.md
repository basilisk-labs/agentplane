---
id: "202605010645-WN3ZS8"
title: "AP-08: Split hooks CLI test monolith"
result_summary: "Merged via PR #664."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605010645-D8EM8Y"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T09:09:15.364Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after AP-07 closed on main and dependency is ready."
verification:
  state: "ok"
  updated_at: "2026-05-01T09:18:05.676Z"
  updated_by: "CODER"
  note: "Verified: hooks CLI monolith split into install, uninstall, runtime-shim, hook-run groups; oversized guard now passes with 15 entries and 17132 total lines."
commit:
  hash: "f8d4f998c3e5dd3ff61921665402fdfff067d164"
  message: "Merge pull request #664 from basilisk-labs/task/202605010645-WN3ZS8/hooks-test-split"
comments:
  -
    author: "CODER"
    body: "Start: split hooks CLI tests by install, uninstall, runtime shim, and hook-run scenario groups while keeping shared fixtures in testkit."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #664 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T09:09:54.167Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split hooks CLI tests by install, uninstall, runtime shim, and hook-run scenario groups while keeping shared fixtures in testkit."
  -
    type: "verify"
    at: "2026-05-01T09:18:05.676Z"
    author: "CODER"
    state: "ok"
    note: "Verified: hooks CLI monolith split into install, uninstall, runtime-shim, hook-run groups; oversized guard now passes with 15 entries and 17132 total lines."
  -
    type: "status"
    at: "2026-05-01T09:25:11.808Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #664 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T09:25:11.813Z"
doc_updated_by: "INTEGRATOR"
description: "Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers."
sections:
  Summary: |-
    AP-08: Split hooks CLI test monolith
    
    Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.
  Scope: |-
    - In scope: Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.
    - Out of scope: unrelated refactors not required for "AP-08: Split hooks CLI test monolith".
  Plan: |-
    1. Implement the change for "AP-08: Split hooks CLI test monolith".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T09:18:05.676Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: hooks CLI monolith split into install, uninstall, runtime-shim, hook-run groups; oversized guard now passes with 15 entries and 17132 total lines.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T09:09:54.167Z, excerpt_hash=sha256:a4e82fc31d83d1995af821946af7a7731d02988207fada689fbec7ee4f099b7c
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks*.test.ts --testTimeout 180000 --hookTimeout 180000 && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; Result: pass; Evidence: 5 files, 42 tests; oversized baseline OK (15 entries, 17132 total lines). Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/test-routing-check.test.ts --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 2 files, 43 tests. Command: node scripts/check-vitest-projects.mjs; Result: pass; Evidence: 334 tests, 10 primary routes. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass. Command: git diff --check; Result: pass.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-08: Split hooks CLI test monolith

Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.

## Scope

- In scope: Split run-cli.core.hooks.test.ts by hook scenario family and promote shared fixtures to testkit hooks helpers.
- Out of scope: unrelated refactors not required for "AP-08: Split hooks CLI test monolith".

## Plan

1. Implement the change for "AP-08: Split hooks CLI test monolith".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks*.test.ts && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T09:18:05.676Z — VERIFY — ok

By: CODER

Note: Verified: hooks CLI monolith split into install, uninstall, runtime-shim, hook-run groups; oversized guard now passes with 15 entries and 17132 total lines.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T09:09:54.167Z, excerpt_hash=sha256:a4e82fc31d83d1995af821946af7a7731d02988207fada689fbec7ee4f099b7c

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks*.test.ts --testTimeout 180000 --hookTimeout 180000 && node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; Result: pass; Evidence: 5 files, 42 tests; oversized baseline OK (15 entries, 17132 total lines). Command: bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/test-routing-check.test.ts --testTimeout 60000 --hookTimeout 60000; Result: pass; Evidence: 2 files, 43 tests. Command: node scripts/check-vitest-projects.mjs; Result: pass; Evidence: 334 tests, 10 primary routes. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run framework:dev:bootstrap; Result: pass. Command: git diff --check; Result: pass.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
