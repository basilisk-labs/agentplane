---
id: "202601301500-VYSD18"
title: "Node CLI: help source + publish dist hardening"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["nodejs", "cli", "help", "packaging"]
commit: { hash: "288bfc1d0793b4b65ac77a20134d9221a4da03b5", message: "✨ VYSD18 0K6CMD BEQYED PAR1TY RDMP01 RCP1A2 RJHP2H quickstart guide, recipes explain, parity docs, roadmap" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: aligning help/quickstart source with CLI manifest and hardening npm publish flow." }
  - { author: "ORCHESTRATOR", body: "Verified: quickstart/role guide, recipes explain + docs updates; tests: bun test packages/agentplane/src/run-cli.test.ts (pass)." }
doc_version: 2
doc_updated_at: "2026-02-01T13:03:00+00:00"
doc_updated_by: "agentctl"
description: "Move help/quickstart source into CLI manifest, remove agentctl.md dependency, and harden npm publish with prepack/prepare."
---
## Summary

Quickstart/role now use the built-in command guide, quickstart includes core CLI workflows, and help output lists recipe explain.

## Scope

packages/agentplane/src/command-guide.ts; packages/agentplane/src/run-cli.ts; packages/agentplane/src/help.ts; packages/agentplane/src/run-cli.test.ts; docs/commands.mdx; docs/cli-contract.mdx; docs/audits/nodejs-parity-matrix.md; docs/audits/parity-report.md.

## Risks

Command guide text can drift from actual CLI behavior; quickstart/role output changes may surprise existing users.

## Verify Steps

bun test packages/agentplane/src/run-cli.test.ts

## Rollback Plan

Revert the command-guide and CLI quickstart/role changes; restore prior help text if needed.

