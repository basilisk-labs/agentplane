---
id: "202603081006-BD4X83"
title: "Redesign Verify Steps seed for acceptance-oriented checks"
result_summary: "Verify-required and generic README v3 tasks now start from acceptance-oriented Verify Steps phrased as action-plus-expected-result, without shell-only bias or legacy subheadings."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603081006-0GEVRW"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T10:57:01.831Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T11:02:00.485Z"
  updated_by: "CODER"
  note: "README v3 Verify Steps now use acceptance-oriented steps instead of Scope/Checks/Evidence scaffolding; targeted task creation/lifecycle tests, lint, builds, and doctor all passed."
commit:
  hash: "f096edabf2dfba5d341041d1cf882050b6937cc1"
  message: "🧩 BD4X83 task: redesign Verify Steps seed"
comments:
  -
    author: "CODER"
    body: "Start: replace the legacy Verify Steps scaffolding with acceptance-oriented steps across the README v3 template paths and their creation tests."
  -
    author: "CODER"
    body: "Verified: README v3 Verify Steps now seed concise acceptance-oriented steps across task creation paths, and the legacy Scope/Checks/Evidence scaffolding is gone from the checked task flows."
events:
  -
    type: "status"
    at: "2026-03-08T10:57:10.158Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the legacy Verify Steps scaffolding with acceptance-oriented steps across the README v3 template paths and their creation tests."
  -
    type: "verify"
    at: "2026-03-08T11:02:00.485Z"
    author: "CODER"
    state: "ok"
    note: "README v3 Verify Steps now use acceptance-oriented steps instead of Scope/Checks/Evidence scaffolding; targeted task creation/lifecycle tests, lint, builds, and doctor all passed."
  -
    type: "status"
    at: "2026-03-08T11:02:36.731Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: README v3 Verify Steps now seed concise acceptance-oriented steps across task creation paths, and the legacy Scope/Checks/Evidence scaffolding is gone from the checked task flows."
doc_version: 2
doc_updated_at: "2026-03-08T11:02:36.731Z"
doc_updated_by: "CODER"
description: "Replace abstract Verify Steps scaffolding with concise acceptance-step templates that work for code and non-code tasks."
id_source: "generated"
---
## Summary

Redesign Verify Steps seed for acceptance-oriented checks

Replace abstract Verify Steps scaffolding with concise acceptance-step templates that work for code and non-code tasks.

## Scope

- In scope: Replace abstract Verify Steps scaffolding with concise acceptance-step templates that work for code and non-code tasks..
- Out of scope: unrelated refactors not required for "Redesign Verify Steps seed for acceptance-oriented checks".

## Plan

1. Replace the legacy Verify Steps scaffolding in both CLI and core README v3 templates with concise acceptance-oriented steps that work for code and non-code tasks.
2. Update primary-tag seeded Verify Steps content and the related unit/CLI task creation tests to match the new acceptance-step contract.
3. Verify the new seed via targeted task-template tests, builds, and doctor, then finish and push main.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

1. Create a new README v3 task through the current template path. Expected: the seeded Verify Steps section is acceptance-oriented and no longer uses Scope/Checks/Evidence/Pass criteria placeholders.
2. Create a verify-required task with `--verify` commands. Expected: the seeded Verify Steps section turns those checks into concrete action-and-expected-result steps without shell-only bias.
3. Run targeted task-template tests plus build/doctor checks. Expected: the new seed passes without widening unrelated diffs.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T11:02:00.485Z — VERIFY — ok

By: CODER

Note: README v3 Verify Steps now use acceptance-oriented steps instead of Scope/Checks/Evidence scaffolding; targeted task creation/lifecycle tests, lint, builds, and doctor all passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T10:57:10.158Z, excerpt_hash=sha256:cf2ffcda0dd4f4b574bf2f430e638af9981e0c725555424ab8a73c5b23afd633

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
