---
id: "202604100023-EVJWDM"
title: "Auto-bootstrap framework runtime after integrate touches watched sources"
result_summary: "integrate: squash task/202604100023-EVJWDM/integrate-autobootstrap"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T00:24:57.183Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-10T00:30:41.131Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts and bun x eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.ts packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts passed; integrate now auto-refreshes repo-local runtime on watched-source merges and falls back to explicit manual guidance on bootstrap failure."
commit:
  hash: "0f4d2f9a92e09a540103867b212e458fc8569529"
  message: "✅ EVJWDM close: integrate: squash task/202604100023-EVJWDM/integrate-autobootstrap (202604100023-EVJWDM) [code,workflow]"
comments:
  -
    author: "CODER"
    body: "Start: auto-refresh the framework runtime after integrate when watched runtime sources changed so finish closeout does not need a separate manual bootstrap."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100023-EVJWDM/pr."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100023-EVJWDM/pr."
events:
  -
    type: "status"
    at: "2026-04-10T00:28:23.996Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: auto-refresh the framework runtime after integrate when watched runtime sources changed so finish closeout does not need a separate manual bootstrap."
  -
    type: "verify"
    at: "2026-04-10T00:30:41.131Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts and bun x eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.ts packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts passed; integrate now auto-refreshes repo-local runtime on watched-source merges and falls back to explicit manual guidance on bootstrap failure."
  -
    type: "status"
    at: "2026-04-10T00:37:12.981Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100023-EVJWDM/pr."
  -
    type: "status"
    at: "2026-04-10T00:37:16.604Z"
    author: "INTEGRATOR"
    from: "DONE"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100023-EVJWDM/pr."
doc_version: 3
doc_updated_at: "2026-04-10T00:37:16.605Z"
doc_updated_by: "INTEGRATOR"
description: "When branch_pr integrate lands watched runtime source changes on base inside the framework checkout, refresh the repo-local runtime automatically so the next finish --close-commit does not fail on stale dist."
sections:
  Summary: |-
    Auto-bootstrap framework runtime after integrate touches watched sources
    
    When branch_pr integrate lands watched runtime source changes on base inside the framework checkout, refresh the repo-local runtime automatically so the next finish --close-commit does not fail on stale dist.
  Scope: |-
    - In scope: When branch_pr integrate lands watched runtime source changes on base inside the framework checkout, refresh the repo-local runtime automatically so the next finish --close-commit does not fail on stale dist.
    - Out of scope: unrelated refactors not required for "Auto-bootstrap framework runtime after integrate touches watched sources".
  Plan: "1. Detect when branch_pr integrate lands watched runtime source changes on base inside the framework checkout. 2. Run framework:dev:bootstrap automatically after a successful integrate in that scenario, keeping existing cleanup and non-framework behavior intact. 3. Add unit coverage for auto-bootstrap success, skip, and failure guidance behavior."
  Verify Steps: |-
    1. Run the targeted integrate unit tests that cover watched-runtime merges in a framework checkout. Expected: integrate invokes framework bootstrap automatically when watched runtime sources changed, and skips bootstrap otherwise.
    2. Exercise the failure branch with a mocked bootstrap error. Expected: integrate still succeeds at the git/task level but emits an explicit warning that the runtime refresh failed and manual bootstrap is required.
    3. Run the touched-unit lint/test slice for the integrate command and any new bootstrap helper. Expected: the new auto-bootstrap path passes without regressing existing integrate behavior.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T00:30:41.131Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts and bun x eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.ts packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts passed; integrate now auto-refreshes repo-local runtime on watched-source merges and falls back to explicit manual guidance on bootstrap failure.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T00:28:24.002Z, excerpt_hash=sha256:a4149add8987958c1a0823a24c2e8a4e4d6432bb33bedc0efbf6ecf824fbf8ec
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Base-side integrate could land watched runtime source changes in the framework checkout, but the repo-local runtime stayed stale until the operator manually ran framework bootstrap before finish closeout.
      Impact: The first finish --close-commit after integrate could fail on stale dist even though integrate itself succeeded, adding a manual recovery loop and an avoidable failed close attempt.
      Resolution: Integrate now auto-runs bun run framework:dev:bootstrap in framework checkouts when watched runtime sources changed, and falls back to explicit manual guidance only if the refresh fails.
      Promotion: incident-candidate
      Fixability: repo-fixable
      IncidentScope: Integrate leaves framework runtime stale after watched-source merges.
      IncidentTags: workflow, runtime, git
id_source: "generated"
---
## Summary

Auto-bootstrap framework runtime after integrate touches watched sources

When branch_pr integrate lands watched runtime source changes on base inside the framework checkout, refresh the repo-local runtime automatically so the next finish --close-commit does not fail on stale dist.

## Scope

- In scope: When branch_pr integrate lands watched runtime source changes on base inside the framework checkout, refresh the repo-local runtime automatically so the next finish --close-commit does not fail on stale dist.
- Out of scope: unrelated refactors not required for "Auto-bootstrap framework runtime after integrate touches watched sources".

## Plan

1. Detect when branch_pr integrate lands watched runtime source changes on base inside the framework checkout. 2. Run framework:dev:bootstrap automatically after a successful integrate in that scenario, keeping existing cleanup and non-framework behavior intact. 3. Add unit coverage for auto-bootstrap success, skip, and failure guidance behavior.

## Verify Steps

1. Run the targeted integrate unit tests that cover watched-runtime merges in a framework checkout. Expected: integrate invokes framework bootstrap automatically when watched runtime sources changed, and skips bootstrap otherwise.
2. Exercise the failure branch with a mocked bootstrap error. Expected: integrate still succeeds at the git/task level but emits an explicit warning that the runtime refresh failed and manual bootstrap is required.
3. Run the touched-unit lint/test slice for the integrate command and any new bootstrap helper. Expected: the new auto-bootstrap path passes without regressing existing integrate behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T00:30:41.131Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.test.ts and bun x eslint packages/agentplane/src/commands/pr/integrate/cmd.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/internal/bootstrap-guidance.ts packages/agentplane/src/commands/pr/integrate/internal/post-integrate-bootstrap.ts passed; integrate now auto-refreshes repo-local runtime on watched-source merges and falls back to explicit manual guidance on bootstrap failure.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T00:28:24.002Z, excerpt_hash=sha256:a4149add8987958c1a0823a24c2e8a4e4d6432bb33bedc0efbf6ecf824fbf8ec

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Base-side integrate could land watched runtime source changes in the framework checkout, but the repo-local runtime stayed stale until the operator manually ran framework bootstrap before finish closeout.
  Impact: The first finish --close-commit after integrate could fail on stale dist even though integrate itself succeeded, adding a manual recovery loop and an avoidable failed close attempt.
  Resolution: Integrate now auto-runs bun run framework:dev:bootstrap in framework checkouts when watched runtime sources changed, and falls back to explicit manual guidance only if the refresh fails.
  Promotion: incident-candidate
  Fixability: repo-fixable
  IncidentScope: Integrate leaves framework runtime stale after watched-source merges.
  IncidentTags: workflow, runtime, git
