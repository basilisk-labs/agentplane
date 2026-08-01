---
id: "202608010431-WWQP4B"
title: "Bound evaluator review packets to implementation evidence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "evaluator"
  - "performance"
  - "rf-26"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run guards:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T04:32:56.468Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-01T04:33:32.535Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-01T04:33:32.535Z"
doc_updated_by: "CODER"
description: "Fix the measured evaluator timeout by excluding the active task's generated control artifacts from actual_diff while preserving the task document, blueprint, observed checks, policy, and complete implementation delta as separately digest-verified evidence."
sections:
  Summary: |-
    Bound evaluator review packets to implementation evidence

    Fix the measured evaluator timeout by excluding the active task's generated control artifacts from actual_diff while preserving the task document, blueprint, observed checks, policy, and complete implementation delta as separately digest-verified evidence.
  Scope: |-
    - In scope: change evaluator actual_diff preparation so the active task artifact subtree is excluded from the patch because task README, blueprint, observed checks, and policy are already separate digest-verified evidence; add regression coverage for generated README/blueprint/pr/verification/quality artifacts and preserve implementation plus unrelated-task changes.
    - In scope: record before/after line and byte counts on the YD5J89 review surface.
    - Out of scope: changing evaluator verdict rules, provider selection, frozen digest validation, or excluding another task's intentional artifacts.
  Plan: |-
    1. Reproduce the oversized actual_diff against the YD5J89 branch and record line/byte composition.
    2. Change renderActualDiff to exclude the complete active task artifact subtree while retaining the full implementation delta and any other-task artifacts.
    3. Extend focused fixtures for README, blueprint, PR, verification, quality, source, rename, binary, and other-task changes.
    4. Measure the compacted surface and run focused tests, typecheck, guards, and diff checks.
    5. Record residual risk and route the bounded repair through independent quality review and hosted integration.
  Verify Steps: |-
    1. Run the focused evaluator diff/review suite. Expected: active-task generated artifacts are absent from actual_diff, source changes and other-task changes remain, and frozen digest validation still passes.
    2. Rebuild the YD5J89-style review surface before and after the change. Expected: exact line/byte counts decrease without removing task_document, blueprint, observed_checks, or policy evidence.
    3. Run typecheck and guards. Expected: no schema, trust-boundary, or lifecycle regression.
    4. Run git diff --check and inspect the final task scope. Expected: only evaluator evidence preparation, focused tests, and task artifacts changed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the evaluator diff-filter commit.
    - Re-run focused evaluator review tests and guards.
    - Existing frozen work orders remain valid because their digests and files are immutable.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "56bb919419e198f3ecfd1a074358e6ead81deaa7"
    version: 1
id_source: "generated"
---
## Summary

Bound evaluator review packets to implementation evidence

Fix the measured evaluator timeout by excluding the active task's generated control artifacts from actual_diff while preserving the task document, blueprint, observed checks, policy, and complete implementation delta as separately digest-verified evidence.

## Scope

- In scope: change evaluator actual_diff preparation so the active task artifact subtree is excluded from the patch because task README, blueprint, observed checks, and policy are already separate digest-verified evidence; add regression coverage for generated README/blueprint/pr/verification/quality artifacts and preserve implementation plus unrelated-task changes.
- In scope: record before/after line and byte counts on the YD5J89 review surface.
- Out of scope: changing evaluator verdict rules, provider selection, frozen digest validation, or excluding another task's intentional artifacts.

## Plan

1. Reproduce the oversized actual_diff against the YD5J89 branch and record line/byte composition.
2. Change renderActualDiff to exclude the complete active task artifact subtree while retaining the full implementation delta and any other-task artifacts.
3. Extend focused fixtures for README, blueprint, PR, verification, quality, source, rename, binary, and other-task changes.
4. Measure the compacted surface and run focused tests, typecheck, guards, and diff checks.
5. Record residual risk and route the bounded repair through independent quality review and hosted integration.

## Verify Steps

1. Run the focused evaluator diff/review suite. Expected: active-task generated artifacts are absent from actual_diff, source changes and other-task changes remain, and frozen digest validation still passes.
2. Rebuild the YD5J89-style review surface before and after the change. Expected: exact line/byte counts decrease without removing task_document, blueprint, observed_checks, or policy evidence.
3. Run typecheck and guards. Expected: no schema, trust-boundary, or lifecycle regression.
4. Run git diff --check and inspect the final task scope. Expected: only evaluator evidence preparation, focused tests, and task artifacts changed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the evaluator diff-filter commit.
- Re-run focused evaluator review tests and guards.
- Existing frozen work orders remain valid because their digests and files are immutable.

## Findings
