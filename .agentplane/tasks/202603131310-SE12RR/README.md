---
id: "202603131310-SE12RR"
title: "Add migration path for legacy task READMEs"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
depends_on:
  - "202603131310-ABPXYY"
  - "202603131309-JYPPQS"
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T00:48:23.305Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T00:54:21.227Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 21 tests passed; direct migrate-doc, upgrade recovery, and release-smoke recovery all stayed green after canonical revision/sections backfill.
    Scope: legacy README migration and recovery paths.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: eslint clean; both package builds exited 0.
    Scope: touched runtime and regression files.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make task migrate-doc produce canonical one-file task state for legacy READMEs immediately, then cover that behavior in upgrade and backend regressions without widening into backend interface changes."
events:
  -
    type: "status"
    at: "2026-03-14T00:48:31.020Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make task migrate-doc produce canonical one-file task state for legacy READMEs immediately, then cover that behavior in upgrade and backend regressions without widening into backend interface changes."
  -
    type: "verify"
    at: "2026-03-14T00:54:21.227Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: 21 tests passed; direct migrate-doc, upgrade recovery, and release-smoke recovery all stayed green after canonical revision/sections backfill.
      Scope: legacy README migration and recovery paths.
      
      Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: eslint clean; both package builds exited 0.
      Scope: touched runtime and regression files.
doc_version: 3
doc_updated_at: "2026-03-14T00:54:21.230Z"
doc_updated_by: "CODER"
description: "Provide migration from current README v3 task files to canonical-frontmatter-plus-generated-body one-file task format, including archive/backfill handling."
sections:
  Summary: |-
    Add migration path for legacy task READMEs
    
    Provide migration from current README v3 task files to canonical-frontmatter-plus-generated-body one-file task format, including archive/backfill handling.
  Scope: |-
    - In scope: Provide migration from current README v3 task files to canonical-frontmatter-plus-generated-body one-file task format, including archive/backfill handling.
    - Out of scope: unrelated refactors not required for "Add migration path for legacy task READMEs".
  Plan: |-
    1. Audit the current task migrate-doc and normalize paths to confirm where legacy README v2/v3 files still skip canonical revision/sections backfill.
    2. Update the migration path so migrated legacy task READMEs always land in canonical one-file state with generated body, current metadata, and refreshed export snapshots.
    3. Add regression coverage for direct migrate-doc, upgrade/recovery flow, and any local backend normalization edge that still relied on later writes for canonicalization.
  Verify Steps: |-
    1. Run targeted migrate-doc regressions for legacy README recovery. Expected: migrated task READMEs contain canonical frontmatter fields such as revision and sections, and the rendered body matches canonical sections.
    2. Run upgrade or release-smoke recovery coverage that exercises doctor -> migrate-doc -> export/upgrade flow. Expected: legacy README recovery succeeds without needing a later normalize/write pass.
    3. Build both packages after the task. Expected: @agentplaneorg/core and agentplane build cleanly with no new tracked drift outside the approved scope.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T00:54:21.227Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 21 tests passed; direct migrate-doc, upgrade recovery, and release-smoke recovery all stayed green after canonical revision/sections backfill.
    Scope: legacy README migration and recovery paths.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: eslint clean; both package builds exited 0.
    Scope: touched runtime and regression files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T00:48:31.021Z, excerpt_hash=sha256:7120ea64f6b929b5345d7664e0df319c3c502655c407ee2152aad0a6f0a8e401
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add migration path for legacy task READMEs

Provide migration from current README v3 task files to canonical-frontmatter-plus-generated-body one-file task format, including archive/backfill handling.

## Scope

- In scope: Provide migration from current README v3 task files to canonical-frontmatter-plus-generated-body one-file task format, including archive/backfill handling.
- Out of scope: unrelated refactors not required for "Add migration path for legacy task READMEs".

## Plan

1. Audit the current task migrate-doc and normalize paths to confirm where legacy README v2/v3 files still skip canonical revision/sections backfill.
2. Update the migration path so migrated legacy task READMEs always land in canonical one-file state with generated body, current metadata, and refreshed export snapshots.
3. Add regression coverage for direct migrate-doc, upgrade/recovery flow, and any local backend normalization edge that still relied on later writes for canonicalization.

## Verify Steps

1. Run targeted migrate-doc regressions for legacy README recovery. Expected: migrated task READMEs contain canonical frontmatter fields such as revision and sections, and the rendered body matches canonical sections.
2. Run upgrade or release-smoke recovery coverage that exercises doctor -> migrate-doc -> export/upgrade flow. Expected: legacy README recovery succeeds without needing a later normalize/write pass.
3. Build both packages after the task. Expected: @agentplaneorg/core and agentplane build cleanly with no new tracked drift outside the approved scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T00:54:21.227Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 21 tests passed; direct migrate-doc, upgrade recovery, and release-smoke recovery all stayed green after canonical revision/sections backfill.
Scope: legacy README migration and recovery paths.

Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/cli/run-cli.core.upgrade.test.ts packages/agentplane/src/cli/release-smoke.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: eslint clean; both package builds exited 0.
Scope: touched runtime and regression files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T00:48:31.021Z, excerpt_hash=sha256:7120ea64f6b929b5345d7664e0df319c3c502655c407ee2152aad0a6f0a8e401

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
