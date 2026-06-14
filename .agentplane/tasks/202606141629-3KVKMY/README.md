---
id: "202606141629-3KVKMY"
title: "Add DeepWiki auto-sync badge"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify:
  - "README.md includes the Ask DeepWiki badge linking to https://deepwiki.com/basilisk-labs/agentplane"
  - "agentplane doctor"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-14T16:29:44.974Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-14T16:31:35.014Z"
  updated_by: "CODER"
  note: "Command: rg -n 'Ask DeepWiki|deepwiki.com/basilisk-labs/agentplane|deepwiki.com/badge.svg' README.md; Result: pass; Evidence: README.md line 23 contains the exact Ask DeepWiki badge and project link. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with warnings limited to global-in-framework runtime and pre-existing DONE task commit metadata. Command: curl -L --head --max-time 20 https://deepwiki.com/basilisk-labs/agentplane and https://deepwiki.com/badge.svg; Result: pass; Evidence: both returned HTTP 200. Scope: README.md and task evidence."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-14T16:36:37.279Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "5e78cad57f90a1470eb405593291569b793920fc"
  blueprint_digest: "b89a9b6d2f02bd96cbe725a08da93788da462f2515c066578e22e506ad1dda69"
  evidence_refs:
    - ".agentplane/tasks/202606141629-3KVKMY/README.md"
    - ".agentplane/tasks/202606141629-3KVKMY/quality/20260614-163637279-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606141629-3KVKMY/quality/20260614-163637279-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606141629-3KVKMY/quality/20260614-163637279-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606141629-3KVKMY/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Adding the DeepWiki README badge requested in GitHub issue #4513, limited to README.md and task evidence for docs-only verification."
events:
  -
    type: "status"
    at: "2026-06-14T16:30:28.064Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding the DeepWiki README badge requested in GitHub issue #4513, limited to README.md and task evidence for docs-only verification."
  -
    type: "verify"
    at: "2026-06-14T16:31:35.014Z"
    author: "CODER"
    state: "ok"
    note: "Command: rg -n 'Ask DeepWiki|deepwiki.com/basilisk-labs/agentplane|deepwiki.com/badge.svg' README.md; Result: pass; Evidence: README.md line 23 contains the exact Ask DeepWiki badge and project link. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with warnings limited to global-in-framework runtime and pre-existing DONE task commit metadata. Command: curl -L --head --max-time 20 https://deepwiki.com/basilisk-labs/agentplane and https://deepwiki.com/badge.svg; Result: pass; Evidence: both returned HTTP 200. Scope: README.md and task evidence."
doc_version: 3
doc_updated_at: "2026-06-14T16:31:35.535Z"
doc_updated_by: "CODER"
description: "Add DeepWiki auto-sync badge"
sections:
  Summary: "Add a DeepWiki badge to the root README so the repository links to the current DeepWiki page and can use DeepWiki's badge-driven refresh behavior."
  Scope: |-
    - In scope: Add the Ask DeepWiki badge to the root README badge block.
    - Out of scope: unrelated refactors not required for "Add DeepWiki auto-sync badge".
  Plan: |-
    1. Inspect the current README badge block and place the DeepWiki badge with existing public project badges.
    2. Add the exact DeepWiki badge and project link requested by GitHub issue #4513.
    3. Run docs/policy verification and record the result.
  Verify Steps: |-
    1. Confirm README.md contains `[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/basilisk-labs/agentplane)`.
    2. Run `node .agentplane/policy/check-routing.mjs`.
    3. Run `agentplane doctor`.
    4. Confirm the final diff is limited to README.md and task evidence.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-14T16:31:35.014Z — VERIFY — ok

    By: CODER

    Note: Command: rg -n 'Ask DeepWiki|deepwiki.com/basilisk-labs/agentplane|deepwiki.com/badge.svg' README.md; Result: pass; Evidence: README.md line 23 contains the exact Ask DeepWiki badge and project link. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with warnings limited to global-in-framework runtime and pre-existing DONE task commit metadata. Command: curl -L --head --max-time 20 https://deepwiki.com/basilisk-labs/agentplane and https://deepwiki.com/badge.svg; Result: pass; Evidence: both returned HTTP 200. Scope: README.md and task evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-14T16:30:28.064Z, excerpt_hash=sha256:2332644073befd6cc03bc41d269c4f60f221169da31380895082d611630fa072

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606141629-3KVKMY-add-deepwiki-auto-sync-badge/.agentplane/tasks/202606141629-3KVKMY/blueprint/resolved-snapshot.json
    - old_digest: b89a9b6d2f02bd96cbe725a08da93788da462f2515c066578e22e506ad1dda69
    - current_digest: b89a9b6d2f02bd96cbe725a08da93788da462f2515c066578e22e506ad1dda69
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606141629-3KVKMY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606141629-3KVKMY
    - diagnostic_command: agentplane pr check 202606141629-3KVKMY
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add a DeepWiki badge to the root README so the repository links to the current DeepWiki page and can use DeepWiki's badge-driven refresh behavior.

## Scope

- In scope: Add the Ask DeepWiki badge to the root README badge block.
- Out of scope: unrelated refactors not required for "Add DeepWiki auto-sync badge".

## Plan

1. Inspect the current README badge block and place the DeepWiki badge with existing public project badges.
2. Add the exact DeepWiki badge and project link requested by GitHub issue #4513.
3. Run docs/policy verification and record the result.

## Verify Steps

1. Confirm README.md contains `[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/basilisk-labs/agentplane)`.
2. Run `node .agentplane/policy/check-routing.mjs`.
3. Run `agentplane doctor`.
4. Confirm the final diff is limited to README.md and task evidence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-14T16:31:35.014Z — VERIFY — ok

By: CODER

Note: Command: rg -n 'Ask DeepWiki|deepwiki.com/basilisk-labs/agentplane|deepwiki.com/badge.svg' README.md; Result: pass; Evidence: README.md line 23 contains the exact Ask DeepWiki badge and project link. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: agentplane doctor; Result: pass; Evidence: doctor OK with warnings limited to global-in-framework runtime and pre-existing DONE task commit metadata. Command: curl -L --head --max-time 20 https://deepwiki.com/basilisk-labs/agentplane and https://deepwiki.com/badge.svg; Result: pass; Evidence: both returned HTTP 200. Scope: README.md and task evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-14T16:30:28.064Z, excerpt_hash=sha256:2332644073befd6cc03bc41d269c4f60f221169da31380895082d611630fa072

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606141629-3KVKMY-add-deepwiki-auto-sync-badge/.agentplane/tasks/202606141629-3KVKMY/blueprint/resolved-snapshot.json
- old_digest: b89a9b6d2f02bd96cbe725a08da93788da462f2515c066578e22e506ad1dda69
- current_digest: b89a9b6d2f02bd96cbe725a08da93788da462f2515c066578e22e506ad1dda69
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606141629-3KVKMY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606141629-3KVKMY
- diagnostic_command: agentplane pr check 202606141629-3KVKMY
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
