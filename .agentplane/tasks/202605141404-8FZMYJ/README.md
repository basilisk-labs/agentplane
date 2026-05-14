---
id: "202605141404-8FZMYJ"
title: "Fail closed on external release publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T14:05:06.965Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T14:22:56.266Z"
  updated_by: "CODER"
  note: "Focused release publication checks passed: publish-result now treats pr_opened as incomplete, external publisher verifies merged default-branch state, setup-agentplane tag publication is covered, workflow contract fails incomplete publish-result, routing check passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing fail-closed external release publication proof with focused release workflow tests and documentation updates."
events:
  -
    type: "status"
    at: "2026-05-14T14:06:23.707Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing fail-closed external release publication proof with focused release workflow tests and documentation updates."
  -
    type: "verify"
    at: "2026-05-14T14:22:56.266Z"
    author: "CODER"
    state: "ok"
    note: "Focused release publication checks passed: publish-result now treats pr_opened as incomplete, external publisher verifies merged default-branch state, setup-agentplane tag publication is covered, workflow contract fails incomplete publish-result, routing check passed."
doc_version: 3
doc_updated_at: "2026-05-14T14:22:56.364Z"
doc_updated_by: "CODER"
description: "External distribution PR handoff must not be treated as completed publication; release evidence must require merged/default-branch verified channels or mark the release incomplete."
sections:
  Summary: |-
    Fail closed on external release publication
    
    External distribution PR handoff must not be treated as completed publication; release evidence must require merged/default-branch verified channels or mark the release incomplete.
  Scope: |-
    - In scope: External distribution PR handoff must not be treated as completed publication; release evidence must require merged/default-branch verified channels or mark the release incomplete.
    - Out of scope: unrelated refactors not required for "Fail closed on external release publication".
  Plan: "Plan: 1. Audit current external distribution statuses and encode the failure mode in tests. 2. Update publish-result semantics so pr_opened is incomplete rather than success. 3. Extend external distribution publisher to merge clean PRs where possible, verify default-branch content, and tag setup-agentplane after merge. 4. Update release workflow/docs to reflect publication proof versus handoff. 5. Run focused release tests plus routing check."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T14:22:56.266Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused release publication checks passed: publish-result now treats pr_opened as incomplete, external publisher verifies merged default-branch state, setup-agentplane tag publication is covered, workflow contract fails incomplete publish-result, routing check passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T14:06:23.707Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141404-8FZMYJ-external-release-publish-proof/.agentplane/tasks/202605141404-8FZMYJ/blueprint/resolved-snapshot.json
    - old_digest: 699da31cdfae9e38295b19e27aa9d3c19a711b0c9cd5c4a9e6436a30d05be77a
    - current_digest: 699da31cdfae9e38295b19e27aa9d3c19a711b0c9cd5c4a9e6436a30d05be77a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141404-8FZMYJ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: bun test packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bunx eslint scripts/release/manifest.mjs scripts/release/publish-external-distribution.mjs packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; node .agentplane/policy/check-routing.mjs; git diff --check.
      Impact: Release workflow no longer records external package-manager handoff PRs as successful publication.
      Resolution: Require published/unchanged external statuses in publish-result and make publish workflows fail on incomplete external distribution evidence.
id_source: "generated"
---
## Summary

Fail closed on external release publication

External distribution PR handoff must not be treated as completed publication; release evidence must require merged/default-branch verified channels or mark the release incomplete.

## Scope

- In scope: External distribution PR handoff must not be treated as completed publication; release evidence must require merged/default-branch verified channels or mark the release incomplete.
- Out of scope: unrelated refactors not required for "Fail closed on external release publication".

## Plan

Plan: 1. Audit current external distribution statuses and encode the failure mode in tests. 2. Update publish-result semantics so pr_opened is incomplete rather than success. 3. Extend external distribution publisher to merge clean PRs where possible, verify default-branch content, and tag setup-agentplane after merge. 4. Update release workflow/docs to reflect publication proof versus handoff. 5. Run focused release tests plus routing check.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T14:22:56.266Z — VERIFY — ok

By: CODER

Note: Focused release publication checks passed: publish-result now treats pr_opened as incomplete, external publisher verifies merged default-branch state, setup-agentplane tag publication is covered, workflow contract fails incomplete publish-result, routing check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T14:06:23.707Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141404-8FZMYJ-external-release-publish-proof/.agentplane/tasks/202605141404-8FZMYJ/blueprint/resolved-snapshot.json
- old_digest: 699da31cdfae9e38295b19e27aa9d3c19a711b0c9cd5c4a9e6436a30d05be77a
- current_digest: 699da31cdfae9e38295b19e27aa9d3c19a711b0c9cd5c4a9e6436a30d05be77a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141404-8FZMYJ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands: bun test packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bunx eslint scripts/release/manifest.mjs scripts/release/publish-external-distribution.mjs packages/agentplane/src/commands/release/write-publish-result-manifest-script.test.ts packages/agentplane/src/commands/release/publish-external-distribution-script.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; node .agentplane/policy/check-routing.mjs; git diff --check.
  Impact: Release workflow no longer records external package-manager handoff PRs as successful publication.
  Resolution: Require published/unchanged external statuses in publish-result and make publish workflows fail on incomplete external distribution evidence.
