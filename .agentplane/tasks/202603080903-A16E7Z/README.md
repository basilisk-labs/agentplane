---
id: "202603080903-A16E7Z"
title: "Make docs cli regenerate formatted reference in one command"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T09:04:43.800Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T09:09:37.629Z"
  updated_by: "CODER"
  note: "Renderer now emits stable markdown, docs cli regeneration passes freshness without a separate Prettier step, and targeted test/lint checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: making docs cli self-contained so the generated CLI reference can be refreshed and validated with one deterministic command path."
events:
  -
    type: "status"
    at: "2026-03-08T09:04:48.399Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: making docs cli self-contained so the generated CLI reference can be refreshed and validated with one deterministic command path."
  -
    type: "verify"
    at: "2026-03-08T09:09:37.629Z"
    author: "CODER"
    state: "ok"
    note: "Renderer now emits stable markdown, docs cli regeneration passes freshness without a separate Prettier step, and targeted test/lint checks passed."
doc_version: 2
doc_updated_at: "2026-03-08T09:09:37.630Z"
doc_updated_by: "CODER"
description: "Make agentplane docs cli write the generated CLI reference in the same formatted state expected by docs freshness checks, and sync the related guidance."
id_source: "generated"
---
## Summary

Make docs cli regenerate formatted reference in one command

Make agentplane docs cli write the generated CLI reference in the same formatted state expected by docs freshness checks, and sync the related guidance.

## Scope

- In scope: Make agentplane docs cli write the generated CLI reference in the same formatted state expected by docs freshness checks, and sync the related guidance..
- Out of scope: unrelated refactors not required for "Make docs cli regenerate formatted reference in one command".

## Plan

1. Stabilize docs cli output so the generated markdown already matches the repository's formatted reference shape.
2. Add a regression test that proves running Prettier after docs generation produces no diff.
3. Sync freshness-check guidance so the user-facing recovery path is a single command.
4. Rebuild dist, rerun docs generation, run freshness and targeted test/lint checks, then finish and push.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T09:09:37.629Z — VERIFY — ok

By: CODER

Note: Renderer now emits stable markdown, docs cli regeneration passes freshness without a separate Prettier step, and targeted test/lint checks passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T09:09:19.238Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

Reason: the current freshness check formats a temp file with Prettier, but the user-facing regeneration command does not. That leaves a hidden second step and makes the recommended recovery command incomplete.
