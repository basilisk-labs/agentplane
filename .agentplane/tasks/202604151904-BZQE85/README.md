---
id: "202604151904-BZQE85"
title: "Fix workflow:wait-remote-checks wrapper argument forwarding"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T19:04:33.855Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T19:06:45.252Z"
  updated_by: "CODER"
  note: "Wrapper and parser now treat --pr as a PR target alias; targeted script tests pass and live bun run workflow:wait-remote-checks -- --pr 331 succeeds."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the broken workflow:wait-remote-checks wrapper path, then fix only argument forwarding and add a targeted regression test."
events:
  -
    type: "status"
    at: "2026-04-15T19:05:12.090Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the broken workflow:wait-remote-checks wrapper path, then fix only argument forwarding and add a targeted regression test."
  -
    type: "verify"
    at: "2026-04-15T19:06:45.252Z"
    author: "CODER"
    state: "ok"
    note: "Wrapper and parser now treat --pr as a PR target alias; targeted script tests pass and live bun run workflow:wait-remote-checks -- --pr 331 succeeds."
doc_version: 3
doc_updated_at: "2026-04-15T19:06:45.256Z"
doc_updated_by: "CODER"
description: "Make bun run workflow:wait-remote-checks -- --pr <id> call the underlying wait script correctly instead of passing an invalid --pr flag into gh pr view. Keep the fix limited to wrapper/CLI argument forwarding and add targeted regression coverage."
sections:
  Summary: |-
    Fix workflow:wait-remote-checks wrapper argument forwarding
    
    Make bun run workflow:wait-remote-checks -- --pr <id> call the underlying wait script correctly instead of passing an invalid --pr flag into gh pr view. Keep the fix limited to wrapper/CLI argument forwarding and add targeted regression coverage.
  Scope: |-
    - In scope: Make bun run workflow:wait-remote-checks -- --pr <id> call the underlying wait script correctly instead of passing an invalid --pr flag into gh pr view. Keep the fix limited to wrapper/CLI argument forwarding and add targeted regression coverage.
    - Out of scope: unrelated refactors not required for "Fix workflow:wait-remote-checks wrapper argument forwarding".
  Plan: |-
    1. Inspect the workflow:wait-remote-checks wrapper and find where --pr is forwarded incorrectly. -> verify: identify the exact command construction that emits gh pr view --pr.
    2. Fix only wrapper/CLI argument forwarding. -> verify: bun run workflow:wait-remote-checks -- --pr <id> reaches the wait script without invalid gh flags.
    3. Add targeted regression coverage. -> verify: test reproduces the previous broken forwarding and passes after the fix.
  Verify Steps: |-
    1. Review the requested outcome for "Fix workflow:wait-remote-checks wrapper argument forwarding". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T19:06:45.252Z — VERIFY — ok
    
    By: CODER
    
    Note: Wrapper and parser now treat --pr as a PR target alias; targeted script tests pass and live bun run workflow:wait-remote-checks -- --pr 331 succeeds.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T19:05:12.118Z, excerpt_hash=sha256:fbf78096ca327bef3cd2cb5a18c8abad1423d0fb71c51d83c3415b8242f32b78
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix workflow:wait-remote-checks wrapper argument forwarding

Make bun run workflow:wait-remote-checks -- --pr <id> call the underlying wait script correctly instead of passing an invalid --pr flag into gh pr view. Keep the fix limited to wrapper/CLI argument forwarding and add targeted regression coverage.

## Scope

- In scope: Make bun run workflow:wait-remote-checks -- --pr <id> call the underlying wait script correctly instead of passing an invalid --pr flag into gh pr view. Keep the fix limited to wrapper/CLI argument forwarding and add targeted regression coverage.
- Out of scope: unrelated refactors not required for "Fix workflow:wait-remote-checks wrapper argument forwarding".

## Plan

1. Inspect the workflow:wait-remote-checks wrapper and find where --pr is forwarded incorrectly. -> verify: identify the exact command construction that emits gh pr view --pr.
2. Fix only wrapper/CLI argument forwarding. -> verify: bun run workflow:wait-remote-checks -- --pr <id> reaches the wait script without invalid gh flags.
3. Add targeted regression coverage. -> verify: test reproduces the previous broken forwarding and passes after the fix.

## Verify Steps

1. Review the requested outcome for "Fix workflow:wait-remote-checks wrapper argument forwarding". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T19:06:45.252Z — VERIFY — ok

By: CODER

Note: Wrapper and parser now treat --pr as a PR target alias; targeted script tests pass and live bun run workflow:wait-remote-checks -- --pr 331 succeeds.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T19:05:12.118Z, excerpt_hash=sha256:fbf78096ca327bef3cd2cb5a18c8abad1423d0fb71c51d83c3415b8242f32b78

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
