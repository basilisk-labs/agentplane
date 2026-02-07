---
id: "202602051448-44W230"
title: "Redmine smoke test (push/pull + field parity)"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "redmine"
  - "testing"
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
  hash: "869f46a7e953004bf3c7bfc248c30323b1a9cc45"
  message: "🧪 44W230 redmine smoke test"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: redmine pull/push ok; created task 202602051450-6Z591S. Title/description stored; tags empty; priority coerced to med; owner REDMINE. Local task shows full fields."
doc_version: 2
doc_updated_at: "2026-02-05T14:53:54.662Z"
doc_updated_by: "ORCHESTRATOR"
description: "Test Redmine backend connection in both directions and compare stored fields vs local backend."
id_source: "generated"
---
## Summary

Smoke-test Redmine backend connectivity (pull/push) and compare stored fields vs local backend.

## Scope

- Use Redmine backend credentials from .env.
- Run sync pull and push.
- Create and inspect a Redmine task to confirm field parity with local backend outputs.
- Leave repo files unchanged after test.

## Risks

- Redmine sandbox data may be mutated (expected).
- Local config may be temporarily changed and must be restored.

## Verify Steps

- Run agentplane sync redmine --direction pull --yes.
- Run agentplane sync redmine --direction push --yes.
- Switch tasks backend to Redmine temporarily, create a task with title/description/owner/tags/priority, then show it and confirm the same fields appear as when listing local tasks.
- Restore tasks backend to local config.

## Verification

Pending.

- agentplane sync redmine --direction pull --yes (ok, pulled 6 tasks).
- agentplane sync redmine --direction push --yes (ok, no local changes).
- Created Redmine task 202602051450-6Z591S; task show returned title/description/status/doc metadata, but priority coerced to med, owner to REDMINE, tags empty (tag/priority/owner mismatch vs requested).
- Local task 202602051439-H7JERJ shows tags/priority/owner/verify/commit/comments preserved.
- Restored tasks_backend.config_path to local.

## Rollback Plan

- Reset tasks_backend.config_path to .agentplane/backends/local/backend.json.
- Discard any local changes if accidentally created.

## Plan
