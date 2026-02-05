---
id: "202601200657-E52CV8"
title: "Plan migration of extensions to recipes"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: ["202601200656-J6NW39"]
tags: ["recipes", "planning"]
verify: []
commit: { hash: "5826e825cf6f8399b6dd8d946dcf261ca84ddc00", message: "✅ J6NW39 verified: close: core minimum defined | details: tools allowed by default; recipe agentctl usage permitted under guardrails." }
comments:
  - { author: "ORCHESTRATOR", body: "verified: close: migration plan defined | details: phases and dependencies recorded." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:58.671Z"
doc_updated_by: "agentplane"
description: "Produce a phased migration plan with dependencies for moving non-core features into recipes while keeping agentctl and safety guardrails intact."
---
## Summary

Defined a phased migration plan to move extension features into recipes while keeping the core minimal.

## Context

The framework should keep only agent runtime and guardrails; all higher-level workflows must be implemented as recipes.

## Scope

Phase 1 (202601200657-W1Y6ND): move planning/analysis helpers into recipes (roadmap/spec/decomposition).\nPhase 2 (202601200657-VNFXH3): move QA/test planning, release checklists, docs scaffolding into recipes.\nPhase 3 (202601200657-Y0P8RY): prune core to agent runtime + agentctl guardrails; update docs and inventory.

## Risks

Risk of breaking existing workflows if recipe replacements are incomplete; maintain core fallbacks until recipes are validated.

## Verify Steps

Review the phase plan with stakeholders; confirm dependency order in task list.

## Rollback Plan

Do not remove core behaviors until recipe replacements are validated; revert any migration commit that removes core functionality prematurely.

## Notes

Dependencies are strictly sequential: J6NW39 -> E52CV8 -> W1Y6ND -> VNFXH3 -> Y0P8RY.
