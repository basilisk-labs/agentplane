---
id: "202604191643-NYC3QG"
title: "Add AgentplaneError subclasses across failure domains"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Introducing the shared AgentplaneError subclass hierarchy in the central error surface first, then wiring only central mappers so CLI rendering stays stable."
events:
  -
    type: "status"
    at: "2026-04-20T11:11:13.223Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Introducing the shared AgentplaneError subclass hierarchy in the central error surface first, then wiring only central mappers so CLI rendering stays stable."
doc_version: 3
doc_updated_at: "2026-04-20T11:11:13.234Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
