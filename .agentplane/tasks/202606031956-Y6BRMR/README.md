---
id: "202606031956-Y6BRMR"
title: "Add evaluator skepticism levels to Codex runner init"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "init"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T19:56:36.470Z"
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
    body: "Start: Implement configurable evaluator skepticism levels for Codex runner audit prompts, expose the setting during init, and verify with focused config/init/prompt tests."
events:
  -
    type: "status"
    at: "2026-06-03T20:00:09.353Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement configurable evaluator skepticism levels for Codex runner audit prompts, expose the setting during init, and verify with focused config/init/prompt tests."
doc_version: 3
doc_updated_at: "2026-06-03T20:00:09.353Z"
doc_updated_by: "CODER"
description: "Implement configurable evaluator skepticism levels for Codex runner audit prompts, expose the setting during init, and cover the behavior with tests."
sections:
  Summary: |-
    Add evaluator skepticism levels to Codex runner init

    Implement configurable evaluator skepticism levels for Codex runner audit prompts, expose the setting during init, and cover the behavior with tests.
  Scope: |-
    - In scope: Implement configurable evaluator skepticism levels for Codex runner audit prompts, expose the setting during init, and cover the behavior with tests.
    - Out of scope: unrelated refactors not required for "Add evaluator skepticism levels to Codex runner init".
  Plan: "Implement configurable evaluator skepticism levels for Codex runner audits. Scope: add workflow/init config for evaluator skepticism, expose init-time selection, render level-specific evaluator prompt instructions, and add focused tests for config/init/prompt behavior. Verify with targeted unit tests plus routing/policy check."
  Verify Steps: |-
    1. Run targeted config/init/runner tests. Expected: evaluator skepticism defaults, init answer propagation, prompt-step fixtures, workflow validation, and runner bootstrap rendering pass.
    2. Run schema sync/check. Expected: generated config schemas include evaluator.skepticism_level with standard, strict, and paranoid values and remain in sync.
    3. Build touched packages. Expected: @agentplaneorg/core and agentplane builds pass; any local bootstrap limitation is recorded explicitly.
    4. Run policy routing check. Expected: node .agentplane/policy/check-routing.mjs passes.
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

Add evaluator skepticism levels to Codex runner init

Implement configurable evaluator skepticism levels for Codex runner audit prompts, expose the setting during init, and cover the behavior with tests.

## Scope

- In scope: Implement configurable evaluator skepticism levels for Codex runner audit prompts, expose the setting during init, and cover the behavior with tests.
- Out of scope: unrelated refactors not required for "Add evaluator skepticism levels to Codex runner init".

## Plan

Implement configurable evaluator skepticism levels for Codex runner audits. Scope: add workflow/init config for evaluator skepticism, expose init-time selection, render level-specific evaluator prompt instructions, and add focused tests for config/init/prompt behavior. Verify with targeted unit tests plus routing/policy check.

## Verify Steps

1. Run targeted config/init/runner tests. Expected: evaluator skepticism defaults, init answer propagation, prompt-step fixtures, workflow validation, and runner bootstrap rendering pass.
2. Run schema sync/check. Expected: generated config schemas include evaluator.skepticism_level with standard, strict, and paranoid values and remain in sync.
3. Build touched packages. Expected: @agentplaneorg/core and agentplane builds pass; any local bootstrap limitation is recorded explicitly.
4. Run policy routing check. Expected: node .agentplane/policy/check-routing.mjs passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
