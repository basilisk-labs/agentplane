---
id: "202607221854-RW8CJF"
title: "Define granular CommandSession capabilities and migrate a pilot slice"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221848-VC4VVS"
  - "202607221850-DRWR0V"
  - "202607221852-ECBY56"
tags:
  - "architecture"
  - "cli"
  - "command-session"
  - "milestone-rc2"
  - "refactor"
  - "rf-24"
  - "v0.7"
  - "wave-internals"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run arch:check"
  - "bun run guards:check"
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
doc_updated_at: "2026-07-22T18:54:17.691Z"
doc_updated_by: "PLANNER"
description: "RF-24a: replace coarse CommandNeeds with composable project/config/backend/task/Git/route/policy/approval/context/provider/output capabilities and prove typed lazy resolution on representative commands."
sections:
  Summary: |-
    Define granular CommandSession capabilities and migrate a pilot slice

    RF-24a: replace coarse CommandNeeds with composable project/config/backend/task/Git/route/policy/approval/context/provider/output capabilities and prove typed lazy resolution on representative commands.
  Scope: |-
    - In scope: capability type model, command catalog declaration, typed handler subsets, lazy resolver graph, preparation tracing hooks, and pilot migration of simple/read, task, route, and provider commands.
    - Out of scope: migrating every command family in one big-bang.
  Plan: |-
    1. Define granular capability tokens and compile-time handler session subsets.
    2. Map legacy CommandNeeds to an explicit compatibility adapter.
    3. Make the resolver construct only declared lazy capabilities.
    4. Migrate representative low-, medium-, and high-dependency command slices.
    5. Add compile-time/runtime denial, laziness, and preparation trace tests.
  Verify Steps: |-
    1. Compile handlers against their declared sessions. Expected: undeclared task/Git/provider access is a type error or typed runtime denial at legacy boundaries.
    2. Run simple command fixtures. Expected: task, Git, route, and provider preparation nodes are never loaded.
    3. Run pilot task/route/provider commands. Expected: only declared capabilities load and output compatibility is unchanged.
    4. Inspect catalog and traces. Expected: requirements and preparation cost are visible per command.
    5. Run focused catalog/session tests, arch check, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert pilot command migrations and restore the explicit legacy CommandNeeds adapter.
    - Keep the capability contract additive until the remaining migration task is complete.
    - Re-run command snapshots, architecture checks, and typecheck.
  Findings: ""
id_source: "generated"
---
## Summary

Define granular CommandSession capabilities and migrate a pilot slice

RF-24a: replace coarse CommandNeeds with composable project/config/backend/task/Git/route/policy/approval/context/provider/output capabilities and prove typed lazy resolution on representative commands.

## Scope

- In scope: capability type model, command catalog declaration, typed handler subsets, lazy resolver graph, preparation tracing hooks, and pilot migration of simple/read, task, route, and provider commands.
- Out of scope: migrating every command family in one big-bang.

## Plan

1. Define granular capability tokens and compile-time handler session subsets.
2. Map legacy CommandNeeds to an explicit compatibility adapter.
3. Make the resolver construct only declared lazy capabilities.
4. Migrate representative low-, medium-, and high-dependency command slices.
5. Add compile-time/runtime denial, laziness, and preparation trace tests.

## Verify Steps

1. Compile handlers against their declared sessions. Expected: undeclared task/Git/provider access is a type error or typed runtime denial at legacy boundaries.
2. Run simple command fixtures. Expected: task, Git, route, and provider preparation nodes are never loaded.
3. Run pilot task/route/provider commands. Expected: only declared capabilities load and output compatibility is unchanged.
4. Inspect catalog and traces. Expected: requirements and preparation cost are visible per command.
5. Run focused catalog/session tests, arch check, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert pilot command migrations and restore the explicit legacy CommandNeeds adapter.
- Keep the capability contract additive until the remaining migration task is complete.
- Re-run command snapshots, architecture checks, and typecheck.

## Findings
