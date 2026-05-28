---
id: "202605282300-FR13K9"
title: "Insights command report decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "hotspot"
  - "insights"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T23:00:17.395Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T23:05:30.755Z"
  updated_by: "CODER"
  note: "Insights command report decomposition completed. Verified with insights report/issue/error-map tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 37 -> 36)."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-28T23:05:47.031Z"
  updated_by: "EVALUATOR"
  note: "Insights command report decomposition completed without CLI behavior changes."
  evaluated_sha: "c9ced85e4278496eec678c85a27ebe1ca46bb6cb"
  blueprint_digest: "af121690e9439f6a92a7236053cb7a18b436242c1b815955894342f8d75a68c3"
  evidence_refs:
    - ".agentplane/tasks/202605282300-FR13K9/README.md"
    - ".agentplane/tasks/202605282300-FR13K9/quality/20260528-230547031-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605282300-FR13K9/quality/20260528-230547031-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605282300-FR13K9/quality/20260528-230547031-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605282300-FR13K9/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/insights/insights.command.ts"
    - "packages/agentplane/src/commands/insights/insights-report.ts"
    - "packages/agentplane/src/commands/insights/insights-issue-render.ts"
    - "bunx vitest run packages/agentplane/src/cli/run-cli.core.insights-report.test.ts packages/agentplane/src/commands/insights/insights-issue-publish.test.ts packages/agentplane/src/cli/error-map.test.ts --config vitest.workspace.ts"
    - "bun run typecheck"
    - "bun run arch:deps"
    - "bun run lint:core"
    - "bun run format:changed"
    - "node scripts/checks/hotspot-report.mjs --check --warning-lines 400 --oversized-lines 600 --test-warning-lines 1000 --oversized-test-lines 1300"
  findings:
    - "insights.command.ts is now the CLI wiring layer at 178 lines; report model/build/render moved to insights-report.ts and issue title/body rendering moved to insights-issue-render.ts. Hotspot warning count decreased from 37 to 36."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract insights report and issue rendering helpers while preserving CLI behavior and reducing hotspot size."
events:
  -
    type: "status"
    at: "2026-05-28T23:00:26.739Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract insights report and issue rendering helpers while preserving CLI behavior and reducing hotspot size."
  -
    type: "verify"
    at: "2026-05-28T23:05:30.755Z"
    author: "CODER"
    state: "ok"
    note: "Insights command report decomposition completed. Verified with insights report/issue/error-map tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 37 -> 36)."
doc_version: 3
doc_updated_at: "2026-05-28T23:05:30.780Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/insights/insights.command.ts by extracting insights report model/build/render helpers and issue body rendering helpers into focused modules while preserving CLI behavior and reducing hotspot warning count."
sections:
  Summary: |-
    Insights command report decomposition

    Decompose packages/agentplane/src/commands/insights/insights.command.ts by extracting insights report model/build/render helpers and issue body rendering helpers into focused modules while preserving CLI behavior and reducing hotspot warning count.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/insights/insights.command.ts by extracting insights report model/build/render helpers and issue body rendering helpers into focused modules while preserving CLI behavior and reducing hotspot warning count.
    - Out of scope: unrelated refactors not required for "Insights command report decomposition".
  Plan: |-
    1. Start a branch_pr worktree from canonical main.
    2. Extract insights report data model/build/render helpers and issue title/body rendering helpers from packages/agentplane/src/commands/insights/insights.command.ts into focused modules.
    3. Keep insights CLI handlers and publish flow behavior unchanged.
    4. Verify with insights report tests, issue publish tests, error-map tests, typecheck, arch deps, lint, format, and hotspot threshold check; expected runtime warnings 37 -> 36.
    5. Record verification/evaluator evidence, open PR, wait for hosted checks/review threads, merge, close, and cleanup.
  Verify Steps: |-
    PLANNER fallback scaffold for "Insights command report decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Insights command report decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T23:05:30.755Z — VERIFY — ok

    By: CODER

    Note: Insights command report decomposition completed. Verified with insights report/issue/error-map tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 37 -> 36).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T23:00:26.739Z, excerpt_hash=sha256:8601f15c20c4c03333fd2f72d53fc57e28576f201ef878bedd26ce02bef6d1be

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282300-FR13K9-insights-report-decomposition/.agentplane/tasks/202605282300-FR13K9/blueprint/resolved-snapshot.json
    - old_digest: af121690e9439f6a92a7236053cb7a18b436242c1b815955894342f8d75a68c3
    - current_digest: af121690e9439f6a92a7236053cb7a18b436242c1b815955894342f8d75a68c3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282300-FR13K9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Insights command report decomposition

Decompose packages/agentplane/src/commands/insights/insights.command.ts by extracting insights report model/build/render helpers and issue body rendering helpers into focused modules while preserving CLI behavior and reducing hotspot warning count.

## Scope

- In scope: Decompose packages/agentplane/src/commands/insights/insights.command.ts by extracting insights report model/build/render helpers and issue body rendering helpers into focused modules while preserving CLI behavior and reducing hotspot warning count.
- Out of scope: unrelated refactors not required for "Insights command report decomposition".

## Plan

1. Start a branch_pr worktree from canonical main.
2. Extract insights report data model/build/render helpers and issue title/body rendering helpers from packages/agentplane/src/commands/insights/insights.command.ts into focused modules.
3. Keep insights CLI handlers and publish flow behavior unchanged.
4. Verify with insights report tests, issue publish tests, error-map tests, typecheck, arch deps, lint, format, and hotspot threshold check; expected runtime warnings 37 -> 36.
5. Record verification/evaluator evidence, open PR, wait for hosted checks/review threads, merge, close, and cleanup.

## Verify Steps

PLANNER fallback scaffold for "Insights command report decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Insights command report decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T23:05:30.755Z — VERIFY — ok

By: CODER

Note: Insights command report decomposition completed. Verified with insights report/issue/error-map tests, typecheck, arch deps, lint, format, and hotspot threshold check (runtime warnings 37 -> 36).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T23:00:26.739Z, excerpt_hash=sha256:8601f15c20c4c03333fd2f72d53fc57e28576f201ef878bedd26ce02bef6d1be

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282300-FR13K9-insights-report-decomposition/.agentplane/tasks/202605282300-FR13K9/blueprint/resolved-snapshot.json
- old_digest: af121690e9439f6a92a7236053cb7a18b436242c1b815955894342f8d75a68c3
- current_digest: af121690e9439f6a92a7236053cb7a18b436242c1b815955894342f8d75a68c3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282300-FR13K9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
