---
id: "202604211312-EYTQD7"
title: "Remove agentplane testing facade"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604211312-7QK5H1"
tags:
  - "cleanup"
  - "code"
  - "testkit"
verify:
  - "bun run arch:check"
  - "bun run knip:check"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:44.412Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T17:13:28.671Z"
  updated_by: "CODER"
  note: "Verified removal of the agentplane testing facade. Checks: bun run typecheck passed; bun run arch:check passed; bun run knip:check passed; bun run lint:core passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run format:check passed; git diff --check passed. Additional scan confirmed no remaining src/testing or agentplane/internal/testing references."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove the transitional agentplane testing facade by migrating test consumers to @agentplane/testkit and deleting packages/agentplane/src/testing."
events:
  -
    type: "status"
    at: "2026-04-21T17:10:22.795Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the transitional agentplane testing facade by migrating test consumers to @agentplane/testkit and deleting packages/agentplane/src/testing."
  -
    type: "verify"
    at: "2026-04-21T17:13:28.671Z"
    author: "CODER"
    state: "ok"
    note: "Verified removal of the agentplane testing facade. Checks: bun run typecheck passed; bun run arch:check passed; bun run knip:check passed; bun run lint:core passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run format:check passed; git diff --check passed. Additional scan confirmed no remaining src/testing or agentplane/internal/testing references."
doc_version: 3
doc_updated_at: "2026-04-21T17:13:28.674Z"
doc_updated_by: "CODER"
description: "Migrate remaining consumers off packages/agentplane/src/testing and delete the transitional testing facade."
sections:
  Summary: |-
    Remove agentplane testing facade

    Migrate remaining consumers off packages/agentplane/src/testing and delete the transitional testing facade.
  Scope: |-
    - In scope: Migrate remaining consumers off packages/agentplane/src/testing and delete the transitional testing facade.
    - Out of scope: unrelated refactors not required for "Remove agentplane testing facade".
  Plan: "Scope: finish E-prime by deleting the double testkit surface. Steps: 1. Find all packages/agentplane/src/testing consumers. 2. Replace them with @agentplane/testkit imports. 3. Delete the facade and update path aliases if no longer needed. 4. Run knip to ensure no leftover dead exports. Acceptance: packages/agentplane/src/testing does not exist; tests and architecture checks pass."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T17:13:28.671Z — VERIFY — ok

    By: CODER

    Note: Verified removal of the agentplane testing facade. Checks: bun run typecheck passed; bun run arch:check passed; bun run knip:check passed; bun run lint:core passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run format:check passed; git diff --check passed. Additional scan confirmed no remaining src/testing or agentplane/internal/testing references.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T17:10:22.803Z, excerpt_hash=sha256:cba41b7c1dbe55cf2e152bc98973d9c89009ed0a7a65e2aaff289d0f4480f630

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove agentplane testing facade

Migrate remaining consumers off packages/agentplane/src/testing and delete the transitional testing facade.

## Scope

- In scope: Migrate remaining consumers off packages/agentplane/src/testing and delete the transitional testing facade.
- Out of scope: unrelated refactors not required for "Remove agentplane testing facade".

## Plan

Scope: finish E-prime by deleting the double testkit surface. Steps: 1. Find all packages/agentplane/src/testing consumers. 2. Replace them with @agentplane/testkit imports. 3. Delete the facade and update path aliases if no longer needed. 4. Run knip to ensure no leftover dead exports. Acceptance: packages/agentplane/src/testing does not exist; tests and architecture checks pass.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T17:13:28.671Z — VERIFY — ok

By: CODER

Note: Verified removal of the agentplane testing facade. Checks: bun run typecheck passed; bun run arch:check passed; bun run knip:check passed; bun run lint:core passed; bun run test:project -- cli-unit passed (63 files, 629 tests); bun run format:check passed; git diff --check passed. Additional scan confirmed no remaining src/testing or agentplane/internal/testing references.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T17:10:22.803Z, excerpt_hash=sha256:cba41b7c1dbe55cf2e152bc98973d9c89009ed0a7a65e2aaff289d0f4480f630

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
