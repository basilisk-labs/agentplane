---
id: "202604211313-RE08PF"
title: "Add oversized test file guard"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "needs_rework"
  updated_at: "2026-04-21T13:42:51.439Z"
  updated_by: "CODER"
  note: "Command: bun run hotspots:check; Result: pass; oversized test hard threshold enforced. Command: bun run test:project -- cli-unit; Result: fail; Evidence: 13 failures in guard/finish/upgrade/normalize areas unrelated to hotspot-report script. Leaving task open until cli-unit is green or verify contract is narrowed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: добавить guard oversized test files через hotspot check с явным порогом и без затрагивания init UX/command-catalog областей."
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
doc_version: 3
doc_updated_at: "2026-04-21T13:42:51.449Z"
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
