---
id: "202601301220-TNM8G3"
title: "Replace AGENTS.md with prod-v1.0 policy"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["agents", "docs"]
verify: []
commit: { hash: "1938f40cf250468cc7e839df8ecf160a35d6cc6b", message: "✨ TNM8G3 replace AGENTS policy with prod-v1.0" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: Documentation-only change | details: no automated tests run beyond pre-commit format/lint hooks; AGENTS.md formatted with Prettier." }
doc_version: 2
doc_updated_at: "2026-01-30T12:21:59+00:00"
doc_updated_by: "agentctl"
description: "Replace AGENTS.md content with the provided prod-v1.0 policy text."
---
## Summary

Replace AGENTS.md with the prod-v1.0 policy text provided by the user.

## Context

User provided a full replacement policy block for AGENTS.md and requested a complete swap.

## Scope

- Replace AGENTS.md content with the provided prod-v1.0 policy text.\n- Keep all formatting consistent with Prettier.

## Risks

- Full replacement may remove previously documented local conventions; ensure new policy is authoritative.\n- Any downstream tooling relying on removed sections may need updates.

## Verify Steps

- N/A (documentation-only change).

## Rollback Plan

- Revert AGENTS.md to the previous revision.

## Notes

No config changes applied; policy document only.
