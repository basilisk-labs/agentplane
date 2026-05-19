---
id: "202605191736-EQBZ4M"
title: "Add task observations journal"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evidence"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T17:36:23.512Z"
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
    body: "Start: Implementing a structured task observations journal as a task-local JSONL artifact with CLI support, schema validation, and triage-oriented downstream use."
events:
  -
    type: "status"
    at: "2026-05-19T17:36:43.262Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing a structured task observations journal as a task-local JSONL artifact with CLI support, schema validation, and triage-oriented downstream use."
doc_version: 3
doc_updated_at: "2026-05-19T17:48:48.386Z"
doc_updated_by: "CODER"
description: "Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations."
sections:
  Summary: |-
    Add task observations journal

    Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations.
  Scope: |-
    - In scope: Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations.
    - Out of scope: unrelated refactors not required for "Add task observations journal".
  Plan: |-
    1. Inspect existing task artifact, ACR, Findings, and incidents promotion surfaces.
    2. Add a canonical task-local observations.jsonl schema and runtime helpers.
    3. Add CLI commands to append/list/check/triage observations without overloading README Findings or ACR.
    4. Document the artifact contract and include it in evidence/ACR surfaces where appropriate.
    5. Verify with focused unit/CLI tests plus policy/schema checks.
  Verify Steps: |-
    1. Run `bun run --filter=@agentplaneorg/core typecheck`. Expected: core typecheck exits 0.
    2. Run `bun run --filter=agentplane typecheck`. Expected: CLI package typecheck exits 0.
    3. Run `bun run schemas:check`. Expected: generated schemas, including task-observation.schema.json, are in sync.
    4. Run focused tests: `bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-artifact-schema.test.ts` and `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/observations.unit.test.ts`. Expected: all tests pass.
    5. Run CLI smoke: `ap task observations add/list/check/triage 202605191736-EQBZ4M`. Expected: observations.jsonl entry is written, listed, validated, and triaged.
    6. Run `bun run docs:cli:check`, `bun run format:changed`, `bun run spec:examples:check`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: all checks pass.
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

Add task observations journal

Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations.

## Scope

- In scope: Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations.
- Out of scope: unrelated refactors not required for "Add task observations journal".

## Plan

1. Inspect existing task artifact, ACR, Findings, and incidents promotion surfaces.
2. Add a canonical task-local observations.jsonl schema and runtime helpers.
3. Add CLI commands to append/list/check/triage observations without overloading README Findings or ACR.
4. Document the artifact contract and include it in evidence/ACR surfaces where appropriate.
5. Verify with focused unit/CLI tests plus policy/schema checks.

## Verify Steps

1. Run `bun run --filter=@agentplaneorg/core typecheck`. Expected: core typecheck exits 0.
2. Run `bun run --filter=agentplane typecheck`. Expected: CLI package typecheck exits 0.
3. Run `bun run schemas:check`. Expected: generated schemas, including task-observation.schema.json, are in sync.
4. Run focused tests: `bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-artifact-schema.test.ts` and `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/observations.unit.test.ts`. Expected: all tests pass.
5. Run CLI smoke: `ap task observations add/list/check/triage 202605191736-EQBZ4M`. Expected: observations.jsonl entry is written, listed, validated, and triaged.
6. Run `bun run docs:cli:check`, `bun run format:changed`, `bun run spec:examples:check`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: all checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
