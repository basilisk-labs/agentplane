---
id: "202603070958-FBM32H"
title: "Make upgrade apply managed files by default"
result_summary: "Upgrade now applies managed files by default with explicit dry-run and source/version reporting."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T09:59:51.456Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved upgrade default-apply UX change and explicit dry-run/source reporting."
verification:
  state: "ok"
  updated_at: "2026-03-07T10:17:30.316Z"
  updated_by: "REVIEWER"
  note: "Verified: upgrade parse/unit/integration tests passed for default apply, dry-run, and review mode."
commit:
  hash: "c37b59a0cfe75e49b008528d0fb0e68ed63275d2"
  message: "⬆️ FBM32H task: apply managed files by default"
comments:
  -
    author: "CODER"
    body: "Start: redesign upgrade so the default invocation applies managed framework files, dry-run is the explicit preview path, and command output exposes source and version before acting."
  -
    author: "CODER"
    body: "Verified: upgrade now applies managed files by default, keeps dry-run as preview, and reports source/version before acting."
events:
  -
    type: "status"
    at: "2026-03-07T09:59:55.044Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: redesign upgrade so the default invocation applies managed framework files, dry-run is the explicit preview path, and command output exposes source and version before acting."
  -
    type: "verify"
    at: "2026-03-07T10:17:30.316Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: upgrade parse/unit/integration tests passed for default apply, dry-run, and review mode."
  -
    type: "status"
    at: "2026-03-07T10:17:30.759Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: upgrade now applies managed files by default, keeps dry-run as preview, and reports source/version before acting."
doc_version: 3
doc_updated_at: "2026-03-07T10:17:30.759Z"
doc_updated_by: "CODER"
description: "Change agentplane upgrade so the default mode applies framework-managed files immediately, while --dry-run remains the preview path and command output makes the source/version of the bundle explicit."
id_source: "generated"
---
## Summary

Make upgrade apply managed files by default

Change agentplane upgrade so the default mode applies framework-managed files immediately, while --dry-run remains the preview path and command output makes the source/version of the bundle explicit.

## Scope

- In scope: Change agentplane upgrade so the default mode applies framework-managed files immediately, while --dry-run remains the preview path and command output makes the source/version of the bundle explicit..
- Out of scope: unrelated refactors not required for "Make upgrade apply managed files by default".

## Plan

1. Redefine upgrade CLI semantics so the default invocation applies managed files, while --dry-run becomes the explicit preview path and the command reports the bundle source/version before acting.
2. Update parsing, help text, docs, and implementation so local-assets/remote/bundle sources all follow the new default-apply contract.
3. Adjust and extend upgrade tests for the new defaults, including no-op messaging, dry-run behavior, and default apply of managed policy/gateway files.
4. Run targeted upgrade test suites and validate the new UX does not regress safety invariants.

## Verify Steps

1. Run upgrade coverage: bunx vitest run packages/agentplane/src/commands/upgrade.agent-mode.test.ts packages/agentplane/src/commands/upgrade.merge.test.ts packages/agentplane/src/commands/upgrade.safety.test.ts packages/agentplane/src/commands/upgrade.spec-parse.test.ts --hookTimeout 60000 --testTimeout 60000\n2. Check CLI help/docs text for the new default apply semantics and explicit --dry-run preview path.\n3. Validate that managed policy files and AGENTS.md are applied by default, while denied paths remain protected.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T10:17:30.316Z — VERIFY — ok

By: REVIEWER

Note: Verified: upgrade parse/unit/integration tests passed for default apply, dry-run, and review mode.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T09:59:55.044Z, excerpt_hash=sha256:3a6734fa1a7eb2565bd1ed9388e718f1094fbc9990d87b500075949bc82da508

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
