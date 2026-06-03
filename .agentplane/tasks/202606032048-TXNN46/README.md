---
id: "202606032048-TXNN46"
title: "Accept blocked runner result manifests"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T20:49:21.238Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-03T21:04:30.052Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/result-manifest.test.ts | Result: pass | Evidence: initial focused run passed 1 file / 8 tests, including blocked terminal manifest regression. Command: bun run schemas:check | Result: pass | Evidence: schemas OK after schemas:sync. Command: bun run --filter=@agentplaneorg/core typecheck && bun run --filter=agentplane typecheck | Result: pass | Evidence: both package typechecks exited 0. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: ap task verify-show 202606032048-TXNN46 | Result: pass | Evidence: Verify Steps and blueprint snapshot read back current."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-03T21:14:06.037Z"
  updated_by: "EVALUATOR"
  note: "Runner result manifests now accept blocked as a terminal external-blocker outcome and persisted runner/task schemas render it without invalid_result_manifest."
  evaluated_sha: "78a66d0417efa3a7be3f78f4b49003ca68606376"
  blueprint_digest: "59d6014afabefbeacc55abea256563146c09d915447a8cd8713848eb127d25b2"
  evidence_refs:
    - ".agentplane/tasks/202606032048-TXNN46/README.md"
    - ".agentplane/tasks/202606032048-TXNN46/quality/20260603-211406037-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606032048-TXNN46/quality/20260603-211406037-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606032048-TXNN46/quality/20260603-211406037-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606032048-TXNN46/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/runner/result-manifest.test.ts"
    - "bun run schemas:check"
    - "bun run --filter=@agentplaneorg/core typecheck"
    - "bun run --filter=agentplane typecheck"
    - "node .agentplane/policy/check-routing.mjs"
  findings:
    - "Regression coverage added for status=blocked in result-manifest parsing; core/spec/root schemas include blocked runner outcome; package typechecks, schema check, routing check, direct parser smoke, and task verify-show passed. Residual: repeated post-build Vitest startups hung before banner, while the initial focused Vitest run passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement runner result manifest handling for GitHub issue #4412 so delegated status=blocked is accepted as an external blocker instead of becoming invalid_result_manifest."
events:
  -
    type: "status"
    at: "2026-06-03T20:49:52.961Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement runner result manifest handling for GitHub issue #4412 so delegated status=blocked is accepted as an external blocker instead of becoming invalid_result_manifest."
  -
    type: "verify"
    at: "2026-06-03T21:04:30.052Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/result-manifest.test.ts | Result: pass | Evidence: initial focused run passed 1 file / 8 tests, including blocked terminal manifest regression. Command: bun run schemas:check | Result: pass | Evidence: schemas OK after schemas:sync. Command: bun run --filter=@agentplaneorg/core typecheck && bun run --filter=agentplane typecheck | Result: pass | Evidence: both package typechecks exited 0. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: ap task verify-show 202606032048-TXNN46 | Result: pass | Evidence: Verify Steps and blueprint snapshot read back current."
doc_version: 3
doc_updated_at: "2026-06-03T21:04:52.886Z"
doc_updated_by: "CODER"
description: "Fix GitHub issue #4412: delegated Codex runs can produce result manifest status=blocked when an external publication step is blocked, but AgentPlane currently rejects that manifest as invalid and turns the external blocker into E_INTERNAL."
sections:
  Summary: "Fix GitHub issue #4412 by making runner result manifest handling accept an externally blocked delegated run instead of rejecting it as an internal invalid_result_manifest error."
  Scope: "In scope: runner result manifest schema/parsing, terminal status mapping for blocked external publication or policy cases, and focused tests covering status=blocked. Out of scope: GitHub permission repair, Codex auth changes, broad runner lifecycle refactors, release publication."
  Plan: |-
    1. Locate runner result manifest status validation and terminal status mapping.
    2. Add blocked as an accepted delegated-run terminal result or map it to the existing first-class external blocked state without raising invalid_result_manifest.
    3. Add a focused regression test for a result manifest with status=blocked.
    4. Run the targeted test, policy routing check, and declared task verification.
  Verify Steps: |-
    1. Run the focused runner manifest test that covers status=blocked.
    2. Run the relevant package test suite for the touched runner module if separate from the focused test.
    3. Run node .agentplane/policy/check-routing.mjs.
    4. Run ap task verify-show 202606032048-TXNN46 before recording verification.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-03T21:04:30.052Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/result-manifest.test.ts | Result: pass | Evidence: initial focused run passed 1 file / 8 tests, including blocked terminal manifest regression. Command: bun run schemas:check | Result: pass | Evidence: schemas OK after schemas:sync. Command: bun run --filter=@agentplaneorg/core typecheck && bun run --filter=agentplane typecheck | Result: pass | Evidence: both package typechecks exited 0. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: ap task verify-show 202606032048-TXNN46 | Result: pass | Evidence: Verify Steps and blueprint snapshot read back current.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T20:49:52.961Z, excerpt_hash=sha256:7085633855d954e2760dbe42ee62204fb01c52ea19dca9f3e0d8d7d178cefa35

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606032048-TXNN46-accept-blocked-runner-result-manifests/.agentplane/tasks/202606032048-TXNN46/blueprint/resolved-snapshot.json
    - old_digest: 59d6014afabefbeacc55abea256563146c09d915447a8cd8713848eb127d25b2
    - current_digest: 59d6014afabefbeacc55abea256563146c09d915447a8cd8713848eb127d25b2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606032048-TXNN46

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the implementation and test commits for this task; runner manifest validation returns to the previous accepted status set."
  Findings: |-
    - Observation: Repeated Vitest invocations after package build hung before printing a banner; killed only those local test processes and used package typecheck plus direct bun parser smoke as supplementary evidence.
      Impact: The regression had already passed in the initial focused Vitest run; local post-build Vitest startup hang is recorded as residual harness risk, not a parser failure.
      Resolution: Direct smoke readRunnerResultManifest status=blocked passed and package typechecks/schema/routing passed.
id_source: "generated"
---
## Summary

Fix GitHub issue #4412 by making runner result manifest handling accept an externally blocked delegated run instead of rejecting it as an internal invalid_result_manifest error.

## Scope

In scope: runner result manifest schema/parsing, terminal status mapping for blocked external publication or policy cases, and focused tests covering status=blocked. Out of scope: GitHub permission repair, Codex auth changes, broad runner lifecycle refactors, release publication.

## Plan

1. Locate runner result manifest status validation and terminal status mapping.
2. Add blocked as an accepted delegated-run terminal result or map it to the existing first-class external blocked state without raising invalid_result_manifest.
3. Add a focused regression test for a result manifest with status=blocked.
4. Run the targeted test, policy routing check, and declared task verification.

## Verify Steps

1. Run the focused runner manifest test that covers status=blocked.
2. Run the relevant package test suite for the touched runner module if separate from the focused test.
3. Run node .agentplane/policy/check-routing.mjs.
4. Run ap task verify-show 202606032048-TXNN46 before recording verification.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-03T21:04:30.052Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/result-manifest.test.ts | Result: pass | Evidence: initial focused run passed 1 file / 8 tests, including blocked terminal manifest regression. Command: bun run schemas:check | Result: pass | Evidence: schemas OK after schemas:sync. Command: bun run --filter=@agentplaneorg/core typecheck && bun run --filter=agentplane typecheck | Result: pass | Evidence: both package typechecks exited 0. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: ap task verify-show 202606032048-TXNN46 | Result: pass | Evidence: Verify Steps and blueprint snapshot read back current.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-03T20:49:52.961Z, excerpt_hash=sha256:7085633855d954e2760dbe42ee62204fb01c52ea19dca9f3e0d8d7d178cefa35

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606032048-TXNN46-accept-blocked-runner-result-manifests/.agentplane/tasks/202606032048-TXNN46/blueprint/resolved-snapshot.json
- old_digest: 59d6014afabefbeacc55abea256563146c09d915447a8cd8713848eb127d25b2
- current_digest: 59d6014afabefbeacc55abea256563146c09d915447a8cd8713848eb127d25b2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606032048-TXNN46

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation and test commits for this task; runner manifest validation returns to the previous accepted status set.

## Findings

- Observation: Repeated Vitest invocations after package build hung before printing a banner; killed only those local test processes and used package typecheck plus direct bun parser smoke as supplementary evidence.
  Impact: The regression had already passed in the initial focused Vitest run; local post-build Vitest startup hang is recorded as residual harness risk, not a parser failure.
  Resolution: Direct smoke readRunnerResultManifest status=blocked passed and package typechecks/schema/routing passed.
