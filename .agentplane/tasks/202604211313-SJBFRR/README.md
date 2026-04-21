---
id: "202604211313-SJBFRR"
title: "Add cold-start regression guard"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604211313-5RAM5H"
tags:
  - "ci"
  - "perf"
  - "tooling"
verify:
  - "bun run bench:cli:cold"
  - "bun run ci:local:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:19.680Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T20:01:21.464Z"
  updated_by: "CODER"
  note: "Implemented script-readable CLI cold-start baseline guard. Evidence: bun run bench:cli:cold avg quickstart=182.396ms task_list=201.38ms task_search=203.256ms task_next=195.528ms preflight_quick=240.924ms; bun run bench:cli:cold:check passed; bun run ci:local:fast passed with 233 unit files and 13 critical E2E tests; focused baseline script tests passed; docs:scripts:check passed; git diff --check passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a script-readable CLI cold-start baseline and a regression check now that the bundled CLI entry is in place."
events:
  -
    type: "status"
    at: "2026-04-21T19:53:09.698Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a script-readable CLI cold-start baseline and a regression check now that the bundled CLI entry is in place."
  -
    type: "verify"
    at: "2026-04-21T20:01:21.464Z"
    author: "CODER"
    state: "ok"
    note: "Implemented script-readable CLI cold-start baseline guard. Evidence: bun run bench:cli:cold avg quickstart=182.396ms task_list=201.38ms task_search=203.256ms task_next=195.528ms preflight_quick=240.924ms; bun run bench:cli:cold:check passed; bun run ci:local:fast passed with 233 unit files and 13 critical E2E tests; focused baseline script tests passed; docs:scripts:check passed; git diff --check passed."
doc_version: 3
doc_updated_at: "2026-04-21T20:01:21.470Z"
doc_updated_by: "CODER"
description: "Turn CLI cold-path measurement into a tracked baseline check with a reasonable tolerance after subpath import and bundling work lands."
sections:
  Summary: |-
    Add cold-start regression guard

    Turn CLI cold-path measurement into a tracked baseline check with a reasonable tolerance after subpath import and bundling work lands.
  Scope: |-
    - In scope: Turn CLI cold-path measurement into a tracked baseline check with a reasonable tolerance after subpath import and bundling work lands.
    - Out of scope: unrelated refactors not required for "Add cold-start regression guard".
  Plan: "Scope: prevent hidden cold-start regression. Steps: 1. Decide which cold-path scenarios are stable enough for a guard. 2. Store baseline and tolerance in a script-readable artifact. 3. Add a check command that reports regression without noisy flakes. 4. Wire it into a suitable local/CI route only if stable. Acceptance: check passes on current main and fails on an artificial large regression."
  Verify Steps: |-
    1. Review the requested outcome for "Add cold-start regression guard". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T20:01:21.464Z — VERIFY — ok

    By: CODER

    Note: Implemented script-readable CLI cold-start baseline guard. Evidence: bun run bench:cli:cold avg quickstart=182.396ms task_list=201.38ms task_search=203.256ms task_next=195.528ms preflight_quick=240.924ms; bun run bench:cli:cold:check passed; bun run ci:local:fast passed with 233 unit files and 13 critical E2E tests; focused baseline script tests passed; docs:scripts:check passed; git diff --check passed.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T19:53:09.707Z, excerpt_hash=sha256:6921c1b11db0823c2b9c4311024ede2ae4da9f5cc55bf3daa0864864c3fbb89c

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add cold-start regression guard

Turn CLI cold-path measurement into a tracked baseline check with a reasonable tolerance after subpath import and bundling work lands.

## Scope

- In scope: Turn CLI cold-path measurement into a tracked baseline check with a reasonable tolerance after subpath import and bundling work lands.
- Out of scope: unrelated refactors not required for "Add cold-start regression guard".

## Plan

Scope: prevent hidden cold-start regression. Steps: 1. Decide which cold-path scenarios are stable enough for a guard. 2. Store baseline and tolerance in a script-readable artifact. 3. Add a check command that reports regression without noisy flakes. 4. Wire it into a suitable local/CI route only if stable. Acceptance: check passes on current main and fails on an artificial large regression.

## Verify Steps

1. Review the requested outcome for "Add cold-start regression guard". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T20:01:21.464Z — VERIFY — ok

By: CODER

Note: Implemented script-readable CLI cold-start baseline guard. Evidence: bun run bench:cli:cold avg quickstart=182.396ms task_list=201.38ms task_search=203.256ms task_next=195.528ms preflight_quick=240.924ms; bun run bench:cli:cold:check passed; bun run ci:local:fast passed with 233 unit files and 13 critical E2E tests; focused baseline script tests passed; docs:scripts:check passed; git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T19:53:09.707Z, excerpt_hash=sha256:6921c1b11db0823c2b9c4311024ede2ae4da9f5cc55bf3daa0864864c3fbb89c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
