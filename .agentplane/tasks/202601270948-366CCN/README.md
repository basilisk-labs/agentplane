---
id: "202601270948-366CCN"
title: "AP-008: Task README frontmatter parser/writer"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["nodejs", "core", "roadmap", "tasks"]
verify: ["bun run ci"]
commit: { hash: "d34da21cd7ae4b50a29a845e0fc6a1b787637c3d", message: "✨ 366CCN AP-008: stable task README frontmatter" }
comments:
  - { author: "CODER", body: "Start: AP-008 implement task README YAML frontmatter parser/writer with byte-stable rendering." }
  - { author: "CODER", body: "Start: implementing core frontmatter parsing and stable task README frontmatter renderer." }
  - { author: "CODER", body: "verified: bun run ci passed | details: task README frontmatter parse/render roundtrip is stable." }
doc_version: 2
doc_updated_at: "2026-01-27T09:49:09+00:00"
doc_updated_by: "agentctl"
description: "Implement YAML frontmatter parsing and stable rendering for task README files (v2 metadata), with golden/roundtrip tests."
---
## Summary

Implement AP-008: parse YAML frontmatter from task README.md and render it back in a stable, agentctl-compatible format (byte-stable for roundtrips).

## Scope

- Add core parser for Markdown YAML frontmatter blocks
- Add stable renderer for task frontmatter (agentctl v2 style: key order, quoting, flow sequences/maps)
- Add roundtrip/golden tests using representative task README fixtures

## Risks

- YAML formatting must match existing task README frontmatter to avoid noisy diffs.
- Handling unknown/extra frontmatter keys requires deterministic ordering to stay stable.

## Verify Steps

- `bun run ci`
- Unit tests demonstrate parse->render roundtrip stability

## Rollback Plan

- Revert commits; remove the new core frontmatter module and tests
- No data migrations are performed in this task
