---
id: "202602071625-VEKQTJ"
title: "AP-TASKDOC-02: Normalize metadata note timestamps to ISO"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "roadmap"
  - "tasks"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T16:26:44.730Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07T16:26:40.729Z."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Update task migrate-doc to normalize date-only timestamps in metadata notes to ISO updated_at when safe."
doc_version: 2
doc_updated_at: "2026-02-07T16:26:49.043Z"
doc_updated_by: "CODER"
description: "Ensure plan_approval.note and verification.note use ISO timestamps when they refer to dates; keep semantics by only rewriting when the note date matches updated_at."
id_source: "generated"
---
## Summary

Normalize date-only timestamps embedded in task metadata notes to ISO timestamps.

## Context

Some task READMEs contain date-only strings inside YAML frontmatter notes (for example `Approved in chat on 2026-02-07.`). These are less precise than the canonical `updated_at` ISO timestamps.

## Scope

- Update `agentplane task migrate-doc` to rewrite `plan_approval.note` and `verification.note` when:
  - the note contains `on YYYY-MM-DD`,
  - the date matches the corresponding `updated_at` date, and
  - `updated_at` is a valid ISO timestamp.
- Run the updated migrator across all tasks.

## Plan

1. Implement a small normalization helper in `packages/agentplane/src/commands/task/migrate-doc.ts`.
2. Add unit tests covering:
   - matching date gets replaced with ISO `updated_at`,
   - mismatched date is left unchanged,
   - missing/invalid `updated_at` leaves note unchanged.
3. Run `agentplane task migrate-doc --all` and confirm the number of changed docs.
4. Run `agentplane task lint` and `bun run test:cli:core`.

## Risks

- Unintended semantic changes if notes are rewritten when their date does not represent the approval timestamp.

## Verification

- `agentplane task migrate-doc --all` reports expected `changed` count.
- `agentplane task lint` returns `OK`.
- `bun run test:cli:core` passes.

## Rollback Plan

- Revert the commit(s) for this task.
- Re-run `agentplane task migrate-doc --all` from the previous revision if needed.
