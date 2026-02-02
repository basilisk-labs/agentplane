---
id: "202601301034-33N5SF"
title: "Update AGENTS.md wording clarifications"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["docs", "agents", "workflow"]
verify: []
commit: { hash: "d505ce92dc8090ac3c01e0a08e093f3d59b6b95f", message: "✨ 33N5SF docs: clarify AGENTS.md wording" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: documentation-only update | details: no tests required; pre-commit hooks ran prettier/eslint during commit." }
doc_version: 2
doc_updated_at: "2026-01-30T10:36:31+00:00"
doc_updated_by: "agentctl"
description: "Apply minimal wording fixes in AGENTS.md to clarify sources of truth, model wording, clean status, commit subject/body, startup rule, and README updates via agentctl."
---
## Summary

Apply minimal AGENTS.md wording fixes (sources of truth, model wording, clean status, commit subject/body, startup rule, README update rule).

## Context

User requested precise, minimal replacements to remove contradictions in AGENTS.md.

## Scope

- Update AGENTS.md per the requested patch proposals.
- Keep changes documentation-only.

## Risks

Low; documentation-only edits may slightly change interpretation.

## Verify Steps

- Not required (docs-only).

## Rollback Plan

Revert the AGENTS.md commit for this task.

## Notes

Task created from the 2026-01-30 request.
