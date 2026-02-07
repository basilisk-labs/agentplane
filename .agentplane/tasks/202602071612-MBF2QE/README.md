---
id: "202602071612-MBF2QE"
title: "AP-CONFIG-02: Update .agentplane config to current format"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "config"
  - "roadmap"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T16:14:01.916Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07T16:14:01.916Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T16:19:43.673Z"
  updated_by: "CODER"
  note: "Verified: Updated .agentplane/config.json (status_commit_policy=confirm, finish_auto_status_commit=false). Ran bun run test:cli:core."
commit:
  hash: "5b12416b17f8662b9d22c1980d4e9ad5dc9827b8"
  message: "✨ MBF2QE config: require explicit status commits"
comments:
  -
    author: "CODER"
    body: "Start: Align .agentplane/config.json with the current schema and recommended defaults; remove deprecated keys."
  -
    author: "CODER"
    body: "Verified: Updated .agentplane/config.json and confirmed behavior via bun run test:cli:core (all tests passed)."
doc_version: 2
doc_updated_at: "2026-02-07T16:19:54.539Z"
doc_updated_by: "CODER"
description: "Align .agentplane/config.json with the current schema and recommended settings; remove deprecated keys; ensure config show has no warnings."
id_source: "generated"
---
## Summary

Update .agentplane/config.json to match the current schema and apply recommended guardrail defaults.

## Scope

In scope: set status_commit_policy=confirm and finish_auto_status_commit=false; ensure deprecated keys are removed; ensure config show has no warnings.
Out of scope: changing policy semantics or git base-branch pinning.

## Plan

1. Inspect current core config schema/defaults and compare against .agentplane/config.json.
2. Apply config updates via agentplane config set (no manual edits).
3. Run CLI smoke checks that depend on config loading.
4. Commit config changes with allowlist overrides.
5. Record verification and finish the task.

## Risks

Risk: stricter defaults may block comment-driven/status commits unless explicitly acknowledged. Mitigation: status_commit_policy=confirm is intentional; tests cover expected behavior.

## Verification

- node packages/agentplane/bin/agentplane.js config show
- bun run test:cli:core

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T16:19:43.673Z — VERIFY — ok

By: CODER

Note: Verified: Updated .agentplane/config.json (status_commit_policy=confirm, finish_auto_status_commit=false). Ran bun run test:cli:core.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the config commit and restore the previous config values.
