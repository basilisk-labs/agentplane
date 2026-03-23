---
id: "202603231310-BWD402"
title: "R6: Add runner config and adapter selection"
result_summary: "Added runner config surface and adapter selection defaults."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
depends_on:
  - "202603231310-NK646A"
tags:
  - "code"
  - "config"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:45.775Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T14:07:52.845Z"
  updated_by: "CODER"
  note: "Runner adapter config defaults and validation verified."
commit:
  hash: "53f4c36bd64a1fc3a39145cb7abb964935f4099b"
  message: "✅ BWD402 code: done"
comments:
  -
    author: "CODER"
    body: "Start: add runner adapter configuration with a default codex selection and validation so later task/scenario execution can choose adapters without hardcoding the policy into command handlers."
  -
    author: "CODER"
    body: "Verified: added runner.default_adapter config with codex default, schema validation for known adapter ids, and a shared runner-side resolver for adapter selection."
events:
  -
    type: "status"
    at: "2026-03-23T14:04:58.409Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add runner adapter configuration with a default codex selection and validation so later task/scenario execution can choose adapters without hardcoding the policy into command handlers."
  -
    type: "verify"
    at: "2026-03-23T14:07:52.845Z"
    author: "CODER"
    state: "ok"
    note: "Runner adapter config defaults and validation verified."
  -
    type: "status"
    at: "2026-03-23T14:08:01.515Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added runner.default_adapter config with codex default, schema validation for known adapter ids, and a shared runner-side resolver for adapter selection."
doc_version: 3
doc_updated_at: "2026-03-23T14:08:05.585Z"
doc_updated_by: "CODER"
description: "Introduce config surface for default runner selection with an initial codex adapter and future custom-runner slot."
sections:
  Summary: |-
    R6: Add runner config and adapter selection
    
    Introduce config surface for default runner selection with an initial codex adapter and future custom-runner slot.
  Scope: |-
    - In scope: Introduce config surface for default runner selection with an initial codex adapter and future custom-runner slot.
    - Out of scope: unrelated refactors not required for "R6: Add runner config and adapter selection".
  Plan: |-
    1. Extend config parsing and schema with a runner selection surface.
    2. Default the active adapter to codex while reserving a stable path for future custom adapters.
    3. Add config validation tests for known and unknown adapter ids.
  Verify Steps: |-
    1. Load config without an explicit runner value. Expected: codex is selected by default.
    2. Load config with an unknown adapter id. Expected: config validation fails with a clear error.
    3. Run config parsing tests. Expected: existing config behavior stays intact outside the new runner fields.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T14:07:52.845Z — VERIFY — ok
    
    By: CODER
    
    Note: Runner adapter config defaults and validation verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T14:04:58.410Z, excerpt_hash=sha256:c133b100ea0e7c906cceb7aec80235a109b7a9b246c46d36cc5e2ccd0ca331dd
    
    Details:
    
    - Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts
      Result: pass
      Evidence: 2 files, 18 tests passed; default runner selection, explicit custom selection, and invalid adapter-id validation covered.
      Scope: core config schema/defaults and runner adapter selection helper.
    - Command: ./node_modules/.bin/eslint packages/core/src/config/config.ts packages/core/src/config/config.test.ts packages/core/src/index.ts packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/index.ts
      Result: pass
      Evidence: no lint findings.
      Scope: changed TypeScript sources for runner config surface and exports.
    - Command: ./node_modules/.bin/prettier --write packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/index.ts packages/core/src/config/config.ts packages/core/src/config/config.test.ts packages/core/src/index.ts packages/core/schemas/config.schema.json packages/spec/schemas/config.schema.json packages/spec/examples/config.json
      Result: pass
      Evidence: runner config file reformatted; all touched TS/JSON files normalized.
      Scope: modified runner/core/spec config files formatting.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R6: Add runner config and adapter selection

Introduce config surface for default runner selection with an initial codex adapter and future custom-runner slot.

## Scope

- In scope: Introduce config surface for default runner selection with an initial codex adapter and future custom-runner slot.
- Out of scope: unrelated refactors not required for "R6: Add runner config and adapter selection".

## Plan

1. Extend config parsing and schema with a runner selection surface.
2. Default the active adapter to codex while reserving a stable path for future custom adapters.
3. Add config validation tests for known and unknown adapter ids.

## Verify Steps

1. Load config without an explicit runner value. Expected: codex is selected by default.
2. Load config with an unknown adapter id. Expected: config validation fails with a clear error.
3. Run config parsing tests. Expected: existing config behavior stays intact outside the new runner fields.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T14:07:52.845Z — VERIFY — ok

By: CODER

Note: Runner adapter config defaults and validation verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T14:04:58.410Z, excerpt_hash=sha256:c133b100ea0e7c906cceb7aec80235a109b7a9b246c46d36cc5e2ccd0ca331dd

Details:

- Command: bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/runner/config.test.ts
  Result: pass
  Evidence: 2 files, 18 tests passed; default runner selection, explicit custom selection, and invalid adapter-id validation covered.
  Scope: core config schema/defaults and runner adapter selection helper.
- Command: ./node_modules/.bin/eslint packages/core/src/config/config.ts packages/core/src/config/config.test.ts packages/core/src/index.ts packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/index.ts
  Result: pass
  Evidence: no lint findings.
  Scope: changed TypeScript sources for runner config surface and exports.
- Command: ./node_modules/.bin/prettier --write packages/agentplane/src/runner/config.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/index.ts packages/core/src/config/config.ts packages/core/src/config/config.test.ts packages/core/src/index.ts packages/core/schemas/config.schema.json packages/spec/schemas/config.schema.json packages/spec/examples/config.json
  Result: pass
  Evidence: runner config file reformatted; all touched TS/JSON files normalized.
  Scope: modified runner/core/spec config files formatting.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
