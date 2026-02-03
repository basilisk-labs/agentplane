---
id: "202601270830-X7PTPH"
title: "Update docs to reflect Node.js agentplane (not Python agentctl)"
status: "DONE"
priority: "high"
owner: "DOCS"
depends_on: []
tags: ["docs", "nodejs", "agentplane"]
verify: []
commit: { hash: "af8ab3405e3ef684210ac2e5e346b29ef4c83fa3", message: "✨ X7PTPH docs: rewrite docs to Node.js agentplane-first (cli/specs/paths)" }
comments:
  - { author: "DOCS", body: "Start: updating README.md and docs/* to be Node.js agentplane-first (offline-first, .agentplane, recipes, CLI namespaces)." }
  - { author: "DOCS", body: "verified: updated README.md and docs/* to describe the Node.js agentplane v1 (offline-first, .agentplane layout, CLI contract, recipes spec, schemas)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:04.607Z"
doc_updated_by: "agentplane"
description: "Rewrite project documentation to match the Node.js agentplane CLI (commands, .agentplane layout, offline-first, recipes), using ROADMAP.md as source of truth."
---
## Summary

Update all user-facing docs to describe the Node.js `agentplane` CLI and `.agentplane` project layout (not the current Python `agentctl`).


## Scope

- Rewrite docs in `docs/` and root `README.md` to be Node-first.
- Replace `.agent-plane` references with `.agentplane` where describing the target v1 system.
- Replace `python .agent-plane/agentctl.py ...` examples with `agentplane ...`.
- Ensure docs match the offline-first/network-only-on-explicit-commands model.


## Risks

- Docs may get ahead of implementation; clearly mark prototype/"not implemented yet" areas.
- Changing operational docs (current python workflow) can disrupt contributors if not scoped.


## Verify Steps

- `rg -n "agentctl|\.agent-plane" docs README.md` shows no stale Python-first guidance (except explicitly marked legacy notes).
- `docs/cli-contract.md` is referenced as the source of truth for commands.


## Rollback Plan

- Revert the documentation update commit(s).
