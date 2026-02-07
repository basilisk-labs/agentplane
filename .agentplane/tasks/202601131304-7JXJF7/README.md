---
id: "202601131304-7JXJF7"
title: "Document new config settings and CLI"
status: "DONE"
priority: "normal"
owner: "DOCS"
depends_on:
  - "202601131304-D4ZA6S"
tags:
  - "docs"
  - "config"
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
  hash: "a31da01f6c954cddda71b9dd9d27348f2a355d03"
  message: "✨ 7JXJF7 document config settings and config CLI"
comments:
  -
    author: "DOCS"
    body: "Verified: ran rg checks for config show/set and branch/worktree keys in docs; changes update agentctl.md, docs/07-09, and README."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:46.322Z"
doc_updated_by: "agentplane"
description: "Update agentctl docs and project docs to explain new config.json keys and config CLI commands."
---
## Summary

Documented new config keys and CLI config show/set usage across agentctl docs and project docs.

## Context

Agentctl gained config-driven behavior, so docs needed to explain keys, defaults, and the new config commands.

## Scope

Updated .agent-plane/agentctl.md, docs/07-tasks-and-backends.md, docs/08-branching-and-pr-artifacts.md, docs/09-commands.md, and README.md.

## Risks

Docs may drift if the config schema changes; no runtime impact.

## Verify Steps

rg -n "config show|config set" .agent-plane/agentctl.md docs/09-commands.md; rg -n "branch\.task_prefix|paths\.worktrees_dir" docs/07-tasks-and-backends.md docs/08-branching-and-pr-artifacts.md

## Rollback Plan

Revert doc changes in the listed files.

## Notes

Config coverage includes base_branch, branch.task_prefix, paths.worktrees_dir, tasks.doc sections, tasks.verify.required_tags, tasks.comments rules, and commit.generic_tokens.

## Plan


## Verification
