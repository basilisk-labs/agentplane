---
id: "202602101552-DKG152"
title: "Release: agent-assisted notes plan + patch-only auto bump"
result_summary: "Added agentplane release plan that emits changes list for DOCS agent; default bump=patch; minor/major require --yes"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "release"
  - "code"
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
  hash: "b50235cf2ad9b5d8733086eb981d3c8c6819d27c"
  message: "✅ DKG152 release: add agent-assisted plan with patch default"
comments:
  -
    author: "CODER"
    body: "Start: implement agentplane release plan with agent-assisted notes input and patch-only default bump"
  -
    author: "CODER"
    body: "Verified: bun run lint; bun run test:fast; bun run test:agentplane packages/agentplane/src/cli/help.all-commands.contract.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build"
events:
  -
    type: "status"
    at: "2026-02-10T15:52:32.098Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement agentplane release plan with agent-assisted notes input and patch-only default bump"
  -
    type: "status"
    at: "2026-02-10T16:10:57.462Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint; bun run test:fast; bun run test:agentplane packages/agentplane/src/cli/help.all-commands.contract.test.ts; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build"
doc_version: 2
doc_updated_at: "2026-02-10T16:10:57.462Z"
doc_updated_by: "CODER"
description: "Add agentplane release plan to emit structured changes for DOCS agent; default bump=patch; require --yes for minor/major."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

### Scope
- CLI: new `agentplane release plan`
- Artifacts: `.agentplane/.release/*` (untracked runtime output)

### Checks
- `bun run lint`
- `bun run test:fast`
- `bun run test:agentplane packages/agentplane/src/cli/help.all-commands.contract.test.ts`
- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`

### Pass criteria
- All commands exit 0.
- `agentplane help` includes the new release command and help contract tests pass.
