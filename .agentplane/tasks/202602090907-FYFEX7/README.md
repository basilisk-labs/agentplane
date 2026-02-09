---
id: "202602090907-FYFEX7"
title: "upgrade: smart-merge AGENTS.md and agent prompts"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "upgrade"
  - "policy"
  - "ux"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T09:15:14.442Z"
  updated_by: "CODER"
  note: "Implemented smart-merge behavior in upgrade: AGENTS.md preserves local overrides (markers; section-based fallback), .agentplane/agents/*.json uses three-way merge when baseline exists (incoming base + user diffs), bundle .agentplane/config.json is skipped with a warning. Added merge test and updated AGENTS.md template with LOCAL markers. bun run lint/test:full PASS."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement smart-merge behavior for upgrade of AGENTS.md and agent prompt JSON; preserve user customizations; add tests."
events:
  -
    type: "status"
    at: "2026-02-09T09:07:33.969Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement smart-merge behavior for upgrade of AGENTS.md and agent prompt JSON; preserve user customizations; add tests."
  -
    type: "verify"
    at: "2026-02-09T09:15:14.442Z"
    author: "CODER"
    state: "ok"
    note: "Implemented smart-merge behavior in upgrade: AGENTS.md preserves local overrides (markers; section-based fallback), .agentplane/agents/*.json uses three-way merge when baseline exists (incoming base + user diffs), bundle .agentplane/config.json is skipped with a warning. Added merge test and updated AGENTS.md template with LOCAL markers. bun run lint/test:full PASS."
doc_version: 2
doc_updated_at: "2026-02-09T09:15:14.444Z"
doc_updated_by: "CODER"
description: "Make agentplane upgrade replace AGENTS.md and .agentplane/agents from the bundle when unmodified, and perform a best-effort smart merge when the user customized AGENTS.md or agent prompt JSON. Preserve user additions and new agents; avoid overwriting local config."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Implement merge logic in packages/agentplane/src/commands/upgrade.ts:
   - AGENTS.md: write new bundle version if unmodified; if modified, merge by preserving local overrides (markers when present; otherwise section-based fallback).
   - .agentplane/agents/*.json: merge JSON objects (incoming as base, union array fields, preserve user-only keys/values).
   - Never overwrite .agentplane/config.json from bundle; warn and skip.
2. Add unit tests that exercise upgrade with a local bundle+checksum (no network) and assert merges/skips.
3. Ensure upgrade output uses canonical agentplane naming and warnings are clear.
4. Run bun run lint, bun run test:full, bun run coverage.

## Risks


## Verify Steps

1. bun run lint
2. bun run test:full
3. bun run coverage

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T09:15:14.442Z — VERIFY — ok

By: CODER

Note: Implemented smart-merge behavior in upgrade: AGENTS.md preserves local overrides (markers; section-based fallback), .agentplane/agents/*.json uses three-way merge when baseline exists (incoming base + user diffs), bundle .agentplane/config.json is skipped with a warning. Added merge test and updated AGENTS.md template with LOCAL markers. bun run lint/test:full PASS.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T09:07:42.890Z, excerpt_hash=sha256:f5457b97e854b607f7ea322044a312d32868d862de5b3039fe24000045b71c1c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
