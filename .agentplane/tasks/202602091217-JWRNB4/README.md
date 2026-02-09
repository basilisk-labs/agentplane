---
id: "202602091217-JWRNB4"
title: "Upgrade redesign: manifest-based safe upgrade"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
  - "upgrade"
  - "roadmap"
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
    author: "ORCHESTRATOR"
    body: "Start: Deliver safe upgrade for live workspaces: strict managed set via manifest, state/baseline/lock under .agentplane/.upgrade, and local (npm-installed) framework source by default."
events:
  -
    type: "status"
    at: "2026-02-09T12:18:04.823Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Deliver safe upgrade for live workspaces: strict managed set via manifest, state/baseline/lock under .agentplane/.upgrade, and local (npm-installed) framework source by default."
doc_version: 2
doc_updated_at: "2026-02-09T14:26:32.136Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement a deterministic, safe upgrade pipeline: strict managed-file manifest, baseline-backed 3-way merges, lock/state under .agentplane/.upgrade, and local framework source (npm-installed) by default."
id_source: "generated"
---
## Summary

Redesign agentplane upgrade to be safe in live workspaces by applying a strict manifest of framework-managed files only, using baseline-backed merges, and isolating upgrade state under .agentplane/.upgrade. Default upgrade source becomes the locally installed npm package framework snapshot.

## Scope


## Plan

1. Define strict managed-set manifest for framework files (paths, types, merge strategy).\n2. Implement local framework source (npm-installed assets) as the default upgrade input; keep remote source behind explicit flags.\n3. Implement .agentplane/.upgrade state (state.json, baseline snapshots, backups, lock).\n4. Enforce denylist invariants (never touch .agentplane/tasks/**, .agentplane/.upgrade/**, .git/**; no path traversal).\n5. Implement deterministic merge strategies (AGENTS.md block preservation; agent JSON 3-way).\n6. Update and extend tests (upgrade safety, plan computation, baseline merges).\n7. Cut a release.

## Risks


## Verification


## Rollback Plan


## Context

Current upgrade behavior mixes bundle scanning and broad allowlists, and can be unsafe in repos with user data under .agentplane/. Upgrade must never touch task state or other user-owned data, and must have deterministic merge rules and baseline state for 3-way merges.

## Verify Steps

Commands:\n- bun run lint\n- bun run test:full\n- bun run coverage\n\nPass criteria:\n- All checks pass.\n- Upgrade code has tests proving it never writes to .agentplane/tasks/** even when upstream tarball contains it.\n- Upgrade applies only manifest paths and produces deterministic plan output.

## Notes

### Implementation Notes\n- Implemented strict framework-managed file set via packages/agentplane/assets/framework.manifest.json; upgrade applies only manifest entries (no directory scans).\n- Default upgrade source is now the locally installed agentplane package assets (no network). Remote GitHub mode requires --remote.\n- Added denylist enforcement for .agentplane/tasks/**, .agentplane/.upgrade/**, and .git/**.\n- Added .agentplane/.upgrade/{lock.json,state.json,baseline/} and legacy baseline fallback from .agentplane/upgrade/baseline.\n- Added safety regression test ensuring upgrade never writes into .agentplane/tasks/**.\n\n### Deferred\n- Structured backups under .agentplane/.upgrade/backups (current behavior still uses sibling .bak-* backups).\n- Explicit conflict reporting / finalize / rollback subcommands.\n- Manifest checksums/signing for remote sources beyond optional bundle sha256.
