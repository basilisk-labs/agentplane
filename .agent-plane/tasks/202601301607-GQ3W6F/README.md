---
id: "202601301607-GQ3W6F"
title: "Add npm metadata for publishable packages"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["npm", "packaging", "metadata"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: add npm metadata across packages for publish readiness." }
doc_version: 2
doc_updated_at: "2026-01-30T16:08:07+00:00"
doc_updated_by: "agentctl"
description: "Populate package metadata (description/keywords/etc.) for npm display and global install readiness."
---
## Summary

- Add npm metadata for Agent Plane packages.\n- Keep CLI installable via npm i -g agentplane@latest.

## Scope

- Update package.json metadata for packages/agentplane and packages/core.\n- Add descriptive fields to internal packages for consistency.

## Risks

- Incorrect metadata could misrepresent the package on npm.\n- Publishing private packages unintentionally if private flags are changed.

## Verify Steps

- Review package.json metadata fields for correctness.

## Rollback Plan

- Revert package.json metadata changes if needed.

