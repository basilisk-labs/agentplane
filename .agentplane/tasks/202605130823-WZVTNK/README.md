---
id: "202605130823-WZVTNK"
title: "Stabilize fast suite regressions"
result_summary: "Merged via PR #3616."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T08:24:22.117Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T09:00:27.976Z"
  updated_by: "CODER"
  note: "Targeted checks, full test:fast, typecheck, lint, logging, doctor, and routing validation passed after fixes."
  attempts: 0
commit:
  hash: "2403cb53698f699ffc587051d9743ca109a3b4b5"
  message: "Merge pull request #3616 from basilisk-labs/task/202605130823-WZVTNK/fast-suite-regressions"
comments:
  -
    author: "CODER"
    body: "Start: Stabilizing the confirmed fast-suite failures in wait-remote checks, process supervision timeout metadata, and release asset generation tests within the approved task scope."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3616 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-13T08:25:51.639Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Stabilizing the confirmed fast-suite failures in wait-remote checks, process supervision timeout metadata, and release asset generation tests within the approved task scope."
  -
    type: "verify"
    at: "2026-05-13T09:00:27.976Z"
    author: "CODER"
    state: "ok"
    note: "Targeted checks, full test:fast, typecheck, lint, logging, doctor, and routing validation passed after fixes."
  -
    type: "status"
    at: "2026-05-13T09:30:27.228Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3616 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T09:30:27.228Z"
doc_updated_by: "INTEGRATOR"
description: "Fix current fast-suite failures in wait-remote checks, runner process supervision timeout metadata, and release asset generation tests; classify placeholder/stub findings so production TODO debt is not hidden by allowed sentinels."
sections:
  Summary: |-
    Stabilize fast suite regressions
    
    Fix current fast-suite failures in wait-remote checks, runner process supervision timeout metadata, and release asset generation tests; classify placeholder/stub findings so production TODO debt is not hidden by allowed sentinels.
  Scope: |-
    - In scope: Fix current fast-suite failures in wait-remote checks, runner process supervision timeout metadata, and release asset generation tests; classify placeholder/stub findings so production TODO debt is not hidden by allowed sentinels.
    - Out of scope: unrelated refactors not required for "Stabilize fast suite regressions".
  Plan: "1. Reproduce the four current fast-suite failures with targeted commands and inspect the relevant implementation paths. 2. Fix wait-remote-pr-checks polling determinism so the success scenario exits without a 30s timeout. 3. Fix runner process supervision timeout metadata so kill_sent_at reflects actual SIGKILL delivery, or align tests with an explicit, documented contract if implementation already records a different event. 4. Split heavy release asset checks so fast tests validate contract/layout with synthetic fixtures while full archive/package checks stay in release gates. 5. Add a narrow placeholder/stub audit or allowlist so production-risk markers are visible without failing on intentional test helpers, issue templates, or sentinel placeholders. 6. Run targeted tests, then lint/typecheck/logging and the broad fast suite; record verification evidence and residual risks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    - Reproduced base fast-suite failures before changes: wait-remote checks timeout, process supervision false kill_sent_at, and release standalone/distribution timeouts.
    - Targeted checks passed: generate-standalone-cli-assets-script.test.ts, generate-release-distribution-script.test.ts, process-supervision.test.ts, wait-remote-pr-checks-script.test.ts, release-smoke.test.ts.
    - Gates passed after final changes: bun run typecheck; bun run lint:core; bun run logging:check; bun run test:fast (293 files, 1720 passed, 2 skipped); ap doctor; node .agentplane/policy/check-routing.mjs.
    - Local test side effects checked: no v0.2.7 tag remains; no unexpected tracked/untracked artifacts outside this task scope.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T09:00:27.976Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted checks, full test:fast, typecheck, lint, logging, doctor, and routing validation passed after fixes.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T08:59:39.874Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130823-WZVTNK-fast-suite-regressions/.agentplane/tasks/202605130823-WZVTNK/blueprint/resolved-snapshot.json
    - old_digest: b8fa32c4f0ec6e2f09ed95b64ed0585936d44ad14c5c78e28e05e49de95773b2
    - current_digest: b8fa32c4f0ec6e2f09ed95b64ed0585936d44ad14c5c78e28e05e49de95773b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130823-WZVTNK
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Fixed standalone synthetic/check mode so it does not run npm pack/install before materializing synthetic package fixtures; added tests that fail if npm is invoked in synthetic check paths.
    - Fixed runner timeout metadata so force-kill state is recorded only when a live process actually receives SIGKILL after terminate grace.
    - Placeholder/stub audit: current broad marker hits are intentional schema statuses, tests/testkit stubs, release/history docs, env examples, lockfile package names, and documented init backend stubs/local-stub adapter labels. No production TODO placeholder requiring code removal was found in this task scope.
    - Residual note: the first post-change broad run exposed a transient release-smoke code-5 failure, but release-smoke passed isolated, passed with adjacent release tests, and the next two full fast-suite runs passed.
id_source: "generated"
---
## Summary

Stabilize fast suite regressions

Fix current fast-suite failures in wait-remote checks, runner process supervision timeout metadata, and release asset generation tests; classify placeholder/stub findings so production TODO debt is not hidden by allowed sentinels.

## Scope

- In scope: Fix current fast-suite failures in wait-remote checks, runner process supervision timeout metadata, and release asset generation tests; classify placeholder/stub findings so production TODO debt is not hidden by allowed sentinels.
- Out of scope: unrelated refactors not required for "Stabilize fast suite regressions".

## Plan

1. Reproduce the four current fast-suite failures with targeted commands and inspect the relevant implementation paths. 2. Fix wait-remote-pr-checks polling determinism so the success scenario exits without a 30s timeout. 3. Fix runner process supervision timeout metadata so kill_sent_at reflects actual SIGKILL delivery, or align tests with an explicit, documented contract if implementation already records a different event. 4. Split heavy release asset checks so fast tests validate contract/layout with synthetic fixtures while full archive/package checks stay in release gates. 5. Add a narrow placeholder/stub audit or allowlist so production-risk markers are visible without failing on intentional test helpers, issue templates, or sentinel placeholders. 6. Run targeted tests, then lint/typecheck/logging and the broad fast suite; record verification evidence and residual risks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

- Reproduced base fast-suite failures before changes: wait-remote checks timeout, process supervision false kill_sent_at, and release standalone/distribution timeouts.
- Targeted checks passed: generate-standalone-cli-assets-script.test.ts, generate-release-distribution-script.test.ts, process-supervision.test.ts, wait-remote-pr-checks-script.test.ts, release-smoke.test.ts.
- Gates passed after final changes: bun run typecheck; bun run lint:core; bun run logging:check; bun run test:fast (293 files, 1720 passed, 2 skipped); ap doctor; node .agentplane/policy/check-routing.mjs.
- Local test side effects checked: no v0.2.7 tag remains; no unexpected tracked/untracked artifacts outside this task scope.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T09:00:27.976Z — VERIFY — ok

By: CODER

Note: Targeted checks, full test:fast, typecheck, lint, logging, doctor, and routing validation passed after fixes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T08:59:39.874Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130823-WZVTNK-fast-suite-regressions/.agentplane/tasks/202605130823-WZVTNK/blueprint/resolved-snapshot.json
- old_digest: b8fa32c4f0ec6e2f09ed95b64ed0585936d44ad14c5c78e28e05e49de95773b2
- current_digest: b8fa32c4f0ec6e2f09ed95b64ed0585936d44ad14c5c78e28e05e49de95773b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130823-WZVTNK

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Fixed standalone synthetic/check mode so it does not run npm pack/install before materializing synthetic package fixtures; added tests that fail if npm is invoked in synthetic check paths.
- Fixed runner timeout metadata so force-kill state is recorded only when a live process actually receives SIGKILL after terminate grace.
- Placeholder/stub audit: current broad marker hits are intentional schema statuses, tests/testkit stubs, release/history docs, env examples, lockfile package names, and documented init backend stubs/local-stub adapter labels. No production TODO placeholder requiring code removal was found in this task scope.
- Residual note: the first post-change broad run exposed a transient release-smoke code-5 failure, but release-smoke passed isolated, passed with adjacent release tests, and the next two full fast-suite runs passed.
