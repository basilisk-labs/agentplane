---
id: "202608020907-FMGM4Z"
title: "Assimilate v0.6.26 maintenance fixes into v0.7"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-audit"
  - "code"
  - "compatibility"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T09:08:03.129Z"
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
    at: "2026-08-02T09:08:27.767Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T09:08:27.767Z"
doc_updated_by: "CODER"
description: "Audit every non-main branch, port only missing v0.6.25/v0.6.26 and stale-PR correctness fixes into the current v0.7 architecture, preserve stronger v0.7 contracts, and prove no maintenance regression remains."
sections:
  Summary: |-
    Assimilate v0.6.26 maintenance fixes into v0.7

    Audit every non-main branch, port only missing v0.6.25/v0.6.26 and stale-PR correctness fixes into the current v0.7 architecture, preserve stronger v0.7 contracts, and prove no maintenance regression remains.
  Scope: "Audit origin/codex/fix-v0.6.24-closeout-route at v0.6.26 and every remaining non-main remote task branch except agentplane-loops. Port only correctness or efficiency behavior that current main lacks. Preserve the v0.7 typed supervisor, authority, evidence, retrieval, and TypeScript boundaries. Include focused regression coverage, branch disposition evidence, and any required release follow-up. Do not merge stale branches wholesale and do not modify agentplane-loops."
  Plan: "1. Classify every non-main remote branch as merged, superseded, dependency-only, or carrying missing behavior. 2. Reproduce each candidate maintenance regression against current main. 3. Implement the minimal compatible fixes and focused tests in one dedicated task worktree. 4. Run focused tests, CLI critical coverage, workflow contracts, typecheck, guards, doctor, and task-state checks. 5. Record evaluator evidence, open a PR, wait for hosted checks, merge through the protected-main route, and clean the task branch/worktree. 6. If runtime code changes, publish a patch release from the merged main."
  Verify Steps: |-
    1. bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts
    2. Run every added or affected focused test file for assimilated stale-branch behavior.
    3. bun run test:cli:critical
    4. bun run workflows:command-check
    5. bun run lifecycle:invariants
    6. bun run typecheck
    7. bun run guards:check
    8. bun run ci:contract
    9. bun run task-state:check
    10. ap doctor
    11. node .agentplane/policy/check-routing.mjs
    12. Verify every audited remote branch has an explicit disposition and no current-main regression remains.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the dedicated task PR. Do not rewrite the v0.6.26 tag, v0.7.0 tag, main history, or agentplane-loops. If a port conflicts with a stronger v0.7 invariant, omit that port and record the superseding invariant with focused evidence."
  Findings: "No findings recorded yet."
extensions:
  workflow_route_baseline:
    start_head_sha: "3b4ea1fa8e78bf28cd51e6d3fb2eb585533b3a8f"
    version: 1
id_source: "generated"
---
## Summary

Assimilate v0.6.26 maintenance fixes into v0.7

Audit every non-main branch, port only missing v0.6.25/v0.6.26 and stale-PR correctness fixes into the current v0.7 architecture, preserve stronger v0.7 contracts, and prove no maintenance regression remains.

## Scope

Audit origin/codex/fix-v0.6.24-closeout-route at v0.6.26 and every remaining non-main remote task branch except agentplane-loops. Port only correctness or efficiency behavior that current main lacks. Preserve the v0.7 typed supervisor, authority, evidence, retrieval, and TypeScript boundaries. Include focused regression coverage, branch disposition evidence, and any required release follow-up. Do not merge stale branches wholesale and do not modify agentplane-loops.

## Plan

1. Classify every non-main remote branch as merged, superseded, dependency-only, or carrying missing behavior. 2. Reproduce each candidate maintenance regression against current main. 3. Implement the minimal compatible fixes and focused tests in one dedicated task worktree. 4. Run focused tests, CLI critical coverage, workflow contracts, typecheck, guards, doctor, and task-state checks. 5. Record evaluator evidence, open a PR, wait for hosted checks, merge through the protected-main route, and clean the task branch/worktree. 6. If runtime code changes, publish a patch release from the merged main.

## Verify Steps

1. bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.quality.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts
2. Run every added or affected focused test file for assimilated stale-branch behavior.
3. bun run test:cli:critical
4. bun run workflows:command-check
5. bun run lifecycle:invariants
6. bun run typecheck
7. bun run guards:check
8. bun run ci:contract
9. bun run task-state:check
10. ap doctor
11. node .agentplane/policy/check-routing.mjs
12. Verify every audited remote branch has an explicit disposition and no current-main regression remains.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the dedicated task PR. Do not rewrite the v0.6.26 tag, v0.7.0 tag, main history, or agentplane-loops. If a port conflicts with a stronger v0.7 invariant, omit that port and record the superseding invariant with focused evidence.

## Findings

No findings recorded yet.
