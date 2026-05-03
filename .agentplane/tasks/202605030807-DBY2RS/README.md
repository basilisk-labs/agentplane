---
id: "202605030807-DBY2RS"
title: "Fix standalone release doctor smoke marker"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T08:07:59.368Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T08:09:13.786Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts --pool=forks --maxWorkers 1 --testTimeout 120000 --hookTimeout 120000; Result: pass; Evidence: 1 file, 5 tests passed. Command: node scripts/check-release-parity.mjs && git diff --check; Result: pass; Evidence: release parity OK and no whitespace errors."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing the standalone release smoke doctor marker that blocked v0.4.2 publication before npm or tag publication."
events:
  -
    type: "status"
    at: "2026-05-03T08:08:07.009Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing the standalone release smoke doctor marker that blocked v0.4.2 publication before npm or tag publication."
  -
    type: "verify"
    at: "2026-05-03T08:09:13.786Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts --pool=forks --maxWorkers 1 --testTimeout 120000 --hookTimeout 120000; Result: pass; Evidence: 1 file, 5 tests passed. Command: node scripts/check-release-parity.mjs && git diff --check; Result: pass; Evidence: release parity OK and no whitespace errors."
doc_version: 3
doc_updated_at: "2026-05-03T08:09:13.789Z"
doc_updated_by: "CODER"
description: "Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete."
sections:
  Summary: |-
    Fix standalone release doctor smoke marker
    
    Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete.
  Scope: |-
    - In scope: Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete.
    - Out of scope: unrelated refactors not required for "Fix standalone release doctor smoke marker".
  Plan: "Plan: update scripts/smoke-standalone-cli-artifact.mjs to accept current doctor OK output while preserving legacy marker compatibility; add/adjust targeted release smoke tests; verify with standalone smoke/release tests; merge via branch_pr; rerun v0.4.2 publish."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T08:09:13.786Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts --pool=forks --maxWorkers 1 --testTimeout 120000 --hookTimeout 120000; Result: pass; Evidence: 1 file, 5 tests passed. Command: node scripts/check-release-parity.mjs && git diff --check; Result: pass; Evidence: release parity OK and no whitespace errors.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T08:08:07.009Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Publish run 25273723107 failed before npm/tag at standalone linux-x64 doctor smoke because the script expected 'doctor OK' but current CLI emits 'doctor (OK)'.
      Impact: v0.4.2 publish can be retried without changing package version or release payload semantics.
      Resolution: Smoke now accepts both legacy and current doctor OK markers and includes doctor output on failure.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Fix standalone release doctor smoke marker

Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete.

## Scope

- In scope: Update standalone release artifact smoke testing to accept the current doctor OK output and surface doctor output on failures so v0.4.2 publish can complete.
- Out of scope: unrelated refactors not required for "Fix standalone release doctor smoke marker".

## Plan

Plan: update scripts/smoke-standalone-cli-artifact.mjs to accept current doctor OK output while preserving legacy marker compatibility; add/adjust targeted release smoke tests; verify with standalone smoke/release tests; merge via branch_pr; rerun v0.4.2 publish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T08:09:13.786Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/release/generate-standalone-cli-assets-script.test.ts --pool=forks --maxWorkers 1 --testTimeout 120000 --hookTimeout 120000; Result: pass; Evidence: 1 file, 5 tests passed. Command: node scripts/check-release-parity.mjs && git diff --check; Result: pass; Evidence: release parity OK and no whitespace errors.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T08:08:07.009Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Publish run 25273723107 failed before npm/tag at standalone linux-x64 doctor smoke because the script expected 'doctor OK' but current CLI emits 'doctor (OK)'.
  Impact: v0.4.2 publish can be retried without changing package version or release payload semantics.
  Resolution: Smoke now accepts both legacy and current doctor OK markers and includes doctor output on failure.
  Promotion: incident-candidate
  Fixability: external
