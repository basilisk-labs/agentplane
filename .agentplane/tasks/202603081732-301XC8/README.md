---
id: "202603081732-301XC8"
title: "Make upgrade restore workflow runtime artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "upgrade"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T17:46:55.033Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T17:52:41.759Z"
  updated_by: "CODER"
  note: "Verified shared workflow publish path: init/upgrade reuse the same workflow-artifact helper; no-op upgrade restores .agentplane/WORKFLOW.md and last-known-good; integration, workflow, lint, and docs-site checks passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: making upgrade restore workflow runtime artifacts through the same publish path used by init."
events:
  -
    type: "status"
    at: "2026-03-08T17:46:55.307Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: making upgrade restore workflow runtime artifacts through the same publish path used by init."
  -
    type: "verify"
    at: "2026-03-08T17:52:41.759Z"
    author: "CODER"
    state: "ok"
    note: "Verified shared workflow publish path: init/upgrade reuse the same workflow-artifact helper; no-op upgrade restores .agentplane/WORKFLOW.md and last-known-good; integration, workflow, lint, and docs-site checks passed."
doc_version: 3
doc_updated_at: "2026-03-08T17:52:41.760Z"
doc_updated_by: "CODER"
description: "Ensure agentplane upgrade brings legacy projects to the current runnable workflow state by generating or refreshing .agentplane/WORKFLOW.md and .agentplane/workflows/last-known-good.md instead of leaving workflow bootstrap to init only."
id_source: "generated"
---
## Summary

Make upgrade restore workflow runtime artifacts

Ensure agentplane upgrade brings legacy projects to the current runnable workflow state by generating or refreshing .agentplane/WORKFLOW.md and .agentplane/workflows/last-known-good.md instead of leaving workflow bootstrap to init only.

## Scope

- In scope: Ensure agentplane upgrade brings legacy projects to the current runnable workflow state by generating or refreshing .agentplane/WORKFLOW.md and .agentplane/workflows/last-known-good.md instead of leaving workflow bootstrap to init only.
- Out of scope: unrelated refactors not required for "Make upgrade restore workflow runtime artifacts".

## Plan

1. Extract one shared workflow-artifact publish helper so init and upgrade use the same WORKFLOW.md generation/publish path from repo config state.
2. Invoke that helper from upgrade after managed files/config persistence so legacy repos regain .agentplane/WORKFLOW.md and .agentplane/workflows/last-known-good.md automatically.
3. Add regression coverage for upgrade-created workflow artifacts and the install-first legacy upgrade path.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts packages/agentplane/src/commands/upgrade.agent-mode.test.ts packages/agentplane/src/workflow-runtime/file-ops.test.ts --testTimeout 60000 --hookTimeout 60000. Expected: upgrade restores workflow runtime artifacts and legacy recovery remains green.
2. Run bun run lint:core -- packages/agentplane/src/cli/run-cli/commands/init/write-workflow.ts packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/commands/upgrade/apply.ts packages/agentplane/src/commands/upgrade/source.ts packages/agentplane/src/workflow-runtime/build.ts packages/agentplane/src/workflow-runtime/file-ops.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts. Expected: touched upgrade/workflow paths lint cleanly.
3. Run agentplane doctor in a migrated workspace scenario through the integration test. Expected: upgraded legacy repos no longer require manual workflow bootstrap after upgrade.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T17:52:41.759Z — VERIFY — ok

By: CODER

Note: Verified shared workflow publish path: init/upgrade reuse the same workflow-artifact helper; no-op upgrade restores .agentplane/WORKFLOW.md and last-known-good; integration, workflow, lint, and docs-site checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T17:46:55.307Z, excerpt_hash=sha256:7f0f4e47fd684719143f3799065e9715c38136e4ee5023458874511e7d1d8b42

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
