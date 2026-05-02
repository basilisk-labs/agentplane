---
id: "202605022118-M0GKG8"
title: "Fix release lint drift before patch release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lint"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T21:18:15.521Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T21:25:58.359Z"
  updated_by: "CODER"
  note: "Verified: current release lint drift is fixed without behavior changes. Evidence: bun run lint:core passed after String.raw and dependency-spread cleanup; bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts passed 2/2; combined affected suite passed 14/14; prettier check passed; git diff --check passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix the release-distribution lint drift found during patch-release readiness checks and include it in the current release-readiness PR."
events:
  -
    type: "status"
    at: "2026-05-02T21:18:59.916Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix the release-distribution lint drift found during patch-release readiness checks and include it in the current release-readiness PR."
  -
    type: "verify"
    at: "2026-05-02T21:25:58.359Z"
    author: "CODER"
    state: "ok"
    note: "Verified: current release lint drift is fixed without behavior changes. Evidence: bun run lint:core passed after String.raw and dependency-spread cleanup; bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts passed 2/2; combined affected suite passed 14/14; prettier check passed; git diff --check passed."
doc_version: 3
doc_updated_at: "2026-05-02T21:25:58.368Z"
doc_updated_by: "CODER"
description: "Repair current release-distribution and standalone asset lint errors so release-readiness checks can run cleanly before the next patch release."
sections:
  Summary: |-
    Fix release lint drift before patch release

    Repair current release-distribution and standalone asset lint errors so release-readiness checks can run cleanly before the next patch release.
  Scope: |-
    - In scope: Repair current release-distribution and standalone asset lint errors so release-readiness checks can run cleanly before the next patch release.
    - Out of scope: unrelated refactors not required for "Fix release lint drift before patch release".
  Plan: "1. Fix the current release lint errors reported by bun run lint:core without changing release behavior. 2. Use String.raw for PowerShell checksum regex snippets. 3. Remove useless empty-object fallbacks in standalone package dependency spreads. 4. Rerun lint, targeted release distribution tests if needed, and diff hygiene. 5. Include this task as a related release-readiness batch in the F0DGQ6 PR."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T21:25:58.359Z — VERIFY — ok

    By: CODER

    Note: Verified: current release lint drift is fixed without behavior changes. Evidence: bun run lint:core passed after String.raw and dependency-spread cleanup; bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts passed 2/2; combined affected suite passed 14/14; prettier check passed; git diff --check passed.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T21:18:59.916Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix release lint drift before patch release

Repair current release-distribution and standalone asset lint errors so release-readiness checks can run cleanly before the next patch release.

## Scope

- In scope: Repair current release-distribution and standalone asset lint errors so release-readiness checks can run cleanly before the next patch release.
- Out of scope: unrelated refactors not required for "Fix release lint drift before patch release".

## Plan

1. Fix the current release lint errors reported by bun run lint:core without changing release behavior. 2. Use String.raw for PowerShell checksum regex snippets. 3. Remove useless empty-object fallbacks in standalone package dependency spreads. 4. Rerun lint, targeted release distribution tests if needed, and diff hygiene. 5. Include this task as a related release-readiness batch in the F0DGQ6 PR.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T21:25:58.359Z — VERIFY — ok

By: CODER

Note: Verified: current release lint drift is fixed without behavior changes. Evidence: bun run lint:core passed after String.raw and dependency-spread cleanup; bun test packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts passed 2/2; combined affected suite passed 14/14; prettier check passed; git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T21:18:59.916Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
