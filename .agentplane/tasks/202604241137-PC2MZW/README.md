---
id: "202604241137-PC2MZW"
title: "v0.3 hygiene H5: add release-critical full lifecycle integration test"
result_summary: "Added packages/agentplane/src/cli/release-critical-lifecycle.test.ts and registered it in scripts/run-vitest-suite.mjs release-critical."
status: "DONE"
priority: "low"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604241137-V5SYC4"
tags:
  - "lifecycle"
  - "testing"
  - "v0.3"
verify:
  - "bun run test:release-critical"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T14:50:44.899Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T14:54:44.642Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/release-critical-lifecycle.test.ts --pool=forks --testTimeout 120000 --hookTimeout 120000. Result: pass. Evidence: 1 test passed; direct lifecycle reached init, task new, plan set/approve, task start-ready, task verify-show, verify, finish, and clean git status in the temp repo. Scope: new lifecycle indicator. Command: bun run test:release:critical. Result: pass. Evidence: 4 files passed, 16 tests passed. Scope: release-critical aggregate. Additional checks: bun run lint:core -- packages/agentplane/src/cli/release-critical-lifecycle.test.ts scripts/run-vitest-suite.mjs passed; Prettier check for changed files and git diff --check passed."
commit:
  hash: "4dc48d9a15af8a64cc22ae0e24103d4ac02223a5"
  message: "✅ PC2MZW task: add release critical lifecycle test"
comments:
  -
    author: "CODER"
    body: "Start: Add the release-critical full lifecycle integration test as the living v0.3 freeze indicator, using the existing runCli integration harness and local git-only side effects."
  -
    author: "CODER"
    body: "Verified: release-critical now includes a dedicated direct lifecycle integration test and the aggregate release-critical suite passes."
events:
  -
    type: "status"
    at: "2026-04-24T14:50:55.830Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add the release-critical full lifecycle integration test as the living v0.3 freeze indicator, using the existing runCli integration harness and local git-only side effects."
  -
    type: "verify"
    at: "2026-04-24T14:54:44.642Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/release-critical-lifecycle.test.ts --pool=forks --testTimeout 120000 --hookTimeout 120000. Result: pass. Evidence: 1 test passed; direct lifecycle reached init, task new, plan set/approve, task start-ready, task verify-show, verify, finish, and clean git status in the temp repo. Scope: new lifecycle indicator. Command: bun run test:release:critical. Result: pass. Evidence: 4 files passed, 16 tests passed. Scope: release-critical aggregate. Additional checks: bun run lint:core -- packages/agentplane/src/cli/release-critical-lifecycle.test.ts scripts/run-vitest-suite.mjs passed; Prettier check for changed files and git diff --check passed."
  -
    type: "status"
    at: "2026-04-24T14:55:40.731Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release-critical now includes a dedicated direct lifecycle integration test and the aggregate release-critical suite passes."
doc_version: 3
doc_updated_at: "2026-04-24T14:55:40.732Z"
doc_updated_by: "CODER"
description: "Add one release-critical integration test covering init, task new, plan, start, verify, and finish as the living v0.3 freeze indicator."
sections:
  Summary: |-
    v0.3 hygiene H5: add release-critical full lifecycle integration test
    
    Add one release-critical integration test covering init, task new, plan, start, verify, and finish as the living v0.3 freeze indicator.
  Scope: |-
    - In scope: Add one release-critical integration test covering init, task new, plan, start, verify, and finish as the living v0.3 freeze indicator.
    - Out of scope: unrelated refactors not required for "v0.3 hygiene H5: add release-critical full lifecycle integration test".
  Plan: |-
    1. Add a dedicated release-critical integration test that creates a fresh git repo, runs agentplane init in non-interactive direct mode, and exercises the exact direct lifecycle commands: task new, plan set, plan approve, task start-ready, task verify-show, verify, and finish.
    2. Keep the scenario bounded to local filesystem/git side effects with AGENTPLANE_HOME isolated by the existing test harness; do not add network or hosted provider dependencies.
    3. Register the new test file in scripts/run-vitest-suite.mjs under release-critical.
    4. Verify with the focused new test and bun run test:release:critical, then record task evidence and finish.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 hygiene H5: add release-critical full lifecycle integration test". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T14:54:44.642Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/release-critical-lifecycle.test.ts --pool=forks --testTimeout 120000 --hookTimeout 120000. Result: pass. Evidence: 1 test passed; direct lifecycle reached init, task new, plan set/approve, task start-ready, task verify-show, verify, finish, and clean git status in the temp repo. Scope: new lifecycle indicator. Command: bun run test:release:critical. Result: pass. Evidence: 4 files passed, 16 tests passed. Scope: release-critical aggregate. Additional checks: bun run lint:core -- packages/agentplane/src/cli/release-critical-lifecycle.test.ts scripts/run-vitest-suite.mjs passed; Prettier check for changed files and git diff --check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T14:50:55.845Z, excerpt_hash=sha256:223c2f795f673674e87ff6fa377065f04525b220104e1f8cad4cf517056207a8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 hygiene H5: add release-critical full lifecycle integration test

Add one release-critical integration test covering init, task new, plan, start, verify, and finish as the living v0.3 freeze indicator.

## Scope

- In scope: Add one release-critical integration test covering init, task new, plan, start, verify, and finish as the living v0.3 freeze indicator.
- Out of scope: unrelated refactors not required for "v0.3 hygiene H5: add release-critical full lifecycle integration test".

## Plan

1. Add a dedicated release-critical integration test that creates a fresh git repo, runs agentplane init in non-interactive direct mode, and exercises the exact direct lifecycle commands: task new, plan set, plan approve, task start-ready, task verify-show, verify, and finish.
2. Keep the scenario bounded to local filesystem/git side effects with AGENTPLANE_HOME isolated by the existing test harness; do not add network or hosted provider dependencies.
3. Register the new test file in scripts/run-vitest-suite.mjs under release-critical.
4. Verify with the focused new test and bun run test:release:critical, then record task evidence and finish.

## Verify Steps

1. Review the requested outcome for "v0.3 hygiene H5: add release-critical full lifecycle integration test". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T14:54:44.642Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/release-critical-lifecycle.test.ts --pool=forks --testTimeout 120000 --hookTimeout 120000. Result: pass. Evidence: 1 test passed; direct lifecycle reached init, task new, plan set/approve, task start-ready, task verify-show, verify, finish, and clean git status in the temp repo. Scope: new lifecycle indicator. Command: bun run test:release:critical. Result: pass. Evidence: 4 files passed, 16 tests passed. Scope: release-critical aggregate. Additional checks: bun run lint:core -- packages/agentplane/src/cli/release-critical-lifecycle.test.ts scripts/run-vitest-suite.mjs passed; Prettier check for changed files and git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T14:50:55.845Z, excerpt_hash=sha256:223c2f795f673674e87ff6fa377065f04525b220104e1f8cad4cf517056207a8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
