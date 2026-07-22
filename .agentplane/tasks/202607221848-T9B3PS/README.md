---
id: "202607221848-T9B3PS"
title: "Publish AgentWorkOrder v2 schema and migrations"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221846-Y89CFB"
  - "202607221848-0ZAB1F"
  - "202607221848-ER5H6N"
  - "202607221848-VBV9B1"
tags:
  - "migration"
  - "milestone-alpha2"
  - "refactor"
  - "rf-05"
  - "schema"
  - "v0.7"
  - "wave-contracts"
  - "work-order"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run schemas:check"
  - "bun run spec:examples:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T18:48:57.586Z"
doc_updated_by: "PLANNER"
description: "RF-05a: evolve agentplane.agent_work_context into one versioned AgentWorkOrder v2 schema containing objective, acceptance, role, fingerprint, authority, prepared evidence, knowledge refs, verification intent, required outputs, and semantic-result contract."
sections:
  Summary: |-
    Publish AgentWorkOrder v2 schema and migrations

    RF-05a: evolve agentplane.agent_work_context into one versioned AgentWorkOrder v2 schema containing objective, acceptance, role, fingerprint, authority, prepared evidence, knowledge refs, verification intent, required outputs, and semantic-result contract.
  Scope: |-
    - In scope: Zod source of truth, generated JSON Schema/types/fixtures, v1 compatibility reader and explicit v1-to-v2 migration, casing conversion, digest/fingerprint validation, role-specific prepared excerpts, ContextIntent and VerificationIntent, omission receipts, and output schemas.
    - Out of scope: migrating every producer/consumer, which is the next task.
  Plan: |-
    1. Model AgentWorkOrder v2 and its nested context, authority, intent, evidence, output, and stop-rule contracts.
    2. Generate public schema, TypeScript types, fixtures, and centralized casing transforms.
    3. Implement compatibility read/migration from v1 with an explicit compatibility view.
    4. Validate fingerprint, ref digests, bounded excerpts, and required role sections before invocation.
    5. Add schema, migration, round-trip, stale-order, and compatibility fixtures.
  Verify Steps: |-
    1. Generate types, JSON Schema, and fixtures from the canonical model. Expected: no manual duplicate payload shape or unsafe Record cast is required.
    2. Migrate representative v1 brief/runner/Hermes payloads. Expected: deterministic v2 output and an explicit v1 compatibility view.
    3. Tamper with fingerprint, knowledge digest, required excerpt, or casing. Expected: preparation fails before agent launch with a typed diagnostic.
    4. Inspect EXECUTOR fixtures. Expected: they contain prepared evidence and verification intent but no lifecycle command authority.
    5. Run `bun run schemas:check`, `bun run spec:examples:check`, focused contract tests, and `bun run typecheck`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: ""
id_source: "generated"
---
## Summary

Publish AgentWorkOrder v2 schema and migrations

RF-05a: evolve agentplane.agent_work_context into one versioned AgentWorkOrder v2 schema containing objective, acceptance, role, fingerprint, authority, prepared evidence, knowledge refs, verification intent, required outputs, and semantic-result contract.

## Scope

- In scope: Zod source of truth, generated JSON Schema/types/fixtures, v1 compatibility reader and explicit v1-to-v2 migration, casing conversion, digest/fingerprint validation, role-specific prepared excerpts, ContextIntent and VerificationIntent, omission receipts, and output schemas.
- Out of scope: migrating every producer/consumer, which is the next task.

## Plan

1. Model AgentWorkOrder v2 and its nested context, authority, intent, evidence, output, and stop-rule contracts.
2. Generate public schema, TypeScript types, fixtures, and centralized casing transforms.
3. Implement compatibility read/migration from v1 with an explicit compatibility view.
4. Validate fingerprint, ref digests, bounded excerpts, and required role sections before invocation.
5. Add schema, migration, round-trip, stale-order, and compatibility fixtures.

## Verify Steps

1. Generate types, JSON Schema, and fixtures from the canonical model. Expected: no manual duplicate payload shape or unsafe Record cast is required.
2. Migrate representative v1 brief/runner/Hermes payloads. Expected: deterministic v2 output and an explicit v1 compatibility view.
3. Tamper with fingerprint, knowledge digest, required excerpt, or casing. Expected: preparation fails before agent launch with a typed diagnostic.
4. Inspect EXECUTOR fixtures. Expected: they contain prepared evidence and verification intent but no lifecycle command authority.
5. Run `bun run schemas:check`, `bun run spec:examples:check`, focused contract tests, and `bun run typecheck`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings
