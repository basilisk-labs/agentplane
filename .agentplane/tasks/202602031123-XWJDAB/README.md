---
id: "202602031123-XWJDAB"
title: "Init branch selection for branch_pr"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["init", "workflow", "git", "cli"]
verify: []
commit: { hash: "365842eebfe3f0d00a75fe29ba29703927f3b58c", message: "✨ XWJDAB init branch_pr base selection" }
comments:
  - { author: "ORCHESTRATOR", body: "Verified: branch_pr init now prompts for base branch in existing repos, defaults to main in empty dirs; tests run (bun run test:cli:core)." }
  - { author: "ORCHESTRATOR", body: "Verified: branch_pr init now prompts for base branch in existing repos, defaults to main in empty dirs; tests run (bun run test:cli:core)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:54.022Z"
doc_updated_by: "agentplane"
description: "When init runs in branch_pr mode: if repository is empty, default base branch to main; if repo exists, prompt user to select existing branch or enter a new branch name to create. Add validation and tests for both cases."
id_source: "generated"
---
## Summary

Add interactive base-branch selection for branch_pr init in existing repos; keep default main for empty dirs. Include non-interactive safeguards and tests.



## Scope

Update init flow to prompt for base branch in branch_pr when repo already exists; create branch when requested; keep empty-repo default main. Add CLI core tests for empty repo and existing repo defaults.



## Risks

Prompt path only triggers in interactive branch_pr init; non-interactive behavior must remain unchanged. Branch creation could fail if git rejects the name.



## Verify Steps

bun run test:cli:core -- -t "init branch_pr"



## Rollback Plan

Revert the promptInitBaseBranch changes and the new init tests; restore prior resolveInitBaseBranch-only behavior.
