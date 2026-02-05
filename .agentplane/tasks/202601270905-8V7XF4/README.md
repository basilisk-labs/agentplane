---
id: "202601270905-8V7XF4"
title: "Define code quality gates + switch toolchain to bun"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["nodejs", "tooling", "quality"]
verify: []
commit: { hash: "80f68e162a6963667157f14a1b739ed8d6a3f22d", message: "✨ 8V7XF4 quality gates + bun" }
comments:
  - { author: "CODER", body: "Start: defining quality gates (lint/format/typecheck/tests/coverage) and switching workspace tooling/docs to bun." }
  - { author: "CODER", body: "verified: 8V7XF4 bun run ci passed (format:check, lint, typecheck, coverage thresholds)." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:05.289Z"
doc_updated_by: "agentplane"
description: "Document and enforce code quality criteria (lint/format/typecheck/tests/coverage) and standardize on bun for installs and scripts."
---
## Summary

Define and enforce code quality gates (lint/format/typecheck/tests/coverage) and move the workspace to bun as the standard package manager.

## Scope

- Add a documented quality gates policy (tests + coverage + lint + formatting + typecheck).
- Standardize commands/docs on bun.
- Add a test runner + coverage enforcement suitable for a TS monorepo.

## Risks

- Coverage thresholds can block early iteration if set too high; choose a pragmatic baseline and raise later.
- Switching package managers may break contributors' local flows; document migration clearly.

## Verify Steps

- `bun install` succeeds.
- `bun run format:check` passes.
- `bun run lint` passes.
- `bun run test` passes.
- `bun run coverage` meets thresholds.

## Rollback Plan

- Revert commits; restore npm-based scripts and lockfile if needed.
