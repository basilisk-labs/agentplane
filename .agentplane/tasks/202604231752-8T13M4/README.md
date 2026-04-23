---
id: "202604231752-8T13M4"
title: "Harden 0.3 foundation guardrails around task, lifecycle, and workflow contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604231752-A45A6M"
tags:
  - "code"
  - "foundation"
  - "release-readiness"
  - "testing"
  - "v0.3"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T18:13:03.400Z"
  updated_by: "CODER"
  note: |-
    Command: node scripts/check-significant-coverage.mjs; Result: pass; Evidence: Significant suite contract OK (17 source targets). Scope: significant-suite guardrail now reading the shared inventory.
    Command: node scripts/check-workflow-harness-coverage.mjs; Result: pass; Evidence: Workflow harness suite contract OK (5 source targets; matrix=docs/developer/workflow-harness-test-matrix.mdx). Scope: workflow-coverage guardrail now reading the shared inventory.
    Command: node --input-type=module -e ...; Result: pass; Evidence: shared inventory OK (17+5 targets). Scope: shared aggregate target exports and route uniqueness for the touched inventory entries.
    Command: node scripts/check-test-routing.mjs; Result: pass; Evidence: test routing OK; total tests: 321. Scope: repository-wide routing sanity after moving aggregate targets to the shared inventory.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: consolidate the touched foundation guardrails onto a shared inventory source, keep the diff narrow, and verify with focused script and test runs before closing the last open 0.3 foundation task."
events:
  -
    type: "status"
    at: "2026-04-23T18:09:58.522Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: consolidate the touched foundation guardrails onto a shared inventory source, keep the diff narrow, and verify with focused script and test runs before closing the last open 0.3 foundation task."
  -
    type: "verify"
    at: "2026-04-23T18:13:03.400Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: node scripts/check-significant-coverage.mjs; Result: pass; Evidence: Significant suite contract OK (17 source targets). Scope: significant-suite guardrail now reading the shared inventory.
      Command: node scripts/check-workflow-harness-coverage.mjs; Result: pass; Evidence: Workflow harness suite contract OK (5 source targets; matrix=docs/developer/workflow-harness-test-matrix.mdx). Scope: workflow-coverage guardrail now reading the shared inventory.
      Command: node --input-type=module -e ...; Result: pass; Evidence: shared inventory OK (17+5 targets). Scope: shared aggregate target exports and route uniqueness for the touched inventory entries.
      Command: node scripts/check-test-routing.mjs; Result: pass; Evidence: test routing OK; total tests: 321. Scope: repository-wide routing sanity after moving aggregate targets to the shared inventory.
doc_version: 3
doc_updated_at: "2026-04-23T18:13:03.403Z"
doc_updated_by: "CODER"
description: "Tighten behavioral guardrails and inventory checks around the current task, lifecycle, PR/integrate, and workflow contours so the 0.3 foundation line is safer to maintain before deeper recipes and runner work resumes."
sections:
  Summary: |-
    Harden 0.3 foundation guardrails around task, lifecycle, and workflow contracts
    
    Tighten behavioral guardrails and inventory checks around the current task, lifecycle, PR/integrate, and workflow contours so the 0.3 foundation line is safer to maintain before deeper recipes and runner work resumes.
  Scope: |-
    - In scope: Tighten behavioral guardrails and inventory checks around the current task, lifecycle, PR/integrate, and workflow contours so the 0.3 foundation line is safer to maintain before deeper recipes and runner work resumes.
    - Out of scope: unrelated refactors not required for "Harden 0.3 foundation guardrails around task, lifecycle, and workflow contracts".
  Plan: "1. Audit the current guardrails for task, lifecycle, workflow, and significant-suite coverage to find topology-only or stale inventory checks. 2. Implement focused hardening that makes the 0.3 foundation contours more deterministic without widening scope into deeper recipes or runner architecture. 3. Verify the changed guardrails with the smallest focused suites and scripts that prove the touched contracts still hold."
  Verify Steps: |-
    1. The changed scripts or tests fail before the fix and pass after the fix for the touched foundation contour.
    2. Focused guardrail commands covering the touched scope pass locally.
    3. The hardening reduces stale or topology-only foundation guidance rather than widening the architecture surface into deferred recipes or runner work.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T18:13:03.400Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: node scripts/check-significant-coverage.mjs; Result: pass; Evidence: Significant suite contract OK (17 source targets). Scope: significant-suite guardrail now reading the shared inventory.
    Command: node scripts/check-workflow-harness-coverage.mjs; Result: pass; Evidence: Workflow harness suite contract OK (5 source targets; matrix=docs/developer/workflow-harness-test-matrix.mdx). Scope: workflow-coverage guardrail now reading the shared inventory.
    Command: node --input-type=module -e ...; Result: pass; Evidence: shared inventory OK (17+5 targets). Scope: shared aggregate target exports and route uniqueness for the touched inventory entries.
    Command: node scripts/check-test-routing.mjs; Result: pass; Evidence: test routing OK; total tests: 321. Scope: repository-wide routing sanity after moving aggregate targets to the shared inventory.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T18:12:50.449Z, excerpt_hash=sha256:d108ec097628ecfa23e72e28d94964abc784a95e4c8bb5f87b12762d1cdca392
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run packages/agentplane/src/cli/test-inventory.test.ts
    Skipped: command executed but blocked externally.
    Reason: local Rollup optional binary @rollup/rollup-darwin-arm64 fails macOS code-signature loading in this shell.
    Risk: low, because the changed inventory contract was re-verified with node-based assertions plus the two touched coverage scripts and global test-routing check.
    Approval: user approved continuing with the foundation fix instead of widening scope into environment repair.
id_source: "generated"
---
## Summary

Harden 0.3 foundation guardrails around task, lifecycle, and workflow contracts

Tighten behavioral guardrails and inventory checks around the current task, lifecycle, PR/integrate, and workflow contours so the 0.3 foundation line is safer to maintain before deeper recipes and runner work resumes.

## Scope

- In scope: Tighten behavioral guardrails and inventory checks around the current task, lifecycle, PR/integrate, and workflow contours so the 0.3 foundation line is safer to maintain before deeper recipes and runner work resumes.
- Out of scope: unrelated refactors not required for "Harden 0.3 foundation guardrails around task, lifecycle, and workflow contracts".

## Plan

1. Audit the current guardrails for task, lifecycle, workflow, and significant-suite coverage to find topology-only or stale inventory checks. 2. Implement focused hardening that makes the 0.3 foundation contours more deterministic without widening scope into deeper recipes or runner architecture. 3. Verify the changed guardrails with the smallest focused suites and scripts that prove the touched contracts still hold.

## Verify Steps

1. The changed scripts or tests fail before the fix and pass after the fix for the touched foundation contour.
2. Focused guardrail commands covering the touched scope pass locally.
3. The hardening reduces stale or topology-only foundation guidance rather than widening the architecture surface into deferred recipes or runner work.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T18:13:03.400Z — VERIFY — ok

By: CODER

Note: Command: node scripts/check-significant-coverage.mjs; Result: pass; Evidence: Significant suite contract OK (17 source targets). Scope: significant-suite guardrail now reading the shared inventory.
Command: node scripts/check-workflow-harness-coverage.mjs; Result: pass; Evidence: Workflow harness suite contract OK (5 source targets; matrix=docs/developer/workflow-harness-test-matrix.mdx). Scope: workflow-coverage guardrail now reading the shared inventory.
Command: node --input-type=module -e ...; Result: pass; Evidence: shared inventory OK (17+5 targets). Scope: shared aggregate target exports and route uniqueness for the touched inventory entries.
Command: node scripts/check-test-routing.mjs; Result: pass; Evidence: test routing OK; total tests: 321. Scope: repository-wide routing sanity after moving aggregate targets to the shared inventory.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T18:12:50.449Z, excerpt_hash=sha256:d108ec097628ecfa23e72e28d94964abc784a95e4c8bb5f87b12762d1cdca392

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run packages/agentplane/src/cli/test-inventory.test.ts
Skipped: command executed but blocked externally.
Reason: local Rollup optional binary @rollup/rollup-darwin-arm64 fails macOS code-signature loading in this shell.
Risk: low, because the changed inventory contract was re-verified with node-based assertions plus the two touched coverage scripts and global test-routing check.
Approval: user approved continuing with the foundation fix instead of widening scope into environment repair.
