---
id: "202601130916-H75K4M"
title: "Hook install prompt in clean scripts"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["cleanup", "workflow"]
verify: []
commit: { hash: "4ad5ab8018fe75d23a7611035a807391e89f3609", message: "✨ H75K4M update clean scripts for hook prompt + init commit" }
comments:
  - { author: "CODER", body: "Verified: manual checks only; clean.sh/clean.ps1 prompt appears after init commit; no automated tests run." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:42.554Z"
doc_updated_by: "agentplane"
description: "Update clean.sh and clean.ps1 to use a Agent Plane Initialized commit message and optionally install git hooks via an interactive prompt."
---
## Summary

Add an opt-in hooks install prompt to clean scripts and update the initial commit message.

## Context

clean.sh and clean.ps1 initialize a fresh repo; add an explicit opt-in prompt to install agent-plane hooks and update the initial commit subject.

## Scope

- Change clean.sh and clean.ps1 initial commit message to "Agent Plane Initialized".
- Add an interactive prompt after the initial commit to optionally install hooks via agentctl.
- Keep the hooks opt-in (no silent install).

## Risks

Prompt could be missed in non-interactive runs; default remains no install to preserve opt-in behavior.

## Verify Steps

Manual: run clean.sh / clean.ps1 in a disposable repo and confirm the prompt appears after the initial commit.

## Rollback Plan

Revert the clean script changes and restore the previous commit message and no-hook prompt.

## Notes

Hooks remain opt-in; prompt appears only on interactive runs.
