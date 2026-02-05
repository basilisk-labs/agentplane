---
id: "202602031123-GNAF6S"
title: "Fix duplicate task README sections"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["tasks"]
verify: []
commit: { hash: "0a9cba50d54ab86ae6bedbf17b4240f27600a7bf", message: "🛠 GNAF6S fix task doc merge and dedupe headings" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: fixing duplicate headings in task READMEs and updating doc merge logic/tests; will update affected task docs via agentplane." }
  - { author: "ORCHESTRATOR", body: "Verified: pre-commit hooks ran format:check, lint, and test-fast successfully." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:53.595Z"
doc_updated_by: "agentplane"
description: "Fix task doc update logic so edits merge into existing sections and avoid duplicate headings (e.g., 202602031030-J9GHW7/README.md)."
id_source: "generated"
---
## Summary

Fix task doc updates to merge into existing sections, split concatenated headings, and prevent duplicate section headers.

## Scope

Update doc normalization/merge logic in core and CLI/task-backend; add tests; clean up affected task READMEs (J9GHW7, XWJDAB, YAQ677).

## Risks

Doc normalization could over-collapse unusual headings; mitigated with targeted parsing of concatenated headings.

## Verify Steps

- bun run --filter=agentplane build -- --force
- bun run --filter=@agentplaneorg/core build

## Rollback Plan

Revert doc normalization changes and task README updates.
