---
id: "202603080540-NZX99N"
title: "P0: split local quality gates into fast and full tracks"
result_summary: "ci:local is now the fast default path, ci:local:full preserves the previous heavy local gate, and pre-push can still escalate to full/release-grade validation without forcing that cost on every standard push."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T06:10:20.665Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T06:30:42.114Z"
  updated_by: "CODER"
  note: "Local quality gates were split into explicit fast and full tracks. The default ci:local/pre-push path now runs the fast gate, the full gate remains available as ci:local:full and was exercised successfully after the split, lint passed, and hooks run pre-push coverage remained green."
commit:
  hash: "40a9f6c992b18b51d01c84f69d9d8b27809edc8e"
  message: "⚡ NZX99N ci: split local quality gates into fast and full tracks"
comments:
  -
    author: "CODER"
    body: "Start: splitting local quality checks into fast and full tracks, then wiring pre-push to use the fast gate for standard pushes while preserving the heavy release-grade path."
  -
    author: "CODER"
    body: "Verified: local CI now has explicit fast and full tracks, pre-push uses the fast gate by default, the full gate remains available for heavier validation, and the docs reflect the new contract."
events:
  -
    type: "status"
    at: "2026-03-08T06:10:20.955Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: splitting local quality checks into fast and full tracks, then wiring pre-push to use the fast gate for standard pushes while preserving the heavy release-grade path."
  -
    type: "verify"
    at: "2026-03-08T06:30:42.114Z"
    author: "CODER"
    state: "ok"
    note: "Local quality gates were split into explicit fast and full tracks. The default ci:local/pre-push path now runs the fast gate, the full gate remains available as ci:local:full and was exercised successfully after the split, lint passed, and hooks run pre-push coverage remained green."
  -
    type: "status"
    at: "2026-03-08T06:31:18.857Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: local CI now has explicit fast and full tracks, pre-push uses the fast gate by default, the full gate remains available for heavier validation, and the docs reflect the new contract."
doc_version: 2
doc_updated_at: "2026-03-08T06:31:18.857Z"
doc_updated_by: "CODER"
description: "Reduce developer push cost by separating mandatory fast local checks from full local CI while preserving release-grade verification paths."
id_source: "generated"
---
## Summary

P0: split local quality gates into fast and full tracks

Reduce developer push cost by separating mandatory fast local checks from full local CI while preserving release-grade verification paths.

## Scope

- In scope: Reduce developer push cost by separating mandatory fast local checks from full local CI while preserving release-grade verification paths..
- Out of scope: unrelated refactors not required for "P0: split local quality gates into fast and full tracks".

## Plan

1. Inventory the current pre-push/local CI pipeline and separate checks that must remain blocking on every push from slower full-suite and release-grade checks. 2. Introduce explicit fast/full entrypoints and wire hooks/scripts so the default local path uses the fast gate without losing access to the full validation path. 3. Run the relevant scripts and document the new split so the local quality contract stays deterministic.

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
#### 2026-03-08T06:30:42.114Z — VERIFY — ok

By: CODER

Note: Local quality gates were split into explicit fast and full tracks. The default ci:local/pre-push path now runs the fast gate, the full gate remains available as ci:local:full and was exercised successfully after the split, lint passed, and hooks run pre-push coverage remained green.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T06:10:20.955Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
