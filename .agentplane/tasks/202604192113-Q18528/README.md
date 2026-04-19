---
id: "202604192113-Q18528"
title: "Resolve lint drift exposed by full-fast push gates"
result_summary: "full-fast lint drift is eliminated across the touched core and agentplane surfaces, so push gates can continue past lint:core"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-19T21:19:08.422Z"
  updated_by: "CODER"
  note: "Verified: bun run lint:core, bun run --filter=@agentplaneorg/core build, bun run --filter=agentplane build, and focused vitest for run-process, guard commands, and release metadata all passed after replacing the reported lint offenders with stricter typed implementations."
commit:
  hash: "7ee74db20780bc100e1b04168a87bdab760fb7a7"
  message: "🧹 Q18528 task: resolve lint drift exposed by full-fast gates"
comments:
  -
    author: "CODER"
    body: "Start: fix the concrete lint drift exposed by full-fast so the epic branch can pass push gates."
  -
    author: "CODER"
    body: "Verified: bun run lint:core, bun run --filter=@agentplaneorg/core build, bun run --filter=agentplane build, and focused vitest for run-process, guard commands, and release metadata all passed after replacing the reported lint offenders with stricter typed implementations."
events:
  -
    type: "status"
    at: "2026-04-19T21:14:02.893Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix the concrete lint drift exposed by full-fast so the epic branch can pass push gates."
  -
    type: "verify"
    at: "2026-04-19T21:19:08.422Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run lint:core, bun run --filter=@agentplaneorg/core build, bun run --filter=agentplane build, and focused vitest for run-process, guard commands, and release metadata all passed after replacing the reported lint offenders with stricter typed implementations."
  -
    type: "status"
    at: "2026-04-19T21:19:13.833Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint:core, bun run --filter=@agentplaneorg/core build, bun run --filter=agentplane build, and focused vitest for run-process, guard commands, and release metadata all passed after replacing the reported lint offenders with stricter typed implementations."
doc_version: 3
doc_updated_at: "2026-04-19T21:19:13.833Z"
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
    ### 2026-04-19T21:19:08.422Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run lint:core, bun run --filter=@agentplaneorg/core build, bun run --filter=agentplane build, and focused vitest for run-process, guard commands, and release metadata all passed after replacing the reported lint offenders with stricter typed implementations.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T21:14:02.899Z, excerpt_hash=sha256:61aa9d409868dcc84879c6961859b564e2da8607384ed6131282552ceb747278
    
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
### 2026-04-19T21:19:08.422Z — VERIFY — ok

By: CODER

Note: Verified: bun run lint:core, bun run --filter=@agentplaneorg/core build, bun run --filter=agentplane build, and focused vitest for run-process, guard commands, and release metadata all passed after replacing the reported lint offenders with stricter typed implementations.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T21:14:02.899Z, excerpt_hash=sha256:61aa9d409868dcc84879c6961859b564e2da8607384ed6131282552ceb747278

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
