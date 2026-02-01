---
id: "202602011734-4RQ156"
title: "Refactor docs for Mintlify + add task lifecycle section"
status: "TODO"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["docs"]
doc_version: 2
doc_updated_at: "2026-02-01T17:45:33+00:00"
doc_updated_by: "agentctl"
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

