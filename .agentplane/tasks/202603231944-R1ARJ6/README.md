---
id: "202603231944-R1ARJ6"
title: "Remove runner-level network env semantics from adapters"
result_summary: "runner: adapter network env semantics removed"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603231944-VWVVW0"
tags:
  - "code"
  - "runner"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T19:46:09.478Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T19:50:18.433Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: 21 tests passed after removing AGENTPLANE_RECIPE_NETWORK from the shared adapter env surface and its direct consumers. Scope: adapter helper propagation and the tests that read that env contract. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the helper change. Scope: source build compatibility for the touched runner code. Command: bunx prettier --check packages/agentplane/src/runner/adapters/recipe-run-profile.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts && bunx eslint packages/agentplane/src/runner/adapters/recipe-run-profile.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: formatting and lint passed on all touched files. Scope: style and static validation for the task diff."
commit:
  hash: "56578df77e22476006d620b3d407f226f18a4ce6"
  message: "✅ R1ARJ6 code: done"
comments:
  -
    author: "CODER"
    body: "Start: remove AGENTPLANE_RECIPE_NETWORK and runner-level network env propagation from the shared recipe helper and adapters, keep global require_network untouched, and update the direct adapter-facing tests needed to keep the repo green."
  -
    author: "CODER"
    body: "Verified: Removed AGENTPLANE_RECIPE_NETWORK from the shared adapter env surface, kept the rest of recipe run_profile propagation intact, and updated the direct adapter and scenario tests so the repo stays green with the narrower runner contract."
events:
  -
    type: "status"
    at: "2026-03-23T19:48:18.973Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove AGENTPLANE_RECIPE_NETWORK and runner-level network env propagation from the shared recipe helper and adapters, keep global require_network untouched, and update the direct adapter-facing tests needed to keep the repo green."
  -
    type: "verify"
    at: "2026-03-23T19:50:18.433Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: 21 tests passed after removing AGENTPLANE_RECIPE_NETWORK from the shared adapter env surface and its direct consumers. Scope: adapter helper propagation and the tests that read that env contract. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the helper change. Scope: source build compatibility for the touched runner code. Command: bunx prettier --check packages/agentplane/src/runner/adapters/recipe-run-profile.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts && bunx eslint packages/agentplane/src/runner/adapters/recipe-run-profile.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: formatting and lint passed on all touched files. Scope: style and static validation for the task diff."
  -
    type: "status"
    at: "2026-03-23T19:50:40.720Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Removed AGENTPLANE_RECIPE_NETWORK from the shared adapter env surface, kept the rest of recipe run_profile propagation intact, and updated the direct adapter and scenario tests so the repo stays green with the narrower runner contract."
doc_version: 3
doc_updated_at: "2026-03-23T19:50:40.721Z"
doc_updated_by: "CODER"
description: "Delete AGENTPLANE_RECIPE_NETWORK and related network-specific propagation from runner adapter helpers and adapter invocations, keeping global CLI network approval untouched."
sections:
  Summary: |-
    Remove runner-level network env semantics from adapters
    
    Delete AGENTPLANE_RECIPE_NETWORK and related network-specific propagation from runner adapter helpers and adapter invocations, keeping global CLI network approval untouched.
  Scope: |-
    - In scope: Delete AGENTPLANE_RECIPE_NETWORK and related network-specific propagation from runner adapter helpers and adapter invocations, keeping global CLI network approval untouched.
    - Out of scope: unrelated refactors not required for "Remove runner-level network env semantics from adapters".
  Plan: "1. Remove AGENTPLANE_RECIPE_NETWORK and any network-specific runner-env propagation from shared helper code and adapters. 2. Keep the rest of recipe run_profile propagation intact. 3. Update adapter tests to assert the network field is no longer exported. 4. Verify with targeted tests and source builds."
  Verify Steps: "1. Run bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm AGENTPLANE_RECIPE_NETWORK is absent from adapter env assertions and runtime propagation."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T19:50:18.433Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: 21 tests passed after removing AGENTPLANE_RECIPE_NETWORK from the shared adapter env surface and its direct consumers. Scope: adapter helper propagation and the tests that read that env contract. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the helper change. Scope: source build compatibility for the touched runner code. Command: bunx prettier --check packages/agentplane/src/runner/adapters/recipe-run-profile.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts && bunx eslint packages/agentplane/src/runner/adapters/recipe-run-profile.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: formatting and lint passed on all touched files. Scope: style and static validation for the task diff.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:48:18.974Z, excerpt_hash=sha256:c7bbb8ce309f59bf9342d73b14f9e20489f247d63351d4d115e68a6bacfe81a6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove runner-level network env semantics from adapters

Delete AGENTPLANE_RECIPE_NETWORK and related network-specific propagation from runner adapter helpers and adapter invocations, keeping global CLI network approval untouched.

## Scope

- In scope: Delete AGENTPLANE_RECIPE_NETWORK and related network-specific propagation from runner adapter helpers and adapter invocations, keeping global CLI network approval untouched.
- Out of scope: unrelated refactors not required for "Remove runner-level network env semantics from adapters".

## Plan

1. Remove AGENTPLANE_RECIPE_NETWORK and any network-specific runner-env propagation from shared helper code and adapters. 2. Keep the rest of recipe run_profile propagation intact. 3. Update adapter tests to assert the network field is no longer exported. 4. Verify with targeted tests and source builds.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm AGENTPLANE_RECIPE_NETWORK is absent from adapter env assertions and runtime propagation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T19:50:18.433Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: 21 tests passed after removing AGENTPLANE_RECIPE_NETWORK from the shared adapter env surface and its direct consumers. Scope: adapter helper propagation and the tests that read that env contract. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both package builds completed successfully after the helper change. Scope: source build compatibility for the touched runner code. Command: bunx prettier --check packages/agentplane/src/runner/adapters/recipe-run-profile.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts && bunx eslint packages/agentplane/src/runner/adapters/recipe-run-profile.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts; Result: pass; Evidence: formatting and lint passed on all touched files. Scope: style and static validation for the task diff.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T19:48:18.974Z, excerpt_hash=sha256:c7bbb8ce309f59bf9342d73b14f9e20489f247d63351d4d115e68a6bacfe81a6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
