---
id: "202602090839-SASHMS"
title: "Release v0.2.0"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
depends_on: []
tags:
  - "release"
  - "cli"
  - "npm"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: Prepare v0.2.0 release (notes + version bumps + validation), tag v0.2.0, and push to trigger publish workflow."
events:
  -
    type: "status"
    at: "2026-02-09T08:39:47.236Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Prepare v0.2.0 release (notes + version bumps + validation), tag v0.2.0, and push to trigger publish workflow."
doc_version: 2
doc_updated_at: "2026-02-09T08:40:35.956Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare and push release v0.2.0: bump package versions (core + agentplane), add release notes docs/releases/v0.2.0.md, run validation scripts, create git tag v0.2.0, and push tag to trigger publish workflow."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Create docs/releases/v0.2.0.md (English, Release Notes heading, >=3 bullets).
2. Bump versions to 0.2.0: packages/core/package.json and packages/agentplane/package.json.
3. Update packages/agentplane dependency on @agentplaneorg/core to 0.2.0.
4. Run repo verification commands (lint/tests/coverage) and release validation scripts.
5. Commit changes.
6. Create git tag v0.2.0 at the release commit.
7. Push commit(s) and tag to origin.

## Risks


## Verify Steps

1. bun run lint
2. bun run test:full
3. bun run coverage
4. node scripts/check-release-notes.mjs --tag v0.2.0
5. node scripts/check-release-version.mjs --tag v0.2.0
6. git tag -l v0.2.0 (should be empty)
7. git push origin main && git push origin v0.2.0

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Notes

### Overrides
- Direct git operations will be used for tagging/pushing because there is no agentplane command for git tag/push.
