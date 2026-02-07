---
id: "202601301642-0K6CMD"
title: "Port recipes parity to Node CLI"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "nodejs"
  - "recipes"
  - "cli"
  - "parity"
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
  hash: "288bfc1d0793b4b65ac77a20134d9221a4da03b5"
  message: "✨ VYSD18 0K6CMD BEQYED PAR1TY RDMP01 RCP1A2 RJHP2H quickstart guide, recipes explain, parity docs, roadmap"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Implement Node CLI recipe parity, optimize installs, and refresh recipe listing."
  -
    author: "ORCHESTRATOR"
    body: "Verified: quickstart/role guide, recipes explain + docs updates; tests: bun test packages/agentplane/src/run-cli.test.ts (pass)."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:33.595Z"
doc_updated_by: "agentplane"
description: "Implement Node CLI support for Python recipes.py features: list-remote/install/list/full/tag search/metadata cache and optimized recipe handling."
---
## Summary

Recipes CLI now uses the installed registry for list/tag, adds recipes explain with scenario details, and updates recipe docs accordingly.

## Scope

packages/agentplane/src/run-cli.ts; packages/agentplane/src/help.ts; packages/agentplane/src/run-cli.test.ts; docs/recipes-how-it-works.mdx; docs/recipes-spec.mdx; docs/commands.mdx; docs/cli-contract.mdx.

## Risks

Explain output can be verbose; scenario details depend on definition files being present in installed recipes.

## Verify Steps

bun test packages/agentplane/src/run-cli.test.ts

## Rollback Plan

Revert recipe CLI and docs changes to restore previous list/info behavior.

## Plan


## Verification
