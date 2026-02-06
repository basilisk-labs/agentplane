---
id: "202602061732-F17C02"
title: "P1.1: Harden commit subject policy (case-insensitive + anti-generic)"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "git"
  - "workflow"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T18:29:34.212Z"
  updated_by: "CODER"
  note: "Approved: improve subject validator and update tests."
verification:
  state: "ok"
  updated_at: "2026-02-06T18:31:33.580Z"
  updated_by: "TESTER"
  note: "Updated validateCommitSubject: case-insensitive task ref matching and anti-generic check after stripping task ref; bun run test:core passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Harden commit subject policy (case-insensitive task ref, anti-generic after stripping task ref)."
doc_version: 2
doc_updated_at: "2026-02-06T18:31:33.589Z"
doc_updated_by: "CODER"
description: "Improve validateCommitSubject: task ref match should be case-insensitive; anti-generic should ignore emoji and task ref before evaluating remaining words."
id_source: "generated"
---
## Summary

Harden commit subject policy: case-insensitive task ref matching and anti-generic check after stripping task ref.

## Scope

packages/core/src/commit/commit-policy.ts + tests.

## Plan

1) Make task id/suffix detection case-insensitive.\n2) Update validateCommitSubject to evaluate genericness after stripping task ref (and emoji/punctuation).\n3) Update unit tests.\n4) Run bun run test:core.

## Risks

Risk: Tightening policy may reject previously-accepted short subjects; adjust tests to reflect intended quality gate.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T18:31:33.580Z — VERIFY — ok

By: TESTER

Note: Updated validateCommitSubject: case-insensitive task ref matching and anti-generic check after stripping task ref; bun run test:core passed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit(s) for this task.

## Verify Steps

- bun run test:core
