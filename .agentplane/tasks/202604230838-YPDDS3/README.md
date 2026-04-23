---
id: "202604230838-YPDDS3"
title: "Diagnose stale installed hook shims"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604230838-CP7EZT"
tags:
  - "code"
  - "doctor"
  - "hooks"
verify:
  - "bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts"
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T08:40:45.428Z"
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
    body: "Start: stale installed hook shim diagnostics are ready after installed smoke gate completion."
events:
  -
    type: "status"
    at: "2026-04-23T08:53:39.147Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: stale installed hook shim diagnostics are ready after installed smoke gate completion."
doc_version: 3
doc_updated_at: "2026-04-23T08:53:39.184Z"
doc_updated_by: "CODER"
description: "Extend installed workspace diagnostics so AgentPlane reports stale or missing managed hook shims, unavailable installed runners, and clean-project hook skip behavior with actionable remediation."
sections:
  Summary: |-
    Diagnose stale installed hook shims
    
    Extend installed workspace diagnostics so AgentPlane reports stale or missing managed hook shims, unavailable installed runners, and clean-project hook skip behavior with actionable remediation.
  Scope: "In scope: diagnostics only for installed hook/shim readiness and clean-project hook behavior. Out of scope: changing hook enforcement policy or enabling network fallback."
  Plan: |-
    1. Inspect current doctor runtime and workspace checks plus hook install shim format.
    2. Add diagnostics for managed hook presence, shim freshness, embedded installed runner availability, PATH/env fallback state, and clean-project CI-script skip behavior.
    3. Add tests for healthy shim, stale missing installed runner, missing project CI scripts, and unmanaged hooks preservation.
    4. Run doctor runtime and hooks suites.
  Verify Steps: |-
    1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: doctor runtime diagnostics pass.
    2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: hook install/run behavior remains green.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert doctor hook diagnostics and associated tests. Existing hook runtime behavior should remain unchanged."
  Findings: ""
id_source: "generated"
---
## Summary

Diagnose stale installed hook shims

Extend installed workspace diagnostics so AgentPlane reports stale or missing managed hook shims, unavailable installed runners, and clean-project hook skip behavior with actionable remediation.

## Scope

In scope: diagnostics only for installed hook/shim readiness and clean-project hook behavior. Out of scope: changing hook enforcement policy or enabling network fallback.

## Plan

1. Inspect current doctor runtime and workspace checks plus hook install shim format.
2. Add diagnostics for managed hook presence, shim freshness, embedded installed runner availability, PATH/env fallback state, and clean-project CI-script skip behavior.
3. Add tests for healthy shim, stale missing installed runner, missing project CI scripts, and unmanaged hooks preservation.
4. Run doctor runtime and hooks suites.

## Verify Steps

1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: doctor runtime diagnostics pass.
2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: hook install/run behavior remains green.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert doctor hook diagnostics and associated tests. Existing hook runtime behavior should remain unchanged.

## Findings
