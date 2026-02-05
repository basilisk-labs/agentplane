---
id: "202601071400-697Z41"
title: "Standardize task README format + agentctl-only updates"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["readme", "docs", "agentctl"]
verify: []
commit: { hash: "95bfbb7f4d285be96102403b7946db516fa7358e", message: "✨ 697Z41 harden task README metadata guard across backends" }
comments:
  - { author: "CODER", body: "Verified: ran python -m py_compile .agent-plane/agentctl.py .agent-plane/backends/local/backend.py .agent-plane/backends/redmine/backend.py and python .agent-plane/agentctl.py task lint; README metadata guard now applies across backends and task doc notes updated." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:35.478Z"
doc_updated_by: "agentplane"
description: "Refine task README.md format for human/agent readability and enforce updates via agentctl commands only."
---
# 202601071400-697Z41: Standardize task README format + agentctl-only updates

## Summary

- Add Context/Notes sections to task README template.
- Add agentctl doc section updates + metadata guard for README changes.
- Update local backend to stamp doc metadata.

## Context

- Agents should not edit task READMEs by hand; agentctl must own updates.
- README structure should balance required metadata with readable guidance.

## Scope

- Update agentctl README template and doc section commands.
- Add guardrails that require agentctl doc metadata for staged task READMEs.
- Update local backend to maintain doc metadata and docs/instructions.
- Extend Redmine backend field mapping to store doc metadata and comments.
- Mirror new Redmine comments into issue journals as notes.
- Document Redmine custom fields and notes behavior (separate doc).

## Risks

- Guard may block commits that touch legacy task READMEs missing doc metadata until updated via agentctl.
- Section parsing is heading-based; unusual heading formats may be ignored.

## Verify Steps

- python -m py_compile .agent-plane/agentctl.py .agent-plane/backends/local/backend.py .agent-plane/backends/redmine/backend.py

## Rollback Plan

- Revert the commit and re-run agentctl if needed.

## Notes

- Existing READMEs keep their content; metadata is added on first agentctl update.
- Redmine needs custom fields for comments/doc metadata to keep parity with local.
- Journal notes are appended only when comment list grows in order.
- README metadata guard now enforces agentctl frontmatter even when the active backend is not local (cache + Redmine workflows).

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- (no file changes)
<!-- END AUTO SUMMARY -->

## Changes Summary (auto)

<!-- BEGIN AUTO SUMMARY -->
- (no file changes)
<!-- END AUTO SUMMARY -->
