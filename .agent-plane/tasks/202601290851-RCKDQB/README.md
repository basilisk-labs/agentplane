---
id: "202601290851-RCKDQB"
title: "AP-040: modular CI/CLI for scoped checks"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: ["202601290714-GGRDKD"]
tags: ["roadmap", "nodejs", "ci"]
commit: { hash: "09b567123757e8982bde85d269aafaf16af281d8", message: "feat: RCKDQB add scoped ci scripts" }
comments:
  - { author: "CODER", body: "Start: add modular CI/CLI scoped checks to speed development while keeping full CI." }
  - { author: "CODER", body: "verified: bun run ci:agentplane (2026-01-29). | details: Scope: scoped CI scripts and docs updates." }
doc_version: 2
doc_updated_at: "2026-01-29T09:14:09+00:00"
doc_updated_by: "agentctl"
description: "Add scoped dev checks (lint/typecheck/tests) to run only for targeted packages/files while keeping full ci intact."
---
## Summary

Added scoped CI scripts for per-package checks (format/lint/typecheck/tests) plus docs for faster dev loops while keeping full CI intact.

## Scope

- Add @scripts/ci-scope.mjs to run scoped format/lint/typecheck/tests per package scope.\n- Add scoped scripts in @package.json (ci:agentplane, ci:core, ci:recipes, ci:spec, ci:testkit).\n- Document scoped checks in @docs/code-quality.mdx.

## Risks

- Scoped runs could miss cross-package integration issues; full CI remains required before release.\n- If a scope has no tests, vitest run may fail without matching files; script guards and scope selection mitigate this.

## Verify Steps

- 2026-01-29: bun run ci:agentplane (pass)

## Rollback Plan

- Revert the task commit and remove scoped scripts/doc updates if needed.

