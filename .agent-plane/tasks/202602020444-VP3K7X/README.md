---
id: "202602020444-VP3K7X"
title: "Remove v1 mentions and restructure docs"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["docs"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: update docs to remove first-version mentions; align Node.js as 1.0; restructure docs index for clearer reading order." }
doc_version: 2
doc_updated_at: "2026-02-02T05:49:06+00:00"
doc_updated_by: "agentctl"
description: "Audit docs for references to the first version, treat Node.js as v1.0, remove v1 language, and restructure documentation sections for clarity."
---
## Summary

Removed first-version wording across docs by aligning references to Node.js 1.0 and cleaned titles/descriptions.

## Scope

Docs only: updated user/developer docs and docs index structure; no code changes.

## Risks

Risk of missed phrasing in docs outside current set or unintended meaning change; mitigated by keyword scan.

## Verify Steps

- rg -n "(?i)\b(v1|version\s+1|version\s+1\.0|first\s+version|первая\s+версия)\b" docs ROADMAP.md README.md

## Rollback Plan

Revert docs changes via git checkout or reset to prior commit; restore previous wording and index order if needed.

