---
id: "202601290713-TACT48"
title: "AP-028: upgrade command (GitHub source, dry-run, backup)"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202601290713-51T41E"
tags:
  - "roadmap"
  - "nodejs"
  - "upgrade"
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
commit:
  hash: "554ddb2ec2114b948f572832990c04d807b6c3db"
  message: "feat: TACT48 upgrade command"
comments:
  -
    author: "CODER"
    body: "Start: implement agentplane upgrade (GitHub source, dry-run, backup) and tests."
  -
    author: "CODER"
    body: "verified: bun run ci:agentplane (2026-01-29). | details: Scope: upgrade command with bundle download, checksum validation, backups, and tests."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:16.207Z"
doc_updated_by: "agentplane"
description: "Implement agentplane upgrade to fetch GitHub bundle, verify sha256, support 202601041253-00001 diff, and default backups."
---
## Summary

Implement agentplane upgrade to fetch a release bundle, verify sha256, support 202601041253-00001, and apply upgrades with backups by default.

## Scope

- Add upgrade command with GitHub release downloads, checksum validation, and safe bundle extraction.\n- Apply bundle files to AGENTS/.agentplane with default backups and 202601041253-00001 reporting.\n- Add CLI help text and upgrade tests using local bundles.

## Risks

- Bundle contents could still be wrong/malicious; path allowlist reduces scope to AGENTS.md and .agentplane/.\n- Backup growth can accumulate; users may need to prune old .bak files.

## Verify Steps

- 2026-01-29: bun run ci:agentplane (pass)

## Rollback Plan

- Revert the upgrade command commits to restore previous behavior.

## Plan


## Verification
