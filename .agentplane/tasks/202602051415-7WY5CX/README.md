---
id: "202602051415-7WY5CX"
title: "Epic H: Backend architecture refresh"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "roadmap"
  - "epic"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "f51118d0e7df71f0e94a0d1ee84149e17f7efa4b"
  message: "📝 V40XE1 update backend docs and init tests"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: backend selection at init and first-class backend docs/tests complete."
doc_version: 2
doc_updated_at: "2026-02-05T14:21:38.479Z"
doc_updated_by: "ORCHESTRATOR"
description: "Make backends first-class (local + redmine), decouple from recipes, and support selection at init."
id_source: "generated"
---
## Summary

Epic H: make backends first-class (local/redmine), decouple from recipes, and allow init-time backend choice.

## Scope

Add init backend selection, write backend configs, update docs and tests, and close Epic H.

## Risks

Init flow changes may break non-interactive usage; add tests for --backend selection and defaults.

## Verify Steps

- Run bun run lint.\n- Run bun run test:fast.\n- Run node packages/agentplane/bin/agentplane.js hooks run pre-commit.\n- Confirm init selects backend and writes config.

## Verification

Verified on 2026-02-05: init backend selection implemented, docs/tests updated, lint/test/pre-commit hooks passed.

## Rollback Plan

Revert init/backend changes and restore previous backend config defaults.

## Plan
