---
id: "202602061739-G8712J"
title: "Repo: Prettier format FIX.md to unblock hooks"
status: "DOING"
priority: "high"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T17:40:01.260Z"
  updated_by: "DOCS"
  note: "Approved: format FIX.md only to satisfy pre-commit."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Format FIX.md with Prettier so format:check hook passes."
doc_version: 2
doc_updated_at: "2026-02-06T17:40:02.000Z"
doc_updated_by: "DOCS"
description: "Pre-commit runs bun run format:check across repo; FIX.md currently fails Prettier check and blocks all commits. Format FIX.md without changing meaning."
id_source: "generated"
---
## Summary

Format FIX.md with Prettier so lefthook pre-commit (format:check) stops blocking commits.

## Scope

Only FIX.md formatting; no semantic changes.

## Plan

1) Run Prettier on FIX.md only.\n2) Ensure bun run format:check passes.\n3) Commit with allowlist=FIX.md.

## Risks

Risk: Prettier may reflow text; keep meaning intact.

## Verification


## Rollback Plan

Revert the commit for this task.

## Verify Steps

- bun run format:check
