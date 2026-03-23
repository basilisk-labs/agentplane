---
id: "202603231533-2VQ6D5"
title: "Remove runner wording drift in preview and help surfaces"
result_summary: "Aligned scenario run preview/help/reference wording with the shipped scenario execute flow."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603231533-4SGB75"
tags:
  - "docs"
  - "runner"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T17:09:12.785Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T17:11:54.720Z"
  updated_by: "CODER"
  note: "Scenario preview and help/reference wording now distinguish preview-only run from scenario execute."
commit:
  hash: "5fe2bc3638197332de8924b93c16c64d861c50f4"
  message: "✅ 2VQ6D5 docs: done"
comments:
  -
    author: "CODER"
    body: "Start: align scenario preview, help, and CLI-reference wording so preview-only scenario run no longer claims the shared runner path is unimplemented."
  -
    author: "CODER"
    body: "Verified: scenario run now describes preview-only validation and points to scenario execute, while help snapshots and the generated CLI reference are aligned with the shipped preview-versus-execute split; targeted tests, docs generation, builds, and doctor pass."
events:
  -
    type: "status"
    at: "2026-03-23T17:09:19.166Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align scenario preview, help, and CLI-reference wording so preview-only scenario run no longer claims the shared runner path is unimplemented."
  -
    type: "verify"
    at: "2026-03-23T17:11:54.720Z"
    author: "CODER"
    state: "ok"
    note: "Scenario preview and help/reference wording now distinguish preview-only run from scenario execute."
  -
    type: "status"
    at: "2026-03-23T17:12:17.800Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: scenario run now describes preview-only validation and points to scenario execute, while help snapshots and the generated CLI reference are aligned with the shipped preview-versus-execute split; targeted tests, docs generation, builds, and doctor pass."
doc_version: 3
doc_updated_at: "2026-03-23T17:12:17.800Z"
doc_updated_by: "CODER"
description: "Align scenario run preview wording, scenario execute output, and related help/docs text with the shipped shared-runner behavior so preview-only and execution flows are described consistently."
sections:
  Summary: |-
    Remove runner wording drift in preview and help surfaces
    
    Align scenario run preview wording, scenario execute output, and related help/docs text with the shipped shared-runner behavior so preview-only and execution flows are described consistently.
  Scope: |-
    - In scope: Align scenario run preview wording, scenario execute output, and related help/docs text with the shipped shared-runner behavior so preview-only and execution flows are described consistently.
    - Out of scope: unrelated refactors not required for "Remove runner wording drift in preview and help surfaces".
  Plan: |-
    1. Implement the change for "Remove runner wording drift in preview and help surfaces".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u`. Expected: pass with preview/help wording aligned.
    2. Run `bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: pass and regenerate CLI reference with the same wording.
    3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: pass with no new workflow/doc violations.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T17:11:54.720Z — VERIFY — ok
    
    By: CODER
    
    Note: Scenario preview and help/reference wording now distinguish preview-only run from scenario execute.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T17:09:19.167Z, excerpt_hash=sha256:dc0c256b0dd07e55ad59c79c92d16c1b9e0089bf5cc351b71e65b1a4841fe324
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u
    Result: pass
    Evidence: 39 tests passed; one new help snapshot was written and one existing snapshot updated to match current help surfaces.
    Scope: scenario preview output, scenario help copy, and compact help snapshots.
    
    Command: bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: CLI reference regenerated successfully and both packages built cleanly.
    Scope: generated CLI docs plus source build for touched command/help surfaces.
    
    Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor
    Result: pass
    Evidence: doctor reported OK with errors=0 warnings=0.
    Scope: workflow and task-doc invariants after wording/reference updates.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove runner wording drift in preview and help surfaces

Align scenario run preview wording, scenario execute output, and related help/docs text with the shipped shared-runner behavior so preview-only and execution flows are described consistently.

## Scope

- In scope: Align scenario run preview wording, scenario execute output, and related help/docs text with the shipped shared-runner behavior so preview-only and execution flows are described consistently.
- Out of scope: unrelated refactors not required for "Remove runner wording drift in preview and help surfaces".

## Plan

1. Implement the change for "Remove runner wording drift in preview and help surfaces".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u`. Expected: pass with preview/help wording aligned.
2. Run `bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: pass and regenerate CLI reference with the same wording.
3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: pass with no new workflow/doc violations.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T17:11:54.720Z — VERIFY — ok

By: CODER

Note: Scenario preview and help/reference wording now distinguish preview-only run from scenario execute.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T17:09:19.167Z, excerpt_hash=sha256:dc0c256b0dd07e55ad59c79c92d16c1b9e0089bf5cc351b71e65b1a4841fe324

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/commands/recipes.scenario.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts -u
Result: pass
Evidence: 39 tests passed; one new help snapshot was written and one existing snapshot updated to match current help surfaces.
Scope: scenario preview output, scenario help copy, and compact help snapshots.

Command: bun packages/agentplane/src/cli.ts docs cli --out docs/user/cli-reference.generated.mdx && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: CLI reference regenerated successfully and both packages built cleanly.
Scope: generated CLI docs plus source build for touched command/help surfaces.

Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor
Result: pass
Evidence: doctor reported OK with errors=0 warnings=0.
Scope: workflow and task-doc invariants after wording/reference updates.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
