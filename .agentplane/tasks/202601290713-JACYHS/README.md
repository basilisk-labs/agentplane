---
id: "202601290713-JACYHS"
title: "AP-025: IDE entrypoints from AGENTS.md"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601270756-KREHV4"]
tags: ["roadmap", "nodejs", "ide"]
verify: []
commit: { hash: "8be23728d342b30e4e3caa153e1658b8ef509a6d", message: "✨ JACYHS implement ide sync entrypoints" }
comments:
  - { author: "CODER", body: "Start: Begin AP-025 implementation planning and code changes for ide sync generation." }
  - { author: "CODER", body: "verified: bun run ci (2026-01-29) | details: ide sync generates Cursor/Windsurf rules from AGENTS.md." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:15.859Z"
doc_updated_by: "agentplane"
description: "Implement  to generate Cursor and Windsurf rules from AGENTS.md with idempotent, auto-generated headers."
---
## Summary

Add agentplane ide sync to generate Cursor/Windsurf rules from AGENTS.md.


## Scope

- Implement ide sync command and file generation in CLI.\n- Update help output.\n- Add run-cli tests for ide sync.


## Risks

- Generated rules overwrite existing files; users must edit AGENTS.md instead.\n- If AGENTS.md is missing, ide sync fails (expected).


## Verify Steps

bun run ci


## Rollback Plan

Revert commit 8be23728d342.
