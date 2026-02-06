---
id: "202602060542-EHBPD9"
title: "P2: Split commands/task/index.ts into per-command modules"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["refactor", "cli"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: Split commands/task/index.ts by individual commands (new/add/update/comment/set-status/doc/finish/verify/etc.) while keeping index.ts as explicit re-export entrypoint; run typecheck/lint/cli unit tests and agentplane verify." }
doc_version: 2
doc_updated_at: "2026-02-06T06:03:07.187Z"
doc_updated_by: "ORCHESTRATOR"
description: "Goal: reduce churn and review scope by splitting packages/agentplane/src/commands/task/index.ts into multiple command-specific modules.\\n\\nDeliverables:\\n- Move cmdTask* and lifecycle handlers into files under packages/agentplane/src/commands/task/*.ts (one command per file).\\n- Keep packages/agentplane/src/commands/task/index.ts as stable explicit re-export surface.\\n- No intended behavior changes; preserve public exports and CLI behavior.\\n\\nConstraints:\\n- direct mode; commits via agentplane; run agentplane verify before finish."
---
## Summary

- Split packages/agentplane/src/commands/task/index.ts into per-command modules under packages/agentplane/src/commands/task/.\n- Keep index.ts as stable explicit re-export surface to avoid wide import churn.

## Scope

- Move cmdTaskNew/Add/Update/Scrub/List/Next/Ready/Search/Scaffold/Normalize/Migrate/Comment/SetStatus/Show/List/Export/Lint and lifecycle cmdStart/cmdBlock/cmdFinish/cmdVerify + doc cmdTaskDocSet/Show into separate files.\n- Preserve public exports by re-exporting the same identifiers from packages/agentplane/src/commands/task/index.ts.\n- No intended behavior changes.

## Risks


## Verify Steps

cmd: bun run typecheck
cmd: bun run lint
cmd: bun run test:cli:unit

## Verification

Verified: 2026-02-06 13:03:01 +0700

- agentplane verify 202602060542-EHBPD9 --require --yes
- Verify Steps executed:
  - bun run typecheck
  - bun run lint
  - bun run test:cli:unit

## Rollback Plan

- Revert the task commit(s) created via agentplane.\n- Re-run: bun run typecheck && bun run lint && bun run test:cli:unit (and agentplane verify).\n- If needed, temporarily restore the monolithic task/index.ts from mainline.
