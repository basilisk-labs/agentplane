---
id: "202601111048-9VBCF6"
title: "Set Redmine batch settings"
status: "DONE"
priority: "low"
owner: "CODER"
depends_on: []
tags:
  - "redmine"
  - "config"
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
  hash: "f60b684adc2297581aadaf58cf3624fb87c13ed2"
  message: "✨ 9VBCF6 set redmine batch_size/batch_pause defaults"
comments:
  -
    author: "CODER"
    body: "Verified: set batch_size=5 and batch_pause=0.5 in redmine backend.json; py_compile backend.py; no workflow_mode or sync changes."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:39.557Z"
doc_updated_by: "agentplane"
description: "Set batch_size/batch_pause in redmine backend config"
---
## Summary

Set explicit batch_size (5) and batch_pause in redmine/backend.json for sync/migration throttle.

## Context

- Redmine backend now supports batching via settings; backend.json currently lacks explicit values.
- Need defaults so runs have consistent throttle without editing code.

## Scope

- Add batch_size and batch_pause to .agent-plane/backends/redmine/backend.json.
- Use batch_size=5 tasks and a small pause for throttling.
- Do not change workflow_mode or trigger sync.

## Risks

- Too small batch or pause slows large migrations; too small pause may still hit server rate limits.

## Verify Steps

- python -m py_compile .agent-plane/backends/redmine/backend.py

## Rollback Plan

- Revert .agent-plane/backends/redmine/backend.json.

## Plan


## Verification
