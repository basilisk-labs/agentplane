---
id: "202605251957-4ABD2H"
title: "Optimize CLI startup fast paths"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "performance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-25T20:00:05.396Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-25T20:19:58.852Z"
  updated_by: "CODER"
  note: "Implemented runtime freshness optimization and ran focused checks. typecheck, focused dist-guard/repo-local-handoff tests, targeted eslint, framework bootstrap, and policy routing passed. bench:cli:time:check still fails on this local machine but shows the changed path avoids dirty runtime snapshot hashing only after commit/bootstrap; residual startup cost remains in dist import/project command execution and is recorded as follow-up risk."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved CLI startup fast-path optimization in the dedicated branch_pr worktree, scoped to dispatch/loading behavior and benchmark-backed verification."
events:
  -
    type: "status"
    at: "2026-05-25T20:00:44.853Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved CLI startup fast-path optimization in the dedicated branch_pr worktree, scoped to dispatch/loading behavior and benchmark-backed verification."
  -
    type: "verify"
    at: "2026-05-25T20:19:58.852Z"
    author: "CODER"
    state: "ok"
    note: "Implemented runtime freshness optimization and ran focused checks. typecheck, focused dist-guard/repo-local-handoff tests, targeted eslint, framework bootstrap, and policy routing passed. bench:cli:time:check still fails on this local machine but shows the changed path avoids dirty runtime snapshot hashing only after commit/bootstrap; residual startup cost remains in dist import/project command execution and is recorded as follow-up risk."
doc_version: 3
doc_updated_at: "2026-05-25T20:19:58.958Z"
doc_updated_by: "CODER"
description: "Reduce AgentPlane CLI startup overhead for fast commands such as version/help/quickstart by avoiding unnecessary project, config, and runtime registry loading where command dispatch metadata says it is not required."
sections:
  Summary: |-
    Optimize CLI startup fast paths

    Reduce AgentPlane CLI startup overhead for fast commands such as version/help/quickstart by avoiding unnecessary project, config, and runtime registry loading where command dispatch metadata says it is not required.
  Scope: |-
    - In scope: Reduce AgentPlane CLI startup overhead for fast commands such as version/help/quickstart by avoiding unnecessary project, config, and runtime registry loading where command dispatch metadata says it is not required.
    - Out of scope: unrelated refactors not required for "Optimize CLI startup fast paths".
  Plan: |-
    1. Measure current CLI wall-time behavior for fast commands and identify the avoidable startup path.
    2. Change CLI dispatch so project/config/runtime registry loading happens only after a matched non-fast command actually requires it.
    3. Add or update focused tests for fast command behavior if the existing suite does not cover the regression.
    4. Verify with targeted tests, typecheck, policy routing, and CLI wall-time benchmark; record residual risk in Findings.
  Verify Steps: |-
    1. Run bun run typecheck. Expected: TypeScript project references compile successfully.
    2. Run bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.test.ts or a narrower equivalent if the changed behavior is covered elsewhere. Expected: CLI fast-path behavior remains correct.
    3. Run bun run bench:cli:time:check. Expected: fast command wall-time baselines pass or any remaining miss is explained with concrete evidence.
    4. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing remains valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-25T20:19:58.852Z — VERIFY — ok

    By: CODER

    Note: Implemented runtime freshness optimization and ran focused checks. typecheck, focused dist-guard/repo-local-handoff tests, targeted eslint, framework bootstrap, and policy routing passed. bench:cli:time:check still fails on this local machine but shows the changed path avoids dirty runtime snapshot hashing only after commit/bootstrap; residual startup cost remains in dist import/project command execution and is recorded as follow-up risk.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T20:00:44.853Z, excerpt_hash=sha256:7d40f2448255caf9cc1d0722c2b9e689c6fa4fddb73ff2432e669aaa280e40a2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251957-4ABD2H-optimize-cli-startup-fast-paths/.agentplane/tasks/202605251957-4ABD2H/blueprint/resolved-snapshot.json
    - old_digest: ddd73d3e9cf44b8de6060e6df22095a635243b839bed16493146fea1e2883ee3
    - current_digest: ddd73d3e9cf44b8de6060e6df22095a635243b839bed16493146fea1e2883ee3
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605251957-4ABD2H

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: bench:cli:time:check failed after the implementation commit and post-commit bootstrap: version median 1448 ms in a focused rerun and full suite still above historical thresholds. The implemented change is a correctness-preserving partial optimization, not full baseline restoration.
      Impact: CLI startup remains above the historical local wall-time baseline, so this task reduces a known source of avoidable overhead but does not complete the full P0 startup-performance recovery.
      Resolution: Keep this PR scoped to the safe dist freshness quick-check. Open a follow-up for dist import/startup decomposition or benchmark recalibration after hosted measurements.
id_source: "generated"
---
## Summary

Optimize CLI startup fast paths

Reduce AgentPlane CLI startup overhead for fast commands such as version/help/quickstart by avoiding unnecessary project, config, and runtime registry loading where command dispatch metadata says it is not required.

## Scope

- In scope: Reduce AgentPlane CLI startup overhead for fast commands such as version/help/quickstart by avoiding unnecessary project, config, and runtime registry loading where command dispatch metadata says it is not required.
- Out of scope: unrelated refactors not required for "Optimize CLI startup fast paths".

## Plan

1. Measure current CLI wall-time behavior for fast commands and identify the avoidable startup path.
2. Change CLI dispatch so project/config/runtime registry loading happens only after a matched non-fast command actually requires it.
3. Add or update focused tests for fast command behavior if the existing suite does not cover the regression.
4. Verify with targeted tests, typecheck, policy routing, and CLI wall-time benchmark; record residual risk in Findings.

## Verify Steps

1. Run bun run typecheck. Expected: TypeScript project references compile successfully.
2. Run bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.test.ts or a narrower equivalent if the changed behavior is covered elsewhere. Expected: CLI fast-path behavior remains correct.
3. Run bun run bench:cli:time:check. Expected: fast command wall-time baselines pass or any remaining miss is explained with concrete evidence.
4. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing remains valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-25T20:19:58.852Z — VERIFY — ok

By: CODER

Note: Implemented runtime freshness optimization and ran focused checks. typecheck, focused dist-guard/repo-local-handoff tests, targeted eslint, framework bootstrap, and policy routing passed. bench:cli:time:check still fails on this local machine but shows the changed path avoids dirty runtime snapshot hashing only after commit/bootstrap; residual startup cost remains in dist import/project command execution and is recorded as follow-up risk.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-25T20:00:44.853Z, excerpt_hash=sha256:7d40f2448255caf9cc1d0722c2b9e689c6fa4fddb73ff2432e669aaa280e40a2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605251957-4ABD2H-optimize-cli-startup-fast-paths/.agentplane/tasks/202605251957-4ABD2H/blueprint/resolved-snapshot.json
- old_digest: ddd73d3e9cf44b8de6060e6df22095a635243b839bed16493146fea1e2883ee3
- current_digest: ddd73d3e9cf44b8de6060e6df22095a635243b839bed16493146fea1e2883ee3
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605251957-4ABD2H

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: bench:cli:time:check failed after the implementation commit and post-commit bootstrap: version median 1448 ms in a focused rerun and full suite still above historical thresholds. The implemented change is a correctness-preserving partial optimization, not full baseline restoration.
  Impact: CLI startup remains above the historical local wall-time baseline, so this task reduces a known source of avoidable overhead but does not complete the full P0 startup-performance recovery.
  Resolution: Keep this PR scoped to the safe dist freshness quick-check. Open a follow-up for dist import/startup decomposition or benchmark recalibration after hosted measurements.
