---
id: "202607030734-7S66KX"
title: "Context graph: align SGR vocabulary and diagnostics"
result_summary: "pre-merge closure"
status: "DONE"
priority: "med"
owner: "CURATOR"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "maximum-assimilation"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-03T07:40:13.332Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-03T07:43:33.040Z"
  updated_by: "CURATOR"
  note: "Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for advanced context help, system/tests graph validation, and invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: context graph validation and advanced context help."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-03T07:43:34.905Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "8b9060b1adc130919b98c8fbbd82280e7dd6d351"
  blueprint_digest: "8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da"
  evidence_refs:
    - ".agentplane/tasks/202607030734-7S66KX/README.md"
    - ".agentplane/tasks/202607030734-7S66KX/quality/20260703-074334905-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607030734-7S66KX/quality/20260703-074334905-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607030734-7S66KX/quality/20260703-074334905-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607030734-7S66KX/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit:
  hash: "5605b8a8359d4185a66dad18b5828b41e5d94d1d"
  message: "🚧 7S66KX task: record opened PR metadata"
comments:
  -
    author: "CURATOR"
    body: "Start: Implementing the primary context graph vocabulary and diagnostics task, including the related nested context help task 202607030734-6T937A in the same branch-pr change-set."
  -
    author: "CURATOR"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-03T07:34:55.904Z"
    author: "CURATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the primary context graph vocabulary and diagnostics task, including the related nested context help task 202607030734-6T937A in the same branch-pr change-set."
  -
    type: "verify"
    at: "2026-07-03T07:38:53.754Z"
    author: "CURATOR"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for help context migrate, help context extraction apply, graph validate system/tests, and graph validate invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: context graph vocabulary, validation diagnostics, and explicit advanced help."
  -
    type: "verify"
    at: "2026-07-03T07:40:15.221Z"
    author: "CURATOR"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed after updated plan approval. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for advanced help, system/tests graph validate, and invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: primary context graph task plus included help task 202607030734-6T937A."
  -
    type: "verify"
    at: "2026-07-03T07:43:33.040Z"
    author: "CURATOR"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for advanced context help, system/tests graph validation, and invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: context graph validation and advanced context help."
  -
    type: "status"
    at: "2026-07-03T07:56:12.459Z"
    author: "CURATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-03T07:56:12.460Z"
doc_updated_by: "CURATOR"
description: "Fix maximum-assimilation smoke findings where context extraction apply can materialize graph rows using natural SGR terms like system/tests that context graph validate rejects, and make graph validation errors actionable."
sections:
  Summary: |-
    Context graph: align SGR vocabulary and diagnostics

    Fix maximum-assimilation smoke findings where context extraction apply can materialize graph rows using natural SGR terms like system/tests that context graph validate rejects, and make graph validation errors actionable.
  Scope: |-
    - In scope: Fix maximum-assimilation smoke findings where context extraction apply can materialize graph rows using natural SGR terms like system/tests that context graph validate rejects, and make graph validation errors actionable.
    - Out of scope: unrelated refactors not required for "Context graph: align SGR vocabulary and diagnostics".
  Plan: "Primary change-set task. Included related task: 202607030734-6T937A. 1. Reproduce smoke mismatch in focused tests with graph_entity kind=system and graph_edge relation=tests. 2. Align context graph validation vocabulary with SGR extraction outputs. 3. Include concrete validation issue lines in graph validate errors. 4. Reproduce and fix help discoverability for context migrate and context extraction apply. 5. Verify with focused context/catalog tests and repo-local CLI smoke commands."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-03T07:38:53.754Z — VERIFY — ok

    By: CURATOR

    Note: Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for help context migrate, help context extraction apply, graph validate system/tests, and graph validate invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: context graph vocabulary, validation diagnostics, and explicit advanced help.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T07:34:55.904Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607030734-7S66KX-context-graph-align-sgr-vocabulary-and-diagnosti/.agentplane/tasks/202607030734-7S66KX/blueprint/resolved-snapshot.json
    - old_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
    - current_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607030734-7S66KX

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-03T07:40:15.221Z — VERIFY — ok

    By: CURATOR

    Note: Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed after updated plan approval. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for advanced help, system/tests graph validate, and invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: primary context graph task plus included help task 202607030734-6T937A.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T07:38:53.933Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607030734-7S66KX-context-graph-align-sgr-vocabulary-and-diagnosti/.agentplane/tasks/202607030734-7S66KX/blueprint/resolved-snapshot.json
    - old_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
    - current_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607030734-7S66KX

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane evaluator run 202607030734-7S66KX --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607030734-7S66KX/README.md
    - diagnostic_command: agentplane evaluator run 202607030734-7S66KX --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607030734-7S66KX/README.md
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-03T07:43:33.040Z — VERIFY — ok

    By: CURATOR

    Note: Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for advanced context help, system/tests graph validation, and invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: context graph validation and advanced context help.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T07:40:15.419Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607030734-7S66KX-context-graph-align-sgr-vocabulary-and-diagnosti/.agentplane/tasks/202607030734-7S66KX/blueprint/resolved-snapshot.json
    - old_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
    - current_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607030734-7S66KX

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane evaluator run 202607030734-7S66KX --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607030734-7S66KX/README.md
    - diagnostic_command: agentplane evaluator run 202607030734-7S66KX --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607030734-7S66KX/README.md
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  implementation_commit:
    hash: "8b9060b1adc130919b98c8fbbd82280e7dd6d351"
    message: "✅ 7S66KX context: fix graph validation smoke gaps"
id_source: "generated"
---
## Summary

Context graph: align SGR vocabulary and diagnostics

Fix maximum-assimilation smoke findings where context extraction apply can materialize graph rows using natural SGR terms like system/tests that context graph validate rejects, and make graph validation errors actionable.

## Scope

- In scope: Fix maximum-assimilation smoke findings where context extraction apply can materialize graph rows using natural SGR terms like system/tests that context graph validate rejects, and make graph validation errors actionable.
- Out of scope: unrelated refactors not required for "Context graph: align SGR vocabulary and diagnostics".

## Plan

Primary change-set task. Included related task: 202607030734-6T937A. 1. Reproduce smoke mismatch in focused tests with graph_entity kind=system and graph_edge relation=tests. 2. Align context graph validation vocabulary with SGR extraction outputs. 3. Include concrete validation issue lines in graph validate errors. 4. Reproduce and fix help discoverability for context migrate and context extraction apply. 5. Verify with focused context/catalog tests and repo-local CLI smoke commands.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-03T07:38:53.754Z — VERIFY — ok

By: CURATOR

Note: Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for help context migrate, help context extraction apply, graph validate system/tests, and graph validate invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: context graph vocabulary, validation diagnostics, and explicit advanced help.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T07:34:55.904Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607030734-7S66KX-context-graph-align-sgr-vocabulary-and-diagnosti/.agentplane/tasks/202607030734-7S66KX/blueprint/resolved-snapshot.json
- old_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
- current_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607030734-7S66KX

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-03T07:40:15.221Z — VERIFY — ok

By: CURATOR

Note: Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed after updated plan approval. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for advanced help, system/tests graph validate, and invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: primary context graph task plus included help task 202607030734-6T937A.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T07:38:53.933Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607030734-7S66KX-context-graph-align-sgr-vocabulary-and-diagnosti/.agentplane/tasks/202607030734-7S66KX/blueprint/resolved-snapshot.json
- old_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
- current_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607030734-7S66KX

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane evaluator run 202607030734-7S66KX --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607030734-7S66KX/README.md
- diagnostic_command: agentplane evaluator run 202607030734-7S66KX --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607030734-7S66KX/README.md
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-03T07:43:33.040Z — VERIFY — ok

By: CURATOR

Note: Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts; Result: pass; Evidence: 2 files, 18 tests passed. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: CLI smoke for advanced context help, system/tests graph validation, and invalid graph diagnostics; Result: pass; Evidence: cli smoke passed. Scope: context graph validation and advanced context help.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T07:40:15.419Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607030734-7S66KX-context-graph-align-sgr-vocabulary-and-diagnosti/.agentplane/tasks/202607030734-7S66KX/blueprint/resolved-snapshot.json
- old_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
- current_digest: 8509fe8be8b55569e0d10888f09d1037de7da104bc5c538cebe80e1b17e6f0da
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607030734-7S66KX

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane evaluator run 202607030734-7S66KX --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607030734-7S66KX/README.md
- diagnostic_command: agentplane evaluator run 202607030734-7S66KX --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607030734-7S66KX/README.md
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
