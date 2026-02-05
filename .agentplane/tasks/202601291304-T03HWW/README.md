---
id: "202601291304-T03HWW"
title: "Remove agentplane-recipes gitlink from main repo"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["git", "workflow"]
verify: []
commit: { hash: "735ba4a1142f62c7b9942c7fafd977b8c66bca4b", message: "🚧 T03HWW remove recipes gitlink" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: remove unintended agentplane-recipes gitlink from main repo." }
  - { author: "ORCHESTRATOR", body: "verified: removed the agentplane-recipes gitlink from the main repo and added an ignore rule | details: git status --short is clean." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:23.038Z"
doc_updated_by: "agentplane"
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
