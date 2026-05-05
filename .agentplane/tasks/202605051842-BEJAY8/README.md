---
id: "202605051842-BEJAY8"
title: "Add blueprint core model and validation"
result_summary: "Merged via PR #933."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T18:42:53.456Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T19:10:21.287Z"
  updated_by: "CODER"
  note: "Implemented blueprint core model, built-ins, registry, validation, and focused tests. Checks passed: agentplane task verify-show 202605051842-BEJAY8; bun test packages/agentplane/src/blueprints/validate.test.ts; bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/blueprints/validate.test.ts; bun run typecheck; bunx eslint packages/agentplane/src/blueprints packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.cloud.test.ts; bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor; AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast."
commit:
  hash: "bb8a4df88b37362fea7d0fb156594f2f09a9dd62"
  message: "Merge pull request #933 from basilisk-labs/task/202605051842-BEJAY8/blueprint-core-model"
comments:
  -
    author: "CODER"
    body: "Start: implement blueprint core model, built-in registry, validation invariants, and focused tests without resolver, CLI commands, runner execution, or task lifecycle integration."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #933 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-05T18:43:07.851Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement blueprint core model, built-in registry, validation invariants, and focused tests without resolver, CLI commands, runner execution, or task lifecycle integration."
  -
    type: "verify"
    at: "2026-05-05T19:10:21.287Z"
    author: "CODER"
    state: "ok"
    note: "Implemented blueprint core model, built-ins, registry, validation, and focused tests. Checks passed: agentplane task verify-show 202605051842-BEJAY8; bun test packages/agentplane/src/blueprints/validate.test.ts; bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/blueprints/validate.test.ts; bun run typecheck; bunx eslint packages/agentplane/src/blueprints packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.cloud.test.ts; bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor; AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast."
  -
    type: "status"
    at: "2026-05-05T19:15:47.147Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #933 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-05T19:15:47.152Z"
doc_updated_by: "INTEGRATOR"
description: "Implement the first blueprint code layer: typed model, built-in blueprint registry, registry lookup, validation invariants, and focused tests without resolver, CLI commands, or execution."
sections:
  Summary: |-
    Add blueprint core model and validation
    
    Implement the first blueprint code layer: typed model, built-in blueprint registry, registry lookup, validation invariants, and focused tests without resolver, CLI commands, or execution.
  Scope: |-
    - In scope: Implement the first blueprint code layer: typed model, built-in blueprint registry, registry lookup, validation invariants, and focused tests without resolver, CLI commands, or execution.
    - Out of scope: unrelated refactors not required for "Add blueprint core model and validation".
  Plan: |-
    1. Add a pure blueprint domain module under packages/agentplane/src/blueprints with model types, built-in definitions, registry helpers, validation, and index exports.
    2. Implement v0 validation invariants from docs/developer/blueprints.mdx: unique ids, valid edge targets, acyclic graph, core nodes, evidence producers, protected node constraints, semantic route constraints, and workflow-mode compatibility.
    3. Add focused unit tests for all built-ins and representative invalid graphs.
    4. Do not add resolver, CLI command, task lifecycle integration, recipe execution, ACR wiring, or runner execution in this task.
    5. Run focused blueprint tests, typecheck, lint on touched source, policy routing, agentplane doctor, and fast local checks before PR/integration.
  Verify Steps: |-
    1. Run `agentplane task verify-show 202605051842-BEJAY8` before verification.
    2. Run focused blueprint tests for the new `packages/agentplane/src/blueprints/**/*.test.ts` coverage.
    3. Run `bun run typecheck`.
    4. Run ESLint on the touched blueprint source and tests.
    5. Run `node .agentplane/policy/check-routing.mjs`.
    6. Run `agentplane doctor`.
    7. Run `bun run ci:local:fast` before push/PR.
    8. Confirm no resolver, CLI command, runner executor, or task lifecycle integration was added.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T19:10:21.287Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented blueprint core model, built-ins, registry, validation, and focused tests. Checks passed: agentplane task verify-show 202605051842-BEJAY8; bun test packages/agentplane/src/blueprints/validate.test.ts; bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/blueprints/validate.test.ts; bun run typecheck; bunx eslint packages/agentplane/src/blueprints packages/agentplane/src/backends/task-backend/cloud-backend.ts packages/agentplane/src/backends/task-backend.cloud.test.ts; bun run docs:ia:check; node .agentplane/policy/check-routing.mjs; node packages/agentplane/bin/agentplane.js doctor; AGENTPLANE_FAST_CHANGED_FILES=... bun run ci:local:fast.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:43:07.851Z, excerpt_hash=sha256:2cf687cbba821abefb5222ade418c00822d6cae192c1c0bca225acad4191ff47
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added schema-first blueprint domain module with seven built-in routes and validation invariants. Also fixed unrelated cloud-backend lint blockers and repo-wide Prettier drift that blocked the required fast CI gate.
      Impact: AgentPlane now has a validated, inspectable blueprint vocabulary without adding resolver, CLI commands, runner execution, or lifecycle integration.
      Resolution: Next implementation step is resolver/explain in a separate task after this model/validation layer lands.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
