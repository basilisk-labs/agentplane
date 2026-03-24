---
id: "202603241853-JT55RP"
title: "Remove parser-level legacy recipe run_profile fields after catalog sync"
result_summary: "The main-repo recipe parser no longer accepts legacy run_profile.expected_exit_contract, local fixtures no longer emit it, and the remaining references are documentation that describes the field removal rather than active runtime support."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "contracts"
  - "schema"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T18:54:17.886Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T18:57:14.126Z"
  updated_by: "CODER"
  note: "Passed targeted recipe/runner coverage via bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts, built agentplane with bun run --filter=agentplane build, and confirmed remaining expected_exit_contract/network references are docs-only removal notes rather than active parser/runtime support."
commit:
  hash: "dfd0a772b738332238ac2e9572a27715eaca266e"
  message: "✅ JT55RP code: remove legacy recipe parser support after catalog sync"
comments:
  -
    author: "CODER"
    body: "Start: remove parser-level support for legacy run_profile.network and expected_exit_contract fields now that the bundled external catalog no longer uses them and the main runner surface has already dropped them."
  -
    author: "CODER"
    body: "Verified: removed the last parser-level legacy acceptance for recipe run_profile.expected_exit_contract after syncing the bundled agentplane-recipes catalog, updated local fixtures, and aligned docs with the narrower accepted contract."
events:
  -
    type: "status"
    at: "2026-03-24T18:54:21.562Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove parser-level support for legacy run_profile.network and expected_exit_contract fields now that the bundled external catalog no longer uses them and the main runner surface has already dropped them."
  -
    type: "verify"
    at: "2026-03-24T18:57:14.126Z"
    author: "CODER"
    state: "ok"
    note: "Passed targeted recipe/runner coverage via bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts, built agentplane with bun run --filter=agentplane build, and confirmed remaining expected_exit_contract/network references are docs-only removal notes rather than active parser/runtime support."
  -
    type: "status"
    at: "2026-03-24T18:57:19.267Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: removed the last parser-level legacy acceptance for recipe run_profile.expected_exit_contract after syncing the bundled agentplane-recipes catalog, updated local fixtures, and aligned docs with the narrower accepted contract."
doc_version: 3
doc_updated_at: "2026-03-24T18:57:19.268Z"
doc_updated_by: "CODER"
description: "Now that the bundled agentplane-recipes catalog no longer uses run_profile.network or run_profile.expected_exit_contract, remove those legacy fields from the main-repo recipe manifest parser and related types so the accepted contract matches the active runtime surface end to end."
sections:
  Summary: |-
    Remove parser-level legacy recipe run_profile fields after catalog sync
    
    Now that the bundled agentplane-recipes catalog no longer uses run_profile.network or run_profile.expected_exit_contract, remove those legacy fields from the main-repo recipe manifest parser and related types so the accepted contract matches the active runtime surface end to end.
  Scope: |-
    - In scope: Now that the bundled agentplane-recipes catalog no longer uses run_profile.network or run_profile.expected_exit_contract, remove those legacy fields from the main-repo recipe manifest parser and related types so the accepted contract matches the active runtime surface end to end.
    - Out of scope: unrelated refactors not required for "Remove parser-level legacy recipe run_profile fields after catalog sync".
  Plan: |-
    1. Remove run_profile.network and run_profile.expected_exit_contract from the main-repo manifest parser, recipe types, and local test fixtures now that the bundled catalog no longer uses them.
    2. Update docs and helper fixtures so the accepted recipe contract matches the cleaned parser/runtime surface end to end.
    3. Verify that resolver/scenario tests still pass with the narrowed contract and that no generated or user-facing surfaces continue to advertise the removed fields.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts. Expected: recipes still resolve and execute cleanly without parser support for run_profile.network or expected_exit_contract.
    2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the parser/types cleanup.
    3. Search for run_profile.network and run_profile.expected_exit_contract in the main repo. Expected: remaining references are historical docs or tests explicitly proving removal, not active parser/runtime support.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T18:57:14.126Z — VERIFY — ok
    
    By: CODER
    
    Note: Passed targeted recipe/runner coverage via bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts, built agentplane with bun run --filter=agentplane build, and confirmed remaining expected_exit_contract/network references are docs-only removal notes rather than active parser/runtime support.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:56:58.728Z, excerpt_hash=sha256:5fc2c8b1958d2a9c34ae3fdc9ab839fbad67621f891bf851d1ecdafd4b8da048
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Removed the last parser-level legacy acceptance for run_profile.expected_exit_contract from recipe manifest normalization and RecipeRunProfile typing.
    - Updated the installed recipe fixture helper so local scenario/runner tests no longer emit the removed field.
    - Simplified recipes docs to state that the bundled catalog and accepted main-repo contract are now aligned; remaining references only describe the field removal.
id_source: "generated"
---
## Summary

Remove parser-level legacy recipe run_profile fields after catalog sync

Now that the bundled agentplane-recipes catalog no longer uses run_profile.network or run_profile.expected_exit_contract, remove those legacy fields from the main-repo recipe manifest parser and related types so the accepted contract matches the active runtime surface end to end.

## Scope

- In scope: Now that the bundled agentplane-recipes catalog no longer uses run_profile.network or run_profile.expected_exit_contract, remove those legacy fields from the main-repo recipe manifest parser and related types so the accepted contract matches the active runtime surface end to end.
- Out of scope: unrelated refactors not required for "Remove parser-level legacy recipe run_profile fields after catalog sync".

## Plan

1. Remove run_profile.network and run_profile.expected_exit_contract from the main-repo manifest parser, recipe types, and local test fixtures now that the bundled catalog no longer uses them.
2. Update docs and helper fixtures so the accepted recipe contract matches the cleaned parser/runtime surface end to end.
3. Verify that resolver/scenario tests still pass with the narrowed contract and that no generated or user-facing surfaces continue to advertise the removed fields.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts. Expected: recipes still resolve and execute cleanly without parser support for run_profile.network or expected_exit_contract.
2. Run bun run --filter=agentplane build. Expected: the runner package builds cleanly after the parser/types cleanup.
3. Search for run_profile.network and run_profile.expected_exit_contract in the main repo. Expected: remaining references are historical docs or tests explicitly proving removal, not active parser/runtime support.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T18:57:14.126Z — VERIFY — ok

By: CODER

Note: Passed targeted recipe/runner coverage via bunx vitest run packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/adapters/codex.test.ts, built agentplane with bun run --filter=agentplane build, and confirmed remaining expected_exit_contract/network references are docs-only removal notes rather than active parser/runtime support.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T18:56:58.728Z, excerpt_hash=sha256:5fc2c8b1958d2a9c34ae3fdc9ab839fbad67621f891bf851d1ecdafd4b8da048

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Removed the last parser-level legacy acceptance for run_profile.expected_exit_contract from recipe manifest normalization and RecipeRunProfile typing.
- Updated the installed recipe fixture helper so local scenario/runner tests no longer emit the removed field.
- Simplified recipes docs to state that the bundled catalog and accepted main-repo contract are now aligned; remaining references only describe the field removal.
