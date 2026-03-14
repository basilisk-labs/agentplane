---
id: "202603140728-ABFB40"
title: "Add Redmine readiness and doctor checks for canonical state"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
depends_on: []
tags:
  - "code"
  - "backend"
  - "redmine"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T07:33:20.555Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T07:38:30.228Z"
  updated_by: "CODER"
  note: "Verified Redmine readiness diagnostics with bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/backends/task-backend.load.test.ts --hookTimeout 60000 --testTimeout 60000, eslint on doctor workspace/tests, prettier on touched doctor/docs files, and both package builds. doctor now warns when Redmine runs without AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE and stays quiet when canonical_state support is configured."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inspect Redmine backend readiness around canonical_state, surface partial-compatibility doctor findings, and prove the readiness contract in backend and doctor regressions before moving on to migration and live sync work."
events:
  -
    type: "status"
    at: "2026-03-14T07:33:41.217Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect Redmine backend readiness around canonical_state, surface partial-compatibility doctor findings, and prove the readiness contract in backend and doctor regressions before moving on to migration and live sync work."
  -
    type: "verify"
    at: "2026-03-14T07:38:30.228Z"
    author: "CODER"
    state: "ok"
    note: "Verified Redmine readiness diagnostics with bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/backends/task-backend.load.test.ts --hookTimeout 60000 --testTimeout 60000, eslint on doctor workspace/tests, prettier on touched doctor/docs files, and both package builds. doctor now warns when Redmine runs without AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE and stays quiet when canonical_state support is configured."
doc_version: 3
doc_updated_at: "2026-03-14T07:38:30.231Z"
doc_updated_by: "CODER"
description: "Expose Redmine backend readiness for canonical_state-based operation, detect partial compatibility in doctor output, and cover the readiness contract in tests."
sections:
  Summary: |-
    Add Redmine readiness and doctor checks for canonical state
    
    Expose Redmine backend readiness for canonical_state-based operation, detect partial compatibility in doctor output, and cover the readiness contract in tests.
  Scope: |-
    - In scope: Expose Redmine backend readiness for canonical_state-based operation, detect partial compatibility in doctor output, and cover the readiness contract in tests.
    - Out of scope: unrelated refactors not required for "Add Redmine readiness and doctor checks for canonical state".
  Plan: |-
    1. Inspect the current Redmine backend, doctor flow, and config/env surfaces around canonical_state readiness.
    2. Add backend- and doctor-level checks that report partial compatibility or missing canonical_state support for Redmine.
    3. Cover the readiness contract in automated tests and update user-facing backend guidance if the surfaced contract changes.
  Verify Steps: |-
    1. Run 
     RUN  v4.0.18 /Users/densmirnov/Github/agentplane
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > passes default checks for a normal initialized workspace without monorepo src folders
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > passes default checks when only CLAUDE.md exists
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > supports workflow kill-switch for emergency rollback
    ✅ doctor (workflow contract checks disabled via AGENTPLANE_WORKFLOW_ENFORCEMENT.)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > supports workflow kill-switch for emergency rollback
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > does not fail when workflow has warning-only policy mismatch
    ✅ doctor (OK)
    
     ✓ packages/agentplane/src/backends/task-backend.load.test.ts (11 tests) 234ms
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns when active tasks still use legacy README v2 format
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > reports historical README v2 tasks as info when only DONE archive records remain
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns when task README bodies drift from canonical frontmatter sections
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > prefers live task projection over a stale exported snapshot for README migration checks
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > reports but does not fail when DONE task references an unknown historical commit hash
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > skips older archive-only historical commit anomalies by default
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > surfaces older historical archive anomalies when archive-full is enabled
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns but does not fail when DONE task commit points to a close commit subject
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > summarizes repeated unknown historical hashes instead of printing one warning per task
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > summarizes repeated close-commit misuse in historical DONE tasks
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > downgrades legacy backfill historical hashes to info
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > downgrades no-op close-commit references to info
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > downgrades legacy close: record task doc references to info
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns when DONE task README archives exist on disk but are missing from the git index
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns when the active CLI is older than the repository expectation
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > does not emit version-match findings when the active CLI already satisfies the repository expectation
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > prints runtime info when doctor runs inside a framework checkout
    ✅ doctor (OK)
    
    stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns when the global binary is forced inside a framework checkout
    ✅ doctor (OK)
    
     ✓ packages/agentplane/src/commands/doctor.command.test.ts (26 tests) 42547ms
         ✓ fails when DONE task misses implementation commit hash  1860ms
         ✓ warns when active tasks still use legacy README v2 format  2154ms
         ✓ reports historical README v2 tasks as info when only DONE archive records remain  2069ms
         ✓ prefers live task projection over a stale exported snapshot for README migration checks  301ms
         ✓ reports but does not fail when DONE task references an unknown historical commit hash  2181ms
         ✓ skips older archive-only historical commit anomalies by default  2154ms
         ✓ surfaces older historical archive anomalies when archive-full is enabled  3568ms
         ✓ warns but does not fail when DONE task commit points to a close commit subject  3555ms
         ✓ summarizes repeated unknown historical hashes instead of printing one warning per task  2916ms
         ✓ summarizes repeated close-commit misuse in historical DONE tasks  3493ms
         ✓ downgrades legacy backfill historical hashes to info  2648ms
         ✓ downgrades no-op close-commit references to info  4918ms
         ✓ downgrades legacy close: record task doc references to info  4914ms
         ✓ warns when DONE task README archives exist on disk but are missing from the git index  4729ms
         ✓ prints runtime info when doctor runs inside a framework checkout  323ms
    
     Test Files  2 passed (2)
          Tests  37 passed (37)
       Start at  14:31:33
       Duration  43.88s (transform 4.26s, setup 0ms, import 5.51s, tests 42.78s, environment 0ms). Expected: Redmine readiness diagnostics and capability reporting match canonical_state configuration and partial-compatibility cases.
    2. Run  on the touched doctor/backend/test files. Expected: lint passes on the readiness implementation and regressions.
    3. Run @agentplaneorg/core build: Exited with code 0
    agentplane build: Exited with code 0. Expected: both packages still build after the readiness changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T07:38:30.228Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified Redmine readiness diagnostics with bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/backends/task-backend.load.test.ts --hookTimeout 60000 --testTimeout 60000, eslint on doctor workspace/tests, prettier on touched doctor/docs files, and both package builds. doctor now warns when Redmine runs without AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE and stays quiet when canonical_state support is configured.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T07:34:03.218Z, excerpt_hash=sha256:0f35c41015695ab8359b3dfedea287ebdae3b93d6efb6230d79bc293591bce43
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add Redmine readiness and doctor checks for canonical state

Expose Redmine backend readiness for canonical_state-based operation, detect partial compatibility in doctor output, and cover the readiness contract in tests.

## Scope

- In scope: Expose Redmine backend readiness for canonical_state-based operation, detect partial compatibility in doctor output, and cover the readiness contract in tests.
- Out of scope: unrelated refactors not required for "Add Redmine readiness and doctor checks for canonical state".

## Plan

1. Inspect the current Redmine backend, doctor flow, and config/env surfaces around canonical_state readiness.
2. Add backend- and doctor-level checks that report partial compatibility or missing canonical_state support for Redmine.
3. Cover the readiness contract in automated tests and update user-facing backend guidance if the surfaced contract changes.

## Verify Steps

1. Run 
 RUN  v4.0.18 /Users/densmirnov/Github/agentplane

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > passes default checks for a normal initialized workspace without monorepo src folders
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > passes default checks when only CLAUDE.md exists
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > supports workflow kill-switch for emergency rollback
✅ doctor (workflow contract checks disabled via AGENTPLANE_WORKFLOW_ENFORCEMENT.)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > supports workflow kill-switch for emergency rollback
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > does not fail when workflow has warning-only policy mismatch
✅ doctor (OK)

 ✓ packages/agentplane/src/backends/task-backend.load.test.ts (11 tests) 234ms
stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns when active tasks still use legacy README v2 format
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > reports historical README v2 tasks as info when only DONE archive records remain
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns when task README bodies drift from canonical frontmatter sections
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > prefers live task projection over a stale exported snapshot for README migration checks
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > reports but does not fail when DONE task references an unknown historical commit hash
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > skips older archive-only historical commit anomalies by default
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > surfaces older historical archive anomalies when archive-full is enabled
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns but does not fail when DONE task commit points to a close commit subject
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > summarizes repeated unknown historical hashes instead of printing one warning per task
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > summarizes repeated close-commit misuse in historical DONE tasks
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > downgrades legacy backfill historical hashes to info
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > downgrades no-op close-commit references to info
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > downgrades legacy close: record task doc references to info
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns when DONE task README archives exist on disk but are missing from the git index
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns when the active CLI is older than the repository expectation
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > does not emit version-match findings when the active CLI already satisfies the repository expectation
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > prints runtime info when doctor runs inside a framework checkout
✅ doctor (OK)

stdout | packages/agentplane/src/commands/doctor.command.test.ts > doctor.command > warns when the global binary is forced inside a framework checkout
✅ doctor (OK)

 ✓ packages/agentplane/src/commands/doctor.command.test.ts (26 tests) 42547ms
     ✓ fails when DONE task misses implementation commit hash  1860ms
     ✓ warns when active tasks still use legacy README v2 format  2154ms
     ✓ reports historical README v2 tasks as info when only DONE archive records remain  2069ms
     ✓ prefers live task projection over a stale exported snapshot for README migration checks  301ms
     ✓ reports but does not fail when DONE task references an unknown historical commit hash  2181ms
     ✓ skips older archive-only historical commit anomalies by default  2154ms
     ✓ surfaces older historical archive anomalies when archive-full is enabled  3568ms
     ✓ warns but does not fail when DONE task commit points to a close commit subject  3555ms
     ✓ summarizes repeated unknown historical hashes instead of printing one warning per task  2916ms
     ✓ summarizes repeated close-commit misuse in historical DONE tasks  3493ms
     ✓ downgrades legacy backfill historical hashes to info  2648ms
     ✓ downgrades no-op close-commit references to info  4918ms
     ✓ downgrades legacy close: record task doc references to info  4914ms
     ✓ warns when DONE task README archives exist on disk but are missing from the git index  4729ms
     ✓ prints runtime info when doctor runs inside a framework checkout  323ms

 Test Files  2 passed (2)
      Tests  37 passed (37)
   Start at  14:31:33
   Duration  43.88s (transform 4.26s, setup 0ms, import 5.51s, tests 42.78s, environment 0ms). Expected: Redmine readiness diagnostics and capability reporting match canonical_state configuration and partial-compatibility cases.
2. Run  on the touched doctor/backend/test files. Expected: lint passes on the readiness implementation and regressions.
3. Run @agentplaneorg/core build: Exited with code 0
agentplane build: Exited with code 0. Expected: both packages still build after the readiness changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T07:38:30.228Z — VERIFY — ok

By: CODER

Note: Verified Redmine readiness diagnostics with bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/backends/task-backend.load.test.ts --hookTimeout 60000 --testTimeout 60000, eslint on doctor workspace/tests, prettier on touched doctor/docs files, and both package builds. doctor now warns when Redmine runs without AGENTPLANE_REDMINE_CUSTOM_FIELDS_CANONICAL_STATE and stays quiet when canonical_state support is configured.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T07:34:03.218Z, excerpt_hash=sha256:0f35c41015695ab8359b3dfedea287ebdae3b93d6efb6230d79bc293591bce43

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
