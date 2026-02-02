---
id: "202601290713-51T41E"
title: "AP-026: init interactive + non-TTY flags"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601270756-B8J0CW", "202601270756-V6CK4Q", "202601270943-DEBAMR", "202601271201-64SSC0", "202601290713-JACYHS"]
tags: ["roadmap", "nodejs", "init"]
verify: []
commit: { hash: "ccd6c06cb81ed9c6e634d7838e2250244af2013a", message: "test: 51T41E cover init flag validation and integrate quiet parse" }
comments:
  - { author: "CODER", body: "Start: Begin AP-026 implementation for agentplane init (interactive + non-TTY flags)." }
  - { author: "CODER", body: "verified: 51T41E close: bun run ci | details: update doc sections and mark DONE." }
doc_version: 2
doc_updated_at: "2026-01-29T08:00:53+00:00"
doc_updated_by: "agentctl"
description: "Implement agentplane init with interactive prompts (IDE/workflow/hooks/recipes) plus non-TTY flags: --ide, --workflow, --hooks, --recipes, --yes."
---
## Summary

Implemented agentplane init with flags and non-TTY defaults, plus tests covering init/cleanup/integrate parsing and coverage.

## Scope

Add init command (flags + non-TTY requirements), ensure ide sync/hook install options, and extend CLI tests to cover new parse branches.

## Risks

Low risk. Main risk is incorrect init flag validation or non-TTY enforcement; covered by CLI tests.

## Verify Steps

bun run ci

## Rollback Plan

git revert <commit>
