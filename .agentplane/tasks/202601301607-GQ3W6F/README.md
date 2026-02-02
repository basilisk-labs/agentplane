---
id: "202601301607-GQ3W6F"
title: "Add npm metadata for publishable packages"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["npm", "packaging", "metadata"]
verify: []
commit: { hash: "860540aad6688af1fac836f40449465e58d5f788", message: "✅ GQ3W6F close: record task doc" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: add npm metadata across packages for publish readiness." }
  - { author: "ORCHESTRATOR", body: "verified: metadata added for npm packages | details: ready for publish without changing private flags." }
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
