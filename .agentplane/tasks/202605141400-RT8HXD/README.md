---
id: "202605141400-RT8HXD"
title: "Harden release publish evidence and external metadata"
result_summary: "Merged via PR #3717."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T14:01:04.617Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T14:08:24.956Z"
  updated_by: "CODER"
  note: "Focused release hardening checks passed: release-task-evidence merge-commit regression suite 5/5, publish-external-distribution topics payload suite 4/4, policy routing OK, git diff whitespace check clean."
  attempts: 0
commit:
  hash: "8de66a4d082c628221662917dbb469a28935f680"
  message: "Merge pull request #3717 from basilisk-labs/task/202605141400-RT8HXD/release-evidence-hardening"
comments:
  -
    author: "CODER"
    body: "Start: fix release publish evidence resolution for branch_pr merge commits and correct external distribution topics API payloads, then verify with focused release script tests."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3717 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-14T14:02:11.942Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix release publish evidence resolution for branch_pr merge commits and correct external distribution topics API payloads, then verify with focused release script tests."
  -
    type: "verify"
    at: "2026-05-14T14:08:24.956Z"
    author: "CODER"
    state: "ok"
    note: "Focused release hardening checks passed: release-task-evidence merge-commit regression suite 5/5, publish-external-distribution topics payload suite 4/4, policy routing OK, git diff whitespace check clean."
  -
    type: "status"
    at: "2026-05-14T15:09:59.491Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3717 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-14T15:09:59.496Z"
doc_updated_by: "INTEGRATOR"
description: "Fix release publish evidence resolution for branch_pr merge commits and correct external repository topics API payloads so hosted publish logs produce durable task evidence without GitHub 422 warnings."
sections:
  Summary: |-
    Harden release publish evidence and external metadata
    
    Fix release publish evidence resolution for branch_pr merge commits and correct external repository topics API payloads so hosted publish logs produce durable task evidence without GitHub 422 warnings.
  Scope: |-
    - In scope: Fix release publish evidence resolution for branch_pr merge commits and correct external repository topics API payloads so hosted publish logs produce durable task evidence without GitHub 422 warnings.
    - Out of scope: unrelated refactors not required for "Harden release publish evidence and external metadata".
  Plan: "Plan: fix release publish evidence resolution for branch_pr merge commits by detecting task README changes against merge parents or PR metadata, fix external distribution topics updates to send a proper GitHub JSON array payload, add regression tests for both logged failures, and verify focused release script tests plus policy routing."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: release task evidence resolves normal commits and branch_pr merge commits, and apply/audit behavior still passes.
    2. Run `bunx vitest run packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts`. Expected: external distribution PR flow still tolerates permission warnings and topics updates use a GitHub JSON array payload.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T14:08:24.956Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused release hardening checks passed: release-task-evidence merge-commit regression suite 5/5, publish-external-distribution topics payload suite 4/4, policy routing OK, git diff whitespace check clean.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T14:05:42.306Z, excerpt_hash=sha256:e50a4d0bc61077643a9004197311fb2bb6ac467bd265c32aeffa84da6d46b62a
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141400-RT8HXD-release-evidence-hardening/.agentplane/tasks/202605141400-RT8HXD/blueprint/resolved-snapshot.json
    - old_digest: 242e48847c9973d113802dd254df3114ef61bea751907f0d23c4e2d11cb45ea5
    - current_digest: 242e48847c9973d113802dd254df3114ef61bea751907f0d23c4e2d11cb45ea5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141400-RT8HXD
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden release publish evidence and external metadata

Fix release publish evidence resolution for branch_pr merge commits and correct external repository topics API payloads so hosted publish logs produce durable task evidence without GitHub 422 warnings.

## Scope

- In scope: Fix release publish evidence resolution for branch_pr merge commits and correct external repository topics API payloads so hosted publish logs produce durable task evidence without GitHub 422 warnings.
- Out of scope: unrelated refactors not required for "Harden release publish evidence and external metadata".

## Plan

Plan: fix release publish evidence resolution for branch_pr merge commits by detecting task README changes against merge parents or PR metadata, fix external distribution topics updates to send a proper GitHub JSON array payload, add regression tests for both logged failures, and verify focused release script tests plus policy routing.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/release/release-task-evidence-script.test.ts`. Expected: release task evidence resolves normal commits and branch_pr merge commits, and apply/audit behavior still passes.
2. Run `bunx vitest run packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts`. Expected: external distribution PR flow still tolerates permission warnings and topics updates use a GitHub JSON array payload.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T14:08:24.956Z — VERIFY — ok

By: CODER

Note: Focused release hardening checks passed: release-task-evidence merge-commit regression suite 5/5, publish-external-distribution topics payload suite 4/4, policy routing OK, git diff whitespace check clean.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T14:05:42.306Z, excerpt_hash=sha256:e50a4d0bc61077643a9004197311fb2bb6ac467bd265c32aeffa84da6d46b62a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141400-RT8HXD-release-evidence-hardening/.agentplane/tasks/202605141400-RT8HXD/blueprint/resolved-snapshot.json
- old_digest: 242e48847c9973d113802dd254df3114ef61bea751907f0d23c4e2d11cb45ea5
- current_digest: 242e48847c9973d113802dd254df3114ef61bea751907f0d23c4e2d11cb45ea5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141400-RT8HXD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
