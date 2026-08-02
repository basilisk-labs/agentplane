---
id: "202608020147-VMBX4H"
title: "Scope pre-commit mutation policy to task-side base-sync diff"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "bugfix"
  - "v0.7"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T01:47:52.100Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement base-sync-aware pre-commit path attribution and focused regression coverage."
events:
  -
    type: "status"
    at: "2026-08-02T01:48:08.653Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement base-sync-aware pre-commit path attribution and focused regression coverage."
doc_version: 3
doc_updated_at: "2026-08-02T01:57:36.841Z"
doc_updated_by: "CODER"
description: "When a branch_pr task merges the configured base, pre-commit must evaluate only the task-side diff against the merged base parent. Incoming main changes, including other task artifacts, must not be attributed to the active task. Preserve normal staged-path enforcement outside configured base-sync merges and add focused regression coverage."
sections:
  Summary: |-
    Scope pre-commit mutation policy to task-side base-sync diff

    When a branch_pr task merges the configured base, pre-commit must evaluate only the task-side diff against the merged base parent. Incoming main changes, including other task artifacts, must not be attributed to the active task. Preserve normal staged-path enforcement outside configured base-sync merges and add focused regression coverage.
  Scope: |-
    - In scope: When a branch_pr task merges the configured base, pre-commit must evaluate only the task-side diff against the merged base parent. Incoming main changes, including other task artifacts, must not be attributed to the active task. Preserve normal staged-path enforcement outside configured base-sync merges and add focused regression coverage.
    - Out of scope: unrelated refactors not required for "Scope pre-commit mutation policy to task-side base-sync diff".
  Plan: |-
    1. Reproduce a docs-task pre-commit during a configured-base merge where incoming main history contains another task's implementation and generated artifacts.
    2. Detect an in-progress configured-base merge in the pre-commit hook and derive policy staged paths from the index relative to the merged base parent, while keeping the original staged path set for ordinary commits and non-base merges.
    3. Add positive coverage for incoming base artifacts plus task-side docs changes, and negative coverage proving task-side implementation mutations still fail.
    4. Run focused hook/policy tests, typecheck, lint, architecture, formatting, and semantic evaluator review.
    5. Publish and integrate through hosted checks, then retry the blocked YMYYQ8 base sync without bypassing hooks.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts`. Expected: all hook guard cases pass, including configured-base positive and task-side negative cases.
    2. Run `bun run typecheck`. Expected: TypeScript validation exits 0.
    3. Run `bun run lint:core`. Expected: core lint exits 0.
    4. Run `bun run arch:check && bun run knip`. Expected: architecture boundaries and dependency hygiene pass.
    5. Run `bun run format:check && git diff --check`. Expected: formatting and whitespace checks pass.
    6. Reproduce the blocked YMYYQ8 merge from current main after integration. Expected: both pre-commit and commit-msg hooks accept incoming main implementation/task artifacts while continuing to enforce the docs task-side diff.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "4e6cf3e54a11ac56c07cabc0b9d8b01d89ac274f"
    version: 1
id_source: "generated"
---
## Summary

Scope pre-commit mutation policy to task-side base-sync diff

When a branch_pr task merges the configured base, pre-commit must evaluate only the task-side diff against the merged base parent. Incoming main changes, including other task artifacts, must not be attributed to the active task. Preserve normal staged-path enforcement outside configured base-sync merges and add focused regression coverage.

## Scope

- In scope: When a branch_pr task merges the configured base, pre-commit must evaluate only the task-side diff against the merged base parent. Incoming main changes, including other task artifacts, must not be attributed to the active task. Preserve normal staged-path enforcement outside configured base-sync merges and add focused regression coverage.
- Out of scope: unrelated refactors not required for "Scope pre-commit mutation policy to task-side base-sync diff".

## Plan

1. Reproduce a docs-task pre-commit during a configured-base merge where incoming main history contains another task's implementation and generated artifacts.
2. Detect an in-progress configured-base merge in the pre-commit hook and derive policy staged paths from the index relative to the merged base parent, while keeping the original staged path set for ordinary commits and non-base merges.
3. Add positive coverage for incoming base artifacts plus task-side docs changes, and negative coverage proving task-side implementation mutations still fail.
4. Run focused hook/policy tests, typecheck, lint, architecture, formatting, and semantic evaluator review.
5. Publish and integrate through hosted checks, then retry the blocked YMYYQ8 base sync without bypassing hooks.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.pre-commit.test.ts`. Expected: all hook guard cases pass, including configured-base positive and task-side negative cases.
2. Run `bun run typecheck`. Expected: TypeScript validation exits 0.
3. Run `bun run lint:core`. Expected: core lint exits 0.
4. Run `bun run arch:check && bun run knip`. Expected: architecture boundaries and dependency hygiene pass.
5. Run `bun run format:check && git diff --check`. Expected: formatting and whitespace checks pass.
6. Reproduce the blocked YMYYQ8 merge from current main after integration. Expected: both pre-commit and commit-msg hooks accept incoming main implementation/task artifacts while continuing to enforce the docs task-side diff.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
