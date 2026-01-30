---
id: "202601301155-Z6B0HA"
title: "Update AGENTS.md recommendations"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["agents", "docs"]
commit: { hash: "dfe8bde0e62aa129ea63873ccc9ce428317abfce", message: "✨ Z6B0HA apply AGENTS policy updates (preflight, approvals, commit modes, config patch)" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: Documentation-only change | details: no automated tests run beyond pre-commit formatting/lint hooks; AGENTS.md formatted with Prettier." }
  - { author: "ORCHESTRATOR", body: "verified: Documentation-only change | details: no automated tests run beyond pre-commit formatting/lint hooks; AGENTS.md formatted with Prettier." }
doc_version: 2
doc_updated_at: "2026-01-30T11:57:28+00:00"
doc_updated_by: "agentctl"
description: "Apply relevant recommended updates to AGENTS.md (policy, preflight, commit workflow, and approvals definitions)."
---
## Summary

Update AGENTS.md with selected recommended policy refinements (preflight, approvals definitions, commit modes, config patch note).

## Context

User requested applying relevant AGENTS.md recommendations to current policy file without changing unrelated files.

## Scope

- Update AGENTS.md version header and add PURPOSE section.\n- Add MANDATORY PREFLIGHT runbook and network approval definitions.\n- Clarify orchestration, status transitions exception, and commit workflow modes.\n- Add CONFIG PATCH recommendation block.

## Risks

- Minor wording shifts could conflict with existing agent behavior if misread.\n- Added config patch is advisory only; risk of confusion if interpreted as already applied.

## Verify Steps

- N/A (documentation-only change).

## Rollback Plan

- Revert AGENTS.md to previous revision.

## Notes

Config patch is documented only; no config changes applied.

