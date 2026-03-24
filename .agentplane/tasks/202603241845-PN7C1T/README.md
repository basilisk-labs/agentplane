---
id: "202603241845-PN7C1T"
title: "Keep recipe mode only in resolver selection surface"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "recipes"
  - "contracts"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T18:45:56.818Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: keep recipe mode only in resolver selection and CLI discovery surfaces, while removing it from active runner env and capability display so the execution contract stays minimal and honest."
events:
  -
    type: "status"
    at: "2026-03-24T18:45:57.436Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: keep recipe mode only in resolver selection and CLI discovery surfaces, while removing it from active runner env and capability display so the execution contract stays minimal and honest."
doc_version: 3
doc_updated_at: "2026-03-24T18:49:16.824Z"
doc_updated_by: "CODER"
description: "Remove recipe run_profile.mode from the main runner execution surface while preserving it for resolver selection and CLI scenario discovery, because it currently acts only as a free-form classification label and not as a shared runtime contract."
sections:
  Summary: |-
    Keep recipe mode only in resolver selection surface
    
    Remove recipe run_profile.mode from the main runner execution surface while preserving it for resolver selection and CLI scenario discovery, because it currently acts only as a free-form classification label and not as a shared runtime contract.
  Scope: |-
    - In scope: Remove recipe run_profile.mode from the main runner execution surface while preserving it for resolver selection and CLI scenario discovery, because it currently acts only as a free-form classification label and not as a shared runtime contract.
    - Out of scope: unrelated refactors not required for "Keep recipe mode only in resolver selection surface".
  Plan: |-
    1. Remove run_profile.mode from the active runner execution surface while preserving it in resolver selection and CLI listing/info output.
    2. Update adapter env export, capability display, and tests so mode no longer looks like a shared runtime contract.
    3. Refresh docs to state that mode is a resolver-selection label, not a runner execution policy field.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: mode still appears in resolver-driven scenario selection surfaces, but no longer propagates into active runner env/capability output.
    2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the execution-surface removal.
    3. Inspect updated docs for mode. Expected: it is described as a selection/discovery label, not an execution policy field.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Recipe mode still participates in resolver selection, scenario list/info output, and --mode filtering, so discovery semantics stay intact.
    - The main runner no longer exports mode through adapter env or capability display, which removes a free-form classification label from the active execution contract.
    - Remaining runtime policy fields are now narrower and closer to enforceable or explicitly validated behavior.
id_source: "generated"
---
## Summary

Keep recipe mode only in resolver selection surface

Remove recipe run_profile.mode from the main runner execution surface while preserving it for resolver selection and CLI scenario discovery, because it currently acts only as a free-form classification label and not as a shared runtime contract.

## Scope

- In scope: Remove recipe run_profile.mode from the main runner execution surface while preserving it for resolver selection and CLI scenario discovery, because it currently acts only as a free-form classification label and not as a shared runtime contract.
- Out of scope: unrelated refactors not required for "Keep recipe mode only in resolver selection surface".

## Plan

1. Remove run_profile.mode from the active runner execution surface while preserving it in resolver selection and CLI listing/info output.
2. Update adapter env export, capability display, and tests so mode no longer looks like a shared runtime contract.
3. Refresh docs to state that mode is a resolver-selection label, not a runner execution policy field.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: mode still appears in resolver-driven scenario selection surfaces, but no longer propagates into active runner env/capability output.
2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the execution-surface removal.
3. Inspect updated docs for mode. Expected: it is described as a selection/discovery label, not an execution policy field.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Recipe mode still participates in resolver selection, scenario list/info output, and --mode filtering, so discovery semantics stay intact.
- The main runner no longer exports mode through adapter env or capability display, which removes a free-form classification label from the active execution contract.
- Remaining runtime policy fields are now narrower and closer to enforceable or explicitly validated behavior.
