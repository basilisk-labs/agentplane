---
id: "202605290018-081TPS"
title: "Context ingest pipeline decomposition"
result_summary: "Merged via PR #4242."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T00:19:03.124Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T00:26:02.622Z"
  updated_by: "CODER"
  note: "Verified context ingest pipeline decomposition. Commands passed: focused context ingest tests (issue-gates.unit.test.ts and release-readiness.test.ts), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 31 to 30; ingest.ts is 167 lines."
  attempts: 0
commit:
  hash: "6310a47f7b7cda61ebdbc8886b3c62cdfb4d8322"
  message: "✅ 081TPS context: record verification"
comments:
  -
    author: "CODER"
    body: "Start: Decompose context ingest manifest and source collection helpers while preserving cmdContextIngest behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4242 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T00:19:20.810Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Decompose context ingest manifest and source collection helpers while preserving cmdContextIngest behavior."
  -
    type: "verify"
    at: "2026-05-29T00:26:02.622Z"
    author: "CODER"
    state: "ok"
    note: "Verified context ingest pipeline decomposition. Commands passed: focused context ingest tests (issue-gates.unit.test.ts and release-readiness.test.ts), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 31 to 30; ingest.ts is 167 lines."
  -
    type: "status"
    at: "2026-05-29T00:29:17.797Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4242 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T00:29:17.802Z"
doc_updated_by: "INTEGRATOR"
description: "Decompose packages/agentplane/src/context/ingest.ts into focused ingestion pipeline modules while preserving context ingest behavior and reducing runtime hotspot warnings."
sections:
  Summary: |-
    Context ingest pipeline decomposition

    Decompose packages/agentplane/src/context/ingest.ts into focused ingestion pipeline modules while preserving context ingest behavior and reducing runtime hotspot warnings.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/context/ingest.ts into focused ingestion pipeline modules while preserving context ingest behavior and reducing runtime hotspot warnings.
    - Out of scope: unrelated refactors not required for "Context ingest pipeline decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER.
    2. Extract context ingest manifest/model helpers and source collection helpers from packages/agentplane/src/context/ingest.ts into focused modules.
    3. Keep cmdContextIngest as the orchestration facade and preserve existing public command types.
    4. Verify with focused context ingest tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean the worktree.

    Acceptance:
    - context ingest behavior remains compatible.
    - ingest.ts drops below the 400-line hotspot warning threshold.
    - runtime hotspot warning count decreases from 31 to 30 without adding new warning-sized runtime modules.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T00:26:02.622Z — VERIFY — ok

    By: CODER

    Note: Verified context ingest pipeline decomposition. Commands passed: focused context ingest tests (issue-gates.unit.test.ts and release-readiness.test.ts), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 31 to 30; ingest.ts is 167 lines.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T00:19:20.810Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605290018-081TPS-context-ingest-decomposition/.agentplane/tasks/202605290018-081TPS/blueprint/resolved-snapshot.json
    - old_digest: 2185036efd0fb64381acf307414028201b01e71bcaaebd10455d995359e6692d
    - current_digest: 2185036efd0fb64381acf307414028201b01e71bcaaebd10455d995359e6692d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290018-081TPS

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Context ingest pipeline decomposition

Decompose packages/agentplane/src/context/ingest.ts into focused ingestion pipeline modules while preserving context ingest behavior and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/context/ingest.ts into focused ingestion pipeline modules while preserving context ingest behavior and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Context ingest pipeline decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER.
2. Extract context ingest manifest/model helpers and source collection helpers from packages/agentplane/src/context/ingest.ts into focused modules.
3. Keep cmdContextIngest as the orchestration facade and preserve existing public command types.
4. Verify with focused context ingest tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean the worktree.

Acceptance:
- context ingest behavior remains compatible.
- ingest.ts drops below the 400-line hotspot warning threshold.
- runtime hotspot warning count decreases from 31 to 30 without adding new warning-sized runtime modules.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T00:26:02.622Z — VERIFY — ok

By: CODER

Note: Verified context ingest pipeline decomposition. Commands passed: focused context ingest tests (issue-gates.unit.test.ts and release-readiness.test.ts), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 31 to 30; ingest.ts is 167 lines.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T00:19:20.810Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605290018-081TPS-context-ingest-decomposition/.agentplane/tasks/202605290018-081TPS/blueprint/resolved-snapshot.json
- old_digest: 2185036efd0fb64381acf307414028201b01e71bcaaebd10455d995359e6692d
- current_digest: 2185036efd0fb64381acf307414028201b01e71bcaaebd10455d995359e6692d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290018-081TPS

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
