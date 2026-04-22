---
id: "202604221556-W3HD3Y"
title: "Fix init recipe manifest validation and ASCII logo"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "init"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:56:55.320Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T15:59:54.205Z"
  updated_by: "CODER"
  note: "Verified: legacy cached recipe manifests without manifest.scenarios[].name no longer fail init recipe cache reads; ASCII logo rendering is covered; targeted recipe/init tests, typechecks, prettier, bootstrap, and temp AGENTPLANE_HOME init smoke passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix the v0.3.18 init cached recipe manifest regression, restore ASCII logo rendering in interactive init, and verify both paths with focused tests and smoke coverage."
events:
  -
    type: "status"
    at: "2026-04-22T15:56:59.543Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix the v0.3.18 init cached recipe manifest regression, restore ASCII logo rendering in interactive init, and verify both paths with focused tests and smoke coverage."
  -
    type: "verify"
    at: "2026-04-22T15:59:54.205Z"
    author: "CODER"
    state: "ok"
    note: "Verified: legacy cached recipe manifests without manifest.scenarios[].name no longer fail init recipe cache reads; ASCII logo rendering is covered; targeted recipe/init tests, typechecks, prettier, bootstrap, and temp AGENTPLANE_HOME init smoke passed."
doc_version: 3
doc_updated_at: "2026-04-22T15:59:54.208Z"
doc_updated_by: "CODER"
description: "Fix the v0.3.18 init regression that rejects cached recipe manifests with 'manifest.scenarios[0].name: expected string', restore the ASCII logo in the interactive init UI, and add regression coverage for both behaviors."
sections:
  Summary: |-
    Fix init recipe manifest validation and ASCII logo
    
    Fix the v0.3.18 init regression that rejects cached recipe manifests with 'manifest.scenarios[0].name: expected string', restore the ASCII logo in the interactive init UI, and add regression coverage for both behaviors.
  Scope: |-
    - In scope: Fix the v0.3.18 init regression that rejects cached recipe manifests with 'manifest.scenarios[0].name: expected string', restore the ASCII logo in the interactive init UI, and add regression coverage for both behaviors.
    - Out of scope: unrelated refactors not required for "Fix init recipe manifest validation and ASCII logo".
  Plan: |-
    Goal: fix the interactive init regression reported against v0.3.18 and restore the ASCII init logo.
    
    Plan:
    1. Add a regression test for cached legacy recipe manifests where manifest.scenarios[].name is absent.
    2. Normalize legacy scenario names from summary so init can list cached recipes without requiring users to clear ~/.agentplane/recipes.json.
    3. Restore ASCII logo rendering in init v2 before the Setup section.
    4. Add a focused UI regression test for the logo.
    5. Run targeted unit tests, typecheck, formatting, and an init smoke with a legacy cached recipe file.
  Verify Steps: |-
    - bun run test:project -- recipes packages/recipes/src/index.test.ts
    - bun run test:project -- agentplane packages/agentplane/src/cli/init-recipes-cache.test.ts packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts
    - bun run --filter=@agentplaneorg/recipes typecheck
    - bun run --filter=agentplane typecheck
    - bunx prettier --check packages/recipes/src/manifest.ts packages/recipes/src/index.test.ts packages/agentplane/src/cli/init-recipes-cache.test.ts packages/agentplane/src/cli/run-cli/commands/init/ui-v2.ts packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/orchestrate-v2.ts
    - Init smoke with a temp AGENTPLANE_HOME containing a legacy cached recipe manifest without scenarios[].name
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T15:59:54.205Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: legacy cached recipe manifests without manifest.scenarios[].name no longer fail init recipe cache reads; ASCII logo rendering is covered; targeted recipe/init tests, typechecks, prettier, bootstrap, and temp AGENTPLANE_HOME init smoke passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T15:56:59.548Z, excerpt_hash=sha256:a7750058c01adf268b9764e75ae65b507b4edfccb650c8dc9a9f2cd4c2cf4e80
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix init recipe manifest validation and ASCII logo

Fix the v0.3.18 init regression that rejects cached recipe manifests with 'manifest.scenarios[0].name: expected string', restore the ASCII logo in the interactive init UI, and add regression coverage for both behaviors.

## Scope

- In scope: Fix the v0.3.18 init regression that rejects cached recipe manifests with 'manifest.scenarios[0].name: expected string', restore the ASCII logo in the interactive init UI, and add regression coverage for both behaviors.
- Out of scope: unrelated refactors not required for "Fix init recipe manifest validation and ASCII logo".

## Plan

Goal: fix the interactive init regression reported against v0.3.18 and restore the ASCII init logo.

Plan:
1. Add a regression test for cached legacy recipe manifests where manifest.scenarios[].name is absent.
2. Normalize legacy scenario names from summary so init can list cached recipes without requiring users to clear ~/.agentplane/recipes.json.
3. Restore ASCII logo rendering in init v2 before the Setup section.
4. Add a focused UI regression test for the logo.
5. Run targeted unit tests, typecheck, formatting, and an init smoke with a legacy cached recipe file.

## Verify Steps

- bun run test:project -- recipes packages/recipes/src/index.test.ts
- bun run test:project -- agentplane packages/agentplane/src/cli/init-recipes-cache.test.ts packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/prompts-v2.test.ts
- bun run --filter=@agentplaneorg/recipes typecheck
- bun run --filter=agentplane typecheck
- bunx prettier --check packages/recipes/src/manifest.ts packages/recipes/src/index.test.ts packages/agentplane/src/cli/init-recipes-cache.test.ts packages/agentplane/src/cli/run-cli/commands/init/ui-v2.ts packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts packages/agentplane/src/cli/run-cli/commands/init/orchestrate-v2.ts
- Init smoke with a temp AGENTPLANE_HOME containing a legacy cached recipe manifest without scenarios[].name

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T15:59:54.205Z — VERIFY — ok

By: CODER

Note: Verified: legacy cached recipe manifests without manifest.scenarios[].name no longer fail init recipe cache reads; ASCII logo rendering is covered; targeted recipe/init tests, typechecks, prettier, bootstrap, and temp AGENTPLANE_HOME init smoke passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T15:56:59.548Z, excerpt_hash=sha256:a7750058c01adf268b9764e75ae65b507b4edfccb650c8dc9a9f2cd4c2cf4e80

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
