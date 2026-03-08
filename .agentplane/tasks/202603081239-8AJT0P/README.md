---
id: "202603081239-8AJT0P"
title: "Add a CLI help-spec targeted fast CI bucket"
result_summary: "Added a dedicated cli-help fast-CI bucket for safe CLI help/spec/guidance surfaces, with focused selector rules and regressions that preserve the broad fallback for runtime-sensitive CLI code."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T12:44:22.473Z"
  updated_by: "CODER"
  note: "Added a cli-help targeted fast-CI bucket. Selector regressions passed; command-guide.ts now routes to targeted(cli-help), and run-cli.ts still routes to the broad full-fast contour."
commit:
  hash: "8e3168d96aaf3377300b4470558140a28d1970eb"
  message: "⚡ 8AJT0P task: add cli help fast bucket"
comments:
  -
    author: "CODER"
    body: "Start: add a focused fast-CI bucket for isolated CLI help/spec/guidance changes while preserving the broad fallback for runtime-sensitive CLI paths."
  -
    author: "CODER"
    body: "Verified: isolated CLI help/spec/guidance changes now route to a focused cli-help fast contour, while run-cli and other runtime-sensitive CLI paths still fall back to the broader fast suite."
events:
  -
    type: "status"
    at: "2026-03-08T12:41:35.665Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a focused fast-CI bucket for isolated CLI help/spec/guidance changes while preserving the broad fallback for runtime-sensitive CLI paths."
  -
    type: "verify"
    at: "2026-03-08T12:44:22.473Z"
    author: "CODER"
    state: "ok"
    note: "Added a cli-help targeted fast-CI bucket. Selector regressions passed; command-guide.ts now routes to targeted(cli-help), and run-cli.ts still routes to the broad full-fast contour."
  -
    type: "status"
    at: "2026-03-08T12:44:53.570Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: isolated CLI help/spec/guidance changes now route to a focused cli-help fast contour, while run-cli and other runtime-sensitive CLI paths still fall back to the broader fast suite."
doc_version: 3
doc_updated_at: "2026-03-08T12:44:53.570Z"
doc_updated_by: "CODER"
description: "Route isolated CLI help, spec, and guidance paths to a focused fast-CI bucket instead of the broad fallback while keeping runtime-sensitive CLI paths on the broad contour."
id_source: "generated"
---
## Summary

Add a CLI help-spec targeted fast CI bucket

Route isolated CLI help, spec, and guidance paths to a focused fast-CI bucket instead of the broad fallback while keeping runtime-sensitive CLI paths on the broad contour.

## Scope

- In scope: Route isolated CLI help, spec, and guidance paths to a focused fast-CI bucket instead of the broad fallback while keeping runtime-sensitive CLI paths on the broad contour..
- Out of scope: unrelated refactors not required for "Add a CLI help-spec targeted fast CI bucket".

## Plan

1. Define a safe CLI help/spec/guidance bucket boundary that excludes run-cli execution plumbing, dist/runtime paths, and other runtime-sensitive CLI files.
2. Update the fast CI selector and execution plan so isolated changes in that safe CLI subset route to a focused CLI help/spec suite instead of the broad fallback.
3. Add selector regressions and changed-file simulations to prove the new bucket triggers for the safe subset while runtime-sensitive CLI paths still fall back broadly.

## Verify Steps

1. Run selector regressions for the new CLI help/spec bucket. Expected: safe CLI help/spec paths resolve to the new targeted bucket and runtime-sensitive CLI paths do not.
2. Run lint and the focused fast-CI suite for the touched selector files. Expected: all focused checks pass.
3. Simulate isolated changed-file scopes through scripts/run-local-ci.mjs --mode fast. Expected: safe CLI help/spec changes avoid the broad fallback while run-cli/runtime-sensitive paths still use it.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T12:44:22.473Z — VERIFY — ok

By: CODER

Note: Added a cli-help targeted fast-CI bucket. Selector regressions passed; command-guide.ts now routes to targeted(cli-help), and run-cli.ts still routes to the broad full-fast contour.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T12:44:22.324Z, excerpt_hash=sha256:4cc4b8fb33c232233e4e459dc81f27382b91e3255258a6e4ddb54ea472a352c9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: a large safe subset of CLI help/spec/guidance files was still trapped behind the generic ^packages/agentplane/src/cli/ broad fallback even though those files already had focused unit and help-contract coverage.
  Impact: simple CLI wording or help-surface changes still paid the full fast-contour cost.
  Resolution: added a dedicated cli-help bucket for bootstrap/command guides, command snippets, output/error-map/prompts, cli/spec/**, cli/shared/**, and help-focused run-cli contracts, while leaving run-cli execution plumbing and runtime-sensitive CLI paths on the broad fallback.
  Promotion: none
