---
id: "202604131329-KHYHBT"
title: "Recover task hosted-close when base-side pr meta is missing"
result_summary: "Merged via PR #275."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T13:29:31.392Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T13:37:53.783Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass. Evidence: 6/6 hosted-close and hosted-close-pr tests passed, including the missing base-side pr/meta.json regression. Scope: hosted-close merge-event fallback and adjacent closure recovery paths. Command: bun run framework:dev:bootstrap; Result: pass. Evidence: core build, agentplane build, and repo-local runtime verification completed without stale-snapshot warnings afterward. Scope: repo-local CLI runtime aligned with the patched hosted-close implementation."
commit:
  hash: "5e7ce06aa66bdf5880d223bd753850b246e302cc"
  message: "workflow: Recover task hosted-close when base-side pr meta is missing (KHYHBT) (#275)"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the merged-hosted-close failure when base-side pr/meta.json is absent, add a fallback that recovers required metadata from the merge event or GitHub lookup, and verify the fix with focused hosted-close coverage so future protected-main release waves do not require a manual closure PR."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #275 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-13T13:29:48.781Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the merged-hosted-close failure when base-side pr/meta.json is absent, add a fallback that recovers required metadata from the merge event or GitHub lookup, and verify the fix with focused hosted-close coverage so future protected-main release waves do not require a manual closure PR."
  -
    type: "verify"
    at: "2026-04-13T13:37:53.783Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass. Evidence: 6/6 hosted-close and hosted-close-pr tests passed, including the missing base-side pr/meta.json regression. Scope: hosted-close merge-event fallback and adjacent closure recovery paths. Command: bun run framework:dev:bootstrap; Result: pass. Evidence: core build, agentplane build, and repo-local runtime verification completed without stale-snapshot warnings afterward. Scope: repo-local CLI runtime aligned with the patched hosted-close implementation."
  -
    type: "status"
    at: "2026-04-13T13:51:12.389Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #275 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-13T13:51:12.396Z"
doc_updated_by: "INTEGRATOR"
description: "Make the hosted task closure command recover the merged PR/task metadata from the GitHub event or remote metadata when .agentplane/tasks/<task-id>/pr/meta.json is absent on the base checkout, so protected-main release waves do not require a manual closure PR."
sections:
  Summary: |-
    Recover task hosted-close when base-side pr meta is missing
    
    Make the hosted task closure command recover the merged PR/task metadata from the GitHub event or remote metadata when .agentplane/tasks/<task-id>/pr/meta.json is absent on the base checkout, so protected-main release waves do not require a manual closure PR.
  Scope: |-
    - In scope: Make the hosted task closure command recover the merged PR/task metadata from the GitHub event or remote metadata when .agentplane/tasks/<task-id>/pr/meta.json is absent on the base checkout, so protected-main release waves do not require a manual closure PR.
    - Out of scope: unrelated refactors not required for "Recover task hosted-close when base-side pr meta is missing".
  Plan: "Reproduce the hosted task-close failure that appears after a merged protected-main aggregate PR without committed base-side pr/meta.json, add a fallback in task hosted-close to derive the required merge/PR metadata from the GitHub event or GitHub API, verify it with focused tests, and publish the fix through a normal branch_pr task so future patch releases do not require a manual closure PR."
  Verify Steps: |-
    1. Review the requested outcome for "Recover task hosted-close when base-side pr meta is missing". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T13:37:53.783Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass. Evidence: 6/6 hosted-close and hosted-close-pr tests passed, including the missing base-side pr/meta.json regression. Scope: hosted-close merge-event fallback and adjacent closure recovery paths. Command: bun run framework:dev:bootstrap; Result: pass. Evidence: core build, agentplane build, and repo-local runtime verification completed without stale-snapshot warnings afterward. Scope: repo-local CLI runtime aligned with the patched hosted-close implementation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T13:29:48.787Z, excerpt_hash=sha256:cab37887f8780e612519af1d87a41f0df010c23abf71bbd7b3dcf2ff687cd0f3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Recover task hosted-close when base-side pr meta is missing

Make the hosted task closure command recover the merged PR/task metadata from the GitHub event or remote metadata when .agentplane/tasks/<task-id>/pr/meta.json is absent on the base checkout, so protected-main release waves do not require a manual closure PR.

## Scope

- In scope: Make the hosted task closure command recover the merged PR/task metadata from the GitHub event or remote metadata when .agentplane/tasks/<task-id>/pr/meta.json is absent on the base checkout, so protected-main release waves do not require a manual closure PR.
- Out of scope: unrelated refactors not required for "Recover task hosted-close when base-side pr meta is missing".

## Plan

Reproduce the hosted task-close failure that appears after a merged protected-main aggregate PR without committed base-side pr/meta.json, add a fallback in task hosted-close to derive the required merge/PR metadata from the GitHub event or GitHub API, verify it with focused tests, and publish the fix through a normal branch_pr task so future patch releases do not require a manual closure PR.

## Verify Steps

1. Review the requested outcome for "Recover task hosted-close when base-side pr meta is missing". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T13:37:53.783Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass. Evidence: 6/6 hosted-close and hosted-close-pr tests passed, including the missing base-side pr/meta.json regression. Scope: hosted-close merge-event fallback and adjacent closure recovery paths. Command: bun run framework:dev:bootstrap; Result: pass. Evidence: core build, agentplane build, and repo-local runtime verification completed without stale-snapshot warnings afterward. Scope: repo-local CLI runtime aligned with the patched hosted-close implementation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T13:29:48.787Z, excerpt_hash=sha256:cab37887f8780e612519af1d87a41f0df010c23abf71bbd7b3dcf2ff687cd0f3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
