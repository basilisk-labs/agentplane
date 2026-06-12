---
id: "202606120937-VC2ZMZ"
title: "Bound pre-push fast CI in git hooks"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T09:37:56.840Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T09:45:11.279Z"
  updated_by: "CODER"
  note: "Verified pre-push broad-CI guard: hooks/local-CI regression suite passed; direct broad push input now fails fast with an actionable full-fast diagnostic before running broad local CI; targeted eslint, format check, agentplane build, and policy routing passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-12T09:45:47.781Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed: standard pre-push now stops scoped full-fast pushes before broad local CI, preserving explicit full-fast validation."
  evaluated_sha: "e919d1502243c460e8b9a7df3eac8cc7511e2b1a"
  blueprint_digest: "e4e621ae12f0e7362b3444c9a836aee1bac89fdbf2adf2417877d7530efd9f94"
  evidence_refs:
    - ".agentplane/tasks/202606120937-VC2ZMZ/README.md"
    - ".agentplane/tasks/202606120937-VC2ZMZ/quality/20260612-094547781-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606120937-VC2ZMZ/quality/20260612-094547781-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606120937-VC2ZMZ/quality/20260612-094547781-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606120937-VC2ZMZ/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings. Residual risk: release/full hook pushes still run broad lanes by design."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: bound managed pre-push hook execution so broad local CI classifications no longer hang git push before diagnostics."
events:
  -
    type: "status"
    at: "2026-06-12T09:40:00.882Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: bound managed pre-push hook execution so broad local CI classifications no longer hang git push before diagnostics."
  -
    type: "verify"
    at: "2026-06-12T09:45:11.279Z"
    author: "CODER"
    state: "ok"
    note: "Verified pre-push broad-CI guard: hooks/local-CI regression suite passed; direct broad push input now fails fast with an actionable full-fast diagnostic before running broad local CI; targeted eslint, format check, agentplane build, and policy routing passed."
doc_version: 3
doc_updated_at: "2026-06-12T09:45:11.455Z"
doc_updated_by: "CODER"
description: "Prevent git pre-push hooks from running the full-fast local CI lane when the fast selector classifies a push as broad. The hook should fail quickly with an actionable diagnostic or route to a bounded hook-safe lane, instead of hanging until signal 9/timeout. Preserve full-fast for explicit local CI invocations."
sections:
  Summary: |-
    Bound pre-push fast CI in git hooks

    Prevent git pre-push hooks from running the full-fast local CI lane when the fast selector classifies a push as broad. The hook should fail quickly with an actionable diagnostic or route to a bounded hook-safe lane, instead of hanging until signal 9/timeout. Preserve full-fast for explicit local CI invocations.
  Scope: |-
    - In scope: Prevent git pre-push hooks from running the full-fast local CI lane when the fast selector classifies a push as broad. The hook should fail quickly with an actionable diagnostic or route to a bounded hook-safe lane, instead of hanging until signal 9/timeout. Preserve full-fast for explicit local CI invocations.
    - Out of scope: unrelated refactors not required for "Bound pre-push fast CI in git hooks".
  Plan: "1. Inspect current pre-push and local CI selector contract for broad/full-fast pushes. 2. Implement a hook-safe guard so managed pre-push does not execute full-fast inside git push; preserve explicit full-fast local CI for manual/CI use. 3. Add regression coverage proving broad pre-push input exits quickly with actionable diagnostics and does not run the full-fast lane. 4. Run focused hooks/local-ci tests plus format, lint/build/policy checks; publish via branch_pr."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts`. Expected: hooks and local-CI routing regressions pass.
    2. Run `printf '%s %s %s %s\n' 'refs/heads/task/202606120737-7B9JN2/hide-runner-default-prompts' '39b8d2ee82847cdaadbcff1f7327e1549299aa19' 'refs/heads/task/202606120737-7B9JN2/hide-runner-default-prompts' '8dca436e6afd91bdf9966221a8e158b75629d85e' | node scripts/run-pre-push-hook.mjs`. Expected: exits non-zero quickly with `changed files require the full-fast local CI lane` and does not run the broad local CI lane.
    3. Run `bunx eslint scripts/checks/run-pre-push-hook.mjs packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts`, `bun run format:check`, `bun run --filter=agentplane build`, and `node .agentplane/policy/check-routing.mjs`. Expected: all pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T09:45:11.279Z — VERIFY — ok

    By: CODER

    Note: Verified pre-push broad-CI guard: hooks/local-CI regression suite passed; direct broad push input now fails fast with an actionable full-fast diagnostic before running broad local CI; targeted eslint, format check, agentplane build, and policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T09:40:00.882Z, excerpt_hash=sha256:7163c951255340a09d357b9af9b5359c9510a8ae1072a920a53632a23080c43b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120937-VC2ZMZ-bound-pre-push-fast-ci-in-git-hooks/.agentplane/tasks/202606120937-VC2ZMZ/blueprint/resolved-snapshot.json
    - old_digest: e4e621ae12f0e7362b3444c9a836aee1bac89fdbf2adf2417877d7530efd9f94
    - current_digest: e4e621ae12f0e7362b3444c9a836aee1bac89fdbf2adf2417877d7530efd9f94
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606120937-VC2ZMZ

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606120937-VC2ZMZ
    - diagnostic_command: agentplane pr check 202606120937-VC2ZMZ
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Managed pre-push previously entered full-fast local CI for broad task-branch pushes and could hang until hook watchdog or SSH interruption surfaced as signal 9.
      Impact: Broad pre-push scopes now stop quickly with a clear manual validation command instead of tying up git push.
      Resolution: Added a standard pre-push guard that uses the fast CI selector and blocks scoped full-fast pushes before running format/local CI; added regression coverage that asserts format and ci scripts are not invoked.
id_source: "generated"
---
## Summary

Bound pre-push fast CI in git hooks

Prevent git pre-push hooks from running the full-fast local CI lane when the fast selector classifies a push as broad. The hook should fail quickly with an actionable diagnostic or route to a bounded hook-safe lane, instead of hanging until signal 9/timeout. Preserve full-fast for explicit local CI invocations.

## Scope

- In scope: Prevent git pre-push hooks from running the full-fast local CI lane when the fast selector classifies a push as broad. The hook should fail quickly with an actionable diagnostic or route to a bounded hook-safe lane, instead of hanging until signal 9/timeout. Preserve full-fast for explicit local CI invocations.
- Out of scope: unrelated refactors not required for "Bound pre-push fast CI in git hooks".

## Plan

1. Inspect current pre-push and local CI selector contract for broad/full-fast pushes. 2. Implement a hook-safe guard so managed pre-push does not execute full-fast inside git push; preserve explicit full-fast local CI for manual/CI use. 3. Add regression coverage proving broad pre-push input exits quickly with actionable diagnostics and does not run the full-fast lane. 4. Run focused hooks/local-ci tests plus format, lint/build/policy checks; publish via branch_pr.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts packages/agentplane/src/cli/local-ci-selection.test.ts`. Expected: hooks and local-CI routing regressions pass.
2. Run `printf '%s %s %s %s\n' 'refs/heads/task/202606120737-7B9JN2/hide-runner-default-prompts' '39b8d2ee82847cdaadbcff1f7327e1549299aa19' 'refs/heads/task/202606120737-7B9JN2/hide-runner-default-prompts' '8dca436e6afd91bdf9966221a8e158b75629d85e' | node scripts/run-pre-push-hook.mjs`. Expected: exits non-zero quickly with `changed files require the full-fast local CI lane` and does not run the broad local CI lane.
3. Run `bunx eslint scripts/checks/run-pre-push-hook.mjs packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts`, `bun run format:check`, `bun run --filter=agentplane build`, and `node .agentplane/policy/check-routing.mjs`. Expected: all pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T09:45:11.279Z — VERIFY — ok

By: CODER

Note: Verified pre-push broad-CI guard: hooks/local-CI regression suite passed; direct broad push input now fails fast with an actionable full-fast diagnostic before running broad local CI; targeted eslint, format check, agentplane build, and policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T09:40:00.882Z, excerpt_hash=sha256:7163c951255340a09d357b9af9b5359c9510a8ae1072a920a53632a23080c43b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120937-VC2ZMZ-bound-pre-push-fast-ci-in-git-hooks/.agentplane/tasks/202606120937-VC2ZMZ/blueprint/resolved-snapshot.json
- old_digest: e4e621ae12f0e7362b3444c9a836aee1bac89fdbf2adf2417877d7530efd9f94
- current_digest: e4e621ae12f0e7362b3444c9a836aee1bac89fdbf2adf2417877d7530efd9f94
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606120937-VC2ZMZ

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606120937-VC2ZMZ
- diagnostic_command: agentplane pr check 202606120937-VC2ZMZ
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

- Observation: Managed pre-push previously entered full-fast local CI for broad task-branch pushes and could hang until hook watchdog or SSH interruption surfaced as signal 9.
  Impact: Broad pre-push scopes now stop quickly with a clear manual validation command instead of tying up git push.
  Resolution: Added a standard pre-push guard that uses the fast CI selector and blocks scoped full-fast pushes before running format/local CI; added regression coverage that asserts format and ci scripts are not invoked.
