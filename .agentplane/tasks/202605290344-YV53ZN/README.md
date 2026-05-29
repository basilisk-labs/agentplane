---
id: "202605290344-YV53ZN"
title: "PR review template hosted formatting decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T03:44:27.700Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract hosted GitHub verification markdown formatting helpers from review-template.ts while preserving PR artifact rendering."
events:
  -
    type: "status"
    at: "2026-05-29T03:44:48.647Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract hosted GitHub verification markdown formatting helpers from review-template.ts while preserving PR artifact rendering."
doc_version: 3
doc_updated_at: "2026-05-29T03:44:48.647Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/pr/internal/review-template.ts by extracting hosted GitHub verification markdown command-wrapping helpers into a focused module, preserving PR artifact rendering and validation behavior while reducing hotspot count."
sections:
  Summary: |-
    PR review template hosted formatting decomposition

    Decompose packages/agentplane/src/commands/pr/internal/review-template.ts by extracting hosted GitHub verification markdown command-wrapping helpers into a focused module, preserving PR artifact rendering and validation behavior while reducing hotspot count.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/pr/internal/review-template.ts by extracting hosted GitHub verification markdown command-wrapping helpers into a focused module, preserving PR artifact rendering and validation behavior while reducing hotspot count.
    - Out of scope: unrelated refactors not required for "PR review template hosted formatting decomposition".
  Plan: |-
    Refactor PR review template hotspot with one behavior-preserving extraction.

    Scope:
    - Extract hosted GitHub verification markdown formatting helpers from packages/agentplane/src/commands/pr/internal/review-template.ts into a focused internal module.
    - Preserve review.md/github-body.md rendering, long verification bullet wrapping, shell command detection, and validation behavior.
    - Keep review-template.ts below the 400-line runtime hotspot warning threshold.

    Verify:
    - Run bunx vitest run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts --config vitest.workspace.ts.
    - Run bun run typecheck.
    - Run bun run arch:check.
    - Run bun run knip:check.
    - Run bun run lint:core.
    - Run bun run format:changed.
    - Run bun run hotspots:check and confirm runtime hotspot warnings decrease from 17 to 16.
  Verify Steps: |-
    PLANNER fallback scaffold for "PR review template hosted formatting decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "PR review template hosted formatting decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
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

PR review template hosted formatting decomposition

Decompose packages/agentplane/src/commands/pr/internal/review-template.ts by extracting hosted GitHub verification markdown command-wrapping helpers into a focused module, preserving PR artifact rendering and validation behavior while reducing hotspot count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/pr/internal/review-template.ts by extracting hosted GitHub verification markdown command-wrapping helpers into a focused module, preserving PR artifact rendering and validation behavior while reducing hotspot count.
- Out of scope: unrelated refactors not required for "PR review template hosted formatting decomposition".

## Plan

Refactor PR review template hotspot with one behavior-preserving extraction.

Scope:
- Extract hosted GitHub verification markdown formatting helpers from packages/agentplane/src/commands/pr/internal/review-template.ts into a focused internal module.
- Preserve review.md/github-body.md rendering, long verification bullet wrapping, shell command detection, and validation behavior.
- Keep review-template.ts below the 400-line runtime hotspot warning threshold.

Verify:
- Run bunx vitest run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts --config vitest.workspace.ts.
- Run bun run typecheck.
- Run bun run arch:check.
- Run bun run knip:check.
- Run bun run lint:core.
- Run bun run format:changed.
- Run bun run hotspots:check and confirm runtime hotspot warnings decrease from 17 to 16.

## Verify Steps

PLANNER fallback scaffold for "PR review template hosted formatting decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "PR review template hosted formatting decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
