---
id: "202603091258-HZGNEF"
title: "Plan next release-ci decomposition after 0.3.5 stabilization"
result_summary: "Defined the next safe release-ci decomposition: keep only release-specific contract coverage and replace the broad init-upgrade integration suite with a compact release-smoke file."
status: "DONE"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T12:59:04.875Z"
  updated_by: "ORCHESTRATOR"
  note: "Release-ci decomposition planning approved."
verification:
  state: "ok"
  updated_at: "2026-03-09T13:00:19.989Z"
  updated_by: "PLANNER"
  note: "Remaining release-ci hotspots were classified by release relevance, and the next safe narrowing step is a compact install-first release-smoke replacement for the broad init-upgrade integration file."
commit:
  hash: "28c25dd7c1cc357ce8f9241a90c97d4e5a41c543"
  message: "✅ NBMVGA close: Stabilized the cli-smoke release-prepublish path by moving the smoke flow into the dedi... (202603091235-NBMVGA) [code,release]"
comments:
  -
    author: "PLANNER"
    body: "Start: classifying the remaining heavy release-ci suites before changing the patch-release gate again."
  -
    author: "PLANNER"
    body: "Verified: the remaining heavy suites in release:ci-check were classified by release relevance, and the next executable step is a compact install-first release-smoke path instead of the full init-upgrade regression sweep."
events:
  -
    type: "status"
    at: "2026-03-09T12:59:05.295Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: classifying the remaining heavy release-ci suites before changing the patch-release gate again."
  -
    type: "verify"
    at: "2026-03-09T13:00:19.989Z"
    author: "PLANNER"
    state: "ok"
    note: "Remaining release-ci hotspots were classified by release relevance, and the next safe narrowing step is a compact install-first release-smoke replacement for the broad init-upgrade integration file."
  -
    type: "status"
    at: "2026-03-09T13:00:51.587Z"
    author: "PLANNER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the remaining heavy suites in release:ci-check were classified by release relevance, and the next executable step is a compact install-first release-smoke path instead of the full init-upgrade regression sweep."
doc_version: 3
doc_updated_at: "2026-03-09T13:00:51.587Z"
doc_updated_by: "PLANNER"
description: "Analyze the remaining heavy suites inside release:ci-check, classify release-critical versus general regression coverage, and define the next safe narrowing steps without weakening the patch-release gate."
id_source: "generated"
---
## Summary

Plan next release-ci decomposition after 0.3.5 stabilization

Analyze the remaining heavy suites inside release:ci-check, classify release-critical versus general regression coverage, and define the next safe narrowing steps without weakening the patch-release gate.

## Scope

- In scope: Analyze the remaining heavy suites inside release:ci-check, classify release-critical versus general regression coverage, and define the next safe narrowing steps without weakening the patch-release gate.
- Out of scope: unrelated refactors not required for "Plan next release-ci decomposition after 0.3.5 stabilization".

## Plan

1. Inspect the current release:ci-check composition and identify the slowest suites still inside test:release:ci-base after the previous timeout split.
2. Classify each slow suite as release-critical, release-supporting, or general regression based on whether a patch publish can reasonably depend on it.
3. Record the next safe narrowing steps and hand off an executable implementation scope to the coding task.

## Verify Steps

1. Review the current release:ci-check scripts and recent timing data. Expected: the remaining slow suites are explicitly listed with their role in the release gate.
2. Compare each suite against the patch-release contract. Expected: each suite is classified as release-critical, release-supporting, or general regression with a stated rationale.
3. Check the resulting plan against the coding task scope. Expected: the next narrowing step is specific enough to implement without inventing new product behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T13:00:19.989Z — VERIFY — ok

By: PLANNER

Note: Remaining release-ci hotspots were classified by release relevance, and the next safe narrowing step is a compact install-first release-smoke replacement for the broad init-upgrade integration file.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T13:00:19.373Z, excerpt_hash=sha256:2497ebf2579c0db3b962c3565f15c7b752acf58ab00d0d3418f10bfc7772af78

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: after isolating cli-smoke and release-recovery, the dominant time inside release:ci-check is now coming from broad integration suites that are not intrinsically release-specific: run-cli.core.init-upgrade-backend.test.ts (~395s), run-cli.core.pr-flow.test.ts (~421s), run-cli.core.lifecycle.test.ts (~305s), run-cli.core.guard.test.ts (~200s), doctor.command.test.ts (~173s), and run-cli.core.branch-meta.test.ts (~166s).
  Impact: patch releases still depend on unrelated regression breadth, so prepublish remains expensive and brittle even after the timeout fixes.
  Resolution: the next safe narrowing step is to replace the broad init/upgrade integration file in the release gate with a compact release-smoke suite that covers only install-first init/upgrade/migrate-doc behavior, leaving the full file in general CI.
  Promotion: tooling
