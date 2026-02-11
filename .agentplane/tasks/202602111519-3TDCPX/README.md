---
id: "202602111519-3TDCPX"
title: "T7: Redmine canonical env parser and env contract wiring"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602111519-GH7VJW"
tags:
  - "backend"
  - "redmine"
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T15:55:27.608Z"
  updated_by: "CODER"
  note: "Verified: Added canonical readRedmineEnv parser, wired backend to env-derived custom fields/batch config, switched pause semantics to milliseconds, and updated mapping/tests so .env custom field keys influence behavior. Tests/lint/build pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing canonical Redmine env parsing and backend wiring."
events:
  -
    type: "status"
    at: "2026-02-11T15:54:33.482Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing canonical Redmine env parsing and backend wiring."
  -
    type: "verify"
    at: "2026-02-11T15:55:27.608Z"
    author: "CODER"
    state: "ok"
    note: "Verified: Added canonical readRedmineEnv parser, wired backend to env-derived custom fields/batch config, switched pause semantics to milliseconds, and updated mapping/tests so .env custom field keys influence behavior. Tests/lint/build pass."
doc_version: 2
doc_updated_at: "2026-02-11T15:55:27.609Z"
doc_updated_by: "CODER"
description: "Implement redmine/env.ts parser and make backend consume all .env.example keys with strict parsing and correct units."
id_source: "generated"
---
## Summary

Introduce canonical Redmine env parser and wire backend to consume all supported .env keys.

## Scope

In scope: new redmine env parser module, redmine backend constructor wiring, mapping for tags/priority/owner custom fields, and tests. Out of scope: error wording split (T8).

## Plan

1) Add readRedmineEnv parser with integer validation. 2) Wire backend constructor to env parser (custom fields, batch tuning, owner/assignee). 3) Align batch pause to milliseconds in runtime. 4) Add env + backend tests for overrides and field usage.

## Risks

Risk: behavior changes for legacy batch_pause semantics. Mitigation: backward-compatible conversion for fractional settings and regression tests.

## Verify Steps

Run: bun run test:agentplane -- packages/agentplane/src/backends/task-backend/redmine/env.test.ts packages/agentplane/src/backends/task-backend.test.ts ; bun run lint ; bun run --filter=@agentplaneorg/core build ; bun run --filter=agentplane build

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T15:55:27.608Z — VERIFY — ok

By: CODER

Note: Verified: Added canonical readRedmineEnv parser, wired backend to env-derived custom fields/batch config, switched pause semantics to milliseconds, and updated mapping/tests so .env custom field keys influence behavior. Tests/lint/build pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T15:54:33.482Z, excerpt_hash=sha256:69187d9b80186347b2c1e866398c874956af98f0b00a4ea199fe62e2b90785f0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert this task commit; restore direct process.env reads in redmine backend and previous batch pause behavior.

## Context

Current Redmine backend reads a small subset of env keys directly and leaves many .env.example keys unused. We need a strict parser contract and real wiring.

## Notes

### Decisions
Env parser is the single source for redmine env coercion and validation.
