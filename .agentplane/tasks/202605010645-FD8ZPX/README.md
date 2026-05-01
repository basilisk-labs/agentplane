---
id: "202605010645-FD8ZPX"
title: "AP-11: Split guard commit wrapper tests"
result_summary: "Merged via PR #674."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605010645-JGXD12"
tags:
  - "code"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.guard*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T10:32:47.020Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after AP-10 closed on main; scope remains splitting guard commit-wrapper CLI tests by env, policy, close, and refresh behavior with shared testkit fixtures."
verification:
  state: "ok"
  updated_at: "2026-05-01T10:46:52.687Z"
  updated_by: "CODER"
  note: "Verified: guard commit-wrapper tests split into env, policy, refresh, and close suites; routing, inventory, and significant coverage use the split files; oversized baseline ratcheted."
commit:
  hash: "e6ef929fd3eff84cda3921fc99867cec708f5f7a"
  message: "Merge pull request #674 from basilisk-labs/task/202605010645-FD8ZPX/guard-commit-wrapper-test-split"
comments:
  -
    author: "CODER"
    body: "Start: split guard commit-wrapper CLI tests into env, policy, close, and refresh suites with shared repo fixtures in @agentplane/testkit/guard."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #674 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-01T10:33:13.776Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split guard commit-wrapper CLI tests into env, policy, close, and refresh suites with shared repo fixtures in @agentplane/testkit/guard."
  -
    type: "verify"
    at: "2026-05-01T10:46:52.687Z"
    author: "CODER"
    state: "ok"
    note: "Verified: guard commit-wrapper tests split into env, policy, refresh, and close suites; routing, inventory, and significant coverage use the split files; oversized baseline ratcheted."
  -
    type: "status"
    at: "2026-05-01T10:51:10.127Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #674 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-01T10:51:10.132Z"
doc_updated_by: "INTEGRATOR"
description: "Split guard commit-wrapper CLI scenarios by env, policy, close, and refresh behavior with shared testkit fixtures."
sections:
  Summary: |-
    AP-11: Split guard commit wrapper tests
    
    Split guard commit-wrapper CLI scenarios by env, policy, close, and refresh behavior with shared testkit fixtures.
  Scope: |-
    - In scope: Split guard commit-wrapper CLI scenarios by env, policy, close, and refresh behavior with shared testkit fixtures.
    - Out of scope: unrelated refactors not required for "AP-11: Split guard commit wrapper tests".
  Plan: |-
    1. Implement the change for "AP-11: Split guard commit wrapper tests".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.guard*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T10:46:52.687Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: guard commit-wrapper tests split into env, policy, refresh, and close suites; routing, inventory, and significant coverage use the split files; oversized baseline ratcheted.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T10:33:13.776Z, excerpt_hash=sha256:948273c0333ead5c8c4dbfa3955bd21f2d8c055409b33030e517dcb4a27a47dd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.guard*.test.ts --testTimeout 180000 --hookTimeout 180000 (5 files, 52 tests); bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/test-inventory.test.ts packages/agentplane/src/cli/test-routing-check.test.ts --testTimeout 60000 --hookTimeout 60000 (3 files, 47 tests); bun run typecheck; bun run lint:core; bun run coverage:significant-suite (19 files, 166 tests plus significant coverage contract); node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; node scripts/check-vitest-projects.mjs; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap; node .agentplane/policy/check-routing.mjs.
      Impact: The guard commit-wrapper oversized monolith is replaced by four sub-1000-line suites and the oversized baseline drops to 12 entries / 13391 total lines.
      Resolution: Ready for AP-11 commit and branch_pr PR flow.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

AP-11: Split guard commit wrapper tests

Split guard commit-wrapper CLI scenarios by env, policy, close, and refresh behavior with shared testkit fixtures.

## Scope

- In scope: Split guard commit-wrapper CLI scenarios by env, policy, close, and refresh behavior with shared testkit fixtures.
- Out of scope: unrelated refactors not required for "AP-11: Split guard commit wrapper tests".

## Plan

1. Implement the change for "AP-11: Split guard commit wrapper tests".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.guard*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T10:46:52.687Z — VERIFY — ok

By: CODER

Note: Verified: guard commit-wrapper tests split into env, policy, refresh, and close suites; routing, inventory, and significant coverage use the split files; oversized baseline ratcheted.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T10:33:13.776Z, excerpt_hash=sha256:948273c0333ead5c8c4dbfa3955bd21f2d8c055409b33030e517dcb4a27a47dd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Checks passed: bunx vitest run packages/agentplane/src/cli/run-cli.core.guard*.test.ts --testTimeout 180000 --hookTimeout 180000 (5 files, 52 tests); bunx vitest run packages/agentplane/src/cli/local-ci-selection.test.ts packages/agentplane/src/cli/test-inventory.test.ts packages/agentplane/src/cli/test-routing-check.test.ts --testTimeout 60000 --hookTimeout 60000 (3 files, 47 tests); bun run typecheck; bun run lint:core; bun run coverage:significant-suite (19 files, 166 tests plus significant coverage contract); node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; node scripts/check-vitest-projects.mjs; bunx prettier --check touched files; git diff --check; bun run framework:dev:bootstrap; node .agentplane/policy/check-routing.mjs.
  Impact: The guard commit-wrapper oversized monolith is replaced by four sub-1000-line suites and the oversized baseline drops to 12 entries / 13391 total lines.
  Resolution: Ready for AP-11 commit and branch_pr PR flow.
  Promotion: incident-candidate
  Fixability: external
