---
id: "202608061244-J3EC6A"
title: "Publish AgentPlane 0.7.4 from the verified protected-main merge"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202608052127-XWDY4R"
tags:
  - "release"
  - "v0.7"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "merge"
  - "network"
  - "publish"
verify:
  - "bun run release:prepublish"
  - "postpublish exact-SHA audit, npm package identity, tag, GitHub Release assets, clean install, and supported upgrade"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T12:45:20.457Z"
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
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-06T12:45:44.940Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-06T12:45:44.940Z"
doc_updated_by: "INTEGRATOR"
description: "Freeze version 0.7.4 on protected main badb9fa101c65e124e9c425941a0e2c533251f65, generate complete release notes, run the strict prepublish contract, merge the release candidate through the protected branch workflow, dispatch Publish to npm from the exact release commit, verify all three npm packages, tag, GitHub Release, assets, clean install, supported upgrade, postpublish evidence, and record token usage availability."
sections:
  Summary: |-
    Publish AgentPlane 0.7.4 from the verified protected-main merge

    Freeze version 0.7.4 on protected main badb9fa101c65e124e9c425941a0e2c533251f65, generate complete release notes, run the strict prepublish contract, merge the release candidate through the protected branch workflow, dispatch Publish to npm from the exact release commit, verify all three npm packages, tag, GitHub Release, assets, clean install, supported upgrade, postpublish evidence, and record token usage availability.
  Scope: |-
    - In scope: Freeze version 0.7.4 on protected main badb9fa101c65e124e9c425941a0e2c533251f65, generate complete release notes, run the strict prepublish contract, merge the release candidate through the protected branch workflow, dispatch Publish to npm from the exact release commit, verify all three npm packages, tag, GitHub Release, assets, clean install, supported upgrade, postpublish evidence, and record token usage availability.
    - Out of scope: unrelated refactors not required for "Publish AgentPlane 0.7.4 from the verified protected-main merge".
  Plan: "Release plan: version=0.7.4, tag=v0.7.4, source=protected main badb9fa101c65e124e9c425941a0e2c533251f65. 1. Generate and inspect the AgentPlane patch release plan; freeze the exact version/tag and complete release-note coverage from v0.7.3 through the verified refactor and consolidated post-release fixes. 2. Create the branch_pr release worktree, apply the candidate version/notes changes only, and run release:prepublish plus version/parity/notes/artifact checks. 3. Record independent TESTER and EVALUATOR pass evidence, pre-merge close the release task, publish the release-candidate PR head, wait for stable hosted checks, and merge through the integration queue. 4. From the exact merged release commit, dispatch the protected Publish to npm workflow once. 5. Verify agentplane, @agentplaneorg/core, and @agentplaneorg/recipes are 0.7.4 on npm; verify v0.7.4 tag, GitHub Release and assets, clean npm install, supported upgrade, CLI version, exact SHA, postpublish audit, idempotent evidence, and task token-usage reporting. 6. Finish and clean only proven merged release branches/worktrees. Stop on target drift, active incidents, red prepublish/hosted gates, mismatched publication identity, or any need for an additional patch."
  Verify Steps: |-
    PLANNER fallback scaffold for "Publish AgentPlane 0.7.4 from the verified protected-main merge". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Publish AgentPlane 0.7.4 from the verified protected-main merge". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "badb9fa101c65e124e9c425941a0e2c533251f65"
    version: 1
id_source: "generated"
---
## Summary

Publish AgentPlane 0.7.4 from the verified protected-main merge

Freeze version 0.7.4 on protected main badb9fa101c65e124e9c425941a0e2c533251f65, generate complete release notes, run the strict prepublish contract, merge the release candidate through the protected branch workflow, dispatch Publish to npm from the exact release commit, verify all three npm packages, tag, GitHub Release, assets, clean install, supported upgrade, postpublish evidence, and record token usage availability.

## Scope

- In scope: Freeze version 0.7.4 on protected main badb9fa101c65e124e9c425941a0e2c533251f65, generate complete release notes, run the strict prepublish contract, merge the release candidate through the protected branch workflow, dispatch Publish to npm from the exact release commit, verify all three npm packages, tag, GitHub Release, assets, clean install, supported upgrade, postpublish evidence, and record token usage availability.
- Out of scope: unrelated refactors not required for "Publish AgentPlane 0.7.4 from the verified protected-main merge".

## Plan

Release plan: version=0.7.4, tag=v0.7.4, source=protected main badb9fa101c65e124e9c425941a0e2c533251f65. 1. Generate and inspect the AgentPlane patch release plan; freeze the exact version/tag and complete release-note coverage from v0.7.3 through the verified refactor and consolidated post-release fixes. 2. Create the branch_pr release worktree, apply the candidate version/notes changes only, and run release:prepublish plus version/parity/notes/artifact checks. 3. Record independent TESTER and EVALUATOR pass evidence, pre-merge close the release task, publish the release-candidate PR head, wait for stable hosted checks, and merge through the integration queue. 4. From the exact merged release commit, dispatch the protected Publish to npm workflow once. 5. Verify agentplane, @agentplaneorg/core, and @agentplaneorg/recipes are 0.7.4 on npm; verify v0.7.4 tag, GitHub Release and assets, clean npm install, supported upgrade, CLI version, exact SHA, postpublish audit, idempotent evidence, and task token-usage reporting. 6. Finish and clean only proven merged release branches/worktrees. Stop on target drift, active incidents, red prepublish/hosted gates, mismatched publication identity, or any need for an additional patch.

## Verify Steps

PLANNER fallback scaffold for "Publish AgentPlane 0.7.4 from the verified protected-main merge". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Publish AgentPlane 0.7.4 from the verified protected-main merge". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
