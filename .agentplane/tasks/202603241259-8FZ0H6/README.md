---
id: "202603241259-8FZ0H6"
title: "Probe non-interactive Codex approval modes for runner semantics"
result_summary: "Live approval probes show current non-interactive Codex exec approval modes are permissive, so requires_human_approval cannot be mapped honestly into the runner contract."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "codex"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T13:01:27.238Z"
  updated_by: "ORCHESTRATOR"
  note: "Approval probe scope accepted for repo-local temp-workspace execution and empirical Codex behavior capture."
verification:
  state: "ok"
  updated_at: "2026-03-24T13:12:24.532Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/codex-approval-probe.test.ts | bun scripts/run-runner-codex-approval-probe.mjs --keep-workspace | bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build | bunx eslint packages/agentplane/src/runner/codex-approval-probe.ts packages/agentplane/src/runner/codex-approval-probe.test.ts scripts/run-runner-codex-approval-probe.mjs; Result: pass; Evidence: 3 classifier tests passed, the live probe reported verdict=permissive for never, untrusted, and on-request, and each mode completed both the control write probe and the destructive delete probe with exit_code=0 and no surfaced approval barrier; Scope: packages/agentplane/src/runner/codex-approval-probe.ts, packages/agentplane/src/runner/codex-approval-probe.test.ts, scripts/run-runner-codex-approval-probe.mjs, package.json."
commit:
  hash: "39121712a54f662008e8f7881ed1947beb3cb2ea"
  message: "✅ 8FZ0H6 code: done"
comments:
  -
    author: "CODER"
    body: "Start: probe real non-interactive Codex approval modes in a repo-local temp workspace, capture the observed contract, and keep the diff limited to approval-probe harness files and related tests."
  -
    author: "CODER"
    body: "Verified: added a live Codex approval probe harness, covered the classifier with focused tests, and confirmed that never, untrusted, and on-request all remain permissive in non-interactive exec mode for both write and delete probes."
events:
  -
    type: "status"
    at: "2026-03-24T13:01:36.139Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: probe real non-interactive Codex approval modes in a repo-local temp workspace, capture the observed contract, and keep the diff limited to approval-probe harness files and related tests."
  -
    type: "verify"
    at: "2026-03-24T13:12:24.532Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/codex-approval-probe.test.ts | bun scripts/run-runner-codex-approval-probe.mjs --keep-workspace | bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build | bunx eslint packages/agentplane/src/runner/codex-approval-probe.ts packages/agentplane/src/runner/codex-approval-probe.test.ts scripts/run-runner-codex-approval-probe.mjs; Result: pass; Evidence: 3 classifier tests passed, the live probe reported verdict=permissive for never, untrusted, and on-request, and each mode completed both the control write probe and the destructive delete probe with exit_code=0 and no surfaced approval barrier; Scope: packages/agentplane/src/runner/codex-approval-probe.ts, packages/agentplane/src/runner/codex-approval-probe.test.ts, scripts/run-runner-codex-approval-probe.mjs, package.json."
  -
    type: "status"
    at: "2026-03-24T13:12:38.637Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added a live Codex approval probe harness, covered the classifier with focused tests, and confirmed that never, untrusted, and on-request all remain permissive in non-interactive exec mode for both write and delete probes."
doc_version: 3
doc_updated_at: "2026-03-24T13:12:38.638Z"
doc_updated_by: "CODER"
description: "Empirically verify how codex exec behaves with top-level approval modes in non-interactive runner-like flows so the requires_human_approval contract can be implemented or removed honestly."
sections:
  Summary: |-
    Probe non-interactive Codex approval modes for runner semantics
    
    Empirically verify how codex exec behaves with top-level approval modes in non-interactive runner-like flows so the requires_human_approval contract can be implemented or removed honestly.
  Scope: |-
    - In scope: Empirically verify how codex exec behaves with top-level approval modes in non-interactive runner-like flows so the requires_human_approval contract can be implemented or removed honestly.
    - Out of scope: unrelated refactors not required for "Probe non-interactive Codex approval modes for runner semantics".
  Plan: "1. Inspect current runner approval handling in the Codex adapter, adapter capabilities, and preflight refusal logic. 2. Add a focused approval probe path that exercises real codex exec top-level approval modes in a runner-like temp workspace without leaving the repository. 3. Capture whether non-interactive approval modes can complete successfully, refuse safely, or stall, and record the observed contract in task-local evidence. 4. Run targeted tests and source builds, then finish with a single task-scoped commit."
  Verify Steps: |-
    1. Run focused tests for any new approval-probe helpers or classification logic. Expected: approval probe helpers classify the observed outcomes deterministically.
    2. Exercise the live approval probe against repo-local codex exec modes. Expected: the task records concrete outcomes for the tested approval modes and leaves reproducible evidence under task-local artifacts or notes.
    3. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Expected: touched runner and probe files build without regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T13:12:24.532Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/codex-approval-probe.test.ts | bun scripts/run-runner-codex-approval-probe.mjs --keep-workspace | bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build | bunx eslint packages/agentplane/src/runner/codex-approval-probe.ts packages/agentplane/src/runner/codex-approval-probe.test.ts scripts/run-runner-codex-approval-probe.mjs; Result: pass; Evidence: 3 classifier tests passed, the live probe reported verdict=permissive for never, untrusted, and on-request, and each mode completed both the control write probe and the destructive delete probe with exit_code=0 and no surfaced approval barrier; Scope: packages/agentplane/src/runner/codex-approval-probe.ts, packages/agentplane/src/runner/codex-approval-probe.test.ts, scripts/run-runner-codex-approval-probe.mjs, package.json.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T13:12:04.331Z, excerpt_hash=sha256:b9d43b17533be21f1f570a741d664a871b0ca5171ffa412d74844f7208d8542f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "Observed live Codex exec behavior is permissive across approval modes never, untrusted, and on-request: all three completed both the control write probe and the destructive delete probe with exit_code=0 and no surfaced approval barrier. This means requires_human_approval cannot be mapped honestly to current non-interactive codex exec semantics."
id_source: "generated"
---
## Summary

Probe non-interactive Codex approval modes for runner semantics

Empirically verify how codex exec behaves with top-level approval modes in non-interactive runner-like flows so the requires_human_approval contract can be implemented or removed honestly.

## Scope

- In scope: Empirically verify how codex exec behaves with top-level approval modes in non-interactive runner-like flows so the requires_human_approval contract can be implemented or removed honestly.
- Out of scope: unrelated refactors not required for "Probe non-interactive Codex approval modes for runner semantics".

## Plan

1. Inspect current runner approval handling in the Codex adapter, adapter capabilities, and preflight refusal logic. 2. Add a focused approval probe path that exercises real codex exec top-level approval modes in a runner-like temp workspace without leaving the repository. 3. Capture whether non-interactive approval modes can complete successfully, refuse safely, or stall, and record the observed contract in task-local evidence. 4. Run targeted tests and source builds, then finish with a single task-scoped commit.

## Verify Steps

1. Run focused tests for any new approval-probe helpers or classification logic. Expected: approval probe helpers classify the observed outcomes deterministically.
2. Exercise the live approval probe against repo-local codex exec modes. Expected: the task records concrete outcomes for the tested approval modes and leaves reproducible evidence under task-local artifacts or notes.
3. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Expected: touched runner and probe files build without regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T13:12:24.532Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/codex-approval-probe.test.ts | bun scripts/run-runner-codex-approval-probe.mjs --keep-workspace | bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build | bunx eslint packages/agentplane/src/runner/codex-approval-probe.ts packages/agentplane/src/runner/codex-approval-probe.test.ts scripts/run-runner-codex-approval-probe.mjs; Result: pass; Evidence: 3 classifier tests passed, the live probe reported verdict=permissive for never, untrusted, and on-request, and each mode completed both the control write probe and the destructive delete probe with exit_code=0 and no surfaced approval barrier; Scope: packages/agentplane/src/runner/codex-approval-probe.ts, packages/agentplane/src/runner/codex-approval-probe.test.ts, scripts/run-runner-codex-approval-probe.mjs, package.json.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T13:12:04.331Z, excerpt_hash=sha256:b9d43b17533be21f1f570a741d664a871b0ca5171ffa412d74844f7208d8542f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Observed live Codex exec behavior is permissive across approval modes never, untrusted, and on-request: all three completed both the control write probe and the destructive delete probe with exit_code=0 and no surfaced approval barrier. This means requires_human_approval cannot be mapped honestly to current non-interactive codex exec semantics.
