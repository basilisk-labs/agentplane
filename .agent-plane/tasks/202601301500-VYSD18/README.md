---
id: "202601301500-VYSD18"
title: "Node CLI: help source + publish dist hardening"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["nodejs", "cli", "help", "packaging"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: aligning help/quickstart source with CLI manifest and hardening npm publish flow." }
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

