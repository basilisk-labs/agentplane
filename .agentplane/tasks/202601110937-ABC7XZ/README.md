---
id: "202601110937-ABC7XZ"
title: "Add status summary output to agentctl"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["agentctl", "ux"]
verify: []
commit: { hash: "d2ccccc10fb8e9e1ddf4324d6e58bfc60dac34bf", message: "✨ ABC7XZ add status footer to agentctl; broaden command_path; refresh task doc" }
comments:
  - { author: "CODER", body: "Verified: ran python -m compileall .agent-plane/agentctl.py and python .agent-plane/agentctl.py task lint; status footer behavior now emits success lines for non-quiet/non-json runs; no regressions observed." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:38.376Z"
doc_updated_by: "agentplane"
description: "Always emit a final status line for commands so agents can refresh context without guessing."
---
## Summary

Emit a consistent status line for successful agentctl commands so automation can read results directly.

## Context

- Agents need an explicit success signal after each agentctl invocation to sync context without probing logs.
- Commands can exit via SystemExit(0), so the footer must still appear when output isn't suppressed.

## Scope

- Compute the executed subcommand path (including nested parsers) via command_path.
- Print a final success footer (`✅ <path> OK`) for non-quiet/non-json runs, even when commands exit with SystemExit(0).
- Keep quiet/json modes untouched to avoid polluting structured outputs.

## Risks

- Extra stdout footer could surprise tooling that expected previous formatting.
- Some commands already emit a success marker, so consumers may see duplicate ✅ lines.

## Verify Steps

- python -m compileall .agent-plane/agentctl.py
- python .agent-plane/agentctl.py task lint

## Rollback Plan

- Revert the status-footer commit and restore agentctl.py.
- Rerun python -m compileall .agent-plane/agentctl.py and python .agent-plane/agentctl.py task lint to confirm a clean state.
