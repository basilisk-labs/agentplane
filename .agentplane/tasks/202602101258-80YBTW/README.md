---
id: "202602101258-80YBTW"
title: "T2: Remove timestamp-in-note requirements"
result_summary: "Agent guidance now avoids manual timestamp duplication in notes."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602101258-P8B15P"
tags:
  - "agents"
  - "policy"
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T13:06:21.315Z"
  updated_by: "TESTER"
  note: "Verified: Removed timestamp-in-note guidance from agent profiles; AGENTS.md now documents that timestamps live in task metadata updated_at fields."
commit:
  hash: "624f3b246aa6cd5bb68c7d4d0a50255de5c10c44"
  message: "🚧 80YBTW agents: drop timestamp-in-note requirements"
comments:
  -
    author: "CODER"
    body: "Start: Remove timestamp-in-note requirements from agent profiles and document canonical timestamp source in AGENTS.md."
  -
    author: "CODER"
    body: "Verified: Agent profiles no longer require timestamps in notes; AGENTS.md clarifies timestamps live in updated_at fields."
events:
  -
    type: "status"
    at: "2026-02-10T13:03:01.764Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Remove timestamp-in-note requirements from agent profiles and document canonical timestamp source in AGENTS.md."
  -
    type: "verify"
    at: "2026-02-10T13:06:21.315Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: Removed timestamp-in-note guidance from agent profiles; AGENTS.md now documents that timestamps live in task metadata updated_at fields."
  -
    type: "status"
    at: "2026-02-10T13:06:55.446Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Agent profiles no longer require timestamps in notes; AGENTS.md clarifies timestamps live in updated_at fields."
doc_version: 2
doc_updated_at: "2026-02-10T13:06:55.446Z"
doc_updated_by: "CODER"
description: "Remove timestamp-in-note rules from agent JSON profiles (assets + installed) and add canonical rule to AGENTS.md about updated_at."
id_source: "generated"
---
## Summary

Remove agent-profile instructions that require humans to include timestamps in notes; document canonical timestamp location in AGENTS.md.

## Scope

In scope: packages/agentplane/assets/agents/*.json; .agentplane/agents/*.json; packages/agentplane/assets/AGENTS.md. Out of scope: CLI behavior changes.

## Plan

1. Find and remove workflow lines requiring ISO timestamps in plan approval/verification notes from all agent profiles (assets + installed). 2. Add one canonical rule to AGENTS.md explaining that timestamps live in updated_at and should not be duplicated in note unless explicitly required. 3. Run agents-template tests and lint.

## Risks

Risk: removing timestamp guidance could reduce traceability if no alternative exists. Mitigation: add canonical rule in AGENTS.md and keep structured verification records.

## Verify Steps

Commands:\n- bun run test:agentplane -- agents template tests must pass\n- bun run lint\nPass criteria:\n- No agent profile JSON contains timestamp-in-note requirements.\n- AGENTS.md documents canonical timestamp storage (updated_at).

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T13:06:21.315Z — VERIFY — ok

By: TESTER

Note: Verified: Removed timestamp-in-note guidance from agent profiles; AGENTS.md now documents that timestamps live in task metadata updated_at fields.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T13:03:01.764Z, excerpt_hash=sha256:0aa514ef23fdda3ad49b90d6faaf2d2bb6d6b1fbd2b3441c8fc85aa1e09d9057

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert edits to the modified agent JSON and AGENTS.md and re-run the same tests.

## Context

Task notes already capture timestamps via updated_at fields and verify records. Requiring manual timestamps increases noise and inconsistency.
