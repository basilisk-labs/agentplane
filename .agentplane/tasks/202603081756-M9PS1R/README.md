---
id: "202603081756-M9PS1R"
title: "Gate workflow artifact restore on initialized repos during upgrade"
result_summary: "Workflow restoration no longer breaks minimal upgrade fixtures or fast pre-push gating."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "upgrade"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T17:56:20.761Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T17:59:25.463Z"
  updated_by: "CODER"
  note: "Verified gating: minimal upgrade fixtures without installed agent profiles no longer attempt workflow publish, while initialized legacy repos still restore workflow artifacts. Failing upgrade suites and the fast gate are green."
commit:
  hash: "d6d1370470c015bef9ea14518d097b79180b65f8"
  message: "🩹 M9PS1R upgrade: gate workflow restore on initialized repos"
comments:
  -
    author: "CODER"
    body: "Start: gating workflow artifact restoration so upgrade only publishes workflow runtime files in initialized repos that can validate them."
  -
    author: "CODER"
    body: "Verified: upgrade now restores workflow artifacts only in initialized repos that can validate them, while minimal fixtures and focused upgrade tests stay green."
events:
  -
    type: "status"
    at: "2026-03-08T17:56:21.021Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: gating workflow artifact restoration so upgrade only publishes workflow runtime files in initialized repos that can validate them."
  -
    type: "verify"
    at: "2026-03-08T17:59:25.463Z"
    author: "CODER"
    state: "ok"
    note: "Verified gating: minimal upgrade fixtures without installed agent profiles no longer attempt workflow publish, while initialized legacy repos still restore workflow artifacts. Failing upgrade suites and the fast gate are green."
  -
    type: "status"
    at: "2026-03-08T17:59:45.535Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: upgrade now restores workflow artifacts only in initialized repos that can validate them, while minimal fixtures and focused upgrade tests stay green."
doc_version: 3
doc_updated_at: "2026-03-08T17:59:45.535Z"
doc_updated_by: "CODER"
description: "Prevent upgrade from trying to publish WORKFLOW.md in minimal test or partial repo fixtures that do not yet have installed agent profiles, while still restoring workflow artifacts for normal initialized projects."
id_source: "generated"
---
## Summary

Gate workflow artifact restore on initialized repos during upgrade

Prevent upgrade from trying to publish WORKFLOW.md in minimal test or partial repo fixtures that do not yet have installed agent profiles, while still restoring workflow artifacts for normal initialized projects.

## Scope

- In scope: Prevent upgrade from trying to publish WORKFLOW.md in minimal test or partial repo fixtures that do not yet have installed agent profiles, while still restoring workflow artifacts for normal initialized projects.
- Out of scope: unrelated refactors not required for "Gate workflow artifact restore on initialized repos during upgrade".

## Plan

1. Gate upgrade-triggered workflow artifact restore on initialized repositories that already have installed agent profiles after managed-file apply.
2. Preserve automatic workflow artifact restoration for normal initialized legacy repos and keep explicit integration coverage for that path.
3. Re-run the previously failing upgrade suites and the broad fast gate before pushing.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/upgrade.merge.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/commands/upgrade.json-merge.stability.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts --testTimeout 60000 --hookTimeout 60000. Expected: minimal upgrade fixtures no longer fail on workflow publish, while initialized legacy upgrade recovery still restores workflow artifacts.
2. Run bun run lint:core -- packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/shared/workflow-artifacts.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts. Expected: touched upgrade/workflow paths lint cleanly.
3. Run node scripts/run-local-ci.mjs --mode fast with AGENTPLANE_FAST_CHANGED_FILES=packages/agentplane/src/commands/upgrade.ts. Expected: the broad fast gate that previously blocked push now passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T17:59:25.463Z — VERIFY — ok

By: CODER

Note: Verified gating: minimal upgrade fixtures without installed agent profiles no longer attempt workflow publish, while initialized legacy repos still restore workflow artifacts. Failing upgrade suites and the fast gate are green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T17:56:21.021Z, excerpt_hash=sha256:1338e61ed89eda8883e125fb8aedee193c5f7fc48b546872fec08395fe7dd799

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
