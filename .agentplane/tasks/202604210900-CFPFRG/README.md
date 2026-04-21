---
id: "202604210900-CFPFRG"
title: "Split hooks and work-start command hotspots"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604210859-HCJQP0"
tags:
  - "code"
  - "hooks"
  - "refactor"
verify: []
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T09:00:10.086Z"
doc_updated_by: "PLANNER"
description: "Decompose hooks and work-start command implementations after hosted-close pipeline patterns are established."
sections:
  Summary: "Apply the lifecycle/module extraction pattern to hooks/index.ts and branch/work-start.ts where it improves clarity."
  Scope: "In scope: hooks command implementation, work-start command implementation, and affected tests. Out of scope: workflow mode semantics and branch naming policy changes."
  Plan: |-
    1. Reuse extraction patterns proven in T17.
    2. Split hooks by subcommand/responsibility.
    3. Split work-start by validation, branch/worktree operations, scaffolding, and reporting.
    4. Run hooks and branch workflow tests.
  Verify Steps: |-
    - Each entrypoint is smaller and delegates to cohesive modules.
    - Affected tests pass.
    - No CLI help/contract changes except incidental source organization.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert module extraction for hooks/work-start."
  Findings: "Depends on T17 so the command-pipeline pattern is established first."
id_source: "generated"
---
## Summary

Apply the lifecycle/module extraction pattern to hooks/index.ts and branch/work-start.ts where it improves clarity.

## Scope

In scope: hooks command implementation, work-start command implementation, and affected tests. Out of scope: workflow mode semantics and branch naming policy changes.

## Plan

1. Reuse extraction patterns proven in T17.
2. Split hooks by subcommand/responsibility.
3. Split work-start by validation, branch/worktree operations, scaffolding, and reporting.
4. Run hooks and branch workflow tests.

## Verify Steps

- Each entrypoint is smaller and delegates to cohesive modules.
- Affected tests pass.
- No CLI help/contract changes except incidental source organization.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert module extraction for hooks/work-start.

## Findings

Depends on T17 so the command-pipeline pattern is established first.
