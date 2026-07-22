---
id: "202607221118-0BZKB6"
title: "Compile atomic linked wiki during context assimilation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "assimilation"
  - "code"
  - "context"
  - "wiki"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:local:smoke"
  - "bun run test:project agentplane"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-22T11:18:55.691Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-22T12:27:07.231Z"
  updated_by: "CODER"
  note: "Atomic wiki compiler verified: focused synthesis/transaction tests, 115 context tests, downloaded-source E2E with idempotent apply and curated-only search after raw deletion, full agentplane suite 1928/1928, typecheck, format, hotspots, routing, builtin assets, docs freshness, local CI smoke, and doctor passed; doctor only reported two historical unrelated DONE-task hash warnings."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-22T12:35:15.121Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed after PR artifact refresh."
  evaluated_sha: "2e4acedb14c5c3953781a82598de5c488456fbb8"
  blueprint_digest: "dff6a0df0d14b136f572165d92f43cfd73b7a6276d969d275735147244bdbcc1"
  evidence_refs:
    - ".agentplane/tasks/202607221118-0BZKB6/README.md"
    - ".agentplane/tasks/202607221118-0BZKB6/quality/20260722-123515121-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221118-0BZKB6/quality/20260722-123515121-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221118-0BZKB6/quality/20260722-123515121-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221118-0BZKB6/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings; full fast lane and context suites passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved deterministic SGR-to-wiki compiler with atomic formal/wiki commits, stable knowledge atoms, compounding navigation, and end-to-end verification."
events:
  -
    type: "status"
    at: "2026-07-22T11:19:23.138Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved deterministic SGR-to-wiki compiler with atomic formal/wiki commits, stable knowledge atoms, compounding navigation, and end-to-end verification."
  -
    type: "verify"
    at: "2026-07-22T12:27:07.231Z"
    author: "CODER"
    state: "ok"
    note: "Atomic wiki compiler verified: focused synthesis/transaction tests, 115 context tests, downloaded-source E2E with idempotent apply and curated-only search after raw deletion, full agentplane suite 1928/1928, typecheck, format, hotspots, routing, builtin assets, docs freshness, local CI smoke, and doctor passed; doctor only reported two historical unrelated DONE-task hash warnings."
doc_version: 3
doc_updated_at: "2026-07-22T12:27:07.407Z"
doc_updated_by: "CODER"
description: "Implement a deterministic maximum-assimilation wiki compiler based on the persistent LLM Wiki pattern: keep raw sources immutable; treat SGR as the typed intermediate representation; atomically materialize formal artifacts and managed wiki blocks; upsert stable atomic claims into existing canonical pages; preserve human-authored prose; maintain entity links, provenance, contradictions, a content-oriented index, and append-only context/wiki/log.md; validate idempotency, raw-deletion resilience, and human/agent usability. Do not touch agentplane-loops. Release/version work is a separate dependent task."
sections:
  Summary: |-
    Compile atomic linked wiki during context assimilation

    Implement a deterministic maximum-assimilation wiki compiler based on the persistent LLM Wiki pattern: keep raw sources immutable; treat SGR as the typed intermediate representation; atomically materialize formal artifacts and managed wiki blocks; upsert stable atomic claims into existing canonical pages; preserve human-authored prose; maintain entity links, provenance, contradictions, a content-oriented index, and append-only context/wiki/log.md; validate idempotency, raw-deletion resilience, and human/agent usability. Do not touch agentplane-loops. Release/version work is a separate dependent task.
  Scope: |-
    - In scope: Implement a deterministic maximum-assimilation wiki compiler based on the persistent LLM Wiki pattern: keep raw sources immutable; treat SGR as the typed intermediate representation; atomically materialize formal artifacts and managed wiki blocks; upsert stable atomic claims into existing canonical pages; preserve human-authored prose; maintain entity links, provenance, contradictions, a content-oriented index, and append-only context/wiki/log.md; validate idempotency, raw-deletion resilience, and human/agent usability. Do not touch agentplane-loops. Release/version work is a separate dependent task.
    - Out of scope: unrelated refactors not required for "Compile atomic linked wiki during context assimilation".
  Plan: "1. Define the managed wiki compilation contract: SGR item-to-page routing, stable atom ids, entity-to-page links, source-note numbering, conflict/supersession semantics, and preservation boundaries for human-authored prose. 2. Generalize the extraction transaction so derived JSON/JSONL and approved context/wiki files can commit or roll back together. 3. Implement optional wiki synthesis in context extraction apply, including canonical-page upsert, managed atomic-knowledge and source blocks, graph/frontmatter refs, append-only idempotent context/wiki/log.md, and no duplicate pages or atoms on repeat runs. 4. Upgrade wiki indexing to emit one-line summaries and source counts for human and agent navigation. 5. Update the assimilation prompt, task pack, expected artifacts, policy guidance, verifier exemptions/contracts, CLI docs, and generated assets. 6. Add focused unit and end-to-end tests covering first ingest, repeat ingest, existing-page preservation, entity links, contradictions, rollback, logging, index metadata, lint, search after raw deletion, and deterministic output. 7. Run targeted tests, full AgentPlane tests, typecheck, formatting, hotspot/routing checks, smoke CI, doctor, evaluator review, PR checks, and integrate into main."
  Verify Steps: "1. Run focused tests for extraction transaction plus wiki synthesis covering first apply, idempotent repeat apply, existing-page prose preservation, stable atom upsert, entity wikilinks, contradiction/supersession retention, append-only deduplicated log entries, index summaries/source counts, and rollback across derived+wiki paths. 2. Run a maximum-assimilation fixture from immutable raw source through SGR apply with wiki synthesis, lint/index/report/finalize, curated-only reindex, raw deletion, and smoke search; prove the wiki remains sufficient for humans and agents. 3. Run bun run test:project agentplane. 4. Run bun run typecheck. 5. Run bun run format:changed. 6. Run bun run hotspots:check. 7. Run node .agentplane/policy/check-routing.mjs. 8. Run bun run ci:local:smoke. 9. Run agentplane doctor and record unrelated baseline warnings separately."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-22T12:27:07.231Z — VERIFY — ok

    By: CODER

    Note: Atomic wiki compiler verified: focused synthesis/transaction tests, 115 context tests, downloaded-source E2E with idempotent apply and curated-only search after raw deletion, full agentplane suite 1928/1928, typecheck, format, hotspots, routing, builtin assets, docs freshness, local CI smoke, and doctor passed; doctor only reported two historical unrelated DONE-task hash warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T11:19:23.138Z, excerpt_hash=sha256:953f6e4f9eb42dd7cec746847048a45eb15144f11a429165914754f4de426a54

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221118-0BZKB6-compile-atomic-linked-wiki-during-context-assimi/.agentplane/tasks/202607221118-0BZKB6/blueprint/resolved-snapshot.json
    - old_digest: dff6a0df0d14b136f572165d92f43cfd73b7a6276d969d275735147244bdbcc1
    - current_digest: dff6a0df0d14b136f572165d92f43cfd73b7a6276d969d275735147244bdbcc1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221118-0BZKB6

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607221118-0BZKB6
    - diagnostic_command: agentplane pr check 202607221118-0BZKB6
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Compile atomic linked wiki during context assimilation

Implement a deterministic maximum-assimilation wiki compiler based on the persistent LLM Wiki pattern: keep raw sources immutable; treat SGR as the typed intermediate representation; atomically materialize formal artifacts and managed wiki blocks; upsert stable atomic claims into existing canonical pages; preserve human-authored prose; maintain entity links, provenance, contradictions, a content-oriented index, and append-only context/wiki/log.md; validate idempotency, raw-deletion resilience, and human/agent usability. Do not touch agentplane-loops. Release/version work is a separate dependent task.

## Scope

- In scope: Implement a deterministic maximum-assimilation wiki compiler based on the persistent LLM Wiki pattern: keep raw sources immutable; treat SGR as the typed intermediate representation; atomically materialize formal artifacts and managed wiki blocks; upsert stable atomic claims into existing canonical pages; preserve human-authored prose; maintain entity links, provenance, contradictions, a content-oriented index, and append-only context/wiki/log.md; validate idempotency, raw-deletion resilience, and human/agent usability. Do not touch agentplane-loops. Release/version work is a separate dependent task.
- Out of scope: unrelated refactors not required for "Compile atomic linked wiki during context assimilation".

## Plan

1. Define the managed wiki compilation contract: SGR item-to-page routing, stable atom ids, entity-to-page links, source-note numbering, conflict/supersession semantics, and preservation boundaries for human-authored prose. 2. Generalize the extraction transaction so derived JSON/JSONL and approved context/wiki files can commit or roll back together. 3. Implement optional wiki synthesis in context extraction apply, including canonical-page upsert, managed atomic-knowledge and source blocks, graph/frontmatter refs, append-only idempotent context/wiki/log.md, and no duplicate pages or atoms on repeat runs. 4. Upgrade wiki indexing to emit one-line summaries and source counts for human and agent navigation. 5. Update the assimilation prompt, task pack, expected artifacts, policy guidance, verifier exemptions/contracts, CLI docs, and generated assets. 6. Add focused unit and end-to-end tests covering first ingest, repeat ingest, existing-page preservation, entity links, contradictions, rollback, logging, index metadata, lint, search after raw deletion, and deterministic output. 7. Run targeted tests, full AgentPlane tests, typecheck, formatting, hotspot/routing checks, smoke CI, doctor, evaluator review, PR checks, and integrate into main.

## Verify Steps

1. Run focused tests for extraction transaction plus wiki synthesis covering first apply, idempotent repeat apply, existing-page prose preservation, stable atom upsert, entity wikilinks, contradiction/supersession retention, append-only deduplicated log entries, index summaries/source counts, and rollback across derived+wiki paths. 2. Run a maximum-assimilation fixture from immutable raw source through SGR apply with wiki synthesis, lint/index/report/finalize, curated-only reindex, raw deletion, and smoke search; prove the wiki remains sufficient for humans and agents. 3. Run bun run test:project agentplane. 4. Run bun run typecheck. 5. Run bun run format:changed. 6. Run bun run hotspots:check. 7. Run node .agentplane/policy/check-routing.mjs. 8. Run bun run ci:local:smoke. 9. Run agentplane doctor and record unrelated baseline warnings separately.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-22T12:27:07.231Z — VERIFY — ok

By: CODER

Note: Atomic wiki compiler verified: focused synthesis/transaction tests, 115 context tests, downloaded-source E2E with idempotent apply and curated-only search after raw deletion, full agentplane suite 1928/1928, typecheck, format, hotspots, routing, builtin assets, docs freshness, local CI smoke, and doctor passed; doctor only reported two historical unrelated DONE-task hash warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T11:19:23.138Z, excerpt_hash=sha256:953f6e4f9eb42dd7cec746847048a45eb15144f11a429165914754f4de426a54

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221118-0BZKB6-compile-atomic-linked-wiki-during-context-assimi/.agentplane/tasks/202607221118-0BZKB6/blueprint/resolved-snapshot.json
- old_digest: dff6a0df0d14b136f572165d92f43cfd73b7a6276d969d275735147244bdbcc1
- current_digest: dff6a0df0d14b136f572165d92f43cfd73b7a6276d969d275735147244bdbcc1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221118-0BZKB6

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607221118-0BZKB6
- diagnostic_command: agentplane pr check 202607221118-0BZKB6
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
