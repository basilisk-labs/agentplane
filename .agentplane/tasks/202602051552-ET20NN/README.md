---
id: "202602051552-ET20NN"
title: "AP-090: CLI version from package.json"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "versioning", "cli"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: Switch CLI version to package.json source, update tests/docs." }
doc_version: 2
doc_updated_at: "2026-02-05T16:18:16.074Z"
doc_updated_by: "CODER"
description: "Use package.json as source for CLI version; remove manual constant; update tests/docs."
id_source: "generated"
---
## Summary

Use package.json as the single source for CLI version and remove hardcoded version constants.

## Scope

- Locate current CLI version source.\n- Read version from package.json.\n- Update tests/docs.

- Locate current CLI version source.
- Read version from package.json.
- Update tests/docs.

## Risks

- Version resolution could break when running outside repo (packaged CLI).

## Verify Steps

- bun run test:fast.
- Verify agentplane --version matches package.json.

## Verification

- ✅ bun run test:fast (pass).\n- ✅ --version matches packages/agentplane/package.json (via test).

## Rollback Plan

- Revert to prior version constant behavior.
