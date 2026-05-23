---
id: "202605221745-8W56N1"
title: "Add source confidence labels to agent route output"
result_summary: "Merged via PR #4066."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605221726-8SA692"
tags:
  - "cli"
  - "code"
  - "github"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Confirm default route commands remain local-only and remote checks require an explicit flag."
  - "Confirm text output stays compact while JSON output exposes source_confidence per critical field."
  - "Run route-decision tests covering local, cached metadata, stale metadata, and remote-checked source confidence labels."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:45:14.504Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-23T03:02:26.078Z"
  updated_by: "EVALUATOR"
  note: "Evaluator pass: JSON route outputs expose source_confidence for route, next_action, blockers, and remote; default status/next-action commands are local-only; explicit --remote path is covered by tests and smoke."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-23T03:02:26.078Z"
  updated_by: "EVALUATOR"
  note: "Evaluator pass: JSON route outputs expose source_confidence for route, next_action, blockers, and remote; default status/next-action commands are local-only; explicit --remote path is covered by tests and smoke."
  evaluated_sha: "ecdd8be371c870e65b27326a14b94a0810ba9744"
  blueprint_digest: "bdc62efdf3f8fad4fc1dfbd130775a4006f534725fdabce7a128a7b54d4181c4"
  evidence_refs:
    - ".agentplane/tasks/202605221745-8W56N1/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-8W56N1-source-confidence-labels/.agentplane/tasks/202605221745-8W56N1/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "259d84c792736e7d4ad7f8c90b61f53277766358"
  message: "Merge pull request #4066 from basilisk-labs/task/202605221745-8W56N1/source-confidence-labels"
comments:
  -
    author: "CODER"
    body: "Start: implement source confidence labels for agent route output with local/default and explicit remote evidence coverage."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4066 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-23T02:56:35.957Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement source confidence labels for agent route output with local/default and explicit remote evidence coverage."
  -
    type: "verify"
    at: "2026-05-23T03:02:13.364Z"
    author: "CODER"
    state: "ok"
    note: "Implemented route source confidence labels for task status --route --json and task next-action --json; remote lookup is skipped by default and requires --remote; text output remains compact."
  -
    type: "verify"
    at: "2026-05-23T03:02:26.078Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator pass: JSON route outputs expose source_confidence for route, next_action, blockers, and remote; default status/next-action commands are local-only; explicit --remote path is covered by tests and smoke."
  -
    type: "status"
    at: "2026-05-23T03:19:46.872Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4066 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-23T03:19:46.881Z"
doc_updated_by: "INTEGRATOR"
description: "Label route, PR, close-tail, task, and verification fields by source and freshness so agents can tell local, cached, stale, and remote-checked context apart before mutating state."
sections:
  Summary: |-
    Add source confidence labels to agent route output

    Label route, PR, close-tail, task, and verification fields by source and freshness so agents can tell local, cached, stale, and remote-checked context apart before mutating state.
  Scope: |-
    - In scope: Label route, PR, close-tail, task, and verification fields by source and freshness so agents can tell local, cached, stale, and remote-checked context apart before mutating state.
    - Out of scope: unrelated refactors not required for "Add source confidence labels to agent route output".
  Plan: "Extend route and hosted lifecycle output with explicit source confidence labels. The goal is to reduce false certainty: agents should know whether a field came from local task metadata, local git, cached PR artifacts, or an explicit remote check."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `Run route-decision tests covering local, cached metadata, stale metadata, and remote-checked source confidence labels.`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `Confirm text output stays compact while JSON output exposes source_confidence per critical field.`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `Confirm default route commands remain local-only and remote checks require an explicit flag.`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-23T03:02:13.364Z — VERIFY — ok

    By: CODER

    Note: Implemented route source confidence labels for task status --route --json and task next-action --json; remote lookup is skipped by default and requires --remote; text output remains compact.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T02:56:35.957Z, excerpt_hash=sha256:34112a79d377c3daeb4c006810f840b65acefb56e8a85bde31ba9c1ea9a7616c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-8W56N1-source-confidence-labels/.agentplane/tasks/202605221745-8W56N1/blueprint/resolved-snapshot.json
    - old_digest: bdc62efdf3f8fad4fc1dfbd130775a4006f534725fdabce7a128a7b54d4181c4
    - current_digest: bdc62efdf3f8fad4fc1dfbd130775a4006f534725fdabce7a128a7b54d4181c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221745-8W56N1

    ### 2026-05-23T03:02:26.078Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator pass: JSON route outputs expose source_confidence for route, next_action, blockers, and remote; default status/next-action commands are local-only; explicit --remote path is covered by tests and smoke.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T03:02:13.390Z, excerpt_hash=sha256:34112a79d377c3daeb4c006810f840b65acefb56e8a85bde31ba9c1ea9a7616c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-8W56N1-source-confidence-labels/.agentplane/tasks/202605221745-8W56N1/blueprint/resolved-snapshot.json
    - old_digest: bdc62efdf3f8fad4fc1dfbd130775a4006f534725fdabce7a128a7b54d4181c4
    - current_digest: bdc62efdf3f8fad4fc1dfbd130775a4006f534725fdabce7a128a7b54d4181c4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221745-8W56N1

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Local smoke: status/next-action JSON report route computed_local high confidence and remote_skipped skipped; --remote downgrades route to medium and remote to low when provider state is unavailable.
      Impact: Agents can distinguish local/computed route data from explicit remote/provider state without triggering default remote calls.
      Resolution: Use --remote only when hosted PR/check/review truth is required.

    - Observation: Route-decision suite passed 8 tests, typecheck passed, CLI docs check passed, lint/format passed, bootstrap passed, knip and task-scope checks passed.
      Impact: Route output now carries source/freshness/confidence labels without increasing text output noise.
      Resolution: Proceed to PR publication and hosted checks.
id_source: "generated"
---
## Summary

Add source confidence labels to agent route output

Label route, PR, close-tail, task, and verification fields by source and freshness so agents can tell local, cached, stale, and remote-checked context apart before mutating state.

## Scope

- In scope: Label route, PR, close-tail, task, and verification fields by source and freshness so agents can tell local, cached, stale, and remote-checked context apart before mutating state.
- Out of scope: unrelated refactors not required for "Add source confidence labels to agent route output".

## Plan

Extend route and hosted lifecycle output with explicit source confidence labels. The goal is to reduce false certainty: agents should know whether a field came from local task metadata, local git, cached PR artifacts, or an explicit remote check.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `Run route-decision tests covering local, cached metadata, stale metadata, and remote-checked source confidence labels.`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `Confirm text output stays compact while JSON output exposes source_confidence per critical field.`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `Confirm default route commands remain local-only and remote checks require an explicit flag.`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-23T03:02:13.364Z — VERIFY — ok

By: CODER

Note: Implemented route source confidence labels for task status --route --json and task next-action --json; remote lookup is skipped by default and requires --remote; text output remains compact.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T02:56:35.957Z, excerpt_hash=sha256:34112a79d377c3daeb4c006810f840b65acefb56e8a85bde31ba9c1ea9a7616c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-8W56N1-source-confidence-labels/.agentplane/tasks/202605221745-8W56N1/blueprint/resolved-snapshot.json
- old_digest: bdc62efdf3f8fad4fc1dfbd130775a4006f534725fdabce7a128a7b54d4181c4
- current_digest: bdc62efdf3f8fad4fc1dfbd130775a4006f534725fdabce7a128a7b54d4181c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221745-8W56N1

### 2026-05-23T03:02:26.078Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator pass: JSON route outputs expose source_confidence for route, next_action, blockers, and remote; default status/next-action commands are local-only; explicit --remote path is covered by tests and smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-23T03:02:13.390Z, excerpt_hash=sha256:34112a79d377c3daeb4c006810f840b65acefb56e8a85bde31ba9c1ea9a7616c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221745-8W56N1-source-confidence-labels/.agentplane/tasks/202605221745-8W56N1/blueprint/resolved-snapshot.json
- old_digest: bdc62efdf3f8fad4fc1dfbd130775a4006f534725fdabce7a128a7b54d4181c4
- current_digest: bdc62efdf3f8fad4fc1dfbd130775a4006f534725fdabce7a128a7b54d4181c4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221745-8W56N1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Local smoke: status/next-action JSON report route computed_local high confidence and remote_skipped skipped; --remote downgrades route to medium and remote to low when provider state is unavailable.
  Impact: Agents can distinguish local/computed route data from explicit remote/provider state without triggering default remote calls.
  Resolution: Use --remote only when hosted PR/check/review truth is required.

- Observation: Route-decision suite passed 8 tests, typecheck passed, CLI docs check passed, lint/format passed, bootstrap passed, knip and task-scope checks passed.
  Impact: Route output now carries source/freshness/confidence labels without increasing text output noise.
  Resolution: Proceed to PR publication and hosted checks.
