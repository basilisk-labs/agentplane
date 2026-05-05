---
id: "202605050621-DNQ2XD"
title: "Make branch_pr closeout idempotent"
result_summary: "Merged via PR #904."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T06:21:57.133Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T06:26:34.593Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts -> pass (50 tests). Command: bunx eslint packages/agentplane/src/commands/task/finish-close.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts scripts/lib/pre-push-scope.mjs -> pass. Command: bunx prettier --check touched files -> pass. Command: bun run typecheck -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: bun run framework:dev:bootstrap -> pass. Command: node packages/agentplane/bin/agentplane.js doctor -> pass."
commit:
  hash: "47c7c6755d9e0bbb3328310bfef9fdd59db98864"
  message: "Merge pull request #904 from basilisk-labs/task/202605050621-DNQ2XD/closeout-idempotency"
comments:
  -
    author: "CODER"
    body: "Start: hardening branch_pr closeout so local finish does not duplicate hosted close PRs, and making pre-push range detection tolerate missing remote SHAs."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #904 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-05T06:22:07.562Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: hardening branch_pr closeout so local finish does not duplicate hosted close PRs, and making pre-push range detection tolerate missing remote SHAs."
  -
    type: "verify"
    at: "2026-05-05T06:26:34.593Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts -> pass (50 tests). Command: bunx eslint packages/agentplane/src/commands/task/finish-close.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts scripts/lib/pre-push-scope.mjs -> pass. Command: bunx prettier --check touched files -> pass. Command: bun run typecheck -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: bun run framework:dev:bootstrap -> pass. Command: node packages/agentplane/bin/agentplane.js doctor -> pass."
  -
    type: "status"
    at: "2026-05-05T06:37:12.463Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #904 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-05T06:37:12.468Z"
doc_updated_by: "INTEGRATOR"
description: "Prevent duplicate local task-close pull requests when hosted close automation has already closed a merged branch_pr task, and make pre-push range detection robust for new close branches."
sections:
  Summary: |-
    Make branch_pr closeout idempotent
    
    Prevent duplicate local task-close pull requests when hosted close automation has already closed a merged branch_pr task, and make pre-push range detection robust for new close branches.
  Scope: |-
    - In scope: Prevent duplicate local task-close pull requests when hosted close automation has already closed a merged branch_pr task, and make pre-push range detection robust for new close branches.
    - Out of scope: unrelated refactors not required for "Make branch_pr closeout idempotent".
  Plan: "1. Add remote-aware idempotency to branch_pr local finish/close-tail so it fetches/checks origin main and existing/merged task-close PRs before creating a local task-close branch. 2. Make pre-push changed-file range selection robust when the remote old SHA is unavailable locally, falling back to the default base instead of throwing Invalid revision range. 3. Add focused tests for duplicate hosted-close prevention and pre-push range fallback. 4. Verify with focused tests, policy routing, and agentplane doctor."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T06:26:34.593Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts -> pass (50 tests). Command: bunx eslint packages/agentplane/src/commands/task/finish-close.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts scripts/lib/pre-push-scope.mjs -> pass. Command: bunx prettier --check touched files -> pass. Command: bun run typecheck -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: bun run framework:dev:bootstrap -> pass. Command: node packages/agentplane/bin/agentplane.js doctor -> pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T06:22:07.562Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make branch_pr closeout idempotent

Prevent duplicate local task-close pull requests when hosted close automation has already closed a merged branch_pr task, and make pre-push range detection robust for new close branches.

## Scope

- In scope: Prevent duplicate local task-close pull requests when hosted close automation has already closed a merged branch_pr task, and make pre-push range detection robust for new close branches.
- Out of scope: unrelated refactors not required for "Make branch_pr closeout idempotent".

## Plan

1. Add remote-aware idempotency to branch_pr local finish/close-tail so it fetches/checks origin main and existing/merged task-close PRs before creating a local task-close branch. 2. Make pre-push changed-file range selection robust when the remote old SHA is unavailable locally, falling back to the default base instead of throwing Invalid revision range. 3. Add focused tests for duplicate hosted-close prevention and pre-push range fallback. 4. Verify with focused tests, policy routing, and agentplane doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T06:26:34.593Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts -> pass (50 tests). Command: bunx eslint packages/agentplane/src/commands/task/finish-close.ts packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts scripts/lib/pre-push-scope.mjs -> pass. Command: bunx prettier --check touched files -> pass. Command: bun run typecheck -> pass. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: bun run framework:dev:bootstrap -> pass. Command: node packages/agentplane/bin/agentplane.js doctor -> pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T06:22:07.562Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
