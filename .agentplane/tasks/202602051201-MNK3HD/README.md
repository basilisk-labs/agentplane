---
id: "202602051201-MNK3HD"
title: "Epic: verify from README + zip validation (yauzl)"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["workflow", "verify", "security"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: coordinating zip validation via yauzl and README-driven verify workflow across sub-tasks." }
doc_version: 2
doc_updated_at: "2026-02-05T12:48:56.026Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement verify workflow from Verify Steps, add Verification section, and switch zip validation to yauzl with config/init support."
id_source: "generated"
---
## Summary

Epic: add README-driven verify execution, write Verification sections on verify, and switch zip validation to yauzl with approval/config/init updates.

## Scope

Deliver AP-020c zip validation (yauzl), README-driven verify execution, Verification section updates, and require_verify config/init/docs changes.

## Risks

Verify now depends on task docs support and may prompt in interactive mode; zip symlink detection relies on externalFileAttributes.

## Verify Steps

cmd: bun run lint
cmd: bun run test:fast
cmd: node packages/agentplane/bin/agentplane.js hooks run pre-commit
- Confirm Verification sections populated for tasks 202602051201-695YXF and 202602051201-7KW7RP
- Confirm zip validation uses yauzl in archive handling

## Verification

Status: pass
Verified at: 2026-02-05
Details: bun run lint; bun run test:fast; hooks pre-commit; verify tasks 695YXF and 7KW7RP.

## Rollback Plan

Revert task commits for verify workflow and yauzl integration; restore previous config sections and remove require_verify.
