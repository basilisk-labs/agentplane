---
id: "202607030734-6T937A"
title: "Context help: expose nested v2 commands"
status: "DOING"
priority: "med"
owner: "CURATOR"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-03T07:34:17.288Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-03T07:38:56.455Z"
  updated_by: "CURATOR"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: explicit help for context migrate and context extraction apply works without --all. Command: repo-local CLI help smoke; Result: pass; Evidence: compact help rendered for both advanced context commands. Scope: nested context command help discoverability."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-03T07:40:54.419Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed for included context help task."
  evaluated_sha: "d53b6cf0f515b2df99c329df082d2efadedf9224"
  blueprint_digest: "b65e4399cbf3ca9ce1d4997993a0684edaf01d841d77bd7e4d6269fe798ea67a"
  evidence_refs:
    - ".agentplane/tasks/202607030734-6T937A/README.md"
    - ".agentplane/tasks/202607030734-6T937A/quality/20260703-074054419-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607030734-6T937A/quality/20260703-074054419-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607030734-6T937A/quality/20260703-074054419-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607030734-6T937A/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings. Help contract and CLI smoke cover explicit help for context migrate and context extraction apply without --all."
commit: null
comments:
  -
    author: "CURATOR"
    body: "Start: Implementing nested context command help discoverability as an included task in primary worktree 202607030734-7S66KX."
events:
  -
    type: "status"
    at: "2026-07-03T07:34:58.046Z"
    author: "CURATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing nested context command help discoverability as an included task in primary worktree 202607030734-7S66KX."
  -
    type: "verify"
    at: "2026-07-03T07:38:56.455Z"
    author: "CURATOR"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: explicit help for context migrate and context extraction apply works without --all. Command: repo-local CLI help smoke; Result: pass; Evidence: compact help rendered for both advanced context commands. Scope: nested context command help discoverability."
doc_version: 3
doc_updated_at: "2026-07-03T07:38:56.559Z"
doc_updated_by: "CURATOR"
description: "Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably."
sections:
  Summary: |-
    Context help: expose nested v2 commands

    Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably.
  Scope: |-
    - In scope: Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably.
    - Out of scope: unrelated refactors not required for "Context help: expose nested v2 commands".
  Plan: "1. Reproduce help discoverability gap for context migrate and context extraction apply. 2. Register nested context v2 command specs in the command catalog/help surface without changing execution semantics. 3. Add catalog/help regression coverage. 4. Verify direct command help works from the repo-local CLI."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-03T07:38:56.455Z — VERIFY — ok

    By: CURATOR

    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: explicit help for context migrate and context extraction apply works without --all. Command: repo-local CLI help smoke; Result: pass; Evidence: compact help rendered for both advanced context commands. Scope: nested context command help discoverability.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T07:34:58.046Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607030734-7S66KX-context-graph-align-sgr-vocabulary-and-diagnosti/.agentplane/tasks/202607030734-6T937A/blueprint/resolved-snapshot.json
    - old_digest: b65e4399cbf3ca9ce1d4997993a0684edaf01d841d77bd7e4d6269fe798ea67a
    - current_digest: b65e4399cbf3ca9ce1d4997993a0684edaf01d841d77bd7e4d6269fe798ea67a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607030734-6T937A

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202607030734-6T937A --agent CURATOR --slug context-help-expose-nested-v2-commands --worktree
    - diagnostic_command: agentplane work resume 202607030734-6T937A
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Context help: expose nested v2 commands

Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably.

## Scope

- In scope: Fix smoke finding where context migrate and context extraction apply execute but are not discoverable through agentplane help, so users cannot inspect fresh context v2 command syntax reliably.
- Out of scope: unrelated refactors not required for "Context help: expose nested v2 commands".

## Plan

1. Reproduce help discoverability gap for context migrate and context extraction apply. 2. Register nested context v2 command specs in the command catalog/help surface without changing execution semantics. 3. Add catalog/help regression coverage. 4. Verify direct command help works from the repo-local CLI.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-03T07:38:56.455Z — VERIFY — ok

By: CURATOR

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: explicit help for context migrate and context extraction apply works without --all. Command: repo-local CLI help smoke; Result: pass; Evidence: compact help rendered for both advanced context commands. Scope: nested context command help discoverability.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T07:34:58.046Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607030734-7S66KX-context-graph-align-sgr-vocabulary-and-diagnosti/.agentplane/tasks/202607030734-6T937A/blueprint/resolved-snapshot.json
- old_digest: b65e4399cbf3ca9ce1d4997993a0684edaf01d841d77bd7e4d6269fe798ea67a
- current_digest: b65e4399cbf3ca9ce1d4997993a0684edaf01d841d77bd7e4d6269fe798ea67a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607030734-6T937A

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202607030734-6T937A --agent CURATOR --slug context-help-expose-nested-v2-commands --worktree
- diagnostic_command: agentplane work resume 202607030734-6T937A
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
