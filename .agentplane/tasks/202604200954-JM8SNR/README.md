---
id: "202604200954-JM8SNR"
title: "Reach script-runtime adoption threshold"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "refactor"
  - "scripts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T09:55:00.887Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T09:56:32.090Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/check-github-protection-contract-script.test.ts -> 4 passed. Command: bun run format:check -> pass. Command: bun run lint:core -> pass. Command: runtime adoption count -> 15 executable scripts."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: migrate the GitHub protection contract script as the final adoption-threshold atom for F′."
events:
  -
    type: "status"
    at: "2026-04-20T09:55:01.332Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the GitHub protection contract script as the final adoption-threshold atom for F′."
  -
    type: "verify"
    at: "2026-04-20T09:56:32.090Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/check-github-protection-contract-script.test.ts -> 4 passed. Command: bun run format:check -> pass. Command: bun run lint:core -> pass. Command: runtime adoption count -> 15 executable scripts."
doc_version: 3
doc_updated_at: "2026-04-20T09:56:32.101Z"
doc_updated_by: "CODER"
description: "Migrate the GitHub protection contract checker to defineScript and parseScriptArgs so F′ reaches at least 15 runtime-backed scripts."
sections:
  Summary: |-
    Reach script-runtime adoption threshold
    
    Migrate the GitHub protection contract checker to defineScript and parseScriptArgs so F′ reaches at least 15 runtime-backed scripts.
  Scope: |-
    - In scope: Migrate the GitHub protection contract checker to defineScript and parseScriptArgs so F′ reaches at least 15 runtime-backed scripts.
    - Out of scope: unrelated refactors not required for "Reach script-runtime adoption threshold".
  Plan: |-
    1. Migrate scripts/check-github-protection-contract.mjs to defineScript + parseScriptArgs.
    2. Preserve help, repo, branch behavior and existing script test expectations.
    3. Run the existing check-github-protection-contract script test plus format/lint.
    4. Confirm script-runtime adoption count is at least 15 scripts, then commit and finish.
  Verify Steps: |-
    1. Review the requested outcome for "Reach script-runtime adoption threshold". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T09:56:32.090Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/check-github-protection-contract-script.test.ts -> 4 passed. Command: bun run format:check -> pass. Command: bun run lint:core -> pass. Command: runtime adoption count -> 15 executable scripts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:55:01.344Z, excerpt_hash=sha256:057efde6462dadca08aafd891fd3b9278c9898424058f2b9e987655ac4bc9506
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Reach script-runtime adoption threshold

Migrate the GitHub protection contract checker to defineScript and parseScriptArgs so F′ reaches at least 15 runtime-backed scripts.

## Scope

- In scope: Migrate the GitHub protection contract checker to defineScript and parseScriptArgs so F′ reaches at least 15 runtime-backed scripts.
- Out of scope: unrelated refactors not required for "Reach script-runtime adoption threshold".

## Plan

1. Migrate scripts/check-github-protection-contract.mjs to defineScript + parseScriptArgs.
2. Preserve help, repo, branch behavior and existing script test expectations.
3. Run the existing check-github-protection-contract script test plus format/lint.
4. Confirm script-runtime adoption count is at least 15 scripts, then commit and finish.

## Verify Steps

1. Review the requested outcome for "Reach script-runtime adoption threshold". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T09:56:32.090Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/check-github-protection-contract-script.test.ts -> 4 passed. Command: bun run format:check -> pass. Command: bun run lint:core -> pass. Command: runtime adoption count -> 15 executable scripts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T09:55:01.344Z, excerpt_hash=sha256:057efde6462dadca08aafd891fd3b9278c9898424058f2b9e987655ac4bc9506

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
