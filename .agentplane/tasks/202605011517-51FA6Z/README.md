---
id: "202605011517-51FA6Z"
title: "Prepare AgentPlane listing submission profile"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T15:21:31.638Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: preparing listing-only discoverability profile in a dedicated branch_pr worktree; skill artifacts remain excluded by user request."
events:
  -
    type: "status"
    at: "2026-05-01T15:22:53.833Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: preparing listing-only discoverability profile in a dedicated branch_pr worktree; skill artifacts remain excluded by user request."
doc_version: 3
doc_updated_at: "2026-05-01T15:22:53.833Z"
doc_updated_by: "DOCS"
description: "Prepare AgentPlane for curated-list submissions by updating GitHub topics and adding docs/listing.md snippets. Excludes agent-skill directory work by user request."
sections:
  Summary: "Prepare AgentPlane for curated-list submissions by tightening repository discovery metadata and adding reusable listing snippets. Agent-skill directory work is explicitly out of scope by user request."
  Scope: |-
    - In scope: update GitHub repository topics for harness/coding-agent discovery; add docs/listing.md with short, medium, tag, category, and PR-body snippets for curated-list submissions.
    - Out of scope: skills/agentplane-workflow, agent skill directories, MCP lists, runtime/code changes, unrelated launch content.
  Plan: |-
    1. Verify current repository topics and README positioning.
    2. Add only listing-oriented metadata/docs: GitHub topics and docs/listing.md.
    3. Do not create skills/agentplane-workflow or submit to agent-skill directories in this task.
    4. Run docs/policy checks and record verification evidence before PR/listing work continues.
  Verify Steps: |-
    1. Confirm GitHub topics include the listing/discoverability terms and do not remove existing useful topics.
    2. Confirm docs/listing.md exists and contains short, medium, tags, best categories, suggested entries, and PR-body snippets for curated-list submissions.
    3. Confirm no skills/agentplane-workflow directory or agent-skill submission artifact was created.
    4. Run node .agentplane/policy/check-routing.mjs and agentplane doctor.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prepare AgentPlane for curated-list submissions by tightening repository discovery metadata and adding reusable listing snippets. Agent-skill directory work is explicitly out of scope by user request.

## Scope

- In scope: update GitHub repository topics for harness/coding-agent discovery; add docs/listing.md with short, medium, tag, category, and PR-body snippets for curated-list submissions.
- Out of scope: skills/agentplane-workflow, agent skill directories, MCP lists, runtime/code changes, unrelated launch content.

## Plan

1. Verify current repository topics and README positioning.
2. Add only listing-oriented metadata/docs: GitHub topics and docs/listing.md.
3. Do not create skills/agentplane-workflow or submit to agent-skill directories in this task.
4. Run docs/policy checks and record verification evidence before PR/listing work continues.

## Verify Steps

1. Confirm GitHub topics include the listing/discoverability terms and do not remove existing useful topics.
2. Confirm docs/listing.md exists and contains short, medium, tags, best categories, suggested entries, and PR-body snippets for curated-list submissions.
3. Confirm no skills/agentplane-workflow directory or agent-skill submission artifact was created.
4. Run node .agentplane/policy/check-routing.mjs and agentplane doctor.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
