---
id: "202601291450-J773F8"
title: "Add agentplane-recipes as submodule"
status: "DOING"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["git", "recipes"]
comments:
  - { author: "CODER", body: "Start: add agentplane-recipes submodule at repo root." }
doc_version: 2
doc_updated_at: "2026-01-29T14:50:35+00:00"
doc_updated_by: "agentctl"
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

