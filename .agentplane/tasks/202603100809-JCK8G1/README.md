---
id: "202603100809-JCK8G1"
title: "Recipes v1: make scenario CLI a validating placeholder over resolver surface"
result_summary: "Scenario CLI now exposes the recipe resolver surface directly and no longer executes recipe tools in v1."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202603100808-FKN7RT"
  - "202603100808-ZCCV0Z"
  - "202603100816-BRJSBM"
tags:
  - "code"
  - "recipes"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-10T11:41:00.596Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by user in chat: continue closing the remaining recipes v1 task graph; scenario CLI may now be reduced to a validating placeholder on top of the resolver surface without implementing orchestration execution."
verification:
  state: "ok"
  updated_at: "2026-03-10T11:50:07.163Z"
  updated_by: "CODER"
  note: "Scenario list/info/run output inspected through the updated resolver-backed scenario test contours; bun typecheck, targeted recipes/scenario vitest suites, and package builds passed on commit 9424f196."
commit:
  hash: "9424f19695a4192f3e88009fb0a8712422c36500"
  message: "✨ JCK8G1 task: make scenario CLI a validating placeholder"
comments:
  -
    author: "CODER"
    body: "Start: rework scenario list/info/run to use resolver outputs and make scenario run a validating placeholder that prepares but does not execute recipe orchestration."
  -
    author: "CODER"
    body: "Verified: scenario list/info now read resolver-backed manifest descriptors, and scenario run is reduced to a validating prepared-plan placeholder with no orchestration execution."
events:
  -
    type: "status"
    at: "2026-03-10T11:41:04.300Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: rework scenario list/info/run to use resolver outputs and make scenario run a validating placeholder that prepares but does not execute recipe orchestration."
  -
    type: "verify"
    at: "2026-03-10T11:50:07.163Z"
    author: "CODER"
    state: "ok"
    note: "Scenario list/info/run output inspected through the updated resolver-backed scenario test contours; bun typecheck, targeted recipes/scenario vitest suites, and package builds passed on commit 9424f196."
  -
    type: "status"
    at: "2026-03-10T11:50:17.407Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: scenario list/info now read resolver-backed manifest descriptors, and scenario run is reduced to a validating prepared-plan placeholder with no orchestration execution."
doc_version: 3
doc_updated_at: "2026-03-10T11:50:17.407Z"
doc_updated_by: "CODER"
description: "Rework scenario list/info/run to use manifest-level descriptors and resolver outputs, with scenario run limited to validation and prepared run-plan output until orchestration runtime exists."
id_source: "generated"
---
## Summary

Recipes v1: align scenario CLI with manifest-driven recipe surface

Keep scenario discovery and info manifest-driven for project-local recipes, and reduce scenario run to a placeholder that only validates recipe/scenario references until orchestration runtime is designed.

## Scope

- In scope: Keep scenario discovery and info manifest-driven for project-local recipes, and reduce scenario run to a placeholder that only validates recipe/scenario references until orchestration runtime is designed.
- Out of scope: unrelated refactors not required for "Recipes v1: align scenario CLI with manifest-driven recipe surface".

## Plan

1. Rework `scenario list` and `scenario info` to read manifest-level scenario descriptors through the new recipe resolver instead of loading scenario definitions as the primary surface.
2. Reduce `scenario run` to a validating placeholder: resolve the recipe scenario, validate recipe-local file references and declared compatibility, print a prepared run plan, then stop with a controlled non-execution result.
3. Update targeted command/CLI tests so the scenario surface reflects resolver output and placeholder semantics without reintroducing orchestration execution.

## Verify Steps

1. Inspect `scenario list`, `scenario info`, and `scenario run` output for one installed recipe. Expected: list/info are manifest-driven through resolver output, and run prints a prepared run plan instead of executing recipe tools.
2. Run `bun run typecheck`. Expected: scenario command call sites compile cleanly against the resolver surface.
3. Run `bun x vitest run packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/commands/scenario/impl/commands.test.ts packages/agentplane/src/cli/run-cli.recipes.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: scenario CLI placeholder behavior and dependent recipe/scenario flows pass without regressions.
4. Run `git status --short`. Expected: final diff is limited to the scenario-placeholder task scope and task-artifact updates.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-10T11:50:07.163Z — VERIFY — ok

By: CODER

Note: Scenario list/info/run output inspected through the updated resolver-backed scenario test contours; bun typecheck, targeted recipes/scenario vitest suites, and package builds passed on commit 9424f196.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-10T11:49:44.971Z, excerpt_hash=sha256:6dc0479f6c11022c2e011f7ad66c6317b763207996594e1d093b86bf40a02db7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- `scenario run` in recipes v1 is now a non-executing placeholder by design: it resolves the manifest-level scenario through the deterministic resolver, validates recipe-local files plus the scenario definition contract, prints a prepared run plan, and returns without creating `runs/` artifacts.
