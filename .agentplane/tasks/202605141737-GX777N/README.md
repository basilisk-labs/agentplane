---
id: "202605141737-GX777N"
title: "Enrich feedback issue diagnostics"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "diagnostics"
  - "github"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T17:37:14.638Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T18:03:11.859Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; Result: pass, 6 tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: bun run docs:cli:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with two unrelated existing branch_pr reconciliation warnings. External: created test feedback issue #3744 with Agent context and failure metadata, raw branch name absent."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement privacy-bounded feedback issue diagnostics in the dedicated task worktree, including tests and a sanitized test issue creation attempt."
events:
  -
    type: "status"
    at: "2026-05-14T17:37:26.111Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement privacy-bounded feedback issue diagnostics in the dedicated task worktree, including tests and a sanitized test issue creation attempt."
  -
    type: "verify"
    at: "2026-05-14T18:03:11.859Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; Result: pass, 6 tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: bun run docs:cli:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with two unrelated existing branch_pr reconciliation warnings. External: created test feedback issue #3744 with Agent context and failure metadata, raw branch name absent."
doc_version: 3
doc_updated_at: "2026-05-14T18:03:11.887Z"
doc_updated_by: "CODER"
description: "Add privacy-bounded failure context and required agent context support to AgentPlane insights issue reports, then create a test feedback issue."
sections:
  Summary: |-
    Enrich feedback issue diagnostics
    
    Add privacy-bounded failure context and required agent context support to AgentPlane insights issue reports, then create a test feedback issue.
  Scope: |-
    - In scope: Add privacy-bounded failure context and required agent context support to AgentPlane insights issue reports, then create a test feedback issue.
    - Out of scope: unrelated refactors not required for "Enrich feedback issue diagnostics".
  Plan: "Implement privacy-bounded failure context for insights reports; add command options for agent context file and explicit missing-context override; require context for E_INTERNAL issue creation unless override is supplied; update focused tests and run dry-run plus test issue creation with sanitized context."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T18:03:11.859Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; Result: pass, 6 tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: bun run docs:cli:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with two unrelated existing branch_pr reconciliation warnings. External: created test feedback issue #3744 with Agent context and failure metadata, raw branch name absent.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:37:26.111Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141737-GX777N-feedback-issue-diagnostics/.agentplane/tasks/202605141737-GX777N/blueprint/resolved-snapshot.json
    - old_digest: a92c708eda3bd2255ed9754e1ab81fdbd70f98fcdd66123088b775187fa7e608
    - current_digest: a92c708eda3bd2255ed9754e1ab81fdbd70f98fcdd66123088b775187fa7e608
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141737-GX777N
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Enrich feedback issue diagnostics

Add privacy-bounded failure context and required agent context support to AgentPlane insights issue reports, then create a test feedback issue.

## Scope

- In scope: Add privacy-bounded failure context and required agent context support to AgentPlane insights issue reports, then create a test feedback issue.
- Out of scope: unrelated refactors not required for "Enrich feedback issue diagnostics".

## Plan

Implement privacy-bounded failure context for insights reports; add command options for agent context file and explicit missing-context override; require context for E_INTERNAL issue creation unless override is supplied; update focused tests and run dry-run plus test issue creation with sanitized context.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T18:03:11.859Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; Result: pass, 6 tests. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass. Command: bun run docs:cli:check; Result: pass. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Command: ap doctor; Result: OK with two unrelated existing branch_pr reconciliation warnings. External: created test feedback issue #3744 with Agent context and failure metadata, raw branch name absent.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:37:26.111Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141737-GX777N-feedback-issue-diagnostics/.agentplane/tasks/202605141737-GX777N/blueprint/resolved-snapshot.json
- old_digest: a92c708eda3bd2255ed9754e1ab81fdbd70f98fcdd66123088b775187fa7e608
- current_digest: a92c708eda3bd2255ed9754e1ab81fdbd70f98fcdd66123088b775187fa7e608
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141737-GX777N

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
