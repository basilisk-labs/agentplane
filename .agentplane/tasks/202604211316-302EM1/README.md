---
id: "202604211316-302EM1"
title: "Promote init v2 as default interactive UI"
result_summary: "Promoted init v2 to the default TTY interactive route, preserved legacy for --yes/non-TTY/plain prompt mode, and refreshed generated CLI reference."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604211316-2FRTB3"
tags:
  - "cli"
  - "code"
  - "init"
verify:
  - "bun run docs:cli:check"
  - "bun run test:project -- cli-core"
  - "bun run test:project -- critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:16:33.956Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T16:58:11.673Z"
  updated_by: "CODER"
  note: "Verified init v2 default interactive promotion. Checks: bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 598 tests); bun run docs:cli:check passed; bun run test:project -- critical passed (5 files, 13 tests); bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 passed (1 file, 5 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed."
commit:
  hash: "f83f1d4e0bd64b969c2d92d58dc002fe6cc7d835"
  message: "✨ 302EM1 init: make v2 default interactive UI"
comments:
  -
    author: "CODER"
    body: "Start: promote the validated init v2 route to the default interactive TTY path while preserving --yes, non-TTY, and plain prompt behavior."
  -
    author: "CODER"
    body: "Verified: init v2 default interactive promotion. Checks: bun run typecheck; bun run test:project -- cli-core; bun run docs:cli:check; bun run test:project -- critical; focused init v2 test; bun run lint:core; bun run format:check; git diff --check."
events:
  -
    type: "status"
    at: "2026-04-21T16:54:33.076Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: promote the validated init v2 route to the default interactive TTY path while preserving --yes, non-TTY, and plain prompt behavior."
  -
    type: "verify"
    at: "2026-04-21T16:58:11.673Z"
    author: "CODER"
    state: "ok"
    note: "Verified init v2 default interactive promotion. Checks: bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 598 tests); bun run docs:cli:check passed; bun run test:project -- critical passed (5 files, 13 tests); bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 passed (1 file, 5 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed."
  -
    type: "status"
    at: "2026-04-21T16:58:48.170Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init v2 default interactive promotion. Checks: bun run typecheck; bun run test:project -- cli-core; bun run docs:cli:check; bun run test:project -- critical; focused init v2 test; bun run lint:core; bun run format:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-21T16:58:48.170Z"
doc_updated_by: "CODER"
description: "After experimental validation, make init v2 the default TTY interactive UI while preserving non-TTY and plain legacy behavior."
sections:
  Summary: |-
    Promote init v2 as default interactive UI
    
    After experimental validation, make init v2 the default TTY interactive UI while preserving non-TTY and plain legacy behavior.
  Scope: |-
    - In scope: After experimental validation, make init v2 the default TTY interactive UI while preserving non-TTY and plain legacy behavior.
    - Out of scope: unrelated refactors not required for "Promote init v2 as default interactive UI".
  Plan: "Scope: implement atom #7. Steps: 1. Switch default TTY interactive init to v2. 2. Keep non-TTY, --yes, explicit flags, and plain prompt mode behavior stable or intentionally update snapshots. 3. Deprecate old ui.ts/framedRailCallout path. 4. Update run-cli.core.init.test.ts snapshots only for intentional interactive UI changes. Acceptance: init CLI contracts pass and default interactive UI is v2."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run test:project -- critical`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T16:58:11.673Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified init v2 default interactive promotion. Checks: bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 598 tests); bun run docs:cli:check passed; bun run test:project -- critical passed (5 files, 13 tests); bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 passed (1 file, 5 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:54:33.084Z, excerpt_hash=sha256:6db0e71a93be54810b3abe68ea513b618d8592053762ca77a608f0bc05a1dacc
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Promote init v2 as default interactive UI

After experimental validation, make init v2 the default TTY interactive UI while preserving non-TTY and plain legacy behavior.

## Scope

- In scope: After experimental validation, make init v2 the default TTY interactive UI while preserving non-TTY and plain legacy behavior.
- Out of scope: unrelated refactors not required for "Promote init v2 as default interactive UI".

## Plan

Scope: implement atom #7. Steps: 1. Switch default TTY interactive init to v2. 2. Keep non-TTY, --yes, explicit flags, and plain prompt mode behavior stable or intentionally update snapshots. 3. Deprecate old ui.ts/framedRailCallout path. 4. Update run-cli.core.init.test.ts snapshots only for intentional interactive UI changes. Acceptance: init CLI contracts pass and default interactive UI is v2.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run test:project -- critical`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T16:58:11.673Z — VERIFY — ok

By: CODER

Note: Verified init v2 default interactive promotion. Checks: bun run typecheck passed; bun run test:project -- cli-core passed (60 files, 598 tests); bun run docs:cli:check passed; bun run test:project -- critical passed (5 files, 13 tests); bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000 passed (1 file, 5 tests); bun run lint:core passed; bun run format:check passed; git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:54:33.084Z, excerpt_hash=sha256:6db0e71a93be54810b3abe68ea513b618d8592053762ca77a608f0bc05a1dacc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
