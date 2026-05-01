---
id: "202605010644-1HMJJA"
title: "AP-04: Add prompt schema migration seam"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202605010644-48TFEB"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T07:24:10.521Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved AP-04 from user-provided Agentplane 0.4 refactor plan after AP-03 closed."
verification:
  state: "ok"
  updated_at: "2026-05-01T07:28:06.257Z"
  updated_by: "CODER"
  note: "Verified prompt schema migration seam with: bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add prompt module schema version migration entrypoint and route validation through it without changing wire shape."
events:
  -
    type: "status"
    at: "2026-05-01T07:25:10.448Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add prompt module schema version migration entrypoint and route validation through it without changing wire shape."
  -
    type: "verify"
    at: "2026-05-01T07:28:06.257Z"
    author: "CODER"
    state: "ok"
    note: "Verified prompt schema migration seam with: bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap."
doc_version: 3
doc_updated_at: "2026-05-01T07:28:06.261Z"
doc_updated_by: "CODER"
description: "Centralize prompt module schema version handling and add a no-op v1 migration entrypoint with unknown-version tests."
sections:
  Summary: |-
    AP-04: Add prompt schema migration seam
    
    Centralize prompt module schema version handling and add a no-op v1 migration entrypoint with unknown-version tests.
  Scope: |-
    - In scope: Centralize prompt module schema version handling and add a no-op v1 migration entrypoint with unknown-version tests.
    - Out of scope: unrelated refactors not required for "AP-04: Add prompt schema migration seam".
  Plan: |-
    1. Implement the change for "AP-04: Add prompt schema migration seam".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T07:28:06.257Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified prompt schema migration seam with: bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T07:25:10.448Z, excerpt_hash=sha256:83c0c929137cfc7aa8aaa2b03ecc85fde654bcc40cfa2c3d0c3aaaf0a5db60be
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-04: Add prompt schema migration seam

Centralize prompt module schema version handling and add a no-op v1 migration entrypoint with unknown-version tests.

## Scope

- In scope: Centralize prompt module schema version handling and add a no-op v1 migration entrypoint with unknown-version tests.
- Out of scope: unrelated refactors not required for "AP-04: Add prompt schema migration seam".

## Plan

1. Implement the change for "AP-04: Add prompt schema migration seam".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T07:28:06.257Z — VERIFY — ok

By: CODER

Note: Verified prompt schema migration seam with: bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T07:25:10.448Z, excerpt_hash=sha256:83c0c929137cfc7aa8aaa2b03ecc85fde654bcc40cfa2c3d0c3aaaf0a5db60be

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
