---
id: "202608032116-QFBVB5"
title: "Keep frozen qualification subject clean while writing evidence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "qualification"
  - "release-harness"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run e2e:v0.7.1:check"
  - "node --test scripts/qualification/release-qualification.test.mjs"
  - "node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode audit --profile full --scenario matched-cli-latency,supervisor-latency --subject <frozen-sha> --out-dir .agentplane/tasks/<task-id>/evidence/self-dirty-regression"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T21:17:13.801Z"
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
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T21:17:30.370Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T21:17:30.370Z"
doc_updated_by: "CODER"
description: "Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change."
sections:
  Summary: |-
    Keep frozen qualification subject clean while writing evidence

    Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change.
  Scope: |-
    - In scope: Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change.
    - Out of scope: unrelated refactors not required for "Keep frozen qualification subject clean while writing evidence".
  Plan: "1. Extend frozen-subject identity checks so qualification subprocesses may exclude only AGENTPLANE_QUALIFICATION_EVIDENCE_DIR when it resolves to a nested path inside the same repository; preserve fail-closed behavior for repository root, outside paths, and every unrelated tracked or untracked change. 2. Add regression coverage using a temporary Git repository: generated files under the active evidence directory do not dirty the subject, while an unrelated file still does and the default path remains strict. 3. Run the qualification contract, lint/format checks, and e2e dry-run. 4. Execute a no-provider partial audit containing matched-cli-latency and supervisor-latency with an evidence directory under the task tree; both scenarios must run instead of failing the cleanliness precondition. 5. Record verification and evaluator evidence, pass hosted checks, integrate through branch_pr, then resume the frozen release qualification."
  Verify Steps: |-
    PLANNER fallback scaffold for "Keep frozen qualification subject clean while writing evidence". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Keep frozen qualification subject clean while writing evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "50d6dcfd838dfad3268fb45b652e08f640955343"
    version: 1
id_source: "generated"
---
## Summary

Keep frozen qualification subject clean while writing evidence

Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change.

## Scope

- In scope: Allow qualification subprocesses to exclude only the active in-repository evidence output directory from frozen-subject cleanliness checks, while still failing on every other tracked or untracked change.
- Out of scope: unrelated refactors not required for "Keep frozen qualification subject clean while writing evidence".

## Plan

1. Extend frozen-subject identity checks so qualification subprocesses may exclude only AGENTPLANE_QUALIFICATION_EVIDENCE_DIR when it resolves to a nested path inside the same repository; preserve fail-closed behavior for repository root, outside paths, and every unrelated tracked or untracked change. 2. Add regression coverage using a temporary Git repository: generated files under the active evidence directory do not dirty the subject, while an unrelated file still does and the default path remains strict. 3. Run the qualification contract, lint/format checks, and e2e dry-run. 4. Execute a no-provider partial audit containing matched-cli-latency and supervisor-latency with an evidence directory under the task tree; both scenarios must run instead of failing the cleanliness precondition. 5. Record verification and evaluator evidence, pass hosted checks, integrate through branch_pr, then resume the frozen release qualification.

## Verify Steps

PLANNER fallback scaffold for "Keep frozen qualification subject clean while writing evidence". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Keep frozen qualification subject clean while writing evidence". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
