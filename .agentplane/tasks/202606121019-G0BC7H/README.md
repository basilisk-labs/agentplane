---
id: "202606121019-G0BC7H"
title: "Add loop.improve prompt proposal meta-loop"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202606121018-DCEZ9B"
tags:
  - "code"
  - "improvement"
  - "loops"
  - "prompts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run --filter=agentplane build"
  - "bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T10:22:59.850Z"
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
doc_updated_at: "2026-06-12T10:21:45.061Z"
doc_updated_by: "PLANNER"
description: "Add a dry-run-safe meta-loop that reads completed LoopRun evidence and proposes prompt/rubric improvements as reviewable artifacts without automatically applying or promoting them."
sections:
  Summary: |-
    Add loop.improve prompt proposal meta-loop

    Add a dry-run-safe meta-loop that reads completed LoopRun evidence and proposes prompt/rubric improvements as reviewable artifacts without automatically applying or promoting them.
  Scope: |-
    - In scope: Add a dry-run-safe meta-loop that reads completed LoopRun evidence and proposes prompt/rubric improvements as reviewable artifacts without automatically applying or promoting them.
    - Out of scope: unrelated refactors not required for "Add loop.improve prompt proposal meta-loop".
  Plan: |-
    1. Add or refine the built-in `loop.improve` spec as a proposal-only meta-loop that reads completed LoopRun evidence.
    2. Produce reviewable prompt/rubric improvement proposal artifacts without applying them to source files automatically.
    3. Require typed evidence, metrics, and fixtures from predecessor tasks before selecting proposal candidates.
    4. Record proposal provenance: source run ids, prompt module identity, metric failures, suggested change, and expected evaluation fixture.
    5. Keep policy files and AGENTS.md out of automatic optimization scope; any policy change remains a separate approved task.
  Verify Steps: |-
    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop`. Expected: `loop.improve` proposal behavior is covered and does not mutate source/policy automatically.
    2. Run `bun run --filter=agentplane build`. Expected: proposal artifact types and command surfaces compile.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    4. Run or inspect a dry-run fixture for `loop.improve`. Expected: output is a reviewable proposal artifact with source run refs, prompt identity, metric failures, and suggested change.
    5. Confirm AGENTS.md and `.agentplane/policy/**` are not auto-modified by the meta-loop.
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

Add loop.improve prompt proposal meta-loop

Add a dry-run-safe meta-loop that reads completed LoopRun evidence and proposes prompt/rubric improvements as reviewable artifacts without automatically applying or promoting them.

## Scope

- In scope: Add a dry-run-safe meta-loop that reads completed LoopRun evidence and proposes prompt/rubric improvements as reviewable artifacts without automatically applying or promoting them.
- Out of scope: unrelated refactors not required for "Add loop.improve prompt proposal meta-loop".

## Plan

1. Add or refine the built-in `loop.improve` spec as a proposal-only meta-loop that reads completed LoopRun evidence.
2. Produce reviewable prompt/rubric improvement proposal artifacts without applying them to source files automatically.
3. Require typed evidence, metrics, and fixtures from predecessor tasks before selecting proposal candidates.
4. Record proposal provenance: source run ids, prompt module identity, metric failures, suggested change, and expected evaluation fixture.
5. Keep policy files and AGENTS.md out of automatic optimization scope; any policy change remains a separate approved task.

## Verify Steps

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop`. Expected: `loop.improve` proposal behavior is covered and does not mutate source/policy automatically.
2. Run `bun run --filter=agentplane build`. Expected: proposal artifact types and command surfaces compile.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
4. Run or inspect a dry-run fixture for `loop.improve`. Expected: output is a reviewable proposal artifact with source run refs, prompt identity, metric failures, and suggested change.
5. Confirm AGENTS.md and `.agentplane/policy/**` are not auto-modified by the meta-loop.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
