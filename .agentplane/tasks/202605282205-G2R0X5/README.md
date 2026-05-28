---
id: "202605282205-G2R0X5"
title: "Evidence command decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "evidence"
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T22:05:53.180Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T22:09:48.642Z"
  updated_by: "CODER"
  note: "Verification passed. Commands: bunx vitest run packages/agentplane/src/commands/evidence/evidence.command.test.ts --config vitest.workspace.ts (1 file, 3 tests passed); bun run typecheck (passed); bun run arch:deps (no dependency violations); bun run lint:core (passed); bun run format:changed (passed); node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300 (passed, runtime warnings 41 -> 40)."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T22:10:10.815Z"
  updated_by: "EVALUATOR"
  note: "Evidence command decomposition preserves bundle and verify behavior while reducing hotspot pressure."
  evaluated_sha: "1df942c762de20d0efc3755b479e77b65016a43f"
  blueprint_digest: "1bd060a0b4b971863019a1e5050f7387ce4c4186ae9244987b96e47f47a70ad3"
  evidence_refs:
    - ".agentplane/tasks/202605282205-G2R0X5/README.md"
    - ".agentplane/tasks/202605282205-G2R0X5/quality/20260528-221010815-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605282205-G2R0X5/quality/20260528-221010815-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605282205-G2R0X5/quality/20260528-221010815-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605282205-G2R0X5/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/evidence/evidence.command.ts"
    - "packages/agentplane/src/commands/evidence/evidence-manifest.ts"
  findings:
    - "evidence.command.ts now contains command specs and handlers only; evidence-manifest.ts owns manifest types, path resolution, hashing, digest verification, and trust extension helpers. Focused evidence tests, arch:deps, typecheck, lint:core, format:changed, and hotspot report passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose evidence command into focused acyclic helpers while preserving bundle and verify contracts."
events:
  -
    type: "status"
    at: "2026-05-28T22:06:12.907Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose evidence command into focused acyclic helpers while preserving bundle and verify contracts."
  -
    type: "verify"
    at: "2026-05-28T22:09:48.642Z"
    author: "CODER"
    state: "ok"
    note: "Verification passed. Commands: bunx vitest run packages/agentplane/src/commands/evidence/evidence.command.test.ts --config vitest.workspace.ts (1 file, 3 tests passed); bun run typecheck (passed); bun run arch:deps (no dependency violations); bun run lint:core (passed); bun run format:changed (passed); node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300 (passed, runtime warnings 41 -> 40)."
doc_version: 3
doc_updated_at: "2026-05-28T22:09:48.667Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/evidence/evidence.command.ts into focused manifest/build/verify helpers while preserving evidence bundle and verify behavior. Reduce hotspot warnings and keep helper imports acyclic. Verify with evidence command tests, typecheck, lint, arch deps, format, and hotspot report."
sections:
  Summary: |-
    Evidence command decomposition

    Decompose packages/agentplane/src/commands/evidence/evidence.command.ts into focused manifest/build/verify helpers while preserving evidence bundle and verify behavior. Reduce hotspot warnings and keep helper imports acyclic. Verify with evidence command tests, typecheck, lint, arch deps, format, and hotspot report.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/evidence/evidence.command.ts into focused manifest/build/verify helpers while preserving evidence bundle and verify behavior. Reduce hotspot warnings and keep helper imports acyclic. Verify with evidence command tests, typecheck, lint, arch deps, format, and hotspot report.
    - Out of scope: unrelated refactors not required for "Evidence command decomposition".
  Plan: |-
    Plan:
    1. Start the branch_pr task worktree from route guidance.
    2. Split evidence.command.ts into focused modules: keep command specs/handlers in evidence.command.ts, move manifest construction/path/hash utilities and verification/trust helpers into focused acyclic modules.
    3. Preserve evidence bundle and verify CLI outputs, JSON shapes, manifest digest canonicalization, and repository-root path validation.
    4. Run focused evidence tests plus arch:deps, typecheck, lint:core, format:changed, and hotspot-report.
    5. Record verification and evaluator evidence, open PR, wait for hosted checks, merge into main, and close lifecycle.
  Verify Steps: |-
    PLANNER fallback scaffold for "Evidence command decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Evidence command decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T22:09:48.642Z — VERIFY — ok

    By: CODER

    Note: Verification passed. Commands: bunx vitest run packages/agentplane/src/commands/evidence/evidence.command.test.ts --config vitest.workspace.ts (1 file, 3 tests passed); bun run typecheck (passed); bun run arch:deps (no dependency violations); bun run lint:core (passed); bun run format:changed (passed); node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300 (passed, runtime warnings 41 -> 40).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T22:06:12.907Z, excerpt_hash=sha256:0e9766240190b70641c87ecc799595bd389bcacb320e89549f8fad41a9448836

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282205-G2R0X5-evidence-command-decomposition/.agentplane/tasks/202605282205-G2R0X5/blueprint/resolved-snapshot.json
    - old_digest: 1bd060a0b4b971863019a1e5050f7387ce4c4186ae9244987b96e47f47a70ad3
    - current_digest: 1bd060a0b4b971863019a1e5050f7387ce4c4186ae9244987b96e47f47a70ad3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282205-G2R0X5

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Split evidence command manifest/hash/path/verify helpers into evidence-manifest.ts; evidence.command.ts is now 241 lines and the helper is 297 lines.
      Impact: Preserves evidence bundle/verify contracts while removing one runtime hotspot from the warning list.
      Resolution: Focused tests and architecture/type/lint/format/hotspot gates passed.
id_source: "generated"
---
## Summary

Evidence command decomposition

Decompose packages/agentplane/src/commands/evidence/evidence.command.ts into focused manifest/build/verify helpers while preserving evidence bundle and verify behavior. Reduce hotspot warnings and keep helper imports acyclic. Verify with evidence command tests, typecheck, lint, arch deps, format, and hotspot report.

## Scope

- In scope: Decompose packages/agentplane/src/commands/evidence/evidence.command.ts into focused manifest/build/verify helpers while preserving evidence bundle and verify behavior. Reduce hotspot warnings and keep helper imports acyclic. Verify with evidence command tests, typecheck, lint, arch deps, format, and hotspot report.
- Out of scope: unrelated refactors not required for "Evidence command decomposition".

## Plan

Plan:
1. Start the branch_pr task worktree from route guidance.
2. Split evidence.command.ts into focused modules: keep command specs/handlers in evidence.command.ts, move manifest construction/path/hash utilities and verification/trust helpers into focused acyclic modules.
3. Preserve evidence bundle and verify CLI outputs, JSON shapes, manifest digest canonicalization, and repository-root path validation.
4. Run focused evidence tests plus arch:deps, typecheck, lint:core, format:changed, and hotspot-report.
5. Record verification and evaluator evidence, open PR, wait for hosted checks, merge into main, and close lifecycle.

## Verify Steps

PLANNER fallback scaffold for "Evidence command decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Evidence command decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T22:09:48.642Z — VERIFY — ok

By: CODER

Note: Verification passed. Commands: bunx vitest run packages/agentplane/src/commands/evidence/evidence.command.test.ts --config vitest.workspace.ts (1 file, 3 tests passed); bun run typecheck (passed); bun run arch:deps (no dependency violations); bun run lint:core (passed); bun run format:changed (passed); node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300 (passed, runtime warnings 41 -> 40).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T22:06:12.907Z, excerpt_hash=sha256:0e9766240190b70641c87ecc799595bd389bcacb320e89549f8fad41a9448836

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282205-G2R0X5-evidence-command-decomposition/.agentplane/tasks/202605282205-G2R0X5/blueprint/resolved-snapshot.json
- old_digest: 1bd060a0b4b971863019a1e5050f7387ce4c4186ae9244987b96e47f47a70ad3
- current_digest: 1bd060a0b4b971863019a1e5050f7387ce4c4186ae9244987b96e47f47a70ad3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282205-G2R0X5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Split evidence command manifest/hash/path/verify helpers into evidence-manifest.ts; evidence.command.ts is now 241 lines and the helper is 297 lines.
  Impact: Preserves evidence bundle/verify contracts while removing one runtime hotspot from the warning list.
  Resolution: Focused tests and architecture/type/lint/format/hotspot gates passed.
