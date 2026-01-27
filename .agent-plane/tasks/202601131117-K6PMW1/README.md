---
id: "202601131117-K6PMW1"
title: "Include viewer.sh in init commit"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["git", "workflow", "ui"]
commit: { hash: "d4adf93a7f4cf03ffa85195579824cf51837b277", message: "✨ K6PMW1 AGENTS_SPEC v0.2: add viewer.sh to init commit; include AGENTS_SPEC in init commit message" }
comments:
  - { author: "CODER", body: "Verified: not run; changes reviewed in clean.sh and clean.ps1 only, no automated tests executed." }
doc_version: 2
doc_updated_at: "2026-01-13T11:22:42+00:00"
doc_updated_by: "agentctl"
description: "Ensure clean.sh/clean.ps1 add viewer.sh to the init commit and include AGENTS_SPEC version in the init commit message so the file is not left uncommitted."
---
## Summary

Include viewer.sh in the init commit and annotate the init commit subject with the AGENTS_SPEC version.

## Context

Clean scripts reinitialize the repo after cleanup; viewer.sh was left untracked and the init commit message needed a version tag.

## Scope

- Add viewer.sh to the init commit staging in clean.sh and clean.ps1.
- Build the init commit message with AGENTS_SPEC version from AGENTS.md (fallback to default when missing).
- Leave the rest of the cleanup flow unchanged.

## Risks

If AGENTS.md header changes or viewer.sh is missing, the init commit could fall back to the default message or fail to stage that file.

## Verify Steps

Manual: run ./clean.sh or clean.ps1 in a disposable copy; confirm the init commit includes viewer.sh and the subject includes AGENTS_SPEC v0.2.

## Rollback Plan

Revert clean.sh and clean.ps1 to the previous staging list and commit message logic.

## Notes

Commit message uses the AGENTS_SPEC header value when present.

