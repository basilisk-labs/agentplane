---
id: "202605271841-QKDHZY"
title: "Add runner observability foundation"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-27T18:41:56.379Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-27T19:08:13.629Z"
  updated_by: "CODER"
  note: "Runner observability foundation implemented and locally verified."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement runner observability foundation in the dedicated task worktree, limited to runner CLI/status surfaces, bootstrap coordination contract, tests, and user docs."
events:
  -
    type: "status"
    at: "2026-05-27T18:42:53.649Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement runner observability foundation in the dedicated task worktree, limited to runner CLI/status surfaces, bootstrap coordination contract, tests, and user docs."
  -
    type: "verify"
    at: "2026-05-27T19:08:13.629Z"
    author: "CODER"
    state: "ok"
    note: "Runner observability foundation implemented and locally verified."
doc_version: 3
doc_updated_at: "2026-05-27T19:08:13.694Z"
doc_updated_by: "CODER"
description: "Add public runner status/inspect/logs surfaces and coordination/authority prompt contracts so independent Codex task runners can be monitored safely before adding parallelization recipes."
sections:
  Summary: |-
    Add runner observability foundation

    Add public runner status/inspect/logs surfaces and coordination/authority prompt contracts so independent Codex task runners can be monitored safely before adding parallelization recipes.
  Scope: |-
    - In scope: Add public runner status/inspect/logs surfaces and coordination/authority prompt contracts so independent Codex task runners can be monitored safely before adding parallelization recipes.
    - Out of scope: unrelated refactors not required for "Add runner observability foundation".
  Plan: |-
    1. Inspect existing runner artifact/state internals and public CLI command registration patterns.
    2. Add public task runner observability commands for latest/explicit run status, inspect, and logs/follow using existing runner state/events/trace artifacts.
    3. Add runner coordination contracts to bootstrap/prompt output so child runners respect scoped writes and lifecycle authority.
    4. Update generated/user docs and focused tests for status/inspect/logs and bootstrap coordination wording.
    5. Verify with targeted tests, typecheck, docs CLI freshness, policy routing, doctor, and hosted PR checks before merge.
  Verify Steps: |-
    1. Run targeted CLI/runner tests covering task run status, inspect, logs/follow, and existing task run dry-run behavior. Expected: all pass.
    2. Run runner bootstrap tests covering Codex /goal and coordination/lifecycle authority wording. Expected: all pass and non-Codex behavior stays stable.
    3. Run typecheck and CLI docs freshness checks. Expected: no type errors and generated command docs are up to date.
    4. Run policy routing and doctor. Expected: policy routing OK and doctor has no errors.
    5. Confirm PR hosted checks are green before merge.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-27T19:08:13.629Z — VERIFY — ok

    By: CODER

    Note: Runner observability foundation implemented and locally verified.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T18:43:51.014Z, excerpt_hash=sha256:e4bf63f61ac0ea0a708eccf5a828a80ba158c9643c2ec797cf8bcd1c33241b9d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271841-QKDHZY-runner-observability-foundation/.agentplane/tasks/202605271841-QKDHZY/blueprint/resolved-snapshot.json
    - old_digest: dfa22f3525d2b3fab5460e339ea1e3008930ab86bc4daf42a669514813c8bead
    - current_digest: dfa22f3525d2b3fab5460e339ea1e3008930ab86bc4daf42a669514813c8bead
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605271841-QKDHZY

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands: targeted task-run/task-handoff/bootstrap tests pass (7 pass, 0 fail); bun run typecheck pass; bun run lint:core pass; bun run docs:cli:check pass; node .agentplane/policy/check-routing.mjs pass; ap doctor pass with info-only findings; bun run format:check pass; git diff --check pass.
      Impact: Covers public task runner status/inspect/logs CLI, handoff runner next-action hints, Codex bootstrap coordination/lifecycle authority wording, generated CLI docs, and user docs.
      Resolution: No local verification gaps before PR hosted checks.
id_source: "generated"
---
## Summary

Add runner observability foundation

Add public runner status/inspect/logs surfaces and coordination/authority prompt contracts so independent Codex task runners can be monitored safely before adding parallelization recipes.

## Scope

- In scope: Add public runner status/inspect/logs surfaces and coordination/authority prompt contracts so independent Codex task runners can be monitored safely before adding parallelization recipes.
- Out of scope: unrelated refactors not required for "Add runner observability foundation".

## Plan

1. Inspect existing runner artifact/state internals and public CLI command registration patterns.
2. Add public task runner observability commands for latest/explicit run status, inspect, and logs/follow using existing runner state/events/trace artifacts.
3. Add runner coordination contracts to bootstrap/prompt output so child runners respect scoped writes and lifecycle authority.
4. Update generated/user docs and focused tests for status/inspect/logs and bootstrap coordination wording.
5. Verify with targeted tests, typecheck, docs CLI freshness, policy routing, doctor, and hosted PR checks before merge.

## Verify Steps

1. Run targeted CLI/runner tests covering task run status, inspect, logs/follow, and existing task run dry-run behavior. Expected: all pass.
2. Run runner bootstrap tests covering Codex /goal and coordination/lifecycle authority wording. Expected: all pass and non-Codex behavior stays stable.
3. Run typecheck and CLI docs freshness checks. Expected: no type errors and generated command docs are up to date.
4. Run policy routing and doctor. Expected: policy routing OK and doctor has no errors.
5. Confirm PR hosted checks are green before merge.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-27T19:08:13.629Z — VERIFY — ok

By: CODER

Note: Runner observability foundation implemented and locally verified.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T18:43:51.014Z, excerpt_hash=sha256:e4bf63f61ac0ea0a708eccf5a828a80ba158c9643c2ec797cf8bcd1c33241b9d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271841-QKDHZY-runner-observability-foundation/.agentplane/tasks/202605271841-QKDHZY/blueprint/resolved-snapshot.json
- old_digest: dfa22f3525d2b3fab5460e339ea1e3008930ab86bc4daf42a669514813c8bead
- current_digest: dfa22f3525d2b3fab5460e339ea1e3008930ab86bc4daf42a669514813c8bead
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605271841-QKDHZY

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands: targeted task-run/task-handoff/bootstrap tests pass (7 pass, 0 fail); bun run typecheck pass; bun run lint:core pass; bun run docs:cli:check pass; node .agentplane/policy/check-routing.mjs pass; ap doctor pass with info-only findings; bun run format:check pass; git diff --check pass.
  Impact: Covers public task runner status/inspect/logs CLI, handoff runner next-action hints, Codex bootstrap coordination/lifecycle authority wording, generated CLI docs, and user docs.
  Resolution: No local verification gaps before PR hosted checks.
