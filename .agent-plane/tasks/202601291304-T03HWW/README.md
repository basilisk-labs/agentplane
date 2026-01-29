---
id: "202601291304-T03HWW"
title: "Remove agentplane-recipes gitlink from main repo"
status: "DOING"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["git", "workflow"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: remove unintended agentplane-recipes gitlink from main repo." }
doc_version: 2
doc_updated_at: "2026-01-29T13:04:21+00:00"
doc_updated_by: "agentctl"
description: "Untrack the unintended gitlink entry for the nested recipes repo and keep it ignored in the main repo."
---
## Summary

Remove the accidental submodule tracking of agentplane-recipes in the main repo and ensure it stays ignored.

## Scope

- Remove gitlink entry for agentplane-recipes from the main repo index\n- Add ignore rule to keep the nested repo out of version control

## Risks

- If other workflows expect agentplane-recipes to be tracked in the main repo, they may need updates

## Verify Steps

- git status --short

## Rollback Plan

- Re-add the gitlink entry for agentplane-recipes if tracking is desired

