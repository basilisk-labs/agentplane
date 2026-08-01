---
id: "202607221854-4FNZPG"
title: "Validate the 0.6.24-to-0.7 migration and installed-package matrix"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202607221908-PWFH5K"
  - "202607311707-DRYTNK"
tags:
  - "migration"
  - "milestone-rc2"
  - "quality"
  - "release"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run package:install-smoke"
  - "bun run release:e2e:local"
  - "bun run release:prepublish:heavy"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T19:30:50.539Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "cd1c7119b85dd9e524e52293da33684a847ddabd"
  message: "🔄 4FNZPG task: merge current main for release verification"
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation recorded: installed-tarball migration matrix covers fresh installs, active upgrades from v0.6.24 and v0.6.26 in direct and branch_pr, task README v2/v3, and exact WORKFLOW v1 rollback; current main is merged for final release verification."
events:
  -
    type: "status"
    at: "2026-08-01T19:31:50.730Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T20:24:53.056Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: installed-tarball migration matrix covers fresh installs, active upgrades from v0.6.24 and v0.6.26 in direct and branch_pr, task README v2/v3, and exact WORKFLOW v1 rollback; current main is merged for final release verification."
doc_version: 3
doc_updated_at: "2026-08-01T20:24:53.056Z"
doc_updated_by: "CODER"
description: "Run the final compatibility matrix for new repositories, 0.6.24 direct/branch_pr repositories, WORKFLOW v1/v2, task docs v2/v3, active tasks, runner results, package exports, Node support, and installed tarballs."
sections:
  Summary: |-
    Validate the 0.6.24-to-0.7 migration and installed-package matrix

    Run the final compatibility matrix for new repositories, 0.6.24 direct/branch_pr repositories, WORKFLOW v1/v2, task docs v2/v3, active tasks, runner results, package exports, Node support, and installed tarballs.
  Scope: |-
    - In scope: automated migration fixtures/matrix, dry-run/rollback/idempotency, active-task preservation, direct/branch_pr route parity, Workflow/task/result schema versions, installed task brief/next-action/workflow doctor/runner smoke, package exports, Node engines, and exact failure diagnostics.
    - Out of scope: changing product architecture after rc; defects become bounded release blockers/follow-up tasks.
  Plan: |-
    1. Build clean and 0.6.24 fixture repositories covering both workflows, schema versions, task doc versions, and active lifecycle phases.
    2. Run upgrade/migration dry-run, apply, repeat, rollback, and resume.
    3. Exercise installed tarball commands and runner/evaluator result paths.
    4. Run supported Node/package/export matrices.
    5. Record exact blockers and require fixes before release readiness.
  Verify Steps: |-
    1. Migrate every matrix fixture. Expected: no task, authority, context, Git, or workflow truth is lost; second apply is a no-op and rollback is exact where supported.
    2. Resume active direct and branch_pr tasks. Expected: route/work order/fingerprint remain coherent and no duplicate worktree/PR/task is created.
    3. Install local tarballs into clean fixtures. Expected: task brief/next-action JSON, workflow migration/doctor, runner result, and evaluator paths work outside the monorepo.
    4. Run package export and supported Node matrices. Expected: declarations match executable support.
    5. Run local release E2E, install smoke, and heavy prepublish gates.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert only migration test/harness changes; do not roll back user fixture data in place.
    - Restore fixtures from version-controlled snapshots and rerun the previous release smoke.
    - Any product migration defect remains a release blocker with a separate repair task.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "14185e94deadff666a1544413ba5ae728dcacdfb"
    version: 1
id_source: "generated"
---
## Summary

Validate the 0.6.24-to-0.7 migration and installed-package matrix

Run the final compatibility matrix for new repositories, 0.6.24 direct/branch_pr repositories, WORKFLOW v1/v2, task docs v2/v3, active tasks, runner results, package exports, Node support, and installed tarballs.

## Scope

- In scope: automated migration fixtures/matrix, dry-run/rollback/idempotency, active-task preservation, direct/branch_pr route parity, Workflow/task/result schema versions, installed task brief/next-action/workflow doctor/runner smoke, package exports, Node engines, and exact failure diagnostics.
- Out of scope: changing product architecture after rc; defects become bounded release blockers/follow-up tasks.

## Plan

1. Build clean and 0.6.24 fixture repositories covering both workflows, schema versions, task doc versions, and active lifecycle phases.
2. Run upgrade/migration dry-run, apply, repeat, rollback, and resume.
3. Exercise installed tarball commands and runner/evaluator result paths.
4. Run supported Node/package/export matrices.
5. Record exact blockers and require fixes before release readiness.

## Verify Steps

1. Migrate every matrix fixture. Expected: no task, authority, context, Git, or workflow truth is lost; second apply is a no-op and rollback is exact where supported.
2. Resume active direct and branch_pr tasks. Expected: route/work order/fingerprint remain coherent and no duplicate worktree/PR/task is created.
3. Install local tarballs into clean fixtures. Expected: task brief/next-action JSON, workflow migration/doctor, runner result, and evaluator paths work outside the monorepo.
4. Run package export and supported Node matrices. Expected: declarations match executable support.
5. Run local release E2E, install smoke, and heavy prepublish gates.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only migration test/harness changes; do not roll back user fixture data in place.
- Restore fixtures from version-controlled snapshots and rerun the previous release smoke.
- Any product migration defect remains a release blocker with a separate repair task.

## Findings
