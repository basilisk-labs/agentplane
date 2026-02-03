---
id: "202601301916-RCP1A2"
title: "Describe Node CLI recipes"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["nodejs", "recipes", "docs", "analysis"]
verify: []
commit: { hash: "288bfc1d0793b4b65ac77a20134d9221a4da03b5", message: "✨ VYSD18 0K6CMD BEQYED PAR1TY RDMP01 RCP1A2 RJHP2H quickstart guide, recipes explain, parity docs, roadmap" }
comments:
  - { author: "ORCHESTRATOR", body: "Verified: quickstart/role guide, recipes explain + docs updates; tests: bun test packages/agentplane/src/run-cli.test.ts (pass)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:34.896Z"
doc_updated_by: "agentplane"
description: "Review Node.js CLI code to explain recipes, their capabilities/contents, and give an example recipe not yet implemented."
---
## Summary

Documented Node CLI recipes usage and explain command across recipe docs and command references.


## Scope

docs/recipes-how-it-works.mdx; docs/recipes-spec.mdx; docs/commands.mdx; docs/cli-contract.mdx.


## Risks

Documentation can drift if recipes behavior changes; keep references up to date.


## Verify Steps

Manual review of recipe docs and command references.


## Rollback Plan

Revert documentation updates if they conflict with CLI behavior.
