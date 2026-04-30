---
id: "202604300725-T0M8X3"
title: "Restore release-critical smoke suite"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604300725-3CY7TE"
tags:
  - "cli"
  - "code"
  - "release"
  - "testing"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run test:release:critical"
  - "bun run typecheck"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T07:27:04.983Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-30T08:04:05.151Z"
  updated_by: "CODER"
  note: "Release-critical smoke suite is restored on current main; no code diff was required beyond prior fixes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce release-critical smoke failures, isolate root causes, and restore the suite."
events:
  -
    type: "status"
    at: "2026-04-30T08:02:17.508Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce release-critical smoke failures, isolate root causes, and restore the suite."
  -
    type: "verify"
    at: "2026-04-30T08:04:05.151Z"
    author: "CODER"
    state: "ok"
    note: "Release-critical smoke suite is restored on current main; no code diff was required beyond prior fixes."
doc_version: 3
doc_updated_at: "2026-04-30T08:04:05.164Z"
doc_updated_by: "CODER"
description: "Investigate and fix the current release-critical CLI smoke and upgrade smoke failures so test:release:critical passes on the release candidate checkout. Scope includes only the failing smoke paths and minimal fixture/runtime changes required to make the release gate reliable."
sections:
  Summary: |-
    Restore release-critical smoke suite
    
    Investigate and fix the current release-critical CLI smoke and upgrade smoke failures so test:release:critical passes on the release candidate checkout. Scope includes only the failing smoke paths and minimal fixture/runtime changes required to make the release gate reliable.
  Scope: |-
    - In scope: Investigate and fix the current release-critical CLI smoke and upgrade smoke failures so test:release:critical passes on the release candidate checkout. Scope includes only the failing smoke paths and minimal fixture/runtime changes required to make the release gate reliable.
    - Out of scope: unrelated refactors not required for "Restore release-critical smoke suite".
  Plan: |-
    1. Reproduce test:release:critical failures on the task branch and capture the exact CLI stderr/stdout for failing smoke calls.
    2. Identify whether each failure is a product regression, fixture drift, repo-local runtime issue, or test harness assumption.
    3. Apply the smallest code or test-fixture fix that makes the release-critical smoke suite reflect real supported behavior.
    4. Verify test:release:critical, typecheck, diff check, framework bootstrap, and doctor.
    5. Publish through branch_pr and close after hosted merge.
  Verify Steps: |-
    1. Run `bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-30T08:04:05.151Z — VERIFY — ok
    
    By: CODER
    
    Note: Release-critical smoke suite is restored on current main; no code diff was required beyond prior fixes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T08:02:17.508Z, excerpt_hash=sha256:fbae12386c4fe95329006632d1e2615e939112aeb207d529e147f8d1fab9dc93
    
    Details:
    
    Command: bun run test:release:critical; Result: pass; Evidence: 4 test files passed, 16 tests passed; Scope: release-critical lifecycle, cli-smoke, release recovery, and release-smoke.
    Command: bun run typecheck; Result: pass; Evidence: tsc -b completed; Scope: TypeScript project references.
    Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: final diff.
    Command: bun run framework:dev:bootstrap; Result: pass; Evidence: Framework dev runtime is ready; Scope: repo-local runtime build.
    Command: agentplane doctor; Result: pass; Evidence: doctor OK; Scope: workflow runtime health.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Restore release-critical smoke suite

Investigate and fix the current release-critical CLI smoke and upgrade smoke failures so test:release:critical passes on the release candidate checkout. Scope includes only the failing smoke paths and minimal fixture/runtime changes required to make the release gate reliable.

## Scope

- In scope: Investigate and fix the current release-critical CLI smoke and upgrade smoke failures so test:release:critical passes on the release candidate checkout. Scope includes only the failing smoke paths and minimal fixture/runtime changes required to make the release gate reliable.
- Out of scope: unrelated refactors not required for "Restore release-critical smoke suite".

## Plan

1. Reproduce test:release:critical failures on the task branch and capture the exact CLI stderr/stdout for failing smoke calls.
2. Identify whether each failure is a product regression, fixture drift, repo-local runtime issue, or test harness assumption.
3. Apply the smallest code or test-fixture fix that makes the release-critical smoke suite reflect real supported behavior.
4. Verify test:release:critical, typecheck, diff check, framework bootstrap, and doctor.
5. Publish through branch_pr and close after hosted merge.

## Verify Steps

1. Run `bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-30T08:04:05.151Z — VERIFY — ok

By: CODER

Note: Release-critical smoke suite is restored on current main; no code diff was required beyond prior fixes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T08:02:17.508Z, excerpt_hash=sha256:fbae12386c4fe95329006632d1e2615e939112aeb207d529e147f8d1fab9dc93

Details:

Command: bun run test:release:critical; Result: pass; Evidence: 4 test files passed, 16 tests passed; Scope: release-critical lifecycle, cli-smoke, release recovery, and release-smoke.
Command: bun run typecheck; Result: pass; Evidence: tsc -b completed; Scope: TypeScript project references.
Command: git diff --check; Result: pass; Evidence: no whitespace errors; Scope: final diff.
Command: bun run framework:dev:bootstrap; Result: pass; Evidence: Framework dev runtime is ready; Scope: repo-local runtime build.
Command: agentplane doctor; Result: pass; Evidence: doctor OK; Scope: workflow runtime health.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
