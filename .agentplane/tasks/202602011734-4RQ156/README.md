---
id: "202602011734-4RQ156"
title: "Refactor docs for Mintlify + add task lifecycle section"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
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
commit:
  hash: "35359daf1bcc5ede5838feed0e88a0c23e8f81ec"
  message: "🧪 4RQ156+JADQ0P align scenario test messages"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: bun run test:full; rg -n \"\\.agent-plane\" -S; rg -n \"agentctl\" docs README.md packages"
doc_version: 2
doc_updated_at: "2026-02-03T12:09:38.158Z"
doc_updated_by: "agentplane"
description: "Restructure Mintlify docs into modular user/developer sections; align navigation/frontmatter; add task lifecycle documentation with Mermaid diagrams for direct and branch_pr modes."
---
## Summary

Refactored Mintlify docs into user/developer/help modules, updated navigation, and added task lifecycle documentation with Mermaid diagrams.

## Scope

Move existing docs into modular folders, align docs.json navigation and index, add task lifecycle page with flowchart and sequence diagrams, and update cross-links.

## Risks

Navigation paths could break if any links are missed; Mintlify page paths must match the new folder structure.

## Verify Steps

Review docs.json navigation for correct paths; check index.mdx links; open task lifecycle page to confirm Mermaid renders in Mintlify.

## Rollback Plan

Revert doc moves and restore original docs.json navigation and index.mdx ordering.

## Plan


## Verification
