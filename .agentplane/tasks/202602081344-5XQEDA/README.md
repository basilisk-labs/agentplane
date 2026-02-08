---
id: "202602081344-5XQEDA"
title: "Decompose Redmine task backend module"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "backend"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T13:47:55.525Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T14:00:12.074Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck, bun run lint, and bun run test:full (704 tests) all pass after extracting Redmine backend helpers into backends/task-backend/redmine/*."
commit:
  hash: "8b244d697974802d62a079c7efe7f032cf95ab59"
  message: "✨ 5XQEDA backend: decompose Redmine backend helpers"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decompose the Redmine backend into a redmine/ impl folder with a thin facade and keep the full suite green."
  -
    author: "ORCHESTRATOR"
    body: "Verified: extracted Redmine backend helpers into backends/task-backend/redmine/* (client, fields, parse, mapping, remote, comments); bun run typecheck, bun run lint, and bun run test:full all pass."
events: []
doc_version: 2
doc_updated_at: "2026-02-08T14:01:07.746Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split backends/task-backend/redmine-backend.ts into smaller modules (API client, mapping, CRUD operations) while preserving behavior and keeping tests green."
---
## Summary

Decompose the Redmine task backend implementation into smaller modules while preserving the public TaskBackend API and keeping behavior identical.

## Scope

In scope:
1. Move internal logic from packages/agentplane/src/backends/task-backend/redmine-backend.ts into packages/agentplane/src/backends/task-backend/redmine/* modules.
2. Keep the existing exports and runtime behavior intact.

Out of scope:
1. Any changes to Redmine configuration semantics, HTTP behavior, or error mapping.

## Plan

1. Identify cohesive boundaries in redmine-backend.ts (HTTP client, data mapping, CRUD, pagination/batching, errors).
2. Introduce a redmine/ impl folder and move code behind a thin redmine-backend.ts facade.
3. Keep function signatures and error behavior stable; update imports.
4. Add/adjust tests only if needed to preserve coverage.
5. Run bun run typecheck, bun run lint, bun run test:full.

## Risks

1. Subtle behavior changes in Redmine field mapping (custom fields, status transitions).
2. Network error handling differences (timeouts/retries) if code paths move incorrectly.
3. Import cycles between backend modules.

## Verify Steps

Commands:
- bun run typecheck
- bun run lint
- bun run test:full

Pass criteria:
- No behavior changes in existing Redmine backend tests.
- Full suite passes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T14:00:12.074Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck, bun run lint, and bun run test:full (704 tests) all pass after extracting Redmine backend helpers into backends/task-backend/redmine/*.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T13:48:52.049Z, excerpt_hash=sha256:85d1b9df2827a3a1cac8326db8a1fd3af4c43a2755b304dae5039470d5109f95

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the implementation commit for 202602081344-5XQEDA.
2. Re-run bun run test:full.
3. If necessary, revert the close metadata commit for the task.
