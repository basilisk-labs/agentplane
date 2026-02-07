---
id: "202602070828-GB29KB"
title: "P1: Align framework AGENTS.md asset required sections with config"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "policy"
  - "framework"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T08:28:53.891Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07T08:28:53.891Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T08:29:16.351Z"
  updated_by: "ORCHESTRATOR"
  note: "Updated packages/agentplane/assets/AGENTS.md required sections list to match config tasks.doc.required_sections."
commit:
  hash: "fcc6a1af151d36c5727e877738c6dc79e4c84611"
  message: "✨ GB29KB framework: align AGENTS.md asset required sections"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Update framework AGENTS.md asset required doc sections list to match config tasks.doc.required_sections."
  -
    author: "ORCHESTRATOR"
    body: "Verified: packages/agentplane/assets/AGENTS.md required task doc sections now match config tasks.doc.required_sections; agentplane task lint OK."
events:
  -
    type: "status"
    at: "2026-02-07T08:28:59.039Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Update framework AGENTS.md asset required doc sections list to match config tasks.doc.required_sections."
  -
    type: "verify"
    at: "2026-02-07T08:29:16.351Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "Updated packages/agentplane/assets/AGENTS.md required sections list to match config tasks.doc.required_sections."
  -
    type: "status"
    at: "2026-02-07T08:32:07.710Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: packages/agentplane/assets/AGENTS.md required task doc sections now match config tasks.doc.required_sections; agentplane task lint OK."
doc_version: 2
doc_updated_at: "2026-02-07T08:32:07.710Z"
doc_updated_by: "ORCHESTRATOR"
description: "packages/agentplane/assets/AGENTS.md is used as the framework install/init template and currently diverges from tasks.doc.required_sections. Update the required task doc sections list to match config 1:1."
---
## Summary

Align the install/init AGENTS.md asset required task doc sections list with config tasks.doc.required_sections.

## Scope


## Plan

1) Update packages/agentplane/assets/AGENTS.md required task doc sections list to match tasks.doc.required_sections.\n2) Run agentplane task lint.\n3) Record verification OK.\n4) Commit via agentplane and finish the task.

## Risks

Low risk; main risk is leaving the asset inconsistent with root AGENTS.md or config again.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T08:29:16.351Z — VERIFY — ok

By: ORCHESTRATOR

Note: Updated packages/agentplane/assets/AGENTS.md required sections list to match config tasks.doc.required_sections.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
