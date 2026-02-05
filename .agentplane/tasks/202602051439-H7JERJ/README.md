---
id: "202602051439-H7JERJ"
title: "AP-071: Standardize backend config format"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["backend", "docs"]
verify: ["bun run lint", "bun run test:fast"]
commit: null
comments:
  - { author: "CODER", body: "Start: standardize backend config format, ignore legacy module/class, update docs/tests." }
doc_version: 2
doc_updated_at: "2026-02-05T14:42:16.263Z"
doc_updated_by: "CODER"
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

## Rollback Plan

Revert backend config validation and docs changes if compatibility issues appear.
