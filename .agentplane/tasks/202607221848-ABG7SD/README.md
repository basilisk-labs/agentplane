---
id: "202607221848-ABG7SD"
title: "Align CLI error, exit-code, and Node support contracts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221846-SXJ75T"
  - "202607221846-ZAENM6"
tags:
  - "cli"
  - "contract-drift"
  - "docs"
  - "milestone-alpha2"
  - "node"
  - "refactor"
  - "v0.7"
  - "wave-contracts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run docs:cli:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T18:48:42.500Z"
doc_updated_by: "PLANNER"
description: "Correct the verified drift between documented and runtime exit/error shapes, structured remediation fields, package engine ranges, and the CI support matrix before 0.7 compatibility is frozen."
sections:
  Summary: |-
    Align CLI error, exit-code, and Node support contracts

    Correct the verified drift between documented and runtime exit/error shapes, structured remediation fields, package engine ranges, and the CI support matrix before 0.7 compatibility is frozen.
  Scope: |-
    - In scope: one generated source for CLI exit codes and error payload documentation, guidance/remediation compatibility, installed-tarball fixtures, aligned Node engine declarations or an explicit tested matrix, and CI coverage for every supported runtime.
    - Out of scope: changing unrelated command semantics or removing an existing error field without migration evidence.
  Plan: |-
    1. Inventory runtime exit/error codes, formatter fields, package engines, and current CI Node jobs from the baseline.
    2. Define generated contract metadata consumed by runtime tests and public docs.
    3. Align package engine policy and add the corresponding CI matrix or document an intentional unified bump.
    4. Extend installed-tarball smoke to assert representative error and exit behavior.
    5. Regenerate docs and prove compatibility.
  Verify Steps: |-
    1. Generate the CLI contract reference from runtime metadata. Expected: codes 0 through 9 and every public error/remediation field match emitted JSON.
    2. Exercise representative usage, policy, stale-state, and internal failures from the installed tarball. Expected: documented exit codes and shapes are exact.
    3. Run the declared Node support matrix. Expected: every advertised engine range is tested, or all packages consistently declare the narrower supported range.
    4. Run `bun run docs:cli:check`, `bun run test:critical`, `bun run typecheck`, and `bun run ci:contract`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: ""
id_source: "generated"
---
## Summary

Align CLI error, exit-code, and Node support contracts

Correct the verified drift between documented and runtime exit/error shapes, structured remediation fields, package engine ranges, and the CI support matrix before 0.7 compatibility is frozen.

## Scope

- In scope: one generated source for CLI exit codes and error payload documentation, guidance/remediation compatibility, installed-tarball fixtures, aligned Node engine declarations or an explicit tested matrix, and CI coverage for every supported runtime.
- Out of scope: changing unrelated command semantics or removing an existing error field without migration evidence.

## Plan

1. Inventory runtime exit/error codes, formatter fields, package engines, and current CI Node jobs from the baseline.
2. Define generated contract metadata consumed by runtime tests and public docs.
3. Align package engine policy and add the corresponding CI matrix or document an intentional unified bump.
4. Extend installed-tarball smoke to assert representative error and exit behavior.
5. Regenerate docs and prove compatibility.

## Verify Steps

1. Generate the CLI contract reference from runtime metadata. Expected: codes 0 through 9 and every public error/remediation field match emitted JSON.
2. Exercise representative usage, policy, stale-state, and internal failures from the installed tarball. Expected: documented exit codes and shapes are exact.
3. Run the declared Node support matrix. Expected: every advertised engine range is tested, or all packages consistently declare the narrower supported range.
4. Run `bun run docs:cli:check`, `bun run test:critical`, `bun run typecheck`, and `bun run ci:contract`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings
