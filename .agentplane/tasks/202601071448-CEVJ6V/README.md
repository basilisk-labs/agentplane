---
id: "202601071448-CEVJ6V"
title: "Improve agentctl task output context"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["agentctl", "cli", "tasks"]
verify: []
commit: { hash: "8628d112da0784da7ee3bc4acb52ffac72e7221f", message: "✨ CEVJ6V enrich agentctl task outputs" }
comments:
  - { author: "INTEGRATOR", body: "Verified: not run (output-only changes). Context expanded for agent consumption." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:36.166Z"
doc_updated_by: "agentplane"
description: "Enhance agentctl CLI outputs to include richer task context (readiness, deps, metadata) to reduce extra checks."
---
## Summary

Improve agentctl CLI outputs to include richer task context (deps, readiness, metadata) so agents need fewer follow-up commands.

## Context

User asked to make agentctl CLI outputs more informative so agents avoid extra status checks.

## Scope

- Enrich task list/show/ready outputs with dependency readiness and metadata.\n- Keep outputs compact and stable for CLI use.

## Risks

- More verbose output may affect scripts that parse human-readable CLI output.

## Verify Steps

- Run 'python .agent-plane/agentctl.py task show <task-id>' and 'python .agent-plane/agentctl.py task list' to confirm richer context.

## Rollback Plan

Revert agentctl output changes if verbosity breaks downstream scripting.

## Notes

Updated task list/show/ready/start/block/finish outputs to include deps/readiness/metadata summaries.

## Changes Summary

- Added dependency/owner/priority/tag/verify info to task list/search/next output lines.\n- Expanded task show output with readiness, doc metadata, verify commands, and comment counts.\n- Added richer summaries for ready/start/block/finish commands.
