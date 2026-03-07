---
id: "202603070958-W769HC"
title: "Auto-close task README by default in direct finish flow"
result_summary: "Direct finish now auto-closes task README metadata in local direct mode."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T09:59:44.757Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved direct-mode finish UX change and associated verification contract."
verification:
  state: "ok"
  updated_at: "2026-03-07T10:17:19.438Z"
  updated_by: "REVIEWER"
  note: "Verified: finish unit tests, targeted lint, and direct/branch_pr close-path behavior passed."
commit:
  hash: "f09e4c5098c9e72e4db5d6077d6d3ccf15e86195"
  message: "✨ W769HC task: auto-close direct finish"
comments:
  -
    author: "CODER"
    body: "Start: change direct-mode finish so task README metadata is closed by default via a deterministic close commit, while keeping branch_pr semantics explicit and verifying failure behavior."
  -
    author: "CODER"
    body: "Verified: direct-mode finish now auto-closes task README metadata by default and retains explicit opt-out semantics."
events:
  -
    type: "status"
    at: "2026-03-07T09:59:48.237Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: change direct-mode finish so task README metadata is closed by default via a deterministic close commit, while keeping branch_pr semantics explicit and verifying failure behavior."
  -
    type: "verify"
    at: "2026-03-07T10:17:19.438Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: finish unit tests, targeted lint, and direct/branch_pr close-path behavior passed."
  -
    type: "status"
    at: "2026-03-07T10:17:19.864Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: direct-mode finish now auto-closes task README metadata by default and retains explicit opt-out semantics."
doc_version: 2
doc_updated_at: "2026-03-07T10:17:19.864Z"
doc_updated_by: "CODER"
description: "Make agentplane finish in direct mode perform a deterministic close commit by default so task README metadata does not leave the tracked tree dirty after normal completion."
id_source: "generated"
---
## Summary

Auto-close task README by default in direct finish flow

Make agentplane finish in direct mode perform a deterministic close commit by default so task README metadata does not leave the tracked tree dirty after normal completion.

## Scope

- In scope: Make agentplane finish in direct mode perform a deterministic close commit by default so task README metadata does not leave the tracked tree dirty after normal completion..
- Out of scope: unrelated refactors not required for "Auto-close task README by default in direct finish flow".

## Plan

1. Inspect finish/task close-commit flow and identify the minimal direct-mode-only toggle point that can enable automatic close commits without changing branch_pr semantics.\n2. Implement direct-mode default auto-close behavior, preserving an explicit override for callers that intentionally want metadata-only finish without the close commit.\n3. Add/update unit tests covering direct-mode default close behavior, branch_pr unchanged behavior, and failure handling when auto-close cannot complete.\n4. Run targeted finish/task tests and confirm the direct happy-path no longer leaves task README metadata as a tracked dirty tail.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

1. Run finish/task unit coverage: bunx vitest run packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/workflow.test.ts --hookTimeout 60000 --testTimeout 60000\n2. Verify that direct-mode finish performs a close commit by default and branch_pr still requires explicit close behavior.\n3. Confirm no tracked README tail remains in the direct happy-path after finish completes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T10:17:19.438Z — VERIFY — ok

By: REVIEWER

Note: Verified: finish unit tests, targeted lint, and direct/branch_pr close-path behavior passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T09:59:48.237Z, excerpt_hash=sha256:aa0f2ea609717d9627a7515f47e557f332f361106b5bec146dcdc115a35d47ea

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
