---
id: "202602060427-AFQFMQ"
title: "P2: Split commands/workflow.ts by domains + split run-cli core tests"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["refactor", "cli", "testing"]
verify: []
commit: null
comments:
  - { author: "ORCHESTRATOR", body: "Start: Split commands/workflow.ts and run-cli.core.test.ts into smaller domain/scenario modules; keep CLI API stable; run full CLI test suite and agentplane verify before finish." }
  - { author: "VERIFY", body: "Verify failed: Verify command failed: bun run typecheck\\ncmd: bun run lint\\ncmd: bun run test:cli:core\\ncmd: bun run test:cli:unit\\ncmd: node packages/agentplane/bin/agentplane.js verify 202602060427-AFQFMQ (command: bun run typecheck\\ncmd: bun run lint\\ncmd: bun run test:cli:core\\ncmd: bun run test:cli:unit\\ncmd: node packages/agentplane/bin/agentplane.js verify 202602060427-AFQFMQ)" }
doc_version: 2
doc_updated_at: "2026-02-06T05:33:26.868Z"
doc_updated_by: "VERIFY"
description: "Goal: reduce churn and review scope by splitting the largest prod file and the largest test file.\\n\\nDeliverables:\\n- Decompose packages/agentplane/src/commands/workflow.ts into domain modules under packages/agentplane/src/commands/{task,branch,pr,guard,hooks}/\\n- Keep stable workflow entrypoint for CLI (run-cli.ts import stays simple)\\n- Split packages/agentplane/src/cli/run-cli.core.test.ts into multiple scenario/command-focused files; keep smoke/contract separate\\n\\nConstraints:\\n- direct mode; no manual edits to .agentplane/tasks.json; commits via agentplane\\n"
---
## Summary

- Refactored packages/agentplane/src/commands/workflow.ts into domain modules (task/branch/pr/guard/hooks) while keeping workflow.ts as a stable re-export entrypoint.\n- Split packages/agentplane/src/cli/run-cli.core.test.ts into multiple core test files (scenario/command focused) and updated root test scripts to target run-cli.core*.test.ts.

## Scope

- Added domain command modules under packages/agentplane/src/commands/{task,branch,pr,guard,hooks}/ and shared helpers under packages/agentplane/src/commands/shared/.\n- Left packages/agentplane/src/commands/workflow.ts as the compatibility surface (explicit re-exports; no export *).\n- Split core CLI tests into packages/agentplane/src/cli/run-cli.core.*.test.ts and adjusted root package.json CLI test scripts to include the new glob.\n- No intended behavior changes; change is structural for review/scope isolation.

## Risks

- Refactor risk: import boundary mistakes or subtle behavior drift (especially around git/worktree/pr-meta helpers) despite typecheck passing.\n- Test split risk: ordering/state coupling between tests can surface if some helpers relied on file-level initialization side effects.\n- Maintainability risk: some split test files include broad ESLint disables added during the mechanical split; should be tightened in a follow-up to avoid hiding real lint regressions.

## Verify Steps

cmd: bun run typecheck
cmd: bun run lint
cmd: bun run test:cli:unit

## Verification

Verified: 2026-02-06 12:33:19 +0700

- agentplane verify 202602060427-AFQFMQ --require --yes
- Verify Steps executed:
  - bun run typecheck
  - bun run lint
  - bun run test:cli:unit

## Rollback Plan

- Revert the task commit created via agentplane (single commit expected): git revert <sha>.\n- Re-run: bun run typecheck && bun run lint && bun run test:cli:unit (and agentplane verify if required).\n- If rollback is urgent, temporarily restore the previous monolithic files from mainline and re-run the same verification steps.
