---
id: "202606121018-5PS44M"
title: "Add typed loop step contracts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202606081918-CKV5VD"
tags:
  - "code"
  - "contracts"
  - "loops"
  - "schema"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run --filter=agentplane build"
  - "bun run --filter=agentplane test -- packages/agentplane/src/loops"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T10:22:34.428Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-06-12T10:20:13.141Z"
doc_updated_by: "PLANNER"
description: "Add explicit typed input/output contracts for LoopSpec steps so loop execution can validate step boundaries before score-aware runtime behavior is introduced."
sections:
  Summary: |-
    Add typed loop step contracts

    Add explicit typed input/output contracts for LoopSpec steps so loop execution can validate step boundaries before score-aware runtime behavior is introduced.
  Scope: |-
    - In scope: Add explicit typed input/output contracts for LoopSpec steps so loop execution can validate step boundaries before score-aware runtime behavior is introduced.
    - Out of scope: unrelated refactors not required for "Add typed loop step contracts".
  Plan: |-
    1. Extend LoopStep/LoopSpec model types with explicit step contract fields for declared inputs, outputs, optional schema refs, and required artifact refs.
    2. Update JSON schema and spec examples so contract fields are validated but remain backward-compatible for v0.1 loop specs.
    3. Add validation failures for malformed contract declarations without requiring every existing built-in step to define a full contract immediately.
    4. Update built-in loop specs with representative contracts on high-value steps such as prompt.render, check.run, evaluator.run, and decision.route.
    5. Keep runtime behavior unchanged except for validation/readback surfaces.
  Verify Steps: |-
    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops`. Expected: loop model, schema validation, and catalog tests cover contract fields and backward compatibility.
    2. Run `bun run --filter=agentplane build`. Expected: TypeScript types compile with contract fields exposed through public loop modules.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing still passes after schema/model changes.
    4. Inspect `schemas/loop-spec.schema.json` and `packages/spec/examples/loop-spec.json`. Expected: contract fields are documented by example without making current v0.1 specs invalid.
    5. Run `agentplane loop validate --project` from a fixture/project-local context if project loop fixtures exist; otherwise record the absence as a finding. Expected: invalid contracts fail clearly and valid legacy specs still pass.
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

Add typed loop step contracts

Add explicit typed input/output contracts for LoopSpec steps so loop execution can validate step boundaries before score-aware runtime behavior is introduced.

## Scope

- In scope: Add explicit typed input/output contracts for LoopSpec steps so loop execution can validate step boundaries before score-aware runtime behavior is introduced.
- Out of scope: unrelated refactors not required for "Add typed loop step contracts".

## Plan

1. Extend LoopStep/LoopSpec model types with explicit step contract fields for declared inputs, outputs, optional schema refs, and required artifact refs.
2. Update JSON schema and spec examples so contract fields are validated but remain backward-compatible for v0.1 loop specs.
3. Add validation failures for malformed contract declarations without requiring every existing built-in step to define a full contract immediately.
4. Update built-in loop specs with representative contracts on high-value steps such as prompt.render, check.run, evaluator.run, and decision.route.
5. Keep runtime behavior unchanged except for validation/readback surfaces.

## Verify Steps

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops`. Expected: loop model, schema validation, and catalog tests cover contract fields and backward compatibility.
2. Run `bun run --filter=agentplane build`. Expected: TypeScript types compile with contract fields exposed through public loop modules.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing still passes after schema/model changes.
4. Inspect `schemas/loop-spec.schema.json` and `packages/spec/examples/loop-spec.json`. Expected: contract fields are documented by example without making current v0.1 specs invalid.
5. Run `agentplane loop validate --project` from a fixture/project-local context if project loop fixtures exist; otherwise record the absence as a finding. Expected: invalid contracts fail clearly and valid legacy specs still pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
