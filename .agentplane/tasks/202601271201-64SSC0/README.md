---
id: "202601271201-64SSC0"
title: "AP-016: git hooks install/uninstall"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601271200-960Y3S", "202601271200-2YFSTJ"]
tags: ["nodejs", "roadmap", "git", "hooks"]
verify: ["bun run ci"]
commit: { hash: "bffcb1f041bf5d7d0a4c14feb4b5ed6089d20e26", message: "✨ 64SSC0 AP-016: stabilize hook tests" }
comments:
  - { author: "CODER", body: "verified: bun run ci passed via pre-commit (format, typecheck, lint, coverage)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:11.245Z"
doc_updated_by: "agentplane"
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
