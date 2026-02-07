---
id: "202602051609-6JV90C"
title: "Fix depends_on normalization in task docs"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "tasks"
  - "workflow"
  - "bug"
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
  hash: "ebe79986333ccc8d9e6eaeba9c8e0d676807df91"
  message: "🐛 6JV90C normalize depends_on inputs"
comments:
  -
    author: "CODER"
    body: "Start: Fix depends_on parsing and normalize task README frontmatter."
  -
    author: "CODER"
    body: "Verified: Fixed depends_on parsing (ignore []), normalized frontmatter via task normalize, bun run test:fast."
doc_version: 2
doc_updated_at: "2026-02-05T16:16:31.654Z"
doc_updated_by: "CODER"
description: "Treat depends_on: ['[]'] as empty and ignore literal [] input flags; normalize task README frontmatter."
id_source: "generated"
---
## Summary

Normalize depends_on handling so literal [] inputs do not create invalid references.

## Scope

- Treat depends_on: ["[]"] as empty when reading.
- Ignore --depends-on [] in CLI parsing.
- Normalize existing task READMEs via task normalize.
- Update tests.

## Risks

- Behavior change could mask user typos if they intended a literal task id of [].

## Verify Steps

- bun run test:fast.
- Run agentplane task normalize and ensure depends_on: [] in affected READMEs.

## Verification

- ✅ bun run test:fast (pass).\n- ✅ task normalize rewrote depends_on to [] in affected READMEs.

## Rollback Plan

- Revert parsing/normalization changes.

## Plan
