---
id: "202602101802-N7MWWX"
title: "Docs developer: release and publishing (agent-assisted)"
status: "DOING"
priority: "high"
owner: "DOCS"
depends_on:
  - "202602101802-G58053"
tags:
  - "docs"
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
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Update developer release/publishing docs to match agentplane release plan/apply and patch-only auto bump policy."
events:
  -
    type: "status"
    at: "2026-02-10T18:29:33.390Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Update developer release/publishing docs to match agentplane release plan/apply and patch-only auto bump policy."
doc_version: 2
doc_updated_at: "2026-02-10T18:31:21.808Z"
doc_updated_by: "DOCS"
description: "Rewrite developer release/publishing docs to match agentplane release plan/apply workflow, patch-only auto bump, and approval rules."
id_source: "generated"
---
## Summary

Update developer release/publishing docs to match the agent-assisted `agentplane release plan` / `agentplane release apply` workflow and patch-default bumping.

## Scope

In-scope: docs/developer/release-and-publishing.mdx.

## Plan

1. Replace manual publish-first instructions with the standard flow: release plan -> notes -> release apply -> tag push -> GitHub Actions publish.\n2. Document bump rules: patch default; minor/major requires --yes; pushing requires --yes.\n3. Keep an emergency manual publish section as discouraged fallback.

## Risks

Risk: release docs drift and contributors publish manually, bypassing safety gates. Mitigation: make plan/apply the primary workflow and keep manual publish as explicitly discouraged.

## Verify Steps

- Confirm docs mention Release plan written: .agentplane/.release/plan/2026-02-10T18-31-05-307Z
Next tag: v0.2.13
Hint: Create a DOCS task to write docs/releases/v0.2.13.md based on this plan. and  as the standard workflow.\n- Confirm minor/major and push require  as documented.\n- Confirm manual publish is clearly marked as discouraged.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commits for this task to restore prior release docs.
