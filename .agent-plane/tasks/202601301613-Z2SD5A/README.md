---
id: "202601301613-Z2SD5A"
title: "Set package versions to 0.1.0 and verify npm pack"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["npm", "release", "packaging"]
commit: { hash: "81a3021918e1de82b153a70f445be03399911bcf", message: "✅ Z2SD5A close: record task doc" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: bump versions to 0.1.0 and run npm pack." }
  - { author: "ORCHESTRATOR", body: "verified: npm pack succeeded for agentplane@0.1.0 | details: tarball contents reviewed." }
doc_version: 2
doc_updated_at: "2026-01-30T16:14:15+00:00"
doc_updated_by: "agentctl"
description: "Bump package versions to 0.1.0 and run npm pack check for agentplane."
---
## Summary

- Set package versions to 0.1.0.\n- Run npm pack to verify publish contents.

## Scope

- Update version fields to 0.1.0 (agentplane + core).\n- Run npm pack in packages/agentplane and inspect output.

## Risks

- Version mismatch across packages could break dependency resolution.\n- npm pack output might include unintended files.

## Verify Steps

- npm pack (from packages/agentplane)

## Rollback Plan

- Revert version changes and remove generated pack file.

