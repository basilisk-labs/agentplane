---
id: "202605181046-JM9F16"
title: "Gate runner surfaces for v0.7"
status: "DOING"
priority: "high"
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
  updated_at: "2026-05-18T10:46:26.773Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-18T10:59:17.895Z"
  updated_by: "CODER"
  note: "Removed public runner command surfaces and context --run shortcuts for current release; runner implementation remains deferred to v0.7. Verified targeted Vitest, help snapshots, typecheck, ESLint, generated CLI docs, docs bootstrap/onboarding, formatting, diff-check, and policy routing."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Remove public runner command surfaces and context run shortcuts for the current release, keeping runner implementation deferred to v0.7 while preserving CURATOR task creation for IDE and Codex agents."
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
doc_version: 3
doc_updated_at: "2026-05-18T10:59:17.907Z"
doc_updated_by: "CODER"
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
    1. Targeted Vitest: context release-readiness, blueprint validate/resolve, task new, generated CLI docs, and help snapshots pass.
    2. Static checks: touched TypeScript ESLint, typecheck, generated CLI docs freshness, bootstrap docs, onboarding docs, format:changed, git diff --check, and policy routing pass.
    3. Public-surface scan: generated CLI docs no longer expose task run, context --run, or runner.execution blueprint choices; remaining task run references are confined to deferred implementation/test files.
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Public CLI docs no longer expose task run, context --run, or runner.execution blueprint choices; remaining task run references are confined to deferred implementation/test files.
      Impact: Context assimilation now creates CURATOR tasks for Codex/IDE/human agents instead of invoking a runner path.
      Resolution: Ready for branch_pr PR review and integration.
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

1. Targeted Vitest: context release-readiness, blueprint validate/resolve, task new, generated CLI docs, and help snapshots pass.
2. Static checks: touched TypeScript ESLint, typecheck, generated CLI docs freshness, bootstrap docs, onboarding docs, format:changed, git diff --check, and policy routing pass.
3. Public-surface scan: generated CLI docs no longer expose task run, context --run, or runner.execution blueprint choices; remaining task run references are confined to deferred implementation/test files.

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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Public CLI docs no longer expose task run, context --run, or runner.execution blueprint choices; remaining task run references are confined to deferred implementation/test files.
  Impact: Context assimilation now creates CURATOR tasks for Codex/IDE/human agents instead of invoking a runner path.
  Resolution: Ready for branch_pr PR review and integration.
