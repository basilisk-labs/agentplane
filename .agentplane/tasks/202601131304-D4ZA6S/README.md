---
id: "202601131304-D4ZA6S"
title: "Add config keys and agentctl config CLI"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["agentctl", "config"]
verify: []
commit: { hash: "dddeba676b1818a4b66c49ed91f3db1cdc47cb97", message: "✨ D4ZA6S add config-driven settings and config CLI" }
comments:
  - { author: "CODER", body: "Verified: ran python .agent-plane/agentctl.py --help to confirm config show/set is registered; changes add config-driven defaults in agentctl and config.json." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:46.677Z"
doc_updated_by: "agentplane"
description: "Extend .agent-plane/config.json with new settings and update agentctl to read them plus provide config show/set commands."
---
## Summary

Add config-driven settings for tasks/branch/commit and a config show/set CLI in agentctl.


## Context

User requested configurable settings in config.json plus CLI support for toggling them.


## Scope

Updated .agent-plane/config.json with new keys and adjusted .agent-plane/agentctl.py to read them, enforce branch/worktree prefix config, and add config show/set commands.


## Risks

Misconfigured config.json values could cause agentctl validation errors; new defaults should be verified in the repo.


## Verify Steps

python .agent-plane/agentctl.py --help


## Rollback Plan

Revert .agent-plane/config.json and .agent-plane/agentctl.py to the previous commit.


## Notes

Added config keys: base_branch, paths.worktrees_dir, branch.task_prefix, tasks.id_suffix_length_default, tasks.verify.required_tags, tasks.doc sections, tasks.comments rules, commit.generic_tokens; added agentctl config show/set.
