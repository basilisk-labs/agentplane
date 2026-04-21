---
id: "202604211313-RE08PF"
title: "Add oversized test file guard"
result_summary: "Implemented oversized test guard in hotspot reporting; finalized with cli-unit fixture updates for removed legacy compatibility. Evidence: bun run hotspots:check, bun run test:project -- cli-unit, bun run format:check, git diff --check."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "testing"
  - "tooling"
verify:
  - "bun run hotspots:check"
  - "bun run test:project -- cli-unit"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:23.539Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T15:45:33.055Z"
  updated_by: "CODER"
  note: "Verified: bun run hotspots:check passed; bun run test:project -- cli-unit passed (54 files, 624 tests); bun run format:check passed; git diff --check passed. Follow-up test fixture alignment committed in a8a90546."
commit:
  hash: "a8a90546afc5197555d484e878ac5b704429b8a2"
  message: "✅ RE08PF test: align cli-unit fixtures with current contracts"
comments:
  -
    author: "CODER"
    body: "Start: добавить guard oversized test files через hotspot check с явным порогом и без затрагивания init UX/command-catalog областей."
  -
    author: "CODER"
    body: "Verified: oversized test guard is enforced and the full cli-unit gate is green after current-contract fixture updates."
events:
  -
    type: "status"
    at: "2026-04-21T13:21:38.148Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: добавить guard oversized test files через hotspot check с явным порогом и без затрагивания init UX/command-catalog областей."
  -
    type: "verify"
    at: "2026-04-21T13:42:51.439Z"
    author: "CODER"
    state: "needs_rework"
    note: "Command: bun run hotspots:check; Result: pass; oversized test hard threshold enforced. Command: bun run test:project -- cli-unit; Result: fail; Evidence: 13 failures in guard/finish/upgrade/normalize areas unrelated to hotspot-report script. Leaving task open until cli-unit is green or verify contract is narrowed."
  -
    type: "verify"
    at: "2026-04-21T15:45:33.055Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run hotspots:check passed; bun run test:project -- cli-unit passed (54 files, 624 tests); bun run format:check passed; git diff --check passed. Follow-up test fixture alignment committed in a8a90546."
  -
    type: "status"
    at: "2026-04-21T15:45:46.037Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: oversized test guard is enforced and the full cli-unit gate is green after current-contract fixture updates."
doc_version: 3
doc_updated_at: "2026-04-21T15:45:46.037Z"
doc_updated_by: "CODER"
description: "Introduce a test-file size guard with warning or failure threshold so new 1000+ LoC CLI tests cannot appear silently."
sections:
  Summary: |-
    Add oversized test file guard
    
    Introduce a test-file size guard with warning or failure threshold so new 1000+ LoC CLI tests cannot appear silently.
  Scope: |-
    - In scope: Introduce a test-file size guard with warning or failure threshold so new 1000+ LoC CLI tests cannot appear silently.
    - Out of scope: unrelated refactors not required for "Add oversized test file guard".
  Plan: "Scope: establish enforcement before splitting remaining large tests. Steps: 1. Extend hotspot or add a new script to report test file LoC separately. 2. Set initial error threshold at 800 LoC for tests, with explicit allowlist for existing oversized files if needed. 3. Document how to split scenario files. Acceptance: new oversized test files fail the guard; current baseline is explicit and visible."
  Verify Steps: |-
    1. Review the requested outcome for "Add oversized test file guard". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T13:42:51.439Z — VERIFY — needs_rework
    
    By: CODER
    
    Note: Command: bun run hotspots:check; Result: pass; oversized test hard threshold enforced. Command: bun run test:project -- cli-unit; Result: fail; Evidence: 13 failures in guard/finish/upgrade/normalize areas unrelated to hotspot-report script. Leaving task open until cli-unit is green or verify contract is narrowed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:21:38.186Z, excerpt_hash=sha256:2cb1520f83fe2730cc30beb6438b017c837611b3a6601e3c9dfa3e78fe535bc2
    
    ### 2026-04-21T15:45:33.055Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run hotspots:check passed; bun run test:project -- cli-unit passed (54 files, 624 tests); bun run format:check passed; git diff --check passed. Follow-up test fixture alignment committed in a8a90546.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:42:51.449Z, excerpt_hash=sha256:2cb1520f83fe2730cc30beb6438b017c837611b3a6601e3c9dfa3e78fe535bc2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add oversized test file guard

Introduce a test-file size guard with warning or failure threshold so new 1000+ LoC CLI tests cannot appear silently.

## Scope

- In scope: Introduce a test-file size guard with warning or failure threshold so new 1000+ LoC CLI tests cannot appear silently.
- Out of scope: unrelated refactors not required for "Add oversized test file guard".

## Plan

Scope: establish enforcement before splitting remaining large tests. Steps: 1. Extend hotspot or add a new script to report test file LoC separately. 2. Set initial error threshold at 800 LoC for tests, with explicit allowlist for existing oversized files if needed. 3. Document how to split scenario files. Acceptance: new oversized test files fail the guard; current baseline is explicit and visible.

## Verify Steps

1. Review the requested outcome for "Add oversized test file guard". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T13:42:51.439Z — VERIFY — needs_rework

By: CODER

Note: Command: bun run hotspots:check; Result: pass; oversized test hard threshold enforced. Command: bun run test:project -- cli-unit; Result: fail; Evidence: 13 failures in guard/finish/upgrade/normalize areas unrelated to hotspot-report script. Leaving task open until cli-unit is green or verify contract is narrowed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:21:38.186Z, excerpt_hash=sha256:2cb1520f83fe2730cc30beb6438b017c837611b3a6601e3c9dfa3e78fe535bc2

### 2026-04-21T15:45:33.055Z — VERIFY — ok

By: CODER

Note: Verified: bun run hotspots:check passed; bun run test:project -- cli-unit passed (54 files, 624 tests); bun run format:check passed; git diff --check passed. Follow-up test fixture alignment committed in a8a90546.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:42:51.449Z, excerpt_hash=sha256:2cb1520f83fe2730cc30beb6438b017c837611b3a6601e3c9dfa3e78fe535bc2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
