---
id: "202602110502-PCFAWM"
title: "T3: Sync assets/agents with .agentplane/agents (repo drift gate)"
result_summary: "agent templates now have deterministic sync/check guard against assets drift"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "code"
  - "quality"
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
  hash: "2b3b2ec95a9c2dee30f767f6b9d0a246fd2d9bd9"
  message: "🛠 PCFAWM tooling: add agents drift sync/check workflow"
comments:
  -
    author: "CODER"
    body: "Start: implement sync/check script and add guard scripts for agent templates drift."
  -
    author: "CODER"
    body: "Verified: added sync/check script for agent template drift, wired npm scripts, synchronized .agentplane/agents from assets source-of-truth, and added regression test asserting assets/repo agent parity."
events:
  -
    type: "status"
    at: "2026-02-11T05:03:38.329Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement sync/check script and add guard scripts for agent templates drift."
  -
    type: "status"
    at: "2026-02-11T05:06:02.278Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added sync/check script for agent template drift, wired npm scripts, synchronized .agentplane/agents from assets source-of-truth, and added regression test asserting assets/repo agent parity."
doc_version: 2
doc_updated_at: "2026-02-11T05:06:02.278Z"
doc_updated_by: "CODER"
description: "Add scripts/sync-agent-templates.mjs with check/sync modes, choose assets/agents as source of truth, add npm scripts agents:check and agents:sync, and add sync coverage test."
id_source: "generated"
---
## Summary

Add a deterministic sync/check script for agent templates to prevent drift between shipped templates (`packages/agentplane/assets/agents`) and in-repo runtime copies (`.agentplane/agents`).

## Scope

In scope:
- `scripts/sync-agent-templates.mjs`
- `package.json` scripts (`agents:check`, `agents:sync`)
- test covering sync/check behavior and drift detection

Out of scope:
- CI wiring (handled in dependent task)

## Plan

1. Implement `check` mode: compare assets and repo copies by filename and content.
2. Implement `sync` mode: copy canonical assets -> `.agentplane/agents`.
3. Add npm scripts and tests.
4. Run build/lint/tests and commit.

## Risks

- Risk: accidental source-of-truth inversion.
Mitigation: hardcode canonical path as `packages/agentplane/assets/agents`.
- Risk: silent drift in extra/missing files.
Mitigation: check mode validates both file lists and contents.

## Verification


## Rollback Plan

Revert the task commit to restore previous behavior and remove the sync gate.

## Verify Steps

- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`
- `bun run lint`
- `bunx vitest run packages/agentplane/src/agents/agents-template.test.ts`
- `bun run agents:check`
Pass criteria:
- `agents:check` exits 0 when synchronized
- tests pass
