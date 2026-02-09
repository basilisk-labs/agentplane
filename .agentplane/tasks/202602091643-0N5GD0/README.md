---
id: "202602091643-0N5GD0"
title: "Architecture: usecases + ports/adapters + doctor"
result_summary: "Architecture refactor groundwork landed"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "architecture"
  - "cli"
  - "quality"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-09T17:22:25.243Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan executed via downstream tasks: 5RH64E, JS84Q6, 2JKX4T, TXYQAY, PNW35M, 03VNRE, 60R2T4."
verification:
  state: "ok"
  updated_at: "2026-02-09T17:22:32.771Z"
  updated_by: "TESTER"
  note: "Verified: downstream tasks completed and verified; bun run lint and bun run test:full pass at latest integration point."
commit:
  hash: "c91d7be75c8e73e073935503163edaec38455994"
  message: "✅ 60R2T4 close: upgrade agent/auto modes (202602091644-60R2T4) [architecture,code,upgrade]"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: Completed downstream architecture tasks (ports/adapters, PolicyEngine, resolveContext pilot migrations, layering guardrails, doctor, tasks-index v2, upgrade agent/auto modes). bun run lint and bun run test:full pass."
events:
  -
    type: "verify"
    at: "2026-02-09T17:22:32.771Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: downstream tasks completed and verified; bun run lint and bun run test:full pass at latest integration point."
  -
    type: "status"
    at: "2026-02-09T17:22:38.457Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Completed downstream architecture tasks (ports/adapters, PolicyEngine, resolveContext pilot migrations, layering guardrails, doctor, tasks-index v2, upgrade agent/auto modes). bun run lint and bun run test:full pass."
doc_version: 2
doc_updated_at: "2026-02-09T17:22:38.457Z"
doc_updated_by: "ORCHESTRATOR"
description: "Introduce usecase boundaries, central policy evaluation, ports/adapters layering, and a doctor command to enforce structural invariants. Migrate a small set of commands to the new pipeline."
id_source: "generated"
---
## Summary

Introduce a minimal ports/adapters + usecases architecture, centralize policy evaluation in a PolicyEngine, and add a doctor command to enforce structural invariants. Migrate a small set of CLI commands to the new pipeline as a pilot.

## Scope

In scope: packages/agentplane/src/** (new usecases/, ports/, adapters/, doctor command), selected commands (task list/new, upgrade) migrated to usecases. Out of scope: full rewrite of all commands; backends beyond the local task backend.

## Plan

Sequence:\n1) 202602091644-5RH64E Ports/adapters\n2) 202602091644-JS84Q6 PolicyEngine\n3) 202602091644-2JKX4T resolveContext + pilot usecases\n4) 202602091644-TXYQAY Import-layer guardrails\n5) 202602091644-PNW35M Doctor\n6) 202602091644-03VNRE Tasks index v2 + rebuild-index\n7) 202602091644-60R2T4 Upgrade --agent/--auto + anchors\n\nVerification for each task: bun run lint + bun run test:full.

## Risks

Risk: architectural churn and import cycles; mitigate by incremental migration and strict import guardrails with tests. Risk: behavior drift in migrated commands; mitigate with existing CLI tests + new usecase unit tests.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T17:22:32.771Z — VERIFY — ok

By: TESTER

Note: Verified: downstream tasks completed and verified; bun run lint and bun run test:full pass at latest integration point.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:46:46.531Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert per-task commits; migration is incremental so rollback can target only the pilot commands and keep the new modules unused.
