---
id: "202605290344-YV53ZN"
title: "PR review template hosted formatting decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "ok"
  updated_at: "2026-05-29T03:47:29.585Z"
  updated_by: "CODER"
  note: "Verified PR review template hosted formatting decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts --config vitest.workspace.ts (12 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 17 to 16; review-template.ts is 368 lines, below the 400-line warning threshold."
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
  -
    type: "verify"
    at: "2026-05-29T03:47:29.585Z"
    author: "CODER"
    state: "ok"
    note: "Verified PR review template hosted formatting decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts --config vitest.workspace.ts (12 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 17 to 16; review-template.ts is 368 lines, below the 400-line warning threshold."
doc_version: 3
doc_updated_at: "2026-05-29T03:47:29.621Z"
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
    ### 2026-05-29T03:47:29.585Z — VERIFY — ok

    By: CODER

    Note: Verified PR review template hosted formatting decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts --config vitest.workspace.ts (12 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 17 to 16; review-template.ts is 368 lines, below the 400-line warning threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T03:44:48.647Z, excerpt_hash=sha256:b41763129fb03e3e0651deff32949d9a535c9970a25473632887b59cbdc28d9e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290344-YV53ZN/blueprint/resolved-snapshot.json
    - old_digest: dd47b97593099f5d2eb206e9f738cbad5f0486f661708705740326c77fe01c14
    - current_digest: dd47b97593099f5d2eb206e9f738cbad5f0486f661708705740326c77fe01c14
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290344-YV53ZN

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
### 2026-05-29T03:47:29.585Z — VERIFY — ok

By: CODER

Note: Verified PR review template hosted formatting decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/pr/internal/review-template.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts --config vitest.workspace.ts (12 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 17 to 16; review-template.ts is 368 lines, below the 400-line warning threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T03:44:48.647Z, excerpt_hash=sha256:b41763129fb03e3e0651deff32949d9a535c9970a25473632887b59cbdc28d9e

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290344-YV53ZN/blueprint/resolved-snapshot.json
- old_digest: dd47b97593099f5d2eb206e9f738cbad5f0486f661708705740326c77fe01c14
- current_digest: dd47b97593099f5d2eb206e9f738cbad5f0486f661708705740326c77fe01c14
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290344-YV53ZN

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
