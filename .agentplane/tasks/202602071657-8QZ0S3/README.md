---
id: "202602071657-8QZ0S3"
title: "Config: Add verify-steps gating settings"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-E834SD"
tags:
  - "code"
  - "config"
  - "workflow"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T18:00:05.053Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T18:07:42.494Z"
  updated_by: "CODER"
  note: "Added config keys for Verify Steps gates (require_steps_for_tags/spike_tag/enforce flags) with schema + type updates; removed legacy lint requiring verify commands; bun run test:fast + bun run test:cli:core."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add config keys for Verify Steps gating and wire plan/start behavior with backward-compatible defaults."
doc_version: 2
doc_updated_at: "2026-02-07T18:07:42.498Z"
doc_updated_by: "CODER"
description: "Add optional config keys for require_steps_for_tags/spike_tag/enforce_on_plan_approve/enforce_on_start_when_no_plan."
---
## Summary


## Scope


## Plan

1) Extend config schema + types with optional verify steps gating settings.
2) Wire code to use new settings with backward-compatible fallbacks to tasks.verify.required_tags.
3) Remove legacy lint rule that required frontmatter verify commands for code tags (verify commands are now optional).
4) Run bun run test:fast.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T18:07:42.494Z — VERIFY — ok

By: CODER

Note: Added config keys for Verify Steps gates (require_steps_for_tags/spike_tag/enforce flags) with schema + type updates; removed legacy lint requiring verify commands; bun run test:fast + bun run test:cli:core.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope

Make Verify Steps gating configurable and transparent.

### Checks

- Config supports: require_steps_for_tags, spike_tag, enforce_on_plan_approve, enforce_on_start_when_no_plan.
- Defaults preserve current behavior.
- Legacy required_tags is still accepted and used as fallback.

### Evidence / Commands

- bun run test:fast

### Pass criteria

- All tests pass and gating can be toggled via config.
