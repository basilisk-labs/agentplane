---
id: "202605130159-JBY9JS"
title: "Implement local context contract"
result_summary: "pass"
status: "DONE"
priority: "med"
owner: "PLANNER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code,context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T01:59:53.757Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T02:21:28.946Z"
  updated_by: "PLANNER"
  note: "Verified: local context contract implementation is committed and validated with targeted tests, typecheck, schema check, policy routing, framework bootstrap, doctor, and temp-repo smoke."
  attempts: 0
commit:
  hash: "e1a0e88b9f5d8bcd35258c83111bdafd2b9a2daa"
  message: "🚧 JBY9JS task: implement local context contract"
comments:
  -
    author: "CODER"
    body: "Start: implement context ingest command flow (M2) with explicit --changed/--all/--run/--dry-run/--index-only semantics, deterministic manifest task creation, and tests."
  -
    author: "INTEGRATOR"
    body: "Verified: context ingest task creation work is implemented and verification artifacts are recorded. Scope-limited close: task marked DONE in branch_pr flow."
events:
  -
    type: "status"
    at: "2026-05-13T01:59:55.706Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement context ingest command flow (M2) with explicit --changed/--all/--run/--dry-run/--index-only semantics, deterministic manifest task creation, and tests."
  -
    type: "verify"
    at: "2026-05-13T02:10:34.508Z"
    author: "PLANNER"
    state: "ok"
    note: "Build succeeds for the context command catalog and command wiring."
  -
    type: "verify"
    at: "2026-05-13T02:11:46.993Z"
    author: "PLANNER"
    state: "ok"
    note: "Catalog and loader wiring now include context init/reindex/search/show/doctor/verify-task/graph/capability handlers; runtime compiles via bootstrap."
  -
    type: "verify"
    at: "2026-05-13T02:21:28.946Z"
    author: "PLANNER"
    state: "ok"
    note: "Verified: local context contract implementation is committed and validated with targeted tests, typecheck, schema check, policy routing, framework bootstrap, doctor, and temp-repo smoke."
  -
    type: "status"
    at: "2026-05-13T02:21:45.687Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: context ingest task creation work is implemented and verification artifacts are recorded. Scope-limited close: task marked DONE in branch_pr flow."
doc_version: 3
doc_updated_at: "2026-05-13T02:21:45.687Z"
doc_updated_by: "INTEGRATOR"
description: "Implement the v0.6 local context contract surface: layout, schemas, ingest task creation, context.assimilation routing, mutation guard, validators, SQLite projection/search, capability commands, and ACR extension."
sections:
  Summary: |-
    Implement local context contract

    Implement the v0.6 local context contract surface: layout, schemas, ingest task creation, context.assimilation routing, mutation guard, validators, SQLite projection/search, capability commands, and ACR extension.
  Scope: |-
    - In scope: M0-M6 local context contract implementation for AgentPlane CLI/runtime.
    - Out of scope: unrelated release-task drift and hosted PR publication.
  Plan: "Implement M2 of v0.6 context contract in agentplane runtime: add context ingest command with source discovery, hashing, manifest.lock update, context_assimilation task README creation, and explicit execution modes. Keep ingest adapter-neutral and never execute LLM unless --run. Add --dry-run and --index-only semantics with deterministic output."
  Verify Steps: |-
    1. Review the requested outcome for "Implement local context contract". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T02:10:34.508Z — VERIFY — ok

    By: PLANNER

    Note: Build succeeds for the context command catalog and command wiring.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T01:59:55.706Z, excerpt_hash=sha256:e71cbf7b35dee5245922c1a99028061144183ed44ce846e6286fe42bed21081b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605130159-JBY9JS/blueprint/resolved-snapshot.json
    - old_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
    - current_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130159-JBY9JS

    ### 2026-05-13T02:11:46.993Z — VERIFY — ok

    By: PLANNER

    Note: Catalog and loader wiring now include context init/reindex/search/show/doctor/verify-task/graph/capability handlers; runtime compiles via bootstrap.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T02:10:34.517Z, excerpt_hash=sha256:e71cbf7b35dee5245922c1a99028061144183ed44ce846e6286fe42bed21081b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605130159-JBY9JS/blueprint/resolved-snapshot.json
    - old_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
    - current_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130159-JBY9JS

    ### 2026-05-13T02:21:28.946Z — VERIFY — ok

    By: PLANNER

    Note: Verified: local context contract implementation is committed and validated with targeted tests, typecheck, schema check, policy routing, framework bootstrap, doctor, and temp-repo smoke.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T02:11:47.001Z, excerpt_hash=sha256:e71cbf7b35dee5245922c1a99028061144183ed44ce846e6286fe42bed21081b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605130159-JBY9JS/blueprint/resolved-snapshot.json
    - old_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
    - current_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130159-JBY9JS

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The implementation now covers the local context contract surface through M6, including real SQLite/FTS projection and ACR context extension.
      Impact: Hosted PR publication remains separate from local implementation verification.
      Resolution: Committed implementation as e1a0e88b9f5d8bcd35258c83111bdafd2b9a2daa with unrelated Q4N03A drift left unstaged.
id_source: "generated"
---
## Summary

Implement local context contract

Implement the v0.6 local context contract surface: layout, schemas, ingest task creation, context.assimilation routing, mutation guard, validators, SQLite projection/search, capability commands, and ACR extension.

## Scope

- In scope: M0-M6 local context contract implementation for AgentPlane CLI/runtime.
- Out of scope: unrelated release-task drift and hosted PR publication.

## Plan

    Implement the v0.6 local context contract in AgentPlane runtime: add context workspace initialization, schemas, context ingest task creation, context.assimilation blueprint routing, mutation guard verification, derived knowledge validators, SQLite projection/search/show/graph commands, capability validation/search/discovery, and ACR context extension. Keep ingest adapter-neutral and never execute LLM unless --run.

## Verify Steps

1. Review the requested outcome for "Implement local context contract". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T02:10:34.508Z — VERIFY — ok

By: PLANNER

Note: Build succeeds for the context command catalog and command wiring.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T01:59:55.706Z, excerpt_hash=sha256:e71cbf7b35dee5245922c1a99028061144183ed44ce846e6286fe42bed21081b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605130159-JBY9JS/blueprint/resolved-snapshot.json
- old_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
- current_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130159-JBY9JS

### 2026-05-13T02:11:46.993Z — VERIFY — ok

By: PLANNER

Note: Catalog and loader wiring now include context init/reindex/search/show/doctor/verify-task/graph/capability handlers; runtime compiles via bootstrap.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T02:10:34.517Z, excerpt_hash=sha256:e71cbf7b35dee5245922c1a99028061144183ed44ce846e6286fe42bed21081b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605130159-JBY9JS/blueprint/resolved-snapshot.json
- old_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
- current_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130159-JBY9JS

### 2026-05-13T02:21:28.946Z — VERIFY — ok

By: PLANNER

Note: Verified: local context contract implementation is committed and validated with targeted tests, typecheck, schema check, policy routing, framework bootstrap, doctor, and temp-repo smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T02:11:47.001Z, excerpt_hash=sha256:e71cbf7b35dee5245922c1a99028061144183ed44ce846e6286fe42bed21081b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605130159-JBY9JS/blueprint/resolved-snapshot.json
- old_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
- current_digest: 3ec26b3a53ec5af897c06cb3d1d1f266fa041f311197ed58433bac2e4594ab06
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130159-JBY9JS

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

    - Observation: The implementation now covers the local context contract surface through M6, including real SQLite/FTS projection and ACR context extension.
      Impact: Hosted PR publication remains separate from local implementation verification.
      Resolution: Committed implementation as e1a0e88b9f5d8bcd35258c83111bdafd2b9a2daa with unrelated Q4N03A drift left unstaged.
