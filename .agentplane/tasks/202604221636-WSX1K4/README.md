---
id: "202604221636-WSX1K4"
title: "Fix init legacy scenario cache and full dialog smoke"
result_summary: "Fixed legacy cached recipe scenario metadata handling, restored the original init logo, and added full-dialog plus critical release-path init coverage."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-04-22T16:36:52.503Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T16:51:41.109Z"
  updated_by: "CODER"
  note: "Local verification passed: targeted recipes/init tests, cli-core dialog test, critical init E2E, package typechecks, release parity, and full pre-push standard gate including fast unit + critical E2E."
commit:
  hash: "316226e92a30bf5d253ba9be8311034a47e902fb"
  message: "🐛 WSX1K4 init: tolerate legacy scenario cache"
comments:
  -
    author: "CODER"
    body: "Start: fix init legacy cached scenario compatibility, restore original ASCII logo, and add release-covered full init smoke coverage before preparing the next patch release."
  -
    author: "CODER"
    body: "Verified: legacy schema v1 scenario manifests now get compatibility defaults; the init TTY dialog and critical process smoke cover the reported cache failure; release parity and pre-push gate passed."
events:
  -
    type: "status"
    at: "2026-04-22T16:36:52.710Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix init legacy cached scenario compatibility, restore original ASCII logo, and add release-covered full init smoke coverage before preparing the next patch release."
  -
    type: "verify"
    at: "2026-04-22T16:51:41.109Z"
    author: "CODER"
    state: "ok"
    note: "Local verification passed: targeted recipes/init tests, cli-core dialog test, critical init E2E, package typechecks, release parity, and full pre-push standard gate including fast unit + critical E2E."
  -
    type: "status"
    at: "2026-04-22T16:51:48.165Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: legacy schema v1 scenario manifests now get compatibility defaults; the init TTY dialog and critical process smoke cover the reported cache failure; release parity and pre-push gate passed."
doc_version: 3
doc_updated_at: "2026-04-22T16:51:48.166Z"
doc_updated_by: "CODER"
description: "Fix agentplane init compatibility with legacy cached recipe scenarios, restore the original ASCII logo, and add release-covered smoke coverage for the complete init dialog path."
sections:
  Summary: |-
    Fix init legacy scenario cache and full dialog smoke
    
    Fix agentplane init compatibility with legacy cached recipe scenarios, restore the original ASCII logo, and add release-covered smoke coverage for the complete init dialog path.
  Scope: |-
    - In scope: Fix agentplane init compatibility with legacy cached recipe scenarios, restore the original ASCII logo, and add release-covered smoke coverage for the complete init dialog path.
    - Out of scope: unrelated refactors not required for "Fix init legacy scenario cache and full dialog smoke".
  Plan: |-
    Goal: fix the v0.3.19 init regression still triggered by legacy cached recipe scenarios with non-current scenario fields, restore the original ASCII AgentPlane logo, and add release-covered smoke coverage for the full init path.
    
    Plan:
    1. Reproduce the current failure using a temporary AGENTPLANE_HOME cache that omits or uses legacy scenario fields such as use_when.
    2. Inspect recipe manifest scenario normalization and init v2 UI to identify all scenario-field compatibility gaps and the current ASCII art source.
    3. Patch manifest normalization so legacy cached scenarios are accepted without weakening required manifest validation for current recipes.
    4. Restore the original ASCII art exactly enough for layout-safe init output and update unit assertions.
    5. Add a full init smoke/regression test that runs the init path with a legacy cached recipe manifest and asserts completion plus logo presence.
    6. Run targeted tests, typechecks/build, release parity, and the release-relevant local gate before publishing the next patch release.
  Verify Steps: |-
    - bun run test:project -- recipes packages/recipes/src/index.test.ts
    - bun run test:project -- agentplane packages/agentplane/src/cli/init-recipes-cache.test.ts packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts
    - bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.v2.test.ts
    - bun run test:project -- critical packages/agentplane/src/cli/run-cli.critical.exit-codes.test.ts
    - bun run --filter=@agentplaneorg/recipes typecheck && bun run --filter=agentplane typecheck
    - bun run release:parity
    - pre-push standard gate before PR
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T16:51:41.109Z — VERIFY — ok
    
    By: CODER
    
    Note: Local verification passed: targeted recipes/init tests, cli-core dialog test, critical init E2E, package typechecks, release parity, and full pre-push standard gate including fast unit + critical E2E.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T16:44:27.096Z, excerpt_hash=sha256:9931b30448eea633556339558bcbe171ef74afbb8da9770407eaec6f008aa3e4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix init legacy scenario cache and full dialog smoke

Fix agentplane init compatibility with legacy cached recipe scenarios, restore the original ASCII logo, and add release-covered smoke coverage for the complete init dialog path.

## Scope

- In scope: Fix agentplane init compatibility with legacy cached recipe scenarios, restore the original ASCII logo, and add release-covered smoke coverage for the complete init dialog path.
- Out of scope: unrelated refactors not required for "Fix init legacy scenario cache and full dialog smoke".

## Plan

Goal: fix the v0.3.19 init regression still triggered by legacy cached recipe scenarios with non-current scenario fields, restore the original ASCII AgentPlane logo, and add release-covered smoke coverage for the full init path.

Plan:
1. Reproduce the current failure using a temporary AGENTPLANE_HOME cache that omits or uses legacy scenario fields such as use_when.
2. Inspect recipe manifest scenario normalization and init v2 UI to identify all scenario-field compatibility gaps and the current ASCII art source.
3. Patch manifest normalization so legacy cached scenarios are accepted without weakening required manifest validation for current recipes.
4. Restore the original ASCII art exactly enough for layout-safe init output and update unit assertions.
5. Add a full init smoke/regression test that runs the init path with a legacy cached recipe manifest and asserts completion plus logo presence.
6. Run targeted tests, typechecks/build, release parity, and the release-relevant local gate before publishing the next patch release.

## Verify Steps

- bun run test:project -- recipes packages/recipes/src/index.test.ts
- bun run test:project -- agentplane packages/agentplane/src/cli/init-recipes-cache.test.ts packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts
- bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.init.v2.test.ts
- bun run test:project -- critical packages/agentplane/src/cli/run-cli.critical.exit-codes.test.ts
- bun run --filter=@agentplaneorg/recipes typecheck && bun run --filter=agentplane typecheck
- bun run release:parity
- pre-push standard gate before PR

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T16:51:41.109Z — VERIFY — ok

By: CODER

Note: Local verification passed: targeted recipes/init tests, cli-core dialog test, critical init E2E, package typechecks, release parity, and full pre-push standard gate including fast unit + critical E2E.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T16:44:27.096Z, excerpt_hash=sha256:9931b30448eea633556339558bcbe171ef74afbb8da9770407eaec6f008aa3e4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
