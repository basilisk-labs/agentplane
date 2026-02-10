---
id: "202602101653-VPS4TH"
title: "Release apply: update bun.lock for frozen-lockfile publish"
status: "DOING"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make release apply update bun.lock so publish frozen lockfile passes"
events:
  -
    type: "status"
    at: "2026-02-10T16:54:25.061Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make release apply update bun.lock so publish frozen lockfile passes"
doc_version: 2
doc_updated_at: "2026-02-10T16:56:06.821Z"
doc_updated_by: "CODER"
description: "Ensure release apply regenerates and stages bun.lock when bumping package versions, so publish workflow bun install --frozen-lockfile succeeds."
id_source: "generated"
---
## Summary


## Scope

- In scope: release apply command implementation and tests under packages/agentplane.\n- Out of scope: changing CI workflow or bun version.

## Plan

1. Detect bun monorepo by presence of bun.lock at repo root.\n2. In release apply, after version bump (or when already at nextVersion), run bun install (non-frozen, ignore scripts) to update bun.lock.\n3. Stage bun.lock if it exists.\n4. Add/adjust unit tests for release apply behavior; keep tests hermetic.

## Risks


## Verification

- bun run format:check: OK\n- bun run lint: OK\n- bun run test:agentplane: OK

## Rollback Plan


## Verify Steps

- bun run format:check\n- bun run lint\n- bun run test:agentplane\n- (manual) run: node packages/agentplane/bin/agentplane.js release apply --plan <planDir> (dry run in a scratch repo) and ensure bun.lock is staged when present.
