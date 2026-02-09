---
id: "202602091523-BNCKWA"
title: "upgrade: remove or harden tarball fallback"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202602091523-1TY4G2"
tags:
  - "upgrade"
  - "safety"
  - "network"
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
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-02-09T15:23:47.659Z"
doc_updated_by: "CODER"
description: "Make remote upgrade require proper release assets + checksum. If a tarball fallback is kept, require an embedded upgrade manifest proving it is an upgrade bundle."
id_source: "generated"
---
## Summary

Stop unsafe tarball_url fallback in upgrade. Remote upgrade should use explicit release assets with checksum; tarball fallback (if any) must validate an embedded manifest.

## Scope

packages/agentplane/src/commands/upgrade.ts and unit tests around release downloads.

## Plan

1. Change resolveUpgradeDownloadFromRelease to error when expected assets are missing (default).\n2. Optionally gate tarball fallback behind an explicit flag and require embedded manifest.\n3. Update tests for expected behavior.\n4. bun run lint + bun run test:full.

## Risks

Users relying on tarball fallback will need to update their release process to publish upgrade assets.

## Verify Steps

- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit to restore fallback.
