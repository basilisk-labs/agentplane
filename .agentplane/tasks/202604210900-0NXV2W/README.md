---
id: "202604210900-0NXV2W"
title: "Remove legacy workflow path support"
status: "DOING"
priority: "normal"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202604210900-RP5GA0"
tags:
  - "breaking"
  - "code"
  - "migration"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:45:25.435Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:55:22.660Z"
  updated_by: "CODER"
  note: "Removed root WORKFLOW.md compatibility reads/migration cleanup; canonical workflow path is .agentplane/WORKFLOW.md only; targeted workflow runtime and doctor tests pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove root WORKFLOW.md compatibility branches under approved patch-release breaking cleanup policy, update targeted workflow/doctor tests, and keep migration guidance explicit."
events:
  -
    type: "status"
    at: "2026-04-21T09:45:41.521Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove root WORKFLOW.md compatibility branches under approved patch-release breaking cleanup policy, update targeted workflow/doctor tests, and keep migration guidance explicit."
  -
    type: "verify"
    at: "2026-04-21T09:55:22.660Z"
    author: "CODER"
    state: "ok"
    note: "Removed root WORKFLOW.md compatibility reads/migration cleanup; canonical workflow path is .agentplane/WORKFLOW.md only; targeted workflow runtime and doctor tests pass."
doc_version: 3
doc_updated_at: "2026-04-21T09:55:22.679Z"
doc_updated_by: "CODER"
description: "Remove WORKFLOW.md compatibility only after the legacy bridge policy allows breaking cleanup."
sections:
  Summary: "Delete legacy workflow path compatibility if T23 approves removal; otherwise close as deferred with rationale."
  Scope: "In scope: workflow-runtime paths/file ops, workflow artifact helpers, doctor workflow checks, and tests. Out of scope: new workflow artifact layout."
  Plan: |-
    1. Confirm T23 authorizes removal.
    2. Remove legacyWorkflowPath branches and copy/delete behavior.
    3. Update tests and migration notes.
    4. Run workflow runtime and doctor tests.
  Verify Steps: |-
    - No live code depends on WORKFLOW.md as a compatibility source.
    - Migration guidance exists.
    - Workflow runtime/doctor tests pass.
  Verification: |-
    - Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210900-0NXV2W`
      - Result: pass
      - Evidence: verification contract requires no live WORKFLOW.md compatibility dependency, migration guidance, and workflow runtime/doctor tests.
      - Scope: task acceptance contract.
    - Command: `bun run test:project -- agentplane --run packages/agentplane/src/workflow-runtime/file-ops.test.ts`
      - Result: pass
      - Evidence: 1 file passed, 3 tests passed.
      - Scope: workflow file read/publish/restore behavior.
    - Command: `bun run test:project -- agentplane --run packages/agentplane/src/commands/doctor.command.runtime.test.ts`
      - Result: pass
      - Evidence: 1 file passed, 11 tests passed.
      - Scope: doctor runtime workflow checks.
    - Command: `rg -n 'legacyWorkflowPath|moved legacy WORKFLOW|falls back to legacy root|read.*WORKFLOW\.md.*fallback|root WORKFLOW' packages/agentplane/src/workflow-runtime packages/agentplane/src/shared packages/agentplane/src/commands/doctor docs/help/legacy-upgrade-recovery.mdx`
      - Result: pass
      - Evidence: only the negative test name and migration guidance mention root workflow fallback; live compatibility code has no legacyWorkflowPath.
      - Scope: live code reference cleanup.
    - Command: `bun run --filter=agentplane typecheck`
      - Result: pass
      - Evidence: agentplane typecheck exited with code 0.
      - Scope: agentplane package type safety.
    - Command: `bun run framework:dev:bootstrap`
      - Result: pass
      - Evidence: framework dev runtime is ready.
      - Scope: rebuilt watched runtime after workflow source changes.
    - Command: `git diff --check -- packages/agentplane/src/workflow-runtime/types.ts packages/agentplane/src/workflow-runtime/paths.ts packages/agentplane/src/workflow-runtime/file-ops.ts packages/agentplane/src/workflow-runtime/file-ops.test.ts packages/agentplane/src/shared/workflow-artifacts.ts packages/agentplane/src/commands/doctor/workflow.ts docs/help/legacy-upgrade-recovery.mdx .agentplane/tasks/202604210900-0NXV2W/README.md`
      - Result: pass
      - Evidence: no whitespace errors.
      - Scope: changed files for this task.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T09:55:22.660Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed root WORKFLOW.md compatibility reads/migration cleanup; canonical workflow path is .agentplane/WORKFLOW.md only; targeted workflow runtime and doctor tests pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:55:20.707Z, excerpt_hash=sha256:25917d4f5f72942f2b7b9ebd0b32e2eae4fbfc6bb2b58cd86883245092e8bf36
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore legacy path support and tests."
  Findings: "Breaking cleanup; gated by T23."
id_source: "generated"
---
## Summary

Delete legacy workflow path compatibility if T23 approves removal; otherwise close as deferred with rationale.

## Scope

In scope: workflow-runtime paths/file ops, workflow artifact helpers, doctor workflow checks, and tests. Out of scope: new workflow artifact layout.

## Plan

1. Confirm T23 authorizes removal.
2. Remove legacyWorkflowPath branches and copy/delete behavior.
3. Update tests and migration notes.
4. Run workflow runtime and doctor tests.

## Verify Steps

- No live code depends on WORKFLOW.md as a compatibility source.
- Migration guidance exists.
- Workflow runtime/doctor tests pass.

## Verification

- Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210900-0NXV2W`
  - Result: pass
  - Evidence: verification contract requires no live WORKFLOW.md compatibility dependency, migration guidance, and workflow runtime/doctor tests.
  - Scope: task acceptance contract.
- Command: `bun run test:project -- agentplane --run packages/agentplane/src/workflow-runtime/file-ops.test.ts`
  - Result: pass
  - Evidence: 1 file passed, 3 tests passed.
  - Scope: workflow file read/publish/restore behavior.
- Command: `bun run test:project -- agentplane --run packages/agentplane/src/commands/doctor.command.runtime.test.ts`
  - Result: pass
  - Evidence: 1 file passed, 11 tests passed.
  - Scope: doctor runtime workflow checks.
- Command: `rg -n 'legacyWorkflowPath|moved legacy WORKFLOW|falls back to legacy root|read.*WORKFLOW\.md.*fallback|root WORKFLOW' packages/agentplane/src/workflow-runtime packages/agentplane/src/shared packages/agentplane/src/commands/doctor docs/help/legacy-upgrade-recovery.mdx`
  - Result: pass
  - Evidence: only the negative test name and migration guidance mention root workflow fallback; live compatibility code has no legacyWorkflowPath.
  - Scope: live code reference cleanup.
- Command: `bun run --filter=agentplane typecheck`
  - Result: pass
  - Evidence: agentplane typecheck exited with code 0.
  - Scope: agentplane package type safety.
- Command: `bun run framework:dev:bootstrap`
  - Result: pass
  - Evidence: framework dev runtime is ready.
  - Scope: rebuilt watched runtime after workflow source changes.
- Command: `git diff --check -- packages/agentplane/src/workflow-runtime/types.ts packages/agentplane/src/workflow-runtime/paths.ts packages/agentplane/src/workflow-runtime/file-ops.ts packages/agentplane/src/workflow-runtime/file-ops.test.ts packages/agentplane/src/shared/workflow-artifacts.ts packages/agentplane/src/commands/doctor/workflow.ts docs/help/legacy-upgrade-recovery.mdx .agentplane/tasks/202604210900-0NXV2W/README.md`
  - Result: pass
  - Evidence: no whitespace errors.
  - Scope: changed files for this task.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T09:55:22.660Z — VERIFY — ok

By: CODER

Note: Removed root WORKFLOW.md compatibility reads/migration cleanup; canonical workflow path is .agentplane/WORKFLOW.md only; targeted workflow runtime and doctor tests pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T09:55:20.707Z, excerpt_hash=sha256:25917d4f5f72942f2b7b9ebd0b32e2eae4fbfc6bb2b58cd86883245092e8bf36

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore legacy path support and tests.

## Findings

Breaking cleanup; gated by T23.
