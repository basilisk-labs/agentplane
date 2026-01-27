---
id: "202601271201-64SSC0"
title: "AP-016: git hooks install/uninstall"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: ["202601271200-960Y3S", "202601271200-2YFSTJ"]
tags: ["nodejs", "roadmap", "git", "hooks"]
verify: ["bun run ci"]
doc_version: 2
doc_updated_at: "2026-01-27T12:33:32+00:00"
doc_updated_by: "agentctl"
description: "Implement hooks install/uninstall with shim strategy and env flags; idempotent and safe."
---
## Summary

Add hooks install/uninstall and hook runner with local shim.

## Scope

Hook scripts for commit-msg/pre-commit/pre-push; local .agentplane/bin shim; CLI commands and tests; help updates.

## Risks

Hooks can block commits if repository lacks bun or built CLI.

## Verify Steps

bun run ci

## Rollback Plan

git revert <commit>

