---
id: "202604062309-QE4CX6"
title: "Replace gh watch in remote-check wait path with resilient polling"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T23:10:42.342Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T23:23:45.472Z"
  updated_by: "CODER"
  note: "Focused wait-remote-checks coverage passed after bootstrapping the task worktree: bun x vitest run packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; bun x eslint scripts/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts. Result: pass. Evidence: workflow:wait-remote-checks now polls GitHub state directly, retries transient transport failures, and times out explicitly instead of delegating to gh pr checks --watch."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: replace the fragile gh watch wrapper with resilient remote-check polling and retries."
events:
  -
    type: "status"
    at: "2026-04-06T23:23:06.278Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the fragile gh watch wrapper with resilient remote-check polling and retries."
  -
    type: "verify"
    at: "2026-04-06T23:23:45.472Z"
    author: "CODER"
    state: "ok"
    note: "Focused wait-remote-checks coverage passed after bootstrapping the task worktree: bun x vitest run packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; bun x eslint scripts/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts. Result: pass. Evidence: workflow:wait-remote-checks now polls GitHub state directly, retries transient transport failures, and times out explicitly instead of delegating to gh pr checks --watch."
doc_version: 3
doc_updated_at: "2026-04-06T23:23:45.476Z"
doc_updated_by: "CODER"
description: "Stop delegating workflow:wait-remote-checks to gh pr checks --watch and use a more resilient polling path with bounded retries and explicit statuses."
sections:
  Summary: |-
    Replace gh watch in remote-check wait path with resilient polling
    
    Stop delegating workflow:wait-remote-checks to gh pr checks --watch and use a more resilient polling path with bounded retries and explicit statuses.
  Scope: |-
    - In scope: Stop delegating workflow:wait-remote-checks to gh pr checks --watch and use a more resilient polling path with bounded retries and explicit statuses.
    - Out of scope: unrelated refactors not required for "Replace gh watch in remote-check wait path with resilient polling".
  Plan: "1. Replace the thin gh pr checks --watch wrapper with a resilient polling implementation that resolves the target PR, queries check runs repeatedly, and tolerates transient transport failures. 2. Preserve explicit failure behavior for auth/usage errors and return useful status summaries while waiting. 3. Add focused script tests that cover success, failure, retry, and timeout behavior."
  Verify Steps: |-
    1. Run focused wait-remote-pr-checks script tests for success, retry, permanent failure, and timeout paths. Expected: resilient polling behavior is covered and green.
    2. Run eslint on the touched wait-remote-checks implementation and tests. Expected: no lint errors in touched scope.
    3. Review the script help and runtime output. Expected: the command no longer claims to be a thin `gh pr checks --watch` wrapper and it prints explicit polling status/failure messages.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T23:23:45.472Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused wait-remote-checks coverage passed after bootstrapping the task worktree: bun x vitest run packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; bun x eslint scripts/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts. Result: pass. Evidence: workflow:wait-remote-checks now polls GitHub state directly, retries transient transport failures, and times out explicitly instead of delegating to gh pr checks --watch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T23:23:06.295Z, excerpt_hash=sha256:d66df5cf089e626245c43e79dcd613ccb9170e66075b1cba6fc3d641337f9e4e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Replace gh watch in remote-check wait path with resilient polling

Stop delegating workflow:wait-remote-checks to gh pr checks --watch and use a more resilient polling path with bounded retries and explicit statuses.

## Scope

- In scope: Stop delegating workflow:wait-remote-checks to gh pr checks --watch and use a more resilient polling path with bounded retries and explicit statuses.
- Out of scope: unrelated refactors not required for "Replace gh watch in remote-check wait path with resilient polling".

## Plan

1. Replace the thin gh pr checks --watch wrapper with a resilient polling implementation that resolves the target PR, queries check runs repeatedly, and tolerates transient transport failures. 2. Preserve explicit failure behavior for auth/usage errors and return useful status summaries while waiting. 3. Add focused script tests that cover success, failure, retry, and timeout behavior.

## Verify Steps

1. Run focused wait-remote-pr-checks script tests for success, retry, permanent failure, and timeout paths. Expected: resilient polling behavior is covered and green.
2. Run eslint on the touched wait-remote-checks implementation and tests. Expected: no lint errors in touched scope.
3. Review the script help and runtime output. Expected: the command no longer claims to be a thin `gh pr checks --watch` wrapper and it prints explicit polling status/failure messages.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T23:23:45.472Z — VERIFY — ok

By: CODER

Note: Focused wait-remote-checks coverage passed after bootstrapping the task worktree: bun x vitest run packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts; bun x eslint scripts/wait-remote-pr-checks.mjs packages/agentplane/src/cli/wait-remote-pr-checks-script.test.ts. Result: pass. Evidence: workflow:wait-remote-checks now polls GitHub state directly, retries transient transport failures, and times out explicitly instead of delegating to gh pr checks --watch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T23:23:06.295Z, excerpt_hash=sha256:d66df5cf089e626245c43e79dcd613ccb9170e66075b1cba6fc3d641337f9e4e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
