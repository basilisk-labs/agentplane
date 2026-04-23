---
id: "202604230821-FBPNBM"
title: "Harden branch_pr worktree hook shim"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T08:21:54.834Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T08:23:03.447Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 6 tests passed including installed runner path in worktree shim. Command: bunx eslint packages/agentplane/src/commands/branch/work-start.hook-shim.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: hardening branch_pr worktree hook shim for installed clean-project workflows."
events:
  -
    type: "status"
    at: "2026-04-23T08:21:55.235Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: hardening branch_pr worktree hook shim for installed clean-project workflows."
  -
    type: "verify"
    at: "2026-04-23T08:23:03.447Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 6 tests passed including installed runner path in worktree shim. Command: bunx eslint packages/agentplane/src/commands/branch/work-start.hook-shim.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass."
doc_version: 3
doc_updated_at: "2026-04-23T08:23:03.451Z"
doc_updated_by: "CODER"
description: "Make branch_pr worktree hook shims use the installed AgentPlane runner path and avoid default npx fallback, matching clean-project hook install behavior."
sections:
  Summary: |-
    Harden branch_pr worktree hook shim
    
    Make branch_pr worktree hook shims use the installed AgentPlane runner path and avoid default npx fallback, matching clean-project hook install behavior.
  Scope: |-
    - In scope: Make branch_pr worktree hook shims use the installed AgentPlane runner path and avoid default npx fallback, matching clean-project hook install behavior.
    - Out of scope: unrelated refactors not required for "Harden branch_pr worktree hook shim".
  Plan: "Harden the branch_pr worktree hook shim so it mirrors installed hook behavior: capture the current installed/repo-local AgentPlane runner as an absolute path, try it before PATH, and make npx fallback opt-in via AGENTPLANE_HOOK_ALLOW_NPX. Add regression coverage for materialized worktree shims."
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts --pool=threads --maxWorkers 4`. Expected: pass, including installed runner path in materialized worktree shim.
    2. Run `bunx eslint packages/agentplane/src/commands/branch/work-start.hook-shim.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts`. Expected: pass.
    3. Run `bun run --filter=agentplane build`. Expected: pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T08:23:03.447Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 6 tests passed including installed runner path in worktree shim. Command: bunx eslint packages/agentplane/src/commands/branch/work-start.hook-shim.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T08:21:55.247Z, excerpt_hash=sha256:2f77407f03c52a3f3ee2a77347d6f995bdc19df1dc5b282ab13a672dee733364
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden branch_pr worktree hook shim

Make branch_pr worktree hook shims use the installed AgentPlane runner path and avoid default npx fallback, matching clean-project hook install behavior.

## Scope

- In scope: Make branch_pr worktree hook shims use the installed AgentPlane runner path and avoid default npx fallback, matching clean-project hook install behavior.
- Out of scope: unrelated refactors not required for "Harden branch_pr worktree hook shim".

## Plan

Harden the branch_pr worktree hook shim so it mirrors installed hook behavior: capture the current installed/repo-local AgentPlane runner as an absolute path, try it before PATH, and make npx fallback opt-in via AGENTPLANE_HOOK_ALLOW_NPX. Add regression coverage for materialized worktree shims.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts --pool=threads --maxWorkers 4`. Expected: pass, including installed runner path in materialized worktree shim.
2. Run `bunx eslint packages/agentplane/src/commands/branch/work-start.hook-shim.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts`. Expected: pass.
3. Run `bun run --filter=agentplane build`. Expected: pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T08:23:03.447Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts --pool=threads --maxWorkers 4; Result: pass; Evidence: 6 tests passed including installed runner path in worktree shim. Command: bunx eslint packages/agentplane/src/commands/branch/work-start.hook-shim.ts packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts; Result: pass. Command: bun run --filter=agentplane build; Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T08:21:55.247Z, excerpt_hash=sha256:2f77407f03c52a3f3ee2a77347d6f995bdc19df1dc5b282ab13a672dee733364

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
