---
id: "202603241826-ZPWNDW"
title: "Make expected_exit_contract honest in main runner runtime"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
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
  updated_at: "2026-03-24T18:27:38.328Z"
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
    body: "Start: remove expected_exit_contract from the main runner execution surface so adapters, resolver outputs, and docs stop presenting arbitrary scenario-specific strings as an enforceable shared runtime contract."
events:
  -
    type: "status"
    at: "2026-03-24T18:27:54.004Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove expected_exit_contract from the main runner execution surface so adapters, resolver outputs, and docs stop presenting arbitrary scenario-specific strings as an enforceable shared runtime contract."
doc_version: 3
doc_updated_at: "2026-03-24T18:30:06.510Z"
doc_updated_by: "CODER"
description: "Remove recipe run_profile.expected_exit_contract from the main-repo runner execution surface because current catalog values are arbitrary scenario-specific strings and cannot be enforced as a deterministic shared runner contract."
sections:
  Summary: |-
    Make expected_exit_contract honest in main runner runtime
    
    Remove recipe run_profile.expected_exit_contract from the main-repo runner execution surface because current catalog values are arbitrary scenario-specific strings and cannot be enforced as a deterministic shared runner contract.
  Scope: |-
    - In scope: Remove recipe run_profile.expected_exit_contract from the main-repo runner execution surface because current catalog values are arbitrary scenario-specific strings and cannot be enforced as a deterministic shared runner contract.
    - Out of scope: unrelated refactors not required for "Make expected_exit_contract honest in main runner runtime".
  Plan: |-
    1. Trace every main-repo path where recipe run_profile.expected_exit_contract is normalized, exported, displayed, or tested, and separate main runtime behavior from external catalog lag.
    2. Remove expected_exit_contract from the main runner execution surface and update adapters, resolver outputs, policy display, and tests so the runtime stops pretending that arbitrary strings are enforceable.
    3. Update docs and fixtures so scenario and runner contracts describe expected_exit_contract as removed from main-repo runtime until a deterministic schema exists.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: expected_exit_contract is no longer propagated as an active runner policy field, and recipes/scenarios still resolve cleanly.
    2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the contract removal.
    3. Inspect updated docs and generated surfaces for expected_exit_contract. Expected: main-repo runtime no longer promises it as an execution contract; any remaining catalog references are described as external lag only.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - The main-repo runner no longer resolves or exports legacy expected_exit_contract values into resolver output, adapter env, or capability display.
    - Manifest parsing still accepts the field for external recipe compatibility, but active runtime semantics now ignore it instead of presenting arbitrary strings as a shared execution contract.
    - Remaining references are limited to the manifest parser, legacy recipe fixtures, and docs that explicitly describe the field as external-catalog lag.
id_source: "generated"
---
## Summary

Make expected_exit_contract honest in main runner runtime

Remove recipe run_profile.expected_exit_contract from the main-repo runner execution surface because current catalog values are arbitrary scenario-specific strings and cannot be enforced as a deterministic shared runner contract.

## Scope

- In scope: Remove recipe run_profile.expected_exit_contract from the main-repo runner execution surface because current catalog values are arbitrary scenario-specific strings and cannot be enforced as a deterministic shared runner contract.
- Out of scope: unrelated refactors not required for "Make expected_exit_contract honest in main runner runtime".

## Plan

1. Trace every main-repo path where recipe run_profile.expected_exit_contract is normalized, exported, displayed, or tested, and separate main runtime behavior from external catalog lag.
2. Remove expected_exit_contract from the main runner execution surface and update adapters, resolver outputs, policy display, and tests so the runtime stops pretending that arbitrary strings are enforceable.
3. Update docs and fixtures so scenario and runner contracts describe expected_exit_contract as removed from main-repo runtime until a deterministic schema exists.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. Expected: expected_exit_contract is no longer propagated as an active runner policy field, and recipes/scenarios still resolve cleanly.
2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the contract removal.
3. Inspect updated docs and generated surfaces for expected_exit_contract. Expected: main-repo runtime no longer promises it as an execution contract; any remaining catalog references are described as external lag only.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- The main-repo runner no longer resolves or exports legacy expected_exit_contract values into resolver output, adapter env, or capability display.
- Manifest parsing still accepts the field for external recipe compatibility, but active runtime semantics now ignore it instead of presenting arbitrary strings as a shared execution contract.
- Remaining references are limited to the manifest parser, legacy recipe fixtures, and docs that explicitly describe the field as external-catalog lag.
