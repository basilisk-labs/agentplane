---
id: "202604301809-MFVAF2"
title: "Add GPT-5.5 prompt contract diagnostics"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604301809-TCWHAZ"
tags:
  - "prompt-assembly"
verify:
  - "bun run agents:check"
  - "bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/runtime/prompt-fragments/json.test.ts packages/agentplane/src/runtime/prompt-fragments/markdown.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T18:09:12.188Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-30T18:23:02.224Z"
  updated_by: "CODER"
  note: "Verified: GPT-5.5 prompt contract diagnostics added; focused prompt-module and fragment tests pass; agents templates OK; typecheck OK; framework bootstrap OK; git diff check OK."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add focused GPT-5.5 prompt contract diagnostics without changing active prompt behavior; keep checks scoped to prompt module/profile surfaces."
events:
  -
    type: "status"
    at: "2026-04-30T18:19:06.107Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add focused GPT-5.5 prompt contract diagnostics without changing active prompt behavior; keep checks scoped to prompt module/profile surfaces."
  -
    type: "verify"
    at: "2026-04-30T18:23:02.224Z"
    author: "CODER"
    state: "ok"
    note: "Verified: GPT-5.5 prompt contract diagnostics added; focused prompt-module and fragment tests pass; agents templates OK; typecheck OK; framework bootstrap OK; git diff check OK."
doc_version: 3
doc_updated_at: "2026-04-30T18:23:02.231Z"
doc_updated_by: "CODER"
description: "Add a focused diagnostic/test surface that detects prompt contracts that are still procedural or conflict-prone: missing outcome sections, heuristic MUST usage, duplicate approval gates, missing validation commands, unstable fragment IDs, or missing stop rules."
sections:
  Summary: |-
    Add GPT-5.5 prompt contract diagnostics
    
    Add a focused diagnostic/test surface that detects prompt contracts that are still procedural or conflict-prone: missing outcome sections, heuristic MUST usage, duplicate approval gates, missing validation commands, unstable fragment IDs, or missing stop rules.
  Scope: |-
    - In scope: Add a focused diagnostic/test surface that detects prompt contracts that are still procedural or conflict-prone: missing outcome sections, heuristic MUST usage, duplicate approval gates, missing validation commands, unstable fragment IDs, or missing stop rules.
    - Out of scope: unrelated refactors not required for "Add GPT-5.5 prompt contract diagnostics".
  Plan: |-
    1. Add the smallest diagnostic or test layer over existing prompt fragment/module registry code.
    2. Cover GPT-5.5 contract risks without inventing a parallel prompt assembly path.
    3. Keep checks deterministic and fragment-id based.
    4. Verify with targeted prompt module/fragment tests, agents:check, and git diff --check.
  Verify Steps: |-
    1. Review the requested outcome for "Add GPT-5.5 prompt contract diagnostics". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-30T18:23:02.224Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: GPT-5.5 prompt contract diagnostics added; focused prompt-module and fragment tests pass; agents templates OK; typecheck OK; framework bootstrap OK; git diff check OK.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T18:19:06.107Z, excerpt_hash=sha256:178a150dc126f384561dd8dce969ee032d049b815fe489b65ee70bd8a6ee1ee3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add GPT-5.5 prompt contract diagnostics

Add a focused diagnostic/test surface that detects prompt contracts that are still procedural or conflict-prone: missing outcome sections, heuristic MUST usage, duplicate approval gates, missing validation commands, unstable fragment IDs, or missing stop rules.

## Scope

- In scope: Add a focused diagnostic/test surface that detects prompt contracts that are still procedural or conflict-prone: missing outcome sections, heuristic MUST usage, duplicate approval gates, missing validation commands, unstable fragment IDs, or missing stop rules.
- Out of scope: unrelated refactors not required for "Add GPT-5.5 prompt contract diagnostics".

## Plan

1. Add the smallest diagnostic or test layer over existing prompt fragment/module registry code.
2. Cover GPT-5.5 contract risks without inventing a parallel prompt assembly path.
3. Keep checks deterministic and fragment-id based.
4. Verify with targeted prompt module/fragment tests, agents:check, and git diff --check.

## Verify Steps

1. Review the requested outcome for "Add GPT-5.5 prompt contract diagnostics". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-30T18:23:02.224Z — VERIFY — ok

By: CODER

Note: Verified: GPT-5.5 prompt contract diagnostics added; focused prompt-module and fragment tests pass; agents templates OK; typecheck OK; framework bootstrap OK; git diff check OK.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-30T18:19:06.107Z, excerpt_hash=sha256:178a150dc126f384561dd8dce969ee032d049b815fe489b65ee70bd8a6ee1ee3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
