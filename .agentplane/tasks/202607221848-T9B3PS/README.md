---
id: "202607221848-T9B3PS"
title: "Publish AgentWorkOrder v2 schema and migrations"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "approved"
  updated_at: "2026-07-26T08:06:58.881Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-26T09:00:04.017Z"
  updated_by: "TESTER"
  note: "Rework: v1 compatibility must receipt work_order_id, parse representative runner and Hermes packet shapes including owner:null, and avoid synthetic recommended_role fixtures."
  attempts: 1
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-26T08:07:55.477Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-26T09:00:04.017Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: v1 compatibility must receipt work_order_id, parse representative runner and Hermes packet shapes including owner:null, and avoid synthetic recommended_role fixtures."
doc_version: 3
doc_updated_at: "2026-07-26T09:00:04.690Z"
doc_updated_by: "CODER"
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
    ### 2026-07-26T09:00:04.017Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: v1 compatibility must receipt work_order_id, parse representative runner and Hermes packet shapes including owner:null, and avoid synthetic recommended_role fixtures.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T08:07:55.477Z, excerpt_hash=sha256:bd068eed5da8a9bc8c1f7c672456083acd50da4745ff1c87fa2c05a3df936bd6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-T9B3PS-publish-agentworkorder-v2-schema-and-migrations/.agentplane/tasks/202607221848-T9B3PS/blueprint/resolved-snapshot.json
    - old_digest: e83f19491ff117343a64b4965d78cb5a0efe43e489b30d534b94b7bcbf8ce8d6
    - current_digest: e83f19491ff117343a64b4965d78cb5a0efe43e489b30d534b94b7bcbf8ce8d6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-T9B3PS

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221848-T9B3PS
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: |-
    - Observation: Independent review found valid Hermes owner:null rejected and migration fixtures divergent from current runner/Hermes contracts.
      Impact: Verify Step 2 is not proven for representative v1 payloads.
      Resolution: Correct the reader and fixtures, rerun contract/compatibility checks, then record independent TESTER evidence.
extensions:
  workflow_route_baseline:
    start_head_sha: "5b5d36e5363277b35b80ece2dc4f70927e4ce00e"
    version: 1
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
### 2026-07-26T09:00:04.017Z — VERIFY — needs_rework

By: TESTER

Note: Rework: v1 compatibility must receipt work_order_id, parse representative runner and Hermes packet shapes including owner:null, and avoid synthetic recommended_role fixtures.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T08:07:55.477Z, excerpt_hash=sha256:bd068eed5da8a9bc8c1f7c672456083acd50da4745ff1c87fa2c05a3df936bd6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-T9B3PS-publish-agentworkorder-v2-schema-and-migrations/.agentplane/tasks/202607221848-T9B3PS/blueprint/resolved-snapshot.json
- old_digest: e83f19491ff117343a64b4965d78cb5a0efe43e489b30d534b94b7bcbf8ce8d6
- current_digest: e83f19491ff117343a64b4965d78cb5a0efe43e489b30d534b94b7bcbf8ce8d6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-T9B3PS

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221848-T9B3PS
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings

- Observation: Independent review found valid Hermes owner:null rejected and migration fixtures divergent from current runner/Hermes contracts.
  Impact: Verify Step 2 is not proven for representative v1 payloads.
  Resolution: Correct the reader and fixtures, rerun contract/compatibility checks, then record independent TESTER evidence.
