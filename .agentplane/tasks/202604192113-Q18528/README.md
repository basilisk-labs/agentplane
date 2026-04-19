---
id: "202604192113-Q18528"
title: "Resolve lint drift exposed by full-fast push gates"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "maintenance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T21:14:02.451Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix the concrete lint drift exposed by full-fast so the epic branch can pass push gates."
events:
  -
    type: "status"
    at: "2026-04-19T21:14:02.893Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix the concrete lint drift exposed by full-fast so the epic branch can pass push gates."
doc_version: 3
doc_updated_at: "2026-04-19T21:14:02.899Z"
doc_updated_by: "CODER"
description: "Pre-push full-fast now fails at lint:core with concrete violations in recently changed files across core process helpers, guard policy/close-dirt, init orchestration, finish types, release tests, output/logger integration, and related runtime files. Fix the reported lint errors without preserving avoidable legacy patterns, verify lint:core and relevant focused tests/builds, and unblock epic push."
sections:
  Summary: |-
    Resolve lint drift exposed by full-fast push gates
    
    Pre-push full-fast now fails at lint:core with concrete violations in recently changed files across core process helpers, guard policy/close-dirt, init orchestration, finish types, release tests, output/logger integration, and related runtime files. Fix the reported lint errors without preserving avoidable legacy patterns, verify lint:core and relevant focused tests/builds, and unblock epic push.
  Scope: |-
    - In scope: Pre-push full-fast now fails at lint:core with concrete violations in recently changed files across core process helpers, guard policy/close-dirt, init orchestration, finish types, release tests, output/logger integration, and related runtime files. Fix the reported lint errors without preserving avoidable legacy patterns, verify lint:core and relevant focused tests/builds, and unblock epic push.
    - Out of scope: unrelated refactors not required for "Resolve lint drift exposed by full-fast push gates".
  Plan: "1. Reproduce the reported lint:core failures and limit edits to the exact files surfaced by the full-fast gate. 2. Replace avoidable legacy patterns with the simpler lint-compliant implementations rather than adding suppressions. 3. Re-run lint:core plus the smallest relevant typecheck/tests/build commands, then commit and close the task to unblock epic push."
  Verify Steps: |-
    1. Review the requested outcome for "Resolve lint drift exposed by full-fast push gates". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Resolve lint drift exposed by full-fast push gates

Pre-push full-fast now fails at lint:core with concrete violations in recently changed files across core process helpers, guard policy/close-dirt, init orchestration, finish types, release tests, output/logger integration, and related runtime files. Fix the reported lint errors without preserving avoidable legacy patterns, verify lint:core and relevant focused tests/builds, and unblock epic push.

## Scope

- In scope: Pre-push full-fast now fails at lint:core with concrete violations in recently changed files across core process helpers, guard policy/close-dirt, init orchestration, finish types, release tests, output/logger integration, and related runtime files. Fix the reported lint errors without preserving avoidable legacy patterns, verify lint:core and relevant focused tests/builds, and unblock epic push.
- Out of scope: unrelated refactors not required for "Resolve lint drift exposed by full-fast push gates".

## Plan

1. Reproduce the reported lint:core failures and limit edits to the exact files surfaced by the full-fast gate. 2. Replace avoidable legacy patterns with the simpler lint-compliant implementations rather than adding suppressions. 3. Re-run lint:core plus the smallest relevant typecheck/tests/build commands, then commit and close the task to unblock epic push.

## Verify Steps

1. Review the requested outcome for "Resolve lint drift exposed by full-fast push gates". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
