---
id: "202603080848-EDKYVN"
title: "Reduce doctor fast bucket runtime"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T08:49:11.967Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T08:52:02.924Z"
  updated_by: "TESTER"
  note: "Verified: doctor-path fast CI now runs a narrow doctor fast suite and reduced the bucket runtime from about 135.28s to about 33.71s on this repository while preserving the broad doctor regression file in wider lanes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extracting a narrow doctor fast-test suite and rewiring the doctor bucket in local fast CI to use it while leaving the full doctor regression file in broader lanes."
events:
  -
    type: "status"
    at: "2026-03-08T08:49:12.455Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting a narrow doctor fast-test suite and rewiring the doctor bucket in local fast CI to use it while leaving the full doctor regression file in broader lanes."
  -
    type: "verify"
    at: "2026-03-08T08:52:02.924Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: doctor-path fast CI now runs a narrow doctor fast suite and reduced the bucket runtime from about 135.28s to about 33.71s on this repository while preserving the broad doctor regression file in wider lanes."
doc_version: 2
doc_updated_at: "2026-03-08T08:52:02.925Z"
doc_updated_by: "TESTER"
description: "Replace the expensive doctor bucket verification in path-aware fast local CI with a narrower deterministic suite that still covers selector and doctor regressions."
id_source: "generated"
---
## Summary

Reduce doctor fast bucket runtime

Replace the expensive doctor bucket verification in path-aware fast local CI with a narrower deterministic suite that still covers selector and doctor regressions.

## Scope

- In scope: Replace the expensive doctor bucket verification in path-aware fast local CI with a narrower deterministic suite that still covers selector and doctor regressions..
- Out of scope: unrelated refactors not required for "Reduce doctor fast bucket runtime".

## Plan

1. Extract a narrow doctor fast-test suite that covers the path-aware fast bucket contract: baseline pass, gateway failure, missing implementation hash failure, and framework-checkout runtime visibility.
2. Switch the doctor fast bucket in local CI to that narrower suite while keeping the full doctor.command regression file in the broader test lanes.
3. Verify lint, targeted tests, and the measured doctor-bucket runtime after the split.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- `bun run lint:core -- scripts/run-local-ci.mjs packages/agentplane/src/commands/doctor.fast.test.ts packages/agentplane/src/commands/doctor.command.test.ts`
- `bunx vitest run packages/agentplane/src/commands/doctor.fast.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000`
- `sh -c '/usr/bin/time -p env AGENTPLANE_FAST_CHANGED_FILES="packages/agentplane/src/commands/doctor.run.ts" node scripts/run-local-ci.mjs --mode fast >/tmp/ci-fast-doctor.out 2>/tmp/ci-fast-doctor.err'`\n\n### Evidence / Commands\n- Record the targeted doctor bucket runtime and confirm the fast path now runs the narrow suite rather than the full historical regression file.\n\n### Pass criteria\n- Doctor-path fast CI remains deterministic, preserves core doctor regression coverage, and materially reduces the narrow doctor bucket runtime.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T08:52:02.924Z — VERIFY — ok

By: TESTER

Note: Verified: doctor-path fast CI now runs a narrow doctor fast suite and reduced the bucket runtime from about 135.28s to about 33.71s on this repository while preserving the broad doctor regression file in wider lanes.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T08:52:02.363Z, excerpt_hash=sha256:b6839cf0d85eb558bc5cb4f567fabc8265b71065b2644368df4e20d99f5962b7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

- Motivation: the path-aware selector is correct, but the doctor-specific bucket was still too expensive because it ran the full doctor.command regression suite.
- Implemented approach: introduced doctor.fast.test.ts for the doctor fast bucket and kept doctor.command.test.ts in broader lanes.
- Measured on this repository after implementation: doctor fast bucket ~33.71s instead of ~135.28s.
- Residual tradeoff: build + typecheck still dominate much of the remaining time, so further wins need broader fast-gate decomposition rather than more doctor-only test trimming.
