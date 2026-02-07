---
id: "202601051417-P7AMW3"
title: "Remove Via Mentis ownership references"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags:
  - "cleanup"
  - "policy"
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
  hash: "944d0b90f177d0515866112cfb2b2a037ff6dccd"
  message: "🧹 P7AMW3 neutralize task owners"
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Replace Via Mentis owner values with a neutral owner label across tasks and export the updated snapshot."
---
## Summary

- Replace Via Mentis owner values with a neutral owner label in task frontmatter.
- Refresh the exported tasks snapshot.

## Scope

- `.agent-plane/tasks/*/README.md`: update owner fields.
- `.agent-plane/tasks.json`: re-export snapshot.

## Risks

- Bulk edit touches many task records; ensure no other fields change.

## Verify Steps

- `python3 .agent-plane/agentctl.py task export --out .agent-plane/tasks.json`

## Rollback Plan

- Revert the commit and re-export tasks.json from the previous state.

## Plan


## Verification
