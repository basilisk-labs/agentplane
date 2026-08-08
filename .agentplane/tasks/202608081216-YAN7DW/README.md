---
id: "202608081216-YAN7DW"
title: "Parallelize release qualification without weakening gates"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "quality"
  - "release-performance"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "bun run ci:contract"
  - "bun run format:check"
  - "bunx vitest run scripts/bench/capture-agent-efficiency-candidate.test.mjs"
  - "node --test scripts/qualification/release-qualification.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-08T12:17:11.125Z"
  updated_by: "ORCHESTRATOR"
  note: "User explicitly approved pausing the active v0.7.5 verification and implementing no-quality-loss release acceleration before restarting the release."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement bounded release-qualification concurrency with isolated provider fixtures and unchanged quality gates."
events:
  -
    type: "status"
    at: "2026-08-08T12:17:22.983Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement bounded release-qualification concurrency with isolated provider fixtures and unchanged quality gates."
doc_version: 3
doc_updated_at: "2026-08-08T12:17:22.983Z"
doc_updated_by: "CODER"
description: "Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds."
sections:
  Summary: |-
    Parallelize release qualification without weakening gates

    Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds.
  Scope: |-
    - In scope: Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds.
    - Out of scope: unrelated refactors not required for "Parallelize release qualification without weakening gates".
  Plan: |-
    1. Establish a timing and behavior baseline for the qualification runner and provider replay capture.
    2. Add bounded concurrency for independent work while preserving manifest dependency ordering, per-run repository isolation, deterministic output ordering, and fail-closed behavior.
    3. Add focused regression tests for concurrency limits, dependency barriers, failure propagation, and evidence determinism.
    4. Run targeted tests, format, and ci:contract; compare serial and concurrent pilot behavior.
    5. Integrate the verified change into the v0.7.5 candidate, invalidate the paused old-SHA verification, and restart the full release gate.

    Scope limit: qualification runner, provider replay capture, their focused tests, and required generated documentation only. No quality threshold, scenario count, provider episode count, retry policy, publish authority, or hosted gate may be weakened.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `node --test scripts/qualification/release-qualification.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run scripts/bench/capture-agent-efficiency-candidate.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run ci:contract`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "c603521981291f6487f926240137c3cba7cd8fc6"
    version: 1
id_source: "generated"
---
## Summary

Parallelize release qualification without weakening gates

Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds.

## Scope

- In scope: Reduce patch-release elapsed time by adding bounded concurrency to independent qualification scenarios and provider replay runs while preserving dependency ordering, deterministic evidence, isolated fixtures, exact-SHA attribution, and all existing pass thresholds.
- Out of scope: unrelated refactors not required for "Parallelize release qualification without weakening gates".

## Plan

1. Establish a timing and behavior baseline for the qualification runner and provider replay capture.
2. Add bounded concurrency for independent work while preserving manifest dependency ordering, per-run repository isolation, deterministic output ordering, and fail-closed behavior.
3. Add focused regression tests for concurrency limits, dependency barriers, failure propagation, and evidence determinism.
4. Run targeted tests, format, and ci:contract; compare serial and concurrent pilot behavior.
5. Integrate the verified change into the v0.7.5 candidate, invalidate the paused old-SHA verification, and restart the full release gate.

Scope limit: qualification runner, provider replay capture, their focused tests, and required generated documentation only. No quality threshold, scenario count, provider episode count, retry policy, publish authority, or hosted gate may be weakened.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `node --test scripts/qualification/release-qualification.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run scripts/bench/capture-agent-efficiency-candidate.test.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run ci:contract`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
