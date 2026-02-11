---
id: "202602101258-FQ8HDW"
title: "T4: Upgrade review.json report for semantic conflicts"
result_summary: "Upgrade produces machine-readable semantic-review signals for triggering UPGRADER tasks."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602101258-GXJAJV"
tags:
  - "code"
  - "cli"
  - "upgrade"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T13:15:37.528Z"
  updated_by: "TESTER"
  note: "Verified: upgrade agent mode writes review.json and snapshots; auto mode writes last-review.json; targeted upgrade tests and lint passed."
commit:
  hash: "7350495c5465d936f3ef4283da3b6cd5eee2aa42"
  message: "🚧 FQ8HDW upgrade: emit semantic review.json report"
comments:
  -
    author: "CODER"
    body: "Start: Emit upgrade semantic review.json report for UPGRADER-trigger signals and post-upgrade reconciliation."
  -
    author: "CODER"
    body: "Verified: upgrade now emits review.json and snapshots in agent mode, persists last-review.json in auto mode, and prints a Prompt merge required marker; tests and lint passed."
events:
  -
    type: "status"
    at: "2026-02-10T13:11:18.094Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Emit upgrade semantic review.json report for UPGRADER-trigger signals and post-upgrade reconciliation."
  -
    type: "verify"
    at: "2026-02-10T13:15:37.528Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: upgrade agent mode writes review.json and snapshots; auto mode writes last-review.json; targeted upgrade tests and lint passed."
  -
    type: "status"
    at: "2026-02-10T13:31:04.743Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: upgrade now emits review.json and snapshots in agent mode, persists last-review.json in auto mode, and prints a Prompt merge required marker; tests and lint passed."
doc_version: 2
doc_updated_at: "2026-02-10T13:31:04.743Z"
doc_updated_by: "CODER"
description: "Extend agentplane upgrade to emit structured review.json + optional snapshots and stdout marker; persist last-review in auto mode."
id_source: "generated"
---
## Summary

Extend agentplane upgrade to emit a structured semantic-review report (review.json) describing merge strategy and baseline-relative change signals per managed file.

## Scope

In scope: packages/agentplane/src/commands/upgrade.ts (and any supporting modules); upgrade agent-mode runDir outputs; stdout marker text. Out of scope: changing upgrade safety allowlist semantics.

## Plan

1. Inspect upgrade implementation and current artifacts (files.json, agent runDir layout). 2. Define per-file review record schema (relPath, mergeStrategy, hasBaseline, changedCurrentVsBaseline, changedIncomingVsBaseline, needsSemanticReview, mergeApplied, mergePath). 3. Populate the schema during manifest processing and write review.json in agent mode; optionally write snapshots (current/incoming/baseline/proposed). 4. In --auto mode, persist the last review report for post-run consumption. 5. Add/adjust tests to assert review.json is written and signals are correct.

## Risks

Risk: large artifacts or leaking sensitive content into snapshots. Mitigation: keep snapshots optional/limited; redact or restrict to managed files only; ensure safety invariants remain.

## Verify Steps

Commands:\n- bun run test:agentplane packages/agentplane/src/commands/upgrade.agent-mode.test.ts\n- bun run test:agentplane packages/agentplane/src/commands/upgrade.merge.test.ts\n- bun run test:agentplane packages/agentplane/src/commands/upgrade.safety.test.ts\n- bun run lint\nPass criteria:\n- agent mode writes review.json with expected fields and counters.\n- review.json accurately reports baseline-relative change signals.\n- stdout includes a clear marker when semantic review is required.\n- no safety tests regress.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T13:15:37.528Z — VERIFY — ok

By: TESTER

Note: Verified: upgrade agent mode writes review.json and snapshots; auto mode writes last-review.json; targeted upgrade tests and lint passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T13:11:18.094Z, excerpt_hash=sha256:de73ef7152123b95d99aa5ddb758289e6443754d20600a8834655bdd49cb770f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert upgrade.ts changes and any new test snapshots; re-run the same upgrade test suite.

## Context

UPGRADER tasks should be triggered by machine-readable signals from upgrade. Current upgrade artifacts (files.json) do not explain why merges occurred or whether both sides changed relative to baseline.
