---
id: "202604230838-YPDDS3"
title: "Diagnose stale installed hook shims"
result_summary: "Added doctor diagnostics for installed hook shim readiness and regression tests for healthy, stale, missing-runner, clean-project fallback, and unmanaged-hook cases."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
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
  state: "ok"
  updated_at: "2026-04-23T09:21:12.329Z"
  updated_by: "CODER"
  note: "Doctor runtime diagnostics passed after hook-shim readiness coverage; hook suite passed on a clean tree with node@24 and Bun in PATH; format check passed."
commit:
  hash: "8d251428bc7ca66d3cef275da9bce3e94262c58a"
  message: "🩺 YPDDS3 doctor: diagnose stale hook shims"
comments:
  -
    author: "CODER"
    body: "Start: stale installed hook shim diagnostics are ready after installed smoke gate completion."
  -
    author: "CODER"
    body: "Verified: doctor runtime diagnostics and hook suite passed; managed hook shim readiness now reports missing shim, stale fallback format, missing installed runner, installed clean-project fallback behavior, and unmanaged hooks."
events:
  -
    type: "status"
    at: "2026-04-23T08:53:39.147Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: stale installed hook shim diagnostics are ready after installed smoke gate completion."
  -
    type: "verify"
    at: "2026-04-23T09:21:12.329Z"
    author: "CODER"
    state: "ok"
    note: "Doctor runtime diagnostics passed after hook-shim readiness coverage; hook suite passed on a clean tree with node@24 and Bun in PATH; format check passed."
  -
    type: "status"
    at: "2026-04-23T09:21:23.783Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: doctor runtime diagnostics and hook suite passed; managed hook shim readiness now reports missing shim, stale fallback format, missing installed runner, installed clean-project fallback behavior, and unmanaged hooks."
doc_version: 3
doc_updated_at: "2026-04-23T09:21:23.784Z"
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
    ### 2026-04-23T09:21:12.329Z — VERIFY — ok
    
    By: CODER
    
    Note: Doctor runtime diagnostics passed after hook-shim readiness coverage; hook suite passed on a clean tree with node@24 and Bun in PATH; format check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T08:53:39.184Z, excerpt_hash=sha256:4567f96e9d9dc734bd1b5d23d1d41ca49ee46922395a10353c3466ca84912cb1
    
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
### 2026-04-23T09:21:12.329Z — VERIFY — ok

By: CODER

Note: Doctor runtime diagnostics passed after hook-shim readiness coverage; hook suite passed on a clean tree with node@24 and Bun in PATH; format check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T08:53:39.184Z, excerpt_hash=sha256:4567f96e9d9dc734bd1b5d23d1d41ca49ee46922395a10353c3466ca84912cb1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert doctor hook diagnostics and associated tests. Existing hook runtime behavior should remain unchanged.

## Findings
