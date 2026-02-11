---
id: "202602101501-J0ZCS3"
title: "Init/upgrade: AGENTS.md is a real file in repo root (no symlink)"
result_summary: "Init writes root AGENTS.md as a regular file; upgrade refuses overwriting AGENTS.md symlink targets outside repo"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602101258-TQQPV5"
tags:
  - "cli"
  - "code"
  - "upgrade"
  - "init"
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
  hash: "1c5a3099a87c9133d78364c5bf157556ea674607"
  message: "✅ J0ZCS3 init-upgrade: write root AGENTS.md and guard symlink targets"
comments:
  -
    author: "CODER"
    body: "Start: switch init/upgrade to treat AGENTS.md as a real repo-root file (no symlink, no .agentplane/AGENTS.md managed copy)."
  -
    author: "CODER"
    body: "Verified: bun run lint; bun run test:agentplane (init-upgrade backend, upgrade.merge, upgrade.safety); bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build"
events:
  -
    type: "status"
    at: "2026-02-10T15:01:30.116Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch init/upgrade to treat AGENTS.md as a real repo-root file (no symlink, no .agentplane/AGENTS.md managed copy)."
  -
    type: "status"
    at: "2026-02-10T15:10:35.880Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint; bun run test:agentplane (init-upgrade backend, upgrade.merge, upgrade.safety); bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build"
doc_version: 2
doc_updated_at: "2026-02-10T15:10:35.880Z"
doc_updated_by: "CODER"
description: "Change agentplane init to write AGENTS.md as a regular file at the repo root (not a symlink, and not managed under .agentplane/). Update upgrade behavior to stop enforcing a root symlink and stop using .agentplane/AGENTS.md as a managed copy; symlink usage should be treated as agentplane-repo-only."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

### Scope\n- init: packages/agentplane/src/cli/run-cli/commands/init/write-agents.ts\n- upgrade: packages/agentplane/src/commands/upgrade.ts\n- tests covering init/upgrade behavior and symlink handling\n\n### Checks\n- Lint\n- Init/upgrade CLI contract tests\n\n### Evidence / Commands\n- bun run lint\n- bun run test:agentplane packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts\n- bun run test:agentplane packages/agentplane/src/commands/upgrade.merge.test.ts\n\n### Pass criteria\n- agentplane init writes a regular AGENTS.md file in repo root when missing (no symlink, no .agentplane/AGENTS.md).\n- upgrade no longer enforces AGENTS.md root symlink and does not require .agentplane/AGENTS.md.\n- Existing symlinked AGENTS.md is tolerated (agentplane repo) and not overwritten.
