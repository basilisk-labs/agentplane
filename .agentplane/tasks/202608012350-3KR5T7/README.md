---
id: "202608012350-3KR5T7"
title: "Regenerate llms-full after 0.6.26 assimilation"
status: "DOING"
priority: "high"
owner: "DOCS"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "generated"
  - "v0.7"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "bun run docs:site:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T23:50:36.086Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-01T23:50:58.620Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-01T23:50:58.620Z"
doc_updated_by: "DOCS"
description: "Refresh the generated website/static/llms-full.txt artifact from current canonical documentation so main passes the documentation site freshness gate independently of the 0.7 migration-guide task."
sections:
  Summary: |-
    Regenerate llms-full after 0.6.26 assimilation

    Refresh the generated website/static/llms-full.txt artifact from current canonical documentation so main passes the documentation site freshness gate independently of the 0.7 migration-guide task.
  Scope: |-
    - In scope: Refresh the generated website/static/llms-full.txt artifact from current canonical documentation so main passes the documentation site freshness gate independently of the 0.7 migration-guide task.
    - Out of scope: unrelated refactors not required for "Regenerate llms-full after 0.6.26 assimilation".
  Plan: |-
    1. Regenerate website/static/llms-full.txt from the current canonical documentation on main.
    2. Confirm the diff contains only the intended generated artifact and task-local evidence.
    3. Run docs:site:generate:check and the full docs:site:check gate.
    4. Verify, evaluate, and integrate the freshness repair before resuming dependent 0.7 documentation work.
  Verify Steps: |-
    PLANNER fallback scaffold for "Regenerate llms-full after 0.6.26 assimilation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Regenerate llms-full after 0.6.26 assimilation". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "5319bbdeecb05adc2c436e4039f5046a5bfeb89a"
    version: 1
id_source: "generated"
---
## Summary

Regenerate llms-full after 0.6.26 assimilation

Refresh the generated website/static/llms-full.txt artifact from current canonical documentation so main passes the documentation site freshness gate independently of the 0.7 migration-guide task.

## Scope

- In scope: Refresh the generated website/static/llms-full.txt artifact from current canonical documentation so main passes the documentation site freshness gate independently of the 0.7 migration-guide task.
- Out of scope: unrelated refactors not required for "Regenerate llms-full after 0.6.26 assimilation".

## Plan

1. Regenerate website/static/llms-full.txt from the current canonical documentation on main.
2. Confirm the diff contains only the intended generated artifact and task-local evidence.
3. Run docs:site:generate:check and the full docs:site:check gate.
4. Verify, evaluate, and integrate the freshness repair before resuming dependent 0.7 documentation work.

## Verify Steps

PLANNER fallback scaffold for "Regenerate llms-full after 0.6.26 assimilation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Regenerate llms-full after 0.6.26 assimilation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
