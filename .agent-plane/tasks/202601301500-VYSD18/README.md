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
doc_updated_at: "2026-01-30T15:17:30+00:00"
doc_updated_by: "agentctl"
description: "Move help/quickstart source into CLI manifest, remove agentctl.md dependency, and harden npm publish with prepack/prepare."
---
## Summary

- Add a built-in command guide for agentplane quickstart/role output.
- Remove the Node CLI dependency on agentctl.md and update agent instructions.
- Add npm prepare/prepack build steps and relax config schema for agentctl_docs_path.

## Scope

- packages/agentplane/src/command-guide.ts
- packages/agentplane/src/run-cli.ts
- packages/agentplane/src/run-cli.test.ts
- packages/agentplane/package.json
- packages/core/src/config.ts
- packages/core/src/base-branch.test.ts
- packages/spec/schemas/config.schema.json
- packages/spec/examples/config.json
- AGENTS.md
- .agent-plane/agents/*.json
- clean.sh
- clean.ps1

## Risks

- Command guide text can drift from actual CLI flags/behavior if not kept in sync.
- Switching the guidance source from agentctl.md may confuse users who rely on that file.
- prepare runs `npm run build` for git installs, which requires dev dependencies.

## Verify Steps

- bun run build

## Rollback Plan

- Revert the command-guide module and restore agentctl.md-based quickstart/role behavior.
- Restore config schema defaults for agentctl_docs_path and update tests/examples accordingly.
- Remove prepare/prepack script changes if publish behavior regresses.

