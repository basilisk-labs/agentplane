---
id: "202603120731-SC0FBG"
title: "Patch stabilization: narrow broad pre-push and local-verify fallbacks"
result_summary: "narrowed release recovery fast-ci fallback"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T07:31:40.089Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved in chat for the next patch stabilization task graph."
verification:
  state: "ok"
  updated_at: "2026-03-12T07:48:35.325Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files, 49 tests passed, including a new selector regression for release-recovery test isolation and unchanged pre-push hook behavior; Scope: fast local CI bucket selection and pre-push hook integration."
commit:
  hash: "c5293e93f5dee3590da2f3811cdb27d5152c02dc"
  message: "✨ SC0FBG hooks: narrow release recovery fallback"
comments:
  -
    author: "CODER"
    body: "Start: narrow broad local verification buckets so runtime-sensitive scopes still escalate, but ordinary touched paths stay on the cheaper path."
  -
    author: "CODER"
    body: "Verified: isolated release recovery selector changes now stay on the targeted release path instead of escalating to the broad full-fast fallback."
events:
  -
    type: "status"
    at: "2026-03-12T07:44:12.114Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: narrow broad local verification buckets so runtime-sensitive scopes still escalate, but ordinary touched paths stay on the cheaper path."
  -
    type: "verify"
    at: "2026-03-12T07:48:35.325Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files, 49 tests passed, including a new selector regression for release-recovery test isolation and unchanged pre-push hook behavior; Scope: fast local CI bucket selection and pre-push hook integration."
  -
    type: "status"
    at: "2026-03-12T07:48:40.061Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: isolated release recovery selector changes now stay on the targeted release path instead of escalating to the broad full-fast fallback."
doc_version: 3
doc_updated_at: "2026-03-12T07:48:40.061Z"
doc_updated_by: "CODER"
description: "Reduce the cost of broad local verification paths while preserving CI parity and runtime-sensitive coverage for patch-critical changes."
id_source: "generated"
---
## Summary

Further narrow broad pre-push and local-verify fallback buckets so common patch-scope changes take the cheapest correct path without drifting from CI requirements.

## Scope

In scope: local CI selector scripts, pre-push hook behavior, and targeted tests/docs required to keep the contour deterministic. Out of scope: release workflow policy changes and unrelated website/docs formatting work.

## Plan

1. Inspect the current remaining broad fallback triggers in local pre-push selection.\n2. Split or tighten the heaviest runtime-sensitive buckets without losing required coverage.\n3. Add focused regression tests and update any contour docs that changed as part of the new selector behavior.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: hook and selector tests pass with the narrowed bucket logic.
2. Exercise representative changed-file scopes against the selector. Expected: narrow scopes take the cheaper path, while broad/runtime-sensitive scopes still escalate deterministically.

## Verification

Pending implementation. Verification evidence will be recorded after the declared checks run.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T07:48:35.325Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files, 49 tests passed, including a new selector regression for release-recovery test isolation and unchanged pre-push hook behavior; Scope: fast local CI bucket selection and pre-push hook integration.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T07:44:12.114Z, excerpt_hash=sha256:431f138340d6d196f8addcb34b40569a1fb7b7c1fda7bfe0bf308bd883774006

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the selector and hook changes so pre-push returns to the previous broader fallback behavior if the narrowed routing skips required checks or becomes nondeterministic.

## Findings
