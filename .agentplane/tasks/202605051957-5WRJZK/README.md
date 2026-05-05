---
id: "202605051957-5WRJZK"
title: "Bridge recipe hints into blueprint resolver"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "rc1"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T20:25:38.256Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T20:44:24.991Z"
  updated_by: "CODER"
  note: "Blueprint resolver bridge verified: recipe hints preserve provenance, evidence requirements bind to verify_record, preferred_blueprint is accepted only when compatible, and risk routes outrank recipe preference. Checks: bun test packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/recipes/src/blueprint-extensions.test.ts; bun run typecheck; bun run lint:core; AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the rc1 recipe-to-blueprint resolver bridge in the primary batch worktree, including accepted and rejected recipe extension evidence."
events:
  -
    type: "status"
    at: "2026-05-05T20:25:47.934Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the rc1 recipe-to-blueprint resolver bridge in the primary batch worktree, including accepted and rejected recipe extension evidence."
  -
    type: "verify"
    at: "2026-05-05T20:44:24.991Z"
    author: "CODER"
    state: "ok"
    note: "Blueprint resolver bridge verified: recipe hints preserve provenance, evidence requirements bind to verify_record, preferred_blueprint is accepted only when compatible, and risk routes outrank recipe preference. Checks: bun test packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/recipes/src/blueprint-extensions.test.ts; bun run typecheck; bun run lint:core; AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast."
doc_version: 3
doc_updated_at: "2026-05-05T20:44:25.000Z"
doc_updated_by: "CODER"
description: "Connect normalized recipe blueprint hints to the blueprint resolver and explain output, including accepted/rejected extension details and safety rejection tests."
sections:
  Summary: |-
    Bridge recipe hints into blueprint resolver
    
    Connect normalized recipe blueprint hints to the blueprint resolver and explain output, including accepted/rejected extension details and safety rejection tests.
  Scope: |-
    - In scope: Connect normalized recipe blueprint hints to the blueprint resolver and explain output, including accepted/rejected extension details and safety rejection tests.
    - Out of scope: unrelated refactors not required for "Bridge recipe hints into blueprint resolver".
  Plan: "Batch rc1 implementation task. Primary branch/worktree/PR owner: 202605051957-5WRJZK. Included approved tasks: 202605051957-5WRJZK recipe resolver bridge, 202605051959-VCZB8M blueprint explain CLI, 202605051958-Y1FYT3 verify-show blueprint evidence, 202605051958-R7ZV0H minimal ACR blueprint bridge, 202605051958-M6BW7B v0.5 rc1 documentation. Implement only type/model, resolver/explain, CLI visibility, verification evidence, ACR summary fields, and documentation. Do not add blueprint execution or force CI/PR semantics onto analysis/content blueprints."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T20:44:24.991Z — VERIFY — ok
    
    By: CODER
    
    Note: Blueprint resolver bridge verified: recipe hints preserve provenance, evidence requirements bind to verify_record, preferred_blueprint is accepted only when compatible, and risk routes outrank recipe preference. Checks: bun test packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/recipes/src/blueprint-extensions.test.ts; bun run typecheck; bun run lint:core; AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:25:47.934Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Bridge recipe hints into blueprint resolver

Connect normalized recipe blueprint hints to the blueprint resolver and explain output, including accepted/rejected extension details and safety rejection tests.

## Scope

- In scope: Connect normalized recipe blueprint hints to the blueprint resolver and explain output, including accepted/rejected extension details and safety rejection tests.
- Out of scope: unrelated refactors not required for "Bridge recipe hints into blueprint resolver".

## Plan

Batch rc1 implementation task. Primary branch/worktree/PR owner: 202605051957-5WRJZK. Included approved tasks: 202605051957-5WRJZK recipe resolver bridge, 202605051959-VCZB8M blueprint explain CLI, 202605051958-Y1FYT3 verify-show blueprint evidence, 202605051958-R7ZV0H minimal ACR blueprint bridge, 202605051958-M6BW7B v0.5 rc1 documentation. Implement only type/model, resolver/explain, CLI visibility, verification evidence, ACR summary fields, and documentation. Do not add blueprint execution or force CI/PR semantics onto analysis/content blueprints.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T20:44:24.991Z — VERIFY — ok

By: CODER

Note: Blueprint resolver bridge verified: recipe hints preserve provenance, evidence requirements bind to verify_record, preferred_blueprint is accepted only when compatible, and risk routes outrank recipe preference. Checks: bun test packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/validate.test.ts packages/recipes/src/blueprint-extensions.test.ts; bun run typecheck; bun run lint:core; AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T20:25:47.934Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
