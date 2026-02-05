---
id: "202602051439-H7JERJ"
title: "AP-071: Standardize backend config format"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["backend", "docs"]
verify: ["bun run lint", "bun run test:fast"]
commit: { hash: "bed62fcdb343c1d09b00839a0206a7da84f383ac", message: "✨ 202602051439-H7JERJ standardize backend config" }
comments:
  - { author: "CODER", body: "Start: standardize backend config format, ignore legacy module/class, update docs/tests." }
  - { author: "ORCHESTRATOR", body: "Verified: bun run lint; bun run test:fast; agentplane verify 202602051439-H7JERJ. Summary: standardized backend config shape and docs; legacy module/class ignored." }
doc_version: 2
doc_updated_at: "2026-02-05T14:43:18.238Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement standardized backend config shape and document format; treat module/class as legacy."
id_source: "generated"
---
## Summary

Standardize backend config shape (id/version/settings), treat module/class as legacy, and document the format.

## Scope

Add backend config validation in loadTaskBackend, ignore module/class legacy fields, update docs/user/backends.mdx with standardized format, add tests.

## Risks

Potentially stricter config validation could reject existing configs; keep validation minimal and backward-tolerant.

## Verify Steps

- Run bun run lint.\n- Run bun run test:fast.\n- Confirm loadTaskBackend accepts standardized config and ignores legacy module/class fields.

## Verification

- bun run lint
- bun run test:fast
- node packages/agentplane/bin/agentplane.js hooks run pre-commit

Status: pass
Verified at: 2026-02-05T14:43:05.971Z
Verified sha: bed62fcdb343c1d09b00839a0206a7da84f383ac

Commands:
- bun run lint
- bun run test:fast

Manual steps:
- Run bun run lint.\n- Run bun run test:fast.\n- Confirm loadTaskBackend accepts standardized config and ignores legacy module/class fields.

## Rollback Plan

Revert backend config validation and docs changes if compatibility issues appear.
