---
id: "202604211313-G34KY8"
title: "Add hotspot warning threshold at 400 LoC"
result_summary: "Added runtime hotspot warning threshold."
status: "DONE"
priority: "low"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "ci"
  - "tooling"
verify:
  - "bun run hotspots:check"
  - "node scripts/hotspot-report.mjs --check --oversized-lines 600"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:47.657Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T13:42:51.442Z"
  updated_by: "CODER"
  note: "Command: bun run hotspots:check; Result: pass; Evidence: warning threshold printed 17 runtime warnings and hard threshold passed. Command: node scripts/hotspot-report.mjs --check --oversized-lines 600; Result: pass via updated hotspot check path. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/hotspot-report-script.test.ts --pool=forks --maxWorkers 4; Result: pass, 18 assertions across workspace projects."
commit:
  hash: "b1488267692af231468d94b7c8f11a3436e627e7"
  message: "🧰 tooling: add hotspot and scripts docs guards"
comments:
  -
    author: "CODER"
    body: "Start: ввод двух порогов hotspot (warning/error) без ужесточения текущего CI-провала и с сохранением обратной совместимости CLI."
  -
    author: "CODER"
    body: "Verified: hotspot warning threshold is active, hard threshold still passes, and hotspot-report tests pass."
events:
  -
    type: "status"
    at: "2026-04-21T13:21:15.120Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: ввод двух порогов hotspot (warning/error) без ужесточения текущего CI-провала и с сохранением обратной совместимости CLI."
  -
    type: "verify"
    at: "2026-04-21T13:42:51.442Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run hotspots:check; Result: pass; Evidence: warning threshold printed 17 runtime warnings and hard threshold passed. Command: node scripts/hotspot-report.mjs --check --oversized-lines 600; Result: pass via updated hotspot check path. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/hotspot-report-script.test.ts --pool=forks --maxWorkers 4; Result: pass, 18 assertions across workspace projects."
  -
    type: "status"
    at: "2026-04-21T13:43:05.880Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: hotspot warning threshold is active, hard threshold still passes, and hotspot-report tests pass."
doc_version: 3
doc_updated_at: "2026-04-21T13:43:05.881Z"
doc_updated_by: "CODER"
description: "Extend hotspot reporting with a two-level threshold: warning at 400 LoC and error at 600 LoC, without making existing warnings fail CI."
sections:
  Summary: |-
    Add hotspot warning threshold at 400 LoC
    
    Extend hotspot reporting with a two-level threshold: warning at 400 LoC and error at 600 LoC, without making existing warnings fail CI.
  Scope: |-
    - In scope: Extend hotspot reporting with a two-level threshold: warning at 400 LoC and error at 600 LoC, without making existing warnings fail CI.
    - Out of scope: unrelated refactors not required for "Add hotspot warning threshold at 400 LoC".
  Plan: "Scope: expose medium-sized files before they become hard failures. Steps: 1. Add a warning threshold option/default around 400 LoC. 2. Print warning inventory separately from error inventory. 3. Keep current error behavior at 600. 4. Update docs or help output. Acceptance: current check passes, warning list is visible, and files over 600 still fail."
  Verify Steps: |-
    1. Review the requested outcome for "Add hotspot warning threshold at 400 LoC". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T13:42:51.442Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run hotspots:check; Result: pass; Evidence: warning threshold printed 17 runtime warnings and hard threshold passed. Command: node scripts/hotspot-report.mjs --check --oversized-lines 600; Result: pass via updated hotspot check path. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/hotspot-report-script.test.ts --pool=forks --maxWorkers 4; Result: pass, 18 assertions across workspace projects.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:21:15.151Z, excerpt_hash=sha256:eb0448b66c15b010e2f039943a670ac06cb025730766d8492559181d98e261d6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add hotspot warning threshold at 400 LoC

Extend hotspot reporting with a two-level threshold: warning at 400 LoC and error at 600 LoC, without making existing warnings fail CI.

## Scope

- In scope: Extend hotspot reporting with a two-level threshold: warning at 400 LoC and error at 600 LoC, without making existing warnings fail CI.
- Out of scope: unrelated refactors not required for "Add hotspot warning threshold at 400 LoC".

## Plan

Scope: expose medium-sized files before they become hard failures. Steps: 1. Add a warning threshold option/default around 400 LoC. 2. Print warning inventory separately from error inventory. 3. Keep current error behavior at 600. 4. Update docs or help output. Acceptance: current check passes, warning list is visible, and files over 600 still fail.

## Verify Steps

1. Review the requested outcome for "Add hotspot warning threshold at 400 LoC". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T13:42:51.442Z — VERIFY — ok

By: CODER

Note: Command: bun run hotspots:check; Result: pass; Evidence: warning threshold printed 17 runtime warnings and hard threshold passed. Command: node scripts/hotspot-report.mjs --check --oversized-lines 600; Result: pass via updated hotspot check path. Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/hotspot-report-script.test.ts --pool=forks --maxWorkers 4; Result: pass, 18 assertions across workspace projects.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:21:15.151Z, excerpt_hash=sha256:eb0448b66c15b010e2f039943a670ac06cb025730766d8492559181d98e261d6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
