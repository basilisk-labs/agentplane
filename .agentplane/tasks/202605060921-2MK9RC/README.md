---
id: "202605060921-2MK9RC"
title: "Implement cloud bidirectional pull safeguards"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "cli"
  - "cloud"
  - "code"
verify:
  - "agentplane doctor"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts"
  - "git diff --check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T09:21:24.066Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T09:30:04.799Z"
  updated_by: "CODER"
  note: "Verified: focused backend and CLI tests passed; typecheck, diff check, policy routing, and repo-local doctor passed. Doctor has one pre-existing branch_pr normalization warning for 202605051844-WCPBCX."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement approved cloud bidirectional pull safeguards in the isolated task worktree, covering response parsing, safe projection apply, conflict UX, stale mutation guard, focused tests, and docs updates."
events:
  -
    type: "status"
    at: "2026-05-06T09:22:21.706Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement approved cloud bidirectional pull safeguards in the isolated task worktree, covering response parsing, safe projection apply, conflict UX, stale mutation guard, focused tests, and docs updates."
  -
    type: "verify"
    at: "2026-05-06T09:30:04.799Z"
    author: "CODER"
    state: "ok"
    note: "Verified: focused backend and CLI tests passed; typecheck, diff check, policy routing, and repo-local doctor passed. Doctor has one pre-existing branch_pr normalization warning for 202605051844-WCPBCX."
doc_version: 3
doc_updated_at: "2026-05-06T09:30:04.803Z"
doc_updated_by: "CODER"
description: "Implement CLI/backend safeguards for bidirectional cloud pull: normalize service pull responses, safely apply service-approved operational fields to known local tasks, surface conflict/remediation details, block stale cloud projection before local task mutations, and update user/developer docs."
sections:
  Summary: |-
    Implement cloud bidirectional pull safeguards
    
    Implement CLI/backend safeguards for bidirectional cloud pull: normalize service pull responses, safely apply service-approved operational fields to known local tasks, surface conflict/remediation details, block stale cloud projection before local task mutations, and update user/developer docs.
  Scope: |-
    - In scope: Implement CLI/backend safeguards for bidirectional cloud pull: normalize service pull responses, safely apply service-approved operational fields to known local tasks, surface conflict/remediation details, block stale cloud projection before local task mutations, and update user/developer docs.
    - Out of scope: unrelated refactors not required for "Implement cloud bidirectional pull safeguards".
  Plan: |-
    1. Normalize cloud pull response parsing: support response.tasks/data.tasks, preserve last_checked_at, reject ambiguous missing task payloads unless the service explicitly reports no projection changes, and map service remediation payloads into CLI diagnostics.
    2. Implement safe pull apply: update only known local tasks, ignore remote-only tasks without a creation policy, merge partial operational patches into existing task documents, and preserve AgentPlane-owned lifecycle/doc/verification fields.
    3. Implement conflict behavior for cloud pull: fail blocks writes, diff remains read-only, prefer-remote applies only approved operational fields, and service-provided safe next command is surfaced.
    4. Add stale cloud projection guard before local task mutations while allowing backend sync/inspection and read-only commands. The guard must print agentplane backend sync cloud --direction pull and require existing policy approval for overrides.
    5. Add focused backend/CLI regression tests for bidirectional apply, partial patch preservation, remote-only ignore, remediation errors, conflict modes, stale guard, and state write ordering.
    6. Update cloud backend docs and task backend docs to distinguish publish_only from bidirectional and describe git-visible projection changes.
    
    Acceptance: all Verify Steps pass; no connector-specific GitHub ProjectV2 logic is implemented in public AgentPlane; no secrets or private service files are committed.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T09:30:04.799Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: focused backend and CLI tests passed; typecheck, diff check, policy routing, and repo-local doctor passed. Doctor has one pre-existing branch_pr normalization warning for 202605051844-WCPBCX.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:22:21.706Z, excerpt_hash=sha256:b899c6f1d77696f2a917208d78a5307c6bc92710ecd575228ca1ecfb2d29b161
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Cloud bidirectional pull now applies only service-approved operational fields to known local tasks, ignores remote-only items without a creation policy, surfaces service remediation details, blocks stale projection local writes, and documents git-visible projection updates.
      Impact: This keeps remote GitHub ProjectV2 connector logic in the cloud service while making local CLI/cache behavior reviewable and safe in git.
      Resolution: Added CloudBackend normalization/apply/guard behavior, focused backend and CLI tests, and cloud backend docs updates.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Implement cloud bidirectional pull safeguards

Implement CLI/backend safeguards for bidirectional cloud pull: normalize service pull responses, safely apply service-approved operational fields to known local tasks, surface conflict/remediation details, block stale cloud projection before local task mutations, and update user/developer docs.

## Scope

- In scope: Implement CLI/backend safeguards for bidirectional cloud pull: normalize service pull responses, safely apply service-approved operational fields to known local tasks, surface conflict/remediation details, block stale cloud projection before local task mutations, and update user/developer docs.
- Out of scope: unrelated refactors not required for "Implement cloud bidirectional pull safeguards".

## Plan

1. Normalize cloud pull response parsing: support response.tasks/data.tasks, preserve last_checked_at, reject ambiguous missing task payloads unless the service explicitly reports no projection changes, and map service remediation payloads into CLI diagnostics.
2. Implement safe pull apply: update only known local tasks, ignore remote-only tasks without a creation policy, merge partial operational patches into existing task documents, and preserve AgentPlane-owned lifecycle/doc/verification fields.
3. Implement conflict behavior for cloud pull: fail blocks writes, diff remains read-only, prefer-remote applies only approved operational fields, and service-provided safe next command is surfaced.
4. Add stale cloud projection guard before local task mutations while allowing backend sync/inspection and read-only commands. The guard must print agentplane backend sync cloud --direction pull and require existing policy approval for overrides.
5. Add focused backend/CLI regression tests for bidirectional apply, partial patch preservation, remote-only ignore, remediation errors, conflict modes, stale guard, and state write ordering.
6. Update cloud backend docs and task backend docs to distinguish publish_only from bidirectional and describe git-visible projection changes.

Acceptance: all Verify Steps pass; no connector-specific GitHub ProjectV2 logic is implemented in public AgentPlane; no secrets or private service files are committed.

## Verify Steps

1. Run `bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T09:30:04.799Z — VERIFY — ok

By: CODER

Note: Verified: focused backend and CLI tests passed; typecheck, diff check, policy routing, and repo-local doctor passed. Doctor has one pre-existing branch_pr normalization warning for 202605051844-WCPBCX.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:22:21.706Z, excerpt_hash=sha256:b899c6f1d77696f2a917208d78a5307c6bc92710ecd575228ca1ecfb2d29b161

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Cloud bidirectional pull now applies only service-approved operational fields to known local tasks, ignores remote-only items without a creation policy, surfaces service remediation details, blocks stale projection local writes, and documents git-visible projection updates.
  Impact: This keeps remote GitHub ProjectV2 connector logic in the cloud service while making local CLI/cache behavior reviewable and safe in git.
  Resolution: Added CloudBackend normalization/apply/guard behavior, focused backend and CLI tests, and cloud backend docs updates.
  Promotion: incident-candidate
  Fixability: external
