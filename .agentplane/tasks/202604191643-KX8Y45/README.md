---
id: "202604191643-KX8Y45"
title: "Unify CLI error rendering and guidance"
result_summary: "Unified CLI error mapping and rendering into one central pipeline while preserving focused text and JSON output contracts."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "errors"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T11:17:16.718Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T11:21:56.440Z"
  updated_by: "CODER"
  note: "Verified: CLI error mapping and rendering now share one central error-map pipeline; focused CLI error/render tests, typecheck, format, lint, and framework bootstrap passed."
commit:
  hash: "18a6dde6106c2ed7d2cd3bd66f81e3c962c40d4d"
  message: "📝 KX8Y45 verify: record error pipeline checks"
comments:
  -
    author: "CODER"
    body: "Start: Consolidating CLI error mapping and rendering into one central pipeline while preserving the existing text and JSON error output contract."
  -
    author: "CODER"
    body: "Verified: error rendering and guidance are centralized in cli/error-map.ts, runCli imports the single pipeline, and the legacy run-cli/error-guidance module is removed."
events:
  -
    type: "status"
    at: "2026-04-20T11:17:23.539Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Consolidating CLI error mapping and rendering into one central pipeline while preserving the existing text and JSON error output contract."
  -
    type: "verify"
    at: "2026-04-20T11:21:56.440Z"
    author: "CODER"
    state: "ok"
    note: "Verified: CLI error mapping and rendering now share one central error-map pipeline; focused CLI error/render tests, typecheck, format, lint, and framework bootstrap passed."
  -
    type: "status"
    at: "2026-04-20T11:22:14.420Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: error rendering and guidance are centralized in cli/error-map.ts, runCli imports the single pipeline, and the legacy run-cli/error-guidance module is removed."
doc_version: 3
doc_updated_at: "2026-04-20T11:22:14.421Z"
doc_updated_by: "CODER"
description: "Epic H′. Merge current error mapping and guidance logic into one renderError pipeline with tests."
sections:
  Summary: |-
    Unify CLI error rendering and guidance
    
    Epic H′. Merge current error mapping and guidance logic into one renderError pipeline with tests.
  Scope: |-
    - In scope: Epic H′. Merge current error mapping and guidance logic into one renderError pipeline with tests.
    - Out of scope: unrelated refactors not required for "Unify CLI error rendering and guidance".
  Plan: |-
    1. Move CLI error guidance/rendering out of run-cli/error-guidance.ts into the central cli/error-map.ts module alongside mapCoreError/mapBackendError.
    2. Keep the public rendering contract stable by preserving writeError output for text and JSON modes.
    3. Move resolveAgentplaneHome to update-warning.ts because it is update-cache plumbing, not error rendering.
    4. Delete the legacy error-guidance module and update imports.
    5. Add focused tests for writeError text/JSON guidance and run existing CLI error tests, lint, typecheck, and format.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T11:21:56.440Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: CLI error mapping and rendering now share one central error-map pipeline; focused CLI error/render tests, typecheck, format, lint, and framework bootstrap passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T11:17:23.624Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts
    Result: pass
    Evidence: 3 files passed, 59 tests passed.
    Scope: central error rendering, runCli writeError integration, JSON/text CLI error behavior.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: TypeScript project references.
    
    Command: bun run format:check
    Result: pass
    Evidence: all matched files use Prettier code style.
    Scope: repository formatting gate.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint exited 0.
    Scope: packages, scripts, eslint config, vitest config.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: core and agentplane built; repo-local runtime verified.
    Scope: runtime snapshot freshness after CLI error pipeline changes.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Unify CLI error rendering and guidance

Epic H′. Merge current error mapping and guidance logic into one renderError pipeline with tests.

## Scope

- In scope: Epic H′. Merge current error mapping and guidance logic into one renderError pipeline with tests.
- Out of scope: unrelated refactors not required for "Unify CLI error rendering and guidance".

## Plan

1. Move CLI error guidance/rendering out of run-cli/error-guidance.ts into the central cli/error-map.ts module alongside mapCoreError/mapBackendError.
2. Keep the public rendering contract stable by preserving writeError output for text and JSON modes.
3. Move resolveAgentplaneHome to update-warning.ts because it is update-cache plumbing, not error rendering.
4. Delete the legacy error-guidance module and update imports.
5. Add focused tests for writeError text/JSON guidance and run existing CLI error tests, lint, typecheck, and format.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T11:21:56.440Z — VERIFY — ok

By: CODER

Note: Verified: CLI error mapping and rendering now share one central error-map pipeline; focused CLI error/render tests, typecheck, format, lint, and framework bootstrap passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T11:17:23.624Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts
Result: pass
Evidence: 3 files passed, 59 tests passed.
Scope: central error rendering, runCli writeError integration, JSON/text CLI error behavior.

Command: bun run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: TypeScript project references.

Command: bun run format:check
Result: pass
Evidence: all matched files use Prettier code style.
Scope: repository formatting gate.

Command: bun run lint:core
Result: pass
Evidence: eslint exited 0.
Scope: packages, scripts, eslint config, vitest config.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: core and agentplane built; repo-local runtime verified.
Scope: runtime snapshot freshness after CLI error pipeline changes.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
