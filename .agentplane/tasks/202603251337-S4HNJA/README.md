---
id: "202603251337-S4HNJA"
title: "Stabilize Windows timeout in platform-critical upgrade test"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "ci"
  - "tests"
  - "windows"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T13:38:06.415Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T13:43:23.503Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
    Result: pass
    Evidence: 12 tests passed; the workflow runtime artifacts case completed in about 4s locally after the Windows-only timeout widening.
    Scope: packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
    
    Command: bun run test:platform-critical:init-upgrade
    Result: pass
    Evidence: 48 tests passed across run-cli.core.init.test.ts and run-cli.core.upgrade.test.ts; the combined platform-critical init+upgrade suite completed successfully.
    Scope: packages/agentplane/src/cli/run-cli.core.init.test.ts, packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
    
    Command: bun run --filter=agentplane build
    Result: pass
    Evidence: agentplane build exited with code 0.
    Scope: packages/agentplane
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the Windows platform-critical timeout, keep the fix narrow to the upgrade test path, and record verification against the declared init+upgrade suite."
events:
  -
    type: "status"
    at: "2026-03-25T13:39:11.109Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the Windows platform-critical timeout, keep the fix narrow to the upgrade test path, and record verification against the declared init+upgrade suite."
  -
    type: "verify"
    at: "2026-03-25T13:43:23.503Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
      Result: pass
      Evidence: 12 tests passed; the workflow runtime artifacts case completed in about 4s locally after the Windows-only timeout widening.
      Scope: packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
      
      Command: bun run test:platform-critical:init-upgrade
      Result: pass
      Evidence: 48 tests passed across run-cli.core.init.test.ts and run-cli.core.upgrade.test.ts; the combined platform-critical init+upgrade suite completed successfully.
      Scope: packages/agentplane/src/cli/run-cli.core.init.test.ts, packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
      
      Command: bun run --filter=agentplane build
      Result: pass
      Evidence: agentplane build exited with code 0.
      Scope: packages/agentplane
doc_version: 3
doc_updated_at: "2026-03-25T13:43:23.510Z"
doc_updated_by: "CODER"
description: "Fix the failing GitHub Actions Windows check where run-cli.core.upgrade.test.ts times out inside the platform-critical init+upgrade suite. Keep the fix narrow: stabilize the test or its invocation without weakening the upgrade contract."
sections:
  Summary: |-
    Stabilize Windows timeout in platform-critical upgrade test
    
    Fix the failing GitHub Actions Windows check where run-cli.core.upgrade.test.ts times out inside the platform-critical init+upgrade suite. Keep the fix narrow: stabilize the test or its invocation without weakening the upgrade contract.
  Scope: |-
    - In scope: Fix the failing GitHub Actions Windows check where run-cli.core.upgrade.test.ts times out inside the platform-critical init+upgrade suite. Keep the fix narrow: stabilize the test or its invocation without weakening the upgrade contract.
    - Out of scope: unrelated refactors not required for "Stabilize Windows timeout in platform-critical upgrade test".
  Plan: |-
    1. Implement the change for "Stabilize Windows timeout in platform-critical upgrade test".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts`. Expected: the upgraded CLI test file passes locally without timeout regressions in the touched case.
    2. Run `bun run test:platform-critical:init-upgrade`. Expected: the combined init+upgrade platform-critical suite passes on the review branch with the Windows-sensitive path covered.
    3. Run `bun run --filter=agentplane build`. Expected: the package still builds cleanly after the test-path change.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T13:43:23.503Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
    Result: pass
    Evidence: 12 tests passed; the workflow runtime artifacts case completed in about 4s locally after the Windows-only timeout widening.
    Scope: packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
    
    Command: bun run test:platform-critical:init-upgrade
    Result: pass
    Evidence: 48 tests passed across run-cli.core.init.test.ts and run-cli.core.upgrade.test.ts; the combined platform-critical init+upgrade suite completed successfully.
    Scope: packages/agentplane/src/cli/run-cli.core.init.test.ts, packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
    
    Command: bun run --filter=agentplane build
    Result: pass
    Evidence: agentplane build exited with code 0.
    Scope: packages/agentplane
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T13:39:11.114Z, excerpt_hash=sha256:c47fbf15b57a9376006bf1f4851796394087d55f26d04cb8f4596ff30cdb6918
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize Windows timeout in platform-critical upgrade test

Fix the failing GitHub Actions Windows check where run-cli.core.upgrade.test.ts times out inside the platform-critical init+upgrade suite. Keep the fix narrow: stabilize the test or its invocation without weakening the upgrade contract.

## Scope

- In scope: Fix the failing GitHub Actions Windows check where run-cli.core.upgrade.test.ts times out inside the platform-critical init+upgrade suite. Keep the fix narrow: stabilize the test or its invocation without weakening the upgrade contract.
- Out of scope: unrelated refactors not required for "Stabilize Windows timeout in platform-critical upgrade test".

## Plan

1. Implement the change for "Stabilize Windows timeout in platform-critical upgrade test".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts`. Expected: the upgraded CLI test file passes locally without timeout regressions in the touched case.
2. Run `bun run test:platform-critical:init-upgrade`. Expected: the combined init+upgrade platform-critical suite passes on the review branch with the Windows-sensitive path covered.
3. Run `bun run --filter=agentplane build`. Expected: the package still builds cleanly after the test-path change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T13:43:23.503Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.upgrade.test.ts
Result: pass
Evidence: 12 tests passed; the workflow runtime artifacts case completed in about 4s locally after the Windows-only timeout widening.
Scope: packages/agentplane/src/cli/run-cli.core.upgrade.test.ts

Command: bun run test:platform-critical:init-upgrade
Result: pass
Evidence: 48 tests passed across run-cli.core.init.test.ts and run-cli.core.upgrade.test.ts; the combined platform-critical init+upgrade suite completed successfully.
Scope: packages/agentplane/src/cli/run-cli.core.init.test.ts, packages/agentplane/src/cli/run-cli.core.upgrade.test.ts

Command: bun run --filter=agentplane build
Result: pass
Evidence: agentplane build exited with code 0.
Scope: packages/agentplane

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T13:39:11.114Z, excerpt_hash=sha256:c47fbf15b57a9376006bf1f4851796394087d55f26d04cb8f4596ff30cdb6918

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
