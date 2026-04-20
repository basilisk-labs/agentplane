---
id: "202604191643-NYC3QG"
title: "Add AgentplaneError subclasses across failure domains"
result_summary: "Introduced the shared AgentplaneError hierarchy and migrated central usage/core/backend mapping surfaces without changing CLI error contracts."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "errors"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T11:11:06.726Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T11:16:11.493Z"
  updated_by: "CODER"
  note: "Verified: central AgentplaneError hierarchy preserves CliError compatibility and stable CLI rendering; focused tests, typecheck, format, lint, and framework bootstrap passed."
commit:
  hash: "cd5ff7eba2b5e376d31b3fabbd7045afb7371cad"
  message: "📝 NYC3QG verify: record error hierarchy checks"
comments:
  -
    author: "CODER"
    body: "Start: Introducing the shared AgentplaneError subclass hierarchy in the central error surface first, then wiring only central mappers so CLI rendering stays stable."
  -
    author: "CODER"
    body: "Verified: AgentplaneError base and domain subclasses are in place, central mappers use typed subclasses, and CliError compatibility plus exit-code rendering stayed stable."
events:
  -
    type: "status"
    at: "2026-04-20T11:11:13.223Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Introducing the shared AgentplaneError subclass hierarchy in the central error surface first, then wiring only central mappers so CLI rendering stays stable."
  -
    type: "verify"
    at: "2026-04-20T11:16:11.493Z"
    author: "CODER"
    state: "ok"
    note: "Verified: central AgentplaneError hierarchy preserves CliError compatibility and stable CLI rendering; focused tests, typecheck, format, lint, and framework bootstrap passed."
  -
    type: "status"
    at: "2026-04-20T11:16:31.147Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: AgentplaneError base and domain subclasses are in place, central mappers use typed subclasses, and CliError compatibility plus exit-code rendering stayed stable."
doc_version: 3
doc_updated_at: "2026-04-20T11:16:31.148Z"
doc_updated_by: "CODER"
description: "Epic H′. Introduce targeted error subclasses for validation, backend, git, runtime, and network failures."
sections:
  Summary: |-
    Add AgentplaneError subclasses across failure domains
    
    Epic H′. Introduce targeted error subclasses for validation, backend, git, runtime, and network failures.
  Scope: |-
    - In scope: Epic H′. Introduce targeted error subclasses for validation, backend, git, runtime, and network failures.
    - Out of scope: unrelated refactors not required for "Add AgentplaneError subclasses across failure domains".
  Plan: |-
    1. Introduce AgentplaneError as the shared base class while preserving CliError as a compatibility alias/subclass for existing CLI contracts.
    2. Add targeted subclasses for validation, backend, git, runtime, network, IO, handoff, usage, and internal failures with default exit-code mapping.
    3. Update central error mappers/factories to instantiate domain subclasses without changing rendered output or JSON contract.
    4. Add focused tests for subclass identity, exit codes, JSON formatting, and mapCoreError/mapBackendError behavior.
    5. Run focused error tests plus lint/typecheck/format, commit, verify, and finish.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T11:16:11.493Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: central AgentplaneError hierarchy preserves CliError compatibility and stable CLI rendering; focused tests, typecheck, format, lint, and framework bootstrap passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T11:11:13.234Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/exit-code.contract.test.ts packages/agentplane/src/cli/spec/parse.test.ts
    Result: pass
    Evidence: 4 files passed, 16 tests passed.
    Scope: shared error hierarchy, central error mapping, exit-code contract, usage-error factory.
    
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
    Scope: runtime snapshot freshness after CLI/shared error code changes.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add AgentplaneError subclasses across failure domains

Epic H′. Introduce targeted error subclasses for validation, backend, git, runtime, and network failures.

## Scope

- In scope: Epic H′. Introduce targeted error subclasses for validation, backend, git, runtime, and network failures.
- Out of scope: unrelated refactors not required for "Add AgentplaneError subclasses across failure domains".

## Plan

1. Introduce AgentplaneError as the shared base class while preserving CliError as a compatibility alias/subclass for existing CLI contracts.
2. Add targeted subclasses for validation, backend, git, runtime, network, IO, handoff, usage, and internal failures with default exit-code mapping.
3. Update central error mappers/factories to instantiate domain subclasses without changing rendered output or JSON contract.
4. Add focused tests for subclass identity, exit codes, JSON formatting, and mapCoreError/mapBackendError behavior.
5. Run focused error tests plus lint/typecheck/format, commit, verify, and finish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T11:16:11.493Z — VERIFY — ok

By: CODER

Note: Verified: central AgentplaneError hierarchy preserves CliError compatibility and stable CLI rendering; focused tests, typecheck, format, lint, and framework bootstrap passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T11:11:13.234Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bunx vitest run packages/agentplane/src/shared/errors.test.ts packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/exit-code.contract.test.ts packages/agentplane/src/cli/spec/parse.test.ts
Result: pass
Evidence: 4 files passed, 16 tests passed.
Scope: shared error hierarchy, central error mapping, exit-code contract, usage-error factory.

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
Scope: runtime snapshot freshness after CLI/shared error code changes.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
