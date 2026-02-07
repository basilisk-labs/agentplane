---
id: "202602070812-TFAPHD"
title: "P1: Align required task doc sections in AGENTS.md with config"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "policy"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T08:13:50.363Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07."
verification:
  state: "ok"
  updated_at: "2026-02-07T08:16:38.225Z"
  updated_by: "ORCHESTRATOR"
  note: "Updated AGENTS.md required task doc sections list to match config tasks.doc.required_sections."
commit:
  hash: "26032cabd0ed0614b09836e531236c8587df094a"
  message: "✨ TFAPHD policy: align required task doc sections with config"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Fix AGENTS.md required task doc sections list to match config tasks.doc.required_sections (avoid drift)."
  -
    author: "ORCHESTRATOR"
    body: "Verified: AGENTS.md required task doc sections now match config tasks.doc.required_sections; agentplane task lint OK."
events:
  -
    type: "status"
    at: "2026-02-07T08:13:56.567Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix AGENTS.md required task doc sections list to match config tasks.doc.required_sections (avoid drift)."
  -
    type: "verify"
    at: "2026-02-07T08:16:38.225Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Updated AGENTS.md required task doc sections list to match config tasks.doc.required_sections."
  -
    type: "status"
    at: "2026-02-07T08:21:08.459Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: AGENTS.md required task doc sections now match config tasks.doc.required_sections; agentplane task lint OK."
doc_version: 2
doc_updated_at: "2026-02-07T08:21:08.459Z"
doc_updated_by: "ORCHESTRATOR"
description: "AGENTS.md required task doc sections diverge from .agentplane/config.json tasks.doc.required_sections, causing ambiguity and potential tooling mismatch. Update AGENTS.md list to match required_sections 1:1."
---
## Summary

Align AGENTS.md required task doc sections list with .agentplane/config.json tasks.doc.required_sections to avoid policy/tooling drift.

## Scope

Update only the root AGENTS.md policy file section 'Required task doc sections (before finish)'.

## Plan

1) Update AGENTS.md required task doc sections list to match tasks.doc.required_sections.\n2) Run agentplane task lint.\n3) Record verification OK.\n4) Commit via agentplane guard commit and finish the task.

## Risks

Low risk. Possible follow-up: keep packages/agentplane/assets/AGENTS.md consistent if it is used as an init template.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T08:16:38.225Z — VERIFY — ok

By: ORCHESTRATOR

Note: Updated AGENTS.md required task doc sections list to match config tasks.doc.required_sections.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit(s) touching AGENTS.md; restore the previous required sections list.
