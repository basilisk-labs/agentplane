---
id: "202606081048-960K2W"
title: "Release AgentPlane 0.6.19"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T10:48:54.482Z"
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
    body: "Start: preparing AgentPlane 0.6.19 release candidate in branch_pr task worktree."
events:
  -
    type: "status"
    at: "2026-06-08T10:50:02.644Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: preparing AgentPlane 0.6.19 release candidate in branch_pr task worktree."
doc_version: 3
doc_updated_at: "2026-06-08T10:50:02.644Z"
doc_updated_by: "CODER"
description: "Prepare, verify, merge, and publish AgentPlane patch release 0.6.19."
sections:
  Summary: |-
    Release AgentPlane 0.6.19

    Prepare, verify, merge, and publish AgentPlane patch release 0.6.19.
  Scope: |-
    - In scope: Prepare, verify, merge, and publish AgentPlane patch release 0.6.19.
    - Out of scope: unrelated refactors not required for "Release AgentPlane 0.6.19".
  Plan: |-
    Goal: release AgentPlane 0.6.19 as a patch release.

    Acceptance criteria:
    1. Release candidate branch is created from current main in branch_pr mode and contains exact version/tag target 0.6.19 / v0.6.19.
    2. Candidate changes pass local release gates: routing policy check, ap doctor, docs/readme header check, docs/CLI check, typecheck, hotspot check, and release prepublish fast path.
    3. Candidate PR is opened, hosted checks pass, evaluator records a pass verdict with evidence.
    4. Candidate is integrated through branch_pr workflow into main.
    5. Publish release workflow is dispatched or verified on the exact release commit SHA, and external truth confirms GitHub tag/release plus npm versions for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes are 0.6.19.

    Constraints:
    - Do not publish from an unmerged candidate branch.
    - Do not treat release detect workflow success as publication.
    - Do not manually edit .agentplane/tasks.json.
    - Use ap task brief and ap task next-action --explain as the route oracle before mutating lifecycle steps.
    - Keep release artifacts in English.

    Planned execution:
    1. Start/recover dedicated CODER worktree with slug release-0-6-19.
    2. Run candidate preparation with exact version: bun run release:candidate:prepare -- --version 0.6.19 --write --push --yes.
    3. Inspect candidate diff and run required local checks.
    4. Open/update PR, record verification and evaluator pass.
    5. Integrate candidate into main after hosted checks.
    6. Dispatch/verify Publish release against the release commit SHA and confirm GitHub/npm external surfaces.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Release AgentPlane 0.6.19

Prepare, verify, merge, and publish AgentPlane patch release 0.6.19.

## Scope

- In scope: Prepare, verify, merge, and publish AgentPlane patch release 0.6.19.
- Out of scope: unrelated refactors not required for "Release AgentPlane 0.6.19".

## Plan

Goal: release AgentPlane 0.6.19 as a patch release.

Acceptance criteria:
1. Release candidate branch is created from current main in branch_pr mode and contains exact version/tag target 0.6.19 / v0.6.19.
2. Candidate changes pass local release gates: routing policy check, ap doctor, docs/readme header check, docs/CLI check, typecheck, hotspot check, and release prepublish fast path.
3. Candidate PR is opened, hosted checks pass, evaluator records a pass verdict with evidence.
4. Candidate is integrated through branch_pr workflow into main.
5. Publish release workflow is dispatched or verified on the exact release commit SHA, and external truth confirms GitHub tag/release plus npm versions for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes are 0.6.19.

Constraints:
- Do not publish from an unmerged candidate branch.
- Do not treat release detect workflow success as publication.
- Do not manually edit .agentplane/tasks.json.
- Use ap task brief and ap task next-action --explain as the route oracle before mutating lifecycle steps.
- Keep release artifacts in English.

Planned execution:
1. Start/recover dedicated CODER worktree with slug release-0-6-19.
2. Run candidate preparation with exact version: bun run release:candidate:prepare -- --version 0.6.19 --write --push --yes.
3. Inspect candidate diff and run required local checks.
4. Open/update PR, record verification and evaluator pass.
5. Integrate candidate into main after hosted checks.
6. Dispatch/verify Publish release against the release commit SHA and confirm GitHub/npm external surfaces.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
