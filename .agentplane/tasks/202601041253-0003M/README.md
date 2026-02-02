---
id: "202601041253-0003M"
title: "Agents: export tasks.json on close"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["agents", "tasks"]
verify: []
commit: { hash: "188350307b487d91a3ef004847f87f8b6d1a3995", message: "Legacy completion (backfill)" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:17+00:00"
doc_updated_by: "agentctl"
description: "Update agent prompts to require tasks.json export after finish/closure and align task source-of-truth wording with backend model."
dirty: false
id_source: "custom"
---
# 202601041253-0003M: Agents: export tasks.json on close

## Summary

- Update agent prompts so closures regenerate `tasks.json`.
- Align task source-of-truth wording with backend routing.

## Goal

- Ensure the closing agent exports `tasks.json` after `finish`, keeping snapshots in sync.

## Scope

- Update agent JSON prompts and `AGENTS.md` where they mention `tasks.json` as canonical.
- Add a closure checklist entry to export the snapshot.

## Risks

- Prompt drift if docs and agent JSONs are not updated together.

## Verify Steps

- `rg -n \"tasks.json\" .agent-plane/agents AGENTS.md`

## Rollback Plan

- Revert prompt updates in `.agent-plane/agents/*.json` and `AGENTS.md`.

## Changes Summary

- Updated agent prompts to treat `tasks.json` as a snapshot and export it after closure.
- Aligned backend wording across AGENTS and agent JSONs.
