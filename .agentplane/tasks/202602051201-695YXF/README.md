---
id: "202602051201-695YXF"
title: "Config/init: require verify confirmation + add Verification section"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: ["202602051201-F8YMCF"]
tags: ["workflow", "config", "init", "docs", "frontend"]
verify: ["bun run test:fast"]
commit: null
comments:
  - { author: "CODER", body: "Start: add Verification doc section to config/schema/templates and add verify approval setting to init/config." }
doc_version: 2
doc_updated_at: "2026-02-05T12:42:54.840Z"
doc_updated_by: "CODER"
description: "Add config flag to require verify confirmation, enable it during init, and add Verification to task README section schema/templates."
id_source: "generated"
---
## Summary

Add require_verify approval config and init flag; document new verification approval and section.

## Scope

Update config schema/examples and core config types; add init flag + help/usage; update docs and init tests; include Verification section in defaults.

## Risks

Interactive verify approval may interrupt automation if enabled; docs/backends without task docs will now block verification.

## Verify Steps

cmd: bun run lint
cmd: bun run test:fast
cmd: node packages/agentplane/bin/agentplane.js hooks run pre-commit

## Rollback Plan

Revert commits for config/init and docs changes; reset config schema/example to previous approvals and sections.

## Verification

Pending: execute verify after implementation.
