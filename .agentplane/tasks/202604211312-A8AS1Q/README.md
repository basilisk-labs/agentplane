---
id: "202604211312-A8AS1Q"
title: "Repoint agentplane testing shim to testkit package alias"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604211312-4PXEBW"
tags:
  - "code"
  - "testing"
  - "testkit"
verify:
  - "bun run test:project -- cli-core"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:29.271Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T16:45:31.462Z"
  updated_by: "CODER"
  note: "Verified testkit alias shim: no testkit/dist matches in packages/agentplane/src/testing; focused testing facade test passed (1 file, 2 tests); bun run typecheck passed; bun run --filter=@agentplane/testkit build passed; bun run test:project -- cli-core passed (59 files, 593 tests); bun run test:project -- cli-unit passed (62 files, 624 tests); bun run lint:core passed; bun run format:check passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repoint agentplane testing shim to the canonical @agentplane/testkit package alias after subpath lint enforcement."
events:
  -
    type: "status"
    at: "2026-04-21T16:34:41.047Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repoint agentplane testing shim to the canonical @agentplane/testkit package alias after subpath lint enforcement."
  -
    type: "verify"
    at: "2026-04-21T16:41:28.103Z"
    author: "CODER"
    state: "needs_rework"
    note: "Implementation done; required verification is not fully green because cli-unit/testkit build hit existing runtime bootstrap dist dependencies."
  -
    type: "verify"
    at: "2026-04-21T16:45:31.462Z"
    author: "CODER"
    state: "ok"
    note: "Verified testkit alias shim: no testkit/dist matches in packages/agentplane/src/testing; focused testing facade test passed (1 file, 2 tests); bun run typecheck passed; bun run --filter=@agentplane/testkit build passed; bun run test:project -- cli-core passed (59 files, 593 tests); bun run test:project -- cli-unit passed (62 files, 624 tests); bun run lint:core passed; bun run format:check passed."
doc_version: 3
doc_updated_at: "2026-04-21T16:45:31.466Z"
doc_updated_by: "CODER"
description: "Replace packages/agentplane/src/testing direct ../../../testkit/dist imports with @agentplane/testkit package alias imports so dev tests do not depend on prebuilt dist."
sections:
  Summary: |-
    Repoint agentplane testing shim to testkit package alias

    Replace packages/agentplane/src/testing direct ../../../testkit/dist imports with @agentplane/testkit package alias imports so dev tests do not depend on prebuilt dist.
  Scope: |-
    - In scope: Replace packages/agentplane/src/testing direct ../../../testkit/dist imports with @agentplane/testkit package alias imports so dev tests do not depend on prebuilt dist.
    - Out of scope: unrelated refactors not required for "Repoint agentplane testing shim to testkit package alias".
  Plan: "Scope: close the dev-loop mismatch in the transitional testing facade. Steps: 1. Update testing/index.ts to import from @agentplane/testkit and its supported subpaths instead of ../../../testkit/dist. 2. Ensure vitest/tsconfig resolution works before a package build. 3. Keep existing consumers stable. Acceptance: tests pass from source without requiring testkit dist freshness; no direct testkit/dist import remains in packages/agentplane/src/testing."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T16:41:28.103Z — VERIFY — needs_rework

    By: CODER

    Note: Implementation done; required verification is not fully green because cli-unit/testkit build hit existing runtime bootstrap dist dependencies.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:34:41.055Z, excerpt_hash=sha256:7009b836bc85a66bbab3075f17777dff11b2ffe3757c0f3f30c89dad9d1a11de

    Details:

    Command: bun run test:project -- agentplane packages/agentplane/src/testing/index.test.ts
    Result: pass
    Evidence: packages/agentplane/src/testing/index.test.ts passed 2 tests.
    Scope: focused compatibility facade regression for agentplane/internal/testing -> @agentplane/testkit alias.

    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0 with no diagnostics.
    Scope: TypeScript project references and aliases, including @agentplane/testkit root path mapping.

    Command: bun run test:project -- cli-core
    Result: pass
    Evidence: 59 files passed, 593 tests passed.
    Scope: required CLI core project verification.

    Command: bun run test:project -- cli-unit
    Result: fail
    Evidence: first run failed 1 workflow-profile test; after local agentplane build, rerun failed 8 tests in workflow-profile/pr-flow/upgrade. Failures report target worktree bootstrap/dist issues such as 'agentplane dist is missing for this framework checkout' and upgrade returning code 5.
    Scope: required CLI unit project verification; failures are outside packages/agentplane/src/testing and do not reference testkit/dist alias behavior.

    Command: bun run --filter=@agentplane/testkit build
    Result: fail
    Evidence: TS6305 errors for missing/stale packages/agentplane/dist declaration outputs imported by packages/testkit/src/{recipes,runner,task}.d.ts dependencies.
    Scope: optional testkit build check requested by task context; failure is an existing build-order/runtime artifact dependency, not a direct shim import regression.

    Command: rg -n 'testkit/dist|../../../testkit/dist' packages/agentplane/src/testing
    Result: pass
    Evidence: no matches.
    Scope: confirms the approved shim scope no longer depends on ../../../testkit/dist.

    ### 2026-04-21T16:45:31.462Z — VERIFY — ok

    By: CODER

    Note: Verified testkit alias shim: no testkit/dist matches in packages/agentplane/src/testing; focused testing facade test passed (1 file, 2 tests); bun run typecheck passed; bun run --filter=@agentplane/testkit build passed; bun run test:project -- cli-core passed (59 files, 593 tests); bun run test:project -- cli-unit passed (62 files, 624 tests); bun run lint:core passed; bun run format:check passed.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:41:28.105Z, excerpt_hash=sha256:7009b836bc85a66bbab3075f17777dff11b2ffe3757c0f3f30c89dad9d1a11de

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Repoint agentplane testing shim to testkit package alias

Replace packages/agentplane/src/testing direct ../../../testkit/dist imports with @agentplane/testkit package alias imports so dev tests do not depend on prebuilt dist.

## Scope

- In scope: Replace packages/agentplane/src/testing direct ../../../testkit/dist imports with @agentplane/testkit package alias imports so dev tests do not depend on prebuilt dist.
- Out of scope: unrelated refactors not required for "Repoint agentplane testing shim to testkit package alias".

## Plan

Scope: close the dev-loop mismatch in the transitional testing facade. Steps: 1. Update testing/index.ts to import from @agentplane/testkit and its supported subpaths instead of ../../../testkit/dist. 2. Ensure vitest/tsconfig resolution works before a package build. 3. Keep existing consumers stable. Acceptance: tests pass from source without requiring testkit dist freshness; no direct testkit/dist import remains in packages/agentplane/src/testing.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T16:41:28.103Z — VERIFY — needs_rework

By: CODER

Note: Implementation done; required verification is not fully green because cli-unit/testkit build hit existing runtime bootstrap dist dependencies.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:34:41.055Z, excerpt_hash=sha256:7009b836bc85a66bbab3075f17777dff11b2ffe3757c0f3f30c89dad9d1a11de

Details:

Command: bun run test:project -- agentplane packages/agentplane/src/testing/index.test.ts
Result: pass
Evidence: packages/agentplane/src/testing/index.test.ts passed 2 tests.
Scope: focused compatibility facade regression for agentplane/internal/testing -> @agentplane/testkit alias.

Command: bun run typecheck
Result: pass
Evidence: tsc -b exited 0 with no diagnostics.
Scope: TypeScript project references and aliases, including @agentplane/testkit root path mapping.

Command: bun run test:project -- cli-core
Result: pass
Evidence: 59 files passed, 593 tests passed.
Scope: required CLI core project verification.

Command: bun run test:project -- cli-unit
Result: fail
Evidence: first run failed 1 workflow-profile test; after local agentplane build, rerun failed 8 tests in workflow-profile/pr-flow/upgrade. Failures report target worktree bootstrap/dist issues such as 'agentplane dist is missing for this framework checkout' and upgrade returning code 5.
Scope: required CLI unit project verification; failures are outside packages/agentplane/src/testing and do not reference testkit/dist alias behavior.

Command: bun run --filter=@agentplane/testkit build
Result: fail
Evidence: TS6305 errors for missing/stale packages/agentplane/dist declaration outputs imported by packages/testkit/src/{recipes,runner,task}.d.ts dependencies.
Scope: optional testkit build check requested by task context; failure is an existing build-order/runtime artifact dependency, not a direct shim import regression.

Command: rg -n 'testkit/dist|../../../testkit/dist' packages/agentplane/src/testing
Result: pass
Evidence: no matches.
Scope: confirms the approved shim scope no longer depends on ../../../testkit/dist.

### 2026-04-21T16:45:31.462Z — VERIFY — ok

By: CODER

Note: Verified testkit alias shim: no testkit/dist matches in packages/agentplane/src/testing; focused testing facade test passed (1 file, 2 tests); bun run typecheck passed; bun run --filter=@agentplane/testkit build passed; bun run test:project -- cli-core passed (59 files, 593 tests); bun run test:project -- cli-unit passed (62 files, 624 tests); bun run lint:core passed; bun run format:check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:41:28.105Z, excerpt_hash=sha256:7009b836bc85a66bbab3075f17777dff11b2ffe3757c0f3f30c89dad9d1a11de

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
