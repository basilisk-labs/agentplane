---
id: "202605170657-EDT46B"
title: "Harden Claude branch_pr merge guidance"
status: "DOING"
priority: "med"
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
  updated_at: "2026-05-17T06:57:48.949Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T07:02:35.624Z"
  updated_by: "CODER"
  note: "Focused verification passed: init Claude gateway generation test, quickstart command-guide test, policy routing, agent template sync check, builtin asset freshness check, and Prettier check all passed. Implementation commit: 1dea641275b520ef75d3a0f6baa5ee9c060ea16d."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: hardening generated Claude and branch_pr guidance after GitHub merge attribution drift, using an isolated worktree because base main is behind origin and dirty."
events:
  -
    type: "status"
    at: "2026-05-17T07:00:55.782Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: hardening generated Claude and branch_pr guidance after GitHub merge attribution drift, using an isolated worktree because base main is behind origin and dirty."
  -
    type: "verify"
    at: "2026-05-17T07:02:35.624Z"
    author: "CODER"
    state: "ok"
    note: "Focused verification passed: init Claude gateway generation test, quickstart command-guide test, policy routing, agent template sync check, builtin asset freshness check, and Prettier check all passed. Implementation commit: 1dea641275b520ef75d3a0f6baa5ee9c060ea16d."
doc_version: 3
doc_updated_at: "2026-05-17T07:02:35.634Z"
doc_updated_by: "CODER"
description: "Clarify generated Claude-facing branch_pr guidance so Claude Code agents do not treat user-authenticated GitHub merges as ordinary task completion, wait for stable hosted checks, and use explicit post-merge/followup task routes after a task is already DONE."
sections:
  Summary: |-
    Harden Claude branch_pr merge guidance
    
    Clarify generated Claude-facing branch_pr guidance so Claude Code agents do not treat user-authenticated GitHub merges as ordinary task completion, wait for stable hosted checks, and use explicit post-merge/followup task routes after a task is already DONE.
  Scope: |-
    - In scope: Clarify generated Claude-facing branch_pr guidance so Claude Code agents do not treat user-authenticated GitHub merges as ordinary task completion, wait for stable hosted checks, and use explicit post-merge/followup task routes after a task is already DONE.
    - Out of scope: unrelated refactors not required for "Harden Claude branch_pr merge guidance".
  Plan: "1. Inspect generated Claude gateway and branch_pr policy surfaces. 2. Add explicit guidance for Claude/user-authenticated GitHub merge identity, stable hosted checks, and post-merge/followup routing. 3. Add focused init-generation tests proving CLAUDE.md and workflow.branch_pr.md include the guardrails. 4. Run focused tests and policy routing."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T07:02:35.624Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused verification passed: init Claude gateway generation test, quickstart command-guide test, policy routing, agent template sync check, builtin asset freshness check, and Prettier check all passed. Implementation commit: 1dea641275b520ef75d3a0f6baa5ee9c060ea16d.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T07:00:55.782Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605170657-EDT46B/blueprint/resolved-snapshot.json
    - old_digest: c4b5546148b6388fb16fbf805aa7fb9e9caedb5c0504cb5cfc95da40cc4d5bd9
    - current_digest: c4b5546148b6388fb16fbf805aa7fb9e9caedb5c0504cb5cfc95da40cc4d5bd9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170657-EDT46B
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden Claude branch_pr merge guidance

Clarify generated Claude-facing branch_pr guidance so Claude Code agents do not treat user-authenticated GitHub merges as ordinary task completion, wait for stable hosted checks, and use explicit post-merge/followup task routes after a task is already DONE.

## Scope

- In scope: Clarify generated Claude-facing branch_pr guidance so Claude Code agents do not treat user-authenticated GitHub merges as ordinary task completion, wait for stable hosted checks, and use explicit post-merge/followup task routes after a task is already DONE.
- Out of scope: unrelated refactors not required for "Harden Claude branch_pr merge guidance".

## Plan

1. Inspect generated Claude gateway and branch_pr policy surfaces. 2. Add explicit guidance for Claude/user-authenticated GitHub merge identity, stable hosted checks, and post-merge/followup routing. 3. Add focused init-generation tests proving CLAUDE.md and workflow.branch_pr.md include the guardrails. 4. Run focused tests and policy routing.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T07:02:35.624Z — VERIFY — ok

By: CODER

Note: Focused verification passed: init Claude gateway generation test, quickstart command-guide test, policy routing, agent template sync check, builtin asset freshness check, and Prettier check all passed. Implementation commit: 1dea641275b520ef75d3a0f6baa5ee9c060ea16d.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T07:00:55.782Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605170657-EDT46B/blueprint/resolved-snapshot.json
- old_digest: c4b5546148b6388fb16fbf805aa7fb9e9caedb5c0504cb5cfc95da40cc4d5bd9
- current_digest: c4b5546148b6388fb16fbf805aa7fb9e9caedb5c0504cb5cfc95da40cc4d5bd9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170657-EDT46B

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
