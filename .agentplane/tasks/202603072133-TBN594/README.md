---
id: "202603072133-TBN594"
title: "Tighten incidents log to strong entries only"
result_summary: "Restricted the incident log to high-signal entries and encoded the stronger incident-entry contract in governance and direct-workflow guidance."
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T21:34:36.654Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-07T21:37:02.623Z"
  updated_by: "TESTER"
  note: "Verified: incidents.md now keeps only the strongest entries, governance forbids weak/local notes in the incident log, routing passed, and doctor stayed green aside from known historical archive warnings."
commit:
  hash: "f3183e229098d8368053127bc7d6230ded9ce041"
  message: "📝 TBN594 policy: tighten incidents log contract"
comments:
  -
    author: "DOCS"
    body: "Start: tighten the incidents contract, keep only the strongest incident rules, and verify routing plus doctor after the trim."
  -
    author: "DOCS"
    body: "Verified: incidents.md now keeps only strong incident classes, governance forbids weak/local notes in the incident log, routing passed, and doctor stayed green aside from known historical archive warnings."
events:
  -
    type: "status"
    at: "2026-03-07T21:34:40.332Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: tighten the incidents contract, keep only the strongest incident rules, and verify routing plus doctor after the trim."
  -
    type: "verify"
    at: "2026-03-07T21:37:02.623Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: incidents.md now keeps only the strongest entries, governance forbids weak/local notes in the incident log, routing passed, and doctor stayed green aside from known historical archive warnings."
  -
    type: "status"
    at: "2026-03-07T21:37:25.051Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: incidents.md now keeps only strong incident classes, governance forbids weak/local notes in the incident log, routing passed, and doctor stayed green aside from known historical archive warnings."
doc_version: 2
doc_updated_at: "2026-03-07T21:37:25.051Z"
doc_updated_by: "DOCS"
description: "Keep only high-value incident rules in .agentplane/policy/incidents.md and update the incidents contract so only strong, actionable, enforced entries belong there."
id_source: "generated"
---
## Summary

Restrict incidents.md to only strong, high-signal incident rules and remove weaker entries that add memory but little operational value.

## Scope

In scope: .agentplane/policy/incidents.md, governance/load guidance that defines incident usage, and this task README. Out of scope: historical archive repair, doctor algorithm changes, and task metadata migration.

## Plan

1. Tighten the incidents log entry contract so only high-signal, enforced, high-impact entries belong there. 2. Remove medium-strength entries from incidents.md and keep only the strongest, system-shaping incident classes. 3. Verify routing/doctor/docs consistency and close the task.

## Risks

Main risk: deleting incident memory that should have remained local context. Mitigation: keep entries only when they encode repeatable, non-obvious failure classes with enforcement; weaker items can live in docs or diagnostics instead.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK after tightening incidents contract and trimming weaker entries
Scope: .agentplane/policy/incidents.md, .agentplane/policy/governance.md, .agentplane/policy/workflow.direct.md
Links: .agentplane/policy/incidents.md, .agentplane/policy/governance.md

Command: agentplane doctor
Result: pass
Evidence: doctor OK; only historical task archive warnings remain, unrelated to the incidents trim
Scope: repository policy/runtime health
Links: .agentplane/policy/incidents.md

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T21:37:02.623Z — VERIFY — ok

By: TESTER

Note: Verified: incidents.md now keeps only the strongest entries, governance forbids weak/local notes in the incident log, routing passed, and doctor stayed green aside from known historical archive warnings.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T21:37:02.306Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert incidents/governance text if the stricter contract proves too narrow or removes an entry later needed for recovery.

## Notes

Candidate weak entries to drop: direct-finish auto-close and legacy upgrade recovery. Candidate strong keepers: repo-local handoff, stale-dist snapshot freshness, burned npm version preflight, release-generated docs synchronization.
