---
id: "202607100021-S11TCN"
title: "Make context extraction packs compact and schema-complete for v0.6.22"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "extraction"
  - "patch-0.6.22"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run --filter=agentplane typecheck"
  - "bun run ci:contract"
  - "bun run lint"
  - "bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T00:21:27.026Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T00:43:26.990Z"
  updated_by: "CODER"
  note: "Focused extraction and release-readiness suite passed (65 tests); agentplane typecheck, lint:core, formatting, architecture, schemas, policy routing, Knip baseline, coverage thresholds, and ci:contract passed. Repository-wide lint:website remains an unchanged pre-existing baseline outside this diff and is recorded in Findings."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T00:45:03.849Z"
  updated_by: "EVALUATOR"
  note: "Extraction task packs are compact, schema-complete, and snapshot-backed."
  evaluated_sha: "246082a578c58d4a97182651d3b1a3fb5538db1d"
  blueprint_digest: "70e4ce0b42f580f8e29f021d9d52cb431b3b936193818b0b4497717661394564"
  evidence_refs:
    - ".agentplane/tasks/202607100021-S11TCN/README.md"
    - ".agentplane/tasks/202607100021-S11TCN/quality/20260710-004503849-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100021-S11TCN/quality/20260710-004503849-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100021-S11TCN/quality/20260710-004503849-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100021-S11TCN/blueprint/resolved-snapshot.json"
  findings:
    - "SGR v2 now fails incomplete page/topology payloads before writes while legacy v1 remains compatible; generated packs expose a valid contract plus deterministic current-context candidates, and prompt size budgets are enforced."
commit:
  hash: "9a3f81dc9ec45fd25e7d70d534882ba37298ac64"
  message: "✅ S11TCN task: record hosted PR evidence"
comments:
  -
    author: "CODER"
    body: "Start: tighten the SGR v2 extraction contract, generate compact self-contained task artifacts, and enrich canonical snapshots with deterministic current-context evidence for the v0.6.22 patch."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-10T00:22:19.145Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten the SGR v2 extraction contract, generate compact self-contained task artifacts, and enrich canonical snapshots with deterministic current-context evidence for the v0.6.22 patch."
  -
    type: "verify"
    at: "2026-07-10T00:43:26.990Z"
    author: "CODER"
    state: "ok"
    note: "Focused extraction and release-readiness suite passed (65 tests); agentplane typecheck, lint:core, formatting, architecture, schemas, policy routing, Knip baseline, coverage thresholds, and ci:contract passed. Repository-wide lint:website remains an unchanged pre-existing baseline outside this diff and is recorded in Findings."
  -
    type: "status"
    at: "2026-07-10T00:48:53.738Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-10T00:48:53.739Z"
doc_updated_by: "CODER"
description: "Tighten the SGR v2 context_extraction contract for entity resolution, page creation, and topology decisions; generate a complete compact extraction contract; enrich canonical task snapshots with current surface counts/digests/candidates; reduce duplicated prompt prose while keeping generated CURATOR tasks portable and self-contained."
sections:
  Summary: |-
    Make context extraction packs compact and schema-complete for v0.6.22

    Tighten the SGR v2 context_extraction contract for entity resolution, page creation, and topology decisions; generate a complete compact extraction contract; enrich canonical task snapshots with current surface counts/digests/candidates; reduce duplicated prompt prose while keeping generated CURATOR tasks portable and self-contained.
  Scope: |-
    - In scope: Tighten the SGR v2 context_extraction contract for entity resolution, page creation, and topology decisions; generate a complete compact extraction contract; enrich canonical task snapshots with current surface counts/digests/candidates; reduce duplicated prompt prose while keeping generated CURATOR tasks portable and self-contained.
    - Out of scope: unrelated refactors not required for "Make context extraction packs compact and schema-complete for v0.6.22".
  Plan: "1. Replace open-ended SGR v2 ontology payloads with typed schemas and validators aligned with maximum-assimilation artifact gates while preserving legacy v1 compatibility. 2. Add one reusable compact schema-complete extraction example/contract and consume it from task-history and ingest task generation. 3. Extend context task packs with an extraction-contract artifact and a canonical snapshot containing deterministic counts, digests, and bounded existing entity/page candidates. 4. Trim repeated prose from generated prompt modules and point agents to the task-bound contract/snapshot without removing lifecycle, safety, linking, provenance, or verification requirements. 5. Add regression tests for incomplete v2 rejection, legacy compatibility, snapshot determinism/content, complete prompt contract, and prompt size budget. 6. Run focused tests, typecheck, lint, ci:contract, record verification, publish a main-based PR, and integrate through the protected merge lane."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run --filter=agentplane typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run ci:contract`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T00:43:26.990Z — VERIFY — ok

    By: CODER

    Note: Focused extraction and release-readiness suite passed (65 tests); agentplane typecheck, lint:core, formatting, architecture, schemas, policy routing, Knip baseline, coverage thresholds, and ci:contract passed. Repository-wide lint:website remains an unchanged pre-existing baseline outside this diff and is recorded in Findings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T00:42:11.388Z, excerpt_hash=sha256:ea04f8b33d1e5fe807e9106c6e20c8bcd847d4b537041052b262345d5e824e0e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100021-S11TCN-make-context-extraction-packs-compact-and-schema/.agentplane/tasks/202607100021-S11TCN/blueprint/resolved-snapshot.json
    - old_digest: 70e4ce0b42f580f8e29f021d9d52cb431b3b936193818b0b4497717661394564
    - current_digest: 70e4ce0b42f580f8e29f021d9d52cb431b3b936193818b0b4497717661394564
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100021-S11TCN

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607100021-S11TCN
    - diagnostic_command: agentplane pr check 202607100021-S11TCN
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The repository-wide bun run lint command reaches lint:website and reports 45 pre-existing Docusaurus/website lint errors; git diff --quiet -- website confirms this task changes no website files.
      Impact: The global lint aggregate is not a usable pass/fail signal for this core context task, although the task-scoped core lint and ci:contract checks are clean.
      Resolution: Use bun run lint:core and bun run ci:contract as the scoped evidence for this task; retain the website baseline for the dedicated v0.6.22 quality backlog instead of widening this PR.
      Promotion: incident-candidate
      Fixability: repo-fixable
extensions:
  implementation_commit:
    hash: "246082a578c58d4a97182651d3b1a3fb5538db1d"
    message: "🚀 S11TCN context: tighten extraction task packs"
id_source: "generated"
---
## Summary

Make context extraction packs compact and schema-complete for v0.6.22

Tighten the SGR v2 context_extraction contract for entity resolution, page creation, and topology decisions; generate a complete compact extraction contract; enrich canonical task snapshots with current surface counts/digests/candidates; reduce duplicated prompt prose while keeping generated CURATOR tasks portable and self-contained.

## Scope

- In scope: Tighten the SGR v2 context_extraction contract for entity resolution, page creation, and topology decisions; generate a complete compact extraction contract; enrich canonical task snapshots with current surface counts/digests/candidates; reduce duplicated prompt prose while keeping generated CURATOR tasks portable and self-contained.
- Out of scope: unrelated refactors not required for "Make context extraction packs compact and schema-complete for v0.6.22".

## Plan

1. Replace open-ended SGR v2 ontology payloads with typed schemas and validators aligned with maximum-assimilation artifact gates while preserving legacy v1 compatibility. 2. Add one reusable compact schema-complete extraction example/contract and consume it from task-history and ingest task generation. 3. Extend context task packs with an extraction-contract artifact and a canonical snapshot containing deterministic counts, digests, and bounded existing entity/page candidates. 4. Trim repeated prose from generated prompt modules and point agents to the task-bound contract/snapshot without removing lifecycle, safety, linking, provenance, or verification requirements. 5. Add regression tests for incomplete v2 rejection, legacy compatibility, snapshot determinism/content, complete prompt contract, and prompt size budget. 6. Run focused tests, typecheck, lint, ci:contract, record verification, publish a main-based PR, and integrate through the protected merge lane.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/context/ingest-task-pack.test.ts packages/agentplane/src/commands/context/harvest-tasks.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run --filter=agentplane typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run lint`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run ci:contract`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T00:43:26.990Z — VERIFY — ok

By: CODER

Note: Focused extraction and release-readiness suite passed (65 tests); agentplane typecheck, lint:core, formatting, architecture, schemas, policy routing, Knip baseline, coverage thresholds, and ci:contract passed. Repository-wide lint:website remains an unchanged pre-existing baseline outside this diff and is recorded in Findings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T00:42:11.388Z, excerpt_hash=sha256:ea04f8b33d1e5fe807e9106c6e20c8bcd847d4b537041052b262345d5e824e0e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100021-S11TCN-make-context-extraction-packs-compact-and-schema/.agentplane/tasks/202607100021-S11TCN/blueprint/resolved-snapshot.json
- old_digest: 70e4ce0b42f580f8e29f021d9d52cb431b3b936193818b0b4497717661394564
- current_digest: 70e4ce0b42f580f8e29f021d9d52cb431b3b936193818b0b4497717661394564
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100021-S11TCN

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607100021-S11TCN
- diagnostic_command: agentplane pr check 202607100021-S11TCN
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The repository-wide bun run lint command reaches lint:website and reports 45 pre-existing Docusaurus/website lint errors; git diff --quiet -- website confirms this task changes no website files.
  Impact: The global lint aggregate is not a usable pass/fail signal for this core context task, although the task-scoped core lint and ci:contract checks are clean.
  Resolution: Use bun run lint:core and bun run ci:contract as the scoped evidence for this task; retain the website baseline for the dedicated v0.6.22 quality backlog instead of widening this PR.
  Promotion: incident-candidate
  Fixability: repo-fixable
