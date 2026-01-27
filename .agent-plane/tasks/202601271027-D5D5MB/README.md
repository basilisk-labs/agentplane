---
id: "202601271027-D5D5MB"
title: "AP-010: Task doc set + metadata enforcement"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601271008-63G26Q"]
tags: ["nodejs", "roadmap", "tasks"]
verify: ["bun run ci"]
commit: { hash: "00c544bd0ab65b43f35c0af26d6dcd3268b5f97c", message: "✨ D5D5MB AP-010: task doc set + metadata enforcement" }
comments:
  - { author: "CODER", body: "verified: bun run ci passed | details: details: add agentplane task doc set + enforce doc metadata fields; update gitignore so coverage/index.html is visible in IDE." }
doc_version: 2
doc_updated_at: "2026-01-27T11:06:52+00:00"
doc_updated_by: "agentctl"
description: "Implement task doc metadata (doc_version/doc_updated_at/doc_updated_by), add \"agentplane task doc set\" that updates metadata automatically, and add lint/guard check to prevent README edits without metadata bump."
---
## Summary

Implement 'agentplane task doc set' and enforce doc metadata fields (doc_version/doc_updated_at/doc_updated_by) for task READMEs.

## Scope

- Add core helpers to update task README sections and bump metadata
- Add CLI command: agentplane task doc set
- Add unit tests to keep coverage thresholds passing
- Make local coverage output discoverable in the IDE

## Risks

- Stricter metadata validation can surface malformed task READMEs; mitigate by providing task doc set to update safely.

## Verify Steps

bun run ci

## Rollback Plan

git revert 00c544bd0ab6

