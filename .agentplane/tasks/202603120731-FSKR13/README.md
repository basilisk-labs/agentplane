---
id: "202603120731-FSKR13"
title: "Patch stabilization: improve release recovery ergonomics"
result_summary: "release recovery state summary"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "release"
verify:
  - "bun x vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/cli/release-recovery-script.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T07:31:40.805Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved in chat for the next patch stabilization task graph."
verification:
  state: "ok"
  updated_at: "2026-03-12T08:00:56.555Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/cli/release-recovery-script.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files, 15 tests passed, including synthesized recovery state assertions in JSON and text mode plus unchanged release-apply preflight diagnostics; Scope: release recovery summary state/cause/next-action ergonomics."
commit:
  hash: "41c69464f91bb6cd317ec0572c8f35605803ea9b"
  message: "✨ FSKR13 release: summarize recovery state"
comments:
  -
    author: "CODER"
    body: "Start: tighten release recovery diagnostics so partial local release states point to the current state, likely cause, and next safe action without specialist guesswork."
  -
    author: "CODER"
    body: "Verified: release recovery output now synthesizes the current state, likely cause, and next safe action instead of forcing the operator to infer the primary scenario from raw findings."
events:
  -
    type: "status"
    at: "2026-03-12T07:58:36.058Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten release recovery diagnostics so partial local release states point to the current state, likely cause, and next safe action without specialist guesswork."
  -
    type: "verify"
    at: "2026-03-12T08:00:56.555Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/cli/release-recovery-script.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files, 15 tests passed, including synthesized recovery state assertions in JSON and text mode plus unchanged release-apply preflight diagnostics; Scope: release recovery summary state/cause/next-action ergonomics."
  -
    type: "status"
    at: "2026-03-12T08:01:01.078Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release recovery output now synthesizes the current state, likely cause, and next safe action instead of forcing the operator to infer the primary scenario from raw findings."
doc_version: 3
doc_updated_at: "2026-03-12T08:01:01.078Z"
doc_updated_by: "CODER"
description: "Make partial release and release-apply failure states easier to diagnose and recover without changing the release model."
id_source: "generated"
---
## Summary

Improve release recovery ergonomics so partial release/apply failures explain the current state and the safest next recovery step more directly.

## Scope

In scope: release/apply diagnostics, recovery scripts, and targeted release regression tests. Out of scope: changing the release branching model or adding automatic global CLI mutation.

## Plan

1. Inspect the current partial-release failure diagnostics and recovery affordances.\n2. Tighten the state-oriented recovery messaging for the most confusing partial-release paths.\n3. Extend release/apply and recovery tests to cover the improved diagnostics.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/cli/release-recovery-script.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: release and recovery tests pass with the improved recovery messaging.
2. Review one representative partial-release fixture. Expected: the diagnostic identifies the current state, likely cause, and next safe recovery action without requiring guesswork.

## Verification

Pending implementation. Verification evidence will be recorded after the declared checks run.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T08:00:56.555Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/cli/release-recovery-script.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 2 files, 15 tests passed, including synthesized recovery state assertions in JSON and text mode plus unchanged release-apply preflight diagnostics; Scope: release recovery summary state/cause/next-action ergonomics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T07:58:36.058Z, excerpt_hash=sha256:e452dfff9b2d78a33752e20e7965452297a0bf7f7ba3ab2aa65e905935d8d982

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the release recovery messaging changes and related tests so the release path returns to the previous wording if the new diagnostics misclassify partial states or break existing release fixtures.

## Findings
