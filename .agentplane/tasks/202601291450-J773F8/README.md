---
id: "202601291450-J773F8"
title: "Add agentplane-recipes as submodule"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["git", "recipes"]
verify: []
commit: { hash: "03ea920539c25dd926344d51524087a5d36b2210", message: "✨ J773F8 add recipes submodule" }
comments:
  - { author: "CODER", body: "Start: add agentplane-recipes submodule at repo root." }
  - { author: "CODER", body: "verified: submodule added at agentplane-recipes/ and lint ignores updated." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:24.057Z"
doc_updated_by: "agentplane"
description: "Track the recipes repository as a git submodule in the main repo root."
---
## Summary

Add agentplane-recipes as a git submodule in the repo root.

## Scope

- Add submodule at agentplane-recipes/ pointing to basilisk-labs/agentplane-recipes\n- Remove ignore rule that blocks submodule tracking

## Risks

- Submodule requires network access for clones and updates

## Verify Steps

- git submodule status

## Rollback Plan

- Remove submodule and restore ignore rule
