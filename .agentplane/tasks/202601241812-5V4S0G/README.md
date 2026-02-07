---
id: "202601241812-5V4S0G"
title: "Rename project to Agent Plane"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "rename"
  - "docs"
  - "workflow"
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
  hash: "65258ddd032cfd6abb586ecce6bc66b6de3fcfb9"
  message: "✨ 5V4S0G rename: migrate framework paths and branding to Agent Plane"
comments:
  -
    author: "ORCHESTRATOR"
    body: "verified: rg -n --hidden --glob '!.git/*' --glob '!**/.agent-plane/tasks/**' old-name patterns returned no matches | details: python .agent-plane/agentctl.py config show OK."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:01.650Z"
doc_updated_by: "agentplane"
description: "Rename all project references and paths to Agent Plane, including folder names and docs/scripts to keep workflows functional."
---
## Summary

- Renamed the framework directory to .agent-plane and updated references across docs, scripts, and config.
- Updated agentctl/recipes/backend path references and branding to Agent Plane.
- Refreshed task auto-summary path references after renaming.

## Context

- Project rebrand requires replacing the old name and folder paths everywhere so the workflow remains functional.

## Scope

- Replace name/path variants across repo text and config.
- Rename the framework directory to .agent-plane and update dependent scripts/configs.
- Update task records and auto summaries to reflect new paths.

## Risks

- External tooling or cached paths pointing to the old directory name may break until updated.
- Untracked or ignored artifacts may still reference the old name.

## Verify Steps

- rg -n --hidden --glob '!.git/*' --glob '!**/.agent-plane/tasks/**' "Codex Swarm|CodexSwarm|codex-swarm|codex_swarm|codexswarm|CODEX_SWARM|CODEX-SWARM"
- python .agent-plane/agentctl.py config show

## Rollback Plan

- git revert <commit>
- Restore the previous directory name and paths from the prior commit if needed.

## Notes

- Repo root already uses the agentplane name; no on-disk rename was required.

## Plan


## Verification
