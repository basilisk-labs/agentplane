---
id: "202602011246-RJHP2H"
title: "Close open Node CLI parity tasks and align recipes/quickstart"
status: "TODO"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["nodejs"]
doc_version: 2
doc_updated_at: "2026-02-01T13:05:32+00:00"
doc_updated_by: "agentctl"
description: "Audit open parity tasks, implement quickstart guide in CLI help, complete recipes explain/bundle logic, and close remaining open tasks."
---
## Summary

Closed open Node CLI parity tasks by updating quickstart/role guidance, recipes explain output, parity audits, and ROADMAP.md.

## Scope

packages/agentplane/src/command-guide.ts; packages/agentplane/src/run-cli.ts; packages/agentplane/src/help.ts; packages/agentplane/src/run-cli.test.ts; docs/commands.mdx; docs/cli-contract.mdx; docs/recipes-how-it-works.mdx; docs/recipes-spec.mdx; docs/audits/parity-report.md; docs/audits/nodejs-parity-matrix.md; ROADMAP.md.

## Risks

Guide text can drift from CLI behavior; recipe explain output may be verbose for large scenarios.

## Verify Steps

bun test packages/agentplane/src/run-cli.test.ts

## Rollback Plan

Revert the commit to restore prior CLI output and documentation.

