---
id: "202605191736-EQBZ4M"
title: "Add task observations journal"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evidence"
  - "workflow"
verify:
  - "bun run --filter=@agentplaneorg/core typecheck"
  - "bun run --filter=agentplane typecheck"
  - "bun run schemas:check"
  - "bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-artifact-schema.test.ts"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/observations.unit.test.ts"
  - "ap task observations check 202605191736-EQBZ4M"
  - "bun run docs:cli:check"
  - "bun run format:changed"
  - "bun run spec:examples:check"
  - "node .agentplane/policy/check-routing.mjs"
  - "ap doctor"
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T17:36:23.512Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-19T18:08:20.394Z"
  updated_by: "EVALUATOR"
  note: "Quality review refreshed for commit 69ca9c004. The hotspot-budget follow-up removed the new runtime hotspot warning without changing the core observations artifact contract; focused checks and CLI smoke remain green."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-19T18:08:20.394Z"
  updated_by: "EVALUATOR"
  note: "Quality review refreshed for commit 69ca9c004. The hotspot-budget follow-up removed the new runtime hotspot warning without changing the core observations artifact contract; focused checks and CLI smoke remain green."
  evaluated_sha: "69ca9c0044f482f1d8b0d631885da7d61f7e5eef"
  blueprint_digest: "e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6"
  evidence_refs:
    - ".agentplane/tasks/202605191736-EQBZ4M/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191736-EQBZ4M-task-observations/.agentplane/tasks/202605191736-EQBZ4M/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing a structured task observations journal as a task-local JSONL artifact with CLI support, schema validation, and triage-oriented downstream use."
events:
  -
    type: "status"
    at: "2026-05-19T17:36:43.262Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing a structured task observations journal as a task-local JSONL artifact with CLI support, schema validation, and triage-oriented downstream use."
  -
    type: "verify"
    at: "2026-05-19T17:51:51.412Z"
    author: "CODER"
    state: "ok"
    note: "Verified task observations journal implementation. Checks passed: core typecheck; agentplane typecheck; schemas:check; focused core schema test; focused task observations unit test; CLI smoke add/list/check/triage; docs:cli:check; format:changed; spec:examples:check; policy routing; ap doctor."
  -
    type: "verify"
    at: "2026-05-19T17:53:22.821Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality review passed for implementation commit bb2904022. Reviewed structured observations journal schema, CLI registration, ACR evidence integration, docs, and verification evidence; no blocking observations or unresolved drift found."
  -
    type: "verify"
    at: "2026-05-19T18:08:09.762Z"
    author: "CODER"
    state: "ok"
    note: "Verified follow-up hotspot-budget change. Checks passed: agentplane typecheck, observations unit test, hotspots:check, agentplane build, docs:cli:generate/check, and CLI smoke observations list."
  -
    type: "verify"
    at: "2026-05-19T18:08:20.394Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Quality review refreshed for commit 69ca9c004. The hotspot-budget follow-up removed the new runtime hotspot warning without changing the core observations artifact contract; focused checks and CLI smoke remain green."
doc_version: 3
doc_updated_at: "2026-05-19T18:08:20.424Z"
doc_updated_by: "CODER"
description: "Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations."
sections:
  Summary: |-
    Add task observations journal

    Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations.
  Scope: |-
    - In scope: Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations.
    - Out of scope: unrelated refactors not required for "Add task observations journal".
  Plan: |-
    1. Inspect existing task artifact, ACR, Findings, and incidents promotion surfaces.
    2. Add a canonical task-local observations.jsonl schema and runtime helpers.
    3. Add CLI commands to append/list/check/triage observations without overloading README Findings or ACR.
    4. Document the artifact contract and include it in evidence/ACR surfaces where appropriate.
    5. Verify with focused unit/CLI tests plus policy/schema checks.
  Verify Steps: |-
    1. Run `bun run --filter=@agentplaneorg/core typecheck`. Expected: core typecheck exits 0.
    2. Run `bun run --filter=agentplane typecheck`. Expected: CLI package typecheck exits 0.
    3. Run `bun run schemas:check`. Expected: generated schemas, including task-observation.schema.json, are in sync.
    4. Run focused tests: `bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-artifact-schema.test.ts` and `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/observations.unit.test.ts`. Expected: all tests pass.
    5. Run CLI smoke: `ap task observations add/list/check/triage 202605191736-EQBZ4M`. Expected: observations.jsonl entry is written, listed, validated, and triaged.
    6. Run `bun run docs:cli:check`, `bun run format:changed`, `bun run spec:examples:check`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: all checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-19T17:51:51.412Z — VERIFY — ok

    By: CODER

    Note: Verified task observations journal implementation. Checks passed: core typecheck; agentplane typecheck; schemas:check; focused core schema test; focused task observations unit test; CLI smoke add/list/check/triage; docs:cli:check; format:changed; spec:examples:check; policy routing; ap doctor.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:48:48.386Z, excerpt_hash=sha256:528cca27476a70164b73ba14408343c11d85eadfc76641d4a766c337e97f0280

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191736-EQBZ4M-task-observations/.agentplane/tasks/202605191736-EQBZ4M/blueprint/resolved-snapshot.json
    - old_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
    - current_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191736-EQBZ4M

    ### 2026-05-19T17:53:22.821Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality review passed for implementation commit bb2904022. Reviewed structured observations journal schema, CLI registration, ACR evidence integration, docs, and verification evidence; no blocking observations or unresolved drift found.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:51:51.522Z, excerpt_hash=sha256:528cca27476a70164b73ba14408343c11d85eadfc76641d4a766c337e97f0280

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191736-EQBZ4M-task-observations/.agentplane/tasks/202605191736-EQBZ4M/blueprint/resolved-snapshot.json
    - old_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
    - current_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191736-EQBZ4M

    ### 2026-05-19T18:08:09.762Z — VERIFY — ok

    By: CODER

    Note: Verified follow-up hotspot-budget change. Checks passed: agentplane typecheck, observations unit test, hotspots:check, agentplane build, docs:cli:generate/check, and CLI smoke observations list.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:53:22.889Z, excerpt_hash=sha256:528cca27476a70164b73ba14408343c11d85eadfc76641d4a766c337e97f0280

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191736-EQBZ4M-task-observations/.agentplane/tasks/202605191736-EQBZ4M/blueprint/resolved-snapshot.json
    - old_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
    - current_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191736-EQBZ4M

    ### 2026-05-19T18:08:20.394Z — VERIFY — ok

    By: EVALUATOR

    Note: Quality review refreshed for commit 69ca9c004. The hotspot-budget follow-up removed the new runtime hotspot warning without changing the core observations artifact contract; focused checks and CLI smoke remain green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T18:08:09.808Z, excerpt_hash=sha256:528cca27476a70164b73ba14408343c11d85eadfc76641d4a766c337e97f0280

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191736-EQBZ4M-task-observations/.agentplane/tasks/202605191736-EQBZ4M/blueprint/resolved-snapshot.json
    - old_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
    - current_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605191736-EQBZ4M

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add task observations journal

Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations.

## Scope

- In scope: Implement a structured task-local observations.jsonl artifact for agent-discovered spec gaps, decisions, risks, issue candidates, incident candidates, context candidates, and agent improvement candidates, with CLI support for adding, listing, checking, and triaging observations.
- Out of scope: unrelated refactors not required for "Add task observations journal".

## Plan

1. Inspect existing task artifact, ACR, Findings, and incidents promotion surfaces.
2. Add a canonical task-local observations.jsonl schema and runtime helpers.
3. Add CLI commands to append/list/check/triage observations without overloading README Findings or ACR.
4. Document the artifact contract and include it in evidence/ACR surfaces where appropriate.
5. Verify with focused unit/CLI tests plus policy/schema checks.

## Verify Steps

1. Run `bun run --filter=@agentplaneorg/core typecheck`. Expected: core typecheck exits 0.
2. Run `bun run --filter=agentplane typecheck`. Expected: CLI package typecheck exits 0.
3. Run `bun run schemas:check`. Expected: generated schemas, including task-observation.schema.json, are in sync.
4. Run focused tests: `bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks/task-artifact-schema.test.ts` and `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/observations.unit.test.ts`. Expected: all tests pass.
5. Run CLI smoke: `ap task observations add/list/check/triage 202605191736-EQBZ4M`. Expected: observations.jsonl entry is written, listed, validated, and triaged.
6. Run `bun run docs:cli:check`, `bun run format:changed`, `bun run spec:examples:check`, `node .agentplane/policy/check-routing.mjs`, and `ap doctor`. Expected: all checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-19T17:51:51.412Z — VERIFY — ok

By: CODER

Note: Verified task observations journal implementation. Checks passed: core typecheck; agentplane typecheck; schemas:check; focused core schema test; focused task observations unit test; CLI smoke add/list/check/triage; docs:cli:check; format:changed; spec:examples:check; policy routing; ap doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:48:48.386Z, excerpt_hash=sha256:528cca27476a70164b73ba14408343c11d85eadfc76641d4a766c337e97f0280

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191736-EQBZ4M-task-observations/.agentplane/tasks/202605191736-EQBZ4M/blueprint/resolved-snapshot.json
- old_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
- current_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191736-EQBZ4M

### 2026-05-19T17:53:22.821Z — VERIFY — ok

By: EVALUATOR

Note: Quality review passed for implementation commit bb2904022. Reviewed structured observations journal schema, CLI registration, ACR evidence integration, docs, and verification evidence; no blocking observations or unresolved drift found.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:51:51.522Z, excerpt_hash=sha256:528cca27476a70164b73ba14408343c11d85eadfc76641d4a766c337e97f0280

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191736-EQBZ4M-task-observations/.agentplane/tasks/202605191736-EQBZ4M/blueprint/resolved-snapshot.json
- old_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
- current_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191736-EQBZ4M

### 2026-05-19T18:08:09.762Z — VERIFY — ok

By: CODER

Note: Verified follow-up hotspot-budget change. Checks passed: agentplane typecheck, observations unit test, hotspots:check, agentplane build, docs:cli:generate/check, and CLI smoke observations list.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T17:53:22.889Z, excerpt_hash=sha256:528cca27476a70164b73ba14408343c11d85eadfc76641d4a766c337e97f0280

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191736-EQBZ4M-task-observations/.agentplane/tasks/202605191736-EQBZ4M/blueprint/resolved-snapshot.json
- old_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
- current_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191736-EQBZ4M

### 2026-05-19T18:08:20.394Z — VERIFY — ok

By: EVALUATOR

Note: Quality review refreshed for commit 69ca9c004. The hotspot-budget follow-up removed the new runtime hotspot warning without changing the core observations artifact contract; focused checks and CLI smoke remain green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-19T18:08:09.808Z, excerpt_hash=sha256:528cca27476a70164b73ba14408343c11d85eadfc76641d4a766c337e97f0280

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605191736-EQBZ4M-task-observations/.agentplane/tasks/202605191736-EQBZ4M/blueprint/resolved-snapshot.json
- old_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
- current_digest: e9d2ac6b284e899336436829c48477751c34f000feaec95129567d714a931dc6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605191736-EQBZ4M

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
