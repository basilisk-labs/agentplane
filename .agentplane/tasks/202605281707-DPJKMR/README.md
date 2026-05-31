---
id: "202605281707-DPJKMR"
title: "Critical path hotspot extraction"
result_summary: "Closed included batch task from merged PR #4197"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "maintainability"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T17:09:06.796Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T17:22:30.119Z"
  updated_by: "CODER"
  note: "Command: bun run hotspots:check; Result: pass with warnings below configured thresholds. Command: bun run typecheck; Result: pass. Evidence: route packet helpers live in route-oracle, keeping added behavior isolated from CLI command renderers. Scope: critical path maintainability."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-31T15:00:19.737Z"
  updated_by: "EVALUATOR"
  note: "Included task verified in merged batch PR #4197."
  evaluated_sha: "c318cabc49a29ffcbf2b8246af76201f5ccbb324"
  blueprint_digest: "fe4761068130926bd7b237935d2be033234702c06a4211fe950b0dd4d03516fa"
  evidence_refs:
    - ".agentplane/tasks/202605281707-DPJKMR/README.md"
    - ".agentplane/tasks/202605281707-DPJKMR/quality/20260531-150019737-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605281707-DPJKMR/quality/20260531-150019737-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605281707-DPJKMR/quality/20260531-150019737-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605281707-DPJKMR/blueprint/resolved-snapshot.json"
  findings:
    - "Task has verification.ok evidence and was included in the 51DD0G route-packet-v2 batch merged to main at 26704abb70798fb4ecca714fa3c21050d3893c18."
commit:
  hash: "c318cabc49a29ffcbf2b8246af76201f5ccbb324"
  message: "Merge pull request #4329 from basilisk-labs/task/202605310706-GV6ECK/verify-ghost-progress"
comments:
  -
    author: "CODER"
    body: "Start: Implementing critical-path hotspot extraction as an included task in the approved v0.6.12 agent-efficiency batch worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: closed included batch task after merged PR #4197 landed implementation commit 26704abb70798fb4ecca714fa3c21050d3893c18; evaluator review recorded SHA c318cabc49a29ffcbf2b8246af76201f5ccbb324."
events:
  -
    type: "status"
    at: "2026-05-28T17:09:47.207Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing critical-path hotspot extraction as an included task in the approved v0.6.12 agent-efficiency batch worktree."
  -
    type: "verify"
    at: "2026-05-28T17:22:30.119Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run hotspots:check; Result: pass with warnings below configured thresholds. Command: bun run typecheck; Result: pass. Evidence: route packet helpers live in route-oracle, keeping added behavior isolated from CLI command renderers. Scope: critical path maintainability."
  -
    type: "status"
    at: "2026-05-31T15:00:22.027Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: closed included batch task after merged PR #4197 landed implementation commit 26704abb70798fb4ecca714fa3c21050d3893c18; evaluator review recorded SHA c318cabc49a29ffcbf2b8246af76201f5ccbb324."
doc_version: 3
doc_updated_at: "2026-05-31T15:00:22.028Z"
doc_updated_by: "INTEGRATOR"
description: "Extract pure builders from runner task-run and route-decision critical path modules without changing public CLI behavior."
sections:
  Summary: |-
    Critical path hotspot extraction

    Extract pure builders from runner task-run and route-decision critical path modules without changing public CLI behavior.
  Scope: |-
    - In scope: Extract pure builders from runner task-run and route-decision critical path modules without changing public CLI behavior.
    - Out of scope: unrelated refactors not required for "Critical path hotspot extraction".
  Plan: "Extract pure helper modules from route-decision and task-run critical path files only where it reduces hotspot risk without changing public behavior. Keep refactor mechanical and backed by existing tests."
  Verify Steps: "1. Run focused tests for route-decision and task-run before/after extracted helpers. 2. Run bun run hotspots:check. 3. Run bun run typecheck. 4. Confirm public CLI snapshots are unchanged unless route packet additions intentionally update them."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T17:22:30.119Z — VERIFY — ok

    By: CODER

    Note: Command: bun run hotspots:check; Result: pass with warnings below configured thresholds. Command: bun run typecheck; Result: pass. Evidence: route packet helpers live in route-oracle, keeping added behavior isolated from CLI command renderers. Scope: critical path maintainability.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:47.207Z, excerpt_hash=sha256:c256321e40d14fdf214833ef257a798adc864390f208b182f47a3503ca67031f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-DPJKMR/blueprint/resolved-snapshot.json
    - old_digest: fe4761068130926bd7b237935d2be033234702c06a4211fe950b0dd4d03516fa
    - current_digest: fe4761068130926bd7b237935d2be033234702c06a4211fe950b0dd4d03516fa
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281707-DPJKMR

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions: {}
id_source: "generated"
---
## Summary

Critical path hotspot extraction

Extract pure builders from runner task-run and route-decision critical path modules without changing public CLI behavior.

## Scope

- In scope: Extract pure builders from runner task-run and route-decision critical path modules without changing public CLI behavior.
- Out of scope: unrelated refactors not required for "Critical path hotspot extraction".

## Plan

Extract pure helper modules from route-decision and task-run critical path files only where it reduces hotspot risk without changing public behavior. Keep refactor mechanical and backed by existing tests.

## Verify Steps

1. Run focused tests for route-decision and task-run before/after extracted helpers. 2. Run bun run hotspots:check. 3. Run bun run typecheck. 4. Confirm public CLI snapshots are unchanged unless route packet additions intentionally update them.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T17:22:30.119Z — VERIFY — ok

By: CODER

Note: Command: bun run hotspots:check; Result: pass with warnings below configured thresholds. Command: bun run typecheck; Result: pass. Evidence: route packet helpers live in route-oracle, keeping added behavior isolated from CLI command renderers. Scope: critical path maintainability.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:47.207Z, excerpt_hash=sha256:c256321e40d14fdf214833ef257a798adc864390f208b182f47a3503ca67031f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-DPJKMR/blueprint/resolved-snapshot.json
- old_digest: fe4761068130926bd7b237935d2be033234702c06a4211fe950b0dd4d03516fa
- current_digest: fe4761068130926bd7b237935d2be033234702c06a4211fe950b0dd4d03516fa
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281707-DPJKMR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
