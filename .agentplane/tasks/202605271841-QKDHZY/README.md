---
id: "202605271841-QKDHZY"
title: "Add runner observability foundation"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 9
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
  updated_at: "2026-05-27T19:27:16.970Z"
  updated_by: "CODER"
  note: "Runner observability foundation and review edge cases verified after af9fb0/8bcc follow-up."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-27T19:27:29.779Z"
  updated_by: "EVALUATOR"
  note: "Runner observability foundation satisfies approved scope after review-thread fixes at 8bcc414b9b70: new status/inspect/logs commands are implemented, documented, and verified, including compressed stderr and prepared follow behavior."
  evaluated_sha: "8bcc414b9b7058053596a9f067bc53359c247c51"
  blueprint_digest: "dfa22f3525d2b3fab5460e339ea1e3008930ab86bc4daf42a669514813c8bead"
  evidence_refs:
    - ".agentplane/tasks/202605271841-QKDHZY/README.md"
    - ".agentplane/tasks/202605271841-QKDHZY/quality/20260527-192729779-recovery-context/quality-report.json"
    - ".agentplane/tasks/202605271841-QKDHZY/quality/20260527-192729779-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202605271841-QKDHZY/quality/20260527-192729779-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202605271841-QKDHZY/blueprint/resolved-snapshot.json"
    - "bun test packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-handoff.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts"
    - "bun run typecheck"
    - "bun run lint:core"
    - "bun run docs:cli:check"
    - "bun run format:check"
    - "git diff --check"
    - "GitHub PR #4174 review comments r3313238109 and r3313238117 addressed in 8bcc414b9b70"
  findings:
    - "Resolved review blocker: stderr logs now use trace artifact reader semantics and can read retained gzip artifacts."
    - "Resolved review blocker: task run logs --follow exits cleanly for prepared runs instead of waiting forever."
    - "Coordination and lifecycle authority prompts remain covered for independent Codex runners."
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
  -
    type: "verify"
    at: "2026-05-27T19:27:16.970Z"
    author: "CODER"
    state: "ok"
    note: "Runner observability foundation and review edge cases verified after af9fb0/8bcc follow-up."
doc_version: 3
doc_updated_at: "2026-05-27T19:27:17.039Z"
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

    ### 2026-05-27T19:27:16.970Z — VERIFY — ok

    By: CODER

    Note: Runner observability foundation and review edge cases verified after af9fb0/8bcc follow-up.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T19:08:13.694Z, excerpt_hash=sha256:e4bf63f61ac0ea0a708eccf5a828a80ba158c9643c2ec797cf8bcd1c33241b9d

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

    - Observation: Targeted task-run, handoff, and runner blueprint tests pass; task-run test now covers gzip stderr logs and prepared --follow exit behavior. Typecheck, lint:core, docs:cli:check, format:check, and git diff --check passed.
      Impact: Runner status/inspect/logs are usable for independent Codex runner monitoring without hanging on dry-run prepared state or losing compressed stderr artifacts.
      Resolution: Proceed to hosted checks and integration after review threads are resolved.
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

### 2026-05-27T19:27:16.970Z — VERIFY — ok

By: CODER

Note: Runner observability foundation and review edge cases verified after af9fb0/8bcc follow-up.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T19:08:13.694Z, excerpt_hash=sha256:e4bf63f61ac0ea0a708eccf5a828a80ba158c9643c2ec797cf8bcd1c33241b9d

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

- Observation: Targeted task-run, handoff, and runner blueprint tests pass; task-run test now covers gzip stderr logs and prepared --follow exit behavior. Typecheck, lint:core, docs:cli:check, format:check, and git diff --check passed.
  Impact: Runner status/inspect/logs are usable for independent Codex runner monitoring without hanging on dry-run prepared state or losing compressed stderr artifacts.
  Resolution: Proceed to hosted checks and integration after review threads are resolved.
