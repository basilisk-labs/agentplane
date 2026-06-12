---
id: "202606121018-WQSARQ"
title: "Persist loop per-step evidence and prompt identity"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202606121018-5PS44M"
tags:
  - "code"
  - "evidence"
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
  updated_at: "2026-06-12T10:22:40.138Z"
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
doc_updated_at: "2026-06-12T10:20:30.045Z"
doc_updated_by: "PLANNER"
description: "Extend loop dry-run/run artifacts with per-step input/output refs and promptModule identity so later metrics and prompt improvement can audit what each loop step prepared or executed."
sections:
  Summary: |-
    Persist loop per-step evidence and prompt identity

    Extend loop dry-run/run artifacts with per-step input/output refs and promptModule identity so later metrics and prompt improvement can audit what each loop step prepared or executed.
  Scope: |-
    - In scope: Extend loop dry-run/run artifacts with per-step input/output refs and promptModule identity so later metrics and prompt improvement can audit what each loop step prepared or executed.
    - Out of scope: unrelated refactors not required for "Persist loop per-step evidence and prompt identity".
  Plan: |-
    1. Extend LoopRun artifact layout with iterations/<n>/steps/<step-id>/input.json and output.json or ref files for prepared/executed steps.
    2. Persist promptModule identity for prompt-rendered steps: module id, version/source path when known, rendered prompt hash, and loop spec sha.
    3. Emit step.prepared/step.skipped events in events.jsonl with stable refs to step artifacts.
    4. Keep dry-run behavior non-executing: artifacts may contain placeholders/refs but must not call external agent adapters.
    5. Add tests that assert deterministic artifact paths, valid JSON, and task-local-only mutation.
  Verify Steps: |-
    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop`. Expected: dry-run artifacts include per-step input/output refs and prompt identity where promptModule is present.
    2. Run `bun run --filter=agentplane build`. Expected: artifact record types compile and remain exported through the loop modules that need them.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy still passes.
    4. Run a representative `agentplane loop run <task-id> --loop tdd.fix --dry-run --json` against a fixture or disposable local task. Expected: generated files stay under `.agentplane/tasks/<task-id>/runs/<run-id>` and include no non-dry-run execution side effects.
    5. Inspect `events.jsonl`. Expected: step events point to existing artifact refs and do not rely on free-form prose only.
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

Persist loop per-step evidence and prompt identity

Extend loop dry-run/run artifacts with per-step input/output refs and promptModule identity so later metrics and prompt improvement can audit what each loop step prepared or executed.

## Scope

- In scope: Extend loop dry-run/run artifacts with per-step input/output refs and promptModule identity so later metrics and prompt improvement can audit what each loop step prepared or executed.
- Out of scope: unrelated refactors not required for "Persist loop per-step evidence and prompt identity".

## Plan

1. Extend LoopRun artifact layout with iterations/<n>/steps/<step-id>/input.json and output.json or ref files for prepared/executed steps.
2. Persist promptModule identity for prompt-rendered steps: module id, version/source path when known, rendered prompt hash, and loop spec sha.
3. Emit step.prepared/step.skipped events in events.jsonl with stable refs to step artifacts.
4. Keep dry-run behavior non-executing: artifacts may contain placeholders/refs but must not call external agent adapters.
5. Add tests that assert deterministic artifact paths, valid JSON, and task-local-only mutation.

## Verify Steps

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop`. Expected: dry-run artifacts include per-step input/output refs and prompt identity where promptModule is present.
2. Run `bun run --filter=agentplane build`. Expected: artifact record types compile and remain exported through the loop modules that need them.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy still passes.
4. Run a representative `agentplane loop run <task-id> --loop tdd.fix --dry-run --json` against a fixture or disposable local task. Expected: generated files stay under `.agentplane/tasks/<task-id>/runs/<run-id>` and include no non-dry-run execution side effects.
5. Inspect `events.jsonl`. Expected: step events point to existing artifact refs and do not rely on free-form prose only.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
