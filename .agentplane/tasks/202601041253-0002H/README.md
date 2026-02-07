---
id: "202601041253-0002H"
title: "agentctl integrate: skip verify if already verified"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "agentctl"
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
  hash: "0df88f39f6bb08d5fac2dabf5e113687135295a4"
  message: "Legacy completion (backfill)"
comments: []
doc_version: 2
doc_updated_at: "2026-01-11T08:06:07+00:00"
doc_updated_by: "agentctl"
description: "Speed up branch_pr integration by skipping redundant verify runs when the task branch HEAD SHA is already recorded as verified (via PR meta last_verified_sha or pr/verify.log). Keep --run-verify as a force-rerun escape hatch. Also ensure rebase strategy runs rebase before verify so the verified SHA matches what gets merged."
id_source: "custom"
dirty: false
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan
