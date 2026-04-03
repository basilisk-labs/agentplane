---
id: "202604030442-9CJTSA"
title: "F-003 Introduce capability registry"
result_summary: "integrate: squash task/202604030442-9CJTSA/capability-registry"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604030442-Y53F5X"
tags:
  - "code"
  - "framework"
  - "capabilities"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:01.538Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "ok"
  updated_at: "2026-04-03T10:00:07.149Z"
  updated_by: "CODER"
  note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/capabilities/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/policy-decision.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --hookTimeout 60000 --testTimeout 60000."
commit:
  hash: "d645bf9500aa02541386015d21d3c788c09583f7"
  message: "📝 9CJTSA task: refresh verification and pr state"
comments:
  -
    author: "CODER"
    body: "Start: introduce the framework capability registry and attach source-aware availability semantics for commands, recipes, runner adapters, tools, skills, and agents."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=ran; pr=.agentplane/tasks/202604030442-9CJTSA/pr."
events:
  -
    type: "status"
    at: "2026-04-03T09:40:12.068Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce the framework capability registry and attach source-aware availability semantics for commands, recipes, runner adapters, tools, skills, and agents."
  -
    type: "verify"
    at: "2026-04-03T10:00:07.149Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/capabilities/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/policy-decision.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --hookTimeout 60000 --testTimeout 60000."
  -
    type: "status"
    at: "2026-04-03T10:02:17.657Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=ran; pr=.agentplane/tasks/202604030442-9CJTSA/pr."
doc_version: 3
doc_updated_at: "2026-04-03T10:02:17.662Z"
doc_updated_by: "INTEGRATOR"
description: "Define a reusable capability model and registry for commands, skills, tools, agents, and runners."
sections:
  Summary: |-
    F-003 Introduce capability registry
    
    Define a reusable capability model and registry for commands, skills, tools, agents, and runners.
  Scope: |-
    - In scope: Define a reusable capability model and registry for commands, skills, tools, agents, and runners.
    - Out of scope: unrelated refactors not required for "F-003 Introduce capability registry".
  Plan: |-
    1. Define capability descriptors, availability states, and source metadata in a dedicated runtime module.
    2. Build a registry/resolver that can enumerate capabilities from existing framework surfaces.
    3. Cover blocked and unavailable semantics with targeted tests.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T10:00:07.149Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/capabilities/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/policy-decision.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --hookTimeout 60000 --testTimeout 60000.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:40:12.078Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

F-003 Introduce capability registry

Define a reusable capability model and registry for commands, skills, tools, agents, and runners.

## Scope

- In scope: Define a reusable capability model and registry for commands, skills, tools, agents, and runners.
- Out of scope: unrelated refactors not required for "F-003 Introduce capability registry".

## Plan

1. Define capability descriptors, availability states, and source metadata in a dedicated runtime module.
2. Build a registry/resolver that can enumerate capabilities from existing framework surfaces.
3. Cover blocked and unavailable semantics with targeted tests.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T10:00:07.149Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/capabilities/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/policy-decision.test.ts --hookTimeout 60000 --testTimeout 60000; bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts --hookTimeout 60000 --testTimeout 60000.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T09:40:12.078Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
