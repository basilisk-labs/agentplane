---
id: "202605010645-JGXD12"
title: "AP-10: Split release apply tests"
result_summary: "Merged via PR #672."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605010645-B5ERD0"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/commands/release/apply*.test.ts && bun run test:release:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T10:00:12.642Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after AP-09 closed on main; scope remains splitting release apply tests with shared testkit release fixtures."
verification:
  state: "ok"
  updated_at: "2026-05-01T10:18:52.192Z"
  updated_by: "CODER"
  note: "Verified: release apply tests split into preflight, version mutation, apply flow, and push recovery suites; shared release helpers moved to @agentplane/testkit/release; oversized baseline ratcheted."
commit:
  hash: "697255f2f75cbbfac4988aa04ad51c98979e4e5b"
  message: "Merge pull request #672 from basilisk-labs/task/202605010645-JGXD12/release-apply-test-split"
comments:
  -
    author: "CODER"
    body: "Start: split release apply tests into preflight, version mutation, apply flow, and push recovery suites with shared @agentplane/testkit/release fixtures."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #672 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T10:00:44.868Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split release apply tests into preflight, version mutation, apply flow, and push recovery suites with shared @agentplane/testkit/release fixtures."
  -
    type: "verify"
    at: "2026-05-01T10:18:52.192Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release apply tests split into preflight, version mutation, apply flow, and push recovery suites; shared release helpers moved to @agentplane/testkit/release; oversized baseline ratcheted."
  -
    type: "status"
    at: "2026-05-01T10:23:06.917Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #672 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T10:23:06.923Z"
doc_updated_by: "INTEGRATOR"
description: "Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures."
sections:
  Summary: |-
    AP-10: Split release apply tests
    
    Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.
  Scope: |-
    - In scope: Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.
    - Out of scope: unrelated refactors not required for "AP-10: Split release apply tests".
  Plan: |-
    1. Implement the change for "AP-10: Split release apply tests".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/release/apply*.test.ts && bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T10:18:52.192Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: release apply tests split into preflight, version mutation, apply flow, and push recovery suites; shared release helpers moved to @agentplane/testkit/release; oversized baseline ratcheted.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T10:00:44.868Z, excerpt_hash=sha256:0d548dd436bdb03fc15e0d9ff31fc6a83de79ce496338151f75d231f7af3fb05
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks passed: bunx vitest run packages/agentplane/src/commands/release/apply*.test.ts --testTimeout 240000 --hookTimeout 240000 (4 files, 19 tests); bun run test:release:critical (4 files, 16 tests); node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; node scripts/check-vitest-projects.mjs; bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bun run lint:core; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap; node .agentplane/policy/check-routing.mjs.
      Impact: The release apply oversized monolith is replaced by four sub-1000-line suites and the oversized baseline drops to 13 entries / 14609 total lines.
      Resolution: Ready for AP-10 commit and branch_pr PR flow.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

AP-10: Split release apply tests

Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.

## Scope

- In scope: Split release apply tests by preflight, version mutation, apply flow, and push recovery while reusing testkit release fixtures.
- Out of scope: unrelated refactors not required for "AP-10: Split release apply tests".

## Plan

1. Implement the change for "AP-10: Split release apply tests".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/release/apply*.test.ts && bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T10:18:52.192Z — VERIFY — ok

By: CODER

Note: Verified: release apply tests split into preflight, version mutation, apply flow, and push recovery suites; shared release helpers moved to @agentplane/testkit/release; oversized baseline ratcheted.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T10:00:44.868Z, excerpt_hash=sha256:0d548dd436bdb03fc15e0d9ff31fc6a83de79ce496338151f75d231f7af3fb05

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Checks passed: bunx vitest run packages/agentplane/src/commands/release/apply*.test.ts --testTimeout 240000 --hookTimeout 240000 (4 files, 19 tests); bun run test:release:critical (4 files, 16 tests); node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; node scripts/check-vitest-projects.mjs; bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bun run lint:core; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap; node .agentplane/policy/check-routing.mjs.
  Impact: The release apply oversized monolith is replaced by four sub-1000-line suites and the oversized baseline drops to 13 entries / 14609 total lines.
  Resolution: Ready for AP-10 commit and branch_pr PR flow.
  Promotion: incident-candidate
  Fixability: external
