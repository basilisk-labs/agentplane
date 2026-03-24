---
id: "202603241845-PN7C1T"
title: "Keep recipe mode only in resolver selection surface"
result_summary: "Recipe mode now stays in resolver selection only; the active runner execution surface no longer exports it as an env or policy field."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
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
  state: "ok"
  updated_at: "2026-03-24T18:49:34.744Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; recipe mode remains in resolver selection surfaces but no longer propagates into active runner env or capability output."
commit:
  hash: "312717bb5e84c964a20a77c080f2abfcd01cdcf8"
  message: "✅ PN7C1T code: keep recipe mode out of runner execution surface"
comments:
  -
    author: "CODER"
    body: "Start: keep recipe mode only in resolver selection and CLI discovery surfaces, while removing it from active runner env and capability display so the execution contract stays minimal and honest."
  -
    author: "CODER"
    body: "Verified: resolver/discovery surfaces kept recipe mode for selection, while adapter env and capability output no longer project it as part of the runner execution contract, and agentplane build remained clean."
events:
  -
    type: "status"
    at: "2026-03-24T18:45:57.436Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: keep recipe mode only in resolver selection and CLI discovery surfaces, while removing it from active runner env and capability display so the execution contract stays minimal and honest."
  -
    type: "verify"
    at: "2026-03-24T18:49:34.744Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; recipe mode remains in resolver selection surfaces but no longer propagates into active runner env or capability output."
  -
    type: "status"
    at: "2026-03-24T18:49:41.084Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: resolver/discovery surfaces kept recipe mode for selection, while adapter env and capability output no longer project it as part of the runner execution contract, and agentplane build remained clean."
doc_version: 3
doc_updated_at: "2026-03-24T18:49:41.084Z"
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
    #### 2026-03-24T18:49:34.744Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; recipe mode remains in resolver selection surfaces but no longer propagates into active runner env or capability output.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:49:16.824Z, excerpt_hash=sha256:715d8bfe846315ecbe0a9558eee2bb2b48076790e63e8dbe7410d67dc2b4bf82
    
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
#### 2026-03-24T18:49:34.744Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/runner/policy-decision.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; bun run --filter=agentplane build; recipe mode remains in resolver selection surfaces but no longer propagates into active runner env or capability output.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:49:16.824Z, excerpt_hash=sha256:715d8bfe846315ecbe0a9558eee2bb2b48076790e63e8dbe7410d67dc2b4bf82

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Recipe mode still participates in resolver selection, scenario list/info output, and --mode filtering, so discovery semantics stay intact.
- The main runner no longer exports mode through adapter env or capability display, which removes a free-form classification label from the active execution contract.
- Remaining runtime policy fields are now narrower and closer to enforceable or explicitly validated behavior.
