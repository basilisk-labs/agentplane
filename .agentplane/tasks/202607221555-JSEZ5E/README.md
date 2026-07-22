---
id: "202607221555-JSEZ5E"
title: "Delegate semantic entity reconciliation to the context executor"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 20
origin:
  system: "manual"
depends_on: []
tags:
  - "assimilation"
  - "code"
  - "context"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest run packages/agentplane/src/context/ingest-task-pack.test.ts packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation-ontology.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/blueprints/validate.test.ts"
  - "manual temporary-project context ingest, task-brief inspection, and same_as apply smoke test"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
  - "agentplane doctor"
  - "bun run test:fast"
  - "agentplane evaluator run 202607221555-JSEZ5E --verdict pass"
plan_approval:
  state: "approved"
  updated_at: "2026-07-22T15:56:06.328Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-22T16:24:25.330Z"
  updated_by: "CODER"
  note: "Verified current implementation HEAD 3f02dab0bdaf: focused 119/119, complete fast suite 2185/2185, typecheck, agent templates, routing, doctor, and temporary-project semantic reconciliation E2E passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-22T16:25:48.450Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed for current implementation HEAD de4c6997c7d2."
  evaluated_sha: "de4c6997c7d2733e06563be70437f663f4285da4"
  blueprint_digest: "6746947f2acfa35196ce3f84556f36b82c315dca825518134237aef6afbc973c"
  evidence_refs:
    - ".agentplane/tasks/202607221555-JSEZ5E/README.md"
    - ".agentplane/tasks/202607221555-JSEZ5E/quality/20260722-162548450-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221555-JSEZ5E/quality/20260722-162548450-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221555-JSEZ5E/quality/20260722-162548450-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221555-JSEZ5E/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/context/ingest-task-pack.ts"
    - "packages/agentplane/src/runtime/sgr/context-extraction-contract.ts"
    - "packages/agentplane/src/context/extraction-writer.ts"
    - "packages/agentplane/src/context/maximum-assimilation-artifacts-validation-ontology.test.ts"
    - "test:fast 370 files 2185 tests passed"
  findings:
    - "CURATOR owns all semantic identity decisions; the CLI supplies a self-contained canonical catalog and enforces reproducible evidence without semantic heuristics."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved semantic entity-reconciliation task contract, keeping semantic identity decisions with CURATOR and deterministic code limited to evidence preparation, validation, and canonical application."
events:
  -
    type: "status"
    at: "2026-07-22T15:56:49.784Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved semantic entity-reconciliation task contract, keeping semantic identity decisions with CURATOR and deterministic code limited to evidence preparation, validation, and canonical application."
  -
    type: "verify"
    at: "2026-07-22T16:22:04.472Z"
    author: "CODER"
    state: "ok"
    note: "All declared checks passed: focused 119/119, full fast 2185/2185, typecheck, agent templates, routing, doctor, and temporary-project semantic same_as E2E."
  -
    type: "verify"
    at: "2026-07-22T16:24:25.330Z"
    author: "CODER"
    state: "ok"
    note: "Verified current implementation HEAD 3f02dab0bdaf: focused 119/119, complete fast suite 2185/2185, typecheck, agent templates, routing, doctor, and temporary-project semantic reconciliation E2E passed."
doc_version: 3
doc_updated_at: "2026-07-22T16:24:25.451Z"
doc_updated_by: "CODER"
description: "Improve context assimilation so every generated CURATOR task contains a self-sufficient semantic entity-reconciliation brief, canonical entity catalog, explicit decision protocol, and machine-validated evidence contract. The executor must decide semantic identity; deterministic AgentPlane code may only prepare candidates, validate the decision, and apply the chosen canonical identifiers. Same-meaning terms must reuse canonical entities instead of creating stable-ID duplicates; ambiguous and distinct entities must remain explicit."
sections:
  Summary: "Make context ingestion generate an executor-ready semantic reconciliation contract. CURATOR—not deterministic code—must decide whether source terms denote an existing canonical entity, an alias, a distinct entity, or an unresolved possible match. AgentPlane prepares complete evidence surfaces, validates the decision record, and applies canonical identifiers without inventing semantic equivalence."
  Scope: "In scope: context-ingest task metadata and task pack; a task-bound canonical entity catalog with aliases, provenance, wiki targets, and graph neighborhoods; CURATOR prompt and role guidance; SGR entity-resolution schema and validation; maximum-assimilation verification; focused user documentation and tests. Acceptance requires semantic decisions to carry candidate comparisons, positive/negative evidence, rationale, confidence, and explicit unresolved state. Out of scope: embeddings or model calls inside deterministic CLI code, automatic semantic decisions, unrelated context search ranking, release publication, and agentplane-loops."
  Plan: "Generate an executor-ready semantic entity catalog and decision protocol; enforce evidence-bearing entity-resolution decisions; validate that semantic identity is decided by CURATOR and only applied deterministically; document and test the complete context task handoff."
  Verify Steps: "1. Run: bunx vitest run packages/agentplane/src/context/ingest-task-pack.test.ts packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation-ontology.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/blueprints/validate.test.ts. Pass: generated tasks contain a complete semantic catalog and specialized Plan/Verify Steps; same-entity, alias, distinct, uncertain, and new-entity decisions validate only with required evidence; missing canonical targets fail before writes. 2. Run a temporary-project context ingest, inspect task brief/context-pack/catalog, and apply an evidence-bearing same_as decision. Pass: CURATOR receives all decision inputs without conversation history, no fallback task scaffold appears, the canonical alias is recorded, and graph entity count does not increase. 3. Run bun run typecheck. Pass: zero type errors. 4. Run node .agentplane/policy/check-routing.mjs and agentplane doctor. Pass: routing succeeds and no task-introduced doctor error remains. 5. Run bun run test:fast. Pass: the complete fast project suite succeeds. 6. Run agentplane evaluator for the task. Pass: evaluator confirms deterministic code makes no semantic identity decision and the executor contract is sufficient, reproducible, and auditable."
  Verification: |-
    - Command: bunx vitest run packages/agentplane/src/context/ingest-task-pack.test.ts packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation-ontology.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/blueprints/validate.test.ts
      Result: pass.
      Evidence: 10 files, 119 tests passed.
      Scope: generated context task pack, semantic decision schema, deterministic application, ontology validation, blueprint gates.

    - Command: temporary-project ingest and evidence-bearing same_as apply in /tmp/agentplane-semantic-e2e2.pt2VHA
      Result: pass.
      Evidence: task 202607221613-Q8B3XW had specialized Plan and Verify Steps plus a 2-entity canonical catalog; applying Billing same_as entity.payments kept entity count at 2 and added the Billing alias.
      Scope: executor handoff without conversation history and duplicate-free canonical application.

    - Command: bun run typecheck
      Result: pass.
      Evidence: TypeScript build completed with zero errors.
      Scope: all TypeScript packages.

    - Command: bun run agents:check
      Result: pass.
      Evidence: agents templates OK.
      Scope: generated and source CURATOR/EVALUATOR prompt parity.

    - Command: node .agentplane/policy/check-routing.mjs
      Result: pass.
      Evidence: policy routing OK.
      Scope: policy gateway and route budgets.

    - Command: agentplane doctor
      Result: pass.
      Evidence: doctor OK with zero errors; two unrelated pre-existing warnings for historical DONE tasks missing implementation hashes.
      Scope: workspace, workflow, runtime handoff, prompt graph, and task archive diagnostics.

    - Command: bun run test:fast
      Result: pass.
      Evidence: 370 files and 2185 tests passed.
      Scope: complete fast project suite, including the updated maximum-assimilation success fixture.

    - Command: system package resolution check
      Result: pass.
      Evidence: /opt/homebrew/bin/ap and /opt/homebrew/bin/agentplane resolve global version 0.6.24; framework checkouts delegate to the repo-local 0.6.24 binary.
      Scope: system installation visibility and framework handoff.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-22T16:22:04.472Z — VERIFY — ok

    By: CODER

    Note: All declared checks passed: focused 119/119, full fast 2185/2185, typecheck, agent templates, routing, doctor, and temporary-project semantic same_as E2E.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T16:21:55.749Z, excerpt_hash=sha256:7c4a1b25376e295ec1fd7aff6108a73d334c61744ca701ed926e183a7f68ce3d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221555-JSEZ5E-delegate-semantic-entity-reconciliation-to-the-c/.agentplane/tasks/202607221555-JSEZ5E/blueprint/resolved-snapshot.json
    - old_digest: 6746947f2acfa35196ce3f84556f36b82c315dca825518134237aef6afbc973c
    - current_digest: 6746947f2acfa35196ce3f84556f36b82c315dca825518134237aef6afbc973c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221555-JSEZ5E

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607221555-JSEZ5E
    - diagnostic_command: agentplane pr check 202607221555-JSEZ5E
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-22T16:24:25.330Z — VERIFY — ok

    By: CODER

    Note: Verified current implementation HEAD 3f02dab0bdaf: focused 119/119, complete fast suite 2185/2185, typecheck, agent templates, routing, doctor, and temporary-project semantic reconciliation E2E passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T16:22:04.597Z, excerpt_hash=sha256:7c4a1b25376e295ec1fd7aff6108a73d334c61744ca701ed926e183a7f68ce3d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221555-JSEZ5E-delegate-semantic-entity-reconciliation-to-the-c/.agentplane/tasks/202607221555-JSEZ5E/blueprint/resolved-snapshot.json
    - old_digest: 6746947f2acfa35196ce3f84556f36b82c315dca825518134237aef6afbc973c
    - current_digest: 6746947f2acfa35196ce3f84556f36b82c315dca825518134237aef6afbc973c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221555-JSEZ5E

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607221555-JSEZ5E
    - diagnostic_command: agentplane pr check 202607221555-JSEZ5E
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task branch before integration. After integration, revert the implementation commit through a new follow-up task. Existing context artifacts remain compatible because the change governs newly produced extraction payloads and task packs; do not rewrite historical semantic decisions automatically."
  Findings: |-
    Initial finding: current tasks mention reconciliation, but the bounded canonical snapshot exposes only basic fields for at most 50 entities; entity_resolution accepts arbitrary resolution strings and lacks a comparative semantic evidence contract. Stable-ID application is deterministic, while semantic identity remains under-specified for the executor.

    - Observation: A real generated context task had complete prompt artifacts but inherited generic Plan and Verify Steps; context tags also produced a fallback-primary warning.
      Impact: An executor could receive the semantic policy yet still lack a task-local acceptance path, weakening reproducibility and operator trust.
      Resolution: Added task-bound document sections to task creation, generated a specialized semantic assimilation plan and verification contract, and assigned meta as the single lifecycle primary while preserving task_kind=context and context/assimilation tags.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: The complete fast suite exposed a legacy maximum-assimilation success fixture that omitted the new semantic evidence fields.
      Impact: Without updating it, repository-wide verification would fail even though the focused contract tests passed.
      Resolution: Updated the successful fixture with candidate rationale, comparison dimensions, evidence for and against, and an explicit decision rationale.
      Promotion: incident-candidate
      Fixability: repo-fixable
id_source: "generated"
---
## Summary

Make context ingestion generate an executor-ready semantic reconciliation contract. CURATOR—not deterministic code—must decide whether source terms denote an existing canonical entity, an alias, a distinct entity, or an unresolved possible match. AgentPlane prepares complete evidence surfaces, validates the decision record, and applies canonical identifiers without inventing semantic equivalence.

## Scope

In scope: context-ingest task metadata and task pack; a task-bound canonical entity catalog with aliases, provenance, wiki targets, and graph neighborhoods; CURATOR prompt and role guidance; SGR entity-resolution schema and validation; maximum-assimilation verification; focused user documentation and tests. Acceptance requires semantic decisions to carry candidate comparisons, positive/negative evidence, rationale, confidence, and explicit unresolved state. Out of scope: embeddings or model calls inside deterministic CLI code, automatic semantic decisions, unrelated context search ranking, release publication, and agentplane-loops.

## Plan

Generate an executor-ready semantic entity catalog and decision protocol; enforce evidence-bearing entity-resolution decisions; validate that semantic identity is decided by CURATOR and only applied deterministically; document and test the complete context task handoff.

## Verify Steps

1. Run: bunx vitest run packages/agentplane/src/context/ingest-task-pack.test.ts packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation-ontology.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/blueprints/validate.test.ts. Pass: generated tasks contain a complete semantic catalog and specialized Plan/Verify Steps; same-entity, alias, distinct, uncertain, and new-entity decisions validate only with required evidence; missing canonical targets fail before writes. 2. Run a temporary-project context ingest, inspect task brief/context-pack/catalog, and apply an evidence-bearing same_as decision. Pass: CURATOR receives all decision inputs without conversation history, no fallback task scaffold appears, the canonical alias is recorded, and graph entity count does not increase. 3. Run bun run typecheck. Pass: zero type errors. 4. Run node .agentplane/policy/check-routing.mjs and agentplane doctor. Pass: routing succeeds and no task-introduced doctor error remains. 5. Run bun run test:fast. Pass: the complete fast project suite succeeds. 6. Run agentplane evaluator for the task. Pass: evaluator confirms deterministic code makes no semantic identity decision and the executor contract is sufficient, reproducible, and auditable.

## Verification

- Command: bunx vitest run packages/agentplane/src/context/ingest-task-pack.test.ts packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation-ontology.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/blueprints/validate.test.ts
  Result: pass.
  Evidence: 10 files, 119 tests passed.
  Scope: generated context task pack, semantic decision schema, deterministic application, ontology validation, blueprint gates.

- Command: temporary-project ingest and evidence-bearing same_as apply in /tmp/agentplane-semantic-e2e2.pt2VHA
  Result: pass.
  Evidence: task 202607221613-Q8B3XW had specialized Plan and Verify Steps plus a 2-entity canonical catalog; applying Billing same_as entity.payments kept entity count at 2 and added the Billing alias.
  Scope: executor handoff without conversation history and duplicate-free canonical application.

- Command: bun run typecheck
  Result: pass.
  Evidence: TypeScript build completed with zero errors.
  Scope: all TypeScript packages.

- Command: bun run agents:check
  Result: pass.
  Evidence: agents templates OK.
  Scope: generated and source CURATOR/EVALUATOR prompt parity.

- Command: node .agentplane/policy/check-routing.mjs
  Result: pass.
  Evidence: policy routing OK.
  Scope: policy gateway and route budgets.

- Command: agentplane doctor
  Result: pass.
  Evidence: doctor OK with zero errors; two unrelated pre-existing warnings for historical DONE tasks missing implementation hashes.
  Scope: workspace, workflow, runtime handoff, prompt graph, and task archive diagnostics.

- Command: bun run test:fast
  Result: pass.
  Evidence: 370 files and 2185 tests passed.
  Scope: complete fast project suite, including the updated maximum-assimilation success fixture.

- Command: system package resolution check
  Result: pass.
  Evidence: /opt/homebrew/bin/ap and /opt/homebrew/bin/agentplane resolve global version 0.6.24; framework checkouts delegate to the repo-local 0.6.24 binary.
  Scope: system installation visibility and framework handoff.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-22T16:22:04.472Z — VERIFY — ok

By: CODER

Note: All declared checks passed: focused 119/119, full fast 2185/2185, typecheck, agent templates, routing, doctor, and temporary-project semantic same_as E2E.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T16:21:55.749Z, excerpt_hash=sha256:7c4a1b25376e295ec1fd7aff6108a73d334c61744ca701ed926e183a7f68ce3d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221555-JSEZ5E-delegate-semantic-entity-reconciliation-to-the-c/.agentplane/tasks/202607221555-JSEZ5E/blueprint/resolved-snapshot.json
- old_digest: 6746947f2acfa35196ce3f84556f36b82c315dca825518134237aef6afbc973c
- current_digest: 6746947f2acfa35196ce3f84556f36b82c315dca825518134237aef6afbc973c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221555-JSEZ5E

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607221555-JSEZ5E
- diagnostic_command: agentplane pr check 202607221555-JSEZ5E
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-22T16:24:25.330Z — VERIFY — ok

By: CODER

Note: Verified current implementation HEAD 3f02dab0bdaf: focused 119/119, complete fast suite 2185/2185, typecheck, agent templates, routing, doctor, and temporary-project semantic reconciliation E2E passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T16:22:04.597Z, excerpt_hash=sha256:7c4a1b25376e295ec1fd7aff6108a73d334c61744ca701ed926e183a7f68ce3d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221555-JSEZ5E-delegate-semantic-entity-reconciliation-to-the-c/.agentplane/tasks/202607221555-JSEZ5E/blueprint/resolved-snapshot.json
- old_digest: 6746947f2acfa35196ce3f84556f36b82c315dca825518134237aef6afbc973c
- current_digest: 6746947f2acfa35196ce3f84556f36b82c315dca825518134237aef6afbc973c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221555-JSEZ5E

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607221555-JSEZ5E
- diagnostic_command: agentplane pr check 202607221555-JSEZ5E
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task branch before integration. After integration, revert the implementation commit through a new follow-up task. Existing context artifacts remain compatible because the change governs newly produced extraction payloads and task packs; do not rewrite historical semantic decisions automatically.

## Findings

Initial finding: current tasks mention reconciliation, but the bounded canonical snapshot exposes only basic fields for at most 50 entities; entity_resolution accepts arbitrary resolution strings and lacks a comparative semantic evidence contract. Stable-ID application is deterministic, while semantic identity remains under-specified for the executor.

- Observation: A real generated context task had complete prompt artifacts but inherited generic Plan and Verify Steps; context tags also produced a fallback-primary warning.
  Impact: An executor could receive the semantic policy yet still lack a task-local acceptance path, weakening reproducibility and operator trust.
  Resolution: Added task-bound document sections to task creation, generated a specialized semantic assimilation plan and verification contract, and assigned meta as the single lifecycle primary while preserving task_kind=context and context/assimilation tags.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: The complete fast suite exposed a legacy maximum-assimilation success fixture that omitted the new semantic evidence fields.
  Impact: Without updating it, repository-wide verification would fail even though the focused contract tests passed.
  Resolution: Updated the successful fixture with candidate rationale, comparison dimensions, evidence for and against, and an explicit decision rationale.
  Promotion: incident-candidate
  Fixability: repo-fixable
