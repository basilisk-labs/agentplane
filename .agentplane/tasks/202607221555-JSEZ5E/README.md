---
id: "202607221555-JSEZ5E"
title: "Delegate semantic entity reconciliation to the context executor"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
doc_version: 3
doc_updated_at: "2026-07-22T16:16:17.663Z"
doc_updated_by: "CODER"
description: "Improve context assimilation so every generated CURATOR task contains a self-sufficient semantic entity-reconciliation brief, canonical entity catalog, explicit decision protocol, and machine-validated evidence contract. The executor must decide semantic identity; deterministic AgentPlane code may only prepare candidates, validate the decision, and apply the chosen canonical identifiers. Same-meaning terms must reuse canonical entities instead of creating stable-ID duplicates; ambiguous and distinct entities must remain explicit."
sections:
  Summary: "Make context ingestion generate an executor-ready semantic reconciliation contract. CURATOR—not deterministic code—must decide whether source terms denote an existing canonical entity, an alias, a distinct entity, or an unresolved possible match. AgentPlane prepares complete evidence surfaces, validates the decision record, and applies canonical identifiers without inventing semantic equivalence."
  Scope: "In scope: context-ingest task metadata and task pack; a task-bound canonical entity catalog with aliases, provenance, wiki targets, and graph neighborhoods; CURATOR prompt and role guidance; SGR entity-resolution schema and validation; maximum-assimilation verification; focused user documentation and tests. Acceptance requires semantic decisions to carry candidate comparisons, positive/negative evidence, rationale, confidence, and explicit unresolved state. Out of scope: embeddings or model calls inside deterministic CLI code, automatic semantic decisions, unrelated context search ranking, release publication, and agentplane-loops."
  Plan: "Generate an executor-ready semantic entity catalog and decision protocol; enforce evidence-bearing entity-resolution decisions; validate that semantic identity is decided by CURATOR and only applied deterministically; document and test the complete context task handoff."
  Verify Steps: "1. Run: bunx vitest run packages/agentplane/src/context/ingest-task-pack.test.ts packages/agentplane/src/context/ingest-task.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/context/maximum-assimilation-artifacts-validation-ontology.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/commands/context/verify-task.maximum-assimilation.unit.test.ts packages/agentplane/src/commands/context/release-readiness.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/blueprints/validate.test.ts. Pass: generated tasks contain a complete semantic catalog and specialized Plan/Verify Steps; same-entity, alias, distinct, uncertain, and new-entity decisions validate only with required evidence; missing canonical targets fail before writes. 2. Run a temporary-project context ingest, inspect task brief/context-pack/catalog, and apply an evidence-bearing same_as decision. Pass: CURATOR receives all decision inputs without conversation history, no fallback task scaffold appears, the canonical alias is recorded, and graph entity count does not increase. 3. Run bun run typecheck. Pass: zero type errors. 4. Run node .agentplane/policy/check-routing.mjs and agentplane doctor. Pass: routing succeeds and no task-introduced doctor error remains. 5. Run bun run test:fast. Pass: the complete fast project suite succeeds. 6. Run agentplane evaluator for the task. Pass: evaluator confirms deterministic code makes no semantic identity decision and the executor contract is sufficient, reproducible, and auditable."
  Verification: "Pending implementation. Record exact commands, pass/fail results, evidence summaries, and covered behavior before verification."
  Rollback Plan: "Revert the task branch before integration. After integration, revert the implementation commit through a new follow-up task. Existing context artifacts remain compatible because the change governs newly produced extraction payloads and task packs; do not rewrite historical semantic decisions automatically."
  Findings: |-
    Initial finding: current tasks mention reconciliation, but the bounded canonical snapshot exposes only basic fields for at most 50 entities; entity_resolution accepts arbitrary resolution strings and lacks a comparative semantic evidence contract. Stable-ID application is deterministic, while semantic identity remains under-specified for the executor.

    - Observation: A real generated context task had complete prompt artifacts but inherited generic Plan and Verify Steps; context tags also produced a fallback-primary warning.
      Impact: An executor could receive the semantic policy yet still lack a task-local acceptance path, weakening reproducibility and operator trust.
      Resolution: Added task-bound document sections to task creation, generated a specialized semantic assimilation plan and verification contract, and assigned meta as the single lifecycle primary while preserving task_kind=context and context/assimilation tags.
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

Pending implementation. Record exact commands, pass/fail results, evidence summaries, and covered behavior before verification.

## Rollback Plan

Revert the task branch before integration. After integration, revert the implementation commit through a new follow-up task. Existing context artifacts remain compatible because the change governs newly produced extraction payloads and task packs; do not rewrite historical semantic decisions automatically.

## Findings

Initial finding: current tasks mention reconciliation, but the bounded canonical snapshot exposes only basic fields for at most 50 entities; entity_resolution accepts arbitrary resolution strings and lacks a comparative semantic evidence contract. Stable-ID application is deterministic, while semantic identity remains under-specified for the executor.

- Observation: A real generated context task had complete prompt artifacts but inherited generic Plan and Verify Steps; context tags also produced a fallback-primary warning.
  Impact: An executor could receive the semantic policy yet still lack a task-local acceptance path, weakening reproducibility and operator trust.
  Resolution: Added task-bound document sections to task creation, generated a specialized semantic assimilation plan and verification contract, and assigned meta as the single lifecycle primary while preserving task_kind=context and context/assimilation tags.
  Promotion: incident-candidate
  Fixability: repo-fixable
