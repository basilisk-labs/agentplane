---
id: "202605010644-0B48D4"
title: "AP-02: Guard recipes runtime version parity"
result_summary: "Merged via PR #643."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605010644-1YXBE7"
tags:
  - "code"
verify:
  - "bun run release:parity && bun run test:project -- recipes"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T07:04:51.285Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved AP-02 from user-provided Agentplane 0.4 refactor plan after AP-01 closed."
verification:
  state: "ok"
  updated_at: "2026-05-01T07:09:45.410Z"
  updated_by: "CODER"
  note: "Verified recipes runtime version parity with: bun run release:parity; bun run test:project -- recipes; bunx vitest run packages/agentplane/src/commands/release/check-release-parity-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --testNamePattern 'bumps versions, commits, and tags using the latest plan' --testTimeout 180000 --hookTimeout 180000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap."
commit:
  hash: "96d1cbac3a539239633ac58f77f2fdcfaf844b45"
  message: "Merge pull request #643 from basilisk-labs/task/202605010644-0B48D4/recipes-version-parity"
comments:
  -
    author: "CODER"
    body: "Start: align recipes runtime RECIPES_VERSION with package version and add release parity coverage so future bumps update both surfaces."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #643 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T07:05:04.749Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align recipes runtime RECIPES_VERSION with package version and add release parity coverage so future bumps update both surfaces."
  -
    type: "verify"
    at: "2026-05-01T07:09:45.410Z"
    author: "CODER"
    state: "ok"
    note: "Verified recipes runtime version parity with: bun run release:parity; bun run test:project -- recipes; bunx vitest run packages/agentplane/src/commands/release/check-release-parity-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --testNamePattern 'bumps versions, commits, and tags using the latest plan' --testTimeout 180000 --hookTimeout 180000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap."
  -
    type: "status"
    at: "2026-05-01T07:13:30.594Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #643 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T07:13:30.600Z"
doc_updated_by: "INTEGRATOR"
description: "Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches."
sections:
  Summary: |-
    AP-02: Guard recipes runtime version parity
    
    Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.
  Scope: |-
    - In scope: Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.
    - Out of scope: unrelated refactors not required for "AP-02: Guard recipes runtime version parity".
  Plan: |-
    1. Implement the change for "AP-02: Guard recipes runtime version parity".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run release:parity && bun run test:project -- recipes`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T07:09:45.410Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified recipes runtime version parity with: bun run release:parity; bun run test:project -- recipes; bunx vitest run packages/agentplane/src/commands/release/check-release-parity-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --testNamePattern 'bumps versions, commits, and tags using the latest plan' --testTimeout 180000 --hookTimeout 180000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T07:05:04.749Z, excerpt_hash=sha256:a510b769b7bc5a9389c6f6d5235d8b37422d7f18cec24f9deaaaf286c0f095a5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-02: Guard recipes runtime version parity

Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.

## Scope

- In scope: Fix RECIPES_VERSION drift and make release parity catch future runtime constant mismatches.
- Out of scope: unrelated refactors not required for "AP-02: Guard recipes runtime version parity".

## Plan

1. Implement the change for "AP-02: Guard recipes runtime version parity".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run release:parity && bun run test:project -- recipes`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T07:09:45.410Z — VERIFY — ok

By: CODER

Note: Verified recipes runtime version parity with: bun run release:parity; bun run test:project -- recipes; bunx vitest run packages/agentplane/src/commands/release/check-release-parity-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx vitest run packages/agentplane/src/commands/release/apply.test.ts --testNamePattern 'bumps versions, commits, and tags using the latest plan' --testTimeout 180000 --hookTimeout 180000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T07:05:04.749Z, excerpt_hash=sha256:a510b769b7bc5a9389c6f6d5235d8b37422d7f18cec24f9deaaaf286c0f095a5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
