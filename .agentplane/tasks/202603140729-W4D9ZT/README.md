---
id: "202603140729-W4D9ZT"
title: "Add Redmine canonical-state migration command"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
depends_on: []
tags:
  - "code"
  - "backend"
  - "redmine"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T07:39:27.408Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T07:50:08.583Z"
  updated_by: "CODER"
  note: "Verified Redmine canonical-state migration with bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --hookTimeout 60000 --testTimeout 60000, eslint on backend/command/catalog files, help/docs snapshot tests, both package builds, and agentplane docs cli --out docs/user/cli-reference.generated.mdx. The new backend migrate-canonical-state command now backfills legacy doc-backed issues, skips already-structured issues, and keeps CLI help/docs in sync."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: define a safe migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed remote state, with explicit migrated or skipped reporting and no silent clobber of existing structured state."
events:
  -
    type: "status"
    at: "2026-03-14T07:39:27.835Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define a safe migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed remote state, with explicit migrated or skipped reporting and no silent clobber of existing structured state."
  -
    type: "verify"
    at: "2026-03-14T07:50:08.583Z"
    author: "CODER"
    state: "ok"
    note: "Verified Redmine canonical-state migration with bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --hookTimeout 60000 --testTimeout 60000, eslint on backend/command/catalog files, help/docs snapshot tests, both package builds, and agentplane docs cli --out docs/user/cli-reference.generated.mdx. The new backend migrate-canonical-state command now backfills legacy doc-backed issues, skips already-structured issues, and keeps CLI help/docs in sync."
doc_version: 3
doc_updated_at: "2026-03-14T07:50:08.585Z"
doc_updated_by: "CODER"
description: "Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content."
sections:
  Summary: |-
    Add Redmine canonical-state migration command
    
    Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content.
  Scope: |-
    - In scope: Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content.
    - Out of scope: unrelated refactors not required for "Add Redmine canonical-state migration command".
  Plan: |-
    1. Design a migration path that backfills canonical_state for existing Redmine issues from legacy doc-backed remote state.
    2. Implement the migration command or flow with clear migrated/skipped/conflict reporting and canonical-state preservation.
    3. Cover migration behavior in tests and document any operator prerequisites or limits.
  Verify Steps: |-
    1. Run bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --hookTimeout 60000 --testTimeout 60000. Expected: legacy doc-backed issues migrate to canonical_state with explicit migrated, skipped, and failed outcomes, and the backend migrate-canonical-state command routes correctly through the CLI.
    2. Run ./node_modules/.bin/eslint on the touched migration/backend/CLI files and bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000. Expected: lint passes and the new command surface is reflected in help/docs snapshots.
    3. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build, then agentplane docs cli --out docs/user/cli-reference.generated.mdx. Expected: both packages build and the generated CLI reference stays in sync with the new migration command.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T07:50:08.583Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified Redmine canonical-state migration with bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --hookTimeout 60000 --testTimeout 60000, eslint on backend/command/catalog files, help/docs snapshot tests, both package builds, and agentplane docs cli --out docs/user/cli-reference.generated.mdx. The new backend migrate-canonical-state command now backfills legacy doc-backed issues, skips already-structured issues, and keeps CLI help/docs in sync.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T07:49:55.037Z, excerpt_hash=sha256:75225f85e235dcdd6afa1d51fcb078cbfa32c6e0a3023cc7da35d4c49f94ea36
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add Redmine canonical-state migration command

Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content.

## Scope

- In scope: Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content.
- Out of scope: unrelated refactors not required for "Add Redmine canonical-state migration command".

## Plan

1. Design a migration path that backfills canonical_state for existing Redmine issues from legacy doc-backed remote state.
2. Implement the migration command or flow with clear migrated/skipped/conflict reporting and canonical-state preservation.
3. Cover migration behavior in tests and document any operator prerequisites or limits.

## Verify Steps

1. Run bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --hookTimeout 60000 --testTimeout 60000. Expected: legacy doc-backed issues migrate to canonical_state with explicit migrated, skipped, and failed outcomes, and the backend migrate-canonical-state command routes correctly through the CLI.
2. Run ./node_modules/.bin/eslint on the touched migration/backend/CLI files and bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000. Expected: lint passes and the new command surface is reflected in help/docs snapshots.
3. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build, then agentplane docs cli --out docs/user/cli-reference.generated.mdx. Expected: both packages build and the generated CLI reference stays in sync with the new migration command.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T07:50:08.583Z — VERIFY — ok

By: CODER

Note: Verified Redmine canonical-state migration with bun x vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/commands/backend.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts --hookTimeout 60000 --testTimeout 60000, eslint on backend/command/catalog files, help/docs snapshot tests, both package builds, and agentplane docs cli --out docs/user/cli-reference.generated.mdx. The new backend migrate-canonical-state command now backfills legacy doc-backed issues, skips already-structured issues, and keeps CLI help/docs in sync.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T07:49:55.037Z, excerpt_hash=sha256:75225f85e235dcdd6afa1d51fcb078cbfa32c6e0a3023cc7da35d4c49f94ea36

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
