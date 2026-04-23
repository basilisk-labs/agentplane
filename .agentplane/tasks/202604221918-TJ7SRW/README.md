---
id: "202604221918-TJ7SRW"
title: "Add test inventory source of truth"
result_summary: "Added shared test inventory source of truth for package test route classification."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "test"
verify:
  - "bun run test:fast"
  - "bun run vitest:projects:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T19:19:32.123Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T19:26:59.134Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/test-inventory.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 3 tests passed. Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK. Command: bun run test:fast; Result: pass; Evidence: 237 test files passed, 1374 tests passed, 2 skipped."
commit:
  hash: "6adf8152e0aa527386658335081c36d310462219"
  message: "✨ TJ7SRW test: add shared test inventory"
comments:
  -
    author: "CODER"
    body: "Start: implementing shared test inventory as the source of truth for package test discovery and route classification."
  -
    author: "CODER"
    body: "Verified: shared test inventory added with focused inventory coverage plus vitest project and fast-suite checks passing."
events:
  -
    type: "status"
    at: "2026-04-22T19:19:32.843Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing shared test inventory as the source of truth for package test discovery and route classification."
  -
    type: "verify"
    at: "2026-04-22T19:26:59.134Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/test-inventory.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 3 tests passed. Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK. Command: bun run test:fast; Result: pass; Evidence: 237 test files passed, 1374 tests passed, 2 skipped."
  -
    type: "status"
    at: "2026-04-22T19:27:18.905Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: shared test inventory added with focused inventory coverage plus vitest project and fast-suite checks passing."
doc_version: 3
doc_updated_at: "2026-04-22T19:27:18.906Z"
doc_updated_by: "CODER"
description: "Create a shared test inventory module that discovers package test files and classifies them into explicit primary and aggregate test routes."
sections:
  Summary: |-
    Add test inventory source of truth
    
    Create a shared test inventory module that discovers package test files and classifies them into explicit primary and aggregate test routes.
  Scope: |-
    - In scope: add a reusable scripts/lib/test-inventory.mjs module that discovers package .test.ts files and classifies them into primary and aggregate test routes.
    - In scope: expose deterministic route data and helpers for guard scripts without running Vitest.
    - In scope: document routing assumptions in code-level names and tests/fixtures where useful.
    - Out of scope: changing CI behavior or failing builds on routing drift; that is handled by dependent tasks.
  Plan: "Create a shared test inventory module for all package .test.ts files. The deliverable is a reusable source of truth for later routing guards; it must not yet change CI semantics beyond tests for the module itself."
  Verify Steps: |-
    1. Run `bun run vitest:projects:check`. Expected: pass.
    2. Run `bun run test:fast`. Expected: pass.
    3. Run the new inventory unit test directly if it is not covered by `test:fast`. Expected: pass.
    4. Inspect inventory output/fixtures for all current package test domains. Expected: no unclassified current test domain is left implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T19:26:59.134Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/test-inventory.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 3 tests passed. Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK. Command: bun run test:fast; Result: pass; Evidence: 237 test files passed, 1374 tests passed, 2 skipped.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T19:19:32.857Z, excerpt_hash=sha256:3b110b848fed1724db49e3f6bd085f4dac4caf3df2a35960d178f57f74346dbb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add test inventory source of truth

Create a shared test inventory module that discovers package test files and classifies them into explicit primary and aggregate test routes.

## Scope

- In scope: add a reusable scripts/lib/test-inventory.mjs module that discovers package .test.ts files and classifies them into primary and aggregate test routes.
- In scope: expose deterministic route data and helpers for guard scripts without running Vitest.
- In scope: document routing assumptions in code-level names and tests/fixtures where useful.
- Out of scope: changing CI behavior or failing builds on routing drift; that is handled by dependent tasks.

## Plan

Create a shared test inventory module for all package .test.ts files. The deliverable is a reusable source of truth for later routing guards; it must not yet change CI semantics beyond tests for the module itself.

## Verify Steps

1. Run `bun run vitest:projects:check`. Expected: pass.
2. Run `bun run test:fast`. Expected: pass.
3. Run the new inventory unit test directly if it is not covered by `test:fast`. Expected: pass.
4. Inspect inventory output/fixtures for all current package test domains. Expected: no unclassified current test domain is left implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T19:26:59.134Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/test-inventory.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 3 tests passed. Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK. Command: bun run test:fast; Result: pass; Evidence: 237 test files passed, 1374 tests passed, 2 skipped.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T19:19:32.857Z, excerpt_hash=sha256:3b110b848fed1724db49e3f6bd085f4dac4caf3df2a35960d178f57f74346dbb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
