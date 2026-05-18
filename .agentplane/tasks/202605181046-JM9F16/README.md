---
id: "202605181046-JM9F16"
title: "Gate runner surfaces for v0.7"
result_summary: "Merged PR #3885; public task run/context --run/runner.execution surfaces removed or hidden; remaining runner work deferred to v0.7."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-18T10:46:26.773Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T11:25:34.626Z"
  updated_by: "CODER"
  note: "Runner public surfaces are gated for v0.7: task run wrappers/tests removed, context --run and runner.execution remain absent, handoff/reclaim no longer emits runner recovery commands, and CI failure from knip was resolved."
  attempts: 0
commit:
  hash: "d87c1fcb4f3a93d79a4d845d3012d8f859313355"
  message: "Merge pull request #3885 from basilisk-labs/task/202605181046-JM9F16/gate-runner-v0-7"
comments:
  -
    author: "CODER"
    body: "Start: Remove public runner command surfaces and context run shortcuts for the current release, keeping runner implementation deferred to v0.7 while preserving CURATOR task creation for IDE and Codex agents."
  -
    author: "INTEGRATOR"
    body: "Verified: GitHub PR #3885 merged after green hosted checks; runner public surfaces gated for v0.7."
events:
  -
    type: "status"
    at: "2026-05-18T10:46:40.549Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Remove public runner command surfaces and context run shortcuts for the current release, keeping runner implementation deferred to v0.7 while preserving CURATOR task creation for IDE and Codex agents."
  -
    type: "verify"
    at: "2026-05-18T10:59:17.895Z"
    author: "CODER"
    state: "ok"
    note: "Removed public runner command surfaces and context --run shortcuts for current release; runner implementation remains deferred to v0.7. Verified targeted Vitest, help snapshots, typecheck, ESLint, generated CLI docs, docs bootstrap/onboarding, formatting, diff-check, and policy routing."
  -
    type: "verify"
    at: "2026-05-18T11:25:34.626Z"
    author: "CODER"
    state: "ok"
    note: "Runner public surfaces are gated for v0.7: task run wrappers/tests removed, context --run and runner.execution remain absent, handoff/reclaim no longer emits runner recovery commands, and CI failure from knip was resolved."
  -
    type: "status"
    at: "2026-05-18T11:46:50.719Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: GitHub PR #3885 merged after green hosted checks; runner public surfaces gated for v0.7."
doc_version: 3
doc_updated_at: "2026-05-18T11:46:50.721Z"
doc_updated_by: "INTEGRATOR"
description: "Remove public runner command and context --run surfaces from current AgentPlane docs and CLI guidance. Context assimilation should create CURATOR tasks for IDE/Codex/human agents now, while runner implementation remains deferred to v0.7."
sections:
  Summary: |-
    Gate runner surfaces for v0.7

    Remove public runner command and context --run surfaces from current AgentPlane docs and CLI guidance. Context assimilation should create CURATOR tasks for IDE/Codex/human agents now, while runner implementation remains deferred to v0.7.
  Scope: |-
    - In scope: Remove public runner command and context --run surfaces from current AgentPlane docs and CLI guidance. Context assimilation should create CURATOR tasks for IDE/Codex/human agents now, while runner implementation remains deferred to v0.7.
    - Out of scope: unrelated refactors not required for "Gate runner surfaces for v0.7".
  Plan: "1. Remove public context --run parsing/docs/examples so context ingest/learn only creates CURATOR tasks for IDE/Codex/human agents. 2. Remove context.assimilation runner recovery commands/stop rule text and replace with agent handoff/recovery language. 3. Remove task run command family from public CLI catalog/docs for the current release while leaving implementation files for v0.7. 4. Regenerate CLI docs and update user/developer docs. 5. Run targeted context/blueprint/help/docs checks and record verification."
  Verify Steps: |-
    1. Targeted Vitest: context release-readiness, blueprint validate/resolve, task new, generated CLI docs, handoff, and help snapshots pass.
    2. Static checks: touched TypeScript ESLint, typecheck, knip baseline, generated CLI docs freshness, bootstrap docs, onboarding docs, docs IA/scripts, clone baseline, format:changed, git diff --check, and policy routing pass.
    3. Public-surface scan: user/developer CLI/docs and task command catalog/loaders no longer expose task run, context --run, runner.execution, --run-id, or runner recovery commands; remaining task-run references are historical release notes or internal deferred runner modules.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-18T10:59:17.895Z — VERIFY — ok

    By: CODER

    Note: Removed public runner command surfaces and context --run shortcuts for current release; runner implementation remains deferred to v0.7. Verified targeted Vitest, help snapshots, typecheck, ESLint, generated CLI docs, docs bootstrap/onboarding, formatting, diff-check, and policy routing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T10:58:59.830Z, excerpt_hash=sha256:a5fc4b54d3e71da26a3621b479e9edae804f213d8e343646e3d743aa622fae07

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181046-JM9F16-gate-runner-v0-7/.agentplane/tasks/202605181046-JM9F16/blueprint/resolved-snapshot.json
    - old_digest: d208ce43673d9e7c6a37ec563e5ab6b7115fa834ef853067cd396351674398b0
    - current_digest: d208ce43673d9e7c6a37ec563e5ab6b7115fa834ef853067cd396351674398b0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181046-JM9F16

    ### 2026-05-18T11:25:34.626Z — VERIFY — ok

    By: CODER

    Note: Runner public surfaces are gated for v0.7: task run wrappers/tests removed, context --run and runner.execution remain absent, handoff/reclaim no longer emits runner recovery commands, and CI failure from knip was resolved.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:25:14.120Z, excerpt_hash=sha256:10c5f863ee07d9057d844b39c06b7b528f33df783076cc1e0733d589b772a7e1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181046-JM9F16-gate-runner-v0-7/.agentplane/tasks/202605181046-JM9F16/blueprint/resolved-snapshot.json
    - old_digest: d208ce43673d9e7c6a37ec563e5ab6b7115fa834ef853067cd396351674398b0
    - current_digest: d208ce43673d9e7c6a37ec563e5ab6b7115fa834ef853067cd396351674398b0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605181046-JM9F16

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Public CLI docs no longer expose task run, context --run, or runner.execution blueprint choices; remaining task run references are confined to deferred implementation/test files.
      Impact: Context assimilation now creates CURATOR tasks for Codex/IDE/human agents instead of invoking a runner path.
      Resolution: Ready for branch_pr PR review and integration.

    - Observation: GitHub Core CI test failed on knip after task run command catalog removal because orphan command wrappers became unused; local verification now passes knip, typecheck, targeted Vitest, docs freshness, bootstrap/onboarding/docs checks, clone baseline, git diff --check, and policy routing.
      Impact: Current user-facing workflow is agent handoff via IDE/Codex/local project folder; runner execution is no longer advertised as an available v0.6 path.
      Resolution: Deleted public task run command wrappers/specs and query-run CLI tests, nulled runner handoff commands, removed public run-id/force recovery parameters, and kept runner internals deferred for v0.7.
id_source: "generated"
---
## Summary

Gate runner surfaces for v0.7

Remove public runner command and context --run surfaces from current AgentPlane docs and CLI guidance. Context assimilation should create CURATOR tasks for IDE/Codex/human agents now, while runner implementation remains deferred to v0.7.

## Scope

- In scope: Remove public runner command and context --run surfaces from current AgentPlane docs and CLI guidance. Context assimilation should create CURATOR tasks for IDE/Codex/human agents now, while runner implementation remains deferred to v0.7.
- Out of scope: unrelated refactors not required for "Gate runner surfaces for v0.7".

## Plan

1. Remove public context --run parsing/docs/examples so context ingest/learn only creates CURATOR tasks for IDE/Codex/human agents. 2. Remove context.assimilation runner recovery commands/stop rule text and replace with agent handoff/recovery language. 3. Remove task run command family from public CLI catalog/docs for the current release while leaving implementation files for v0.7. 4. Regenerate CLI docs and update user/developer docs. 5. Run targeted context/blueprint/help/docs checks and record verification.

## Verify Steps

1. Targeted Vitest: context release-readiness, blueprint validate/resolve, task new, generated CLI docs, handoff, and help snapshots pass.
2. Static checks: touched TypeScript ESLint, typecheck, knip baseline, generated CLI docs freshness, bootstrap docs, onboarding docs, docs IA/scripts, clone baseline, format:changed, git diff --check, and policy routing pass.
3. Public-surface scan: user/developer CLI/docs and task command catalog/loaders no longer expose task run, context --run, runner.execution, --run-id, or runner recovery commands; remaining task-run references are historical release notes or internal deferred runner modules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-18T10:59:17.895Z — VERIFY — ok

By: CODER

Note: Removed public runner command surfaces and context --run shortcuts for current release; runner implementation remains deferred to v0.7. Verified targeted Vitest, help snapshots, typecheck, ESLint, generated CLI docs, docs bootstrap/onboarding, formatting, diff-check, and policy routing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T10:58:59.830Z, excerpt_hash=sha256:a5fc4b54d3e71da26a3621b479e9edae804f213d8e343646e3d743aa622fae07

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181046-JM9F16-gate-runner-v0-7/.agentplane/tasks/202605181046-JM9F16/blueprint/resolved-snapshot.json
- old_digest: d208ce43673d9e7c6a37ec563e5ab6b7115fa834ef853067cd396351674398b0
- current_digest: d208ce43673d9e7c6a37ec563e5ab6b7115fa834ef853067cd396351674398b0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181046-JM9F16

### 2026-05-18T11:25:34.626Z — VERIFY — ok

By: CODER

Note: Runner public surfaces are gated for v0.7: task run wrappers/tests removed, context --run and runner.execution remain absent, handoff/reclaim no longer emits runner recovery commands, and CI failure from knip was resolved.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-18T11:25:14.120Z, excerpt_hash=sha256:10c5f863ee07d9057d844b39c06b7b528f33df783076cc1e0733d589b772a7e1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605181046-JM9F16-gate-runner-v0-7/.agentplane/tasks/202605181046-JM9F16/blueprint/resolved-snapshot.json
- old_digest: d208ce43673d9e7c6a37ec563e5ab6b7115fa834ef853067cd396351674398b0
- current_digest: d208ce43673d9e7c6a37ec563e5ab6b7115fa834ef853067cd396351674398b0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605181046-JM9F16

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Public CLI docs no longer expose task run, context --run, or runner.execution blueprint choices; remaining task run references are confined to deferred implementation/test files.
  Impact: Context assimilation now creates CURATOR tasks for Codex/IDE/human agents instead of invoking a runner path.
  Resolution: Ready for branch_pr PR review and integration.

- Observation: GitHub Core CI test failed on knip after task run command catalog removal because orphan command wrappers became unused; local verification now passes knip, typecheck, targeted Vitest, docs freshness, bootstrap/onboarding/docs checks, clone baseline, git diff --check, and policy routing.
  Impact: Current user-facing workflow is agent handoff via IDE/Codex/local project folder; runner execution is no longer advertised as an available v0.6 path.
  Resolution: Deleted public task run command wrappers/specs and query-run CLI tests, nulled runner handoff commands, removed public run-id/force recovery parameters, and kept runner internals deferred for v0.7.
