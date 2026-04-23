---
id: "202604230838-T201MB"
title: "Improve lifecycle error guidance"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604230838-X40R09"
tags:
  - "cli"
  - "code"
  - "ux"
verify:
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T08:40:45.836Z"
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
    body: "Start: lifecycle error guidance work is ready after quickstart guidance completion."
events:
  -
    type: "status"
    at: "2026-04-23T09:25:41.811Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: lifecycle error guidance work is ready after quickstart guidance completion."
doc_version: 3
doc_updated_at: "2026-04-23T09:25:41.865Z"
doc_updated_by: "CODER"
description: "Make common lifecycle errors actionable for start-ready and finish: show prefix and length diagnostics for structured comments and provide concrete commit-selection guidance when finish requires --commit."
sections:
  Summary: |-
    Improve lifecycle error guidance
    
    Make common lifecycle errors actionable for start-ready and finish: show prefix and length diagnostics for structured comments and provide concrete commit-selection guidance when finish requires --commit.
  Scope: "In scope: error-message and test improvements for start-ready/finish lifecycle guidance. Out of scope: weakening lifecycle requirements or reintroducing implicit HEAD fallback."
  Plan: |-
    1. Inspect structured comment validation and finish missing-commit validation paths.
    2. Replace terse errors with diagnostics that include actual length, expected prefix, minimum length, and a concrete corrected command shape.
    3. Add finish diagnostics that show how to select a valid commit without restoring implicit HEAD fallback.
    4. Add or update lifecycle tests for these error messages.
  Verify Steps: |-
    1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts`. Expected: lifecycle validation coverage passes.
    2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks*.test.ts` if shared task command helpers are touched. Expected: affected CLI task suites pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert diagnostics and test expectation updates. Runtime lifecycle semantics should remain unchanged."
  Findings: ""
id_source: "generated"
---
## Summary

Improve lifecycle error guidance

Make common lifecycle errors actionable for start-ready and finish: show prefix and length diagnostics for structured comments and provide concrete commit-selection guidance when finish requires --commit.

## Scope

In scope: error-message and test improvements for start-ready/finish lifecycle guidance. Out of scope: weakening lifecycle requirements or reintroducing implicit HEAD fallback.

## Plan

1. Inspect structured comment validation and finish missing-commit validation paths.
2. Replace terse errors with diagnostics that include actual length, expected prefix, minimum length, and a concrete corrected command shape.
3. Add finish diagnostics that show how to select a valid commit without restoring implicit HEAD fallback.
4. Add or update lifecycle tests for these error messages.

## Verify Steps

1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts`. Expected: lifecycle validation coverage passes.
2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks*.test.ts` if shared task command helpers are touched. Expected: affected CLI task suites pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert diagnostics and test expectation updates. Runtime lifecycle semantics should remain unchanged.

## Findings
