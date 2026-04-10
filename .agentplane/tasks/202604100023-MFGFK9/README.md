---
id: "202604100023-MFGFK9"
title: "Expose task artifact drift in preflight when tracked status looks clean"
result_summary: "integrate: squash task/202604100023-MFGFK9/preflight-task-drift"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T00:24:56.704Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-10T00:27:28.256Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts and bun x eslint packages/agentplane/src/cli/run-cli/commands/core/preflight.ts packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts passed; preflight now surfaces task artifact drift explicitly while preserving tracked-only clean semantics."
commit:
  hash: "a2b9ccf1e12efad0423b8c48f2a3962f470ceaf5"
  message: "🧩 MFGFK9 integrate: workflow: Expose task artifact drift in preflight when tracked status looks clean"
comments:
  -
    author: "CODER"
    body: "Start: surface hidden .agentplane/tasks drift in preflight so cross-task artifacts are visible even when tracked status looks clean."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100023-MFGFK9/pr."
events:
  -
    type: "status"
    at: "2026-04-10T00:25:07.545Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: surface hidden .agentplane/tasks drift in preflight so cross-task artifacts are visible even when tracked status looks clean."
  -
    type: "verify"
    at: "2026-04-10T00:27:28.256Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts and bun x eslint packages/agentplane/src/cli/run-cli/commands/core/preflight.ts packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts passed; preflight now surfaces task artifact drift explicitly while preserving tracked-only clean semantics."
  -
    type: "status"
    at: "2026-04-10T00:32:11.899Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100023-MFGFK9/pr."
doc_version: 3
doc_updated_at: "2026-04-10T00:36:49.556Z"
doc_updated_by: "INTEGRATOR"
description: "Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides."
sections:
  Summary: |-
    Expose task artifact drift in preflight when tracked status looks clean
    
    Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides.
  Scope: |-
    - In scope: Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides.
    - Out of scope: unrelated refactors not required for "Expose task artifact drift in preflight when tracked status looks clean".
  Plan: "1. Extend preflight to inspect changed task-artifact paths under .agentplane/tasks using full porcelain status, not tracked-only status. 2. Report task-artifact drift explicitly in JSON and text output, with a next action that points to git status --short --untracked-files=all -- .agentplane/tasks when drift exists. 3. Add regression coverage for hidden untracked task artifact drift and for the clean case."
  Verify Steps: |-
    1. Create or simulate untracked task-artifact files under .agentplane/tasks for a different task id and run `agentplane preflight --json --mode quick`. Expected: the JSON report surfaces task artifact drift explicitly, including the affected task ids or paths.
    2. Run `agentplane preflight` in text mode under the same drift scenario. Expected: the human-readable output points to the task artifact drift and recommends `git status --short --untracked-files=all -- .agentplane/tasks`.
    3. Run the targeted CLI test file(s) covering preflight readiness. Expected: the new drift case and the clean case both pass without regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T00:27:28.256Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts and bun x eslint packages/agentplane/src/cli/run-cli/commands/core/preflight.ts packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts passed; preflight now surfaces task artifact drift explicitly while preserving tracked-only clean semantics.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T00:25:07.551Z, excerpt_hash=sha256:e1226890c2381075048682df0fc63c8fbf824f6fb343fe6d7209b9a8a9a4ff96
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Preflight could report a tracked-clean working tree while untracked .agentplane/tasks artifacts from other task ids were still present and capable of breaking later integrate or close flows.
      Impact: Operators could trust the tracked-only cleanliness signal, miss hidden task drift, and only discover the collision after a merge or close commit failed.
      Resolution: Preflight now inspects full changed paths under the workflow task directory, reports task artifact drift explicitly in JSON/text output, and points operators at git status --short --untracked-files=all -- .agentplane/tasks.
      Promotion: incident-candidate
      Fixability: repo-fixable
      IncidentScope: Preflight hides cross-task workflow artifact drift when tracked status looks clean.
      IncidentTags: workflow, git, ux
id_source: "generated"
---
## Summary

Expose task artifact drift in preflight when tracked status looks clean

Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides.

## Scope

- In scope: Surface changed/untracked .agentplane/tasks/<task-id>/... paths in preflight so operators can see cross-task artifact drift that git status --untracked-files=no hides.
- Out of scope: unrelated refactors not required for "Expose task artifact drift in preflight when tracked status looks clean".

## Plan

1. Extend preflight to inspect changed task-artifact paths under .agentplane/tasks using full porcelain status, not tracked-only status. 2. Report task-artifact drift explicitly in JSON and text output, with a next action that points to git status --short --untracked-files=all -- .agentplane/tasks when drift exists. 3. Add regression coverage for hidden untracked task artifact drift and for the clean case.

## Verify Steps

1. Create or simulate untracked task-artifact files under .agentplane/tasks for a different task id and run `agentplane preflight --json --mode quick`. Expected: the JSON report surfaces task artifact drift explicitly, including the affected task ids or paths.
2. Run `agentplane preflight` in text mode under the same drift scenario. Expected: the human-readable output points to the task artifact drift and recommends `git status --short --untracked-files=all -- .agentplane/tasks`.
3. Run the targeted CLI test file(s) covering preflight readiness. Expected: the new drift case and the clean case both pass without regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T00:27:28.256Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts and bun x eslint packages/agentplane/src/cli/run-cli/commands/core/preflight.ts packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts passed; preflight now surfaces task artifact drift explicitly while preserving tracked-only clean semantics.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T00:25:07.551Z, excerpt_hash=sha256:e1226890c2381075048682df0fc63c8fbf824f6fb343fe6d7209b9a8a9a4ff96

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Preflight could report a tracked-clean working tree while untracked .agentplane/tasks artifacts from other task ids were still present and capable of breaking later integrate or close flows.
  Impact: Operators could trust the tracked-only cleanliness signal, miss hidden task drift, and only discover the collision after a merge or close commit failed.
  Resolution: Preflight now inspects full changed paths under the workflow task directory, reports task artifact drift explicitly in JSON/text output, and points operators at git status --short --untracked-files=all -- .agentplane/tasks.
  Promotion: incident-candidate
  Fixability: repo-fixable
  IncidentScope: Preflight hides cross-task workflow artifact drift when tracked status looks clean.
  IncidentTags: workflow, git, ux
