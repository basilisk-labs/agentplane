---
id: "202605171725-AEFDJR"
title: "Add Turborepo local CI evidence wrapper"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T17:25:56.501Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T17:50:05.844Z"
  updated_by: "CODER"
  note: "Local Turborepo CI evidence wrapper verified: affected and full package graphs pass, report writes normalized successful/failed/cached counts and task graph edges, formatting, script-doc freshness, policy routing, and doctor pass."
  attempts: 0
commit:
  hash: "1ff8db627f0bf772acd587f276a2a1ef7aa908c5"
  message: "Merge pull request #3852 from basilisk-labs/task/202605171724-JW38N0/local-turbo-dev-overlay"
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved Turborepo local CI evidence wrapper in the existing scripts/checks developer tooling surface, keeping it local-only and non-runtime."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3852 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T17:44:51.936Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved Turborepo local CI evidence wrapper in the existing scripts/checks developer tooling surface, keeping it local-only and non-runtime."
  -
    type: "verify"
    at: "2026-05-17T17:50:05.844Z"
    author: "CODER"
    state: "ok"
    note: "Local Turborepo CI evidence wrapper verified: affected and full package graphs pass, report writes normalized successful/failed/cached counts and task graph edges, formatting, script-doc freshness, policy routing, and doctor pass."
  -
    type: "status"
    at: "2026-05-17T18:50:26.693Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3852 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T18:50:26.694Z"
doc_updated_by: "INTEGRATOR"
description: "Add an AgentPlane-friendly local CI wrapper around Turborepo that sanitizes environment state, runs selected dev graph checks, and reports summary JSON path/cache evidence without mutating AgentPlane task state."
sections:
  Summary: |-
    Add Turborepo local CI evidence wrapper

    Add an AgentPlane-friendly local CI wrapper around Turborepo that sanitizes environment state, runs selected dev graph checks, and reports summary JSON path/cache evidence without mutating AgentPlane task state.
  Scope: |-
    - In scope: Add an AgentPlane-friendly local CI wrapper around Turborepo that sanitizes environment state, runs selected dev graph checks, and reports summary JSON path/cache evidence without mutating AgentPlane task state.
    - Out of scope: unrelated refactors not required for "Add Turborepo local CI evidence wrapper".
  Plan: "Follow-up task. Scope: add an optional AgentPlane-friendly wrapper for local Turborepo CI evidence after the base dev graph overlay exists. It should sanitize env, run selected turbo commands, print cache/summary evidence, and avoid task lifecycle mutation. Depends conceptually on 202605171724-JW38N0."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    - Command: bun run dev:turbo:affected
      Result: pass
      Evidence: wrapper executed the affected packages/* Turbo build/typecheck/test graph; 12 successful tasks, 12 cached on the final cached run; summary .turbo/runs/3DrVPFRigAKZ7JNuVWgkI1DNI8j.json; report .agentplane/cache/turbo-local-ci-report.json with affected=true and successful=12.
      Scope: affected local Turbo evidence wrapper.
    - Command: bun run ci:local:turbo
      Result: pass
      Evidence: full packages/* Turbo build/typecheck/test graph; 12 successful tasks, 12 cached on the final full run; summary .turbo/runs/3DrVFqyFDJqyOMgbUGifzH3UecL.json; report wrote successful=12, failed=0, cached=12.
      Scope: local Turbo CI evidence wrapper.
    - Command: bunx prettier --check package.json scripts/checks/run-turbo-local-ci.mjs docs/developer/testing-and-quality.mdx scripts/README.md
      Result: pass
      Scope: changed JSON, script, and docs formatting.
    - Command: git diff --check
      Result: pass
      Scope: whitespace safety.
    - Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK.
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor OK; repo-local handoff info only.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T17:50:05.844Z — VERIFY — ok

    By: CODER

    Note: Local Turborepo CI evidence wrapper verified: affected and full package graphs pass, report writes normalized successful/failed/cached counts and task graph edges, formatting, script-doc freshness, policy routing, and doctor pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:49:45.451Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171724-JW38N0-local-turbo-dev-overlay/.agentplane/tasks/202605171725-AEFDJR/blueprint/resolved-snapshot.json
    - old_digest: 955157ec2c2d5abea5fdce074364e217c29f5cbffa52d43396a11897833e5d04
    - current_digest: 955157ec2c2d5abea5fdce074364e217c29f5cbffa52d43396a11897833e5d04
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171725-AEFDJR

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add Turborepo local CI evidence wrapper

Add an AgentPlane-friendly local CI wrapper around Turborepo that sanitizes environment state, runs selected dev graph checks, and reports summary JSON path/cache evidence without mutating AgentPlane task state.

## Scope

- In scope: Add an AgentPlane-friendly local CI wrapper around Turborepo that sanitizes environment state, runs selected dev graph checks, and reports summary JSON path/cache evidence without mutating AgentPlane task state.
- Out of scope: unrelated refactors not required for "Add Turborepo local CI evidence wrapper".

## Plan

Follow-up task. Scope: add an optional AgentPlane-friendly wrapper for local Turborepo CI evidence after the base dev graph overlay exists. It should sanitize env, run selected turbo commands, print cache/summary evidence, and avoid task lifecycle mutation. Depends conceptually on 202605171724-JW38N0.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

- Command: bun run dev:turbo:affected
  Result: pass
  Evidence: wrapper executed the affected packages/* Turbo build/typecheck/test graph; 12 successful tasks, 12 cached on the final cached run; summary .turbo/runs/3DrVPFRigAKZ7JNuVWgkI1DNI8j.json; report .agentplane/cache/turbo-local-ci-report.json with affected=true and successful=12.
  Scope: affected local Turbo evidence wrapper.
- Command: bun run ci:local:turbo
  Result: pass
  Evidence: full packages/* Turbo build/typecheck/test graph; 12 successful tasks, 12 cached on the final full run; summary .turbo/runs/3DrVFqyFDJqyOMgbUGifzH3UecL.json; report wrote successful=12, failed=0, cached=12.
  Scope: local Turbo CI evidence wrapper.
- Command: bunx prettier --check package.json scripts/checks/run-turbo-local-ci.mjs docs/developer/testing-and-quality.mdx scripts/README.md
  Result: pass
  Scope: changed JSON, script, and docs formatting.
- Command: git diff --check
  Result: pass
  Scope: whitespace safety.
- Command: node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: policy routing OK.
- Command: agentplane doctor
  Result: pass
  Evidence: doctor OK; repo-local handoff info only.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T17:50:05.844Z — VERIFY — ok

By: CODER

Note: Local Turborepo CI evidence wrapper verified: affected and full package graphs pass, report writes normalized successful/failed/cached counts and task graph edges, formatting, script-doc freshness, policy routing, and doctor pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:49:45.451Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171724-JW38N0-local-turbo-dev-overlay/.agentplane/tasks/202605171725-AEFDJR/blueprint/resolved-snapshot.json
- old_digest: 955157ec2c2d5abea5fdce074364e217c29f5cbffa52d43396a11897833e5d04
- current_digest: 955157ec2c2d5abea5fdce074364e217c29f5cbffa52d43396a11897833e5d04
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171725-AEFDJR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
