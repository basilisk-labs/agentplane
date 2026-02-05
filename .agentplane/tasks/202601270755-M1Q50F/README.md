---
id: "202601270755-M1Q50F"
title: "AP-001: Fix CLI contract v1 (commands/namespaces/aliases)"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["nodejs", "docs", "cli"]
verify: []
commit: { hash: "ad1df19a2048d65a874a02b921ebfdc4e861e76f", message: "✨ M1Q50F cli contract: define v1 command surface, exit codes, json errors" }
comments:
  - { author: "DOCS", body: "Start: drafting v1 CLI contract doc (commands, exit codes, --json error format) for Node.js agentplane." }
  - { author: "DOCS", body: "verified: added docs/cli-contract.md covering v1 namespaces, exit codes, and --json error output contract." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:02.029Z"
doc_updated_by: "agentplane"
description: "Define and document the public agentplane CLI contract v1: commands, flags, aliases, exit codes, and --json error format."
---
## Summary

Define the stable public CLI contract for `agentplane` v1 (commands, flags, aliases, exit codes, and structured errors).

## Scope

- Create `docs/cli-contract.md` with a command table for v1.
- Specify `--json` output contract for errors.
- Reserve namespaces (e.g. `recipe`, `mode`, `ide`, `backend`) and resolve any ambiguous command names.

## Risks

- Premature stability: freezing the contract too early can cause churn in later milestones.
- Collisions: command naming (e.g. `sync`) must stay unambiguous across namespaces.

## Verify Steps

- Open `docs/cli-contract.md` and confirm it covers all planned v1 namespaces.
- Spot-check examples for consistent flag naming and exit codes.

## Rollback Plan

- Revert the commit that introduces/changes `docs/cli-contract.md`.
