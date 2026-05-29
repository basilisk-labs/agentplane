---
id: "202605290353-Q8W0E9"
title: "PR sync batch ownership decomposition"
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
  updated_at: "2026-05-29T03:53:22.312Z"
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
    body: "Start: extract PR sync branch_pr batch ownership helpers into a focused internal module while preserving sync behavior."
events:
  -
    type: "status"
    at: "2026-05-29T03:53:36.929Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract PR sync branch_pr batch ownership helpers into a focused internal module while preserving sync behavior."
doc_version: 3
doc_updated_at: "2026-05-29T03:53:36.929Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/pr/internal/sync.ts by extracting branch_pr batch ownership helpers into a focused internal module, preserving PR sync behavior while reducing runtime hotspot count."
sections:
  Summary: |-
    PR sync batch ownership decomposition

    Decompose packages/agentplane/src/commands/pr/internal/sync.ts by extracting branch_pr batch ownership helpers into a focused internal module, preserving PR sync behavior while reducing runtime hotspot count.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/pr/internal/sync.ts by extracting branch_pr batch ownership helpers into a focused internal module, preserving PR sync behavior while reducing runtime hotspot count.
    - Out of scope: unrelated refactors not required for "PR sync batch ownership decomposition".
  Plan: |-
    Refactor PR sync hotspot with one behavior-preserving extraction.

    Scope:
    - Extract branch_pr batch ownership helpers from packages/agentplane/src/commands/pr/internal/sync.ts into a focused internal module.
    - Preserve included-task normalization, primary/included extension writes, stale ownership cleanup, and sync open/update behavior.
    - Keep sync.ts below the 400-line runtime hotspot warning threshold.

    Verify:
    - Run bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts --config vitest.workspace.ts.
    - Run bun run typecheck.
    - Run bun run arch:check.
    - Run bun run knip:check.
    - Run bun run lint:core.
    - Run bun run format:changed.
    - Run bun run hotspots:check and confirm runtime hotspot warnings decrease from 16 to 15.
  Verify Steps: |-
    PLANNER fallback scaffold for "PR sync batch ownership decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "PR sync batch ownership decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
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

PR sync batch ownership decomposition

Decompose packages/agentplane/src/commands/pr/internal/sync.ts by extracting branch_pr batch ownership helpers into a focused internal module, preserving PR sync behavior while reducing runtime hotspot count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/pr/internal/sync.ts by extracting branch_pr batch ownership helpers into a focused internal module, preserving PR sync behavior while reducing runtime hotspot count.
- Out of scope: unrelated refactors not required for "PR sync batch ownership decomposition".

## Plan

Refactor PR sync hotspot with one behavior-preserving extraction.

Scope:
- Extract branch_pr batch ownership helpers from packages/agentplane/src/commands/pr/internal/sync.ts into a focused internal module.
- Preserve included-task normalization, primary/included extension writes, stale ownership cleanup, and sync open/update behavior.
- Keep sync.ts below the 400-line runtime hotspot warning threshold.

Verify:
- Run bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts --config vitest.workspace.ts.
- Run bun run typecheck.
- Run bun run arch:check.
- Run bun run knip:check.
- Run bun run lint:core.
- Run bun run format:changed.
- Run bun run hotspots:check and confirm runtime hotspot warnings decrease from 16 to 15.

## Verify Steps

PLANNER fallback scaffold for "PR sync batch ownership decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "PR sync batch ownership decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
