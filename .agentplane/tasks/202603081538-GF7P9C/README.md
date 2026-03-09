---
id: "202603081538-GF7P9C"
title: "Sync release flow with framework CLI expected version"
result_summary: "Release apply now stages .agentplane/config.json when present and keeps framework.cli.expected_version aligned with the released version."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T15:40:45.389Z"
  updated_by: "ORCHESTRATOR"
  note: "0.3.3 needs release-flow config parity so the repo-owned expected CLI version cannot drift behind the released framework version."
verification:
  state: "ok"
  updated_at: "2026-03-08T15:44:53.555Z"
  updated_by: "CODER"
  note: "Verified: release apply tests and release plan tests pass, touched release/config files lint cleanly, and the agentplane package still builds after synchronizing framework.cli.expected_version into the release mutation path."
commit:
  hash: "36fbf922953a8c4daeb4824118e747a36cab0454"
  message: "🩺 GF7P9C release: sync expected CLI version during apply"
comments:
  -
    author: "CODER"
    body: "Start: inspecting the release mutation path so framework.cli.expected_version is synchronized during release apply instead of drifting behind the released framework version."
  -
    author: "CODER"
    body: "Verified: release apply now persists framework.cli.expected_version alongside the released package version, so repository-owned CLI expectations cannot drift silently behind the release mutation."
events:
  -
    type: "status"
    at: "2026-03-08T15:40:53.625Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspecting the release mutation path so framework.cli.expected_version is synchronized during release apply instead of drifting behind the released framework version."
  -
    type: "verify"
    at: "2026-03-08T15:44:53.555Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release apply tests and release plan tests pass, touched release/config files lint cleanly, and the agentplane package still builds after synchronizing framework.cli.expected_version into the release mutation path."
  -
    type: "status"
    at: "2026-03-08T15:44:53.753Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release apply now persists framework.cli.expected_version alongside the released package version, so repository-owned CLI expectations cannot drift silently behind the release mutation."
doc_version: 3
doc_updated_at: "2026-03-08T15:44:53.753Z"
doc_updated_by: "CODER"
description: "Update release mutation so framework.cli.expected_version tracks the released package version, with regression coverage for release apply and repository config parity."
id_source: "generated"
---
## Summary

Sync release flow with framework CLI expected version

Update release mutation so framework.cli.expected_version tracks the released package version, with regression coverage for release apply and repository config parity.

## Scope

- In scope: Update release mutation so framework.cli.expected_version tracks the released package version, with regression coverage for release apply and repository config parity.
- Out of scope: unrelated refactors not required for "Sync release flow with framework CLI expected version".

## Plan

1. Inspect the release mutation path and identify where framework.cli.expected_version should be synchronized with the released package version.
2. Implement the release-flow change and add regression coverage for config parity and release mutation behavior.
3. Verify the targeted release tests and lint/build surfaces, then close the task with the shipped contract.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/plan.test.ts. Expected: targeted release tests pass with the new config-version synchronization behavior.
2. Run bun run lint:core -- packages/agentplane/src/commands/release/apply.command.ts packages/agentplane/src/commands/release/apply.mutation.ts packages/core/src/config/config.ts. Expected: touched release/config paths lint cleanly.
3. Run bun run --filter=agentplane build. Expected: the release CLI still builds after the mutation-path change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T15:44:53.555Z — VERIFY — ok

By: CODER

Note: Verified: release apply tests and release plan tests pass, touched release/config files lint cleanly, and the agentplane package still builds after synchronizing framework.cli.expected_version into the release mutation path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T15:40:53.625Z, excerpt_hash=sha256:8edb8bcd38081570ed6911fb717cb4d0fc3d61f5e5f98fc0a8cd5306be5729b7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
