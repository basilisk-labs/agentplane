---
id: "202602031117-YAQ677"
title: "Fix init branch_pr commit guard in empty repo"
status: "TODO"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["init", "git", "workflow", "cli"]
verify: []
commit: null
comments: []
doc_version: 2
doc_updated_at: "2026-02-03T11:43:01.337Z"
doc_updated_by: "agentplane"
description: "Fix agentplane init: when workflow_mode=branch_pr in an empty directory, bootstrap git repo and base branch before enforcing commit guard, so init can create its install commit on the initial branch. Add regression tests for empty repo branch_pr init and ensure guard still blocks commits on main for non-empty repos."
id_source: "generated"
---
## Summary

Fix branch_pr init so empty repos bootstrap git/base branch before commit guard, allowing the install commit to land on the initial branch.

## Scope

Update init flow to initialize git and base branch before enforcing commit guard in empty directories; add regression tests for empty-repo branch_pr init and ensure non-empty repos still enforce main-branch guard.

## Risks

Init could allow commits on an unintended branch or skip guard checks if bootstrap order is wrong.

## Verify Steps

bun run test:cli:core -- -t "init branch_pr"

## Rollback Plan

Revert the init flow change and the added tests.
