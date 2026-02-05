---
id: "202602051552-BB7ZAC"
title: "AP-092: Normalize env variables with compatibility"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "env", "compatibility"]
verify: []
commit: { hash: "c14a215c1917cb4dc5d1caf70dc80068831f482e", message: "✨ BB7ZAC normalize env vars" }
comments:
  - { author: "CODER", body: "Start: Normalize env variable names to AGENTPLANE_* and update docs/tests (no alias compatibility)." }
  - { author: "CODER", body: "Verified: format:check, lint, test:fast passed; env vars normalized to AGENTPLANE_* across code, tests, docs, and .env.example." }
doc_version: 2
doc_updated_at: "2026-02-05T16:49:39.811Z"
doc_updated_by: "CODER"
description: "Normalize env names with compatibility window and update docs/tests."
id_source: "generated"
---
## Summary

Normalize environment variable names to the AGENTPLANE_ prefix (no legacy aliases).

## Scope

- Replace AGENT_PLANE_* and CODEXSWARM_REDMINE_* with AGENTPLANE_* names in code.
- Update tests and docs to match.
- Update .env.example.

## Risks

- Breaking change for users relying on legacy env names.
- Docs/tests may drift if any references are missed.

## Verify Steps

- bun run format:check.
- bun run lint.
- bun run test:fast.
- Spot-check docs/.env.example for updated env names.

## Verification

- ✅ bun run format:check.\n- ✅ bun run lint.\n- ✅ bun run test:fast.\n- ✅ Docs/.env.example updated to AGENTPLANE_* env names.

## Rollback Plan

- Revert to previous env names and restore docs/tests if needed.
