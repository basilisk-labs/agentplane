---
id: "202601200656-J6NW39"
title: "Define core minimum and recipe permissions"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["recipes", "docs"]
verify: []
commit: { hash: "6a935ba8cde99e26ae1e49cb20e1ea8294296797", message: "✨ J6NW39 codify core minimum and recipe permissions" }
comments:
  - { author: "DOCS", body: "verified: close: core minimum defined | details: tools allowed by default; recipe agentctl usage permitted under guardrails." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:58.348Z"
doc_updated_by: "agentplane"
description: "Update AGENTS.md and RECIPES.md to codify the minimal task workflow, allow tools by default, and allow recipe-driven agentctl usage under guardrails."
---
## Summary

Defined the core minimum agent/task workflow and updated recipe rules to allow tools by default and permit agentctl usage under guardrails.

## Context

Needed to formalize the minimal core behavior while shifting extensions into recipes and loosening tool/agentctl permissions for recipe scenarios.

## Scope

Updated AGENTS.md to add a core-minimum section and recipe-driven agentctl allowance; updated RECIPES.md to allow tools by default and to permit agentctl usage with confirmation.

## Risks

Allowing recipe-driven agentctl use increases risk of misuse; strict confirmation and guardrails must be enforced in scenarios.

## Verify Steps

Reviewed AGENTS.md and RECIPES.md updates for consistency with guardrails and recipe policies.

## Rollback Plan

Revert commit 6a935ba8cde9 to restore the previous core minimum and recipe permission rules.

## Notes

Tools are still explicit; only the default allowance changed, not the confirmation requirement.
